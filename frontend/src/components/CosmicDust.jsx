import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { useTheme } from '../contexts/ThemeContext';
import * as THREE from 'three';

const CosmicDust = () => {
  const ref = useRef();
  const { currentTheme } = useTheme();
  
  // Default color fallback
  const particleColor = currentTheme?.particleColor || '#E6E6FA';
  
  // Generate cosmic dust particles (optimized for faster loading)
  const dustPositions = useMemo(() => {
    const isMobile = window.innerWidth <= 768;
    const particleCount = isMobile ? 800 : 1200; // Reduced from 2000
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 600;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 600;
    }
    return positions;
  }, []);

  const dustColors = useMemo(() => {
    const isMobile = window.innerWidth <= 768;
    const particleCount = isMobile ? 800 : 1200; // Reduced from 2000
    const colors = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const brightness = Math.random() * 0.5 + 0.3;
      colors[i * 3] = brightness;
      colors[i * 3 + 1] = brightness * 0.9;
      colors[i * 3 + 2] = brightness * 1.1;
    }
    return colors;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      // Slower cosmic dust rotation (70% slower)
      ref.current.rotation.x = state.clock.elapsedTime * 0.00009; // 30% of 0.0003
      ref.current.rotation.y = state.clock.elapsedTime * 0.00015; // 30% of 0.0005
      ref.current.rotation.z = state.clock.elapsedTime * 0.00003; // 30% of 0.0001
    }
  });
  
  // Only render if we have valid colors array
  if (!dustColors || dustColors.length === 0) {
    return null;
  }
  
  return (
    <Points ref={ref} positions={dustPositions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={particleColor}
        size={0.3}
        sizeAttenuation={true}
        depthWrite={false}
        vertexColors={false}
        opacity={0.6}
      />
    </Points>
  );
};

export default CosmicDust;