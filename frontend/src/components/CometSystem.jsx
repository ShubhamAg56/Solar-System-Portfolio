import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Comet = ({ position, direction, speed = 0.02, color = '#87CEEB' }) => {
  const cometRef = useRef();
  const tailRef = useRef();
  
  // Create enhanced comet texture
  const cometTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256; // Increased texture resolution
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    
    // Create radial gradient for comet core
    const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    gradient.addColorStop(0, '#FFFFFF');
    gradient.addColorStop(0.3, color);
    gradient.addColorStop(0.7, '#4169E1');
    gradient.addColorStop(1, '#000080');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
    
    // Add ice crystal patterns
    for (let i = 0; i < 150; i++) {
      const x = Math.random() * 256;
      const y = Math.random() * 256;
      const size = Math.random() * 8 + 2;
      const brightness = Math.random() * 0.8 + 0.4;
      
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
      ctx.fill();
    }
    
    // Add surface cracks and details
    for (let i = 0; i < 80; i++) {
      const x1 = Math.random() * 256;
      const y1 = Math.random() * 256;
      const x2 = x1 + (Math.random() - 0.5) * 60;
      const y2 = y1 + (Math.random() - 0.5) * 60;
      
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = `rgba(200, 200, 255, ${Math.random() * 0.6 + 0.3})`;
      ctx.lineWidth = Math.random() * 3 + 1;
      ctx.stroke();
    }
    
    // Add sparkle effects
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * 256;
      const y = Math.random() * 256;
      const size = Math.random() * 3 + 1;
      
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.9 + 0.1})`;
      ctx.fill();
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearFilter;
    
    return texture;
  }, [color]);
  
  // Create enhanced normal map for surface detail
  const normalMap = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    
    // Base normal (pointing up)
    ctx.fillStyle = '#8080FF';
    ctx.fillRect(0, 0, 256, 256);
    
    // Add surface normal variations for ice texture
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * 256;
      const y = Math.random() * 256;
      const radius = Math.random() * 20 + 5;
      
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
  
  // Create enhanced comet geometry with more detail
  const cometGeometry = useMemo(() => {
    const geometry = new THREE.SphereGeometry(0.3, 32, 32); // Increased from 16,16 to 32,32
    const positionAttribute = geometry.attributes.position;
    
    // Add surface irregularities for realistic comet shape
    for (let i = 0; i < positionAttribute.count; i++) {
      const vertex = new THREE.Vector3();
      vertex.fromBufferAttribute(positionAttribute, i);
      
      // Add noise for irregular comet surface
      const noise = (Math.random() - 0.5) * 0.15;
      vertex.multiplyScalar(1 + noise);
      
      positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }
    
    geometry.computeVertexNormals();
    return geometry;
  }, []);
  
  // Create enhanced material with better visual properties
  const cometMaterial = useMemo(() => new THREE.MeshStandardMaterial({ 
    map: cometTexture,
    normalMap: normalMap,
    emissive: new THREE.Color(color),
    emissiveIntensity: 0.3,
    transparent: true,
    opacity: 0.95,
    roughness: 0.3,
    metalness: 0.1,
    envMapIntensity: 0.8
  }), [color, cometTexture, normalMap]);
  
  // Create enhanced tail geometry with more particles and detail
  const tailGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    const sizes = [];
    const tailLength = 120; // Increased from 50 for longer tail
    
    for (let i = 0; i < tailLength; i++) {
      const t = i / tailLength;
      const spread = t * 2; // Tail spreads out as it gets longer
      
      // Create multiple particles per tail segment for denser effect
      for (let j = 0; j < 3; j++) {
        const offsetX = (Math.random() - 0.5) * spread;
        const offsetY = (Math.random() - 0.5) * spread;
        const offsetZ = (Math.random() - 0.5) * spread;
        
        positions.push(
          -direction.x * t * 12 + offsetX,
          -direction.y * t * 12 + offsetY,
          -direction.z * t * 12 + offsetZ
        );
        
        // Enhanced color fade with blue-to-white gradient
        const alpha = Math.pow(1 - t, 1.5); // More dramatic fade
        const brightness = 0.8 + Math.random() * 0.4; // Varying brightness
        
        colors.push(
          (parseInt(color.slice(1, 3), 16) / 255) * brightness,
          (parseInt(color.slice(3, 5), 16) / 255) * brightness,
          Math.min(1, (parseInt(color.slice(5, 7), 16) / 255) * brightness + 0.3), // Add blue tint
          alpha
        );
        
        // Varying particle sizes
        sizes.push(0.3 + Math.random() * 0.8 - t * 0.5);
      }
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 4));
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
    
    return geometry;
  }, [direction, color]);
  
  // Enhanced tail material with better blending
  const tailMaterial = useMemo(() => {
    // Create a sparkle texture for tail particles
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    
    // Create radial gradient for sparkle effect
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.3, 'rgba(200, 220, 255, 0.8)');
    gradient.addColorStop(0.7, 'rgba(150, 180, 255, 0.4)');
    gradient.addColorStop(1, 'rgba(100, 150, 255, 0)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    
    const texture = new THREE.CanvasTexture(canvas);
    
    return new THREE.PointsMaterial({
      map: texture,
      size: 0.8, // Increased from 0.1
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true
    });
  }, []);
  
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
      {/* Comet core with enhanced texture */}
      <mesh ref={cometRef} geometry={cometGeometry} material={cometMaterial} />
      
      {/* Enhanced comet tail with better particles */}
      <points ref={tailRef} geometry={tailGeometry} material={tailMaterial} />
      
      {/* Multi-layer comet glow for better visual effect */}
      <mesh ref={cometRef} scale={1.8}>
        <sphereGeometry args={[0.3, 24, 24]} />
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={0.3} 
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Outer glow layer */}
      <mesh ref={cometRef} scale={2.5}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial 
          color={new THREE.Color(color).multiplyScalar(0.8)} 
          transparent 
          opacity={0.15} 
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Coma effect - gaseous envelope around comet */}
      <mesh ref={cometRef} scale={3.2}>
        <sphereGeometry args={[0.3, 12, 12]} />
        <meshBasicMaterial 
          color={new THREE.Color(color).lerp(new THREE.Color('#FFFFFF'), 0.3)} 
          transparent 
          opacity={0.08} 
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
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