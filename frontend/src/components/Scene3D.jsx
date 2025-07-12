import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Html } from '@react-three/drei';
import { motion } from 'framer-motion';
import Planet from './Planet';
import ParticleField from './ParticleField';
import { planetData } from '../data/mockData';

const AnimatedStars = () => {
  const starsRef = useRef();
  
  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.x = state.clock.elapsedTime * 0.0008;
      starsRef.current.rotation.y = state.clock.elapsedTime * 0.0003;
    }
  });
  
  return <Stars ref={starsRef} radius={400} depth={60} count={3000} factor={5} saturation={0} fade />;
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
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{
          position: cameraPosition || [0, 10, 40],
          fov: 60,
          near: 0.1,
          far: 2000
        }}
        style={{ background: 'linear-gradient(to bottom, #000428, #004e92)' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[0, 0, 0]} intensity={3} color="#FDB813" />
        <pointLight position={[100, 100, 100]} intensity={0.8} color="#ffffff" />
        <pointLight position={[-100, -100, -100]} intensity={0.3} color="#6B93D6" />
        
        <AnimatedStars />
        <ParticleField />
        
        <SolarSystem
          activeSection={activeSection}
          onPlanetClick={onPlanetClick}
          cameraPosition={cameraPosition}
        />
        
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={8}
          maxDistance={300}
          autoRotate={false}
          autoRotateSpeed={0.8}
          dampingFactor={0.05}
          enableDamping={true}
        />
      </Canvas>
    </div>
  );
};

export default Scene3D;