import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Github, Linkedin, Twitter, ExternalLink } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { portfolioData } from '../../data/mockData';

const AboutSection = () => {
  const { currentTheme } = useTheme();

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-4xl font-bold mb-4" style={{ color: currentTheme?.textPrimary }}>
          About Me
        </h2>
        <p className="text-xl mb-8" style={{ color: currentTheme?.textSecondary }}>
          {portfolioData.personal.tagline}
        </p>
      </motion.div>

      {/* Personal Introduction */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-6 rounded-lg border"
        style={{ 
          backgroundColor: currentTheme?.cardBackground,
          borderColor: currentTheme?.cardBorder 
        }}
      >
        <h3 className="text-2xl font-bold mb-4" style={{ color: currentTheme?.textPrimary }}>
          {portfolioData.personal.name}
        </h3>
        <p className="text-lg mb-4" style={{ color: currentTheme?.textSecondary }}>
          {portfolioData.personal.title}
        </p>
        <p className="text-base leading-relaxed" style={{ color: currentTheme?.textSecondary }}>
          {portfolioData.personal.bio}
        </p>
      </motion.div>

      {/* Contact Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-6 rounded-lg border"
        style={{ 
          backgroundColor: currentTheme?.cardBackground,
          borderColor: currentTheme?.cardBorder 
        }}
      >
        <h3 className="text-2xl font-bold mb-6" style={{ color: currentTheme?.textPrimary }}>
          Contact Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="text-orange-500" size={20} />
              <span style={{ color: currentTheme?.textSecondary }}>
                {portfolioData.personal.email}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="text-orange-500" size={20} />
              <span style={{ color: currentTheme?.textSecondary }}>
                {portfolioData.personal.phone}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="text-orange-500" size={20} />
              <span style={{ color: currentTheme?.textSecondary }}>
                {portfolioData.personal.location}
              </span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Github className="text-orange-500" size={20} />
              <a 
                href={portfolioData.personal.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-500 hover:text-orange-400 transition-colors"
              >
                GitHub Profile
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <Linkedin className="text-orange-500" size={20} />
              <a 
                href={portfolioData.personal.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-500 hover:text-orange-400 transition-colors"
              >
                LinkedIn Profile
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <Twitter className="text-orange-500" size={20} />
              <a 
                href={portfolioData.personal.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-500 hover:text-orange-400 transition-colors"
              >
                Twitter Profile
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <ExternalLink className="text-orange-500" size={20} />
              <a 
                href={portfolioData.personal.social.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-500 hover:text-orange-400 transition-colors"
              >
                Portfolio Website
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mission Statement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-6 rounded-lg border"
        style={{ 
          backgroundColor: currentTheme?.cardBackground,
          borderColor: currentTheme?.cardBorder 
        }}
      >
        <h3 className="text-2xl font-bold mb-4" style={{ color: currentTheme?.textPrimary }}>
          My Mission
        </h3>
        <p className="text-lg leading-relaxed" style={{ color: currentTheme?.textSecondary }}>
          I believe in the power of technology to create meaningful experiences that inspire and engage users. 
          Through innovative 3D web applications and immersive digital experiences, I strive to push the boundaries 
          of what's possible in web development while maintaining accessibility and performance.
        </p>
      </motion.div>

      {/* What I Do */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="p-6 rounded-lg border"
        style={{ 
          backgroundColor: currentTheme?.cardBackground,
          borderColor: currentTheme?.cardBorder 
        }}
      >
        <h3 className="text-2xl font-bold mb-6" style={{ color: currentTheme?.textPrimary }}>
          What I Do
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-4">🎨</div>
            <h4 className="text-xl font-semibold mb-2" style={{ color: currentTheme?.textPrimary }}>
              3D Web Development
            </h4>
            <p className="text-sm" style={{ color: currentTheme?.textSecondary }}>
              Creating immersive 3D experiences using Three.js, WebGL, and modern web technologies
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl mb-4">⚡</div>
            <h4 className="text-xl font-semibold mb-2" style={{ color: currentTheme?.textPrimary }}>
              Full-Stack Solutions
            </h4>
            <p className="text-sm" style={{ color: currentTheme?.textSecondary }}>
              Building complete web applications from concept to deployment with modern frameworks
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl mb-4">🚀</div>
            <h4 className="text-xl font-semibold mb-2" style={{ color: currentTheme?.textPrimary }}>
              Performance Optimization
            </h4>
            <p className="text-sm" style={{ color: currentTheme?.textSecondary }}>
              Ensuring smooth 60fps performance and accessibility in complex interactive applications
            </p>
          </div>
        </div>
      </motion.div>

      {/* Fun Facts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="p-6 rounded-lg border"
        style={{ 
          backgroundColor: currentTheme?.cardBackground,
          borderColor: currentTheme?.cardBorder 
        }}
      >
        <h3 className="text-2xl font-bold mb-6" style={{ color: currentTheme?.textPrimary }}>
          Fun Facts
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: '🌌', fact: 'Stargazing is my favorite hobby - it inspires my cosmic-themed projects' },
            { icon: '🎮', fact: 'I built my first 3D game at age 16 using Unity and C#' },
            { icon: '☕', fact: 'I consume an average of 4 cups of coffee while coding each day' },
            { icon: '🎵', fact: 'I often code to ambient space music and electronic soundscapes' },
            { icon: '📚', fact: 'I hold a thesis on "Real-time Procedural Planet Generation"' },
            { icon: '🏆', fact: 'Winner of multiple hackathons including Cal Hacks 2015' }
          ].map((item, index) => (
            <div key={index} className="flex items-start space-x-3">
              <span className="text-2xl">{item.icon}</span>
              <span className="text-sm" style={{ color: currentTheme?.textSecondary }}>
                {item.fact}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AboutSection;