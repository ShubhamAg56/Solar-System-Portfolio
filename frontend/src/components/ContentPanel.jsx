import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import AboutSection from './sections/AboutSection';
import SkillsSection from './sections/SkillsSection';
import ExperienceSection from './sections/ExperienceSection';
import ProjectsSection from './sections/ProjectsSection';
import EducationSection from './sections/EducationSection';
import ContactSection from './sections/ContactSection';
import PlaygroundSection from './sections/PlaygroundSection';

const ContentPanel = ({ activeSection, onClose }) => {
  const [isMobile, setIsMobile] = useState(false);
  const { currentTheme } = useTheme();
  
  // Default color fallbacks
  const panelBg = currentTheme?.panelBg || 'rgba(0, 0, 0, 0.8)';
  const border = currentTheme?.border || 'rgba(255, 255, 255, 0.2)';
  const textPrimary = currentTheme?.textPrimary || '#ffffff';
  const textSecondary = currentTheme?.textSecondary || '#cccccc';

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const renderContent = () => {
    switch (activeSection) {
      case 'about':
        return <AboutSection />;
      case 'skills':
        return <SkillsSection />;
      case 'experience':
        return <ExperienceSection />;
      case 'projects':
        return <ProjectsSection />;
      case 'education':
        return <EducationSection />;
      case 'contact':
        return <ContactSection />;
      case 'playground':
        return <div>Playground Section (placeholder)</div>;
      default:
        return null;
    }
  };

  const panelWidth = isMobile ? 'w-full' : 'w-full md:w-1/2 lg:w-2/5 xl:w-1/3';
  const panelPosition = isMobile ? 'bottom-0' : 'right-0 top-0';
  const panelHeight = isMobile ? 'h-4/5' : 'h-full';

  return (
    <AnimatePresence>
      {activeSection && (
        <motion.div
          initial={{ 
            opacity: 0, 
            [isMobile ? 'y' : 'x']: isMobile ? '100%' : '100%'
          }}
          animate={{ 
            opacity: 1, 
            [isMobile ? 'y' : 'x']: 0
          }}
          exit={{ 
            opacity: 0, 
            [isMobile ? 'y' : 'x']: isMobile ? '100%' : '100%'
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className={`fixed ${panelPosition} ${panelHeight} ${panelWidth} z-40 ${isMobile ? 'rounded-t-2xl' : 'border-l'}`}
          style={{
            backgroundColor: panelBg,
            backdropFilter: 'blur(24px)',
            borderColor: border,
            color: textPrimary,
          }}
        >
          <div className="h-full overflow-y-auto">
            <div className="p-4 md:p-6 lg:p-8">
              <button
                onClick={onClose}
                className={`absolute ${isMobile ? 'top-4 right-4' : 'top-6 right-6'} transition-colors`}
                style={{ color: textSecondary }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Mobile drag handle */}
              {isMobile && (
                <div className="flex justify-center mb-4">
                  <div 
                    className="w-12 h-1 rounded-full"
                    style={{ backgroundColor: border }}
                  />
                </div>
              )}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {renderContent()}
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContentPanel;