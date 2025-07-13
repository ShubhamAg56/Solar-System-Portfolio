import React from 'react';
import { motion } from 'framer-motion';
import { navigationData } from '../data/mockData';

const Navigation = ({ activeSection, onNavigate }) => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50"
      style={{ zIndex: 9999 }}
    >
      <div className="bg-black bg-opacity-30 backdrop-blur-md rounded-2xl px-6 py-4 border border-white border-opacity-30 shadow-lg">
        <div className="flex flex-row items-center space-x-4">
          {navigationData.map((item) => (
            <motion.button
              key={item.section}
              onClick={() => onNavigate(item.section)}
              className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 text-center min-w-[80px] ${
                activeSection === item.section
                  ? 'text-white bg-white bg-opacity-30'
                  : 'text-gray-200 hover:text-white hover:bg-white hover:bg-opacity-20'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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