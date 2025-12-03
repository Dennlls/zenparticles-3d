import React, { useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { ParticleConfig, ParticleShape } from './types';
import ParticleSystem from './components/ParticleSystem';
import UI from './components/UI';
import HandController from './components/HandController';

const App: React.FC = () => {
  const [config, setConfig] = useState<ParticleConfig>({
    count: 15000,
    color: '#00ffff',
    shape: ParticleShape.HEART
  });

  const [gestureData, setGestureData] = useState({
    factor: 0.5,
    isDetected: false
  });

  const handleGestureUpdate = useCallback((factor: number, isDetected: boolean) => {
    // Smooth dampening could be added here, but direct mapping feels more responsive for 3D
    setGestureData({ factor, isDetected });
  }, []);

  return (
    <div className="w-full h-screen bg-black relative overflow-hidden">
      
      {/* 3D Scene */}
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 2]} // Optimize for high DPI
        gl={{ antialias: false, alpha: false }}
      >
        <color attach="background" args={['#050505']} />
        
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <ParticleSystem 
          config={config} 
          gestureFactor={gestureData.factor} 
          isHandDetected={gestureData.isDetected}
        />
        
        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          maxDistance={20} 
          minDistance={2} 
          autoRotate={!gestureData.isDetected}
          autoRotateSpeed={0.5}
        />
      </Canvas>

      {/* UI Overlay */}
      <UI 
        config={config} 
        setConfig={setConfig} 
        gestureFactor={gestureData.factor}
        isHandDetected={gestureData.isDetected}
      />

      {/* Invisible Logic */}
      <HandController onGestureUpdate={handleGestureUpdate} />
      
    </div>
  );
};

export default App;