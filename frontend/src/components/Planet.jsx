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
      }),
      saturn: new THREE.MeshStandardMaterial({
        color: '#FAD5A5',
        roughness: 0.3,
        metalness: 0.15,
        emissive: '#DEB887',
        emissiveIntensity: 0.15,
        transparent: false,
        opacity: 1.0
      })
    };
    
    return materials[planetKey] || materials.earth;
  }, [planetKey]);
  
  // Create enhanced realistic planet surface textures with much higher detail
  const surfaceTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 2048; // Increased resolution for much better quality
    canvas.height = 2048;
    const ctx = canvas.getContext('2d');
    
    // Create base color with enhanced gradient
    const baseColors = {
      sun: { r: 255, g: 165, b: 0 },
      mercury: { r: 140, g: 120, b: 83 },
      venus: { r: 255, g: 198, b: 73 },
      earth: { r: 107, g: 147, b: 214 },
      mars: { r: 205, g: 92, b: 92 },
      jupiter: { r: 210, g: 105, b: 30 },
      saturn: { r: 250, g: 213, b: 165 }
    };
    
    const baseColor = baseColors[planetKey] || baseColors.earth;
    
    // Create sophisticated radial gradient for depth and lighting
    const gradient = ctx.createRadialGradient(768, 512, 0, 1024, 1024, 1024);
    gradient.addColorStop(0, `rgb(${Math.min(baseColor.r + 40, 255)}, ${Math.min(baseColor.g + 40, 255)}, ${Math.min(baseColor.b + 40, 255)})`);
    gradient.addColorStop(0.3, `rgb(${Math.min(baseColor.r + 20, 255)}, ${Math.min(baseColor.g + 20, 255)}, ${Math.min(baseColor.b + 20, 255)})`);
    gradient.addColorStop(0.7, `rgb(${baseColor.r}, ${baseColor.g}, ${baseColor.b})`);
    gradient.addColorStop(1, `rgb(${Math.max(baseColor.r - 60, 0)}, ${Math.max(baseColor.g - 60, 0)}, ${Math.max(baseColor.b - 60, 0)})`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 2048, 2048);
    
    // Add advanced surface features based on planet type
    switch(planetKey) {
      case 'sun':
        // Advanced solar surface with multiple realistic layers
        // Solar granulation with enhanced detail
        for (let i = 0; i < 400; i++) {
          const x = Math.random() * 2048;
          const y = Math.random() * 2048;
          const size = Math.random() * 25 + 10;
          const sunGradient = ctx.createRadialGradient(x, y, 0, x, y, size);
          sunGradient.addColorStop(0, '#FFFACD');
          sunGradient.addColorStop(0.3, '#FFFF99');
          sunGradient.addColorStop(0.6, '#FFD700');
          sunGradient.addColorStop(1, '#FF8C00');
          ctx.fillStyle = sunGradient;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
        
        // Enhanced solar flares with realistic patterns
        for (let i = 0; i < 60; i++) {
          const x = Math.random() * 2048;
          const y = Math.random() * 2048;
          const size = Math.random() * 60 + 30;
          const flareGradient = ctx.createRadialGradient(x, y, 0, x, y, size);
          flareGradient.addColorStop(0, '#FFFFFF');
          flareGradient.addColorStop(0.2, '#FFF8DC');
          flareGradient.addColorStop(0.5, '#FFD700');
          flareGradient.addColorStop(1, '#FF4500');
          ctx.fillStyle = flareGradient;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
        
        // Solar prominence effects
        for (let i = 0; i < 20; i++) {
          const x = Math.random() * 2048;
          const y = Math.random() * 2048;
          const width = Math.random() * 100 + 50;
          const height = Math.random() * 200 + 100;
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(Math.random() * Math.PI * 2);
          const prominenceGradient = ctx.createLinearGradient(-width/2, -height/2, width/2, height/2);
          prominenceGradient.addColorStop(0, 'rgba(255, 69, 0, 0.8)');
          prominenceGradient.addColorStop(0.5, 'rgba(255, 140, 0, 0.6)');
          prominenceGradient.addColorStop(1, 'rgba(255, 215, 0, 0.3)');
          ctx.fillStyle = prominenceGradient;
          ctx.fillRect(-width/2, -height/2, width, height);
          ctx.restore();
        }
        break;
        
      case 'mercury':
        // Enhanced crater system with realistic impact features
        for (let i = 0; i < 150; i++) {
          const x = Math.random() * 2048;
          const y = Math.random() * 2048;
          const size = Math.random() * 50 + 10;
          
          // Main crater depression
          const craterGradient = ctx.createRadialGradient(x, y, 0, x, y, size);
          craterGradient.addColorStop(0, `rgb(${baseColor.r - 80}, ${baseColor.g - 80}, ${baseColor.b - 80})`);
          craterGradient.addColorStop(0.4, `rgb(${baseColor.r - 50}, ${baseColor.g - 50}, ${baseColor.b - 50})`);
          craterGradient.addColorStop(0.8, `rgb(${baseColor.r - 20}, ${baseColor.g - 20}, ${baseColor.b - 20})`);
          craterGradient.addColorStop(1, `rgb(${baseColor.r}, ${baseColor.g}, ${baseColor.b})`);
          ctx.fillStyle = craterGradient;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
          
          // Crater rim with highlights
          ctx.strokeStyle = `rgb(${Math.min(baseColor.r + 60, 255)}, ${Math.min(baseColor.g + 60, 255)}, ${Math.min(baseColor.b + 60, 255)})`;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(x, y, size * 0.9, 0, Math.PI * 2);
          ctx.stroke();
          
          // Central peak for larger craters
          if (size > 30) {
            ctx.fillStyle = `rgb(${Math.min(baseColor.r + 40, 255)}, ${Math.min(baseColor.g + 40, 255)}, ${Math.min(baseColor.b + 40, 255)})`;
            ctx.beginPath();
            ctx.arc(x, y, size * 0.1, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        
        // Surface texture with enhanced detail
        for (let i = 0; i < 300; i++) {
          const x = Math.random() * 2048;
          const y = Math.random() * 2048;
          const size = Math.random() * 10 + 2;
          ctx.fillStyle = `rgba(${baseColor.r + Math.random() * 40 - 20}, ${baseColor.g + Math.random() * 40 - 20}, ${baseColor.b + Math.random() * 40 - 20}, 0.6)`;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
        break;
        
      case 'venus':
        // Enhanced atmospheric layers with realistic cloud formations
        for (let i = 0; i < 200; i++) {
          const x = Math.random() * 2048;
          const y = Math.random() * 2048;
          const width = Math.random() * 400 + 200;
          const height = Math.random() * 80 + 40;
          const opacity = Math.random() * 0.6 + 0.3;
          
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(Math.random() * Math.PI * 2);
          
          // Create cloud gradient
          const cloudGradient = ctx.createLinearGradient(-width/2, -height/2, width/2, height/2);
          cloudGradient.addColorStop(0, `rgba(255, 255, 220, ${opacity})`);
          cloudGradient.addColorStop(0.5, `rgba(255, 240, 200, ${opacity * 0.8})`);
          cloudGradient.addColorStop(1, `rgba(255, 230, 180, ${opacity * 0.5})`);
          ctx.fillStyle = cloudGradient;
          ctx.fillRect(-width/2, -height/2, width, height);
          ctx.restore();
        }
        
        // Atmospheric bands with enhanced realism
        for (let i = 0; i < 80; i++) {
          const y = Math.random() * 2048;
          const opacity = Math.random() * 0.4 + 0.2;
          const height = Math.random() * 15 + 5;
          
          const bandGradient = ctx.createLinearGradient(0, y, 2048, y);
          bandGradient.addColorStop(0, `rgba(255, 245, 210, ${opacity})`);
          bandGradient.addColorStop(0.5, `rgba(255, 240, 200, ${opacity * 1.2})`);
          bandGradient.addColorStop(1, `rgba(255, 235, 190, ${opacity})`);
          ctx.fillStyle = bandGradient;
          ctx.fillRect(0, y, 2048, height);
        }
        
        // Sulfuric acid cloud swirls
        for (let i = 0; i < 50; i++) {
          const centerX = Math.random() * 2048;
          const centerY = Math.random() * 2048;
          const radius = Math.random() * 100 + 50;
          
          ctx.save();
          ctx.translate(centerX, centerY);
          ctx.beginPath();
          
          // Create spiral pattern
          for (let angle = 0; angle < Math.PI * 4; angle += 0.1) {
            const r = radius * (1 - angle / (Math.PI * 4));
            const x = Math.cos(angle) * r;
            const y = Math.sin(angle) * r;
            if (angle === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          
          ctx.strokeStyle = `rgba(255, 255, 200, 0.4)`;
          ctx.lineWidth = 8;
          ctx.stroke();
          ctx.restore();
        }
        break;
        
      case 'earth':
        // Highly detailed continents with realistic geography
        const continentDetails = [
          {x: 400, y: 600, w: 300, h: 400, name: 'North America'}, 
          {x: 800, y: 500, w: 200, h: 300, name: 'Europe'},
          {x: 1000, y: 700, w: 360, h: 500, name: 'Asia'},
          {x: 1200, y: 1200, w: 240, h: 200, name: 'Australia'},
          {x: 700, y: 1100, w: 160, h: 360, name: 'Africa'},
          {x: 300, y: 1200, w: 200, h: 300, name: 'South America'},
        ];
        
        continentDetails.forEach(continent => {
          // Diverse terrain with realistic colors
          const terrainTypes = [
            '#228B22', '#32CD32', '#8FBC8F', // Various greens for forests
            '#8B4513', '#A0522D', '#D2B48C', // Browns for mountains/deserts
            '#ADFF2F', '#9ACD32', '#7CFC00'  // Light greens for plains
          ];
          
          // Create continent base
          ctx.fillStyle = terrainTypes[Math.floor(Math.random() * terrainTypes.length)];
          ctx.fillRect(continent.x, continent.y, continent.w, continent.h);
          
          // Add mountain ranges
          for (let i = 0; i < 15; i++) {
            const x = continent.x + Math.random() * continent.w;
            const y = continent.y + Math.random() * continent.h;
            const size = Math.random() * 30 + 15;
            
            const mountainGradient = ctx.createRadialGradient(x, y, 0, x, y, size);
            mountainGradient.addColorStop(0, '#8B4513');
            mountainGradient.addColorStop(0.5, '#A0522D');
            mountainGradient.addColorStop(1, '#654321');
            ctx.fillStyle = mountainGradient;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
          }
          
          // Add forests and vegetation
          for (let i = 0; i < 40; i++) {
            const x = continent.x + Math.random() * continent.w;
            const y = continent.y + Math.random() * continent.h;
            const size = Math.random() * 20 + 8;
            ctx.fillStyle = terrainTypes[Math.floor(Math.random() * 3)]; // Green colors only
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
          }
          
          // Add rivers
          for (let i = 0; i < 5; i++) {
            const startX = continent.x + Math.random() * continent.w;
            const startY = continent.y + Math.random() * continent.h;
            
            ctx.strokeStyle = '#4169E1';
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            
            let currentX = startX;
            let currentY = startY;
            
            for (let j = 0; j < 20; j++) {
              currentX += (Math.random() - 0.5) * 20;
              currentY += Math.random() * 10;
              ctx.lineTo(currentX, currentY);
            }
            ctx.stroke();
          }
        });
        
        // Enhanced realistic cloud formations
        for (let i = 0; i < 150; i++) {
          const x = Math.random() * 2048;
          const y = Math.random() * 2048;
          const size = Math.random() * 80 + 30;
          
          const cloudGradient = ctx.createRadialGradient(x, y, 0, x, y, size);
          cloudGradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
          cloudGradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.7)');
          cloudGradient.addColorStop(0.8, 'rgba(255, 255, 255, 0.4)');
          cloudGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.fillStyle = cloudGradient;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
        
        // Weather systems - hurricanes and storm fronts
        for (let i = 0; i < 8; i++) {
          const centerX = Math.random() * 2048;
          const centerY = Math.random() * 2048;
          const radius = Math.random() * 120 + 80;
          
          ctx.save();
          ctx.translate(centerX, centerY);
          
          // Create spiral storm pattern
          for (let angle = 0; angle < Math.PI * 3; angle += 0.05) {
            const r = radius * (1 - angle / (Math.PI * 3)) * 0.8;
            const x = Math.cos(angle) * r;
            const y = Math.sin(angle) * r;
            
            ctx.fillStyle = `rgba(255, 255, 255, ${0.6 * (1 - angle / (Math.PI * 3))})`;
            ctx.beginPath();
            ctx.arc(x, y, 8, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        }
        break;
        
      case 'mars':
        // Enhanced polar ice caps with seasonal variations
        const northCapGradient = ctx.createRadialGradient(1024, 200, 0, 1024, 200, 160);
        northCapGradient.addColorStop(0, '#FFFFFF');
        northCapGradient.addColorStop(0.3, '#F8F8FF');
        northCapGradient.addColorStop(0.7, '#F0F8FF');
        northCapGradient.addColorStop(1, `rgb(${baseColor.r}, ${baseColor.g}, ${baseColor.b})`);
        ctx.fillStyle = northCapGradient;
        ctx.beginPath();
        ctx.arc(1024, 200, 160, 0, Math.PI * 2);
        ctx.fill();
        
        const southCapGradient = ctx.createRadialGradient(1024, 1848, 0, 1024, 1848, 140);
        southCapGradient.addColorStop(0, '#FFFFFF');
        southCapGradient.addColorStop(0.3, '#F8F8FF');
        southCapGradient.addColorStop(0.7, '#F0F8FF');
        southCapGradient.addColorStop(1, `rgb(${baseColor.r}, ${baseColor.g}, ${baseColor.b})`);
        ctx.fillStyle = southCapGradient;
        ctx.beginPath();
        ctx.arc(1024, 1848, 140, 0, Math.PI * 2);
        ctx.fill();
        
        // Enhanced Valles Marineris canyon system
        ctx.fillStyle = `rgb(${baseColor.r - 60}, ${baseColor.g - 60}, ${baseColor.b - 60})`;
        ctx.fillRect(400, 800, 1200, 60);
        ctx.fillRect(500, 840, 1000, 40);
        ctx.fillRect(600, 870, 800, 30);
        
        // Add canyon shadows and highlights
        const canyonGradient = ctx.createLinearGradient(400, 800, 400, 860);
        canyonGradient.addColorStop(0, `rgb(${baseColor.r - 80}, ${baseColor.g - 80}, ${baseColor.b - 80})`);
        canyonGradient.addColorStop(0.5, `rgb(${baseColor.r - 60}, ${baseColor.g - 60}, ${baseColor.b - 60})`);
        canyonGradient.addColorStop(1, `rgb(${baseColor.r - 40}, ${baseColor.g - 40}, ${baseColor.b - 40})`);
        ctx.fillStyle = canyonGradient;
        ctx.fillRect(400, 800, 1200, 60);
        
        // Olympus Mons and other volcanoes
        const volcanoGradient = ctx.createRadialGradient(600, 600, 0, 600, 600, 100);
        volcanoGradient.addColorStop(0, `rgb(${Math.min(baseColor.r + 40, 255)}, ${Math.min(baseColor.g + 40, 255)}, ${Math.min(baseColor.b + 40, 255)})`);
        volcanoGradient.addColorStop(0.5, `rgb(${baseColor.r + 20}, ${baseColor.g + 20}, ${baseColor.b + 20})`);
        volcanoGradient.addColorStop(1, `rgb(${baseColor.r}, ${baseColor.g}, ${baseColor.b})`);
        ctx.fillStyle = volcanoGradient;
        ctx.beginPath();
        ctx.arc(600, 600, 100, 0, Math.PI * 2);
        ctx.fill();
        
        // Surface features with enhanced realism
        for (let i = 0; i < 120; i++) {
          const x = Math.random() * 2048;
          const y = Math.random() * 2048;
          const size = Math.random() * 40 + 10;
          
          const featureGradient = ctx.createRadialGradient(x, y, 0, x, y, size);
          featureGradient.addColorStop(0, `rgb(${baseColor.r - 40}, ${baseColor.g - 40}, ${baseColor.b - 40})`);
          featureGradient.addColorStop(0.5, `rgb(${baseColor.r - 20}, ${baseColor.g - 20}, ${baseColor.b - 20})`);
          featureGradient.addColorStop(1, `rgb(${baseColor.r + 15}, ${baseColor.g + 15}, ${baseColor.b + 15})`);
          ctx.fillStyle = featureGradient;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
        
        // Dust storms and atmospheric effects
        for (let i = 0; i < 30; i++) {
          const x = Math.random() * 2048;
          const y = Math.random() * 2048;
          const width = Math.random() * 300 + 150;
          const height = Math.random() * 60 + 30;
          
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(Math.random() * Math.PI * 2);
          ctx.fillStyle = `rgba(${baseColor.r + 30}, ${baseColor.g + 20}, ${baseColor.b + 10}, 0.3)`;
          ctx.fillRect(-width/2, -height/2, width, height);
          ctx.restore();
        }
        break;
        
      case 'jupiter':
        // Enhanced gas giant bands with incredible detail
        const bandColors = [
          '#D2691E', '#CD853F', '#DEB887', '#F4A460', 
          '#D2B48C', '#BC8F8F', '#F5DEB3', '#DDBF94',
          '#DAA520', '#B8860B', '#FFE4B5', '#FFDEAD'
        ];
        
        for (let i = 0; i < 30; i++) {
          const y = (i / 30) * 2048;
          const height = 2048 / 30;
          const colorIndex = i % bandColors.length;
          const color = bandColors[colorIndex];
          
          // Create sophisticated band gradient
          const bandGradient = ctx.createLinearGradient(0, y, 0, y + height);
          bandGradient.addColorStop(0, `${color}DD`);
          bandGradient.addColorStop(0.3, color);
          bandGradient.addColorStop(0.7, color);
          bandGradient.addColorStop(1, `${color}DD`);
          ctx.fillStyle = bandGradient;
          ctx.fillRect(0, y, 2048, height);
          
          // Add enhanced turbulence and atmospheric dynamics
          for (let j = 0; j < 50; j++) {
            const x = Math.random() * 2048;
            const turbY = y + Math.random() * height;
            const size = Math.random() * 30 + 15;
            const turbulenceColor = bandColors[(colorIndex + 1) % bandColors.length];
            
            const turbGradient = ctx.createRadialGradient(x, turbY, 0, x, turbY, size);
            turbGradient.addColorStop(0, `${turbulenceColor}BB`);
            turbGradient.addColorStop(0.5, `${turbulenceColor}88`);
            turbGradient.addColorStop(1, `${turbulenceColor}33`);
            ctx.fillStyle = turbGradient;
            ctx.beginPath();
            ctx.arc(x, turbY, size, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        
        // Enhanced Great Red Spot with incredible detail
        const spotCenterX = 1400;
        const spotCenterY = 800;
        const spotWidth = 120;
        const spotHeight = 80;
        
        // Main spot body
        const spotGradient = ctx.createRadialGradient(spotCenterX, spotCenterY, 0, spotCenterX, spotCenterY, spotWidth);
        spotGradient.addColorStop(0, '#FF6347');
        spotGradient.addColorStop(0.2, '#FF4500');
        spotGradient.addColorStop(0.5, '#DC143C');
        spotGradient.addColorStop(0.8, '#8B0000');
        spotGradient.addColorStop(1, '#654321');
        ctx.fillStyle = spotGradient;
        ctx.beginPath();
        ctx.ellipse(spotCenterX, spotCenterY, spotWidth, spotHeight, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Add swirling details inside the spot
        for (let i = 0; i < 20; i++) {
          const angle = (i / 20) * Math.PI * 2;
          const x = spotCenterX + Math.cos(angle) * (spotWidth * 0.3);
          const y = spotCenterY + Math.sin(angle) * (spotHeight * 0.3);
          
          ctx.fillStyle = '#FF8C00';
          ctx.beginPath();
          ctx.arc(x, y, 8, 0, Math.PI * 2);
          ctx.fill();
        }
        
        // Spot boundary effects
        ctx.strokeStyle = '#FF8C00';
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.ellipse(spotCenterX, spotCenterY, spotWidth * 0.8, spotHeight * 0.8, 0, 0, Math.PI * 2);
        ctx.stroke();
        
        // Smaller storm systems
        for (let i = 0; i < 15; i++) {
          const x = Math.random() * 2048;
          const y = Math.random() * 2048;
          const size = Math.random() * 40 + 20;
          
          const stormGradient = ctx.createRadialGradient(x, y, 0, x, y, size);
          stormGradient.addColorStop(0, '#DAA520');
          stormGradient.addColorStop(0.5, '#B8860B');
          stormGradient.addColorStop(1, '#8B7355');
          ctx.fillStyle = stormGradient;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
        break;
        
      // case 'saturn':
      //   // Enhanced Saturn with atmospheric bands and ring-like surface features
      //   // ... (commented out for now)
      //   break;
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
                     planetKey === 'mars' ? 0.04 : 
                     planetKey === 'jupiter' ? 0.03 : 
                     planetKey === 'saturn' ? 0.025 : 0.02;
        
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
                                            planetKey === 'jupiter' ? 0.1 : 
                                            planetKey === 'saturn' ? 0.15 : 0.1;
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