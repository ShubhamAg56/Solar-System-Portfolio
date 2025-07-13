import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const LoadingScreen = ({ onLoadComplete }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const { currentTheme } = useTheme();
  
  // Default color fallbacks
  const background = currentTheme?.background || 'linear-gradient(to bottom, #000428, #004e92)';
  const textPrimary = currentTheme?.textPrimary || '#ffffff';
  const textSecondary = currentTheme?.textSecondary || '#cccccc';
  const border = currentTheme?.border || 'rgba(255, 255, 255, 0.2)';
  
  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => onLoadComplete(), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);
    
    return () => clearInterval(timer);
  }, [onLoadComplete]);
  
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ background: currentTheme.background }}
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mx-auto flex items-center justify-center text-6xl mb-4">
            🌟
          </div>
          <h1 className="text-4xl font-bold mb-2" style={{ color: currentTheme.textPrimary }}>
            Alex Cosmos
          </h1>
          <p style={{ color: currentTheme.textSecondary }}>
            Initializing Solar System...
          </p>
        </motion.div>
        
        <div className="w-64 h-2 rounded-full overflow-hidden" style={{ backgroundColor: currentTheme.border }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${loadingProgress}%` }}
            transition={{ duration: 0.1 }}
            className="h-full bg-gradient-to-r from-yellow-400 to-orange-500"
          />
        </div>
        
        <p className="mt-4" style={{ color: currentTheme.textSecondary }}>
          {Math.round(loadingProgress)}%
        </p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;