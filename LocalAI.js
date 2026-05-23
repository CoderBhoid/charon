// =============================================================================
// SEDNIUM VIGEN v8.0 — "GALAXY BRAIN + VEO KILLER + MEDIA" ENGINE
// =============================================================================
// Implements: Physics, D20 Creativity, NLP Semantic Router, Code Optimization,
//             Plugin Architecture, Style Engines, Internet Media Resolver
// =============================================================================

const comp = require('compromise');
const nlp = comp.default || comp;

// =============================================================================
// 1. EXTENDED THEME DEFINITIONS (4 → 10)
// =============================================================================
const THEMES = {
    cyberpunk: {
        keywords: ['cyber', 'cyberpunk', 'neon', 'techno', 'glitch', 'hacker', 'future', 'matrix'],
        bg: `background: 'linear-gradient(180deg, #09090b 0%, #1a1a2e 100%)',
            backgroundImage: 'linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 0, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px, 40px 40px'`,
        primary: '#00ff88', secondary: '#ff00ff',
        font: 'Courier New, monospace',
        glow: '0 0 10px #00ff88, 0 0 20px #00ff88',
        camera: 'shake', particles: 'scanlines'
    },
    retro: {
        keywords: ['retro', '80s', 'synthwave', 'vaporwave', 'sunset', 'arcade', 'vintage'],
        bg: `background: 'linear-gradient(to bottom, #2b003a 0%, #1a0b2e 50%, #ff0076 100%)',
            backgroundImage: 'repeating-linear-gradient(transparent 0%, transparent 48%, #ff0076 50%)',
            backgroundSize: '100% 20px'`,
        primary: '#ffce00', secondary: '#00ffff',
        font: 'Impact, sans-serif',
        glow: '4px 4px 0px #000',
        camera: 'static', particles: 'none'
    },
    space: {
        keywords: ['space', 'galaxy', 'star', 'universe', 'planet', 'cosmos', 'astronaut'],
        bg: `backgroundColor: '#000',
            backgroundImage: 'radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 3px), radial-gradient(white, rgba(255,255,255,.15) 1px, transparent 2px)',
            backgroundSize: '550px 550px, 350px 350px',
            backgroundPosition: '0 0, 40px 60px'`,
        primary: '#ffffff', secondary: '#60a5fa',
        font: 'Helvetica, sans-serif',
        glow: '0 0 20px rgba(255, 255, 255, 0.8)',
        camera: 'dolly', particles: 'stars'
    },
    fire: {
        keywords: ['fire', 'flame', 'burn', 'hot', 'lava', 'inferno', 'blaze'],
        bg: `background: 'linear-gradient(to top, #1a0000 0%, #3d0000 40%, #ff4500 100%)'`,
        primary: '#ff4500', secondary: '#ffd700',
        font: 'Georgia, serif',
        glow: '0 0 20px #ff4500, 0 0 40px #ff6600',
        camera: 'shake', particles: 'sparks'
    },
    ocean: {
        keywords: ['ocean', 'sea', 'water', 'wave', 'deep', 'underwater', 'aqua', 'marine'],
        bg: `background: 'linear-gradient(180deg, #001220 0%, #003355 50%, #006994 100%)'`,
        primary: '#00d4ff', secondary: '#0077b6',
        font: 'Georgia, serif',
        glow: '0 0 15px rgba(0, 212, 255, 0.5)',
        camera: 'pan', particles: 'bubbles'
    },
    forest: {
        keywords: ['forest', 'nature', 'tree', 'green', 'leaf', 'garden', 'jungle'],
        bg: `background: 'linear-gradient(180deg, #0a1a0a 0%, #1a3a1a 50%, #2d5a2d 100%)'`,
        primary: '#4ade80', secondary: '#166534',
        font: 'Georgia, serif',
        glow: '0 0 15px rgba(74, 222, 128, 0.4)',
        camera: 'zoom', particles: 'leaves'
    },
    midnight: {
        keywords: ['midnight', 'night', 'dark', 'moon', 'dream', 'shadow'],
        bg: `background: 'linear-gradient(135deg, #0c0c1d 0%, #1a1a3e 50%, #2d1b69 100%)'`,
        primary: '#c084fc', secondary: '#7c3aed',
        font: 'Georgia, serif',
        glow: '0 0 20px rgba(192, 132, 252, 0.5)',
        camera: 'dolly', particles: 'stars'
    },
    golden: {
        keywords: ['gold', 'golden', 'luxury', 'premium', 'elegant', 'royal', 'rich'],
        bg: `background: 'linear-gradient(135deg, #1a1a0a 0%, #2d2a0a 50%, #3d3510 100%)'`,
        primary: '#ffd700', secondary: '#daa520',
        font: 'Georgia, serif',
        glow: '0 0 20px rgba(255, 215, 0, 0.6)',
        camera: 'zoom', particles: 'shimmer'
    },
    glitch: {
        keywords: ['glitch', 'error', 'broken', 'corrupt', 'distort', 'pixel', 'digital'],
        bg: `background: 'linear-gradient(180deg, #000000 0%, #1a0020 100%)'`,
        primary: '#ff0040', secondary: '#00ff40',
        font: 'Courier New, monospace',
        glow: '3px 0 #ff0040, -3px 0 #00ff40',
        camera: 'shake', particles: 'none'
    },
    modern: {
        keywords: [],
        bg: `background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)'`,
        primary: '#3b82f6', secondary: '#8b5cf6',
        font: 'Inter, sans-serif',
        glow: '0 10px 30px rgba(0,0,0,0.3)',
        camera: 'static', particles: 'none'
    },
    autumn: {
        keywords: ['autumn', 'fall', 'harvest', 'maple', 'foliage', 'brown leaf', 'decay', 'sepia'],
        bg: `background: 'linear-gradient(180deg, #1e0f0a 0%, #3e1f13 50%, #5c2d18 100%)'`,
        primary: '#f97316', secondary: '#7c2d12',
        font: 'Georgia, serif',
        glow: '0 0 15px rgba(249, 115, 22, 0.4)',
        camera: 'pan', particles: 'leaves'
    },
    spring: {
        keywords: ['spring', 'blossom', 'sakura', 'bloom', 'flower', 'petal', 'flora', 'fresh', 'sprout'],
        bg: `background: 'linear-gradient(180deg, #1c0f16 0%, #3e1e2d 50%, #ffe4e1 100%)'`,
        primary: '#ec4899', secondary: '#10b981',
        font: 'Inter, sans-serif',
        glow: '0 0 15px rgba(236, 72, 153, 0.4)',
        camera: 'dolly', particles: 'petals'
    }
};

// =============================================================================
// 2. PHYSICS ENGINE — generates frame-based animation math as code strings
// =============================================================================
const PhysicsEngine = {
    gravity(varName, delay = 0, groundY = 0, speed = 1) {
        // Simulates acceleration: position = 0.5 * g * t^2, with bounce dampening
        return {
            hook: `    const ${varName}_t = Math.max(0, (frame - ${delay}) / fps) * ${speed};
    const ${varName}_raw = 0.5 * 980 * ${varName}_t * ${varName}_t;
    const ${varName}_bounce = Math.abs(Math.sin(${varName}_t * 3.5)) * Math.max(0, 1 - ${varName}_t * 0.3);
    const ${varName}_y = ${varName}_t > 0 ? Math.min(${groundY || 250}, ${varName}_raw) * ${varName}_bounce + ${groundY || 250} * (1 - ${varName}_bounce) : -200;\n`,
            transform: `translateY(\${${varName}_y - 200}px)`
        };
    },

    elasticBounce(varName, delay = 0, bounciness = 0.7, speed = 1) {
        return {
            hook: `    const ${varName}_prog = Math.max(0, (frame - ${delay}) / fps) * ${speed};
    const ${varName}_decay = Math.pow(${bounciness}, Math.floor(${varName}_prog * 4));
    const ${varName}_val = Math.abs(Math.sin(${varName}_prog * Math.PI * 3)) * ${varName}_decay;\n`,
            transform: `translateY(\${(1 - ${varName}_val) * 300 - 150}px)`
        };
    },

    orbit(varName, delay = 0, radius = 150, speed = 1) {
        return {
            hook: `    const ${varName}_angle = (((frame - ${delay}) / fps) * Math.PI * 2 * 0.5) * ${speed};\n`,
            transform: `translate(\${Math.cos(${varName}_angle) * ${radius}}px, \${Math.sin(${varName}_angle) * ${radius}}px)`
        };
    },

    slide(varName, delay = 0, from = -600, to = 0, speed = 1) {
        return {
            hook: `    const ${varName}_prog = Math.min(1, Math.max(0, ((frame - ${delay}) / (fps * 0.8)) * ${speed}));
    const ${varName}_ease = 1 - Math.pow(1 - ${varName}_prog, 3);
    const ${varName}_x = ${from} + (${to} - (${from})) * ${varName}_ease;\n`,
            transform: `translateX(\${${varName}_x}px)`
        };
    },

    spin(varName, delay = 0, speedMultiplier = 1, speed = 1) {
        return {
            hook: `    const ${varName}_rot = ((frame - ${delay}) / fps) * 360 * ${speedMultiplier} * ${speed};\n`,
            transform: `rotate(\${${varName}_rot}deg)`
        };
    },

    pulse(varName, delay = 0, speed = 1) {
        return {
            hook: `    const ${varName}_scale = 1 + Math.sin((frame - ${delay}) * 0.15 * ${speed}) * 0.2;\n`,
            transform: `scale(\${${varName}_scale})`
        };
    },

    explode(varName, delay = 0, speed = 1) {
        return {
            hook: `    const ${varName}_t = Math.max(0, (frame - ${delay}) / fps) * ${speed};
    const ${varName}_explodeScale = ${varName}_t > 1.5 ? 1 + (${varName}_t - 1.5) * 8 : 1;
    const ${varName}_explodeOpacity = ${varName}_t > 1.5 ? Math.max(0, 1 - (${varName}_t - 1.5) * 2) : 1;\n`,
            transform: `scale(\${${varName}_explodeScale})`,
            opacityMultiplier: `${varName}_explodeOpacity`
        };
    },

    float(varName, delay = 0, speed = 1) {
        return {
            hook: `    const ${varName}_floatY = Math.sin((frame - ${delay}) * 0.08 * ${speed}) * 30;
    const ${varName}_floatX = Math.cos((frame - ${delay}) * 0.05 * ${speed}) * 15;\n`,
            transform: `translate(\${${varName}_floatX}px, \${${varName}_floatY}px)`
        };
    },

    zigzag(varName, delay = 0, speed = 1) {
        return {
            hook: `    const ${varName}_prog = Math.max(0, (frame - ${delay}) / fps) * ${speed};
    const ${varName}_zigX = (${varName}_prog % 1) * 400 - 200;
    const ${varName}_zigY = Math.abs(Math.sin(${varName}_prog * Math.PI * 4)) * 200 - 100;\n`,
            transform: `translate(\${${varName}_zigX}px, \${${varName}_zigY}px)`
        };
    },

    collision(varName, impactFrame = 30, speed = 1) {
        // Generates impact reaction: scale bump + color flash at frame
        return {
            hook: `    const ${varName}_impact = frame > ${impactFrame} ? Math.max(1, 1.5 - (frame - ${impactFrame}) * 0.05 * ${speed}) : 1;
    const ${varName}_flash = frame > ${impactFrame} && frame < ${impactFrame + 8} ? 1 : 0;
    const ${varName}_filter = ${varName}_flash ? 'brightness(2)' : 'brightness(1)';\n`,
            transform: `scale(\${${varName}_impact})`,
            filterVar: `${varName}_filter`
        };
    },

    depthZoom(varName, delay = 0, speed = 1) {
        return {
            hook: `    const ${varName}_t = Math.max(0, (frame - ${delay}) / fps) * ${speed};
    const ${varName}_z = -1000 + Math.min(1000, ${varName}_t * 600);
    const ${varName}_rx = Math.sin(${varName}_t * 1.5) * 15;
    const ${varName}_ry = Math.cos(${varName}_t * 1.2) * 15;\n`,
            transform: `perspective(1000px) translateZ(\${${varName}_z}px) rotateX(\${${varName}_rx}deg) rotateY(\${${varName}_ry}deg)`
        };
    },

    helical(varName, delay = 0, speed = 1) {
        return {
            hook: `    const ${varName}_t = Math.max(0, (frame - ${delay}) / fps) * ${speed};
    const ${varName}_rad = 50 + ${varName}_t * 120;
    const ${varName}_angle = ${varName}_t * Math.PI * 2 * 0.7;
    const ${varName}_z = Math.sin(${varName}_t * Math.PI * 2) * 100;\n`,
            transform: `translate(\${Math.cos(${varName}_angle) * ${varName}_rad}px, \${Math.sin(${varName}_angle) * ${varName}_rad}px) perspective(800px) translateZ(\${${varName}_z}px) rotateZ(\${${varName}_angle * 57.29}deg)`
        };
    },

    sineWave(varName, delay = 0, speed = 1) {
        return {
            hook: `    const ${varName}_t = Math.max(0, (frame - ${delay}) / fps) * ${speed};
    const ${varName}_x = Math.sin(${varName}_t * 2.5) * 60;
    const ${varName}_y = Math.sin(${varName}_t * 4.0 + 1.0) * 35;
    const ${varName}_r = Math.cos(${varName}_t * 1.5) * 8;\n`,
            transform: `translate(\${${varName}_x}px, \${${varName}_y}px) rotate(\${${varName}_r}deg)`
        };
    }
};

