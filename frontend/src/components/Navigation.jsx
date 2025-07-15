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

  // Icon mapping for each section
  const sectionIcons = {
    resume: "📄",
    about: "👨‍💻", 
    skills: "⚡",
    experience: "🌍",
    projects: "🚀",
    education: "🎓",
    contact: "📧",
    playground: "🎮"
  };

  // Cool color themes for each section (solid colors instead of gradients)
  const sectionColors = {
    resume: "#f59e0b", // amber-500
    about: "#6b7280", // gray-500
    skills: "#a855f7", // purple-500
    experience: "#06b6d4", // cyan-500
    projects: "#ef4444", // red-500
    education: "#6366f1", // indigo-500
    contact: "#10b981", // emerald-500
    playground: "#0ea5e9" // sky-500
  };

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

  // Enhanced animation variants
  const sidebarVariants = {
    open: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    },
    closed: {
      x: -350,
      opacity: 0,
      scale: 0.95,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.03,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    open: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 25
      }
    },
    closed: {
      y: 20,
      opacity: 0,
      scale: 0.8,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 25
      }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05, 
      x: 8,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.95 }
  };

  const iconVariants = {
    hover: {
      scale: 1.3,
      rotate: [0, -10, 10, -10, 0],
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 1.1,
      rotate: 360,
      transition: {
        duration: 0.3
      }
    }
  };

  const toggleButtonVariants = {
    hover: { 
      scale: 1.1, 
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      boxShadow: "0 0 20px rgba(255, 255, 255, 0.5)"
    },
    tap: { scale: 0.9 }
  };

  const getButtonStyles = (isActive) => {
    const baseStyles = "relative px-4 py-4 rounded-xl text-sm font-medium transition-all duration-300 text-left w-full overflow-hidden group";
    const activeStyles = `text-white shadow-lg`;
    const inactiveStyles = `hover:text-white hover:bg-white hover:bg-opacity-20 hover:shadow-lg`;
    
    return `${baseStyles} ${isActive ? activeStyles : inactiveStyles}`;
  };

  const getMobileButtonStyles = (isActive) => {
    const baseStyles = "relative px-2 py-1 md:px-4 md:py-2 rounded-xl text-xs md:text-sm font-medium transition-all duration-300 text-center min-w-[60px] md:min-w-[80px]";
    const activeStyles = `text-white shadow-lg`;
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
            className="fixed left-4 top-4 z-50 p-3 rounded-xl border shadow-lg backdrop-blur-md overflow-hidden group"
            style={{
              backgroundColor: navigationBg,
              borderColor: border,
              color: textPrimary,
            }}
            variants={toggleButtonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            {/* Animated background */}
            <motion.div
              className="absolute inset-0 bg-cyan-500 opacity-0 group-hover:opacity-20"
              animate={{
                backgroundColor: [
                  "#06b6d4",
                  "#3b82f6",
                  "#8b5cf6"
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.div
              animate={isOpen ? "open" : "closed"}
              variants={{
                open: { rotate: 180 },
                closed: { rotate: 0 }
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="relative z-10"
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

          {/* Backdrop with animated colors */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={toggleSidebar}
                className="fixed inset-0 z-40 overflow-hidden"
                style={{ 
                  backdropFilter: 'blur(4px)',
                  background: 'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.15), transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.15), transparent 50%), radial-gradient(circle at 40% 80%, rgba(120, 200, 255, 0.15), transparent 50%)'
                }}
              >
                {/* Animated particles */}
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    backgroundColor: [
                      "rgba(120, 119, 198, 0.05)",
                      "rgba(255, 119, 198, 0.05)",
                      "rgba(120, 200, 255, 0.05)"
                    ]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
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
                className="fixed left-4 top-20 z-50 rounded-2xl px-6 py-8 border-2 shadow-2xl w-[280px] flex flex-col overflow-hidden"
                style={{
                  backgroundColor: navigationBg,
                  backdropFilter: 'blur(20px)',
                  borderColor: border,
                  color: textPrimary,
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
              >
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 opacity-10"
                  animate={{
                    background: [
                      "#06b6d4",
                      "#3b82f6", 
                      "#8b5cf6"
                    ]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Header */}
                <motion.div
                  variants={itemVariants}
                  className="mb-8 pb-6 border-b border-white border-opacity-30 relative z-10"
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="flex items-center space-x-3 mb-2"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="text-2xl"
                    >
                      🌌
                    </motion.div>
                    <h3 className="text-xl font-bold text-white">Navigation</h3>
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="text-sm text-gray-300"
                  >
                    Explore the digital cosmos
                  </motion.p>
                </motion.div>

                {/* Navigation Items */}
                <div className="flex flex-col space-y-3 relative z-10">
                  {navigationData.map((item, index) => (
                    <motion.button
                      key={item.section}
                      onClick={() => handleNavigate(item.section)}
                      className={getButtonStyles(activeSection === item.section)}
                      variants={itemVariants}
                      whileHover="hover"
                      whileTap="tap"
                      custom={index}
                      style={{
                        color: activeSection === item.section ? '#ffffff' : currentTheme.textSecondary,
                      }}
                    >
                      {/* Glow effect for active item */}
                      {activeSection === item.section && (
                        <motion.div
                          layoutId="activeGlow"
                          className={`absolute inset-0 opacity-20 rounded-xl blur-sm`}
                          style={{ backgroundColor: sectionColors[item.section] }}
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      
                      {/* Background highlight */}
                      {activeSection === item.section && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-white bg-opacity-10 rounded-xl border border-white border-opacity-20"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      
                      <div className="flex items-center space-x-4 relative z-10">
                        <motion.span
                          variants={iconVariants}
                          className="text-xl"
                        >
                          {sectionIcons[item.section]}
                        </motion.span>
                        <span className="font-medium">{item.name}</span>
                      </div>
                      
                      {/* Hover line effect */}
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.button>
                  ))}
                </div>

                {/* Footer */}
                <motion.div
                  variants={itemVariants}
                  className="mt-8 pt-6 border-t border-white border-opacity-30 relative z-10"
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center justify-center space-x-2 text-xs text-gray-400"
                  >
                    <motion.span
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ✨
                    </motion.span>
                    <span>Click anywhere to close</span>
                    <motion.span
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    >
                      ✨
                    </motion.span>
                  </motion.div>
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