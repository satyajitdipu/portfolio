// Projects component - Featured projects grid
import React from 'react';
import './Projects.css';
import { FaGithub } from 'react-icons/fa';
import Reveal from './Reveal';
import { useLocalStorage } from '../utils/helpers';
import { defaultPortfolio } from '../data/defaultPortfolio';

const Projects = () => {
  const [portfolio] = useLocalStorage('portfolioData', defaultPortfolio);
  const projects = (portfolio && portfolio.projects) || defaultPortfolio.projects;

  return (
    <section id="projects" className="projects">
      <div className="container">
        <Reveal className="section-header">
          <span className="eyebrow">Things I've built</span>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            Check out more of my work on{' '}
            <a href="https://github.com/satyajitdipu?tab=repositories" target="_blank" rel="noopener noreferrer" className="github-link">GitHub</a>
          </p>
        </Reveal>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={(index % 3) * 100} as="article" className="project-card surface-card">
              <div className="project-header">
                <div className="project-info">
                  <h3 className="project-name">{project.name}</h3>
                  <span className="category-badge">{project.category}</span>
                </div>
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.name} on GitHub`} className="project-link">
                  <FaGithub />
                </a>
              </div>

              <p className="project-description">{project.description}</p>

              <div className="project-tech">
                {project.technologies.map((tech, idx) => (
                  <span key={idx} className="tech-tag">{tech}</span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        <div className="projects-footer">
          <a href="https://github.com/satyajitdipu?tab=repositories" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            <FaGithub /> View All Repositories
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
