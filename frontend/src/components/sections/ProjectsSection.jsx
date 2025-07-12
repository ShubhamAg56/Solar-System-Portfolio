import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../../data/mockData';

const ProjectsSection = () => {
  const { projects } = portfolioData;
  const [selectedProject, setSelectedProject] = useState(null);
  
  const categories = ['All', ...new Set(projects.map(p => p.category))];
  const [activeCategory, setActiveCategory] = useState('All');
  
  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);
  
  return (
    <div className="text-white">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
      >
        Projects
      </motion.h2>
      
      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap gap-2 mb-6"
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === category
                ? 'bg-blue-500 text-white'
                : 'bg-white bg-opacity-10 text-gray-300 hover:bg-opacity-20'
            }`}
          >
            {category}
          </button>
        ))}
      </motion.div>
      
      {/* Projects Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-6"
      >
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white bg-opacity-5 rounded-lg p-6 backdrop-blur-sm cursor-pointer hover:bg-opacity-10 transition-all"
            onClick={() => setSelectedProject(project)}
          >
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center text-2xl">
                {project.featured ? '⭐' : '🚀'}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                  <span className="px-2 py-1 bg-blue-500 bg-opacity-20 text-blue-300 rounded-full text-xs">
                    {project.category}
                  </span>
                </div>
                
                <p className="text-gray-300 mb-4 line-clamp-2">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-white bg-opacity-10 rounded-full text-xs text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-4">
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 text-sm"
                  >
                    View Demo →
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-300 text-sm"
                  >
                    GitHub →
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Project Detail Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white bg-opacity-10 backdrop-blur-xl rounded-lg p-6 max-w-2xl w-full max-h-96 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold text-white">{selectedProject.title}</h3>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <p className="text-gray-300 mb-4">{selectedProject.description}</p>
            
            <div className="mb-4">
              <h4 className="font-semibold text-gray-300 mb-2">Key Features:</h4>
              <ul className="space-y-1">
                {selectedProject.highlights.map((highlight, index) => (
                  <li key={index} className="text-gray-300 text-sm flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex space-x-4">
              <a
                href={selectedProject.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                View Demo
              </a>
              <a
                href={selectedProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                GitHub
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ProjectsSection;