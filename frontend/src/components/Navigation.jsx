import React from 'react';
import { motion } from 'framer-motion';
import { navigationData } from '../data/mockData';

const Navigation = ({ activeSection, onNavigate }) => {
  return (
    <motion.nav
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed left-8 top-1/2 transform -translate-y-1/2 z-50"
    >
      <div className="bg-black bg-opacity-20 backdrop-blur-md rounded-2xl px-4 py-6 border border-white border-opacity-20">
        <div className="flex flex-col items-center space-y-4">
          {navigationData.map((item) => (
            <motion.button
              key={item.section}
              onClick={() => onNavigate(item.section)}
              className={`relative px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 w-full text-center ${
                activeSection === item.section
                  ? 'text-white bg-white bg-opacity-20'
                  : 'text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10'
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