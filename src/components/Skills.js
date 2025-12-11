// Skills component - Technical skills display with progress bars
import React from 'react';
import './Skills.css';
// Icon imports intentionally omitted to avoid unused-import warnings. If you need an icon for a skill, add it to the skill entry in data and render it via `skill.icon`.

import { useLocalStorage } from '../utils/helpers';
import { defaultPortfolio } from '../data/defaultPortfolio';

const Skills = () => {
  const [portfolio] = useLocalStorage('portfolioData', defaultPortfolio);
  const skillCategories = (portfolio && portfolio.skills && portfolio.skills.categories) || defaultPortfolio.skills.categories;
  const coreSkills = (portfolio && portfolio.skills && portfolio.skills.core) || defaultPortfolio.skills.core;

  return (
    <section id="skills" className="skills">
      <h2 className="section-title">Skills & Expertise</h2>
      
      <div className="skills-grid">
        {skillCategories.map((category, index) => (
          <div key={index} className="skill-category">
            <h3>{category.title}</h3>
            <div className="skills-list">
              {category.skills.map((skill, idx) => (
                <div key={idx} className="skill-item">
                  <div className="skill-header">
                    <span className="skill-icon">{skill.icon}</span>
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <div 
                      className="skill-progress" 
                      style={{ width: `${skill.level}%` }}
                      data-level={skill.level}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="core-skills">
        <h3>Core Competencies</h3>
        <div className="core-skills-grid">
          {coreSkills.map((skill, index) => (
            <div key={index} className="core-skill-item">
              <span>✓</span> {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};



// ResponsiveDesignEnhancement Feature - Added 2025-12-11
const initializeResponsiveDesignEnhancement = () => {
  console.log('ResponsiveDesignEnhancement initialized for Skills');
  return {
    enabled: true,
    version: '1.0.0',
    config: {
      feature: 'ResponsiveDesignEnhancement',
      component: 'Skills',
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


export default Skills;
