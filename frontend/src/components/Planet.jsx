import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const Planet = ({ planet, planetKey, isActive, onClick }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  // Enhanced planet materials with better textures
  const planetMaterial = useMemo(() => {
    const materials = {
      sun: new THREE.MeshStandardMaterial({
        color: planet.color,
        emissive: planet.color,
        emissiveIntensity: 0.4,
        roughness: 0.1,
        metalness: 0.1,
        transparent: true,
        opacity: 0.95
      }),
      mercury: new THREE.MeshStandardMaterial({
        color: planet.color,
        roughness: 0.9,
        metalness: 0.1,
        bumpScale: 0.02,
        transparent: true,
        opacity: 0.9
      }),
      venus: new THREE.MeshStandardMaterial({
        color: planet.color,
        roughness: 0.7,
        metalness: 0.2,
        emissive: '#FFB649',
        emissiveIntensity: 0.1,
        transparent: true,
        opacity: 0.95
      }),
      earth: new THREE.MeshStandardMaterial({
        color: planet.color,
        roughness: 0.6,
        metalness: 0.3,
        emissive: '#4A90E2',
        emissiveIntensity: 0.05,
        bumpScale: 0.01,
        transparent: true,
        opacity: 0.95
      }),
      mars: new THREE.MeshStandardMaterial({
        color: planet.color,
        roughness: 0.8,
        metalness: 0.1,
        emissive: '#C1440E',
        emissiveIntensity: 0.05,
        bumpScale: 0.015,
        transparent: true,
        opacity: 0.9
      }),
      jupiter: new THREE.MeshStandardMaterial({
        color: planet.color,
        roughness: 0.5,
        metalness: 0.4,
        emissive: '#D8CA9D',
        emissiveIntensity: 0.08,
        transparent: true,
        opacity: 0.95
      })
    };
    
    return materials[planetKey] || materials.earth;
  }, [planet.color, planetKey]);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Enhanced planet rotation - faster spin
      meshRef.current.rotation.y += planetKey === 'sun' ? 0.015 : 0.02;
      
      // Orbital motion for planets (not the sun) - increased speed
      if (planetKey !== 'sun') {
        const time = state.clock.elapsedTime;
        const speed = planetKey === 'mercury' ? 0.08 : 
                     planetKey === 'venus' ? 0.06 : 
                     planetKey === 'earth' ? 0.05 : 
                     planetKey === 'mars' ? 0.04 : 0.03;
        
        const radius = Math.sqrt(planet.position[0] ** 2 + planet.position[2] ** 2);
        meshRef.current.position.x = Math.cos(time * speed) * radius;
        meshRef.current.position.z = Math.sin(time * speed) * radius;
        
        // Add slight vertical oscillation for more dynamic movement
        meshRef.current.position.y = Math.sin(time * speed * 0.5) * 0.2;
      }
      
      // Enhanced hover and active effects
      if (isActive || hovered) {
        meshRef.current.scale.setScalar(planet.scale * (isActive ? 1.4 : 1.2));
        // Add glow effect by increasing emissive intensity
        if (planetMaterial.emissive) {
          planetMaterial.emissiveIntensity = planetKey === 'sun' ? 0.6 : 0.15;
        }
      } else {
        meshRef.current.scale.setScalar(planet.scale);
        // Reset emissive intensity
        if (planetMaterial.emissive) {
          planetMaterial.emissiveIntensity = planetKey === 'sun' ? 0.4 : 
                                            planetKey === 'venus' ? 0.1 :
                                            planetKey === 'jupiter' ? 0.08 : 0.05;
        }
      }
    }
  });
  
  return (
    <group>
      <mesh
        ref={meshRef}
        position={planet.position}
        scale={planet.scale}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[1, 64, 64]} />
        <primitive object={planetMaterial} />
        
        {/* Atmospheric glow effect for planets */}
        {planetKey !== 'sun' && (
          <mesh scale={1.1}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshBasicMaterial
              color={planet.color}
              transparent
              opacity={0.1}
              side={THREE.BackSide}
            />
          </mesh>
        )}
        
        {/* Enhanced sun corona effect */}
        {planetKey === 'sun' && (
          <mesh scale={1.2}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshBasicMaterial
              color="#FFD700"
              transparent
              opacity={0.2}
              side={THREE.BackSide}
            />
          </mesh>
        )}
      </mesh>
      
      {/* Enhanced orbital rings with better visibility */}
      {planetKey !== 'sun' && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <ringGeometry args={[Math.sqrt(planet.position[0] ** 2 + planet.position[2] ** 2) - 0.05, 
                              Math.sqrt(planet.position[0] ** 2 + planet.position[2] ** 2) + 0.05, 
                              128]} />
          <meshBasicMaterial 
            color={planet.color} 
            transparent 
            opacity={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
      
      {/* Planet label with enhanced styling */}
      {(hovered || isActive) && (
        <Html position={[planet.position[0], planet.position[1] + planet.scale + 1.5, planet.position[2]]}>
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="bg-black bg-opacity-80 text-white px-4 py-2 rounded-lg text-sm font-medium backdrop-blur-sm border border-white border-opacity-20 shadow-lg"
            style={{ 
              boxShadow: `0 0 20px ${planet.color}40`,
              borderColor: planet.color
            }}
          >
            {planet.name}
            <div className="text-xs text-gray-300 mt-1">{planet.description}</div>
          </motion.div>
        </Html>
      )}
    </group>
  );
};

export default Planet;