import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Asteroid = ({ position, size, rotationSpeed, color }) => {
  const meshRef = useRef();
  
  // Create enhanced procedural asteroid texture with much better quality
  const asteroidTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128; // Increased back to 128 for better texture quality
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    
    // Base color with subtle gradient
    const baseGradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    baseGradient.addColorStop(0, color);
    baseGradient.addColorStop(0.6, color);
    baseGradient.addColorStop(1, '#000000');
    
    ctx.fillStyle = baseGradient;
    ctx.fillRect(0, 0, 128, 128);
    
    // Add realistic crater formations
    for (let i = 0; i < 120; i++) { // Increased from 80
      const x = Math.random() * 128;
      const y = Math.random() * 128;
      const radius = Math.random() * 12 + 3; // Increased from 4 + 1
      const depth = Math.random() * 0.8 + 0.3;
      
      // Create crater with rim
      const craterGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      craterGradient.addColorStop(0, `rgba(0, 0, 0, ${depth})`);
      craterGradient.addColorStop(0.7, `rgba(0, 0, 0, ${depth * 0.5})`);
      craterGradient.addColorStop(0.9, `rgba(255, 255, 255, ${depth * 0.3})`);
      craterGradient.addColorStop(1, `rgba(0, 0, 0, 0)`);
      
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = craterGradient;
      ctx.fill();
    }
    
    // Add mineral deposits with varied colors
    const mineralColors = ['#FFD700', '#C0C0C0', '#B87333', '#8B4513', '#FF4500'];
    for (let i = 0; i < 40; i++) { // Increased from 20
      const x = Math.random() * 128;
      const y = Math.random() * 128;
      const radius = Math.random() * 6 + 2; // Increased from 2 + 1
      const brightness = Math.random() * 0.6 + 0.4;
      const mineralColor = mineralColors[Math.floor(Math.random() * mineralColors.length)];
      
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `${mineralColor}${Math.floor(brightness * 255).toString(16).padStart(2, '0')}`;
      ctx.fill();
    }
    
    // Add realistic surface scratches and fractures
    for (let i = 0; i < 25; i++) { // Increased from 10
      const x1 = Math.random() * 128;
      const y1 = Math.random() * 128;
      const x2 = x1 + (Math.random() - 0.5) * 40; // Increased from 20
      const y2 = y1 + (Math.random() - 0.5) * 40;
      const intensity = Math.random() * 0.7 + 0.3;
      
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = `rgba(0, 0, 0, ${intensity})`;
      ctx.lineWidth = Math.random() * 2.5 + 0.5; // Increased from 1.5 + 0.5
      ctx.stroke();
    }
    
    // Add surface dust and weathering effects
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * 128;
      const y = Math.random() * 128;
      const size = Math.random() * 2 + 0.5;
      const opacity = Math.random() * 0.4 + 0.1;
      
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(100, 100, 100, ${opacity})`;
      ctx.fill();
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearFilter;
    
    return texture;
  }, [color]);
  
  // Create enhanced normal map with better surface detail
  const normalMap = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128; // Increased back to 128 for better quality
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    
    // Base normal (pointing up)
    ctx.fillStyle = '#8080FF';
    ctx.fillRect(0, 0, 128, 128);
    
    // Add detailed surface normal variations
    for (let i = 0; i < 80; i++) { // Increased from 40
      const x = Math.random() * 128;
      const y = Math.random() * 128;
      const radius = Math.random() * 15 + 5; // Increased from 6 + 2
      
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, '#FF8080');
      gradient.addColorStop(0.5, '#8080FF');
      gradient.addColorStop(1, '#8080FF');
      
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    }
    
    // Add surface ridge patterns
    for (let i = 0; i < 30; i++) {
      const x1 = Math.random() * 128;
      const y1 = Math.random() * 128;
      const x2 = x1 + (Math.random() - 0.5) * 50;
      const y2 = y1 + (Math.random() - 0.5) * 50;
      
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = '#FF8080';
      ctx.lineWidth = Math.random() * 4 + 2;
      ctx.stroke();
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearFilter;
    
    return texture;
  }, []);
  
  // Create enhanced irregular asteroid geometry with better detail
  const asteroidGeometry = useMemo(() => {
    const geometry = new THREE.SphereGeometry(size, 12, 8); // Increased back to 12,8 for better quality
    const positionAttribute = geometry.attributes.position;
    
    // Deform vertices to create more realistic irregular shape
    for (let i = 0; i < positionAttribute.count; i++) {
      const vertex = new THREE.Vector3();
      vertex.fromBufferAttribute(positionAttribute, i);
      
      // Add multiple layers of noise for more realistic surface
      const noise1 = (Math.random() - 0.5) * 0.4;
      const noise2 = (Math.random() - 0.5) * 0.2;
      const noise3 = (Math.random() - 0.5) * 0.1;
      const combinedNoise = noise1 + noise2 + noise3;
      
      vertex.multiplyScalar(1 + combinedNoise);
      
      positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }
    
    geometry.computeVertexNormals();
    return geometry;
  }, [size]);
  
  // Create optimized material with balanced quality and performance
  const asteroidMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: asteroidTexture,
      normalMap: normalMap,
      roughness: 0.8, // Slightly reduced from 0.9
      metalness: 0.05, // Slightly reduced from 0.1
      bumpMap: asteroidTexture,
      bumpScale: 0.2, // Reduced from 0.3
      normalScale: new THREE.Vector2(0.4, 0.4), // Reduced from 0.5, 0.5
      envMapIntensity: 0.1 // Reduced from 0.2
    });
  }, [asteroidTexture, normalMap]);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed * 0.5;
      meshRef.current.rotation.y += rotationSpeed;
      meshRef.current.rotation.z += rotationSpeed * 0.3;
    }
  });
  
  return (
    <mesh
      ref={meshRef}
      position={position}
      geometry={asteroidGeometry}
      material={asteroidMaterial}
    />
  );
};

const AsteroidBelt = () => {
  const groupRef = useRef();
  
  // Generate properly positioned asteroid data - between Mars and Jupiter
  const asteroids = useMemo(() => {
    const asteroidData = [];
    const count = 250; // Increased from 80 to 250 for much denser asteroid belt
    const minRadius = 25; // Positioned between Mars (20) and Jupiter (28) - safe distance from sun
    const maxRadius = 27; // Keeps asteroids well away from sun at origin [0,0,0]
    
    const asteroidColors = [
      '#8B7355', // Brown
      '#696969', // Dark gray
      '#A0522D', // Sienna
      '#708090', // Slate gray
      '#556B2F', // Dark olive
      '#2F4F4F', // Dark slate gray
      '#8B4513', // Saddle brown
      '#483D8B', // Dark slate blue
      '#654321', // Dark brown
      '#778899', // Light slate gray
      '#8B8680', // Warm gray
      '#5F5F5F', // Dark gray
      '#8B7D6B', // Light brown
      '#4A4A4A', // Dark gray
      '#CD853F', // Peru
      '#2F2F2F'  // Very dark gray
    ];
    
    for (let i = 0; i < count; i++) {
      // Create multiple orbital rings for better distribution with closer spacing
      const ringIndex = Math.floor(i / (count / 4)); // Divide into 4 rings instead of 3
      const ringOffset = ringIndex * 0.25; // Reduced spacing between rings
      
      const angle = (i / count) * Math.PI * 2 + Math.random() * 0.15; // Further reduced randomness for tighter formation
      const radius = minRadius + Math.random() * (maxRadius - minRadius) + ringOffset;
      const variation = (Math.random() - 0.5) * 0.3; // Reduced from 0.4 for even closer positioning
      
      const x = Math.cos(angle) * radius + variation;
      const y = (Math.random() - 0.5) * 0.3; // Reduced from 0.4 for even flatter belt
      const z = Math.sin(angle) * radius + variation;
      
      // Create mix of asteroid sizes for variety
      const sizeVariation = Math.random();
      let asteroidSize;
      if (sizeVariation < 0.5) {
        asteroidSize = Math.random() * 0.06 + 0.03; // Small asteroids (50%)
      } else if (sizeVariation < 0.8) {
        asteroidSize = Math.random() * 0.10 + 0.06; // Medium asteroids (30%)
      } else {
        asteroidSize = Math.random() * 0.14 + 0.10; // Large asteroids (20%)
      }
      
      asteroidData.push({
        position: [x, y, z],
        size: asteroidSize,
        rotationSpeed: (Math.random() - 0.5) * 0.012, // Slightly reduced rotation
        color: asteroidColors[Math.floor(Math.random() * asteroidColors.length)],
        key: i
      });
    }
    
    return asteroidData;
  }, []);
  
  useFrame((state) => {
    if (groupRef.current) {
      // Slower asteroid belt rotation (70% slower)
      groupRef.current.rotation.y += 0.0003; // 30% of 0.001
    }
  });

  return (
    <group ref={groupRef}>
      {asteroids.map((asteroid) => (
        <Asteroid
          key={asteroid.key}
          position={asteroid.position}
          size={asteroid.size}
          rotationSpeed={asteroid.rotationSpeed}
          color={asteroid.color}
        />
      ))}
    </group>
  );
};

export default AsteroidBelt;