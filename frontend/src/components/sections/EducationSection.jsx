import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../../data/mockData';

const EducationSection = () => {
  const { education, certifications } = portfolioData;
  
  return (
    <div className="text-white">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-6 bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent"
      >
        Education
      </motion.h2>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-8"
      >
        {/* Education */}
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-gray-300">Academic Background</h3>
          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white bg-opacity-5 rounded-lg p-6 backdrop-blur-sm mb-4 relative"
            >
              <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-red-400 to-orange-500 rounded-l-lg"></div>
              
              <div className="ml-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-white">{edu.degree}</h4>
                    <p className="text-red-400">{edu.institution}</p>
                    <p className="text-gray-400 text-sm">{edu.field}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-300">{edu.duration}</p>
                    <p className="text-gray-400 text-sm">{edu.location}</p>
                    <p className="text-gray-400 text-sm">GPA: {edu.gpa}</p>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-semibold text-gray-300 mb-2">Achievements:</h5>
                  <ul className="space-y-1">
                    {edu.achievements.map((achievement, achIndex) => (
                      <motion.li
                        key={achIndex}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (index * 0.1) + (achIndex * 0.05) }}
                        className="text-gray-300 text-sm flex items-start"
                      >
                        <span className="text-red-400 mr-2">•</span>
                        {achievement}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Certifications */}
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-gray-300">Certifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white bg-opacity-5 rounded-lg p-4 backdrop-blur-sm"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-red-400 to-orange-500 rounded-full flex items-center justify-center text-sm">
                    🏆
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white text-sm">{cert.name}</h4>
                    <p className="text-gray-400 text-xs">{cert.issuer}</p>
                    <p className="text-gray-400 text-xs">{cert.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white bg-opacity-5 rounded-lg p-6 backdrop-blur-sm"
        >
          <h3 className="text-xl font-semibold mb-4 text-gray-300">Education Summary</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">{education.length}</div>
              <div className="text-sm text-gray-400">Degrees</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">{certifications.length}</div>
              <div className="text-sm text-gray-400">Certifications</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {education.reduce((sum, edu) => sum + edu.achievements.length, 0)}
              </div>
              <div className="text-sm text-gray-400">Achievements</div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EducationSection;