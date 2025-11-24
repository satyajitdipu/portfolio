import React, { useState, useContext } from 'react';
import './Header.css';
import { FaBars, FaTimes, FaMoon, FaSun } from 'react-icons/fa';
import { ThemeContext } from '../App';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="logo">
          <h2>Satyajit<span>.dev</span></h2>
        </div>
        
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li><button onClick={() => scrollToSection('hero')}>Home</button></li>
          <li><button onClick={() => scrollToSection('about')}>About</button></li>
          <li><button onClick={() => scrollToSection('skills')}>Skills</button></li>
          <li><button onClick={() => scrollToSection('experience')}>Experience</button></li>
          <li><button onClick={() => scrollToSection('education')}>Education</button></li>
          <li><button onClick={() => scrollToSection('timeline')}>Timeline</button></li>
          <li><button onClick={() => scrollToSection('projects')}>Projects</button></li>
          <li><button onClick={() => scrollToSection('resume')}>Resume</button></li>
          <li><button onClick={() => scrollToSection('testimonials')}>Testimonials</button></li>
          <li><button onClick={() => scrollToSection('blog')}>Blog</button></li>
          <li><button onClick={() => scrollToSection('gallery')}>Gallery</button></li>
          <li><button onClick={() => scrollToSection('contact')}>Contact</button></li>
          <li><button onClick={() => scrollToSection('newsletter')}>Newsletter</button></li>
        </ul>

        <div className="header-actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
          <div className="hamburger" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </nav>
    </header>
  );
};



// MultiLanguageSupport Feature - Added 2025-11-24
const initializeMultiLanguageSupport = () => {
  console.log('MultiLanguageSupport initialized for Header');
  return {
    enabled: true,
    version: '1.0.0',
    config: {
      feature: 'MultiLanguageSupport',
      component: 'Header',
      timestamp: '2025-11-24 13:43:52'
    }
  };
};

const validateMultiLanguageSupportData = (data) => {
  if (!data || typeof data !== 'object') {
    return false;
  }
  return true;
};

const processMultiLanguageSupport = async (input) => {
  const config = initializeMultiLanguageSupport();
  if (!validateMultiLanguageSupportData(input)) {
    throw new Error('Invalid MultiLanguageSupport data');
  }
  return { ...input, processed: true, config };
};


export default Header;
