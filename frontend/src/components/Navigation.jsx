import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navigationData } from '../data/mockData';
import { useTheme } from '../contexts/ThemeContext';

const Navigation = ({ activeSection, onNavigate }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
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

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigate = (section) => {
    onNavigate(section);
    if (!isMobile) {
      setIsOpen(false); // Close sidebar after navigation on desktop
    }
  };

  // Animation variants
  const sidebarVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 40,
        staggerChildren: 0.07,
        delayChildren: 0.1
      }
    },
    closed: {
      x: -300,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 40,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 }
      }
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 }
      }
    }
  };

  const buttonVariants = {
    hover: { scale: 1.05, x: 5 },
    tap: { scale: 0.95 }
  };

  const toggleButtonVariants = {
    hover: { scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.2)" },
    tap: { scale: 0.9 }
  };

  const getButtonStyles = (isActive) => {
    const baseStyles = "relative px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 text-center w-full";
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
    <>
      {isMobile ? (
        // Mobile layout: bottom navigation (unchanged)
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 rounded-lg px-4 py-4 border shadow-lg h-[56px] flex items-center"
          style={{
            backgroundColor: navigationBg,
            backdropFilter: 'blur(16px)',
            borderColor: border,
            color: textPrimary,
          }}
        >
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
        </motion.nav>
      ) : (
        // Desktop layout: collapsible sidebar
        <>
          {/* Toggle Button */}
          <motion.button
            onClick={toggleSidebar}
            className="fixed left-4 top-4 z-50 p-3 rounded-xl border shadow-lg"
            style={{
              backgroundColor: navigationBg,
              backdropFilter: 'blur(16px)',
              borderColor: border,
              color: textPrimary,
            }}
            variants={toggleButtonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <motion.div
              animate={isOpen ? "open" : "closed"}
              variants={{
                open: { rotate: 90 },
                closed: { rotate: 0 }
              }}
              transition={{ duration: 0.3 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path
                  d="M3 6H21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  variants={{
                    open: { d: "M6 6L18 18" },
                    closed: { d: "M3 6H21" }
                  }}
                />
                <motion.path
                  d="M3 12H21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  variants={{
                    open: { opacity: 0 },
                    closed: { opacity: 1 }
                  }}
                />
                <motion.path
                  d="M3 18H21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  variants={{
                    open: { d: "M6 18L18 6" },
                    closed: { d: "M3 18H21" }
                  }}
                />
              </svg>
            </motion.div>
          </motion.button>

          {/* Backdrop */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={toggleSidebar}
                className="fixed inset-0 bg-black bg-opacity-20 z-40"
                style={{ backdropFilter: 'blur(2px)' }}
              />
            )}
          </AnimatePresence>

          {/* Sidebar */}
          <AnimatePresence>
            {isOpen && (
              <motion.nav
                initial="closed"
                animate="open"
                exit="closed"
                variants={sidebarVariants}
                className="fixed left-4 top-20 z-50 rounded-lg px-4 py-6 border shadow-xl w-[220px] flex flex-col"
                style={{
                  backgroundColor: navigationBg,
                  backdropFilter: 'blur(16px)',
                  borderColor: border,
                  color: textPrimary,
                }}
              >
                {/* Header */}
                <motion.div
                  variants={itemVariants}
                  className="mb-6 pb-4 border-b border-white border-opacity-20"
                >
                  <h3 className="text-lg font-semibold text-white">Navigation</h3>
                  <p className="text-sm text-gray-300 mt-1">Explore the solar system</p>
                </motion.div>

                {/* Navigation Items */}
                <div className="flex flex-col space-y-2">
                  {navigationData.map((item) => (
                    <motion.button
                      key={item.section}
                      onClick={() => handleNavigate(item.section)}
                      className={getButtonStyles(activeSection === item.section)}
                      variants={itemVariants}
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

                {/* Footer */}
                <motion.div
                  variants={itemVariants}
                  className="mt-6 pt-4 border-t border-white border-opacity-20"
                >
                  <p className="text-xs text-gray-400 text-center">
                    Click anywhere to close
                  </p>
                </motion.div>
              </motion.nav>
            )}
          </AnimatePresence>
        </>
      )}
    </>
  );
};

export default Navigation;