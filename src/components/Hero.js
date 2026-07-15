// Hero component - Main landing section with introduction and social links
import React from 'react';
import './Hero.css';
import { FaGithub, FaLinkedin, FaPhone, FaEnvelope, FaDownload } from 'react-icons/fa';

const Hero = () => {
  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            Hi, I'm <span className="gradient-text">Satyajit Sahoo</span>
          </h1>
          <h2 className="hero-subtitle">Software Engineer — Full-Stack &amp; Backend, AI/ML Integration</h2>
          <p className="hero-description">
            I build scalable SaaS platforms, RESTful microservices, and AI-powered features in production —
            working across Python (Flask, FastAPI), PHP (Laravel), React.js, and AWS to turn complex
            requirements into clean, reliable systems.
          </p>

          <div className="hero-buttons">
            <a href="#contact" className="btn btn-primary">Get In Touch</a>
            <a href="#projects" className="btn btn-secondary">View Work</a>
            <a
              href={`${process.env.PUBLIC_URL}/Satyajit_Sahoo_Resume.pdf`}
              download="Satyajit_Sahoo_Resume.pdf"
              className="btn btn-outline"
            >
              <FaDownload /> Resume
            </a>
          </div>

          <div className="social-links">
            <a href="https://github.com/satyajitdipu" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/satyajit-sahoo-2457601a6/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="tel:+916372754900" aria-label="Phone">
              <FaPhone />
            </a>
            <a href="mailto:satyajits101@gmail.com" aria-label="Email">
              <FaEnvelope />
            </a>
          </div>
        </div>

        <div className="hero-image">
          <div className="image-container">
            <img
              src={`${process.env.PUBLIC_URL}/profile.jpg`}
              alt="Portrait of Satyajit Sahoo, Software Engineer"
              className="profile-image"
              width="446"
              height="800"
              fetchpriority="high"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
