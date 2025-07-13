import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { useTheme } from '../contexts/ThemeContext';
import * as THREE from 'three';

const CosmicDust = () => {
  const ref = useRef();
  const { currentTheme } = useTheme();
  
  // Generate cosmic dust particles
  const dustPositions = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 600;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 600;
    }
    return positions;
  }, []);

  const dustColors = useMemo(() => {
    const colors = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      const brightness = Math.random() * 0.5 + 0.3;
      colors[i * 3] = brightness;
      colors[i * 3 + 1] = brightness * 0.9;
      colors[i * 3 + 2] = brightness * 1.1;
    }
    return colors;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.0003;
      ref.current.rotation.y = state.clock.elapsedTime * 0.0005;
      ref.current.rotation.z = state.clock.elapsedTime * 0.0001;
    }
  });
  
  return (
    <Points ref={ref} positions={dustPositions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={currentTheme.particleColor}
        size={0.3}
        sizeAttenuation={true}
        depthWrite={false}
        vertexColors={true}
        opacity={0.6}
      />
      <bufferAttribute
        attach="attributes-color"
        array={dustColors}
        count={2000}
        itemSize={3}
      />
    </Points>
  );
};

export default CosmicDust;