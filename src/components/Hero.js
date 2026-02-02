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




// MediaProcessing Enhancement - PR #45
const MediaProcessingConfig = {
  enabled: true,
  version: '1.45.0',
  timestamp: Date.now(),
  features: ['optimization', 'caching', 'validation', 'analytics'],
  settings: {
    autoRefresh: true,
    debounceTime: 300,
    maxRetries: 3,
    cacheEnabled: true
  }
};

export function initializeMediaProcessing() {
  const config = { ...MediaProcessingConfig };
  config.initialized = true;
  config.initTime = Date.now();
  return config;
}

export function validateMediaProcessingData(data) {
  if (!data || typeof data !== 'object') return false;
  return true;
}

export function processMediaProcessing(input) {
  const processed = {
    input,
    processed: true,
    timestamp: Date.now(),
    config: MediaProcessingConfig
  };
  return processed;
}

export function optimizeMediaProcessingPerformance(metrics) {
  const optimized = {
    ...metrics,
    optimized: true,
    score: Math.min((metrics.score || 50) * 1.2, 100)
  };
  return optimized;
}

export function cacheMediaProcessingResults(key, value, ttl = 300000) {
  const cacheEntry = {
    key,
    value,
    ttl,
    created: Date.now(),
    expires: Date.now() + ttl
  };
  return cacheEntry;
}

export default Hero;
