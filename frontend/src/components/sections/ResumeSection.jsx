import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, ExternalLink, Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { portfolioData } from '../../data/mockData';

const ResumeSection = () => {
  const { currentTheme } = useTheme();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      // Track analytics
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/analytics/event`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event_type: 'resume_download',
          page: 'resume'
        })
      });

      // Download resume
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/resume/download`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Alex_Cosmos_Resume.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Resume download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-4xl font-bold mb-4" style={{ color: currentTheme?.textPrimary }}>
          Resume
        </h2>
        <p className="text-xl mb-8" style={{ color: currentTheme?.textSecondary }}>
          Download my professional resume or view details below
        </p>
        
        {/* Download Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDownload}
          disabled={isDownloading}
          className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
        >
          <Download className="inline-block mr-2" size={20} />
          {isDownloading ? 'Downloading...' : 'Download Resume'}
        </motion.button>
      </motion.div>

      {/* Personal Information */}
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

      {/* Professional Summary */}
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
        <h3 className="text-2xl font-bold mb-4" style={{ color: currentTheme?.textPrimary }}>
          Professional Summary
        </h3>
        <p className="text-lg leading-relaxed mb-6" style={{ color: currentTheme?.textSecondary }}>
          {portfolioData.resume.summary}
        </p>
        
        <h4 className="text-xl font-semibold mb-4" style={{ color: currentTheme?.textPrimary }}>
          Key Highlights
        </h4>
        <ul className="space-y-2">
          {portfolioData.resume.highlights.map((highlight, index) => (
            <li key={index} className="flex items-start space-x-2">
              <span className="text-orange-500 mt-1">•</span>
              <span style={{ color: currentTheme?.textSecondary }}>{highlight}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { label: 'Years Experience', value: '6+' },
          { label: 'Projects Completed', value: '50+' },
          { label: 'Technologies', value: '15+' },
          { label: 'Team Size Led', value: '10+' }
        ].map((stat, index) => (
          <div 
            key={index}
            className="p-4 rounded-lg border text-center"
            style={{ 
              backgroundColor: currentTheme?.cardBackground,
              borderColor: currentTheme?.cardBorder 
            }}
          >
            <div className="text-2xl font-bold text-orange-500 mb-2">
              {stat.value}
            </div>
            <div className="text-sm" style={{ color: currentTheme?.textSecondary }}>
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center p-8 rounded-lg border"
        style={{ 
          backgroundColor: currentTheme?.cardBackground,
          borderColor: currentTheme?.cardBorder 
        }}
      >
        <h3 className="text-2xl font-bold mb-4" style={{ color: currentTheme?.textPrimary }}>
          Ready to Collaborate?
        </h3>
        <p className="text-lg mb-6" style={{ color: currentTheme?.textSecondary }}>
          I'm always open to discussing new opportunities and exciting projects.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownload}
            disabled={isDownloading}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
          >
            <Download className="inline-block mr-2" size={18} />
            {isDownloading ? 'Downloading...' : 'Download Resume'}
          </motion.button>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={`mailto:${portfolioData.personal.email}`}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 inline-block"
          >
            <Mail className="inline-block mr-2" size={18} />
            Get in Touch
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
};

export default ResumeSection;