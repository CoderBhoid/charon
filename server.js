const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { exec } = require('child_process');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const os = require('os');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use('/out', express.static('out'));
app.use(express.json({ limit: '10mb' }));

const LocalAI = require('./LocalAI');

// =============================================================================
// OFFLINE BACKGROUND CACHING ENGINE — avoids flickering during rendering
// =============================================================================
const cacheDir = path.join(__dirname, 'public', 'cache');
if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true });
}

// Clean up legacy renders cache directory on server startup
const rendersDir = path.join(cacheDir, 'renders');
if (fs.existsSync(rendersDir)) {
    try {
        fs.rmSync(rendersDir, { recursive: true, force: true });
        console.log('🧹 Cleaned up legacy renders cache directory.');
    } catch (e) {
        console.error('Failed to clean up legacy renders cache directory:', e);
    }
}



function getCacheFilename(url) {
    const hash = crypto.createHash('md5').update(url).digest('hex');
    let ext = '.jpg';
    if (url.includes('.png')) ext = '.png';
    else if (url.includes('.gif')) ext = '.gif';
    return `asset_${hash}${ext}`;
}

async function downloadAsset(url, filename) {
    const dest = path.join(cacheDir, filename);
    if (fs.existsSync(dest)) {
        console.log(`[Cache Hit] ${filename}`);
        return `/cache/${filename}`;
    }
    
    console.log(`[Downloading] ${url} -> ${filename}`);
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText} for URL: ${url}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(dest, buffer);
    console.log(`[Saved] ${dest}`);
    return `/cache/${filename}`;
}

async function processAssetCaching(code) {
    const urlRegex = /https:\/\/(?:picsum\.photos|image\.pollinations\.ai)[^\s"'`}]+/g;
    const matches = code.match(urlRegex) || [];
    
    if (matches.length > 0) {
        console.log(`Found ${matches.length} remote asset(s) to cache...`);
        const uniqueUrls = [...new Set(matches)];
        
        for (const url of uniqueUrls) {
            try {
                const cleanUrl = url.replace(/&amp;/g, '&');
                const filename = getCacheFilename(cleanUrl);
                const localPath = await downloadAsset(cleanUrl, filename);
                code = code.split(url).join(localPath);
            } catch (err) {
                console.error(`⚠️ Failed to cache asset ${url}: ${err.message}`);
            }
        }
    }
    return code;
}

// =============================================================================
// CODE VALIDATOR & SANITIZER — catches common code-gen bugs before render
// =============================================================================
function stripComments(code) {
    return code
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/\/\/.*/g, '');
}

function extractTSXCode(rawResponse) {
    if (!rawResponse) return "";
    const match = rawResponse.match(/```(?:tsx|typescript|javascript|js|jsx)?([\s\S]*?)```/);
    if (match && match[1]) {
        return match[1].trim();
    }
    return rawResponse.replace(/```(?:tsx|typescript|javascript|js|jsx)?/g, '').replace(/```/g, '').trim();
}

