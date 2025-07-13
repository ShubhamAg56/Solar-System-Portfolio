import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { useTheme } from '../contexts/ThemeContext';
import * as THREE from 'three';

const ParticleField = () => {
  const ref = useRef();
  const [particleCount, setParticleCount] = useState(1000);
  const { currentTheme } = useTheme();
  
  // Default color fallback
  const particleColor = currentTheme?.particleColor || '#E6E6FA';

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    const isLowEnd = navigator.hardwareConcurrency <= 4;
    
    if (isMobile || isLowEnd) {
      setParticleCount(500);
    } else {
      setParticleCount(1000);
    }
  }, []);
  
  // Generate random particle positions
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 400;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 400;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 400;
    }
    return positions;
  }, [particleCount]);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.0001;
      ref.current.rotation.y = state.clock.elapsedTime * 0.0002;
    }
  });
  
  return (
    <Points ref={ref} positions={particlePositions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={currentTheme.particleColor}
        size={0.5}
        sizeAttenuation={true}
        depthWrite={false}
        vertexColors={false}
      />
    </Points>
  );
};

export default ParticleField;