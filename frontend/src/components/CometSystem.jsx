import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Comet = ({ position, direction, speed = 0.02, color = '#87CEEB' }) => {
  const cometRef = useRef();
  const tailRef = useRef();
  const vaporParticlesRef = useRef();
  
  // Enhanced comet state management
  const [cometState, setCometState] = useState({
    isVaporizing: false,
    vaporTime: 0,
    velocity: { x: direction.x * speed, y: direction.y * speed, z: direction.z * speed },
    currentPosition: [...position]
  });
  
  // Create ultra-enhanced comet texture with 512x512 resolution
  const cometTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512; // Doubled texture resolution for ultra-quality
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    // Create enhanced radial gradient for comet core with more realistic ice colors
    const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
    gradient.addColorStop(0, '#FFFFFF');
    gradient.addColorStop(0.2, '#E6F3FF');
    gradient.addColorStop(0.4, color);
    gradient.addColorStop(0.6, '#4169E1');
    gradient.addColorStop(0.8, '#1E3A8A');
    gradient.addColorStop(1, '#0F1419');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);
    
    // Add ultra-detailed ice crystal patterns (doubled count)
    for (let i = 0; i < 300; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const size = Math.random() * 12 + 3;
      const brightness = Math.random() * 0.9 + 0.5;
      
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
      ctx.fill();
      
      // Add crystal sparkle effect
      ctx.beginPath();
      ctx.arc(x, y, size * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${brightness * 1.5})`;
      ctx.fill();
    }
    
    // Add enhanced surface cracks and fissures
    for (let i = 0; i < 150; i++) {
      const x1 = Math.random() * 512;
      const y1 = Math.random() * 512;
      const x2 = x1 + (Math.random() - 0.5) * 80;
      const y2 = y1 + (Math.random() - 0.5) * 80;
      
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = `rgba(200, 220, 255, ${Math.random() * 0.8 + 0.4})`;
      ctx.lineWidth = Math.random() * 4 + 1;
      ctx.stroke();
    }
    
    // Add ultra-detailed surface imperfections and meteor impact craters
    for (let i = 0; i < 80; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const size = Math.random() * 25 + 5;
      
      const craterGradient = ctx.createRadialGradient(x, y, 0, x, y, size);
      craterGradient.addColorStop(0, 'rgba(100, 100, 100, 0.8)');
      craterGradient.addColorStop(0.7, 'rgba(150, 150, 150, 0.4)');
      craterGradient.addColorStop(1, 'rgba(200, 200, 200, 0.1)');
      
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = craterGradient;
      ctx.fill();
    }
    
    // Add enhanced sparkle effects with varied sizes
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const size = Math.random() * 4 + 1;
      
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.95 + 0.05})`;
      ctx.fill();
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearFilter;
    
    return texture;
  }, [color]);
  
  // Create enhanced normal map with higher resolution
  const normalMap = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    // Base normal (pointing up)
    ctx.fillStyle = '#8080FF';
    ctx.fillRect(0, 0, 512, 512);
    
    // Add enhanced surface normal variations for ultra-realistic ice texture
    for (let i = 0; i < 400; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const radius = Math.random() * 30 + 8;
      
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, '#FF8080');
      gradient.addColorStop(0.5, '#C080C0');
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
    texture.minFilter = THREE.LinearMipMapLinearFilter;
    texture.anisotropy = 16; // Enhanced anisotropic filtering
    
    return texture;
  }, []);
  
  // Create vaporization particle system
  const vaporParticleGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    const sizes = [];
    const velocities = [];
    
    // Create explosion particles
    for (let i = 0; i < 100; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const radius = Math.random() * 3 + 1;
      
      positions.push(
        Math.sin(phi) * Math.cos(theta) * radius,
        Math.cos(phi) * radius,
        Math.sin(phi) * Math.sin(theta) * radius
      );
      
      // Hot plasma colors
      const temp = Math.random();
      if (temp < 0.3) {
        colors.push(1, 1, 1, 1); // White hot
      } else if (temp < 0.6) {
        colors.push(1, 0.8, 0.2, 1); // Yellow
      } else {
        colors.push(1, 0.3, 0, 1); // Orange-red
      }
      
      sizes.push(Math.random() * 0.5 + 0.2);
      
      // Random explosion velocities
      velocities.push(
        (Math.random() - 0.5) * 0.1,
        (Math.random() - 0.5) * 0.1,
        (Math.random() - 0.5) * 0.1
      );
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 4));
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
    geometry.setAttribute('velocity', new THREE.Float32BufferAttribute(velocities, 3));
    
    return geometry;
  }, []);
  
  const vaporParticleMaterial = useMemo(() => {
    return new THREE.PointsMaterial({
      size: 0.3,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true
    });
  }, []);
  
  // Create ultra-enhanced comet geometry with realistic size
  const cometGeometry = useMemo(() => {
    const geometry = new THREE.SphereGeometry(0.15, 32, 32); // Reduced from 0.3 to 0.15 for smaller size
    const positionAttribute = geometry.attributes.position;
    
    // Add enhanced surface irregularities for ultra-realistic comet shape
    for (let i = 0; i < positionAttribute.count; i++) {
      const vertex = new THREE.Vector3();
      vertex.fromBufferAttribute(positionAttribute, i);
      
      // Add multi-layered noise for complex surface
      const noise1 = (Math.random() - 0.5) * 0.2;
      const noise2 = (Math.random() - 0.5) * 0.1;
      const noise3 = (Math.random() - 0.5) * 0.05;
      const combinedNoise = noise1 + noise2 + noise3;
      
      vertex.multiplyScalar(1 + combinedNoise);
      
      positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }
    
    geometry.computeVertexNormals();
    return geometry;
  }, []);
  
  // Create ultra-enhanced material with better visual properties
  const cometMaterial = useMemo(() => new THREE.MeshStandardMaterial({ 
    map: cometTexture,
    normalMap: normalMap,
    normalScale: new THREE.Vector2(0.8, 0.8),
    emissive: new THREE.Color(color),
    emissiveIntensity: 0.4,
    transparent: true,
    opacity: 0.98,
    roughness: 0.2,
    metalness: 0.05,
    envMapIntensity: 1.0,
    clearcoat: 0.1,
    clearcoatRoughness: 0.3
  }), [color, cometTexture, normalMap]);
  
  // Create ultra-enhanced tail geometry with maximum particles and detail
  const tailGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    const sizes = [];
    const tailLength = 200; // Increased from 120 for ultra-long tail
    
    for (let i = 0; i < tailLength; i++) {
      const t = i / tailLength;
      const spread = t * 3; // Increased spread for more dramatic tail
      
      // Create multiple particles per tail segment for realistic density
      for (let j = 0; j < 2; j++) { // Reduced from 5 to 2 particles per segment
        const offsetX = (Math.random() - 0.5) * spread;
        const offsetY = (Math.random() - 0.5) * spread;
        const offsetZ = (Math.random() - 0.5) * spread;
        
        positions.push(
          -direction.x * t * 8 + offsetX, // Reduced tail length from 15 to 8
          -direction.y * t * 8 + offsetY,
          -direction.z * t * 8 + offsetZ
        );
        
        // Ultra-enhanced color fade with multi-tone gradient
        const alpha = Math.pow(1 - t, 1.8); // More dramatic fade
        const brightness = 0.9 + Math.random() * 0.3; // Higher brightness
        
        // Enhanced color mixing with blue and white tones
        const baseR = parseInt(color.slice(1, 3), 16) / 255;
        const baseG = parseInt(color.slice(3, 5), 16) / 255;
        const baseB = parseInt(color.slice(5, 7), 16) / 255;
        
        colors.push(
          Math.min(1, baseR * brightness + 0.2), // Add warm tint
          Math.min(1, baseG * brightness + 0.3), // Add brightness
          Math.min(1, baseB * brightness + 0.4), // Add blue tint
          alpha
        );
        
        // Varying particle sizes - smaller for realism
        sizes.push(0.2 + Math.random() * 0.4 - t * 0.3);
      }
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 4));
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
    
    return geometry;
  }, [direction, color]);
  
  // Ultra-enhanced tail material with better blending and effects
  const tailMaterial = useMemo(() => {
    // Create ultra-detailed sparkle texture for tail particles
    const canvas = document.createElement('canvas');
    canvas.width = 128; // Doubled resolution
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    
    // Create enhanced radial gradient for ultra-sparkle effect
    const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.2, 'rgba(240, 240, 255, 0.95)');
    gradient.addColorStop(0.4, 'rgba(200, 220, 255, 0.8)');
    gradient.addColorStop(0.6, 'rgba(150, 180, 255, 0.6)');
    gradient.addColorStop(0.8, 'rgba(100, 150, 255, 0.3)');
    gradient.addColorStop(1, 'rgba(80, 120, 255, 0)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);
    
    // Add sparkle details
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * 128;
      const y = Math.random() * 128;
      const size = Math.random() * 4 + 1;
      
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.fill();
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    
    return new THREE.PointsMaterial({
      map: texture,
      size: 1.2, // Increased from 0.8 for more prominent particles
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true
    });
  }, []);
  
  // Physics and collision detection with enhanced gravitational effects
  useFrame((state) => {
    if (cometRef.current && tailRef.current) {
      const time = state.clock.elapsedTime;
      
      // Calculate distance from sun at origin [0, 0, 0]
      const sunPosition = new THREE.Vector3(0, 0, 0);
      const currentPos = new THREE.Vector3(
        cometState.currentPosition[0],
        cometState.currentPosition[1],
        cometState.currentPosition[2]
      );
      
      const distanceFromSun = currentPos.distanceTo(sunPosition);
      
      // Enhanced physics constants
      const SUN_RADIUS = 4.5; // Sun's influence radius (scale 3 + buffer)
      const VAPORIZATION_RADIUS = 6.0; // Critical distance for vaporization
      const GRAVITATIONAL_STRENGTH = 0.3; // Gravitational pull strength
      const DEFLECTION_RADIUS = 15.0; // Distance where gravitational deflection starts
      
      // Check for vaporization
      if (distanceFromSun < VAPORIZATION_RADIUS && !cometState.isVaporizing) {
        setCometState(prev => ({
          ...prev,
          isVaporizing: true,
          vaporTime: 0
        }));
      }
      
      // Handle vaporization effect
      if (cometState.isVaporizing) {
        const vaporProgress = cometState.vaporTime / 3.0; // 3 second vaporization
        
        if (vaporProgress < 1.0) {
          // Update vapor particles
          if (vaporParticlesRef.current) {
            vaporParticlesRef.current.visible = true;
            const positions = vaporParticlesRef.current.geometry.attributes.position.array;
            const velocities = vaporParticlesRef.current.geometry.attributes.velocity.array;
            
            for (let i = 0; i < positions.length; i += 3) {
              positions[i] += velocities[i] * vaporProgress * 2;
              positions[i + 1] += velocities[i + 1] * vaporProgress * 2;
              positions[i + 2] += velocities[i + 2] * vaporProgress * 2;
            }
            
            vaporParticlesRef.current.geometry.attributes.position.needsUpdate = true;
            vaporParticlesRef.current.material.opacity = 1 - vaporProgress;
          }
          
          // Fade out comet and tail
          cometRef.current.material.opacity = 1 - vaporProgress;
          tailRef.current.material.opacity = 1 - vaporProgress;
          
          setCometState(prev => ({
            ...prev,
            vaporTime: prev.vaporTime + 0.016 // ~60fps
          }));
        } else {
          // Reset comet to original position after vaporization
          setCometState({
            isVaporizing: false,
            vaporTime: 0,
            velocity: { x: direction.x * speed, y: direction.y * speed, z: direction.z * speed },
            currentPosition: [...position]
          });
          
          if (vaporParticlesRef.current) {
            vaporParticlesRef.current.visible = false;
          }
          
          cometRef.current.material.opacity = 0.98;
          tailRef.current.material.opacity = 1.0;
        }
      } else {
        // Normal physics simulation with gravitational deflection
        if (distanceFromSun < DEFLECTION_RADIUS && distanceFromSun > VAPORIZATION_RADIUS) {
          // Apply gravitational deflection
          const directionToSun = sunPosition.clone().sub(currentPos).normalize();
          const gravityForce = GRAVITATIONAL_STRENGTH / Math.pow(distanceFromSun, 2);
          
          // Apply perpendicular deflection force (not straight toward sun)
          const deflectionVector = new THREE.Vector3(
            -directionToSun.z, // Perpendicular deflection
            directionToSun.y * 0.5, // Slight upward curve
            directionToSun.x
          ).normalize().multiplyScalar(gravityForce);
          
          setCometState(prev => ({
            ...prev,
            velocity: {
              x: prev.velocity.x + deflectionVector.x,
              y: prev.velocity.y + deflectionVector.y,
              z: prev.velocity.z + deflectionVector.z
            }
          }));
        }
        
        // Update comet position with physics
        const newPosition = [
          cometState.currentPosition[0] + cometState.velocity.x * 100,
          cometState.currentPosition[1] + cometState.velocity.y * 100,
          cometState.currentPosition[2] + cometState.velocity.z * 100
        ];
        
        setCometState(prev => ({
          ...prev,
          currentPosition: newPosition
        }));
        
        // Apply position to mesh
        cometRef.current.position.set(newPosition[0], newPosition[1], newPosition[2]);
        tailRef.current.position.copy(cometRef.current.position);
        
        if (vaporParticlesRef.current) {
          vaporParticlesRef.current.position.copy(cometRef.current.position);
        }
        
        // Reset position if comet goes too far
        const distance = Math.sqrt(
          Math.pow(newPosition[0], 2) +
          Math.pow(newPosition[1], 2) +
          Math.pow(newPosition[2], 2)
        );
        
        if (distance > 200) {
          setCometState({
            isVaporizing: false,
            vaporTime: 0,
            velocity: { x: direction.x * speed, y: direction.y * speed, z: direction.z * speed },
            currentPosition: [...position]
          });
        }
        
        // Add enhanced rotation with realistic physics
        cometRef.current.rotation.x += 0.008;
        cometRef.current.rotation.y += 0.012;
        cometRef.current.rotation.z += 0.005;
      }
    }
  });
  
  return (
    <group>
      {/* Ultra-enhanced comet core with maximum texture quality */}
      <mesh ref={cometRef} geometry={cometGeometry} material={cometMaterial} />
      
      {/* Ultra-enhanced comet tail with maximum particles */}
      <points ref={tailRef} geometry={tailGeometry} material={tailMaterial} />
      
      {/* Vaporization particle system */}
      <points 
        ref={vaporParticlesRef}
        geometry={vaporParticleGeometry}
        material={vaporParticleMaterial}
        visible={false}
      />
      
      // Multi-layer comet glow for realistic effect
      <mesh ref={cometRef} scale={1.3}>
        <sphereGeometry args={[0.15, 24, 24]} />
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={0.25} 
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Outer glow layer */}
      <mesh ref={cometRef} scale={1.8}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial 
          color={new THREE.Color(color).multiplyScalar(0.8)} 
          transparent 
          opacity={0.15} 
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Coma effect - realistic gaseous envelope */}
      <mesh ref={cometRef} scale={2.2}>
        <sphereGeometry args={[0.15, 12, 12]} />
        <meshBasicMaterial 
          color={new THREE.Color(color).lerp(new THREE.Color('#FFFFFF'), 0.4)} 
          transparent 
          opacity={0.08} 
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};

// Enhanced Comet system component with optimized positioning
const CometSystem = () => {
  const comets = useMemo(() => [
    {
      position: [-120, 25, -60], // Moved further from sun
      direction: { x: 0.8, y: -0.1, z: 0.6 }, // Adjusted for better trajectory
      speed: 0.022,
      color: '#87CEEB'
    },
    {
      position: [100, -35, -90], // Moved further from sun
      direction: { x: -0.6, y: 0.2, z: 0.8 }, // Adjusted for better trajectory
      speed: 0.018,
      color: '#B0E0E6'
    },
    {
      position: [-70, 60, 120], // Moved further from sun
      direction: { x: 0.4, y: -0.6, z: -0.5 }, // Adjusted for better trajectory
      speed: 0.025,
      color: '#E0FFFF'
    },
    {
      position: [90, 80, -30], // New comet for more variety
      direction: { x: -0.5, y: -0.4, z: 0.7 },
      speed: 0.020,
      color: '#F0F8FF'
    },
    {
      position: [-40, -90, 80], // New comet for more variety
      direction: { x: 0.3, y: 0.7, z: -0.6 },
      speed: 0.024,
      color: '#E6F3FF'
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