function validateCode(code) {
    const errors = [];
    const cleanCode = stripComments(code);

    // Structural
    if (!/export\s+(const|function)\s+MyVideo/.test(cleanCode)) errors.push("ERROR: Must export 'MyVideo'");
    if (!cleanCode.includes('AbsoluteFill')) errors.push("ERROR: Must use <AbsoluteFill>");
    if (/(?:^|[^a-zA-Z0-9_])(?:use(?:State|Effect))\s*\(/.test(cleanCode) || /import\s+.*use(?:State|Effect).*from/.test(cleanCode)) {
        errors.push("ERROR: No useState/useEffect allowed");
    }

    // Imports
    if (/easing\s*:\s*\[/.test(cleanCode)) errors.push("ERROR: 'easing' must be a single function, not an array");
    if (/Easing\./.test(cleanCode) && !cleanCode.includes("Easing")) errors.push("ERROR: Easing used but not imported");
    if (/spring\s*\(/.test(cleanCode) && !/import.*spring.*from\s+['"]remotion['"]/.test(cleanCode)) errors.push("ERROR: spring used but not imported");

    // Brace balance
    const openBraces = (cleanCode.match(/{/g) || []).length;
    const closeBraces = (cleanCode.match(/}/g) || []).length;
    if (openBraces !== closeBraces) errors.push(`ERROR: Unbalanced braces (${openBraces} open, ${closeBraces} close)`);

    // Unresolved references
    if (cleanCode.includes('physicsResult.')) errors.push("ERROR: Literal 'physicsResult.' in output");
    if (cleanCode.includes('extraStyle')) errors.push("ERROR: Literal 'extraStyle' in output");

    return { valid: errors.length === 0, errors };
}

function sanitizeCode(code) {
    // Fix bare "px" on numeric JSX style values (width: 200px → width: 200)
    code = code.replace(/:\s*(\d+(?:\.\d+)?)px\s*([,}])/g, ': $1$2');
    // Remove stray semicolons inside JSX style objects
    code = code.replace(/;\s*}/g, '}');
    // Fix dangling commas before closing }} (causes warnings)
    code = code.replace(/,\s*\n(\s*\}\})/g, '\n$1');
    return code;
}

// =============================================================================
// DYNAMIC DURATION — rewrite index.tsx with correct durationInFrames
// =============================================================================
function updateCompositionDuration(durationSeconds, fps = 30, width = 1280, height = 720) {
    const frames = Math.round(durationSeconds * fps);
    const indexContent = `import React from 'react';
import { registerRoot, Composition } from 'remotion';
import { MyVideo } from './Video';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="MyComp"
      component={MyVideo}
      durationInFrames={${frames}}
      fps={${fps}}
      width={${width}}
      height={${height}}
    />
  );
};

try {
  registerRoot(RemotionRoot);
} catch (e: any) {
  if (e.message && e.message.includes('more than once')) {
    console.warn('Ignoring duplicate registerRoot call during HMR re-evaluation.');
  } else {
    throw e;
  }
}
`;
    fs.writeFileSync('./src/index.tsx', indexContent);
    console.log(`    ⏱️ Duration: ${durationSeconds}s @ ${fps}fps (${frames} frames) | ${width}x${height}`);
}

// =============================================================================
// UNIVERSAL API ADAPTERS
// =============================================================================
const PROVIDERS = {
    openai: { modelsUrl: 'https://api.openai.com/v1/models', chatUrl: 'https://api.openai.com/v1/chat/completions', auth: 'Bearer' },
    groq: { modelsUrl: 'https://api.groq.com/openai/v1/models', chatUrl: 'https://api.groq.com/openai/v1/chat/completions', auth: 'Bearer' },
    deepseek: { modelsUrl: 'https://api.deepseek.com/models', chatUrl: 'https://api.deepseek.com/chat/completions', auth: 'Bearer' },
    together: { modelsUrl: 'https://api.together.xyz/v1/models', chatUrl: 'https://api.together.xyz/v1/chat/completions', auth: 'Bearer' },
    anthropic: { modelsUrl: 'https://api.anthropic.com/v1/models', chatUrl: 'https://api.anthropic.com/v1/messages', auth: 'x-api-key' }
};

async function fetchDynamicModels(provider, apiKey) {
    if (provider === 'local') return [{ name: 'Super-Template-Engine', displayName: 'Super-Template AI Engine' }];
    
    if (provider === 'google') {
        let response;
        try {
            response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        } catch (fetchErr) {
            throw new Error(`Google API network error: ${fetchErr.message}`);
        }
        
        const text = await response.text();
        let data;
        try {
            data = JSON.parse(text);
        } catch (jsonErr) {
            throw new Error(`Google API returned non-JSON response (HTTP ${response.status}): ${text.slice(0, 200)}`);
        }

        if (data.error) throw new Error(data.error.message);
        return data.models.filter(m => m.supportedGenerationMethods?.includes('generateContent'))
            .map(m => ({ name: m.name.replace('models/', ''), displayName: m.displayName || m.name }));
    }

    const cfg = PROVIDERS[provider];
    if (!cfg) throw new Error("Unknown provider: " + provider);

    const headers = {};
    if (cfg.auth === 'Bearer') headers['Authorization'] = `Bearer ${apiKey}`;
    else if (cfg.auth === 'x-api-key') {
        headers['x-api-key'] = apiKey;
        headers['anthropic-version'] = '2023-06-01';
    }

    let res;
    try {
        res = await fetch(cfg.modelsUrl, { headers });
    } catch (fetchErr) {
        throw new Error(`${provider.toUpperCase()} API network error: ${fetchErr.message}`);
    }

    const text = await res.text();
    let data;
    try {
        data = JSON.parse(text);
    } catch (jsonErr) {
        throw new Error(`${provider.toUpperCase()} API returned non-JSON response (HTTP ${res.status}): ${text.slice(0, 200)}`);
    }
    
    if (data.error) throw new Error(data.error.message || JSON.stringify(data.error));
    if (!res.ok) throw new Error(`${provider.toUpperCase()} API returned error (HTTP ${res.status}): ${text.slice(0, 200)}`);
    
    let list = data.data || data.models || data;
    if (!Array.isArray(list)) throw new Error("Invalid models response from provider");

    // Filter to sort standard models and text models primarily if possible
    list = list.filter(m => {
        const name = (m.id || m.name || '').toLowerCase();
        return !name.includes('embedding') && !name.includes('tts') && !name.includes('whisper') && !name.includes('dall-e') && !name.includes('moderation');
    });

    return list.map(m => ({ name: m.id || m.name, displayName: m.id || m.name }));
}

async function universalGenerate(provider, reqModel, apiKey, systemPrompt, userPrompt) {
    if (provider === 'google') {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: reqModel });
        const result = await model.generateContent(`${systemPrompt}\n\nUSER REQUEST: "${userPrompt}"`);
        return result.response.text();
    }

    const cfg = PROVIDERS[provider];
    if (!cfg) throw new Error("Unknown provider for generation");

    const headers = { 'Content-Type': 'application/json' };
    if (cfg.auth === 'Bearer') headers['Authorization'] = `Bearer ${apiKey}`;
    else if (cfg.auth === 'x-api-key') {
        headers['x-api-key'] = apiKey;
        headers['anthropic-version'] = '2023-06-01';
    }

    let payload;
    if (provider === 'anthropic') {
        payload = {
            model: reqModel,
            max_tokens: 4096,
            system: systemPrompt,
            messages: [{ role: 'user', content: userPrompt }]
        };
    } else {
        payload = {
            model: reqModel,
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt }
            ]
        };
    }

    let res;
    try {
        res = await fetch(cfg.chatUrl, { method: 'POST', headers, body: JSON.stringify(payload) });
    } catch (fetchErr) {
        throw new Error(`${provider.toUpperCase()} API network error during generation: ${fetchErr.message}`);
    }

    const text = await res.text();
    let data;
    try {
        data = JSON.parse(text);
    } catch (jsonErr) {
        throw new Error(`${provider.toUpperCase()} API returned non-JSON response during generation (HTTP ${res.status}): ${text.slice(0, 200)}`);
    }
    
    if (data.error) throw new Error(data.error.message || JSON.stringify(data.error));
    if (!res.ok) throw new Error(`${provider.toUpperCase()} API returned error during generation (HTTP ${res.status}): ${text.slice(0, 200)}`);

    if (provider === 'anthropic') {
        if (!data.content || !data.content[0] || !data.content[0].text) {
            throw new Error(`Unexpected Anthropic API response format: ${JSON.stringify(data)}`);
        }
        return data.content[0].text;
    } else {
        if (!data.choices || !data.choices[0] || !data.choices[0].message || !data.choices[0].message.content) {
            throw new Error(`Unexpected ${provider.toUpperCase()} API response format: ${JSON.stringify(data)}`);
        }
        return data.choices[0].message.content;
    }
}

