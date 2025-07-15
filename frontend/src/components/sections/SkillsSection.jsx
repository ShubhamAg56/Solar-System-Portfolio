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
    if (level >= 90) return 'from-emerald-400 via-emerald-500 to-emerald-600';
    if (level >= 80) return 'from-blue-400 via-blue-500 to-blue-600';
    if (level >= 70) return 'from-amber-400 via-amber-500 to-amber-600';
    return 'from-orange-400 via-orange-500 to-orange-600';
  };

  const getSkillColorSolid = (level) => {
    if (level >= 90) return '#10b981'; // emerald-500
    if (level >= 80) return '#3b82f6'; // blue-500
    if (level >= 70) return '#f59e0b'; // amber-500
    return '#f97316'; // orange-500
  };
  
  const getSkillIcon = (skillName) => {
    const icons = {
      'JavaScript': '⚡',
      'React': '⚛️',
      'Three.js': '🎮',
      'Node.js': '🟢',
      'Python': '🐍',
      'WebGL': '🎨',
      'MongoDB': '🍃',
      'PostgreSQL': '🐘',
      'Docker': '🐳',
      'AWS': '☁️',
      'Blender': '🎬',
      'Unity': '🎯'
    };
    return icons[skillName] || '💻';
  };
  
  const getCategoryIcon = (category) => {
    const icons = {
      'Frontend': '🎨',
      'Backend': '⚙️',
      '3D Graphics': '🎮',
      'Database': '🗄️',
      'DevOps': '🚀',
      'Cloud': '☁️',
      'Game Dev': '🎯'
    };
    return icons[category] || '💻';
  };
  
  return (
    <div style={{ color: currentTheme.textPrimary }}>
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold mb-4 text-purple-400"
        >
          Technical Expertise
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg opacity-80 max-w-2xl mx-auto"
          style={{ color: currentTheme.textSecondary }}
        >
          A comprehensive overview of my technical skills and proficiency levels across different technologies and domains.
        </motion.p>
      </motion.div>

      {/* Skills Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-10"
      >
        {Object.entries(skillsByCategory).map(([category, categorySkills], categoryIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
            className="relative"
          >
            {/* Category Header */}
            <div className="flex items-center mb-8">
              <div className="flex items-center space-x-4">
                <div className="text-4xl">{getCategoryIcon(category)}</div>
                <div>
                  <h3 className="text-3xl font-bold text-indigo-400">
                    {category}
                  </h3>
                  <p className="text-sm opacity-60" style={{ color: currentTheme.textSecondary }}>
                    {categorySkills.length} skills
                  </p>
                </div>
              </div>
              <div className="flex-1 ml-6">
                <div className="h-px bg-purple-400 opacity-30"></div>
              </div>
            </div>

            {/* Skills Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categorySkills.map((skill, skillIndex) => {
                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: (categoryIndex * 0.1) + (skillIndex * 0.08) }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="group relative rounded-2xl p-6 backdrop-blur-md border shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                    style={{
                      backgroundColor: currentTheme.cardBackground,
                      borderColor: currentTheme.border,
                    }}
                  >
                    {/* Background */}
                    <div className={`absolute inset-0 opacity-10`} style={{ backgroundColor: getSkillColorSolid(skill.level) }}></div>
                    
                    {/* Card Content */}
                    <div className="relative z-10">
                      {/* Skill Header */}
                      <div className="flex items-center justify-center text-center">
                        <div className="flex flex-col items-center space-y-3">
                          <div className="text-4xl">{getSkillIcon(skill.name)}</div>
                          <h4 className="font-bold text-xl" style={{ color: currentTheme.textPrimary }}>
                            {skill.name}
                          </h4>
                        </div>
                      </div>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className={`absolute inset-0 rounded-2xl opacity-20`} style={{ backgroundColor: getSkillColorSolid(skill.level) }}></div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Statistics Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-16"
      >
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-cyan-400">
            Skills Overview
          </h3>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="rounded-2xl p-6 text-center backdrop-blur-md border shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            style={{
              backgroundColor: currentTheme.cardBackground,
              borderColor: currentTheme.border,
            }}
          >
            <div className="absolute inset-0 opacity-10" style={{ backgroundColor: '#3b82f6' }}></div>
            <div className="relative z-10">
              <div className="text-5xl font-bold text-blue-400 mb-2">
                {skills.length}
              </div>
              <div className="text-sm font-medium mb-2" style={{ color: currentTheme.textSecondary }}>
                Total Skills
              </div>
              <div className="text-2xl">💻</div>
            </div>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="rounded-2xl p-6 text-center backdrop-blur-md border shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            style={{
              backgroundColor: currentTheme.cardBackground,
              borderColor: currentTheme.border,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 opacity-10"></div>
            <div className="relative z-10">
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                {Object.keys(skillsByCategory).length}
              </div>
              <div className="text-sm font-medium mb-2" style={{ color: currentTheme.textSecondary }}>
                Categories
              </div>
              <div className="text-2xl">🎯</div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default SkillsSection;