// =============================================================================
// 3. CAMERA ENGINE — generates camera transform strings
// =============================================================================
const CameraEngine = {
    shake(intensity = 2) {
        return `translate(\${Math.sin(frame * 0.7) * ${intensity}}px, \${Math.cos(frame * 0.9) * ${intensity}}px)`;
    },
    zoom(startScale = 1, endScale = 1.1) {
        return `scale(\${${startScale} + (${endScale} - ${startScale}) * Math.min(1, frame / (fps * 3))})`;
    },
    pan(startX = 0, endX = 30) {
        return `translateX(\${${startX} + (${endX} - ${startX}) * Math.min(1, frame / (fps * 4))}px)`;
    },
    dolly(startScale = 0.95, endScale = 1.05) {
        return `scale(\${${startScale} + (${endScale} - ${startScale}) * Math.min(1, frame / (fps * 5))})`;
    },
    static() {
        return `translate(0px, 0px)`;
    },
    kenBurns(scale1 = 1, scale2 = 1.12, panX = 15) {
        return `scale(\${${scale1} + (${scale2} - ${scale1}) * Math.min(1, frame / (fps * 6))}) translateX(\${Math.sin(frame * 0.01) * ${panX}}px)`;
    },
    punchZoom(triggerOffset = 45) {
        return `scale(\${1 + Math.max(0, 0.15 - Math.abs(frame - ${triggerOffset}) * 0.005)})`;
    }
};

// =============================================================================
// 3b. STYLE ENGINE — Realistic / Anime / 2D rendering modes
// =============================================================================
const StyleEngine = {
    realistic: {
        // Glassmorphism wrapper — frosted glass panel
        wrapShape(innerContent, size, color) {
            return `<div style={{
                    width: ${size + 40}, height: ${size + 40},
                    position: 'absolute',
                    borderRadius: '24px',
                    background: 'rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                ${innerContent}
                </div>`;
        },
        // Neumorphic surface
        surfaceStyle(bgColor) {
            return `boxShadow: '6px 6px 12px rgba(0,0,0,0.4), -6px -6px 12px rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.05)'`;
        },
        // Smooth vignette overlay
        overlay() {
            return `            <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
                pointerEvents: 'none', zIndex: 50
            }} />\n`;
        },
        camera: 'kenBurns'
    },
    anime: {
        // Bold outline wrapper
        wrapShape(innerContent, size, color) {
            return `<div style={{
                    width: ${size + 10}, height: ${size + 10},
                    position: 'absolute',
                    borderRadius: '8px',
                    border: '4px solid #000',
                    boxShadow: '6px 6px 0px #000',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    filter: 'saturate(1.6) contrast(1.2)'
                }}>
                ${innerContent}
                </div>`;
        },
        // Speed lines overlay
        speedLines(color = 'rgba(255,255,255,0.15)') {
            return `            <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'repeating-linear-gradient(90deg, ${color} 0px, ${color} 2px, transparent 2px, transparent 20px)',
                transform: \`rotate(\${Math.sin(frame * 0.1) * 3}deg) scale(1.2)\`,
                opacity: Math.min(0.7, frame * 0.02),
                pointerEvents: 'none', zIndex: 50
            }} />\n`;
        },
        // Impact frame flash
        impactFlash(triggerFrame = 45) {
            return `            <div style={{
                position: 'absolute', inset: 0,
                background: 'white',
                opacity: (frame >= ${triggerFrame} && frame < ${triggerFrame + 3}) ? 0.9 : 0,
                pointerEvents: 'none', zIndex: 100
            }} />\n`;
        },
        camera: 'punchZoom'
    },
    '3d': {
        wrapShape(innerContent, size, color) {
            return innerContent;
        },
        camera: 'dolly'
    },
    '2d': {
        wrapShape(innerContent, size, color) {
            return innerContent; // No wrapper, use shape as-is
        },
        camera: null // Use theme default
    }
};

// =============================================================================
// 3c. MEDIA RESOLVER — Copyright-free images from Picsum & Pollinations
// =============================================================================
const IMAGE_TRIGGERS = ['photo of', 'picture of', 'image of', 'show me', 'pic of', 'photograph of'];

const MediaResolver = {
    // Deterministic Picsum background from prompt hash
    background(prompt) {
        // Simple string hash for deterministic seed
        let hash = 0;
        for (let i = 0; i < prompt.length; i++) {
            hash = ((hash << 5) - hash) + prompt.charCodeAt(i);
            hash |= 0;
        }
        const seed = Math.abs(hash).toString(36);
        return `https://picsum.photos/seed/${seed}/1280/720`;
    },

    // AI-generated image via Pollinations (each prompt = unique image)
    entityImage(description, width = 800, height = 800) {
        const encoded = encodeURIComponent(description.trim());
        return `https://image.pollinations.ai/prompt/${encoded}?width=${width}&height=${height}&nologo=true`;
    },

    // Check if prompt contains image trigger phrases
    detectImageIntent(prompt) {
        const p = prompt.toLowerCase();
        for (const trigger of IMAGE_TRIGGERS) {
            const idx = p.indexOf(trigger);
            if (idx !== -1) {
                // Extract the subject after the trigger phrase
                const subject = p.substring(idx + trigger.length).trim()
                    .replace(/^(a|an|the)\s+/i, '') // strip articles
                    .split(/\s+then\s+/i)[0]         // stop at scene break
                    .trim();
                return subject || null;
            }
        }
        return null;
    }
};

// =============================================================================
// 4. D20 CREATIVITY ENGINE — random theme injection for vague prompts
// =============================================================================
const THEME_PACKAGES = [
    // Roll 1–4: Minimalist
    { theme: 'modern', camera: 'static', particles: 'none', extraGlow: false, label: 'Pure Minimalist' },
    { theme: 'modern', camera: 'static', particles: 'none', extraGlow: false, label: 'Clean Slate' },
    { theme: 'modern', camera: 'zoom', particles: 'none', extraGlow: false, label: 'Zen Focus' },
    { theme: 'modern', camera: 'static', particles: 'none', extraGlow: false, label: 'Mono' },
    // Roll 5–9: Medium creativity
    { theme: 'midnight', camera: 'dolly', particles: 'stars', extraGlow: true, label: 'Paper Craft' },
    { theme: 'glitch', camera: 'shake', particles: 'none', extraGlow: true, label: 'Glitch Art' },
    { theme: 'golden', camera: 'zoom', particles: 'shimmer', extraGlow: true, label: 'Golden Hour' },
    { theme: 'ocean', camera: 'pan', particles: 'bubbles', extraGlow: false, label: 'Deep Ocean' },
    { theme: 'forest', camera: 'zoom', particles: 'leaves', extraGlow: false, label: 'Evergreen' },
    // Roll 10–14: High creativity
    { theme: 'fire', camera: 'shake', particles: 'sparks', extraGlow: true, label: 'Inferno' },
    { theme: 'space', camera: 'dolly', particles: 'stars', extraGlow: true, label: 'Nebula' },
    { theme: 'retro', camera: 'static', particles: 'none', extraGlow: true, label: 'Neon Pulse' },
    { theme: 'ocean', camera: 'pan', particles: 'bubbles', extraGlow: true, label: 'Liquid Metal' },
    { theme: 'midnight', camera: 'dolly', particles: 'stars', extraGlow: true, label: 'Aurora' },
    // Roll 15–19: Very creative
    { theme: 'space', camera: 'dolly', particles: 'stars', extraGlow: true, label: 'Space Odyssey' },
    { theme: 'retro', camera: 'pan', particles: 'none', extraGlow: true, label: 'Retro Arcade' },
    { theme: 'fire', camera: 'shake', particles: 'sparks', extraGlow: true, label: 'Fire & Ice' },
    { theme: 'glitch', camera: 'shake', particles: 'none', extraGlow: true, label: 'Digital Rain' },
    { theme: 'golden', camera: 'zoom', particles: 'shimmer', extraGlow: true, label: 'Royal Gala' },
    // Roll 20: Maximum creativity
    { theme: 'cyberpunk', camera: 'shake', particles: 'scanlines', extraGlow: true, label: 'Cyberpunk Neon City' }
];

function seededRandom(seed) {
    const x = Math.sin(seed * 9999) * 10000;
    return x - Math.floor(x);
}

