import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

const AsteroidBelt = () => {
  const ref = useRef();
  const ringRef = useRef();
  
  // Generate asteroid belt between Mars and Jupiter - more realistic and thinner
  const asteroidPositions = useMemo(() => {
    const positions = new Float32Array(300 * 3); // Reduced from 600 to 300
    const minRadius = 23;
    const maxRadius = 25; // Reduced from 26 to 25 for thinner belt
    
    for (let i = 0; i < 300; i++) {
      const angle = (i / 300) * Math.PI * 2;
      const radius = minRadius + Math.random() * (maxRadius - minRadius);
      const variation = (Math.random() - 0.5) * 1; // Reduced variation from 2 to 1
      
      positions[i * 3] = Math.cos(angle) * radius + variation;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1; // Reduced vertical spread from 2 to 1
      positions[i * 3 + 2] = Math.sin(angle) * radius + variation;
    }
    return positions;
  }, []);

  const asteroidColors = useMemo(() => {
    const colors = new Float32Array(300 * 3); // Reduced from 600 to 300
    for (let i = 0; i < 300; i++) {
      const gray = 0.4 + Math.random() * 0.3;
      colors[i * 3] = gray;
      colors[i * 3 + 1] = gray * 0.8;
      colors[i * 3 + 2] = gray * 0.6;
    }
    return colors;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.001;
    }
  });

  return (
    <group>
      {/* Asteroid Belt */}
      <Points ref={ref} positions={asteroidPositions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#8B7355"
          size={0.8}
          sizeAttenuation={true}
          depthWrite={false}
          vertexColors={false}
        />
      </Points>

      {/* Asteroid Ring Visual Guide */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <ringGeometry args={[22, 26, 64]} />
        <meshBasicMaterial 
          color="#8B7355" 
          transparent 
          opacity={0.05}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

export default AsteroidBelt;