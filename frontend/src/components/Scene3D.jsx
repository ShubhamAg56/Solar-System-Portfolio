import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Html } from '@react-three/drei';
import { motion } from 'framer-motion';
import Planet from './Planet';
import ParticleField from './ParticleField';
import AsteroidBelt from './AsteroidBelt';
import CosmicDust from './CosmicDust';
import { planetData } from '../data/mockData';
import { useTheme } from '../contexts/ThemeContext';

const AnimatedStars = () => {
  const starsRef = useRef();
  const { currentTheme } = useTheme();
  
  // Default color fallback
  const starColor = currentTheme?.starColor || '#ffffff';
  
  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.x = state.clock.elapsedTime * 0.0008;
      starsRef.current.rotation.y = state.clock.elapsedTime * 0.0003;
    }
  });
  
  return (
    <Stars 
      ref={starsRef} 
      radius={400} 
      depth={60} 
      count={3000} 
      factor={5} 
      saturation={0} 
      fade 
      color={starColor}
    />
  );
};

const SolarSystem = ({ activeSection, onPlanetClick, cameraPosition }) => {
  const groupRef = useRef();
  const { camera } = useThree();
  
  useFrame((state) => {
    if (groupRef.current) {
      // Faster rotation of the entire solar system
      groupRef.current.rotation.y += 0.0005;
    }
  });
  
  useEffect(() => {
    if (cameraPosition) {
      camera.position.set(...cameraPosition);
    }
  }, [cameraPosition, camera]);
  
  return (
    <group ref={groupRef}>
      {Object.entries(planetData).map(([key, planet]) => (
        <Planet
          key={key}
          planet={planet}
          planetKey={key}
          isActive={activeSection === planet.section}
          onClick={() => onPlanetClick(planet.section)}
        />
      ))}
    </group>
  );
};

const Scene3D = ({ activeSection, onPlanetClick, cameraPosition }) => {
  const [isMobile, setIsMobile] = useState(false);
  const { currentTheme } = useTheme();
  
  // Default color fallbacks
  const sunColor = currentTheme?.sunColor || '#FFA500';
  const background = currentTheme?.background || 'linear-gradient(to bottom, #000428, #004e92)';

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{
          position: cameraPosition || [0, 10, 40],
          fov: isMobile ? 70 : 60,
          near: 0.1,
          far: 2000
        }}
        style={{ background: currentTheme.background }}
        gl={{ antialias: true, alpha: false }}
        performance={{ min: 0.8 }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[0, 0, 0]} intensity={4} color={currentTheme.sunColor} />
        <pointLight position={[100, 100, 100]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-100, -100, -100]} intensity={0.5} color="#6B93D6" />
        
        <AnimatedStars />
        <ParticleField />
        <CosmicDust />
        <AsteroidBelt />
        
        <SolarSystem
          activeSection={activeSection}
          onPlanetClick={onPlanetClick}
          cameraPosition={cameraPosition}
        />
        
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={isMobile ? 15 : 8}
          maxDistance={isMobile ? 200 : 300}
          autoRotate={false}
          autoRotateSpeed={0.8}
          dampingFactor={0.05}
          enableDamping={true}
          touches={{
            ONE: isMobile ? 2 : 0, // Pan on mobile
            TWO: isMobile ? 1 : 2, // Zoom on mobile
          }}
          mouseButtons={{
            LEFT: 0,
            MIDDLE: 1,
            RIGHT: 2
          }}
          maxPolarAngle={Math.PI * 0.75}
          minPolarAngle={Math.PI * 0.25}
        />
      </Canvas>
    </div>
  );
};

export default Scene3D;