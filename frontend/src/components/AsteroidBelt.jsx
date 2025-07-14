import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Asteroid = ({ position, size, rotationSpeed, color }) => {
  const meshRef = useRef();
  
  // Create procedural asteroid texture
  const asteroidTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    
    // Base color
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 128, 128);
    
    // Add surface details
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * 128;
      const y = Math.random() * 128;
      const radius = Math.random() * 8 + 2;
      const darkness = Math.random() * 0.6 + 0.2;
      
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 0, 0, ${darkness})`;
      ctx.fill();
    }
    
    // Add lighter spots (mineral deposits)
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * 128;
      const y = Math.random() * 128;
      const radius = Math.random() * 4 + 1;
      const brightness = Math.random() * 0.4 + 0.3;
      
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
      ctx.fill();
    }
    
    // Add scratches and lines
    for (let i = 0; i < 20; i++) {
      const x1 = Math.random() * 128;
      const y1 = Math.random() * 128;
      const x2 = x1 + (Math.random() - 0.5) * 40;
      const y2 = y1 + (Math.random() - 0.5) * 40;
      
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = `rgba(0, 0, 0, ${Math.random() * 0.5 + 0.2})`;
      ctx.lineWidth = Math.random() * 2 + 1;
      ctx.stroke();
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearFilter;
    
    return texture;
  }, [color]);
  
  // Create normal map for surface detail
  const normalMap = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    
    // Base normal (pointing up)
    ctx.fillStyle = '#8080FF';
    ctx.fillRect(0, 0, 128, 128);
    
    // Add surface normal variations
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * 128;
      const y = Math.random() * 128;
      const radius = Math.random() * 12 + 3;
      
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, '#FF8080');
      gradient.addColorStop(1, '#8080FF');
      
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearFilter;
    
    return texture;
  }, []);
  
  // Create irregular asteroid geometry
  const asteroidGeometry = useMemo(() => {
    const geometry = new THREE.SphereGeometry(size, 12, 8);
    const positionAttribute = geometry.attributes.position;
    
    // Deform vertices to create irregular shape
    for (let i = 0; i < positionAttribute.count; i++) {
      const vertex = new THREE.Vector3();
      vertex.fromBufferAttribute(positionAttribute, i);
      
      // Add noise for irregular shape
      const noise = (Math.random() - 0.5) * 0.4;
      vertex.multiplyScalar(1 + noise);
      
      positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }
    
    geometry.computeVertexNormals();
    return geometry;
  }, [size]);
  
  // Create material with enhanced properties
  const asteroidMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: asteroidTexture,
      normalMap: normalMap,
      roughness: 0.9,
      metalness: 0.1,
      bumpMap: asteroidTexture,
      bumpScale: 0.3,
      normalScale: new THREE.Vector2(0.5, 0.5),
      envMapIntensity: 0.2
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
  
  // Generate asteroid data with varied properties
  const asteroids = useMemo(() => {
    const asteroidData = [];
    const count = 80; // Reduced count for performance but higher quality
    const minRadius = 23;
    const maxRadius = 25;
    
    const asteroidColors = [
      '#8B7355', // Brown
      '#696969', // Dark gray
      '#A0522D', // Sienna
      '#708090', // Slate gray
      '#556B2F', // Dark olive
      '#2F4F4F', // Dark slate gray
      '#8B4513', // Saddle brown
      '#483D8B'  // Dark slate blue
    ];
    
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + Math.random() * 0.5;
      const radius = minRadius + Math.random() * (maxRadius - minRadius);
      const variation = (Math.random() - 0.5) * 1;
      
      const x = Math.cos(angle) * radius + variation;
      const y = (Math.random() - 0.5) * 1;
      const z = Math.sin(angle) * radius + variation;
      
      asteroidData.push({
        position: [x, y, z],
        size: Math.random() * 0.15 + 0.05, // Reduced from 0.4 + 0.2 to 0.15 + 0.05 (now 0.05 to 0.2)
        rotationSpeed: (Math.random() - 0.5) * 0.02,
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