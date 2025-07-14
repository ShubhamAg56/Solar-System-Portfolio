import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import SaturnRings from './SaturnRings';
import * as THREE from 'three';

const Planet = ({ planet, planetKey, isActive, onClick }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [planetRotation, setPlanetRotation] = useState(0);
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
  
  // Create enhanced realistic planet surface textures with ultra-high detail
  const surfaceTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 4096; // Ultra high resolution for exceptional quality
    canvas.height = 4096;
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
    const gradient = ctx.createRadialGradient(1536, 1024, 0, 2048, 2048, 2048);
    gradient.addColorStop(0, `rgb(${Math.min(baseColor.r + 60, 255)}, ${Math.min(baseColor.g + 60, 255)}, ${Math.min(baseColor.b + 60, 255)})`);
    gradient.addColorStop(0.2, `rgb(${Math.min(baseColor.r + 40, 255)}, ${Math.min(baseColor.g + 40, 255)}, ${Math.min(baseColor.b + 40, 255)})`);
    gradient.addColorStop(0.5, `rgb(${baseColor.r}, ${baseColor.g}, ${baseColor.b})`);
    gradient.addColorStop(0.8, `rgb(${Math.max(baseColor.r - 40, 0)}, ${Math.max(baseColor.g - 40, 0)}, ${Math.max(baseColor.b - 40, 0)})`);
    gradient.addColorStop(1, `rgb(${Math.max(baseColor.r - 80, 0)}, ${Math.max(baseColor.g - 80, 0)}, ${Math.max(baseColor.b - 80, 0)})`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 4096, 4096);
    
    // Add ultra-detailed surface features based on planet type
    switch(planetKey) {
      case 'sun':
        // Ultra-realistic solar surface with multiple detailed layers
        // Solar granulation with enhanced detail and resolution
        for (let i = 0; i < 1000; i++) {
          const x = Math.random() * 4096;
          const y = Math.random() * 4096;
          const size = Math.random() * 50 + 20;
          const sunGradient = ctx.createRadialGradient(x, y, 0, x, y, size);
          sunGradient.addColorStop(0, '#FFFACD');
          sunGradient.addColorStop(0.2, '#FFFF99');
          sunGradient.addColorStop(0.5, '#FFD700');
          sunGradient.addColorStop(0.8, '#FF8C00');
          sunGradient.addColorStop(1, '#FF6B35');
          ctx.fillStyle = sunGradient;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
        
        // Enhanced solar flares with ultra-realistic patterns
        for (let i = 0; i < 150; i++) {
          const x = Math.random() * 4096;
          const y = Math.random() * 4096;
          const size = Math.random() * 120 + 60;
          const flareGradient = ctx.createRadialGradient(x, y, 0, x, y, size);
          flareGradient.addColorStop(0, '#FFFFFF');
          flareGradient.addColorStop(0.1, '#FFF8DC');
          flareGradient.addColorStop(0.3, '#FFD700');
          flareGradient.addColorStop(0.6, '#FF4500');
          flareGradient.addColorStop(1, '#8B0000');
          ctx.fillStyle = flareGradient;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
        
        // Ultra-realistic sunspot formations
        for (let i = 0; i < 40; i++) {
          const x = Math.random() * 4096;
          const y = Math.random() * 4096;
          const size = Math.random() * 80 + 40;
          const spotGradient = ctx.createRadialGradient(x, y, 0, x, y, size);
          spotGradient.addColorStop(0, '#2F1B14');
          spotGradient.addColorStop(0.3, '#8B4513');
          spotGradient.addColorStop(0.7, '#CD853F');
          spotGradient.addColorStop(1, '#DAA520');
          ctx.fillStyle = spotGradient;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
        
        // Solar prominence effects with enhanced realism
        for (let i = 0; i < 60; i++) {
          const x = Math.random() * 4096;
          const y = Math.random() * 4096;
          const width = Math.random() * 200 + 100;
          const height = Math.random() * 400 + 200;
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(Math.random() * Math.PI * 2);
          const prominenceGradient = ctx.createLinearGradient(-width/2, -height/2, width/2, height/2);
          prominenceGradient.addColorStop(0, 'rgba(255, 69, 0, 0.9)');
          prominenceGradient.addColorStop(0.3, 'rgba(255, 140, 0, 0.7)');
          prominenceGradient.addColorStop(0.7, 'rgba(255, 215, 0, 0.5)');
          prominenceGradient.addColorStop(1, 'rgba(255, 255, 0, 0.2)');
          ctx.fillStyle = prominenceGradient;
          ctx.fillRect(-width/2, -height/2, width, height);
          ctx.restore();
        }
        break;
        
      case 'mercury':
        // Ultra-enhanced crater system with hyper-realistic impact features
        // Large primary impact basins
        const majorCraters = [
          {x: 1200, y: 800, size: 200, name: 'Caloris Basin'},
          {x: 2800, y: 1500, size: 150, name: 'Beethoven Basin'},
          {x: 800, y: 2200, size: 120, name: 'Tolstoj Basin'},
          {x: 3200, y: 3000, size: 180, name: 'Rembrandt Basin'}
        ];
        
        majorCraters.forEach(crater => {
          // Main crater depression with multiple rings
          const craterGradient = ctx.createRadialGradient(crater.x, crater.y, 0, crater.x, crater.y, crater.size);
          craterGradient.addColorStop(0, `rgb(${baseColor.r - 100}, ${baseColor.g - 100}, ${baseColor.b - 100})`);
          craterGradient.addColorStop(0.2, `rgb(${baseColor.r - 80}, ${baseColor.g - 80}, ${baseColor.b - 80})`);
          craterGradient.addColorStop(0.5, `rgb(${baseColor.r - 60}, ${baseColor.g - 60}, ${baseColor.b - 60})`);
          craterGradient.addColorStop(0.8, `rgb(${baseColor.r - 30}, ${baseColor.g - 30}, ${baseColor.b - 30})`);
          craterGradient.addColorStop(1, `rgb(${baseColor.r}, ${baseColor.g}, ${baseColor.b})`);
          ctx.fillStyle = craterGradient;
          ctx.beginPath();
          ctx.arc(crater.x, crater.y, crater.size, 0, Math.PI * 2);
          ctx.fill();
          
          // Multi-ring structure
          for (let ring = 1; ring <= 3; ring++) {
            ctx.strokeStyle = `rgb(${Math.min(baseColor.r + 40 * ring, 255)}, ${Math.min(baseColor.g + 40 * ring, 255)}, ${Math.min(baseColor.b + 40 * ring, 255)})`;
            ctx.lineWidth = 8 - ring * 2;
            ctx.beginPath();
            ctx.arc(crater.x, crater.y, crater.size * (0.3 + ring * 0.2), 0, Math.PI * 2);
            ctx.stroke();
          }
          
          // Central peak complex
          const peakGradient = ctx.createRadialGradient(crater.x, crater.y, 0, crater.x, crater.y, crater.size * 0.2);
          peakGradient.addColorStop(0, `rgb(${Math.min(baseColor.r + 80, 255)}, ${Math.min(baseColor.g + 80, 255)}, ${Math.min(baseColor.b + 80, 255)})`);
          peakGradient.addColorStop(1, `rgb(${Math.min(baseColor.r + 40, 255)}, ${Math.min(baseColor.g + 40, 255)}, ${Math.min(baseColor.b + 40, 255)})`);
          ctx.fillStyle = peakGradient;
          ctx.beginPath();
          ctx.arc(crater.x, crater.y, crater.size * 0.15, 0, Math.PI * 2);
          ctx.fill();
        });
        
        // Medium secondary craters (500+)
        for (let i = 0; i < 500; i++) {
          const x = Math.random() * 4096;
          const y = Math.random() * 4096;
          const size = Math.random() * 100 + 20;
          
          const craterGradient = ctx.createRadialGradient(x, y, 0, x, y, size);
          craterGradient.addColorStop(0, `rgb(${baseColor.r - 120}, ${baseColor.g - 120}, ${baseColor.b - 120})`);
          craterGradient.addColorStop(0.3, `rgb(${baseColor.r - 80}, ${baseColor.g - 80}, ${baseColor.b - 80})`);
          craterGradient.addColorStop(0.7, `rgb(${baseColor.r - 40}, ${baseColor.g - 40}, ${baseColor.b - 40})`);
          craterGradient.addColorStop(1, `rgb(${baseColor.r}, ${baseColor.g}, ${baseColor.b})`);
          ctx.fillStyle = craterGradient;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
          
          // Crater rim with detailed highlights
          ctx.strokeStyle = `rgb(${Math.min(baseColor.r + 100, 255)}, ${Math.min(baseColor.g + 100, 255)}, ${Math.min(baseColor.b + 100, 255)})`;
          ctx.lineWidth = 6;
          ctx.beginPath();
          ctx.arc(x, y, size * 0.85, 0, Math.PI * 2);
          ctx.stroke();
          
          // Ejecta blanket
          for (let j = 0; j < 8; j++) {
            const angle = (j / 8) * Math.PI * 2;
            const ejX = x + Math.cos(angle) * size * 1.5;
            const ejY = y + Math.sin(angle) * size * 1.5;
            const ejSize = size * 0.3;
            ctx.fillStyle = `rgba(${baseColor.r + 30}, ${baseColor.g + 30}, ${baseColor.b + 30}, 0.6)`;
            ctx.beginPath();
            ctx.arc(ejX, ejY, ejSize, 0, Math.PI * 2);
            ctx.fill();
          }
          
          // Central peak for larger craters
          if (size > 50) {
            ctx.fillStyle = `rgb(${Math.min(baseColor.r + 60, 255)}, ${Math.min(baseColor.g + 60, 255)}, ${Math.min(baseColor.b + 60, 255)})`;
            ctx.beginPath();
            ctx.arc(x, y, size * 0.12, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        
        // Small microcraters and detailed surface texture (1000+)
        for (let i = 0; i < 1000; i++) {
          const x = Math.random() * 4096;
          const y = Math.random() * 4096;
          const size = Math.random() * 20 + 3;
          ctx.fillStyle = `rgba(${baseColor.r + Math.random() * 60 - 30}, ${baseColor.g + Math.random() * 60 - 30}, ${baseColor.b + Math.random() * 60 - 30}, 0.8)`;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
        
        // Scarps and ridges (Mercury's unique geological features)
        for (let i = 0; i < 20; i++) {
          const startX = Math.random() * 4096;
          const startY = Math.random() * 4096;
          const length = Math.random() * 1000 + 500;
          const angle = Math.random() * Math.PI * 2;
          
          ctx.strokeStyle = `rgb(${baseColor.r + 40}, ${baseColor.g + 40}, ${baseColor.b + 40})`;
          ctx.lineWidth = 12;
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(startX + Math.cos(angle) * length, startY + Math.sin(angle) * length);
          ctx.stroke();
          
          // Shadow side of scarp
          ctx.strokeStyle = `rgb(${baseColor.r - 40}, ${baseColor.g - 40}, ${baseColor.b - 40})`;
          ctx.lineWidth = 8;
          ctx.beginPath();
          ctx.moveTo(startX + Math.cos(angle + Math.PI/2) * 6, startY + Math.sin(angle + Math.PI/2) * 6);
          ctx.lineTo(startX + Math.cos(angle) * length + Math.cos(angle + Math.PI/2) * 6, startY + Math.sin(angle) * length + Math.sin(angle + Math.PI/2) * 6);
          ctx.stroke();
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
        
      case 'saturn':
        // Enhanced Saturn with spectacular atmospheric bands and realistic features
        const saturnBandColors = [
          '#FAD5A5', '#F0E68C', '#DEB887', '#D2B48C', 
          '#BC8F8F', '#F5DEB3', '#DDBF94', '#DAA520',
          '#B8860B', '#FFE4B5', '#FFDEAD', '#F4A460',
          '#CD853F', '#D2691E', '#F5F5DC', '#FFFACD'
        ];
        
        // Create Saturn's characteristic atmospheric bands with enhanced detail
        for (let i = 0; i < 40; i++) {
          const y = (i / 40) * 2048;
          const height = 2048 / 40;
          const colorIndex = i % saturnBandColors.length;
          const color = saturnBandColors[colorIndex];
          
          // Create sophisticated band gradient with wind patterns
          const bandGradient = ctx.createLinearGradient(0, y, 0, y + height);
          bandGradient.addColorStop(0, `${color}AA`);
          bandGradient.addColorStop(0.2, color);
          bandGradient.addColorStop(0.5, `${color}DD`);
          bandGradient.addColorStop(0.8, color);
          bandGradient.addColorStop(1, `${color}AA`);
          ctx.fillStyle = bandGradient;
          ctx.fillRect(0, y, 2048, height);
          
          // Add atmospheric turbulence and wind patterns
          for (let j = 0; j < 25; j++) {
            const x = Math.random() * 2048;
            const turbY = y + Math.random() * height;
            const size = Math.random() * 12 + 3;
            
            const turbGradient = ctx.createRadialGradient(x, turbY, 0, x, turbY, size);
            turbGradient.addColorStop(0, `rgba(255, 255, 255, 0.4)`);
            turbGradient.addColorStop(0.5, `rgba(255, 215, 0, 0.3)`);
            turbGradient.addColorStop(1, 'rgba(255, 255, 255, 0.1)');
            ctx.fillStyle = turbGradient;
            ctx.beginPath();
            ctx.arc(x, turbY, size, 0, Math.PI * 2);
            ctx.fill();
          }
          
          // Add horizontal wind streaks
          if (Math.random() > 0.7) {
            const streakY = y + height * 0.5;
            const streakGradient = ctx.createLinearGradient(0, streakY, 2048, streakY);
            streakGradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
            streakGradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.2)');
            streakGradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.2)');
            streakGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            ctx.fillStyle = streakGradient;
            ctx.fillRect(0, streakY - 2, 2048, 4);
          }
        }
        
        // Add Saturn's famous hexagonal storm at north pole
        const hexagonCenterX = 1024;
        const hexagonCenterY = 200;
        const hexagonRadius = 180;
        
        // Outer hexagon with gradient
        const hexOuterGradient = ctx.createRadialGradient(hexagonCenterX, hexagonCenterY, 0, hexagonCenterX, hexagonCenterY, hexagonRadius);
        hexOuterGradient.addColorStop(0, '#FFD700');
        hexOuterGradient.addColorStop(0.4, '#DAA520');
        hexOuterGradient.addColorStop(0.8, '#B8860B');
        hexOuterGradient.addColorStop(1, '#8B7355');
        ctx.fillStyle = hexOuterGradient;
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (i / 6) * Math.PI * 2;
          const x = hexagonCenterX + Math.cos(angle) * hexagonRadius;
          const y = hexagonCenterY + Math.sin(angle) * hexagonRadius;
          
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();
        ctx.fill();
        
        // Inner hexagon with swirling pattern
        const hexInnerGradient = ctx.createRadialGradient(hexagonCenterX, hexagonCenterY, 0, hexagonCenterX, hexagonCenterY, hexagonRadius * 0.6);
        hexInnerGradient.addColorStop(0, '#FFFF99');
        hexInnerGradient.addColorStop(0.3, '#FFD700');
        hexInnerGradient.addColorStop(0.7, '#DAA520');
        hexInnerGradient.addColorStop(1, '#B8860B');
        ctx.fillStyle = hexInnerGradient;
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (i / 6) * Math.PI * 2;
          const x = hexagonCenterX + Math.cos(angle) * (hexagonRadius * 0.6);
          const y = hexagonCenterY + Math.sin(angle) * (hexagonRadius * 0.6);
          
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();
        ctx.fill();
        
        // Add swirling details inside hexagon
        for (let i = 0; i < 12; i++) {
          const angle = (i / 12) * Math.PI * 2;
          const spiralRadius = (hexagonRadius * 0.4) * (1 - i / 12);
          const x = hexagonCenterX + Math.cos(angle * 3) * spiralRadius;
          const y = hexagonCenterY + Math.sin(angle * 3) * spiralRadius;
          
          ctx.fillStyle = '#FFF8DC';
          ctx.beginPath();
          ctx.arc(x, y, 6, 0, Math.PI * 2);
          ctx.fill();
        }
        
        // Add large atmospheric storm systems across the surface
        for (let i = 0; i < 30; i++) {
          const x = Math.random() * 2048;
          const y = Math.random() * 2048;
          const size = Math.random() * 80 + 30;
          
          const stormGradient = ctx.createRadialGradient(x, y, 0, x, y, size);
          stormGradient.addColorStop(0, '#FFF8DC');
          stormGradient.addColorStop(0.3, '#F0E68C');
          stormGradient.addColorStop(0.6, '#DEB887');
          stormGradient.addColorStop(1, '#D2B48C');
          ctx.fillStyle = stormGradient;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
          
          // Add storm eye
          ctx.fillStyle = '#DAA520';
          ctx.beginPath();
          ctx.arc(x, y, size * 0.3, 0, Math.PI * 2);
          ctx.fill();
        }
        
        // Add smaller vortices and atmospheric details
        for (let i = 0; i < 60; i++) {
          const x = Math.random() * 2048;
          const y = Math.random() * 2048;
          const size = Math.random() * 25 + 8;
          
          const vortexGradient = ctx.createRadialGradient(x, y, 0, x, y, size);
          vortexGradient.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
          vortexGradient.addColorStop(0.5, 'rgba(240, 230, 140, 0.4)');
          vortexGradient.addColorStop(1, 'rgba(255, 255, 255, 0.1)');
          ctx.fillStyle = vortexGradient;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
        
        // Add atmospheric clouds and high-altitude features
        for (let i = 0; i < 80; i++) {
          const x = Math.random() * 2048;
          const y = Math.random() * 2048;
          const width = Math.random() * 150 + 50;
          const height = Math.random() * 30 + 10;
          
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(Math.random() * Math.PI * 2);
          const cloudAlpha = Math.random() * 0.4 + 0.2;
          ctx.fillStyle = `rgba(255, 255, 255, ${cloudAlpha})`;
          ctx.fillRect(-width/2, -height/2, width, height);
          ctx.restore();
        }
        
        // Add equatorial features and ring shadows
        for (let i = 0; i < 8; i++) {
          const y = 800 + i * 60;
          const shadowGradient = ctx.createLinearGradient(0, y, 2048, y);
          shadowGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
          shadowGradient.addColorStop(0.2, 'rgba(0, 0, 0, 0.1)');
          shadowGradient.addColorStop(0.8, 'rgba(0, 0, 0, 0.1)');
          shadowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = shadowGradient;
          ctx.fillRect(0, y, 2048, 15);
        }
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
      // Realistic planet rotation with proper axial tilts
      const axialTilts = {
        sun: { x: 0, z: 0 },
        mercury: { x: 0.034 * Math.PI / 180, z: 0 },  // 0.034° tilt
        venus: { x: 177.4 * Math.PI / 180, z: 0 },     // 177.4° retrograde
        earth: { x: 23.4 * Math.PI / 180, z: 0 },      // 23.4° tilt
        mars: { x: 25.2 * Math.PI / 180, z: 0 },       // 25.2° tilt
        jupiter: { x: 3.1 * Math.PI / 180, z: 0 },     // 3.1° tilt
        saturn: { x: 26.7 * Math.PI / 180, z: 0 }      // 26.7° tilt
      };
      
      const tilt = axialTilts[planetKey] || axialTilts.earth;
      
      // Apply axial tilt to the planet
      meshRef.current.rotation.x = tilt.x;
      meshRef.current.rotation.z = tilt.z;
      
      // Enhanced planet rotation with realistic speeds and directions
      const rotationSpeed = planetKey === 'sun' ? 0.015 : 
                           planetKey === 'venus' ? -0.008 : // Venus rotates backwards
                           planetKey === 'mercury' ? 0.04 : // Mercury rotates slowly
                           planetKey === 'earth' ? 0.02 :
                           planetKey === 'mars' ? 0.019 :
                           planetKey === 'jupiter' ? 0.045 : // Jupiter rotates fast
                           planetKey === 'saturn' ? 0.038 : 0.02;
      
      meshRef.current.rotation.y += rotationSpeed;
      
      // Update planet rotation state for rings synchronization
      setPlanetRotation(meshRef.current.rotation.y);
      
      // CORRECTED orbital motion - all planets orbit COUNTERCLOCKWISE (like real solar system)
      if (planetKey !== 'sun') {
        const time = state.clock.elapsedTime;
        const speed = planetKey === 'mercury' ? 0.12 :  // Mercury fastest
                     planetKey === 'venus' ? 0.08 : 
                     planetKey === 'earth' ? 0.06 : 
                     planetKey === 'mars' ? 0.05 : 
                     planetKey === 'jupiter' ? 0.04 : 
                     planetKey === 'saturn' ? 0.03 : 0.02;
        
        // Calculate orbital radius from initial position
        const radius = Math.sqrt(planet.position[0] ** 2 + planet.position[2] ** 2);
        
        // FIXED: Counterclockwise orbital motion (negative time for correct direction)
        const newX = Math.cos(-time * speed) * radius;  // Negative time for counterclockwise
        const newZ = Math.sin(-time * speed) * radius;  // Negative time for counterclockwise
        
        meshRef.current.position.x = newX;
        meshRef.current.position.z = newZ;
        
        // Add realistic orbital inclinations
        const orbitalInclinations = {
          mercury: 7.0 * Math.PI / 180,  // 7° to ecliptic
          venus: 3.4 * Math.PI / 180,    // 3.4° to ecliptic
          earth: 0,                      // Reference plane
          mars: 1.9 * Math.PI / 180,     // 1.9° to ecliptic
          jupiter: 1.3 * Math.PI / 180,  // 1.3° to ecliptic
          saturn: 2.5 * Math.PI / 180    // 2.5° to ecliptic
        };
        
        const inclination = orbitalInclinations[planetKey] || 0;
        const verticalOscillation = Math.sin(time * speed * 2) * Math.sin(inclination) * 2;
        meshRef.current.position.y = planet.position[1] + verticalOscillation;
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
        
        {/* Saturn's atmospheric glow */}
        {planetKey === 'saturn' && (
          <mesh scale={1.06}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshBasicMaterial
              color="#F0E68C"
              transparent
              opacity={0.12}
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
      
      {/* Saturn's iconic ring system */}
      {planetKey === 'saturn' && (
        <SaturnRings 
          position={meshRef.current ? [meshRef.current.position.x, meshRef.current.position.y, meshRef.current.position.z] : planet.position} 
          scale={planet.scale}
          planetRotation={planetRotation}
        />
      )}
      
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