// =============================================================================
// API MODELS ROUTE
// =============================================================================
app.get('/api/models', async (req, res) => {
    const { provider, apiKey } = req.query;
    if (!apiKey && provider !== 'local') return res.status(400).json({ error: "API Key required" });
    try {
        const models = await fetchDynamicModels(provider, apiKey);
        res.json({ models });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// =============================================================================
// AI GENERATION & RENDER STREAM ROUTE (WITH AUTO-FIX)
// =============================================================================
const { spawn } = require('child_process');
const { bundle } = require('@remotion/bundler');
const { renderMedia, selectComposition } = require('@remotion/renderer');

async function runRenderStream(sendLog) {
    // Step 1: Bundle with webpack (uses disk cache for faster subsequent builds)
    sendLog('[System] Bundling project...');
    const bundleStart = Date.now();
    const bundleLocation = await bundle({
        entryPoint: path.resolve('./src/index.tsx'),
        publicDir: path.resolve('./public'),
    });
    sendLog(`[System] Bundle ready in ${((Date.now() - bundleStart) / 1000).toFixed(1)}s`);

    // Step 2: Read composition metadata (duration, fps, resolution) from the bundled code
    const composition = await selectComposition({
        serveUrl: bundleLocation,
        id: 'MyComp',
        chromiumOptions: {},
    });
    sendLog(`[System] Composition: ${composition.durationInFrames} frames @ ${composition.fps}fps (${composition.width}x${composition.height})`);

    // Step 3: Render using 50% of CPU cores in parallel for host stability and GPU access
    const cpuCount = os.cpus().length;
    const concurrency = Math.max(1, Math.floor(cpuCount * 0.5));
    sendLog(`[System] Rendering with ${concurrency} parallel threads (${cpuCount} CPU cores detected)...`);

    const renderStart = Date.now();
    let lastLoggedPct = -1;

    await renderMedia({
        composition,
        serveUrl: bundleLocation,
        codec: 'h264',
        outputLocation: path.resolve('./out/video.mp4'),
        imageFormat: 'jpeg',
        x264Preset: 'superfast',
        chromiumOptions: {},
        concurrency,
        onProgress: ({ progress }) => {
            const pct = Math.round(progress * 100);
            if (pct >= lastLoggedPct + 5) {
                lastLoggedPct = pct;
                sendLog(`ℹ Rendering: ${pct}%`);
            }
        },
    });

    const renderSecs = ((Date.now() - renderStart) / 1000).toFixed(1);
    sendLog(`[System] Render completed in ${renderSecs}s`);
}

function ensureCodeImports(code) {
    // 1. Ensure React is imported
    const hasReactImport = /import\s+React\b/.test(code);
    if (!hasReactImport) {
        code = `import React from 'react';\n` + code;
    }

    // 2. Identify all possible Remotion symbols we want to heal
    const remotionSymbols = [
        'AbsoluteFill', 'useVideoConfig', 'useCurrentFrame', 'interpolate', 
        'Sequence', 'spring', 'Easing', 'Img', 'Audio', 'Loop', 
        'OffthreadVideo', 'delayRender', 'continueRender', 'interpolateColors'
    ];

    // 3. Find if there's an existing import from 'remotion'
    const remotionImportRegex = /import\s*\{([\s\S]*?)\}\s*from\s*['"]remotion['"]\s*;?/g;
    
    let existingSymbols = new Set();
    let importMatches = [];
    let match;
    
    remotionImportRegex.lastIndex = 0;
    while ((match = remotionImportRegex.exec(code)) !== null) {
        importMatches.push({
            fullMatch: match[0],
            symbolsStr: match[1],
            index: match.index
        });
        match[1].split(',').forEach(s => {
            const trimmed = s.trim();
            if (trimmed) existingSymbols.add(trimmed);
        });
    }

    // 4. Scan the code (excluding import statements themselves) to see which of our target symbols are actually used
    const bodyWithoutImports = code.replace(/import\s*[\s\S]*?from\s*['"].*?['"]\s*;?/g, '');
    
    const usedSymbols = new Set();
    remotionSymbols.forEach(sym => {
        const regex = new RegExp(`\\b${sym}\\b`);
        if (regex.test(bodyWithoutImports)) {
            usedSymbols.add(sym);
        }
    });

    // Fallback/safety: add absolute basic symbols if none detected
    if (usedSymbols.size === 0) {
        usedSymbols.add('AbsoluteFill');
        usedSymbols.add('useVideoConfig');
        usedSymbols.add('useCurrentFrame');
    }

    // 5. Merge existing and used symbols
    const finalSymbols = new Set([...existingSymbols]);
    usedSymbols.forEach(sym => {
        finalSymbols.add(sym);
    });

    // Sort finalSymbols to look neat
    const sortedSymbols = Array.from(finalSymbols).sort();

    // 6. Replace or insert the 'remotion' import statement
    const newImportStatement = `import { ${sortedSymbols.join(', ')} } from 'remotion';`;

    if (importMatches.length > 0) {
        // If there were existing imports from 'remotion', replace the first one and remove any others to avoid duplicates
        const firstMatch = importMatches[0];
        code = code.replace(firstMatch.fullMatch, newImportStatement);
        for (let i = 1; i < importMatches.length; i++) {
            code = code.replace(importMatches[i].fullMatch, '');
        }
    } else {
        // No existing 'remotion' import. Insert it after the React import or at the top.
        const reactImportRegex = /import\s+React\b.*?from\s+['"]react['"]\s*;?/;
        const reactMatch = reactImportRegex.exec(code);
        if (reactMatch) {
            const insertIndex = reactMatch.index + reactMatch[0].length;
            code = code.slice(0, insertIndex) + `\n` + newImportStatement + code.slice(insertIndex);
        } else {
            code = newImportStatement + `\n` + code;
        }
    }

    return code;
}

function isAPIOrNetworkError(error) {
    const msg = (error.message || '').toLowerCase();
    return msg.includes('api key') ||
           msg.includes('unauthorized') ||
           msg.includes('forbidden') ||
           msg.includes('invalid key') ||
           msg.includes('rate limit') ||
           msg.includes('quota') ||
           msg.includes('network error') ||
           msg.includes('fetch') ||
           msg.includes('non-json') ||
           msg.includes('401') ||
           msg.includes('403') ||
           msg.includes('429') ||
           msg.includes('bad gateway') ||
           msg.includes('dns') ||
           msg.includes('connect');
}

app.post('/stream-generate', async (req, res) => {
    const { prompt, provider, apiKey, model: reqModel, duration = 10, style = '2d', fps = 30, width = 1280, height = 720, bypassCache = false } = req.body;
    
    console.log(`\n📥 [API POST /stream-generate] Prompt: "${prompt}"\n   Provider: ${provider} | Model: ${reqModel} | Style: ${style} | BypassCache: ${bypassCache}`);
    
    // Delete any leftover video from a previous generation so nothing accumulates
    const previousVideo = path.join(__dirname, 'out', 'video.mp4');
    if (fs.existsSync(previousVideo)) {
        try { fs.unlinkSync(previousVideo); } catch(e) { /* ignore */ }
    }
    
    res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.flushHeaders();
    
    const sendLog = (msg) => {
        res.write(JSON.stringify({ type: 'log', message: msg }) + '\n');
    };
    
    const sendCode = (code) => {
        res.write(JSON.stringify({ type: 'code', code }) + '\n');
    };
    
    const sendError = (msg) => {
        res.write(JSON.stringify({ type: 'error', message: msg }) + '\n');
        res.end();
    };

    const sendSuccess = () => {
        res.write(JSON.stringify({ type: 'success', videoUrl: '/out/video.mp4?t=' + Date.now() }) + '\n');
        res.end();
    };

    const handleLocalFallback = async (reason) => {
        sendLog(`[System] ⚠️ AUTO-FALLBACK TRIGGERED: ${reason}`);
        sendLog(`[System] Switching over to the Local AI template model to generate your video...`);
        
        try {
            sendLog(`[AI] Generating code with Super-Template Engine...`);
            let generatedCode = LocalAI.generate(prompt, duration, style, fps);
            generatedCode = ensureCodeImports(generatedCode);
            generatedCode = sanitizeCode(generatedCode);
            generatedCode = await processAssetCaching(generatedCode);
            sendCode(generatedCode);
            fs.writeFileSync('./src/Video.tsx', generatedCode);
            updateCompositionDuration(duration, fps, width, height);
            
            sendLog(`[System] Rendering video with Local AI fallback...`);
            await runRenderStream(sendLog);
            sendLog(`[System] Render successful! (Local AI Fallback)`);
            
            sendSuccess();
        } catch (fallbackError) {
            sendError(`[System] Local AI fallback render failed:\n${fallbackError.message}`);
        }
    };

    sendLog(`[System] Starting engine pipeline... Provider: ${provider}, Model: ${reqModel}`);

    let generatedCode = "";

    const Templates = require('./Templates');
    const matchedTemplate = Templates.get(prompt);
    if (matchedTemplate) {
        sendLog(`[System] Starting engine pipeline... Provider: local-premade, Model: ${matchedTemplate.name}`);
        sendLog(`[AI] Generating code (Attempt 1/3) using local-premade...`);
        sendLog(`[AI] Instantiating template code directly into workspace...`);
        
        generatedCode = matchedTemplate.code;
        sendCode(generatedCode);
        fs.writeFileSync('./src/Video.tsx', generatedCode);
        updateCompositionDuration(duration, fps, width, height);

        sendLog(`[System] Rendering video on the fly...`);
        try {
            await runRenderStream(sendLog);
            sendLog(`[System] Render successful!`);
            sendSuccess();
        } catch (e) {
            sendError(`[System] Render failed:\n${e.message}`);
        }
        return;
    }
    
    if (provider === 'local' || (!apiKey && provider !== 'local')) {
        sendLog(`[AI] Generating code with Super-Template Engine...`);
        generatedCode = LocalAI.generate(prompt, duration, style, fps);
        generatedCode = ensureCodeImports(generatedCode);
        generatedCode = sanitizeCode(generatedCode);
        generatedCode = await processAssetCaching(generatedCode);
        sendCode(generatedCode);
        fs.writeFileSync('./src/Video.tsx', generatedCode);
        updateCompositionDuration(duration, fps, width, height);
        
        sendLog(`[System] Rendering video...`);
        try {
            await runRenderStream(sendLog);
            sendLog(`[System] Render successful!`);
            sendSuccess();
        } catch (e) {
            sendError(`[System] Render failed (Local AI cannot auto-fix):\n${e.message}`);
        }
        return;
    }

    // Dynamic AI Providers
    let baseSystemInstruction = "";
    try {
        const promptTxt = fs.readFileSync('Prompt.txt', 'utf8');
        baseSystemInstruction = promptTxt + `\n\nIMPORTANT OVERRIDE:\n1. Export as 'export const MyVideo'.\n2. Video Duration MUST be exactly ${duration} seconds (${duration * fps} frames at ${fps}fps).\n3. Visual Style: ${style.toUpperCase()}.\n4. 'easing' must be a SINGLE function.`;
    } catch (e) {
        baseSystemInstruction = `You are an expert Remotion Video Developer. Rules: 1. Export 'MyVideo'. 2. Duration: ${duration}s. 3. Style: ${style}. 4. No markdown.`;
    }

    let success = false;
    let currentUserPrompt = prompt;

    // AI Generation + Render + Auto-Fix Loop (Max 3 attempts)
    for (let attempt = 1; attempt <= 3; attempt++) {
        sendLog(`[AI] Generating code (Attempt ${attempt}/3) using ${provider.toUpperCase()}...`);
        try {
            const rawResponse = await universalGenerate(provider, reqModel, apiKey, baseSystemInstruction, currentUserPrompt);
            
            // Clean markdown wrappers using the new robust extractTSXCode function!
            generatedCode = extractTSXCode(rawResponse);
            generatedCode = ensureCodeImports(generatedCode);
            generatedCode = sanitizeCode(generatedCode);
            
            const validation = validateCode(generatedCode);
            if (!validation.valid) {
                sendLog(`[System] Pre-render validation found issues:\n${validation.errors.join('\\n')}`);
                if (attempt < 3) {
                    sendLog(`[AI] Requesting fix for validation errors...`);
                    currentUserPrompt = `Fix these validation errors:\n${validation.errors.join('\\n')}\n\nBroken code:\n${generatedCode}\n\nReturn ONLY the fully corrected code.`;
                    continue;
                } else {
                    throw new Error(`Validation failed on final attempt: ${validation.errors.join(', ')}`);
                }
            }

            generatedCode = await processAssetCaching(generatedCode);
            sendCode(generatedCode);
            fs.writeFileSync('./src/Video.tsx', generatedCode);
            updateCompositionDuration(duration, fps, width, height);
            
            sendLog(`[System] Running \`npm run render\`...`);
            await runRenderStream(sendLog);
            
            success = true;
            break; // Success!
            
        } catch (error) {
            sendLog(`[System] Attempt ${attempt} failed with error:\n${error.message}`);
            
            if (isAPIOrNetworkError(error)) {
                await handleLocalFallback(`Remote provider API/network error (${error.message})`);
                return;
            }

            if (attempt < 3) {
                sendLog(`[AI] Analyzing terminal output and requesting fix...`);
                currentUserPrompt = `The compilation or render failed with this terminal output:\n${error.message}\n\nBroken code:\n${generatedCode}\n\nFix the code based on the error. Return ONLY the fully corrected code without markdown blocks.`;
            } else {
                await handleLocalFallback(`Exhausted all 3 code-generation attempts. Final error:\n${error.message}`);
                return;
            }
        }
    }

    if (success) {
        sendLog(`[System] Render successful!`);
        sendSuccess();
    }
});

app.listen(port, () => {
    console.log(`\n🚀 Sednium Charon 1 running at http://localhost:${port}`);
    console.log(`   Universal AI | Auto-Fix | Multi-Provider | Programmatic Renderer`);
    console.log(`   CPU Cores: ${os.cpus().length} | Render Threads: ${Math.max(1, Math.floor(os.cpus().length * 0.75))}`);
});

