import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Settings } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const TimeControls = ({ 
  isPlaying, 
  setIsPlaying, 
  timeSpeed, 
  setTimeSpeed, 
  onReset,
  elapsedTime 
}) => {
  const { currentTheme } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  
  const timeSpeedOptions = [
    { value: 0.1, label: '0.1x' },
    { value: 0.25, label: '0.25x' },
    { value: 0.5, label: '0.5x' },
    { value: 1, label: '1x' },
    { value: 2, label: '2x' },
    { value: 5, label: '5x' },
    { value: 10, label: '10x' }
  ];
  
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-end space-y-2"
      >
        {/* Time Display */}
        <motion.div
          className="px-4 py-2 rounded-lg backdrop-blur-sm border shadow-lg"
          style={{ 
            backgroundColor: currentTheme?.cardBackground,
            borderColor: currentTheme?.cardBorder,
            color: currentTheme?.textPrimary
          }}
        >
          <div className="text-sm font-mono">
            {formatTime(elapsedTime)}
          </div>
          <div className="text-xs opacity-75">
            Speed: {timeSpeed}x
          </div>
        </motion.div>
        
        {/* Speed Controls */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              className="flex flex-col space-y-1 p-2 rounded-lg backdrop-blur-sm border shadow-lg"
              style={{ 
                backgroundColor: currentTheme?.cardBackground,
                borderColor: currentTheme?.cardBorder
              }}
            >
              {timeSpeedOptions.map((option) => (
                <motion.button
                  key={option.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setTimeSpeed(option.value)}
                  className={`px-3 py-1 rounded text-sm transition-all ${
                    timeSpeed === option.value 
                      ? 'bg-blue-500 text-white' 
                      : 'hover:bg-gray-600'
                  }`}
                  style={{ 
                    color: timeSpeed === option.value ? 'white' : currentTheme?.textPrimary
                  }}
                >
                  {option.label}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Main Controls */}
        <motion.div
          className="flex items-center space-x-2 p-2 rounded-lg backdrop-blur-sm border shadow-lg"
          style={{ 
            backgroundColor: currentTheme?.cardBackground,
            borderColor: currentTheme?.cardBorder
          }}
        >
          {/* Settings Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-full hover:bg-gray-600 transition-colors"
            style={{ color: currentTheme?.textPrimary }}
          >
            <Settings size={20} />
          </motion.button>
          
          {/* Play/Pause Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-full hover:bg-gray-600 transition-colors"
            style={{ color: currentTheme?.textPrimary }}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </motion.button>
          
          {/* Reset Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onReset}
            className="p-2 rounded-full hover:bg-gray-600 transition-colors"
            style={{ color: currentTheme?.textPrimary }}
          >
            <RotateCcw size={20} />
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TimeControls;