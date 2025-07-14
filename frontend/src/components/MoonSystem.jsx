import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Moon = ({ planetPosition, orbitRadius, orbitSpeed, size, color, name }) => {
  const moonRef = useRef();
  
  const moonMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: color,
    roughness: 0.8,
    metalness: 0.1,
    transparent: false,
    opacity: 1.0
  }), [color]);
  
  useFrame((state) => {
    if (moonRef.current) {
      const time = state.clock.elapsedTime;
      
      // Orbit around the planet
      const angle = time * orbitSpeed;
      const x = planetPosition[0] + Math.cos(angle) * orbitRadius;
      const z = planetPosition[2] + Math.sin(angle) * orbitRadius;
      const y = planetPosition[1] + Math.sin(angle * 0.5) * 0.5; // Slight vertical oscillation
      
      moonRef.current.position.set(x, y, z);
      
      // Rotate the moon
      moonRef.current.rotation.y += 0.01;
    }
  });
  
  return (
    <mesh ref={moonRef} material={moonMaterial}>
      <sphereGeometry args={[size, 16, 16]} />
    </mesh>
  );
};

const MoonSystem = ({ planetKey, planetPosition, planetScale }) => {
  const moonConfigs = useMemo(() => {
    const configs = {
      earth: [
        {
          orbitRadius: 3,
          orbitSpeed: 0.5,
          size: 0.27,
          color: '#C0C0C0',
          name: 'Moon'
        }
      ],
      mars: [
        {
          orbitRadius: 2,
          orbitSpeed: 0.8,
          size: 0.1,
          color: '#8C7853',
          name: 'Phobos'
        },
        {
          orbitRadius: 2.5,
          orbitSpeed: 0.6,
          size: 0.08,
          color: '#A0522D',
          name: 'Deimos'
        }
      ],
      jupiter: [
        {
          orbitRadius: 4,
          orbitSpeed: 0.7,
          size: 0.25,
          color: '#FFFF99',
          name: 'Io'
        },
        {
          orbitRadius: 5,
          orbitSpeed: 0.5,
          size: 0.22,
          color: '#E6E6FA',
          name: 'Europa'
        },
        {
          orbitRadius: 6,
          orbitSpeed: 0.4,
          size: 0.35,
          color: '#8B4513',
          name: 'Ganymede'
        },
        {
          orbitRadius: 7,
          orbitSpeed: 0.3,
          size: 0.32,
          color: '#696969',
          name: 'Callisto'
        }
      ],
      saturn: [
        {
          orbitRadius: 4,
          orbitSpeed: 0.6,
          size: 0.35,
          color: '#FFA500',
          name: 'Titan'
        },
        {
          orbitRadius: 5,
          orbitSpeed: 0.8,
          size: 0.15,
          color: '#F5F5DC',
          name: 'Enceladus'
        },
        {
          orbitRadius: 6,
          orbitSpeed: 0.4,
          size: 0.28,
          color: '#DCDCDC',
          name: 'Iapetus'
        }
      ],
      uranus: [
        {
          orbitRadius: 3,
          orbitSpeed: 0.7,
          size: 0.18,
          color: '#B0C4DE',
          name: 'Ariel'
        },
        {
          orbitRadius: 3.5,
          orbitSpeed: 0.6,
          size: 0.20,
          color: '#E0E0E0',
          name: 'Umbriel'
        },
        {
          orbitRadius: 4.2,
          orbitSpeed: 0.5,
          size: 0.25,
          color: '#F0F8FF',
          name: 'Titania'
        },
        {
          orbitRadius: 4.8,
          orbitSpeed: 0.4,
          size: 0.23,
          color: '#D3D3D3',
          name: 'Oberon'
        }
      ]
    };
    
    return configs[planetKey] || [];
  }, [planetKey]);
  
  if (moonConfigs.length === 0) return null;
  
  return (
    <group>
      {moonConfigs.map((moonConfig, index) => (
        <Moon
          key={index}
          planetPosition={planetPosition}
          orbitRadius={moonConfig.orbitRadius * planetScale}
          orbitSpeed={moonConfig.orbitSpeed}
          size={moonConfig.size * planetScale}
          color={moonConfig.color}
          name={moonConfig.name}
        />
      ))}
    </group>
  );
};

export default MoonSystem;