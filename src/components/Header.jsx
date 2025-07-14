import React from 'react';
import { Moon, Sun, Brain } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import '../styles/Header.css';

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <Brain className="logo-icon" />
          <h1>Tech Skill Visualizer</h1>
        </div>
        <button 
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>
    </header>
  );
};

export default Header;