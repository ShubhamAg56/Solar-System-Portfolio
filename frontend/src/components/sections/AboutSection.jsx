import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../../data/mockData';

const AboutSection = () => {
  const { personal } = portfolioData;
  
  return (
    <div className="text-white">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"
      >
        About Me
      </motion.h2>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-6"
      >
        <div className="relative">
          <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mx-auto mb-6 flex items-center justify-center">
            <div className="text-6xl">🚀</div>
          </div>
        </div>
        
        <div>
          <h3 className="text-2xl font-semibold mb-2">{personal.name}</h3>
          <p className="text-xl text-gray-300 mb-4">{personal.title}</p>
          <p className="text-lg text-yellow-400 italic mb-6">"{personal.tagline}"</p>
        </div>
        
        <div className="bg-white bg-opacity-5 rounded-lg p-6 backdrop-blur-sm">
          <p className="text-gray-300 leading-relaxed">{personal.bio}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white bg-opacity-5 rounded-lg p-4 backdrop-blur-sm">
            <h4 className="font-semibold text-yellow-400 mb-2">Location</h4>
            <p className="text-gray-300">{personal.location}</p>
          </div>
          
          <div className="bg-white bg-opacity-5 rounded-lg p-4 backdrop-blur-sm">
            <h4 className="font-semibold text-yellow-400 mb-2">Contact</h4>
            <p className="text-gray-300 text-sm">{personal.email}</p>
            <p className="text-gray-300 text-sm">{personal.phone}</p>
          </div>
        </div>
        
        <div className="flex space-x-4 pt-4">
          {Object.entries(personal.social).map(([platform, url]) => (
            <motion.a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white bg-opacity-10 rounded-full flex items-center justify-center hover:bg-opacity-20 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="text-sm capitalize">{platform.slice(0, 2)}</span>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AboutSection;