import React, { useMemo } from 'react';
import { AbsoluteFill, useVideoConfig, useCurrentFrame, interpolate, Sequence, spring, Easing } from 'remotion';
import { ThreeCanvas } from '@remotion/three';

const Scene3D: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
    const starPositions = useMemo(() => {
        const positions = [];
        for (let i = 0; i < 150; i++) {
            positions.push([
                (Math.random() - 0.5) * 80,
                (Math.random() - 0.5) * 80,
                -30 - Math.random() * 30
            ]);
        }
        return positions;
    }, []);

    // Float Orion up/down and rotate it
    const floatY = Math.sin(frame * 0.02) * 0.2;
    const floatX = Math.cos(frame * 0.015) * 0.1;
    const rotateY = frame * 0.008;
    const rotateX = frame * 0.004;
    const rotateZ = frame * 0.002;

    return (
        <ThreeCanvas width={1280} height={720} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1 }}>
            <ambientLight intensity={0.25} />
            <directionalLight position={[10, 5, 5]} intensity={2.8} color="#fff8e7" />
            <pointLight position={[-8, -2, -5]} intensity={1.5} color="#1d4ed8" />
            {/* Stars - High Performance Points (1 draw call instead of 150) */}
            <points>
                <bufferGeometry attach="geometry">
                    <bufferAttribute
                        attach="attributes-position"
                        args={[new Float32Array(starPositions.flat()), 3]}
                    />
                </bufferGeometry>
                <pointsMaterial attach="material" size={0.15} color="#ffffff" sizeAttenuation={true} />
            </points>

            {/* Earth in the background */}
            <mesh position={[-7, -3, -15]} rotation={[0, frame * 0.001, 0]}>
                <sphereGeometry args={[6.5, 32, 32]} />
                <meshStandardMaterial color="#1e40af" roughness={0.8} metalness={0.1} />
            </mesh>
            
            {/* Earth atmosphere cloud glow */}
            <mesh position={[-7, -3, -14.9]} rotation={[0, frame * 0.0012, 0]} scale={[1.015, 1.015, 1.015]}>
                <sphereGeometry args={[6.5, 32, 32]} />
                <meshStandardMaterial color="#60a5fa" transparent={true} opacity={0.18} roughness={0.9} />
            </mesh>

            {/* Orion Spacecraft Group */}
            <group position={[floatX, floatY, 0]} rotation={[rotateX, rotateY, rotateZ]}>
                
                {/* Crew Module (Silver-Grey Capsule Cone) */}
                <mesh position={[0, 0.4, 0]} rotation={[0, 0, 0]}>
                    <coneGeometry args={[0.85, 1.1, 32]} />
                    <meshStandardMaterial color="#e5e7eb" metalness={0.9} roughness={0.1} />
                </mesh>
                
                {/* Capsule Base Shield */}
                <mesh position={[0, -0.15, 0]}>
                    <cylinderGeometry args={[0.85, 0.85, 0.15, 32]} />
                    <meshStandardMaterial color="#4b5563" metalness={0.7} roughness={0.4} />
                </mesh>
                
                {/* Service Module (White Cylinder) */}
                <mesh position={[0, -0.75, 0]}>
                    <cylinderGeometry args={[0.8, 0.8, 1.0, 32]} />
                    <meshStandardMaterial color="#f9fafb" metalness={0.8} roughness={0.2} />
                </mesh>
                
                {/* NASA Logo Band / Service module details */}
                <mesh position={[0, -0.75, 0]}>
                    <cylinderGeometry args={[0.81, 0.81, 0.15, 32]} />
                    <meshStandardMaterial color="#dc2626" metalness={0.1} roughness={0.9} />
                </mesh>

                {/* Thruster Nozzle */}
                <mesh position={[0, -1.4, 0]}>
                    <coneGeometry args={[0.25, 0.35, 32]} />
                    <meshStandardMaterial color="#111827" metalness={0.95} roughness={0.4} />
                </mesh>

                {/* Solar Arrays - Cross Shape (4 Panels) */}
                {/* Panel 1: Right */}
                <group position={[0.8, -0.75, 0]} rotation={[0, 0, -0.1]}>
                    <mesh position={[0.9, 0, 0]}>
                        <boxGeometry args={[1.8, 0.28, 0.04]} />
                        <meshStandardMaterial color="#1e3a8a" metalness={0.7} roughness={0.3} />
                    </mesh>
                    <mesh position={[0.1, 0, 0]}>
                        <cylinderGeometry args={[0.04, 0.04, 0.2, 16]} rotation={[0, 0, Math.PI/2]} />
                        <meshStandardMaterial color="#6b7280" metalness={0.8} roughness={0.2} />
                    </mesh>
                </group>

                {/* Panel 2: Left */}
                <group position={[-0.8, -0.75, 0]} rotation={[0, 0, 0.1]}>
                    <mesh position={[-0.9, 0, 0]}>
                        <boxGeometry args={[1.8, 0.28, 0.04]} />
                        <meshStandardMaterial color="#1e3a8a" metalness={0.7} roughness={0.3} />
                    </mesh>
                    <mesh position={[-0.1, 0, 0]}>
                        <cylinderGeometry args={[0.04, 0.04, 0.2, 16]} rotation={[0, 0, Math.PI/2]} />
                        <meshStandardMaterial color="#6b7280" metalness={0.8} roughness={0.2} />
                    </mesh>
                </group>

                {/* Panel 3: Front */}
                <group position={[0, -0.75, 0.8]} rotation={[0.1, 0, 0]}>
                    <mesh position={[0, 0, 0.9]} rotation={[0, Math.PI/2, 0]}>
                        <boxGeometry args={[1.8, 0.28, 0.04]} />
                        <meshStandardMaterial color="#1e3a8a" metalness={0.7} roughness={0.3} />
                    </mesh>
                    <mesh position={[0, 0, 0.1]}>
                        <cylinderGeometry args={[0.04, 0.04, 0.2, 16]} rotation={[Math.PI/2, 0, 0]} />
                        <meshStandardMaterial color="#6b7280" metalness={0.8} roughness={0.2} />
                    </mesh>
                </group>

                {/* Panel 4: Back */}
                <group position={[0, -0.75, -0.8]} rotation={[-0.1, 0, 0]}>
                    <mesh position={[0, 0, -0.9]} rotation={[0, Math.PI/2, 0]}>
                        <boxGeometry args={[1.8, 0.28, 0.04]} />
                        <meshStandardMaterial color="#1e3a8a" metalness={0.7} roughness={0.3} />
                    </mesh>
                    <mesh position={[0, 0, -0.1]}>
                        <cylinderGeometry args={[0.04, 0.04, 0.2, 16]} rotation={[Math.PI/2, 0, 0]} />
                        <meshStandardMaterial color="#6b7280" metalness={0.8} roughness={0.2} />
                    </mesh>
                </group>
                
            </group>
        </ThreeCanvas>
    );
};

