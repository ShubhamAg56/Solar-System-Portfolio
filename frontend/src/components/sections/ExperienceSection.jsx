import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../../data/mockData';

const ExperienceSection = () => {
  const { experience } = portfolioData;
  
  return (
    <div className="text-white">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"
      >
        Work Experience
      </motion.h2>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-6"
      >
        {experience.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white bg-opacity-5 rounded-lg p-6 backdrop-blur-sm relative"
          >
            <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-yellow-400 to-orange-500 rounded-l-lg"></div>
            
            <div className="ml-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">{job.position}</h3>
                  <p className="text-lg text-yellow-400">{job.company}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-300">{job.duration}</p>
                  <p className="text-gray-400 text-sm">{job.location}</p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-4">{job.description}</p>
              
              <div className="mb-4">
                <h4 className="font-semibold text-gray-300 mb-2">Key Achievements:</h4>
                <ul className="space-y-1">
                  {job.achievements.map((achievement, achIndex) => (
                    <motion.li
                      key={achIndex}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (index * 0.1) + (achIndex * 0.05) }}
                      className="text-gray-300 text-sm flex items-start"
                    >
                      <span className="text-yellow-400 mr-2">•</span>
                      {achievement}
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {job.technologies.map((tech, techIndex) => (
                  <motion.span
                    key={techIndex}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (index * 0.1) + (techIndex * 0.02) }}
                    className="px-2 py-1 bg-white bg-opacity-10 rounded-full text-xs text-gray-300"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ExperienceSection;