function rollD20(prompt) {
    // Deterministic based on prompt content so same prompt = same result
    let seed = 0;
    for (let i = 0; i < prompt.length; i++) seed += prompt.charCodeAt(i) * (i + 1);
    return Math.floor(seededRandom(seed) * 20);
}

function isVaguePrompt(prompt, entities) {
    const words = prompt.trim().split(/\s+/);
    return words.length < 5 && entities.length <= 1;
}

// =============================================================================
// 5. EXTENDED VOCABULARY
// =============================================================================
const VOCAB = {
    colors: {
        'red': '#ef4444', 'blue': '#3b82f6', 'green': '#22c55e', 'yellow': '#eab308',
        'purple': '#a855f7', 'pink': '#ec4899', 'orange': '#f97316', 'white': '#ffffff',
        'black': '#000000', 'cyan': '#06b6d4', 'neon': '#00ff88', 'crimson': '#dc2626',
        'emerald': '#10b981', 'amber': '#f59e0b', 'violet': '#8b5cf6', 'coral': '#f87171',
        'teal': '#14b8a6', 'indigo': '#6366f1', 'lime': '#84cc16', 'rose': '#f43f5e',
        'silver': '#94a3b8', 'gold': '#ffd700', 'magenta': '#d946ef',
        'sakura': '#ffb7c5', 'maple': '#ff5722'
    },
    objects: {
        'ball': 'ball', 'circle': 'ball', 'sphere': 'ball', 'orb': 'ball', 'dot': 'ball',
        'box': 'box', 'square': 'box', 'cube': 'box', 'rectangle': 'box', 'block': 'box',
        'text': 'text', 'title': 'text', 'word': 'text', 'label': 'text', 'heading': 'text',
        'countdown': 'countdown', 'timer': 'countdown', 'counter': 'countdown',
        'triangle': 'triangle', 'star': 'star', 'diamond': 'diamond',
        'ring': 'ring', 'particle': 'particle', 'particles': 'particle',
        'wave': 'wave', 'line': 'line',
        'chart': 'chart', 'charts': 'chart', 'graph': 'chart', 'graphs': 'chart',
        'bar': 'chart', 'pie': 'chart', 'diagram': 'chart'
    },
    actions: {
        'bounce': 'bounce', 'bouncing': 'bounce', 'bounces': 'bounce', 'jump': 'bounce', 'jumping': 'bounce',
        'spin': 'spin', 'spinning': 'spin', 'spins': 'spin', 'rotate': 'spin', 'rotating': 'spin', 'rotation': 'spin',
        'turn': 'spin', 'turning': 'spin',
        'orbit': 'orbit', 'orbiting': 'orbit', 'orbits': 'orbit', 'revolve': 'orbit', 'circle': 'orbit',
        'slide': 'slide', 'sliding': 'slide', 'slides': 'slide', 'move': 'slide', 'moving': 'slide',
        'grow': 'pulse', 'growing': 'pulse', 'shrink': 'pulse', 'shrinking': 'pulse', 'pulse': 'pulse', 'pulsing': 'pulse',
        'scale': 'pulse', 'beat': 'pulse', 'heartbeat': 'pulse', 'throb': 'pulse',
        'explode': 'explode', 'exploding': 'explode', 'explodes': 'explode', 'burst': 'explode',
        'float': 'float', 'floating': 'float', 'floats': 'float', 'hover': 'float', 'hovering': 'float',
        'drift': 'float', 'drifting': 'float', 'glide': 'float', 'gliding': 'float',
        'zigzag': 'zigzag', 'zigzagging': 'zigzag', 'weave': 'zigzag',
        'fall': 'gravity', 'falling': 'gravity', 'falls': 'gravity', 'drop': 'gravity', 'dropping': 'gravity',
        'hit': 'collision', 'hitting': 'collision', 'hits': 'collision', 'crash': 'collision', 'collide': 'collision', 'smash': 'collision',
        'zoom': 'depthZoom', 'zooming': 'depthZoom', 'depth': 'depthZoom', 'fly': 'depthZoom', 'flying': 'depthZoom',
        'wavey': 'sineWave', 'waves': 'sineWave', 'helical': 'helical', 'spiral': 'helical', 'swirl': 'helical', 'swirling': 'helical'
    },
    sizes: {
        'tiny': 80, 'small': 120, 'medium': 200, 'big': 300, 'large': 300, 'huge': 400, 'giant': 500
    },
    layouts: {
        'grid': 'grid', 'split': 'split', 'columns': 'grid', 'side-by-side': 'split',
        'left': 'left', 'right': 'right', 'top': 'top', 'bottom': 'bottom'
    },
    transitions: {
        'fade': 'fade', 'slide': 'slide', 'zoom': 'zoom', 'flip': 'flip', 'transition': 'fade'
    },
    filters: {
        'glow': 'glow', 'glowing': 'glow', 'glows': 'glow', 'blur': 'blur', 'blurred': 'blur',
        'pixel': 'pixelate', 'pixelate': 'pixelate', 'pixelated': 'pixelate',
        'saturated': 'saturated', 'saturate': 'saturated', 'grayscale': 'grayscale',
        'gray': 'grayscale', 'vintage': 'vintage'
    },
    speeds: {
        'slow': 0.5, 'slowly': 0.5, 'fast': 2.0, 'rapid': 2.0, 'rapidly': 2.0, 'hyper': 4.0, 'instant': 10.0
    }
};

// =============================================================================
// 6. NLP SEMANTIC ROUTER (compromise.js)
// =============================================================================
const STOP_WORDS = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
    'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
    'should', 'may', 'might', 'can', 'shall', 'must', 'that', 'this',
    'these', 'those', 'it', 'its', 'my', 'your', 'his', 'her', 'our',
    'their', 'me', 'him', 'them', 'what', 'which', 'who', 'whom',
    'some', 'any', 'no', 'not', 'very', 'just', 'also', 'more', 'most',
    'make', 'create', 'show', 'display', 'render', 'generate', 'video',
    'animation', 'animate', 'cool', 'awesome', 'nice', 'good', 'great',
    'really', 'please', 'want', 'need', 'like'
]);

function semanticParse(prompt) {
    const doc = nlp(prompt);
    
    // Extract traditional nouns, verbs, adjectives for compatibility with downstream fallbacks
    const nouns = doc.nouns().toSingular().out('array')
        .map(n => n.toLowerCase().trim())
        .filter(n => !STOP_WORDS.has(n) && n.length > 1);

    const verbs = doc.verbs().toInfinitive().out('array')
        .map(v => v.toLowerCase().trim())
        .filter(v => !STOP_WORDS.has(v) && v.length > 1);

    const adjectives = doc.adjectives().out('array')
        .map(a => a.toLowerCase().trim())
        .filter(a => !STOP_WORDS.has(a) && a.length > 1);

    // Flatten docTerms from compromise sentences
    const docTerms = [];
    doc.json().forEach(sentence => {
        if (sentence.terms) {
            sentence.terms.forEach(term => {
                docTerms.push(term);
            });
        }
    });

    const termIdToWordIndex = {};
    docTerms.forEach((t, idx) => {
        termIdToWordIndex[t.id] = idx;
    });

    const nounPhrases = doc.nouns().json();
    const entities = [];
    const relationships = [];
    
    if (nounPhrases.length > 0) {
        const phrasesWithIndices = nounPhrases.map((phrase) => {
            return {
                phrase,
                terms: phrase.terms,
                firstTermId: phrase.terms[0]?.id,
                text: phrase.text
            };
        });
        
        const phrasesSorted = phrasesWithIndices.map(p => {
            const wordIdx = termIdToWordIndex[p.firstTermId] !== undefined ? termIdToWordIndex[p.firstTermId] : 0;
            return {
                ...p,
                wordIndex: wordIdx
            };
        }).sort((a, b) => a.wordIndex - b.wordIndex);
        
        let lastEntity = null;
        phrasesSorted.forEach((p, idx) => {
            const nextWordIndex = (idx + 1 < phrasesSorted.length) ? phrasesSorted[idx + 1].wordIndex : docTerms.length;
            const startIdx = (idx === 0) ? 0 : p.wordIndex;
            const endIdx = nextWordIndex;
            
            const scopeTerms = docTerms.slice(startIdx, endIdx);
            
            let currentColor = null;
            let currentSize = null;
            let currentAction = null;
            let currentSpeed = 1.0;
            let currentFilter = null;
            let currentLayout = null;
            let subjectNoun = null;
            let isPrimitive = false;
            let primitiveType = null;
            
            scopeTerms.forEach(term => {
                const token = term.normal || term.text.toLowerCase().trim();
                
                if (VOCAB.colors[token]) currentColor = VOCAB.colors[token];
                if (VOCAB.sizes[token]) currentSize = VOCAB.sizes[token];
                if (VOCAB.actions[token]) currentAction = VOCAB.actions[token];
                if (VOCAB.speeds[token] !== undefined) currentSpeed = VOCAB.speeds[token];
                if (VOCAB.filters[token]) currentFilter = VOCAB.filters[token];
                if (VOCAB.layouts[token]) currentLayout = VOCAB.layouts[token];
                
                if (VOCAB.objects[token]) {
                    isPrimitive = true;
                    primitiveType = VOCAB.objects[token];
                    subjectNoun = token;
                }
            });
            
            if (!subjectNoun) {
                const nounTerm = p.terms.find(t => t.tags.includes('Noun'));
                if (nounTerm) {
                    subjectNoun = nounTerm.normal || nounTerm.text.toLowerCase().trim();
                } else {
                    const lastTerm = p.terms[p.terms.length - 1];
                    subjectNoun = lastTerm?.normal || lastTerm?.text.toLowerCase().trim() || "concept";
                }
            }
            
            let entity;
            if (isPrimitive) {
                entity = {
                    type: primitiveType,
                    color: currentColor,
                    size: currentSize || 200,
                    action: currentAction,
                    speed: currentSpeed || 1.0,
                    filter: currentFilter,
                    layout: currentLayout,
                    text: subjectNoun.toUpperCase()
                };
            } else {
                const cleanDesc = p.text.toLowerCase()
                    .replace(/^(a|an|the)\s+/i, '')
                    .trim();
                
                entity = {
                    type: 'image',
                    src: `https://image.pollinations.ai/prompt/${encodeURIComponent(cleanDesc)}?width=800&height=800&nologo=true`,
                    text: cleanDesc.toUpperCase(),
                    color: currentColor || '#ffffff',
                    size: currentSize || 300,
                    action: currentAction || 'float',
                    speed: currentSpeed || 1.0,
                    filter: currentFilter,
                    layout: currentLayout
                };
            }
            
            if (lastEntity && lastEntity.action === 'collision') {
                relationships.push({
                    subject: lastEntity,
                    action: 'collision',
                    target: entity
                });
            }
            
            entities.push(entity);
            lastEntity = entity;
        });
    }
    
    if (entities.length === 0) {
        entities.push({
            type: 'text',
            color: '#ffffff',
            action: 'pulse',
            speed: 1.0,
            filter: null,
            layout: null,
            size: 200
        });
    }

    return { entities, relationships, nouns, verbs, adjectives };
}

