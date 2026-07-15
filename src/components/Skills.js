// Skills component - Technical skills grouped by category
import React from 'react';
import './Skills.css';
import Reveal from './Reveal';

import { useLocalStorage } from '../utils/helpers';
import { defaultPortfolio } from '../data/defaultPortfolio';

const Skills = () => {
  const [portfolio] = useLocalStorage('portfolioData', defaultPortfolio);
  const skillCategories = (portfolio && portfolio.skills && portfolio.skills.categories) || defaultPortfolio.skills.categories;

  return (
    <section id="skills" className="skills">
      <div className="container">
        <Reveal className="section-header">
          <span className="eyebrow">What I work with</span>
          <h2 className="section-title">Skills &amp; Expertise</h2>
        </Reveal>

        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <Reveal key={index} delay={(index % 4) * 90} as="div" className="skill-category surface-card">
              <h3>{category.title}</h3>
              <div className="skill-tags">
                {category.skills.map((skill, idx) => (
                  <span key={idx} className="skill-tag">{skill}</span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
