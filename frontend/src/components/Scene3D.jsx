import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Html } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import Planet from './Planet';
import ParticleField from './ParticleField';
import AsteroidBelt from './AsteroidBelt';
import CosmicDust from './CosmicDust';
import CometSystem from './CometSystem';
import NebulaBackground from './NebulaBackground';

import { planetData } from '../data/mockData';
import { useTheme } from '../contexts/ThemeContext';

const AnimatedStars = () => {
  const starsRef = useRef();
  const { currentTheme } = useTheme();
  
  // Default color fallback
  const starColor = currentTheme?.starColor || '#ffffff';
  
  useFrame((state) => {
    if (starsRef.current) {
      // Slower star rotation (70% slower)
      starsRef.current.rotation.x = state.clock.elapsedTime * 0.00024; // 30% of 0.0008
      starsRef.current.rotation.y = state.clock.elapsedTime * 0.00009; // 30% of 0.0003
    }
  });
  
  return (
    <Stars 
      ref={starsRef} 
      radius={400} 
      depth={60} 
      count={2000} // Reduced from 3000 for better initial performance
      factor={5} 
      saturation={0} 
      fade 
      color={starColor}
    />
  );
};

// Camera animation component
const CameraController = ({ activeSection, isMobile }) => {
  const { camera, gl } = useThree();
  const controlsRef = useRef();
  
  useEffect(() => {
    if (!activeSection || activeSection === 'about') {
      // Zoom out to default view
      const defaultPosition = new THREE.Vector3(0, 10, 40);
      const defaultTarget = new THREE.Vector3(0, 0, 0);
      
      // Smooth animation to default position
      const startPosition = camera.position.clone();
      const startTarget = controlsRef.current?.target?.clone() || new THREE.Vector3(0, 0, 0);
      
      let progress = 0;
      const animateCamera = () => {
        progress += 0.02; // Animation speed
        
        if (progress <= 1) {
          // Interpolate camera position
          camera.position.lerpVectors(startPosition, defaultPosition, progress);
          
          // Interpolate camera target
          if (controlsRef.current) {
            const currentTarget = new THREE.Vector3().lerpVectors(startTarget, defaultTarget, progress);
            controlsRef.current.target.copy(currentTarget);
            controlsRef.current.update();
          }
          
          requestAnimationFrame(animateCamera);
        }
      };
      animateCamera();
    } else {
      // Zoom into the active planet
      const planet = Object.values(planetData).find(p => p.section === activeSection);
      if (planet) {
        const planetPosition = new THREE.Vector3(...planet.position);
        const zoomDistance = isMobile ? 8 : 6;
        const cameraOffset = new THREE.Vector3(zoomDistance, zoomDistance * 0.5, zoomDistance);
        const targetPosition = planetPosition.clone().add(cameraOffset);
        
        // Smooth animation to planet
        const startPosition = camera.position.clone();
        const startTarget = controlsRef.current?.target?.clone() || new THREE.Vector3(0, 0, 0);
        
        let progress = 0;
        const animateCamera = () => {
          progress += 0.02; // Animation speed
          
          if (progress <= 1) {
            // Interpolate camera position
            camera.position.lerpVectors(startPosition, targetPosition, progress);
            
            // Interpolate camera target to planet
            if (controlsRef.current) {
              const currentTarget = new THREE.Vector3().lerpVectors(startTarget, planetPosition, progress);
              controlsRef.current.target.copy(currentTarget);
              controlsRef.current.update();
            }
            
            requestAnimationFrame(animateCamera);
          }
        };
        animateCamera();
      }
    }
  }, [activeSection, camera, isMobile]);
  
  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={true}
      enableZoom={true}
      enableRotate={true}
      minDistance={isMobile ? 3 : 2}
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
  );
};

const SolarSystem = ({ activeSection, onPlanetClick }) => {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      // Slower rotation of the entire solar system (70% slower)
      groupRef.current.rotation.y += 0.00015; // 30% of 0.0005
    }
  });
  
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

const Scene3D = ({ activeSection, onPlanetClick, isMobile }) => {
  const { currentTheme } = useTheme();
  
  // Default color fallbacks
  const backgroundColor = currentTheme?.backgroundColor || '#000011';
  const ambientColor = currentTheme?.ambientLight || '#404040';
  const directionalColor = currentTheme?.directionalLight || '#ffffff';
  
  const handleReset = () => {
    setElapsedTime(0);
    setIsPlaying(true);
    setTimeSpeed(1);
  };
  
  const TimeAwareCanvas = ({ children }) => {
    useFrame((state, delta) => {
      if (isPlaying) {
        // Update elapsed time based on speed
        setElapsedTime(prev => prev + delta * timeSpeed);
        
        // Override the clock time for consistent speed control
        state.clock.elapsedTime = elapsedTime;
      }
    });
    return <>{children}</>;
  };
  
  return (
    <div className="w-full h-screen bg-black relative">
      <Canvas
        camera={{ position: [0, 10, 40], fov: 60 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        style={{ background: backgroundColor }}
      >
        <TimeAwareCanvas>
          {/* Enhanced Lighting */}
          <ambientLight intensity={0.4} color={ambientColor} />
          <directionalLight position={[10, 10, 5]} intensity={1} color={directionalColor} />
          <pointLight position={[0, 0, 0]} intensity={2} color="#FFA500" />
          
          {/* Camera Controls */}
          <CameraController activeSection={activeSection} isMobile={isMobile} />
          
          {/* Nebula Background */}
          <NebulaBackground />
          
          {/* Animated Stars */}
          <AnimatedStars />
          
          {/* Particle Field */}
          <ParticleField />
          
          {/* Cosmic Dust */}
          <CosmicDust />
          
          {/* Comet System */}
          <CometSystem />
          
          {/* Orbit Traces */}
          <OrbitTraces planets={planetData} showTraces={showTraces} />
          
          {/* Solar System */}
          <group>
            {/* Planets */}
            {Object.entries(planetData).map(([key, planet]) => (
              <group key={key}>
                <Planet
                  planet={planet}
                  planetKey={key}
                  isActive={activeSection === planet.section}
                  onClick={() => onPlanetClick(planet.section)}
                />
                {/* Moons */}
                <MoonSystem 
                  planetKey={key}
                  planetPosition={planet.position}
                  planetScale={planet.scale}
                />
              </group>
            ))}
            
            {/* Asteroid Belt */}
            <AsteroidBelt />
          </group>
          
          {/* Orbit Controls */}
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            zoomSpeed={0.6}
            panSpeed={0.8}
            rotateSpeed={0.4}
            minDistance={5}
            maxDistance={200}
            minPolarAngle={0}
            maxPolarAngle={Math.PI}
          />
        </TimeAwareCanvas>
      </Canvas>
      
      {/* Time Controls */}
      <TimeControls
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        timeSpeed={timeSpeed}
        setTimeSpeed={setTimeSpeed}
        onReset={handleReset}
        elapsedTime={elapsedTime}
      />
      
      {/* Orbit Traces Toggle */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-4 left-4 z-50"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowTraces(!showTraces)}
          className="px-4 py-2 rounded-lg backdrop-blur-sm border shadow-lg text-sm font-medium transition-all"
          style={{ 
            backgroundColor: currentTheme?.cardBackground,
            borderColor: currentTheme?.cardBorder,
            color: currentTheme?.textPrimary
          }}
        >
          {showTraces ? 'Hide Orbits' : 'Show Orbits'}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Scene3D;