// =============================================================================
// 7. SYNESTHESIA HELPERS (kept from v5)
// =============================================================================
function stringToColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
    const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
    return '#' + '00000'.substring(0, 6 - c.length) + c;
}

function stringToShape(str) {
    if (str.length < 4) return '50%';
    if (str.length < 7) return '20px';
    return '0px';
}

function stringToMotion(str) {
    const c = str.toLowerCase().charCodeAt(0);
    if (c < 105) return 'bounce';
    if (c < 115) return 'slide';
    return 'pulse';
}

// =============================================================================
// 8. PLUGIN ARCHITECTURE
// =============================================================================
const PLUGINS = {
    particles: {
        keywords: ['particle', 'particles', 'confetti', 'snow', 'rain', 'spark', 'sparks'],
        generate(count = 20, color1, color2, style = 'confetti') {
            let dataCode = `    const particles = useMemo(() => {\n        const arr = [];\n        for (let i = 0; i < ${count}; i++) {\n            const seed = Math.sin(i * 9999) * 10000;\n            const r = seed - Math.floor(seed);\n`;

            if (style === 'confetti') {
                dataCode += `            arr.push({ x: r * 1280, y: -50 - r * 200, size: 8 + r * 12, color: i % 2 === 0 ? '${color1}' : '${color2}', speed: 2 + r * 4, wobble: r * 6 });\n`;
            } else if (style === 'snow' || style === 'stars') {
                dataCode += `            arr.push({ x: r * 1280, y: r * 720, size: 2 + r * 4, color: 'rgba(255,255,255,' + (0.3 + r * 0.7) + ')', speed: 0.5 + r * 1.5, wobble: r * 3 });\n`;
            } else if (style === 'sparks') {
                dataCode += `            arr.push({ x: 640 + (r - 0.5) * 200, y: 360, size: 3 + r * 6, color: i % 3 === 0 ? '#ff4500' : i % 3 === 1 ? '#ffd700' : '#ff6600', speed: 3 + r * 8, angle: r * Math.PI * 2 });\n`;
            } else if (style === 'bubbles') {
                dataCode += `            arr.push({ x: r * 1280, y: 720 + r * 200, size: 10 + r * 25, color: 'rgba(0, 212, 255, ' + (0.2 + r * 0.3) + ')', speed: 1 + r * 2, wobble: r * 4 });\n`;
            } else if (style === 'leaves') {
                dataCode += `            arr.push({ x: r * 1280, y: -50 - r * 200, size: 12 + r * 18, color: i % 3 === 0 ? '#ff5722' : i % 3 === 1 ? '#ff9800' : '#795548', speed: 1.5 + r * 2.5, wobble: 15 + r * 15, angle: r * Math.PI * 2 });\n`;
            } else if (style === 'petals') {
                dataCode += `            arr.push({ x: r * 1280, y: -50 - r * 200, size: 8 + r * 12, color: i % 2 === 0 ? '#ffb7c5' : '#ffc0cb', speed: 1.0 + r * 2, wobble: 10 + r * 20, angle: r * Math.PI * 2 });\n`;
            } else {
                dataCode += `            arr.push({ x: r * 1280, y: r * 720, size: 4 + r * 8, color: i % 2 === 0 ? '${color1}' : '${color2}', speed: 1 + r * 3, wobble: r * 5 });\n`;
            }

            dataCode += `        }\n        return arr;\n    }, []);\n`;

            let contentCode = '';
            if (style === 'confetti') {
                contentCode = `            {particles.map((p, i) => (
                <div key={i} style={{
                    position: 'absolute',
                    left: p.x + Math.sin(frame * 0.05 + i) * p.wobble,
                    top: (p.y + frame * p.speed) % 800 - 50,
                    width: p.size, height: p.size,
                    background: p.color,
                    borderRadius: i % 3 === 0 ? '50%' : '2px',
                    transform: \`rotate(\${frame * (2 + i % 5)}deg)\`,
                    opacity: 0.8
                }} />
            ))}\n`;
            } else if (style === 'snow' || style === 'stars') {
                contentCode = `            {particles.map((p, i) => (
                <div key={i} style={{
                    position: 'absolute',
                    left: p.x + Math.sin(frame * 0.02 + i) * p.wobble,
                    top: (p.y + frame * p.speed) % 780,
                    width: p.size, height: p.size,
                    background: p.color,
                    borderRadius: '50%',
                    opacity: 0.5 + Math.sin(frame * 0.1 + i) * 0.3
                }} />
            ))}\n`;
            } else if (style === 'sparks') {
                contentCode = `            {particles.map((p, i) => (
                <div key={i} style={{
                    position: 'absolute',
                    left: p.x + Math.cos(p.angle) * frame * p.speed * 0.3,
                    top: p.y + Math.sin(p.angle) * frame * p.speed * 0.3 - frame * 0.5,
                    width: p.size, height: p.size,
                    background: p.color,
                    borderRadius: '50%',
                    opacity: Math.max(0, 1 - frame * 0.01),
                    boxShadow: '0 0 6px ' + p.color
                }} />
            ))}\n`;
            } else if (style === 'bubbles') {
                contentCode = `            {particles.map((p, i) => (
                <div key={i} style={{
                    position: 'absolute',
                    left: p.x + Math.sin(frame * 0.03 + i) * p.wobble,
                    top: p.y - frame * p.speed,
                    width: p.size, height: p.size,
                    border: '2px solid ' + p.color,
                    borderRadius: '50%',
                    opacity: Math.max(0, 0.6 - frame * 0.003)
                }} />
            ))}\n`;
            } else if (style === 'leaves') {
                contentCode = `            {particles.map((p, i) => (
                <div key={i} style={{
                    position: 'absolute',
                    left: p.x + Math.sin(frame * 0.04 + i) * p.wobble,
                    top: (p.y + frame * p.speed) % 800 - 50,
                    width: p.size, height: p.size * 0.6,
                    background: p.color,
                    borderRadius: '60% 0 60% 0',
                    transform: \`rotate(\${p.angle * 57.3 + frame * (1 + i % 3)}deg)\`,
                    opacity: 0.85,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                }} />
            ))}\n`;
            } else if (style === 'petals') {
                contentCode = `            {particles.map((p, i) => (
                <div key={i} style={{
                    position: 'absolute',
                    left: p.x + Math.sin(frame * 0.03 + i) * p.wobble,
                    top: (p.y + frame * p.speed) % 800 - 50,
                    width: p.size, height: p.size * 0.9,
                    background: p.color,
                    borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                    transform: \`rotate(\${p.angle * 57.3 + Math.sin(frame * 0.05 + i) * 20 + frame * 0.5}deg)\`,
                    opacity: 0.75
                }} />
            ))}\n`;
            } else {
                contentCode = `            {particles.map((p, i) => (
                <div key={i} style={{
                    position: 'absolute',
                    left: p.x + Math.sin(frame * 0.04 + i) * p.wobble,
                    top: (p.y + frame * p.speed) % 780,
                    width: p.size, height: p.size,
                    background: p.color,
                    borderRadius: '50%',
                    opacity: 0.6
                }} />
            ))}\n`;
            }

            return { hooks: dataCode, content: contentCode };
        }
    },

    math: {
        keywords: ['spiral', 'fibonacci', 'golden', 'fractal', 'geometric', 'pattern'],
        generate(type = 'spiral', color1, color2, count = 12) {
            if (type === 'spiral' || type === 'fibonacci') {
                const hook = `    const spiralItems = useMemo(() => {
        const items = [];
        const golden = (1 + Math.sqrt(5)) / 2;
        for (let i = 0; i < ${count}; i++) {
            const angle = i * golden * Math.PI * 2;
            const radius = Math.sqrt(i) * 40;
            items.push({ x: Math.cos(angle) * radius, y: Math.sin(angle) * radius, size: 10 + i * 3 });
        }
        return items;
    }, []);\n`;
                const content = `            {spiralItems.map((item, i) => (
                <div key={i} style={{
                    position: 'absolute',
                    left: 640 + item.x + Math.cos(frame * 0.02 + i) * 5,
                    top: 360 + item.y + Math.sin(frame * 0.02 + i) * 5,
                    width: item.size, height: item.size,
                    background: i % 2 === 0 ? '${color1}' : '${color2}',
                    borderRadius: '50%',
                    transform: \`scale(\${Math.min(1, (frame - i * 3) / 15)})\`,
                    opacity: Math.min(1, (frame - i * 3) / 15),
                    boxShadow: '0 0 10px ${color1}44'
                }} />
            ))}\n`;
                return { hooks: hook, content };
            }
            return { hooks: '', content: '' };
        }
    },

    geometry: {
        keywords: ['triangle', 'star', 'diamond', 'polygon', 'hexagon', 'shape'],
        generateShape(type, size, color) {
            if (type === 'triangle') {
                return `<div style={{
                    width: 0, height: 0,
                    borderLeft: '${size / 2}px solid transparent',
                    borderRight: '${size / 2}px solid transparent',
                    borderBottom: '${size}px solid ${color}',
                    position: 'absolute',
                    filter: 'drop-shadow(0 0 10px ${color}66)'
                }} />`;
            }
            if (type === 'star') {
                return `<div style={{
                    width: ${size}, height: ${size},
                    position: 'absolute',
                    background: '${color}',
                    clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                    filter: 'drop-shadow(0 0 15px ${color}88)'
                }} />`;
            }
            if (type === 'diamond') {
                return `<div style={{
                    width: ${size}, height: ${size},
                    position: 'absolute',
                    background: '${color}',
                    transform: 'rotate(45deg)',
                    borderRadius: '4px',
                    boxShadow: '0 0 20px ${color}66'
                }} />`;
            }
            if (type === 'ring') {
                return `<div style={{
                    width: ${size}, height: ${size},
                    position: 'absolute',
                    border: '4px solid ${color}',
                    borderRadius: '50%',
                    boxShadow: '0 0 15px ${color}44, inset 0 0 15px ${color}22'
                }} />`;
            }
            // Default: circle
            return `<div style={{
                    width: ${size}, height: ${size},
                    position: 'absolute',
                    background: '${color}',
                    borderRadius: '50%',
                    boxShadow: '0 0 30px ${color}66'
                }} />`;
        }
    },

    wave: {
        keywords: ['wave', 'waves', 'audio', 'sound', 'waveform'],
        generate(color, barCount = 40) {
            const hook = `    const waveData = useMemo(() => {
        return Array.from({ length: ${barCount} }, (_, i) => ({
            x: (i / ${barCount}) * 1280,
            phase: i * 0.3
        }));
    }, []);\n`;
            const content = `            {waveData.map((bar, i) => {
                const center = ${barCount} / 2;
                // Bell curve centered at the middle
                const bell = Math.exp(-Math.pow(i - center, 2) / (2 * Math.pow(${barCount} / 5, 2)));
                // Center-burst bass beats
                const bass = (Math.sin(frame * 0.18) * 60 + Math.cos(frame * 0.32 + 1) * 30 + 100) * bell;
                // Mid-to-high treble jitter on the flanks
                const jitter = Math.sin(frame * 0.5 + i * 1.8) * 15 * (1 - bell * 0.8) + Math.cos(frame * 0.8 - i * 2.2) * 8 * (1 - bell);
                const height = Math.max(10, bass + jitter + Math.sin(frame * 0.28 + i * 0.5) * 12 + 25);
                return (
                    <div key={i} style={{
                        position: 'absolute',
                        left: bar.x + 2,
                        bottom: 360 - height / 2,
                        width: ${Math.floor(1280 / barCount) - 4},
                        height: height,
                        background: 'linear-gradient(to top, ' + '${color}' + ' 0%, #ffffff 100%)',
                        borderRadius: '6px',
                        opacity: 0.55 + Math.sin(frame * 0.15 + i) * 0.25 + (bell * 0.2),
                        boxShadow: '0 0 12px ' + '${color}' + '55, inset 0 0 6px rgba(255,255,255,0.4)',
                        transform: \`scaleY(\${0.8 + Math.sin(frame * 0.1 + i * 0.2) * 0.2})\`,
                        transformOrigin: 'bottom center'
                    }} />
                );
            })}\n`;
            return { hooks: hook, content };
        }
    }
};