const HUDOverlay: React.FC<{ frame: number; durationInFrames: number }> = ({ frame, durationInFrames }) => {
    const progress = frame / durationInFrames;
    const altitude = Math.floor(7420.4 + progress * 142.3);
    const speed = Math.floor(28400 - progress * 125);
    const fuel = (94.2 - progress * 0.4).toFixed(1);
    
    return (
        <AbsoluteFill style={{ zIndex: 10, pointerEvents: 'none', fontFamily: 'monospace' }}>
            <div style={{ position: 'absolute', top: 20, left: 20, right: 20, bottom: 20, border: '1px solid rgba(0, 255, 136, 0.15)', borderRadius: 8 }} />
            
            {/* Top Left: Mission Details */}
            <div style={{ position: 'absolute', top: 40, left: 40, background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(0, 255, 136, 0.3)', padding: 12, borderRadius: 6, width: 260, color: '#00ff88', fontSize: 11, textShadow: '0 0 4px rgba(0,255,136,0.3)' }}>
                <div style={{ fontWeight: 'bold', fontSize: 13, borderBottom: '1px solid rgba(0, 255, 136, 0.3)', paddingBottom: 4, marginBottom: 6 }}>MISSION FEED</div>
                <div>PROJECT: ARTEMIS II</div>
                <div>VESSEL: ORION MPCV</div>
                <div>BOOSTER: SLS BLOCK 1</div>
                <div>STATUS: LUNAR INJECTION</div>
            </div>

            {/* Top Right: Telemetry */}
            <div style={{ position: 'absolute', top: 40, right: 40, background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(0, 255, 136, 0.3)', padding: 12, borderRadius: 6, width: 260, color: '#00ff88', fontSize: 11, textShadow: '0 0 4px rgba(0,255,136,0.3)' }}>
                <div style={{ fontWeight: 'bold', fontSize: 13, borderBottom: '1px solid rgba(0, 255, 136, 0.3)', paddingBottom: 4, marginBottom: 6 }}>TELEMETRY</div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>ALTITUDE:</span><span>{altitude} KM</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>VELOCITY:</span><span>{speed} KM/H</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>PROPULSION:</span><span>{fuel}%</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>STABLE ORBIT:</span><span>TRUE</span></div>
            </div>

            {/* Bottom Left: Crew Status */}
            <div style={{ position: 'absolute', bottom: 40, left: 40, background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(0, 255, 136, 0.3)', padding: 12, borderRadius: 6, width: 260, color: '#00ff88', fontSize: 11, textShadow: '0 0 4px rgba(0,255,136,0.3)' }}>
                <div style={{ fontWeight: 'bold', fontSize: 13, borderBottom: '1px solid rgba(0, 255, 136, 0.3)', paddingBottom: 4, marginBottom: 6 }}>CREW BIOMETRICS</div>
                <div>CDR: G. WISEMAN [OK]</div>
                <div>PLT: V. GLOVER  [OK]</div>
                <div>MS1: C. KOCH    [OK]</div>
                <div>MS2: J. HANSEN  [OK]</div>
            </div>

            {/* Center Crosshair */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 30, height: 30, pointerEvents: 'none' }}>
                <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: 'rgba(0, 255, 136, 0.4)' }} />
                <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: 'rgba(0, 255, 136, 0.4)' }} />
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 6, height: 6, borderRadius: '50%', border: '1px solid #00ff88' }} />
            </div>

            {/* Scanning Grid Layer */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'linear-gradient(rgba(0, 255, 136, 0.03) 1px, transparent 1px)',
                backgroundSize: '100% 4px',
                pointerEvents: 'none'
            }} />
        </AbsoluteFill>
    );
};

export const MyVideo: React.FC = () => {
    const frame = useCurrentFrame();
    const { durationInFrames } = useVideoConfig();

    return (
        <AbsoluteFill style={{ background: '#000000', overflow: 'hidden' }}>
            <Scene3D frame={frame} fps={30} />
            <HUDOverlay frame={frame} durationInFrames={durationInFrames} />
        </AbsoluteFill>
    );
};
