import React from 'react';
import './Education.css';
import { FaGraduationCap, FaCalendar, FaUniversity, FaAward, FaExternalLinkAlt } from 'react-icons/fa';
import Reveal from './Reveal';

import { useLocalStorage } from '../utils/helpers';
import { defaultPortfolio } from '../data/defaultPortfolio';

const Education = () => {
  const [portfolio] = useLocalStorage('portfolioData', defaultPortfolio);
  const education = (portfolio && portfolio.education) || defaultPortfolio.education;
  const certifications = (portfolio && portfolio.certifications) || defaultPortfolio.certifications;

  return (
    <section id="education" className="education">
      <div className="container">
        <Reveal className="section-header">
          <span className="eyebrow">Learning journey</span>
          <h2 className="section-title">Education &amp; Certifications</h2>
        </Reveal>

        <div className="education-container">
          <div className="education-list">
            {education.map((edu, index) => (
              <Reveal key={index} className="education-card surface-card">
                <div className="education-icon">
                  <FaGraduationCap />
                </div>
                <div className="education-content">
                  <h3>{edu.degree}</h3>
                  <div className="education-meta">
                    <span className="meta-item">
                      <FaUniversity /> {edu.institution}
                    </span>
                    <span className="meta-item">
                      <FaCalendar /> {edu.duration}
                    </span>
                  </div>
                  {edu.grade && <p className="education-grade">{edu.grade}</p>}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={150} className="certifications surface-card">
            <h3>Certifications</h3>
            <div className="certifications-list">
              {certifications.map((cert, index) => (
                <div key={index} className="certification-item">
                  <span className="cert-icon"><FaAward /></span>
                  <div className="cert-details">
                    <span className="cert-name">{cert.name}</span>
                    <span className="cert-issuer">{cert.issuer}</span>
                  </div>
                  {cert.link && (
                    <a href={cert.link} target="_blank" rel="noopener noreferrer" aria-label={`View credential for ${cert.name}`} className="cert-link">
                      <FaExternalLinkAlt />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Education;
