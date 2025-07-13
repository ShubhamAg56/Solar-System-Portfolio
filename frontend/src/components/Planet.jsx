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
        transparent: false,
        opacity: 1.0
      }),
      mercury: new THREE.MeshStandardMaterial({
        color: '#8C7853',
        roughness: 0.95,
        metalness: 0.05,
        bumpScale: 0.05,
        transparent: false,
        opacity: 1.0
      }),
      venus: new THREE.MeshStandardMaterial({
        color: '#FFC649',
        roughness: 0.3,
        metalness: 0.1,
        emissive: '#FFB347',
        emissiveIntensity: 0.2,
        transparent: false,
        opacity: 1.0
      }),
      earth: new THREE.MeshStandardMaterial({
        color: '#6B93D6',
        roughness: 0.4,
        metalness: 0.2,
        emissive: '#4A90E2',
        emissiveIntensity: 0.1,
        bumpScale: 0.02,
        transparent: false,
        opacity: 1.0
      }),
      mars: new THREE.MeshStandardMaterial({
        color: '#CD5C5C',
        roughness: 0.9,
        metalness: 0.05,
        emissive: '#A0522D',
        emissiveIntensity: 0.05,
        bumpScale: 0.03,
        transparent: false,
        opacity: 1.0
      }),
      jupiter: new THREE.MeshStandardMaterial({
        color: '#D2691E',
        roughness: 0.2,
        metalness: 0.1,
        emissive: '#B8860B',
        emissiveIntensity: 0.1,
        transparent: false,
        opacity: 1.0
      })
    };
    
    return materials[planetKey] || materials.earth;
  }, [planetKey]);
  
  // Create enhanced realistic planet surface textures
  const surfaceTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024; // Increased resolution for better quality
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    
    // Create base color with gradient
    const baseColors = {
      sun: { r: 255, g: 165, b: 0 },
      mercury: { r: 140, g: 120, b: 83 },
      venus: { r: 255, g: 198, b: 73 },
      earth: { r: 107, g: 147, b: 214 },
      mars: { r: 205, g: 92, b: 92 },
      jupiter: { r: 210, g: 105, b: 30 }
    };
    
    const baseColor = baseColors[planetKey] || baseColors.earth;
    
    // Create radial gradient for depth
    const gradient = ctx.createRadialGradient(512, 512, 0, 512, 512, 512);
    gradient.addColorStop(0, `rgb(${Math.min(baseColor.r + 30, 255)}, ${Math.min(baseColor.g + 30, 255)}, ${Math.min(baseColor.b + 30, 255)})`);
    gradient.addColorStop(0.7, `rgb(${baseColor.r}, ${baseColor.g}, ${baseColor.b})`);
    gradient.addColorStop(1, `rgb(${Math.max(baseColor.r - 50, 0)}, ${Math.max(baseColor.g - 50, 0)}, ${Math.max(baseColor.b - 50, 0)})`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1024, 1024);
    
    // Add surface features based on planet type
    switch(planetKey) {
      case 'sun':
        // Enhanced solar surface with multiple layers
        // Solar granulation
        for (let i = 0; i < 200; i++) {
          const x = Math.random() * 1024;
          const y = Math.random() * 1024;
          const size = Math.random() * 15 + 5;
          const sunGradient = ctx.createRadialGradient(x, y, 0, x, y, size);
          sunGradient.addColorStop(0, '#FFFF99');
          sunGradient.addColorStop(0.5, '#FFD700');
          sunGradient.addColorStop(1, '#FF8C00');
          ctx.fillStyle = sunGradient;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
        // Solar flares
        for (let i = 0; i < 30; i++) {
          const x = Math.random() * 1024;
          const y = Math.random() * 1024;
          const size = Math.random() * 40 + 20;
          const flareGradient = ctx.createRadialGradient(x, y, 0, x, y, size);
          flareGradient.addColorStop(0, '#FFFFFF');
          flareGradient.addColorStop(0.3, '#FFD700');
          flareGradient.addColorStop(1, '#FF4500');
          ctx.fillStyle = flareGradient;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
        break;
        
      case 'mercury':
        // Enhanced craters with shadows and highlights
        for (let i = 0; i < 80; i++) {
          const x = Math.random() * 1024;
          const y = Math.random() * 1024;
          const size = Math.random() * 30 + 5;
          
          // Crater shadow
          const shadowGradient = ctx.createRadialGradient(x, y, 0, x, y, size);
          shadowGradient.addColorStop(0, `rgb(${baseColor.r - 60}, ${baseColor.g - 60}, ${baseColor.b - 60})`);
          shadowGradient.addColorStop(0.7, `rgb(${baseColor.r - 30}, ${baseColor.g - 30}, ${baseColor.b - 30})`);
          shadowGradient.addColorStop(1, `rgb(${baseColor.r}, ${baseColor.g}, ${baseColor.b})`);
          ctx.fillStyle = shadowGradient;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
          
          // Crater rim highlight
          ctx.strokeStyle = `rgb(${Math.min(baseColor.r + 40, 255)}, ${Math.min(baseColor.g + 40, 255)}, ${Math.min(baseColor.b + 40, 255)})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(x, y, size * 0.9, 0, Math.PI * 2);
          ctx.stroke();
        }
        break;
        
      case 'venus':
        // Enhanced thick atmosphere with swirling clouds
        for (let i = 0; i < 100; i++) {
          const x = Math.random() * 1024;
          const y = Math.random() * 1024;
          const width = Math.random() * 200 + 100;
          const height = Math.random() * 40 + 20;
          const opacity = Math.random() * 0.4 + 0.2;
          
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(Math.random() * Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 220, ${opacity})`;
          ctx.fillRect(-width/2, -height/2, width, height);
          ctx.restore();
        }
        // Atmospheric layers
        for (let i = 0; i < 50; i++) {
          const y = Math.random() * 1024;
          const opacity = Math.random() * 0.3 + 0.1;
          ctx.fillStyle = `rgba(255, 240, 200, ${opacity})`;
          ctx.fillRect(0, y, 1024, 5);
        }
        break;
        
      case 'earth':
        // Enhanced continents with varied terrain
        const continents = [
          {x: 200, y: 300, w: 150, h: 200}, // North America
          {x: 400, y: 250, w: 100, h: 150}, // Europe
          {x: 500, y: 350, w: 180, h: 250}, // Asia
          {x: 600, y: 600, w: 120, h: 100}, // Australia
          {x: 350, y: 550, w: 80, h: 180}, // Africa
          {x: 150, y: 600, w: 100, h: 150}, // South America
        ];
        
        continents.forEach(continent => {
          // Land mass with varied greens and browns
          const landColors = ['#228B22', '#32CD32', '#8B4513', '#A0522D', '#654321'];
          ctx.fillStyle = landColors[Math.floor(Math.random() * landColors.length)];
          ctx.fillRect(continent.x, continent.y, continent.w, continent.h);
          
          // Add terrain details
          for (let i = 0; i < 20; i++) {
            const x = continent.x + Math.random() * continent.w;
            const y = continent.y + Math.random() * continent.h;
            const size = Math.random() * 15 + 5;
            ctx.fillStyle = landColors[Math.floor(Math.random() * landColors.length)];
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
          }
        });
        
        // Enhanced clouds with realistic formations
        for (let i = 0; i < 80; i++) {
          const x = Math.random() * 1024;
          const y = Math.random() * 1024;
          const size = Math.random() * 50 + 20;
          const cloudGradient = ctx.createRadialGradient(x, y, 0, x, y, size);
          cloudGradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
          cloudGradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.4)');
          cloudGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.fillStyle = cloudGradient;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
        break;
        
      case 'mars':
        // Enhanced polar ice caps
        const northCap = ctx.createRadialGradient(512, 100, 0, 512, 100, 80);
        northCap.addColorStop(0, '#FFFFFF');
        northCap.addColorStop(0.7, '#F0F8FF');
        northCap.addColorStop(1, `rgb(${baseColor.r}, ${baseColor.g}, ${baseColor.b})`);
        ctx.fillStyle = northCap;
        ctx.beginPath();
        ctx.arc(512, 100, 80, 0, Math.PI * 2);
        ctx.fill();
        
        const southCap = ctx.createRadialGradient(512, 924, 0, 512, 924, 70);
        southCap.addColorStop(0, '#FFFFFF');
        southCap.addColorStop(0.7, '#F0F8FF');
        southCap.addColorStop(1, `rgb(${baseColor.r}, ${baseColor.g}, ${baseColor.b})`);
        ctx.fillStyle = southCap;
        ctx.beginPath();
        ctx.arc(512, 924, 70, 0, Math.PI * 2);
        ctx.fill();
        
        // Valles Marineris (canyon system)
        ctx.fillStyle = `rgb(${baseColor.r - 40}, ${baseColor.g - 40}, ${baseColor.b - 40})`;
        ctx.fillRect(200, 400, 600, 30);
        ctx.fillRect(250, 420, 500, 20);
        
        // Surface features and craters
        for (let i = 0; i < 60; i++) {
          const x = Math.random() * 1024;
          const y = Math.random() * 1024;
          const size = Math.random() * 20 + 5;
          const featureGradient = ctx.createRadialGradient(x, y, 0, x, y, size);
          featureGradient.addColorStop(0, `rgb(${baseColor.r - 30}, ${baseColor.g - 30}, ${baseColor.b - 30})`);
          featureGradient.addColorStop(1, `rgb(${baseColor.r + 10}, ${baseColor.g + 10}, ${baseColor.b + 10})`);
          ctx.fillStyle = featureGradient;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
        break;
        
      case 'jupiter':
        // Enhanced gas giant bands with more detail
        const bandColors = [
          '#D2691E', '#CD853F', '#DEB887', '#F4A460', 
          '#D2B48C', '#BC8F8F', '#F5DEB3', '#DDBF94'
        ];
        for (let i = 0; i < 20; i++) {
          const y = (i / 20) * 1024;
          const height = 1024 / 20;
          const color = bandColors[i % bandColors.length];
          
          // Create band gradient
          const bandGradient = ctx.createLinearGradient(0, y, 0, y + height);
          bandGradient.addColorStop(0, color);
          bandGradient.addColorStop(0.5, `${color}DD`);
          bandGradient.addColorStop(1, color);
          ctx.fillStyle = bandGradient;
          ctx.fillRect(0, y, 1024, height);
          
          // Add turbulence to bands
          for (let j = 0; j < 30; j++) {
            const x = Math.random() * 1024;
            const turbY = y + Math.random() * height;
            const size = Math.random() * 20 + 10;
            ctx.fillStyle = `${color}88`;
            ctx.beginPath();
            ctx.arc(x, turbY, size, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        
        // Enhanced Great Red Spot
        const spotGradient = ctx.createRadialGradient(700, 400, 0, 700, 400, 60);
        spotGradient.addColorStop(0, '#FF6347');
        spotGradient.addColorStop(0.3, '#FF4500');
        spotGradient.addColorStop(0.7, '#8B0000');
        spotGradient.addColorStop(1, '#654321');
        ctx.fillStyle = spotGradient;
        ctx.beginPath();
        ctx.ellipse(700, 400, 60, 40, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Add storm details
        ctx.strokeStyle = '#FF8C00';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.ellipse(700, 400, 45, 30, 0, 0, Math.PI * 2);
        ctx.stroke();
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
            className="rounded-lg text-base font-medium backdrop-blur-sm border shadow-lg px-6 py-4 min-w-[200px]"
            style={{ 
              backgroundColor: cardBackground,
              color: textPrimary,
              boxShadow: `0 0 20px ${planet.color}40`,
              borderColor: planet.color,
            }}
          >
            <div className="text-lg font-bold mb-2">{planet.name}</div>
            <div className="text-sm leading-relaxed" style={{ color: textSecondary }}>
              {planet.description}
            </div>
          </motion.div>
        </Html>
      )}
    </group>
  );
};

export default Planet;