import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const NebulaBackground = () => {
  const nebulaRef = useRef();
  
  // Create nebula geometry
  const nebulaGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    const sizes = [];
    
    const particleCount = 2000;
    
    for (let i = 0; i < particleCount; i++) {
      // Create distant background particles
      const radius = 300 + Math.random() * 200;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      positions.push(x, y, z);
      
      // Nebula colors (purple, blue, pink)
      const colorChoice = Math.random();
      if (colorChoice < 0.33) {
        colors.push(0.6, 0.2, 0.8); // Purple
      } else if (colorChoice < 0.66) {
        colors.push(0.2, 0.4, 0.9); // Blue
      } else {
        colors.push(0.9, 0.3, 0.6); // Pink
      }
      
      sizes.push(Math.random() * 3 + 1);
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
    
    return geometry;
  }, []);
  
  // Create nebula material
  const nebulaMaterial = useMemo(() => {
    // Create circular texture for particles
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
    gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.4)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    
    const texture = new THREE.CanvasTexture(canvas);
    
    return new THREE.PointsMaterial({
      map: texture,
      transparent: true,
      opacity: 0.6,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      size: 2,
      sizeAttenuation: true
    });
  }, []);
  
  useFrame((state) => {
    if (nebulaRef.current) {
      // Very slow rotation for subtle movement
      nebulaRef.current.rotation.x += 0.0002;
      nebulaRef.current.rotation.y += 0.0001;
      
      // Subtle pulsing effect
      const time = state.clock.elapsedTime;
      nebulaRef.current.material.opacity = 0.3 + Math.sin(time * 0.5) * 0.1;
    }
  });
  
  return (
    <points
      ref={nebulaRef}
      geometry={nebulaGeometry}
      material={nebulaMaterial}
    />
  );
};

export default NebulaBackground;