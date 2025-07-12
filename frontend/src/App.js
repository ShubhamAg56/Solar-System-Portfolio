import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Scene3D from './components/Scene3D';
import Navigation from './components/Navigation';
import ContentPanel from './components/ContentPanel';
import LoadingScreen from './components/LoadingScreen';
import { planetData } from './data/mockData';
import './App.css';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(null);
  const [cameraPosition, setCameraPosition] = useState([0, 10, 40]);
  
  const handlePlanetClick = (section) => {
    setActiveSection(section);
    
    // Animate camera to planet
    const planet = Object.values(planetData).find(p => p.section === section);
    if (planet) {
      const [x, y, z] = planet.position;
      setCameraPosition([x + 10, y + 5, z + 10]);
    }
  };
  
  const handleNavigate = (section) => {
    setActiveSection(section);
    
    // Animate camera to planet
    const planet = Object.values(planetData).find(p => p.section === section);
    if (planet) {
      const [x, y, z] = planet.position;
      setCameraPosition([x + 10, y + 5, z + 10]);
    }
  };
  
  const handleClosePanel = () => {
    setActiveSection(null);
    setCameraPosition([0, 10, 40]);
  };
  
  const handleLoadComplete = () => {
    setIsLoading(false);
  };
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      const sections = ['about', 'skills', 'experience', 'projects', 'education', 'contact'];
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
              cameraPosition={cameraPosition}
            />
          </div>
          
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
            className="fixed bottom-8 left-8 z-30"
          >
            <div className="bg-black bg-opacity-20 backdrop-blur-md rounded-lg p-4 text-white text-sm">
              <p className="mb-2">🌌 <strong>Solar System Portfolio</strong></p>
              <p>• Click planets to explore sections</p>
              <p>• Use mouse to orbit and zoom</p>
              <p>• Press ESC to return to overview</p>
            </div>
          </motion.div>
          
          {/* Performance Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="fixed top-8 right-8 z-30"
          >
            <div className="bg-black bg-opacity-20 backdrop-blur-md rounded-lg p-3 text-white text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>System Active</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default App;