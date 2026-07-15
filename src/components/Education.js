import React from 'react';
import './Education.css';
import { FaGraduationCap, FaCalendar, FaUniversity, FaAward, FaExternalLinkAlt } from 'react-icons/fa';

import { useLocalStorage } from '../utils/helpers';
import { defaultPortfolio } from '../data/defaultPortfolio';

const Education = () => {
  const [portfolio] = useLocalStorage('portfolioData', defaultPortfolio);
  const education = (portfolio && portfolio.education) || defaultPortfolio.education;
  const certifications = (portfolio && portfolio.certifications) || defaultPortfolio.certifications;

  return (
    <section id="education" className="education">
      <h2 className="section-title">Education &amp; Certifications</h2>

      <div className="education-container">
        <div className="education-list">
          {education.map((edu, index) => (
            <div key={index} className="education-card">
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
            </div>
          ))}
        </div>

        <div className="certifications">
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
        </div>
      </div>
    </section>
  );
};

export default Education;
