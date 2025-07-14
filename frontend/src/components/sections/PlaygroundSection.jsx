import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { portfolioData } from '../../data/mockData';

const PlaygroundSection = () => {
  const { currentTheme } = useTheme();
  
  // Default color fallbacks
  const cardBg = currentTheme?.cardBg || 'rgba(255, 255, 255, 0.1)';
  const border = currentTheme?.border || 'rgba(255, 255, 255, 0.2)';
  const textPrimary = currentTheme?.textPrimary || '#ffffff';
  const textSecondary = currentTheme?.textSecondary || '#cccccc';
  const accent = currentTheme?.accent || '#FFD700';
  const highlight = currentTheme?.highlight || '#FF6B6B';

  const handleDemoClick = (demo) => {
    if (demo.demo) {
      window.open(demo.demo, '_blank');
    }
  };

  const handleGithubClick = (demo) => {
    if (demo.github) {
      window.open(demo.github, '_blank');
    }
  };

  const getComplexityColor = (complexity) => {
    const colors = {
      'Beginner': '#4CAF50',
      'Intermediate': '#FF9800',
      'Advanced': '#FF5722',
      'Expert': '#9C27B0'
    };
    return colors[complexity] || '#757575';
  };

  const getPerformanceIcon = (performance) => {
    const icons = {
      'Standard GPU': '🖥️',
      'Modern GPU': '💻',
      'GPU Required': '🎮',
      'High-end GPU': '🚀'
    };
    return icons[performance] || '💻';
  };

  const getTypeIcon = (type) => {
    const icons = {
      'interactive': '🎮',
      'experience': '🌟',
      'simulation': '⚡',
      'experiment': '🔬'
    };
    return icons[type] || '🎯';
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-4xl font-bold mb-4" style={{ color: textPrimary }}>
          🪐 Playground
        </h2>
        <p className="text-lg mb-6" style={{ color: textSecondary }}>
          Interactive demos and experiments using Three.js, WebGL, and animations
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {portfolioData.playground.map((demo, index) => (
          <motion.div
            key={demo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group cursor-pointer"
            onClick={() => handleDemoClick(demo)}
          >
            <div 
              className="p-6 rounded-lg backdrop-blur-sm border transition-all duration-300 hover:scale-105"
              style={{ 
                backgroundColor: cardBg,
                borderColor: border,
                borderWidth: '1px'
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getTypeIcon(demo.type)}</span>
                  <h3 className="text-xl font-semibold" style={{ color: textPrimary }}>
                    {demo.title}
                  </h3>
                </div>
                {demo.featured && (
                  <span 
                    className="px-2 py-1 rounded text-xs font-semibold"
                    style={{ 
                      backgroundColor: highlight,
                      color: '#ffffff'
                    }}
                  >
                    Featured
                  </span>
                )}
              </div>

              <div className="mb-4">
                <span 
                  className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-3"
                  style={{ 
                    backgroundColor: getCategoryColor(demo.category),
                    color: '#ffffff'
                  }}
                >
                  {demo.category}
                </span>
              </div>

              <p className="text-sm mb-4" style={{ color: textSecondary }}>
                {demo.description}
              </p>

              <div className="mb-4">
                <h4 className="text-sm font-semibold mb-2" style={{ color: textPrimary }}>
                  Key Features:
                </h4>
                <ul className="text-xs space-y-1" style={{ color: textSecondary }}>
                  {demo.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <span style={{ color: accent }}>•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-semibold mb-2" style={{ color: textPrimary }}>
                  Technologies:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {demo.technologies.map((tech, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-1 rounded text-xs"
                      style={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        color: textSecondary
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3">
                <button 
                  className="flex-1 py-2 px-4 rounded text-sm font-medium transition-colors hover:opacity-80"
                  style={{ 
                    backgroundColor: accent,
                    color: '#000000'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDemoClick(demo);
                  }}
                >
                  🚀 Try Demo
                </button>
                <button 
                  className="py-2 px-4 rounded text-sm font-medium border transition-colors hover:opacity-80"
                  style={{ 
                    borderColor: border,
                    color: textSecondary
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleGithubClick(demo);
                  }}
                >
                  📦 Code
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-center p-6 rounded-lg backdrop-blur-sm border"
        style={{ 
          backgroundColor: cardBg,
          borderColor: border,
          borderWidth: '1px'
        }}
      >
        <h3 className="text-xl font-semibold mb-2" style={{ color: textPrimary }}>
          🔮 Want to see more demos?
        </h3>
        <p className="text-sm mb-4" style={{ color: textSecondary }}>
          These are just a few examples of what's possible with Three.js and WebGL. 
          Each demo showcases different aspects of 3D graphics, animations, and interactive experiences.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <span 
            className="px-3 py-1 rounded-full text-xs"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: textSecondary
            }}
          >
            Three.js
          </span>
          <span 
            className="px-3 py-1 rounded-full text-xs"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: textSecondary
            }}
          >
            WebGL
          </span>
          <span 
            className="px-3 py-1 rounded-full text-xs"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: textSecondary
            }}
          >
            Shaders
          </span>
          <span 
            className="px-3 py-1 rounded-full text-xs"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: textSecondary
            }}
          >
            Physics
          </span>
          <span 
            className="px-3 py-1 rounded-full text-xs"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: textSecondary
            }}
          >
            Animation
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default PlaygroundSection;