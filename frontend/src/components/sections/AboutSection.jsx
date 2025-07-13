import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../../data/mockData';
import { useTheme } from '../../contexts/ThemeContext';

const AboutSection = () => {
  const { personal } = portfolioData;
  const { currentTheme } = useTheme();
  
  return (
    <div style={{ color: currentTheme.textPrimary }}>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"
      >
        About Me
      </motion.h2>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-6"
      >
        <div className="relative">
          <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mx-auto mb-6 flex items-center justify-center">
            <div className="text-6xl">🚀</div>
          </div>
        </div>
        
        <div>
          <h3 className="text-2xl font-semibold mb-2" style={{ color: currentTheme.textPrimary }}>
            {personal.name}
          </h3>
          <p className="text-xl mb-4" style={{ color: currentTheme.textSecondary }}>
            {personal.title}
          </p>
          <p className="text-lg text-yellow-400 italic mb-6">
            "{personal.tagline}"
          </p>
        </div>
        
        <div 
          className="rounded-lg p-6 backdrop-blur-sm"
          style={{ 
            backgroundColor: currentTheme.cardBackground,
            border: `1px solid ${currentTheme.border}`,
          }}
        >
          <p className="leading-relaxed" style={{ color: currentTheme.textSecondary }}>
            {personal.bio}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div 
            className="rounded-lg p-4 backdrop-blur-sm"
            style={{ 
              backgroundColor: currentTheme.cardBackground,
              border: `1px solid ${currentTheme.border}`,
            }}
          >
            <h4 className="font-semibold text-yellow-400 mb-2">Location</h4>
            <p style={{ color: currentTheme.textSecondary }}>{personal.location}</p>
          </div>
          
          <div 
            className="rounded-lg p-4 backdrop-blur-sm"
            style={{ 
              backgroundColor: currentTheme.cardBackground,
              border: `1px solid ${currentTheme.border}`,
            }}
          >
            <h4 className="font-semibold text-yellow-400 mb-2">Contact</h4>
            <p className="text-sm" style={{ color: currentTheme.textSecondary }}>
              {personal.email}
            </p>
            <p className="text-sm" style={{ color: currentTheme.textSecondary }}>
              {personal.phone}
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4 justify-center">
          {Object.entries(personal.social).map(([platform, url]) => (
            <motion.a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg transition-colors capitalize"
              style={{ 
                backgroundColor: currentTheme.cardBackground,
                border: `1px solid ${currentTheme.border}`,
                color: currentTheme.textSecondary,
              }}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: currentTheme.accent + '20',
              }}
              whileTap={{ scale: 0.95 }}
            >
              {platform}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AboutSection;