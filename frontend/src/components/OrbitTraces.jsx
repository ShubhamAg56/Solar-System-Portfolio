import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const OrbitTrace = ({ radius, color, opacity = 0.3, segments = 128 }) => {
  const orbitRef = useRef();
  
  const orbitGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      positions.push(x, 0, z);
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geometry;
  }, [radius, segments]);
  
  const orbitMaterial = useMemo(() => new THREE.LineBasicMaterial({
    color: color,
    transparent: true,
    opacity: opacity,
    linewidth: 2
  }), [color, opacity]);
  
  useFrame((state) => {
    if (orbitRef.current) {
      // Subtle glow effect
      const time = state.clock.elapsedTime;
      orbitRef.current.material.opacity = opacity + Math.sin(time * 2) * 0.1;
    }
  });
  
  return (
    <line
      ref={orbitRef}
      geometry={orbitGeometry}
      material={orbitMaterial}
    />
  );
};

const OrbitTraces = ({ planets, showTraces = true }) => {
  if (!showTraces) return null;
  
  const orbitData = useMemo(() => {
    const orbits = [];
    
    Object.entries(planets).forEach(([key, planet]) => {
      if (key !== 'sun') {
        const radius = Math.sqrt(planet.position[0] ** 2 + planet.position[2] ** 2);
        orbits.push({
          key,
          radius,
          color: planet.color,
          opacity: 0.4
        });
      }
    });
    
    return orbits;
  }, [planets]);
  
  return (
    <group>
      {orbitData.map((orbit) => (
        <OrbitTrace
          key={orbit.key}
          radius={orbit.radius}
          color={orbit.color}
          opacity={orbit.opacity}
        />
      ))}
    </group>
  );
};

export default OrbitTraces;