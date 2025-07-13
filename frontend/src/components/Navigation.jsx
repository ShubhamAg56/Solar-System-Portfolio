import React from 'react';
import { motion } from 'framer-motion';
import { navigationData } from '../data/mockData';

const Navigation = ({ activeSection, onNavigate }) => {
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

  // Style configurations
  const containerStyles = {
    position: 'fixed',
    top: '2rem',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 9999
  };

  const backgroundStyles = "bg-black bg-opacity-30 backdrop-blur-md rounded-2xl px-6 py-4 border border-white border-opacity-30 shadow-lg";
  
  const getButtonStyles = (isActive) => {
    const baseStyles = "relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 text-center min-w-[80px]";
    const activeStyles = "text-white bg-white bg-opacity-30";
    const inactiveStyles = "text-gray-200 hover:text-white hover:bg-white hover:bg-opacity-20";
    
    return `${baseStyles} ${isActive ? activeStyles : inactiveStyles}`;
  };

  return (
    <motion.nav
      initial={containerVariants.initial}
      animate={containerVariants.animate}
      transition={containerVariants.transition}
      className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50"
      style={containerStyles}
    >
      <div className={backgroundStyles}>
        <div className="flex flex-row items-center space-x-4">
          {navigationData.map((item) => (
            <motion.button
              key={item.section}
              onClick={() => onNavigate(item.section)}
              className={getButtonStyles(activeSection === item.section)}
              whileHover={buttonVariants.hover}
              whileTap={buttonVariants.tap}
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