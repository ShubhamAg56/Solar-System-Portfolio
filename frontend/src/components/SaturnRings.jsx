import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const SaturnRings = ({ position, scale, planetRotation = 0 }) => {
  const ringRef = useRef();
  const innerRingRef = useRef();
  const outerRingRef = useRef();
  const groupRef = useRef();

  // Create ring geometry and materials
  const ringMaterial = useMemo(() => {
    // Create a canvas for the ring texture
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    
    // Create ring pattern with multiple bands
    const gradient = ctx.createLinearGradient(0, 0, 1024, 0);
    gradient.addColorStop(0, 'rgba(200, 180, 140, 0)');
    gradient.addColorStop(0.1, 'rgba(230, 210, 170, 0.3)');
    gradient.addColorStop(0.2, 'rgba(250, 230, 180, 0.6)');
    gradient.addColorStop(0.25, 'rgba(200, 180, 140, 0.2)');
    gradient.addColorStop(0.3, 'rgba(240, 220, 170, 0.8)');
    gradient.addColorStop(0.4, 'rgba(220, 200, 150, 0.4)');
    gradient.addColorStop(0.5, 'rgba(250, 230, 180, 0.9)');
    gradient.addColorStop(0.6, 'rgba(200, 180, 140, 0.3)');
    gradient.addColorStop(0.7, 'rgba(240, 220, 170, 0.7)');
    gradient.addColorStop(0.8, 'rgba(230, 210, 160, 0.5)');
    gradient.addColorStop(0.9, 'rgba(250, 230, 180, 0.4)');
    gradient.addColorStop(1, 'rgba(200, 180, 140, 0)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1024, 32);
    
    // Add detailed ring structures
    for (let i = 0; i < 20; i++) {
      const x = (i / 20) * 1024;
      const alpha = Math.random() * 0.3 + 0.1;
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.fillRect(x, 0, 2, 32);
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    
    return new THREE.MeshStandardMaterial({
      map: texture,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
  }, []);

  const innerRingMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#F0E68C',
      transparent: true,
      opacity: 0.4,
      side: THREE.DoubleSide,
      depthWrite: false
    });
  }, []);

  const outerRingMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#DEB887',
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide,
      depthWrite: false
    });
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      // Calculate Saturn's current orbital position
      const time = state.clock.elapsedTime;
      const speed = 0.009; // Same as Saturn's orbital speed (70% slower)
      const radius = Math.sqrt(position[0] ** 2 + position[2] ** 2);
      
      // FIXED: Counterclockwise orbital motion (negative time for correct direction)
      const newX = Math.cos(-time * speed) * radius;
      const newZ = Math.sin(-time * speed) * radius;
      
      // Add realistic orbital inclination for Saturn
      const inclination = 2.5 * Math.PI / 180; // 2.5° to ecliptic
      const verticalOscillation = Math.sin(time * speed * 2) * Math.sin(inclination) * 2;
      const newY = position[1] + verticalOscillation;
      
      // Update the group position to follow Saturn's orbital motion
      groupRef.current.position.set(newX, newY, newZ);
      
      // Rotate the entire ring system with Saturn's axial tilt and rotation
      groupRef.current.rotation.x = 26.7 * Math.PI / 180; // Saturn's axial tilt
      groupRef.current.rotation.y = planetRotation;
    }
    
    if (ringRef.current) {
      // Slow rotation for the main rings relative to Saturn (70% slower)
      ringRef.current.rotation.z += 0.0006; // 30% of 0.002
    }
    if (innerRingRef.current) {
      // Slightly faster rotation for inner rings (70% slower)
      innerRingRef.current.rotation.z += 0.0009; // 30% of 0.003
    }
    if (outerRingRef.current) {
      // Different rotation speed for outer rings (70% slower)
      outerRingRef.current.rotation.z += 0.0003; // 30% of 0.001
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main ring system (A and B rings) */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[scale * 1.8, scale * 2.8, 64]} />
        <primitive object={ringMaterial} />
      </mesh>
      
      {/* Inner C ring (crepe ring) */}
      <mesh ref={innerRingRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[scale * 1.4, scale * 1.7, 32]} />
        <primitive object={innerRingMaterial} />
      </mesh>
      
      {/* Outer F ring */}
      <mesh ref={outerRingRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[scale * 3.0, scale * 3.2, 32]} />
        <primitive object={outerRingMaterial} />
      </mesh>
      
      {/* Cassini Division (gap between A and B rings) */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[scale * 2.4, scale * 2.5, 32]} />
        <meshStandardMaterial 
          color="#1a1a1a" 
          transparent 
          opacity={0.8} 
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

export default SaturnRings;