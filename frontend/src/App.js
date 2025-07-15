import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import Scene3D from './components/Scene3D';
import Navigation from './components/Navigation';
import ContentPanel from './components/ContentPanel';
import LoadingScreen from './components/LoadingScreen';
import ThemeToggle from './components/ThemeToggle';
import { planetData } from './data/mockData';
import './App.css';

const AppContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const { currentTheme } = useTheme();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const handlePlanetClick = (section) => {
    setActiveSection(section);
  };
  
  const handleNavigate = (section) => {
    setActiveSection(section);
  };
  
  const handleClosePanel = () => {
    setActiveSection(null);
  };
  
  const handleLoadComplete = () => {
    setIsLoading(false);
  };
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      const sections = ['resume', 'about', 'skills', 'experience', 'projects', 'education', 'contact', 'playground'];
      const currentIndex = sections.indexOf(activeSection);
      
      if (e.key === 'ArrowRight' && currentIndex < sections.length - 1) {
        handleNavigate(sections[currentIndex + 1]);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        handleNavigate(sections[currentIndex - 1]);
      } else if (e.key === 'Escape') {
        handleClosePanel();
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [activeSection]);

  // Touch gesture handling for mobile
  useEffect(() => {
    if (!isMobile) return;

    let startX = 0;
    let startY = 0;

    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const diffX = startX - endX;
      const diffY = startY - endY;

      // Swipe gestures
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (diffX > 0) {
          // Swipe left - next section
          const sections = ['about', 'skills', 'experience', 'projects', 'education', 'contact'];
          const currentIndex = sections.indexOf(activeSection);
          if (currentIndex < sections.length - 1) {
            handleNavigate(sections[currentIndex + 1]);
          }
        } else {
          // Swipe right - previous section
          const sections = ['about', 'skills', 'experience', 'projects', 'education', 'contact'];
          const currentIndex = sections.indexOf(activeSection);
          if (currentIndex > 0) {
            handleNavigate(sections[currentIndex - 1]);
          }
        }
      } else if (diffY > 50) {
        // Swipe up - close panel
        handleClosePanel();
      }
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [activeSection, isMobile]);
  
  return (
    <div className="App relative w-full h-screen overflow-hidden">
      <AnimatePresence>
        {isLoading && <LoadingScreen onLoadComplete={handleLoadComplete} />}
      </AnimatePresence>
      
      {!isLoading && (
        <>
          {/* 3D Scene */}
          <div className="absolute inset-0">
            <Scene3D
              activeSection={activeSection}
              onPlanetClick={handlePlanetClick}
            />
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />
          
          {/* Navigation */}
          <Navigation
            activeSection={activeSection}
            onNavigate={handleNavigate}
          />
          
          {/* Content Panel */}
          <ContentPanel
            activeSection={activeSection}
            onClose={handleClosePanel}
          />
          
          {/* Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className={`fixed ${isMobile ? 'bottom-20 left-4 right-4' : 'bottom-8 left-8'} z-30`}
          >
            <div 
              className="rounded-lg p-6 text-base backdrop-blur-md"
              style={{
                backgroundColor: currentTheme.cardBackground,
                color: currentTheme.textPrimary,
                border: `1px solid ${currentTheme.border}`,
              }}
            >
              <p className="mb-3 text-lg">🌌 <strong>Solar System Portfolio</strong></p>
              <p className="mb-2">• {isMobile ? 'Tap' : 'Click'} planets to explore sections</p>
              <p className="mb-2">• Use {isMobile ? 'touch' : 'mouse'} to orbit and zoom</p>
              {isMobile && <p className="mb-2">• Swipe left/right to navigate sections</p>}
              <p>• Press ESC to return to overview</p>
            </div>
          </motion.div>
          

        </>
      )}
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;