// =============================================================================
// 9. SMART THEME DETECTOR
// =============================================================================
function detectTheme(prompt) {
    const p = prompt.toLowerCase();
    for (const [key, theme] of Object.entries(THEMES)) {
        if (key === 'modern') continue;
        if (theme.keywords.some(k => p.includes(k))) return key;
    }
    return 'modern';
}

// =============================================================================
// 10. MAIN PROMPT PARSER (NLP + Regex hybrid)
// =============================================================================
function parseSinglePrompt(prompt, renderStyle = '2d') {
    const themeKey = detectTheme(prompt);
    const theme = THEMES[themeKey];
    const p = prompt.toLowerCase();

    // ── MEDIA RESOLVER: check for image intent ──
    const imageSubject = MediaResolver.detectImageIntent(prompt);
    let useImageBackground = (renderStyle === 'realistic');
    let needsImg = false;

    // Transition detection
    let transition = 'fade';
    for (const [k, v] of Object.entries(VOCAB.transitions)) {
        if (p.includes(k)) {
            transition = v;
            break;
        }
    }

    // NLP Parse
    const { entities: nlpEntities, relationships, nouns, verbs, adjectives } = semanticParse(prompt);

    // D20 Creativity: check if vague
    let creativityPackage = null;
    if (isVaguePrompt(prompt, nlpEntities) && !imageSubject) {
        const roll = rollD20(prompt);
        creativityPackage = THEME_PACKAGES[roll];
        console.log(`    🎲 D20 Roll: ${roll + 1} → "${creativityPackage.label}"`);
    }

    // If image trigger detected, create an image entity
    if (imageSubject) {
        const imgUrl = MediaResolver.entityImage(imageSubject, 800, 800);
        console.log(`    📷 Image: "${imageSubject}" → Pollinations`);
        needsImg = true;
        // Build entities: the image + any other parsed entities
        const entities = [{
            type: 'image',
            src: imgUrl,
            text: imageSubject.toUpperCase(),
            color: theme.primary,
            action: 'float',
            speed: 1.0,
            filter: null,
            layout: null,
            size: 400
        }];
        // Also add any NLP entities that aren't the image subject
        nlpEntities.forEach(e => {
            if (e.text && e.text.toLowerCase() !== imageSubject) {
                entities.push({
                    ...e,
                    color: e.color || theme.primary,
                    action: e.action || 'float',
                    speed: e.speed || 1.0,
                    filter: e.filter || null,
                    layout: e.layout || null,
                    size: e.size || 200
                });
            }
        });
        return buildSceneReturn(entities, relationships, themeKey, prompt, p, creativityPackage, renderStyle, needsImg, useImageBackground, transition);
    }

    // Use NLP entities, fill in defaults from theme
    // NOTE: concept entities stay as shapes — converting to Pollinations images is
    //       too aggressive and causes render failures when the API is unreachable.
    const entities = nlpEntities.map(e => {
        let chartType = undefined;
        if (e.type === 'chart') {
            chartType = 'bar';
            if (p.includes('line') || p.includes('graph')) chartType = 'line';
            else if (p.includes('pie')) chartType = 'pie';
        }
        return {
            ...e,
            color: e.color || theme.primary,
            action: e.action || 'float',
            speed: e.speed || 1.0,
            filter: e.filter || null,
            layout: e.layout || null,
            size: e.size || 200,
            chartType
        };
    });

    // Fallback: text entity
    if (entities.length === 0) {
        entities.push({
            type: 'text',
            color: theme.primary,
            action: 'pulse',
            speed: 1.0,
            filter: null,
            layout: null,
            size: 200
        });
    }

    return buildSceneReturn(entities, relationships, themeKey, prompt, p, creativityPackage, renderStyle, needsImg, useImageBackground, transition);
}

// Helper to construct scene return object
function buildSceneReturn(entities, relationships, themeKey, prompt, p, creativityPackage, renderStyle, needsImg, useImageBackground, transition) {
    // Extract display text
    let text = themeKey.toUpperCase();
    const quoteMatch = prompt.match(/["']([^"']+)["']/);
    if (quoteMatch) text = quoteMatch[1];

    // Countdown number
    let countdownStart = 5;
    const numMatch = prompt.match(/(\d+)\s*(?:sec|s)/i);
    if (numMatch) countdownStart = parseInt(numMatch[1]);

    // Detect plugins to activate
    const activePlugins = [];
    const allTokens = p.split(/[\s,.]+/);
    for (const [pluginName, plugin] of Object.entries(PLUGINS)) {
        if (plugin.keywords && plugin.keywords.some(k => allTokens.includes(k))) {
            activePlugins.push(pluginName);
        }
    }

    // If creativity package injected particles, add particle plugin
    if (creativityPackage && creativityPackage.particles !== 'none' && !activePlugins.includes('particles')) {
        activePlugins.push('particles');
    }

    // Style engine camera override
    const styleInfo = StyleEngine[renderStyle] || StyleEngine['2d'];
    let camera;
    if (styleInfo.camera) {
        camera = styleInfo.camera;
    } else if (creativityPackage) {
        camera = creativityPackage.camera;
    } else {
        camera = THEMES[themeKey].camera || 'static';
    }

    // Background image for realistic mode
    let backgroundImage = null;
    if (useImageBackground) {
        backgroundImage = MediaResolver.background(prompt);
        needsImg = true;
        console.log(`    🖼️ Background: Picsum (seed from prompt)`);
    }

    return {
        entities,
        relationships,
        theme: creativityPackage ? creativityPackage.theme : themeKey,
        camera,
        text,
        countdownStart,
        activePlugins,
        creativityPackage,
        renderStyle,
        needsImg,
        backgroundImage,
        transition: transition || 'fade',
        raw: p
    };
}

// =============================================================================
// 10b. SMART LAYOUT & VISUAL FILTERS HELPERS
// =============================================================================
function getLayoutSlotStyle(entity, index, total) {
    const layout = entity.layout;
    
    // Default style (full screen, centering contents)
    let style = {
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0
    };

    if (total <= 1) {
        return style;
    }

    // Explicit layouts
    if (layout === 'left') {
        return {
            ...style,
            width: '50%',
            height: '100%',
            left: 0,
            top: 0
        };
    }
    if (layout === 'right') {
        return {
            ...style,
            width: '50%',
            height: '100%',
            left: '50%',
            top: 0
        };
    }
    if (layout === 'top') {
        return {
            ...style,
            width: '100%',
            height: '50%',
            left: 0,
            top: 0
        };
    }
    if (layout === 'bottom') {
        return {
            ...style,
            width: '100%',
            height: '50%',
            left: 0,
            top: '50%'
        };
    }

    // Auto-layout splits to prevent overlap when total > 1
    if (total === 2) {
        if (index === 0) {
            return {
                ...style,
                width: '50%',
                height: '100%',
                left: 0,
                top: 0
            };
        } else {
            return {
                ...style,
                width: '50%',
                height: '100%',
                left: '50%',
                top: 0
            };
        }
    } else if (total === 3) {
        if (index === 0) {
            return {
                ...style,
                width: '50%',
                height: '100%',
                left: 0,
                top: 0
            };
        } else if (index === 1) {
            return {
                ...style,
                width: '50%',
                height: '50%',
                left: '50%',
                top: 0
            };
        } else {
            return {
                ...style,
                width: '50%',
                height: '50%',
                left: '50%',
                top: '50%'
            };
        }
    } else if (total >= 4) {
        const row = Math.floor(index / 2);
        const col = index % 2;
        return {
            ...style,
            width: '50%',
            height: '50%',
            left: col === 0 ? 0 : '50%',
            top: row === 0 ? 0 : '50%'
        };
    }

    return style;
}

function getEntityFilter(entity, themeData) {
    const filter = entity.filter;
    if (!filter) return 'brightness(1)';

    let cssFilter = 'brightness(1)';
    if (filter === 'glow') {
        cssFilter = `drop-shadow(0 0 15px ${entity.color || themeData.primary})`;
    } else if (filter === 'blur') {
        cssFilter = 'blur(8px)';
    } else if (filter === 'pixelate') {
        cssFilter = 'contrast(2) saturate(2)';
    } else if (filter === 'grayscale') {
        cssFilter = 'grayscale(1)';
    } else if (filter === 'vintage') {
        cssFilter = 'sepia(0.8) contrast(1.1)';
    } else if (filter === 'saturated') {
        cssFilter = 'saturate(2)';
    }
    return cssFilter;
}

