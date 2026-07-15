// About component - Professional summary and background
import React from 'react';
import './About.css';
import Reveal from './Reveal';

import { useLocalStorage } from '../utils/helpers';
import { defaultPortfolio } from '../data/defaultPortfolio';

const About = () => {
  const [portfolio] = useLocalStorage('portfolioData', defaultPortfolio);
  const about = (portfolio && portfolio.about) || defaultPortfolio.about;

  return (
    <section id="about" className="about">
      <div className="container">
        <Reveal className="section-header">
          <span className="eyebrow">Get to know me</span>
          <h2 className="section-title">About Me</h2>
        </Reveal>

        <div className="about-content">
          <Reveal className="about-text">
            <h3>{about.title}</h3>
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Reveal>

          <div className="about-highlights">
            {about.highlights.map((h, idx) => (
              <Reveal key={idx} delay={idx * 120} className="highlight-item surface-card">
                <h4>{h.title}</h4>
                {h.text && <p>{h.text}</p>}
                {h.bullets && (
                  <ul>
                    {h.bullets.map((b, bi) => <li key={bi}>{b}</li>)}
                  </ul>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
