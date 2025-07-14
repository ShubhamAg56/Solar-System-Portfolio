import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Comet = ({ position, direction, speed = 0.02, color = '#87CEEB' }) => {
  const cometRef = useRef();
  const tailRef = useRef();
  
  // Create comet geometry and material
  const cometGeometry = useMemo(() => new THREE.SphereGeometry(0.3, 16, 16), []);
  const cometMaterial = useMemo(() => new THREE.MeshBasicMaterial({ 
    color: color,
    transparent: true,
    opacity: 0.9
  }), [color]);
  
  // Create tail geometry
  const tailGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    const tailLength = 50;
    
    for (let i = 0; i < tailLength; i++) {
      const t = i / tailLength;
      positions.push(
        -direction.x * t * 8,
        -direction.y * t * 8,
        -direction.z * t * 8
      );
      
      // Fade color from bright to transparent
      const alpha = 1 - t;
      colors.push(
        parseInt(color.slice(1, 3), 16) / 255,
        parseInt(color.slice(3, 5), 16) / 255,
        parseInt(color.slice(5, 7), 16) / 255,
        alpha
      );
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 4));
    
    return geometry;
  }, [direction, color]);
  
  const tailMaterial = useMemo(() => new THREE.PointsMaterial({
    size: 0.1,
    transparent: true,
    vertexColors: true,
    blending: THREE.AdditiveBlending
  }), []);
  
  useFrame((state) => {
    if (cometRef.current && tailRef.current) {
      const time = state.clock.elapsedTime;
      
      // Move comet along its trajectory
      cometRef.current.position.x = position[0] + direction.x * speed * time * 100;
      cometRef.current.position.y = position[1] + direction.y * speed * time * 100;
      cometRef.current.position.z = position[2] + direction.z * speed * time * 100;
      
      // Move tail with comet
      tailRef.current.position.copy(cometRef.current.position);
      
      // Reset position if comet goes too far
      const distance = Math.sqrt(
        Math.pow(cometRef.current.position.x, 2) +
        Math.pow(cometRef.current.position.y, 2) +
        Math.pow(cometRef.current.position.z, 2)
      );
      
      if (distance > 200) {
        cometRef.current.position.set(position[0], position[1], position[2]);
      }
      
      // Add subtle glow effect
      cometRef.current.rotation.x += 0.01;
      cometRef.current.rotation.y += 0.01;
    }
  });
  
  return (
    <group>
      {/* Comet core */}
      <mesh ref={cometRef} geometry={cometGeometry} material={cometMaterial} />
      
      {/* Comet tail */}
      <points ref={tailRef} geometry={tailGeometry} material={tailMaterial} />
      
      {/* Comet glow */}
      <mesh ref={cometRef} scale={2}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={0.2} 
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};

// Comet system component
const CometSystem = () => {
  const comets = useMemo(() => [
    {
      position: [-100, 20, -50],
      direction: { x: 1, y: -0.2, z: 0.5 },
      speed: 0.025,
      color: '#87CEEB'
    },
    {
      position: [80, -30, -80],
      direction: { x: -0.8, y: 0.3, z: 1 },
      speed: 0.02,
      color: '#B0E0E6'
    },
    {
      position: [-50, 50, 100],
      direction: { x: 0.6, y: -0.8, z: -0.7 },
      speed: 0.03,
      color: '#E0FFFF'
    }
  ], []);
  
  return (
    <group>
      {comets.map((comet, index) => (
        <Comet
          key={index}
          position={comet.position}
          direction={comet.direction}
          speed={comet.speed}
          color={comet.color}
        />
      ))}
    </group>
  );
};

export default CometSystem;