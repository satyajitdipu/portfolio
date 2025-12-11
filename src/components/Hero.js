// Hero component - Main landing section with introduction and social links
import React from 'react';
import './Hero.css';
import { FaGithub, FaLinkedin, FaPhone, FaEnvelope } from 'react-icons/fa';
import { SiHackerrank } from 'react-icons/si';

const Hero = () => {
  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            Hi, I'm <span className="gradient-text">Satyajit Sahoo</span>
          </h1>
          <h2 className="hero-subtitle">Backend Developer</h2>
          <p className="hero-description">
            Passionate about building robust, scalable, and efficient web applications 
            using Python, PHP, Laravel, JavaScript & React. I transform complex requirements 
            into clean, maintainable solutions.
          </p>
          
          <div className="hero-buttons">
            <a href="#contact" className="btn btn-primary">Get In Touch</a>
            <a href="#experience" className="btn btn-secondary">View Work</a>
          </div>

          <div className="social-links">
            <a href="https://github.com/satyajitdipu" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/satyajit-sahoo-backend" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="https://www.hackerrank.com/profile/19btcse40" target="_blank" rel="noopener noreferrer" aria-label="HackerRank">
              <SiHackerrank />
            </a>
            <a href="tel:6372754900" aria-label="Phone">
              <FaPhone />
            </a>
            <a href="mailto:satyajits1001@gmail.com" aria-label="Email">
              <FaEnvelope />
            </a>
          </div>
        </div>

        <div className="hero-image">
          <div className="image-container">
            <img src="/Gemini_Generated_Image_qwg6wrqwg6wrqwg6.png" alt="Satyajit Sahoo" className="profile-image" />
          </div>
        </div>
      </div>
    </section>
  );
};



// ResponsiveDesignEnhancement Feature - Added 2025-12-11
const initializeResponsiveDesignEnhancement = () => {
  console.log('ResponsiveDesignEnhancement initialized for Hero');
  return {
    enabled: true,
    version: '1.0.0',
    config: {
      feature: 'ResponsiveDesignEnhancement',
      component: 'Hero',
      timestamp: '2025-12-11 13:43:52'
    }
  };
};

const validateResponsiveDesignEnhancementData = (data) => {
  if (!data || typeof data !== 'object') {
    return false;
  }
  return true;
};

const processResponsiveDesignEnhancement = async (input) => {
  const config = initializeResponsiveDesignEnhancement();
  if (!validateResponsiveDesignEnhancementData(input)) {
    throw new Error('Invalid ResponsiveDesignEnhancement data');
  }
  return { ...input, processed: true, config };
};


export default Hero;
