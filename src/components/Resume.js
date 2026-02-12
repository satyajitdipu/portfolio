// Resume component - Interactive resume with download functionality
import React, { useState } from 'react';
import './Resume.css';
import { FaDownload, FaPrint, FaEye, FaUser, FaBriefcase, FaGraduationCap, FaCertificate, FaProjectDiagram } from 'react-icons/fa';
import { useLocalStorage } from '../utils/helpers';
import { defaultPortfolio } from '../data/defaultPortfolio';

const Resume = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [portfolio] = useLocalStorage('portfolioData', defaultPortfolio);

  const personalInfo = {
    name: 'Satyajit Sahoo',
    title: 'Backend Developer',
    email: 'satyajits1001@gmail.com',
    phone: '+91-7008666331',
    location: 'Bhubaneswar, Odisha, India',
    linkedin: 'https://www.linkedin.com/in/satyajit-sahoo-2457601a6/',
    github: 'https://github.com/satyajitdipu',
    website: null,
    summary: 'Passionate Backend Developer with experience in building robust, scalable, and efficient web applications using technologies like Python, PHP, Laravel, JavaScript, and React.'
  };

  const experience = (portfolio && portfolio.experiences) || defaultPortfolio.experiences;

  const education = (portfolio && portfolio.education) || defaultPortfolio.education;

  const certifications = (portfolio && portfolio.certifications) || defaultPortfolio.certifications;

  const projects = (portfolio && portfolio.projects) || defaultPortfolio.projects;

  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    const link = document.createElement('a');
    link.href = '/resume.pdf'; // Placeholder
    link.download = 'Satyajit_Dipu_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="resume" className="resume">
      <div className="container">
        <div className="resume-header">
          <h2 className="section-title">Resume</h2>
          <p className="section-subtitle">
            Professional summary of my experience, skills, and achievements
          </p>
          <div className="resume-actions">
            <button onClick={handleDownload} className="btn btn-primary">
              <FaDownload /> Download PDF
            </button>
            <button onClick={handlePrint} className="btn btn-secondary">
              <FaPrint /> Print
            </button>
          </div>
        </div>

        <div className="resume-content">
          <div className="resume-sidebar">
            <div className="sidebar-section">
              <h3><FaUser /> Personal Info</h3>
              <div className="personal-details">
                <p><strong>{personalInfo.name}</strong></p>
                <p>{personalInfo.title}</p>
                <p>{personalInfo.email}</p>
                <p>{personalInfo.phone}</p>
                <p>{personalInfo.location}</p>
                <div className="social-links">
                  <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                  <a href={personalInfo.website} target="_blank" rel="noopener noreferrer">Website</a>
                </div>
              </div>
            </div>
          </div>

          <div className="resume-main">
            <div className="section-tabs">
              <button
                className={activeSection === 'overview' ? 'active' : ''}
                onClick={() => setActiveSection('overview')}
              >
                Overview
              </button>
              <button
                className={activeSection === 'experience' ? 'active' : ''}
                onClick={() => setActiveSection('experience')}
              >
                Experience
              </button>
              <button
                className={activeSection === 'education' ? 'active' : ''}
                onClick={() => setActiveSection('education')}
              >
                Education
              </button>
              <button
                className={activeSection === 'projects' ? 'active' : ''}
                onClick={() => setActiveSection('projects')}
              >
                Projects
              </button>
              <button
                className={activeSection === 'certifications' ? 'active' : ''}
                onClick={() => setActiveSection('certifications')}
              >
                Certifications
              </button>
            </div>

            <div className="section-content">
              {activeSection === 'overview' && (
                <div className="overview-section">
                  <h3>Professional Summary</h3>
                  <p>{personalInfo.summary}</p>
                </div>
              )}

              {activeSection === 'experience' && (
                <div className="experience-section">
                  <h3><FaBriefcase /> Work Experience</h3>
                  {experience.map((job, index) => (
                    <div key={index} className="experience-item">
                      <div className="job-header">
                        <h4>{job.role || job.position}</h4>
                        <span className="company">{job.company}</span>
                        <span className="duration">{job.duration}</span>
                      </div>
                      <p className="location">{job.location}</p>
                      <ul className="job-description">
                        {job.description.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                      {job.technologies && (
                        <div className="job-technologies">
                          {job.technologies.map((tech, index) => (
                            <span key={index} className="tech-tag">{tech}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {activeSection === 'education' && (
                <div className="education-section">
                  <h3><FaGraduationCap /> Education</h3>
                  {education.map((edu, index) => (
                    <div key={index} className="education-item">
                      <div className="edu-header">
                        <h4>{edu.degree}</h4>
                        <span className="institution">{edu.institution}</span>
                        {edu.field && <span className="field">{edu.field}</span>}
                        {edu.grade && <span className="grade">{edu.grade}</span>}
                      </div>
                      <p className="duration">{edu.duration}</p>
                      {typeof edu.description === 'string' ? (
                        <p className="edu-description">{edu.description}</p>
                      ) : (
                        <ul className="edu-description">
                          {edu.description.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {activeSection === 'projects' && (
                <div className="projects-section">
                  <h3><FaProjectDiagram /> Key Projects</h3>
                  {projects.slice(0, 5).map((project, index) => (
                    <div key={index} className="project-item">
                      <div className="project-header">
                        <h4>{project.name}</h4>
                        {project.githubLink && (
                          <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="project-link">
                            <FaEye /> View Project
                          </a>
                        )}
                      </div>
                      <p className="project-description">{project.description}</p>
                      <div className="project-technologies">
                        {project.technologies.map((tech, index) => (
                          <span key={index} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeSection === 'certifications' && (
                <div className="certifications-section">
                  <h3><FaCertificate /> Certifications</h3>
                  {certifications.map((cert, index) => (
                    <div key={index} className="certification-item">
                      {typeof cert === 'string' ? (
                        <div className="cert-header">
                          <h4>{cert}</h4>
                        </div>
                      ) : (
                        <>
                          <div className="cert-header">
                            <h4>{cert.name}</h4>
                            <span className="issuer">{cert.issuer}</span>
                          </div>
                          <p className="cert-date">Issued: {cert.date}</p>
                          <p className="credential-id">Credential ID: {cert.credentialId}</p>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