// =============================================================================
// 11. SCENE CONTENT GENERATOR (Physics + Plugins + Relationships)
// =============================================================================
function generateSceneContent(scene, index, fps) {
    const { entities, relationships, text, countdownStart, theme, activePlugins, creativityPackage, renderStyle, backgroundImage } = scene;
    const themeData = THEMES[theme];
    const styleInfo = StyleEngine[renderStyle] || StyleEngine['2d'];
    let content = '';
    let hooks = '';

    // Background image layer (realistic mode with Picsum)
    if (backgroundImage) {
        content += `            <img src="${backgroundImage}" style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%',
                objectFit: 'cover', opacity: 0.4, filter: 'blur(2px)'
            }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />\n`;
    }

    // Generate physics-based hooks and content for each entity
    entities.forEach((entity, i) => {
        const delay = i * 12;

        // COUNTDOWN
        if (entity.type === 'countdown') {
            hooks += `    const countdownNum = Math.max(0, ${countdownStart} - Math.floor(frame / fps));\n`;
            hooks += `    const countdownPulse = 1 + Math.sin(frame * 0.5) * 0.1;\n`;
            content += `            <h1 style={{
                fontSize: 250, fontWeight: 'bold',
                fontFamily: '${themeData.font}', color: '${entity.color || themeData.primary}',
                position: 'absolute',
                transform: \`scale(\${countdownPulse})\`,
                textShadow: '${themeData.glow}'
            }}>{countdownNum}</h1>\n`;
            return;
        }

        // TEXT
        if (entity.type === 'text') {
            const physics = PhysicsEngine.slide(`text${i}`, delay, 0, 0, entity.speed || 1.0);
            hooks += physics.hook;
            hooks += `    const textOpacity${i} = Math.min(1, Math.max(0, (frame - ${delay}) / 15));\n`;
            const rawText = `<h1 style={{
                fontSize: 100, fontWeight: 'bold',
                fontFamily: '${themeData.font}',
                color: '${entity.color || themeData.primary}',
                zIndex: 10,
                textShadow: '${themeData.glow}',
                opacity: textOpacity${i}
            }}>${text}</h1>`;
            
            const slotStyle = getLayoutSlotStyle(entity, i, entities.length);
            const styleStr = Object.entries(slotStyle)
                .map(([k, v]) => `${k}: ${typeof v === 'string' ? `'${v}'` : v}`)
                .join(',\n                ');

            content += `            <div style={{
                ${styleStr}
            }}>
                ${styleInfo.wrapShape(rawText, 400, entity.color || themeData.primary)}
            </div>\n`;
            return;
        }

        // IMAGE (from MediaResolver — Pollinations/Picsum)
        if (entity.type === 'image' && entity.src) {
            const imgAction = entity.action || 'float';
            let physics;
            switch (imgAction) {
                case 'gravity': physics = PhysicsEngine.gravity(`img${i}`, delay, 0, entity.speed || 1.0); break;
                case 'bounce': physics = PhysicsEngine.elasticBounce(`img${i}`, delay, 0.7, entity.speed || 1.0); break;
                case 'orbit': physics = PhysicsEngine.orbit(`img${i}`, delay, 150, entity.speed || 1.0); break;
                case 'slide': physics = PhysicsEngine.slide(`img${i}`, delay, -600, 0, entity.speed || 1.0); break;
                case 'spin': physics = PhysicsEngine.spin(`img${i}`, delay, 1, entity.speed || 1.0); break;
                case 'pulse': physics = PhysicsEngine.pulse(`img${i}`, delay, entity.speed || 1.0); break;
                case 'explode': physics = PhysicsEngine.explode(`img${i}`, delay, entity.speed || 1.0); break;
                case 'zigzag': physics = PhysicsEngine.zigzag(`img${i}`, delay, entity.speed || 1.0); break;
                case 'depthZoom': physics = PhysicsEngine.depthZoom(`img${i}`, delay, entity.speed || 1.0); break;
                case 'helical': physics = PhysicsEngine.helical(`img${i}`, delay, entity.speed || 1.0); break;
                case 'sineWave': physics = PhysicsEngine.sineWave(`img${i}`, delay, entity.speed || 1.0); break;
                default: physics = PhysicsEngine.float(`img${i}`, delay, entity.speed || 1.0); break;
            }
            hooks += physics.hook;
            hooks += `    const img${i}_opacity = Math.min(1, Math.max(0, (frame - ${delay}) / 15));\n`;
            // Handle explode opacity multiplier for images
            if (physics.opacityMultiplier) {
                hooks += `    const img${i}_finalOpacity = img${i}_opacity * ${physics.opacityMultiplier};\n`;
            } else {
                hooks += `    const img${i}_finalOpacity = img${i}_opacity;\n`;
            }
            const imgContent = `<img src="${entity.src}" style={{
                    width: ${entity.size}, height: ${entity.size},
                    objectFit: 'cover',
                    borderRadius: '16px',
                    boxShadow: '0 8px 40px rgba(0,0,0,0.5), 0 0 20px ${entity.color}44'
                }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />`;
            const wrappedImg = styleInfo.wrapShape(imgContent, entity.size, entity.color);
            
            const slotStyle = getLayoutSlotStyle(entity, i, entities.length);
            const styleStr = Object.entries(slotStyle)
                .map(([k, v]) => `${k}: ${typeof v === 'string' ? `'${v}'` : v}`)
                .join(',\n                ');

            let imgFilterLine = '';
            const customImgFilter = getEntityFilter(entity, themeData);
            if (physics.filterVar) {
                imgFilterLine = `,\n                    filter: \`\${${physics.filterVar}} ${customImgFilter}\``;
            } else if (customImgFilter !== 'brightness(1)') {
                imgFilterLine = `,\n                    filter: '${customImgFilter}'`;
            }

            content += `            <div style={{
                ${styleStr}
            }}>
                <div style={{
                    position: 'absolute',
                    transform: \`${physics.transform}\`,
                    opacity: img${i}_finalOpacity${imgFilterLine}
                }}>
                    ${wrappedImg}
                </div>
            </div>\n`;
            // Add label below the image
            if (entity.text) {
                content += `            <div style={{
                position: 'absolute',
                bottom: 80,
                opacity: img${i}_finalOpacity,
                zIndex: 20
            }}>
                <p style={{
                    fontFamily: '${themeData.font}',
                    color: '${themeData.primary}',
                    fontSize: 36, fontWeight: 'bold',
                    textShadow: '${themeData.glow}',
                    textTransform: 'uppercase', letterSpacing: 4
                }}>${entity.text}</p>
            </div>\n`;
            }
            return;
        }

        // CHART
        if (entity.type === 'chart') {
            let chartHooks = '';
            let chartContent = '';
            if (entity.chartType === 'bar') {
                const values = [120, 240, 380, 290, 450];
                const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
                chartHooks += `    const chartOpacity_${i} = Math.min(1, Math.max(0, (frame - ${delay}) / 15));\n`;
                for (let bIdx = 0; bIdx < 5; bIdx++) {
                    const bDelay = delay + bIdx * 6;
                    const val = values[bIdx];
                    chartHooks += `    const barSpring_${i}_${bIdx} = spring({ frame: frame - ${bDelay}, fps, config: { damping: 14, mass: 0.8 } });\n`;
                    chartHooks += `    const barHeight_${i}_${bIdx} = interpolate(barSpring_${i}_${bIdx}, [0, 1], [0, ${val}]);\n`;
                    chartHooks += `    const barOpacity_${i}_${bIdx} = interpolate(barSpring_${i}_${bIdx}, [0, 0.2], [0, 1]);\n`;
                }

                chartContent += `
        <svg width="800" height="500" viewBox="0 0 800 500" style={{
            opacity: chartOpacity_${i},
            filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.5))',
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '24px',
            padding: '40px',
            border: '1px solid rgba(255,255,255,0.08)'
        }}>
            <defs>
                <linearGradient id="barGrad_${i}" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="${entity.color || themeData.primary}" stopOpacity="1" />
                    <stop offset="100%" stopColor="${themeData.secondary}" stopOpacity="0.4" />
                </linearGradient>
                <filter id="glow_${i}">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>
            <line x1="80" y1="80" x2="720" y2="80" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <line x1="80" y1="170" x2="720" y2="170" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <line x1="80" y1="260" x2="720" y2="260" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <line x1="80" y1="350" x2="720" y2="350" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <text x="50" y="85" fill="rgba(255,255,255,0.4)" fontSize="14" fontFamily="sans-serif">100%</text>
            <text x="50" y="175" fill="rgba(255,255,255,0.4)" fontSize="14" fontFamily="sans-serif">75%</text>
            <text x="50" y="265" fill="rgba(255,255,255,0.4)" fontSize="14" fontFamily="sans-serif">50%</text>
            <text x="50" y="355" fill="rgba(255,255,255,0.4)" fontSize="14" fontFamily="sans-serif">25%</text>
            <line x1="80" y1="440" x2="720" y2="440" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
            <line x1="80" y1="50" x2="80" y2="440" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
            <text x="80" y="35" fill="${entity.color || themeData.primary}" fontSize="22" fontWeight="bold" fontFamily="sans-serif" letterSpacing="1">${text.toUpperCase()}</text>
`;
                for (let bIdx = 0; bIdx < 5; bIdx++) {
                    const x = 120 + bIdx * 120;
                    const w = 60;
                    chartContent += `            <rect
                x="${x}"
                y={440 - barHeight_${i}_${bIdx}}
                width="${w}"
                height={barHeight_${i}_${bIdx}}
                fill="url(#barGrad_${i})"
                rx="6"
                ry="6"
                opacity={barOpacity_${i}_${bIdx}}
                style={{ filter: 'url(#glow_${i})' }}
            />
            <text
                x="${x + w / 2}"
                y={430 - barHeight_${i}_${bIdx}}
                fill="#ffffff"
                fontSize="16"
                fontWeight="bold"
                textAnchor="middle"
                opacity={barOpacity_${i}_${bIdx}}
                fontFamily="sans-serif"
            >
                {Math.round((barHeight_${i}_${bIdx} / 450) * 100)}%
            </text>
            <text
                x="${x + w / 2}"
                y="465"
                fill="rgba(255,255,255,0.6)"
                fontSize="14"
                textAnchor="middle"
                opacity={barOpacity_${i}_${bIdx}}
                fontFamily="sans-serif"
            >
                ${labels[bIdx]}
            </text>
`;
                }
                chartContent += `        </svg>\n`;

            } else if (entity.chartType === 'line') {
                chartHooks += `    const drawSpring_${i} = spring({ frame: frame - ${delay}, fps, config: { damping: 18, mass: 1.0 } });\n`;
                chartHooks += `    const clipWidth_${i} = interpolate(drawSpring_${i}, [0, 1], [0, 720]);\n`;
                chartHooks += `    const chartOpacity_${i} = Math.min(1, Math.max(0, (frame - ${delay}) / 15));\n`;

                chartContent += `
        <svg width="800" height="500" viewBox="0 0 800 500" style={{
            opacity: chartOpacity_${i},
            filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.5))',
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '24px',
            padding: '40px',
            border: '1px solid rgba(255,255,255,0.08)'
        }}>
            <defs>
                <linearGradient id="lineGrad_${i}" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="${entity.color || themeData.primary}" stopOpacity="1" />
                    <stop offset="100%" stopColor="${themeData.secondary}" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="areaGrad_${i}" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="${entity.color || themeData.primary}" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="${entity.color || themeData.primary}" stopOpacity="0.0" />
                </linearGradient>
                <filter id="glow_${i}">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <clipPath id="clip_${i}">
                    <rect x="0" y="0" width={clipWidth_${i}} height="500" />
                </clipPath>
            </defs>
            <line x1="80" y1="80" x2="720" y2="80" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <line x1="80" y1="170" x2="720" y2="170" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <line x1="80" y1="260" x2="720" y2="260" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <line x1="80" y1="350" x2="720" y2="350" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <text x="50" y="85" fill="rgba(255,255,255,0.4)" fontSize="14" fontFamily="sans-serif">100k</text>
            <text x="50" y="175" fill="rgba(255,255,255,0.4)" fontSize="14" fontFamily="sans-serif">75k</text>
            <text x="50" y="265" fill="rgba(255,255,255,0.4)" fontSize="14" fontFamily="sans-serif">50k</text>
            <text x="50" y="355" fill="rgba(255,255,255,0.4)" fontSize="14" fontFamily="sans-serif">25k</text>
            <line x1="80" y1="440" x2="720" y2="440" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
            <line x1="80" y1="50" x2="80" y2="440" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
            <text x="80" y="35" fill="${entity.color || themeData.primary}" fontSize="22" fontWeight="bold" fontFamily="sans-serif" letterSpacing="1">${text.toUpperCase()}</text>
            <g clipPath="url(#clip_${i})">
                <path
                    d="M 100 440 L 100 380 L 220 260 L 340 320 L 460 150 L 580 180 L 700 80 L 700 440 Z"
                    fill="url(#areaGrad_${i})"
                />
                <path
                    d="M 100 380 L 220 260 L 340 320 L 460 150 L 580 180 L 700 80"
                    fill="none"
                    stroke="url(#lineGrad_${i})"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ filter: 'url(#glow_${i})' }}
                />
                <circle cx="100" cy="380" r="7" fill="#ffffff" stroke="${entity.color || themeData.primary}" strokeWidth="3" />
                <text x="100" y="365" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">60k</text>
                <text x="100" y="465" fill="rgba(255,255,255,0.6)" fontSize="14" textAnchor="middle" fontFamily="sans-serif">Q1</text>
                
                <circle cx="220" cy="260" r="7" fill="#ffffff" stroke="${entity.color || themeData.primary}" strokeWidth="3" />
                <text x="220" y="245" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">180k</text>
                <text x="220" y="465" fill="rgba(255,255,255,0.6)" fontSize="14" textAnchor="middle" fontFamily="sans-serif">Q2</text>
                
                <circle cx="340" cy="320" r="7" fill="#ffffff" stroke="${entity.color || themeData.primary}" strokeWidth="3" />
                <text x="340" y="305" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">120k</text>
                <text x="340" y="465" fill="rgba(255,255,255,0.6)" fontSize="14" textAnchor="middle" fontFamily="sans-serif">Q3</text>
                
                <circle cx="460" cy="150" r="7" fill="#ffffff" stroke="${entity.color || themeData.primary}" strokeWidth="3" />
                <text x="460" y="135" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">290k</text>
                <text x="460" y="465" fill="rgba(255,255,255,0.6)" fontSize="14" textAnchor="middle" fontFamily="sans-serif">Q4</text>
                
                <circle cx="580" cy="180" r="7" fill="#ffffff" stroke="${entity.color || themeData.primary}" strokeWidth="3" />
                <text x="580" y="165" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">260k</text>
                <text x="580" y="465" fill="rgba(255,255,255,0.6)" fontSize="14" textAnchor="middle" fontFamily="sans-serif">Q5</text>
                
                <circle cx="700" cy="80" r="7" fill="#ffffff" stroke="${entity.color || themeData.primary}" strokeWidth="3" />
                <text x="700" y="65" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">360k</text>
                <text x="700" y="465" fill="rgba(255,255,255,0.6)" fontSize="14" textAnchor="middle" fontFamily="sans-serif">Q6</text>
            </g>
        </svg>
`;

            } else {
                chartHooks += `    const pieSpring_${i} = spring({ frame: frame - ${delay}, fps, config: { damping: 16, mass: 0.9 } });\n`;
                chartHooks += `    const chartOpacity_${i} = Math.min(1, Math.max(0, (frame - ${delay}) / 15));\n`;

                chartContent += `
        <svg width="800" height="500" viewBox="0 0 800 500" style={{
            opacity: chartOpacity_${i},
            filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.5))',
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '24px',
            padding: '40px',
            border: '1px solid rgba(255,255,255,0.08)'
        }}>
            <defs>
                <filter id="glow_${i}">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>
            <text x="50" y="35" fill="${entity.color || themeData.primary}" fontSize="22" fontWeight="bold" fontFamily="sans-serif" letterSpacing="1">${text.toUpperCase()}</text>
            <g style={{ filter: 'url(#glow_${i})' }}>
                <circle
                    cx="240"
                    cy="250"
                    r="120"
                    fill="none"
                    stroke="${entity.color || themeData.primary}"
                    strokeWidth="35"
                    strokeDasharray={\`\${377 * pieSpring_${i}} 754\`}
                    transform="rotate(-90 240 250)"
                    strokeLinecap="round"
                />
                <circle
                    cx="240"
                    cy="250"
                    r="120"
                    fill="none"
                    stroke="${themeData.secondary}"
                    strokeWidth="35"
                    strokeDasharray={\`\${226.2 * pieSpring_${i}} 754\`}
                    transform="rotate(90 240 250)"
                    strokeLinecap="round"
                />
                <circle
                    cx="240"
                    cy="250"
                    r="120"
                    fill="none"
                    stroke="#ffce00"
                    strokeWidth="35"
                    strokeDasharray={\`\${150.8 * pieSpring_${i}} 754\`}
                    transform="rotate(198 240 250)"
                    strokeLinecap="round"
                />
            </g>
            <circle cx="240" cy="250" r="95" fill="#11111a" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <text x="240" y="245" fill="rgba(255,255,255,0.4)" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif" letterSpacing="1">SHARE</text>
            <text x="240" y="270" fill="#ffffff" fontSize="24" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">100%</text>
            <g transform="translate(460, 160)" opacity={chartOpacity_${i}}>
                <rect x="0" y="0" width="24" height="24" rx="6" fill="${entity.color || themeData.primary}" />
                <text x="35" y="18" fill="#ffffff" fontSize="16" fontWeight="bold" fontFamily="sans-serif">Production</text>
                <text x="220" y="18" fill="${entity.color || themeData.primary}" fontSize="16" fontWeight="bold" fontFamily="sans-serif" textAnchor="end">50%</text>
                
                <rect x="0" y="45" width="24" height="24" rx="6" fill="${themeData.secondary}" />
                <text x="35" y="63" fill="#ffffff" fontSize="16" fontWeight="bold" fontFamily="sans-serif">Marketing</text>
                <text x="220" y="63" fill="${themeData.secondary}" fontSize="16" fontWeight="bold" fontFamily="sans-serif" textAnchor="end">30%</text>
                
                <rect x="0" y="90" width="24" height="24" rx="6" fill="#ffce00" />
                <text x="35" y="108" fill="#ffffff" fontSize="16" fontWeight="bold" fontFamily="sans-serif">R&D</text>
                <text x="220" y="108" fill="#ffce00" fontSize="16" fontWeight="bold" fontFamily="sans-serif" textAnchor="end">20%</text>
            </g>
        </svg>
`;
            }
            hooks += chartHooks;
            
            const slotStyle = getLayoutSlotStyle(entity, i, entities.length);
            const styleStr = Object.entries(slotStyle)
                .map(([k, v]) => `${k}: ${typeof v === 'string' ? `'${v}'` : v}`)
                .join(',\n                ');

            content += `            <div style={{
                ${styleStr}
            }}>
                ${chartContent}
            </div>\n`;
            return;
        }

        // WAVE
        if (entity.type === 'wave') {
            const waveResult = PLUGINS.wave.generate(entity.color || themeData.primary);
            hooks += waveResult.hooks;
            content += waveResult.content;
            return;
        }

        // PARTICLE (handled by plugin system below)
        if (entity.type === 'particle') {
            if (!activePlugins.includes('particles')) activePlugins.push('particles');
            return;
        }

        // SHAPES (ball, box, triangle, star, diamond, ring, concept)
        const entityColor = entity.color || themeData.primary;
        const entitySize = entity.size || 200;

        if (renderStyle === '3d' && ['ball', 'box', 'triangle', 'star', 'diamond', 'ring', 'concept'].includes(entity.type)) {
            content += `            <div style={{
                position: 'absolute',
                bottom: 80,
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                opacity: Math.min(1, frame / 15),
                zIndex: 20
            }}>
                <p style={{
                    fontFamily: '${themeData.font}',
                    color: '${entityColor}',
                    fontSize: 36, fontWeight: 'bold',
                    textShadow: '${themeData.glow}',
                    textTransform: 'uppercase', letterSpacing: 4
                }}>${(entity.text || entity.type).toUpperCase()}</p>
            </div>\n`;
            return;
        }

        // Select physics engine based on action
        let physicsResult;
        const action = entity.action || 'float';
        switch (action) {
            case 'gravity': physicsResult = PhysicsEngine.gravity(`e${i}`, delay, 0, entity.speed || 1.0); break;
            case 'bounce': physicsResult = PhysicsEngine.elasticBounce(`e${i}`, delay, 0.7, entity.speed || 1.0); break;
            case 'orbit': physicsResult = PhysicsEngine.orbit(`e${i}`, delay, 150, entity.speed || 1.0); break;
            case 'slide': physicsResult = PhysicsEngine.slide(`e${i}`, delay, -600, 0, entity.speed || 1.0); break;
            case 'spin': physicsResult = PhysicsEngine.spin(`e${i}`, delay, 1, entity.speed || 1.0); break;
            case 'pulse': physicsResult = PhysicsEngine.pulse(`e${i}`, delay, entity.speed || 1.0); break;
            case 'explode': physicsResult = PhysicsEngine.explode(`e${i}`, delay, entity.speed || 1.0); break;
            case 'float': physicsResult = PhysicsEngine.float(`e${i}`, delay, entity.speed || 1.0); break;
            case 'zigzag': physicsResult = PhysicsEngine.zigzag(`e${i}`, delay, entity.speed || 1.0); break;
            case 'depthZoom': physicsResult = PhysicsEngine.depthZoom(`e${i}`, delay, entity.speed || 1.0); break;
            case 'helical': physicsResult = PhysicsEngine.helical(`e${i}`, delay, entity.speed || 1.0); break;
            case 'sineWave': physicsResult = PhysicsEngine.sineWave(`e${i}`, delay, entity.speed || 1.0); break;
            case 'collision':
                // Collision with what? Check relationships
                const rel = relationships.find(r => r.subject === entity || r.target === entity);
                const impactFrame = Math.floor(fps * 1.5);
                physicsResult = PhysicsEngine.collision(`e${i}`, impactFrame, entity.speed || 1.0);
                // If subject, also add slide toward target
                if (rel && rel.subject === entity) {
                    const slidePhysics = PhysicsEngine.slide(`e${i}_slide`, 0, -300, 0, entity.speed || 1.0);
                    hooks += slidePhysics.hook;
                    physicsResult.transform = `${slidePhysics.transform} ${physicsResult.transform}`;
                }
                break;
            default: physicsResult = PhysicsEngine.float(`e${i}`, delay, entity.speed || 1.0); break;
        }

        hooks += physicsResult.hook;

        // Entry animation opacity
        hooks += `    const e${i}_opacity = Math.min(1, Math.max(0, (frame - ${delay}) / 10));\n`;

        // Build the shape (style-aware)
        let rawShape;
        if (entity.type === 'triangle' || entity.type === 'star' || entity.type === 'diamond' || entity.type === 'ring') {
            rawShape = PLUGINS.geometry.generateShape(entity.type, entitySize, entityColor);
        } else {
            // Ball or box or concept
            const shape = entity.type === 'ball' ? '50%' : (entity.shape || '10px');
            const labelJsx = entity.type === 'concept'
                ? `\n                <span style={{color:'white', fontFamily:'sans-serif', fontSize:${Math.floor(entitySize / 8)}, fontWeight:'bold', textAlign:'center'}}>${entity.text}</span>`
                : '';
            rawShape = `<div style={{
                    width: ${entitySize}, height: ${entitySize},
                    position: 'absolute',
                    borderRadius: '${shape}',
                    background: '${entityColor}',
                    boxShadow: '0 0 30px ${entityColor}66',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '2px solid rgba(255,255,255,0.15)'
                }}>${labelJsx}
                </div>`;
        }

        // Apply style engine wrapper (glassmorphism, bold outline, or passthrough)
        const shapeContent = styleInfo.wrapShape(rawShape, entitySize, entityColor);

        // Extra opacity multiplier (from explode etc.)
        const opacityExpr = physicsResult.opacityMultiplier
            ? `e${i}_opacity * ${physicsResult.opacityMultiplier}`
            : `e${i}_opacity`;

        const slotStyle = getLayoutSlotStyle(entity, i, entities.length);
        const styleStr = Object.entries(slotStyle)
            .map(([k, v]) => `${k}: ${typeof v === 'string' ? `'${v}'` : v}`)
            .join(',\n                ');

        let filterLine = '';
        const customFilter = getEntityFilter(entity, themeData);
        if (physicsResult.filterVar) {
            filterLine = `,\n                    filter: \`\${${physicsResult.filterVar}} ${customFilter}\``;
        } else if (customFilter !== 'brightness(1)') {
            filterLine = `,\n                    filter: '${customFilter}'`;
        }

        content += `            <div style={{
                ${styleStr}
            }}>
                <div style={{
                    position: 'absolute',
                    transform: \`${physicsResult.transform}\`,
                    opacity: ${opacityExpr}${filterLine}
                }}>
                    ${shapeContent}
                </div>
            </div>\n`;
    });

    // Activate plugins
    activePlugins.forEach(pluginName => {
        if (pluginName === 'particles') {
            const pStyle = creativityPackage ? creativityPackage.particles : 'confetti';
            const result = PLUGINS.particles.generate(25, themeData.primary, themeData.secondary, pStyle !== 'none' ? pStyle : 'confetti');
            hooks += result.hooks;
            content += result.content;
        }
        if (pluginName === 'math') {
            const result = PLUGINS.math.generate('spiral', themeData.primary, themeData.secondary);
            hooks += result.hooks;
            content += result.content;
        }
    });

    // Style-specific overlays
    if (renderStyle === 'realistic' && styleInfo.overlay) {
        content += styleInfo.overlay();
    }
    if (renderStyle === 'anime') {
        if (styleInfo.speedLines) {
            content += styleInfo.speedLines();
        }
        // Add impact flash if any collision/explode action exists
        const hasImpact = entities.some(e => e.action === 'collision' || e.action === 'explode');
        if (hasImpact && styleInfo.impactFlash) {
            content += styleInfo.impactFlash(Math.floor(fps * 1.5));
        }
    }

    return { content, hooks };
}

