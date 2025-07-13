import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { navigationData } from '../data/mockData';
import { useTheme } from '../contexts/ThemeContext';

const Navigation = ({ activeSection, onNavigate }) => {
  const [isMobile, setIsMobile] = useState(false);
  const { currentTheme } = useTheme();
  
  // Default color fallbacks
  const navigationBg = currentTheme?.navigationBg || 'rgba(0, 0, 0, 0.3)';
  const border = currentTheme?.border || 'rgba(255, 255, 255, 0.2)';
  const textPrimary = currentTheme?.textPrimary || '#ffffff';

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Animation variants for better organization
  const containerVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  const getBackgroundStyles = () => {
    const base = "rounded-2xl px-4 py-3 md:px-8 md:py-4 border shadow-lg";
    const mobile = isMobile ? "mx-auto" : "";
    return `${base} ${mobile}`;
  };
  
  const getButtonStyles = (isActive) => {
    const baseStyles = "relative px-2 py-1 md:px-4 md:py-2 rounded-xl text-xs md:text-sm font-medium transition-all duration-300 text-center min-w-[60px] md:min-w-[80px]";
    const textColor = textPrimary;
    const activeStyles = `text-white bg-white bg-opacity-30`;
    const inactiveStyles = `hover:text-white hover:bg-white hover:bg-opacity-20`;
    
    return `${baseStyles} ${isActive ? activeStyles : inactiveStyles}`;
  };

  return (
    <motion.nav
      initial={containerVariants.initial}
      animate={containerVariants.animate}
      transition={containerVariants.transition}
      className={`fixed ${isMobile ? 'bottom-4 left-1/2 transform -translate-x-1/2' : 'top-8 left-1/2 transform -translate-x-1/2'} z-50`}
    >
      <div 
        className={getBackgroundStyles()}
        style={{
          backgroundColor: navigationBg,
          backdropFilter: 'blur(16px)',
          borderColor: border,
          color: textPrimary,
        }}
      >
        <div className={`flex ${isMobile ? 'flex-wrap justify-center' : 'flex-row justify-center'} items-center ${isMobile ? 'gap-2' : 'space-x-6'}`}>
          {navigationData.map((item) => (
            <motion.button
              key={item.section}
              onClick={() => onNavigate(item.section)}
              className={getButtonStyles(activeSection === item.section)}
              whileHover={buttonVariants.hover}
              whileTap={buttonVariants.tap}
              style={{
                color: activeSection === item.section ? '#ffffff' : currentTheme.textSecondary,
              }}
            >
              {item.name}
              {activeSection === item.section && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white bg-opacity-20 rounded-xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;