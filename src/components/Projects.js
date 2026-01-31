// Projects component - Showcase of development projects
import React, { useState, useMemo } from 'react';
import './Projects.css';
import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch, FaFilter, FaSort } from 'react-icons/fa';

const Projects = () => {
  const projects = [
    {
      id: 1,
      name: 'E-Commerce Platform',
      description: 'Full-stack e-commerce application with backend API and frontend interface. Features include product management, shopping cart, order processing, user authentication, and payment integration.',
      technologies: ['Node.js', 'Express', 'MySQL', 'React', 'Tailwind CSS'],
      githubLink: 'https://github.com/satyajitdipu/ecom-backend-frontend',
      liveLink: null,
      stars: 12,
      forks: 4
    },
    {
      id: 2,
      name: 'HR Management System',
      description: 'Comprehensive HR management portal for employee tracking, attendance management, leave requests, payroll processing, and performance evaluation. Built with robust backend architecture.',
      technologies: ['Laravel', 'PHP', 'MySQL', 'Livewire', 'Bootstrap'],
      githubLink: 'https://github.com/satyajitdipu/HR-management',
      liveLink: null,
      stars: 8,
      forks: 2
    },
    {
      id: 3,
      name: 'Vendor Management System',
      description: 'Enterprise vendor management solution with vendor onboarding, purchase order tracking, invoice management, and performance analytics. Scalable and feature-rich backend system.',
      technologies: ['Python', 'Django', 'SQLite', 'REST Framework', 'PostgreSQL'],
      githubLink: 'https://github.com/satyajitdipu/vendor_management',
      liveLink: null,
      stars: 15,
      forks: 6
    },
    {
      id: 4,
      name: 'Crop Disease Detection System',
      description: 'Machine learning-powered agricultural solution for crop remodeling and disease detection. Uses computer vision and deep learning to identify plant diseases and provide recommendations.',
      technologies: ['Python', 'Flask', 'PyTorch', 'scikit-learn', 'Jupyter'],
      githubLink: 'https://github.com/satyajitdipu/Crop_Remodelling_and_Disease_Detection',
      liveLink: null,
      stars: 20,
      forks: 8
    },
    {
      id: 5,
      name: 'Image Classification System',
      description: 'Deep learning-based image classification application using convolutional neural networks. Implements state-of-the-art ML models for accurate image recognition and categorization.',
      technologies: ['React', 'TypeScript', 'Fabric.js', 'Socket.io', 'Keycloak'],
      githubLink: 'https://github.com/satyajitdipu/image-classification',
      liveLink: null,
      stars: 18,
      forks: 5
    },
    {
      id: 6,
      name: 'Book Catalog System',
      description: 'Digital book catalog management system with search functionality, book categorization, user reviews, and inventory tracking. Clean architecture with RESTful API design.',
      technologies: ['Laravel', 'PHP', 'React', 'MySQL', 'Laravel Sanctum'],
      githubLink: 'https://github.com/satyajitdipu/Book-catalog',
      liveLink: null,
      stars: 10,
      forks: 3
    }
  ];

  const [filterTech, setFilterTech] = useState('All');
  const [sortBy, setSortBy] = useState('stars'); // 'stars', 'name', 'recent'

  // Get all unique technologies for filter dropdown
  const allTechnologies = useMemo(() => {
    const techSet = new Set();
    projects.forEach(project => {
      project.technologies.forEach(tech => techSet.add(tech));
    });
    return ['All', ...Array.from(techSet).sort()];
  }, [projects]);

  // Filter and sort projects
  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projects;

    // Filter by technology
    if (filterTech !== 'All') {
      filtered = projects.filter(project =>
        project.technologies.includes(filterTech)
      );
    }

    // Sort projects
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'stars':
          return b.stars - a.stars;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'recent':
          return b.id - a.id; // Assuming higher ID = more recent
        default:
          return 0;
      }
    });

    return sorted;
  }, [filterTech, sortBy, projects]);

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>
        <p className="section-subtitle">
          Check out my recent work on <a href="https://github.com/satyajitdipu?tab=repositories" target="_blank" rel="noopener noreferrer" className="github-link">GitHub</a>
        </p>

        {/* Filter and Sort Controls */}
        <div className="projects-controls">
          <div className="filter-group">
            <FaFilter className="control-icon" />
            <label htmlFor="tech-filter">Filter by Technology:</label>
            <select
              id="tech-filter"
              value={filterTech}
              onChange={(e) => setFilterTech(e.target.value)}
              className="filter-select"
            >
              {allTechnologies.map(tech => (
                <option key={tech} value={tech}>{tech}</option>
              ))}
            </select>
          </div>

          <div className="sort-group">
            <FaSort className="control-icon" />
            <label htmlFor="sort-select">Sort by:</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="stars">Most Stars</option>
              <option value="name">Name (A-Z)</option>
              <option value="recent">Most Recent</option>
            </select>
          </div>
        </div>

        <div className="projects-grid">
          {filteredAndSortedProjects.length > 0 ? (
            filteredAndSortedProjects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-header">
                <h3 className="project-name">{project.name}</h3>
                <div className="project-links">
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
                    <FaGithub />
                  </a>
                  {project.liveLink && (
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer" aria-label="Live Demo">
                      <FaExternalLinkAlt />
                    </a>
                  )}
                </div>
              </div>

              <p className="project-description">{project.description}</p>

              <div className="project-tech">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>

              <div className="project-stats">
                <span className="stat">
                  <FaStar /> {project.stars}
                </span>
                <span className="stat">
                  <FaCodeBranch /> {project.forks}
                </span>
              </div>
            </div>
          ))
          ) : (
            <div className="no-projects">
              <p>No projects found matching the selected filter.</p>
              <button onClick={() => setFilterTech('All')} className="btn btn-secondary">
                Show All Projects
              </button>
            </div>
          )}
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