function generate(prompt, duration = 10, style = '2d', fps = 30) {
    console.log(`\n🧠 Galaxy Brain v8.0 — Parsing: "${prompt}" [style: ${style}, ${fps}fps]`);

    const prompts = prompt.split(/\s+then\s+/i);
    let anySceneNeedsImg = false;
    let sequences = '';
    const subComponents = [];
    const SCENE_DUR = Math.floor((duration * fps) / Math.max(1, prompts.length));

    prompts.forEach((pStr, idx) => {
        const scene = parseSinglePrompt(pStr, style);
        if (scene.needsImg) anySceneNeedsImg = true;
        const themeData = THEMES[scene.theme];
        const { content, hooks } = generateSceneContent(scene, idx, fps);

        // Generate 3D canvas backdrop if style is '3d'
        if (style === '3d') {
            const threeEntities = scene.entities.filter(e => ['ball', 'box', 'triangle', 'star', 'diamond', 'ring', 'concept'].includes(e.type));
            if (threeEntities.length === 0) {
                threeEntities.push({ type: 'concept', color: themeData.primary, text: scene.text || '3D Scene' });
            }

            const meshesCode = threeEntities.map((entity, i) => {
                const total = threeEntities.length;
                const xPos = (i - (total - 1) / 2) * 3.5;
                let geom = '';
                if (entity.type === 'ball') geom = `<sphereGeometry args={[1.2, 32, 32]} />`;
                else if (entity.type === 'box') geom = `<boxGeometry args={[2, 2, 2]} />`;
                else if (entity.type === 'triangle') geom = `<coneGeometry args={[1.2, 2.5, 32]} />`;
                else if (entity.type === 'ring') geom = `<torusGeometry args={[1.2, 0.4, 16, 100]} />`;
                else if (entity.type === 'diamond') geom = `<octahedronGeometry args={[1.4]} />`;
                else geom = `<torusKnotGeometry args={[1.1, 0.3, 100, 16]} />`; // star or concept

                return `            <mesh position={[${xPos}, Math.sin(frame * 0.05 + ${i}) * 0.4, 0]} rotation={[frame * 0.02, frame * 0.03 + ${i}, frame * 0.01]}>
                ${geom}
                <meshStandardMaterial roughness={0.12} metalness={0.88} color="${entity.color || themeData.primary}" />
            </mesh>`;
            }).join('\n');

            subComponents.push(`
const Scene3D_${idx}: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
    return (
        <ThreeCanvas width={1280} height={720} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 8, 5]} intensity={1.8} />
            <pointLight position={[-5, 5, -5]} intensity={1.5} color="${themeData.secondary}" />
            <gridHelper args={[30, 30, '${themeData.primary}', '${themeData.secondary}']} position={[0, -2.5, 0]} />
${meshesCode}
        </ThreeCanvas>
    );
};`);
        }

        // Camera motion (style-aware)
        let cameraTransform;
        switch (scene.camera) {
            case 'shake': cameraTransform = CameraEngine.shake(2); break;
            case 'zoom': cameraTransform = CameraEngine.zoom(1, 1.08); break;
            case 'pan': cameraTransform = CameraEngine.pan(0, 20); break;
            case 'dolly': cameraTransform = CameraEngine.dolly(0.97, 1.03); break;
            case 'kenBurns': cameraTransform = CameraEngine.kenBurns(1, 1.12, 15); break;
            case 'punchZoom': cameraTransform = CameraEngine.punchZoom(45); break;
            default: cameraTransform = CameraEngine.static(); break;
        }

        // Transition parameters
        const transDur = Math.min(15, Math.floor(SCENE_DUR / 3));
        let transitionHook = '';
        let transformExpr = '';
        let opacityExpr = '';

        if (scene.transition === 'fade') {
            transitionHook = `    const transOpacity = interpolate(frame, [0, ${transDur}, ${SCENE_DUR - transDur}, ${SCENE_DUR}], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });`;
            opacityExpr = `opacity: transOpacity,`;
            transformExpr = `transform: \`${cameraTransform}\`,`;
        } else if (scene.transition === 'slide') {
            transitionHook = `    const transX = interpolate(frame, [0, ${transDur}, ${SCENE_DUR - transDur}, ${SCENE_DUR}], [-1280, 0, 0, 1280], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const transOpacity = interpolate(frame, [0, ${Math.max(1, Math.floor(transDur / 3))}, ${SCENE_DUR - Math.max(1, Math.floor(transDur / 3))}, ${SCENE_DUR}], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });`;
            opacityExpr = `opacity: transOpacity,`;
            transformExpr = `transform: \`translateX(\${transX}px) ${cameraTransform}\`,`;
        } else if (scene.transition === 'zoom') {
            transitionHook = `    const transScale = interpolate(frame, [0, ${transDur}, ${SCENE_DUR - transDur}, ${SCENE_DUR}], [0.8, 1, 1, 1.2], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const transOpacity = interpolate(frame, [0, ${transDur}, ${SCENE_DUR - transDur}, ${SCENE_DUR}], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });`;
            opacityExpr = `opacity: transOpacity,`;
            transformExpr = `transform: \`scale(\${transScale}) ${cameraTransform}\`,`;
        } else if (scene.transition === 'flip') {
            transitionHook = `    const transRotY = interpolate(frame, [0, ${transDur}, ${SCENE_DUR - transDur}, ${SCENE_DUR}], [-90, 0, 0, 90], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const transOpacity = interpolate(frame, [0, ${transDur}, ${SCENE_DUR - transDur}, ${SCENE_DUR}], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });`;
            opacityExpr = `opacity: transOpacity,`;
            transformExpr = `transform: \`perspective(1000px) rotateY(\${transRotY}deg) ${cameraTransform}\`,`;
        }

        const scene3DInjection = style === '3d' ? `\n            <Scene3D_${idx} frame={frame} fps={fps} />` : '';

        subComponents.push(`
const Scene${idx}: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
${hooks}
${transitionHook}
    return (
        <AbsoluteFill style={{
            ${themeData.bg},
            display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
            ${transformExpr}
            ${opacityExpr}
        }}>${scene3DInjection}
${content}        </AbsoluteFill>
    );
};`);

        sequences += `
            <Sequence from={${idx * SCENE_DUR}} durationInFrames={${SCENE_DUR}}>
                <Scene${idx} />
            </Sequence>`;
    });

    console.log(`    ✅ Generated ${subComponents.length} scene(s), ${SCENE_DUR} frames each`);

    const threeImport = style === '3d' ? `import { ThreeCanvas } from '@remotion/three';\n` : '';

    return `import React, { useMemo } from 'react';
import { AbsoluteFill, useVideoConfig, useCurrentFrame, interpolate, Sequence, spring, Easing } from 'remotion';
${threeImport}
${subComponents.join('\n')}

export const MyVideo: React.FC = () => {
    return (
        <AbsoluteFill style={{background:'#000'}}>
            ${sequences}
        </AbsoluteFill>
    );
};`;
}

module.exports = { generate };
