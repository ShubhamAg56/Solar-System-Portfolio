import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    // Return default theme instead of throwing error
    return {
      theme: 'dark',
      toggleTheme: () => {},
      currentTheme: {
        background: 'linear-gradient(to bottom, #000428, #004e92)',
        cardBackground: 'rgba(0, 0, 0, 0.8)',
        textPrimary: '#ffffff',
        textSecondary: '#cccccc',
        accent: '#4A90E2',
        border: 'rgba(255, 255, 255, 0.2)',
        starColor: '#ffffff',
        sunColor: '#FFA500',
        particleColor: '#E6E6FA',
        navigationBg: 'rgba(0, 0, 0, 0.3)',
        panelBg: 'rgba(0, 0, 0, 0.8)',
      }
    };
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('portfolio-theme');
      if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) {
        setTheme(savedTheme);
      } else {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark' : 'light');
      }
    } catch (error) {
      console.warn('Error accessing localStorage or matchMedia:', error);
      setTheme('dark'); // fallback to dark theme
    }
  }, []);

  const toggleTheme = () => {
    try {
      const newTheme = theme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
    } catch (error) {
      console.warn('Error saving theme to localStorage:', error);
      // Still update the theme even if localStorage fails
      const newTheme = theme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    }
  };

  const themes = {
    dark: {
      // Space/night theme
      background: 'linear-gradient(to bottom, #000428, #004e92)',
      cardBackground: 'rgba(0, 0, 0, 0.8)',
      textPrimary: '#ffffff',
      textSecondary: '#cccccc',
      accent: '#4A90E2',
      border: 'rgba(255, 255, 255, 0.2)',
      starColor: '#ffffff',
      sunColor: '#FFA500',
      particleColor: '#E6E6FA',
      navigationBg: 'rgba(0, 0, 0, 0.3)',
      panelBg: 'rgba(0, 0, 0, 0.8)',
    },
    light: {
      // Clean light theme with solid colors and high contrast
      background: '#f8fafc',
      cardBackground: 'rgba(255, 255, 255, 0.98)',
      textPrimary: '#1a1a1a',
      textSecondary: '#4a5568',
      accent: '#2563eb',
      border: 'rgba(0, 0, 0, 0.1)',
      starColor: '#fbbf24',
      sunColor: '#fbbf24',
      particleColor: '#1a1a1a',
      navigationBg: 'rgba(255, 255, 255, 0.98)',
      panelBg: 'rgba(255, 255, 255, 0.98)',
    }
  };

  const currentTheme = themes[theme] || themes.dark; // fallback to dark theme

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};