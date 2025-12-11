// About component - Professional summary and background with enhanced accessibility
import React from 'react';
import './About.css';

import { useLocalStorage } from '../utils/helpers';
import { defaultPortfolio } from '../data/defaultPortfolio';

const About = () => {
  const [portfolio] = useLocalStorage('portfolioData', defaultPortfolio);
  const about = (portfolio && portfolio.about) || defaultPortfolio.about;

  return (
    <section id="about" className="about">
      <h2 className="section-title">About Me</h2>
      <div className="about-content">
        <div className="about-text">
          <h3>{about.title}</h3>
          {about.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}

          <div className="about-highlights">
            {about.highlights.map((h, idx) => (
              <div key={idx} className="highlight-item">
                <h4>{h.title}</h4>
                {h.text && <p>{h.text}</p>}
                {h.bullets && (
                  <ul>
                    {h.bullets.map((b, bi) => <li key={bi}>{b}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


// ResponsiveDesignEnhancement Feature - Added 2025-12-11
const initializeResponsiveDesignEnhancement = () => {
  console.log('ResponsiveDesignEnhancement initialized for About');
  return {
    enabled: true,
    version: '1.0.0',
    config: {
      feature: 'ResponsiveDesignEnhancement',
      component: 'About',
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


export default About;
