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
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5 }
  };

  const buttonVariants = {
    hover: { scale: 1.05, x: 5 },
    tap: { scale: 0.95 }
  };

  const getSidebarStyles = () => {
    if (isMobile) {
      // Mobile: Keep as bottom navigation
      return "fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 rounded-lg px-4 py-4 border shadow-lg h-[56px] flex items-center";
    } else {
      // Desktop: Vertical sidebar
      return "fixed left-4 top-1/2 transform -translate-y-1/2 z-50 rounded-lg px-3 py-6 border shadow-lg w-[200px] flex flex-col items-stretch";
    }
  };
  
  const getButtonStyles = (isActive) => {
    const baseStyles = "relative px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 text-center";
    const activeStyles = `text-white bg-white bg-opacity-30`;
    const inactiveStyles = `hover:text-white hover:bg-white hover:bg-opacity-20`;
    
    return `${baseStyles} ${isActive ? activeStyles : inactiveStyles}`;
  };

  const getMobileButtonStyles = (isActive) => {
    const baseStyles = "relative px-2 py-1 md:px-4 md:py-2 rounded-xl text-xs md:text-sm font-medium transition-all duration-300 text-center min-w-[60px] md:min-w-[80px]";
    const activeStyles = `text-white bg-white bg-opacity-30`;
    const inactiveStyles = `hover:text-white hover:bg-white hover:bg-opacity-20`;
    
    return `${baseStyles} ${isActive ? activeStyles : inactiveStyles}`;
  };

  return (
    <motion.nav
      initial={containerVariants.initial}
      animate={containerVariants.animate}
      transition={containerVariants.transition}
      className={getSidebarStyles()}
      style={{
        backgroundColor: navigationBg,
        backdropFilter: 'blur(16px)',
        borderColor: border,
        color: textPrimary,
      }}
    >
      {isMobile ? (
        // Mobile layout: horizontal navigation
        <div className="flex flex-wrap justify-center items-center gap-2">
          {navigationData.map((item) => (
            <motion.button
              key={item.section}
              onClick={() => onNavigate(item.section)}
              className={getMobileButtonStyles(activeSection === item.section)}
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
      ) : (
        // Desktop layout: vertical sidebar
        <div className="flex flex-col space-y-3 w-full">
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
      )}
    </motion.nav>
  );
};

export default Navigation;