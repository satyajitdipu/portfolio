import React from 'react';
import './Footer.css';
import { FaHeart, FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-text">
          <p>
            Built with <FaHeart className="heart-icon" /> by Satyajit Sahoo
          </p>
          <p className="copyright">
            © {currentYear} All rights reserved.
          </p>
        </div>
        <div className="footer-links">
          <a href="https://github.com/satyajitdipu" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/satyajit-sahoo-2457601a6/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin /> LinkedIn
          </a>
        </div>
        <div className="footer-tech">
          <p>Powered by React.js</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
