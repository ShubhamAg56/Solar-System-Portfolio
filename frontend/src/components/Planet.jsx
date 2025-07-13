import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import * as THREE from 'three';

const Planet = ({ planet, planetKey, isActive, onClick }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const { currentTheme } = useTheme();
  
  // Default color fallbacks
  const cardBackground = currentTheme?.cardBackground || 'rgba(0, 0, 0, 0.8)';
  const textPrimary = currentTheme?.textPrimary || '#ffffff';
  const textSecondary = currentTheme?.textSecondary || '#cccccc';
  
  // Realistic planet materials with life-like textures
  const planetMaterial = useMemo(() => {
    const materials = {
      sun: new THREE.MeshStandardMaterial({
        color: '#FFA500',
        emissive: '#FF6B35',
        emissiveIntensity: 0.8,
        roughness: 0.1,
        metalness: 0.0,
        transparent: true,
        opacity: 0.95
      }),
      mercury: new THREE.MeshStandardMaterial({
        color: '#8C7853',
        roughness: 0.95,
        metalness: 0.05,
        bumpScale: 0.05,
        transparent: true,
        opacity: 0.9
      }),
      venus: new THREE.MeshStandardMaterial({
        color: '#FFC649',
        roughness: 0.3,
        metalness: 0.1,
        emissive: '#FFB347',
        emissiveIntensity: 0.2,
        transparent: true,
        opacity: 0.95
      }),
      earth: new THREE.MeshStandardMaterial({
        color: '#6B93D6',
        roughness: 0.4,
        metalness: 0.2,
        emissive: '#4A90E2',
        emissiveIntensity: 0.1,
        bumpScale: 0.02,
        transparent: true,
        opacity: 0.95
      }),
      mars: new THREE.MeshStandardMaterial({
        color: '#CD5C5C',
        roughness: 0.9,
        metalness: 0.05,
        emissive: '#A0522D',
        emissiveIntensity: 0.05,
        bumpScale: 0.03,
        transparent: true,
        opacity: 0.9
      }),
      jupiter: new THREE.MeshStandardMaterial({
        color: '#D2691E',
        roughness: 0.2,
        metalness: 0.1,
        emissive: '#B8860B',
        emissiveIntensity: 0.1,
        transparent: true,
        opacity: 0.95
      })
    };
    
    return materials[planetKey] || materials.earth;
  }, [planetKey]);
  
  // Create realistic planet surface patterns
  const surfaceTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    // Create base color
    const baseColors = {
      sun: { r: 255, g: 165, b: 0 },
      mercury: { r: 140, g: 120, b: 83 },
      venus: { r: 255, g: 198, b: 73 },
      earth: { r: 107, g: 147, b: 214 },
      mars: { r: 205, g: 92, b: 92 },
      jupiter: { r: 210, g: 105, b: 30 }
    };
    
    const baseColor = baseColors[planetKey] || baseColors.earth;
    
    // Fill base color
    ctx.fillStyle = `rgb(${baseColor.r}, ${baseColor.g}, ${baseColor.b})`;
    ctx.fillRect(0, 0, 512, 512);
    
    // Add surface features based on planet type
    switch(planetKey) {
      case 'sun':
        // Solar flares and surface activity
        for (let i = 0; i < 50; i++) {
          const x = Math.random() * 512;
          const y = Math.random() * 512;
          const size = Math.random() * 20 + 10;
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
          gradient.addColorStop(0, '#FFD700');
          gradient.addColorStop(1, '#FF4500');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
        break;
        
      case 'mercury':
        // Craters
        for (let i = 0; i < 30; i++) {
          const x = Math.random() * 512;
          const y = Math.random() * 512;
          const size = Math.random() * 15 + 5;
          ctx.fillStyle = `rgb(${baseColor.r - 30}, ${baseColor.g - 30}, ${baseColor.b - 30})`;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
        break;
        
      case 'venus':
        // Cloudy atmosphere
        for (let i = 0; i < 20; i++) {
          const x = Math.random() * 512;
          const y = Math.random() * 512;
          const width = Math.random() * 100 + 50;
          const height = Math.random() * 20 + 10;
          ctx.fillStyle = `rgba(255, 255, 255, 0.3)`;
          ctx.fillRect(x, y, width, height);
        }
        break;
        
      case 'earth':
        // Continents (green/brown patches)
        for (let i = 0; i < 15; i++) {
          const x = Math.random() * 512;
          const y = Math.random() * 512;
          const width = Math.random() * 80 + 40;
          const height = Math.random() * 60 + 30;
          ctx.fillStyle = Math.random() > 0.5 ? '#228B22' : '#8B4513';
          ctx.fillRect(x, y, width, height);
        }
        // Clouds
        for (let i = 0; i < 25; i++) {
          const x = Math.random() * 512;
          const y = Math.random() * 512;
          const size = Math.random() * 20 + 10;
          ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
        break;
        
      case 'mars':
        // Polar ice caps
        ctx.fillStyle = '#F0F8FF';
        ctx.beginPath();
        ctx.arc(256, 50, 40, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(256, 462, 35, 0, Math.PI * 2);
        ctx.fill();
        
        // Surface features
        for (let i = 0; i < 20; i++) {
          const x = Math.random() * 512;
          const y = Math.random() * 512;
          const size = Math.random() * 10 + 5;
          ctx.fillStyle = `rgb(${baseColor.r - 20}, ${baseColor.g - 20}, ${baseColor.b - 20})`;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
        break;
        
      case 'jupiter':
        // Gas giant bands
        for (let i = 0; i < 10; i++) {
          const y = (i / 10) * 512;
          const colors = ['#D2691E', '#CD853F', '#DEB887', '#F4A460'];
          ctx.fillStyle = colors[i % colors.length];
          ctx.fillRect(0, y, 512, 51);
        }
        
        // Great Red Spot
        const gradient = ctx.createRadialGradient(350, 200, 0, 350, 200, 30);
        gradient.addColorStop(0, '#FF6347');
        gradient.addColorStop(1, '#8B0000');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.ellipse(350, 200, 30, 20, 0, 0, Math.PI * 2);
        ctx.fill();
        break;
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }, [planetKey]);
  
  // Apply texture to material
  if (planetMaterial.map !== surfaceTexture) {
    planetMaterial.map = surfaceTexture;
    planetMaterial.needsUpdate = true;
  }
  
  useFrame((state) => {
    if (meshRef.current) {
      // Enhanced planet rotation - faster spin
      meshRef.current.rotation.y += planetKey === 'sun' ? 0.015 : 0.02;
      
      // Orbital motion for planets (not the sun) - increased speed
      if (planetKey !== 'sun') {
        const time = state.clock.elapsedTime;
        const speed = planetKey === 'mercury' ? 0.08 : 
                     planetKey === 'venus' ? 0.06 : 
                     planetKey === 'earth' ? 0.05 : 
                     planetKey === 'mars' ? 0.04 : 0.03;
        
        const radius = Math.sqrt(planet.position[0] ** 2 + planet.position[2] ** 2);
        meshRef.current.position.x = Math.cos(time * speed) * radius;
        meshRef.current.position.z = Math.sin(time * speed) * radius;
        
        // Add slight vertical oscillation for more dynamic movement
        meshRef.current.position.y = Math.sin(time * speed * 0.5) * 0.2;
      }
      
      // Enhanced hover and active effects
      if (isActive || hovered) {
        meshRef.current.scale.setScalar(planet.scale * (isActive ? 1.4 : 1.2));
        // Add glow effect by increasing emissive intensity
        if (planetMaterial.emissive) {
          planetMaterial.emissiveIntensity = planetKey === 'sun' ? 1.0 : 0.3;
        }
      } else {
        meshRef.current.scale.setScalar(planet.scale);
        // Reset emissive intensity
        if (planetMaterial.emissive) {
          planetMaterial.emissiveIntensity = planetKey === 'sun' ? 0.8 : 
                                            planetKey === 'venus' ? 0.2 :
                                            planetKey === 'jupiter' ? 0.1 : 0.1;
        }
      }
    }
  });
  
  return (
    <group>
      <mesh
        ref={meshRef}
        position={planet.position}
        scale={planet.scale}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[1, 64, 64]} />
        <primitive object={planetMaterial} />
        
        {/* Realistic atmospheric effects */}
        {planetKey === 'earth' && (
          <mesh scale={1.05}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshBasicMaterial
              color="#87CEEB"
              transparent
              opacity={0.1}
              side={THREE.BackSide}
            />
          </mesh>
        )}
        
        {planetKey === 'venus' && (
          <mesh scale={1.08}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshBasicMaterial
              color="#FFF8DC"
              transparent
              opacity={0.15}
              side={THREE.BackSide}
            />
          </mesh>
        )}
        
        {planetKey === 'mars' && (
          <mesh scale={1.03}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshBasicMaterial
              color="#FFB6C1"
              transparent
              opacity={0.08}
              side={THREE.BackSide}
            />
          </mesh>
        )}
        
        {/* Enhanced sun corona effect */}
        {planetKey === 'sun' && (
          <>
            <mesh scale={1.2}>
              <sphereGeometry args={[1, 32, 32]} />
              <meshBasicMaterial
                color="#FFD700"
                transparent
                opacity={0.3}
                side={THREE.BackSide}
              />
            </mesh>
            <mesh scale={1.4}>
              <sphereGeometry args={[1, 16, 16]} />
              <meshBasicMaterial
                color="#FF4500"
                transparent
                opacity={0.1}
                side={THREE.BackSide}
              />
            </mesh>
          </>
        )}
      </mesh>
      
      {/* Enhanced orbital rings with better visibility */}
      {planetKey !== 'sun' && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <ringGeometry args={[Math.sqrt(planet.position[0] ** 2 + planet.position[2] ** 2) - 0.05, 
                              Math.sqrt(planet.position[0] ** 2 + planet.position[2] ** 2) + 0.05, 
                              128]} />
          <meshBasicMaterial 
            color={planet.color} 
            transparent 
            opacity={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
      
      {/* Planet label with enhanced styling */}
      {(hovered || isActive) && (
        <Html position={[planet.position[0], planet.position[1] + planet.scale + 1.5, planet.position[2]]}>
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="rounded-lg text-sm font-medium backdrop-blur-sm border shadow-lg px-4 py-2"
            style={{ 
              backgroundColor: cardBackground,
              color: textPrimary,
              boxShadow: `0 0 20px ${planet.color}40`,
              borderColor: planet.color,
            }}
          >
            {planet.name}
            <div className="text-xs mt-1" style={{ color: textSecondary }}>
              {planet.description}
            </div>
          </motion.div>
        </Html>
      )}
    </group>
  );
};

export default Planet;