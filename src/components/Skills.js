// Skills component - Technical skills grouped by category
import React from 'react';
import './Skills.css';

import { useLocalStorage } from '../utils/helpers';
import { defaultPortfolio } from '../data/defaultPortfolio';

const Skills = () => {
  const [portfolio] = useLocalStorage('portfolioData', defaultPortfolio);
  const skillCategories = (portfolio && portfolio.skills && portfolio.skills.categories) || defaultPortfolio.skills.categories;

  return (
    <section id="skills" className="skills">
      <h2 className="section-title">Skills &amp; Expertise</h2>

      <div className="skills-grid">
        {skillCategories.map((category, index) => (
          <div key={index} className="skill-category">
            <h3>{category.title}</h3>
            <div className="skill-tags">
              {category.skills.map((skill, idx) => (
                <span key={idx} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
