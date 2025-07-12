import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../../data/mockData';

const SkillsSection = () => {
  const { skills } = portfolioData;
  
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});
  
  const getSkillColor = (level) => {
    if (level >= 90) return 'from-green-400 to-green-600';
    if (level >= 80) return 'from-blue-400 to-blue-600';
    if (level >= 70) return 'from-yellow-400 to-yellow-600';
    return 'from-orange-400 to-orange-600';
  };
  
  return (
    <div className="text-white">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text text-transparent"
      >
        Technical Skills
      </motion.h2>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-8"
      >
        {Object.entries(skillsByCategory).map(([category, categorySkills], categoryIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
            className="bg-white bg-opacity-5 rounded-lg p-6 backdrop-blur-sm"
          >
            <h3 className="text-xl font-semibold mb-4 text-gray-300">{category}</h3>
            <div className="space-y-4">
              {categorySkills.map((skill, skillIndex) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                  className="space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 font-medium">{skill.name}</span>
                    <span className="text-sm text-gray-400">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                      className={`h-2 rounded-full bg-gradient-to-r ${getSkillColor(skill.level)}`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white bg-opacity-5 rounded-lg p-6 backdrop-blur-sm"
        >
          <h3 className="text-xl font-semibold mb-4 text-gray-300">Skill Highlights</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {skills.filter(s => s.level >= 90).length}
              </div>
              <div className="text-sm text-gray-400">Expert Level</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">
                {skills.filter(s => s.level >= 80).length}
              </div>
              <div className="text-sm text-gray-400">Advanced Level</div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SkillsSection;