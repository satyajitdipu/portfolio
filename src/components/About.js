// About component - Professional summary and background
import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about">
      <h2 className="section-title">About Me</h2>
      <div className="about-content">
        <div className="about-text">
          <h3>Building Scalable Backend Solutions</h3>
          <p>
            I'm a passionate Backend Developer with experience in building robust, 
            scalable, and efficient web applications using technologies like Python, 
            PHP, Laravel, JavaScript, and React. I thrive in collaborative environments 
            where I can contribute to both backend logic and system integration while 
            learning and growing with the team.
          </p>
          <p>
            My work has involved designing and implementing CRM and HR management systems, 
            ensuring smooth data flow, clean architecture, and reliable performance. 
            I enjoy turning complex requirements into clean, maintainable solutions with 
            a strong understanding of API integration, database management, and backend optimization.
          </p>
          
          <div className="about-highlights">
            <div className="highlight-item">
              <h4>🎯 What Drives Me</h4>
              <p>
                I believe in writing clean, efficient code and learning continuously. 
                I'm excited by challenges that involve performance tuning, architectural 
                decisions, or building something from scratch.
              </p>
            </div>
            <div className="highlight-item">
              <h4>💼 Open To</h4>
              <ul>
                <li>Backend developer roles</li>
                <li>Remote or hybrid opportunities</li>
                <li>Projects involving scalable systems, APIs, or cloud integration</li>
                <li>Collaboration with innovative teams</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
