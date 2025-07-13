import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { portfolioData } from '../../data/mockData';

const SkillsSection = () => {
  const { skills } = portfolioData;
  const { currentTheme } = useTheme();
  
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});
  
  const getSkillColor = (level) => {
    if (level >= 90) return 'from-emerald-400 to-emerald-600';
    if (level >= 80) return 'from-blue-400 to-blue-600';
    if (level >= 70) return 'from-amber-400 to-amber-600';
    return 'from-orange-400 to-orange-600';
  };
  
  const getSkillBgColor = (level) => {
    if (level >= 90) return 'bg-emerald-50 border-emerald-200';
    if (level >= 80) return 'bg-blue-50 border-blue-200';
    if (level >= 70) return 'bg-amber-50 border-amber-200';
    return 'bg-orange-50 border-orange-200';
  };
  
  return (
    <div style={{ color: currentTheme.textPrimary }}>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
      >
        Technical Expertise
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
            className="rounded-xl p-6 backdrop-blur-md border shadow-lg hover:shadow-xl transition-all duration-300"
            style={{
              backgroundColor: currentTheme.cardBackground,
              borderColor: currentTheme.border,
            }}
          >
            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              {category}
            </h3>
            <div className="grid gap-6">
              {categorySkills.map((skill, skillIndex) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                  className="space-y-3"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getSkillColor(skill.level)}`}></div>
                      <span className="font-semibold text-lg" style={{ color: currentTheme.textPrimary }}>
                        {skill.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium px-3 py-1 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700">
                        {skill.level}%
                      </span>
                      {skill.level >= 90 && <span className="text-emerald-500">⭐</span>}
                      {skill.level >= 85 && skill.level < 90 && <span className="text-blue-500">🔹</span>}
                    </div>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.5, delay: (categoryIndex * 0.1) + (skillIndex * 0.05), ease: "easeOut" }}
                        className={`h-3 rounded-full bg-gradient-to-r ${getSkillColor(skill.level)} shadow-lg`}
                      />
                    </div>
                    <div 
                      className="absolute top-0 left-0 h-3 rounded-full bg-white opacity-30"
                      style={{ width: `${Math.min(skill.level, 100)}%` }}
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
          className="grid md:grid-cols-3 gap-6"
        >
          <div 
            className="rounded-xl p-6 text-center backdrop-blur-md border shadow-lg hover:shadow-xl transition-all duration-300"
            style={{
              backgroundColor: currentTheme.cardBackground,
              borderColor: currentTheme.border,
            }}
          >
            <div className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent mb-2">
              {skills.filter(s => s.level >= 90).length}
            </div>
            <div className="text-sm font-medium" style={{ color: currentTheme.textSecondary }}>
              Expert Level Skills
            </div>
            <div className="mt-2">
              <span className="text-emerald-500 text-2xl">⭐</span>
            </div>
          </div>
          
          <div 
            className="rounded-xl p-6 text-center backdrop-blur-md border shadow-lg hover:shadow-xl transition-all duration-300"
            style={{
              backgroundColor: currentTheme.cardBackground,
              borderColor: currentTheme.border,
            }}
          >
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-2">
              {skills.filter(s => s.level >= 80).length}
            </div>
            <div className="text-sm font-medium" style={{ color: currentTheme.textSecondary }}>
              Advanced Level Skills
            </div>
            <div className="mt-2">
              <span className="text-blue-500 text-2xl">🔹</span>
            </div>
          </div>
          
          <div 
            className="rounded-xl p-6 text-center backdrop-blur-md border shadow-lg hover:shadow-xl transition-all duration-300"
            style={{
              backgroundColor: currentTheme.cardBackground,
              borderColor: currentTheme.border,
            }}
          >
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              {Object.keys(skillsByCategory).length}
            </div>
            <div className="text-sm font-medium" style={{ color: currentTheme.textSecondary }}>
              Technology Categories
            </div>
            <div className="mt-2">
              <span className="text-purple-500 text-2xl">💎</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SkillsSection;