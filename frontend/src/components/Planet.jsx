import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { motion } from 'framer-motion';

const Planet = ({ planet, planetKey, isActive, onClick }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Planet rotation
      meshRef.current.rotation.y += planetKey === 'sun' ? 0.005 : 0.01;
      
      // Orbital motion for planets (not the sun)
      if (planetKey !== 'sun') {
        const time = state.clock.elapsedTime;
        const speed = planetKey === 'mercury' ? 0.02 : 
                     planetKey === 'venus' ? 0.015 : 
                     planetKey === 'earth' ? 0.01 : 
                     planetKey === 'mars' ? 0.008 : 0.005;
        
        const radius = Math.sqrt(planet.position[0] ** 2 + planet.position[2] ** 2);
        meshRef.current.position.x = Math.cos(time * speed) * radius;
        meshRef.current.position.z = Math.sin(time * speed) * radius;
      }
      
      // Hover and active effects
      if (isActive || hovered) {
        meshRef.current.scale.setScalar(planet.scale * (isActive ? 1.3 : 1.1));
      } else {
        meshRef.current.scale.setScalar(planet.scale);
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
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color={planet.color}
          emissive={planetKey === 'sun' ? planet.color : '#000000'}
          emissiveIntensity={planetKey === 'sun' ? 0.3 : 0}
          roughness={planetKey === 'sun' ? 0.1 : 0.8}
          metalness={planetKey === 'sun' ? 0.1 : 0.2}
        />
        
        {/* Orbital rings for visual effect */}
        {planetKey !== 'sun' && (
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <ringGeometry args={[Math.sqrt(planet.position[0] ** 2 + planet.position[2] ** 2) - 0.1, 
                                Math.sqrt(planet.position[0] ** 2 + planet.position[2] ** 2) + 0.1, 
                                64]} />
            <meshBasicMaterial color="#333333" transparent opacity={0.1} />
          </mesh>
        )}
      </mesh>
      
      {/* Planet label */}
      {(hovered || isActive) && (
        <Html position={[planet.position[0], planet.position[1] + planet.scale + 1, planet.position[2]]}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black bg-opacity-70 text-white px-3 py-1 rounded-lg text-sm font-medium backdrop-blur-sm"
          >
            {planet.name}
          </motion.div>
        </Html>
      )}
    </group>
  );
};

export default Planet;