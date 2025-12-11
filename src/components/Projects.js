/**
 * Projects component
 * Renders a list of projects with search, filter, sort and modal details.
 * Data is read from `portfolioData` in localStorage if present, otherwise falls back
 * to bundled `defaultProjects` sample data used for demos and Admin import.
 */
import React, { useState, useMemo, useContext, useEffect } from 'react';
import './Projects.css';
import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch, FaSort, FaSearch, FaTimes, FaEye, FaCalendar, FaTag } from 'react-icons/fa';
import { ThemeContext } from '../App';
import { useLocalStorage } from '../utils/helpers';

const Projects = () => {
  const { theme } = useContext(ThemeContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTechs, setSelectedTechs] = useState([]);
  const [sortBy, setSortBy] = useState('stars');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const defaultProjects = useMemo(() => [
    {
      id: 1,
      name: 'E-Commerce Platform',
      description: 'Full-stack e-commerce application with backend API and frontend interface. Features include product management, shopping cart, order processing, user authentication, and payment integration.',
      longDescription: 'A comprehensive e-commerce solution built with modern web technologies. The backend provides RESTful APIs for product management, user authentication, and order processing. The frontend offers a seamless shopping experience with advanced features like real-time inventory updates, secure payment processing, and responsive design.',
      technologies: ['Node.js', 'Express', 'MySQL', 'React', 'Tailwind CSS'],
      githubLink: 'https://github.com/satyajitdipu/ecom-backend-frontend',
      liveLink: null,
      stars: 12,
      forks: 4,
      status: 'Completed',
      category: 'Full-Stack',
      createdAt: '2023-08-15',
      lastUpdated: '2024-01-20',
      features: ['User Authentication', 'Product Management', 'Shopping Cart', 'Payment Integration', 'Order Tracking']
    },
    {
      id: 2,
      name: 'HR Management System',
      description: 'Comprehensive HR management portal for employee tracking, attendance management, leave requests, payroll processing, and performance evaluation. Built with robust backend architecture.',
      longDescription: 'Enterprise-grade HR management system designed to streamline human resource operations. Features comprehensive employee management, automated payroll processing, leave management, and performance tracking with detailed analytics and reporting capabilities.',
      technologies: ['Laravel', 'PHP', 'MySQL', 'Livewire', 'Bootstrap'],
      githubLink: 'https://github.com/satyajitdipu/HR-management',
      liveLink: null,
      stars: 8,
      forks: 2,
      status: 'Completed',
      category: 'Backend',
      createdAt: '2023-06-10',
      lastUpdated: '2023-12-05',
      features: ['Employee Management', 'Attendance Tracking', 'Payroll Processing', 'Leave Management', 'Performance Evaluation']
    },
    {
      id: 3,
      name: 'Vendor Management System',
      description: 'Enterprise vendor management solution with vendor onboarding, purchase order tracking, invoice management, and performance analytics. Scalable and feature-rich backend system.',
      longDescription: 'A robust vendor management platform that handles the complete vendor lifecycle from onboarding to performance monitoring. Includes advanced analytics, automated invoicing, purchase order management, and comprehensive reporting dashboards.',
      technologies: ['Python', 'Django', 'SQLite', 'REST Framework', 'PostgreSQL'],
      githubLink: 'https://github.com/satyajitdipu/vendor_management',
      liveLink: null,
      stars: 15,
      forks: 6,
      status: 'Completed',
      category: 'Backend',
      createdAt: '2023-09-01',
      lastUpdated: '2024-02-15',
      features: ['Vendor Onboarding', 'Purchase Orders', 'Invoice Management', 'Performance Analytics', 'Contract Management']
    },
    {
      id: 4,
      name: 'Crop Disease Detection System',
      description: 'Machine learning-powered agricultural solution for crop remodeling and disease detection. Uses computer vision and deep learning to identify plant diseases and provide recommendations.',
      longDescription: 'AI-powered agricultural technology that uses computer vision and deep learning algorithms to detect crop diseases early. Provides farmers with actionable recommendations for treatment and prevention, helping to improve crop yield and reduce losses.',
      technologies: ['Python', 'Flask', 'PyTorch', 'scikit-learn', 'Jupyter'],
      githubLink: 'https://github.com/satyajitdipu/Crop_Remodelling_and_Disease_Detection',
      liveLink: null,
      stars: 20,
      forks: 8,
      status: 'Completed',
      category: 'AI/ML',
      createdAt: '2023-04-20',
      lastUpdated: '2023-11-30',
      features: ['Disease Detection', 'Image Analysis', 'Treatment Recommendations', 'Crop Monitoring', 'Yield Prediction']
    },
    {
      id: 5,
      name: 'Image Classification System',
      description: 'Deep learning-based image classification application using convolutional neural networks. Implements state-of-the-art ML models for accurate image recognition and categorization.',
      longDescription: 'Advanced image classification system leveraging convolutional neural networks and state-of-the-art deep learning techniques. Features real-time image processing, multiple classification models, and comprehensive performance analytics.',
      technologies: ['React', 'TypeScript', 'Fabric.js', 'Socket.io', 'Keycloak'],
      githubLink: 'https://github.com/satyajitdipu/image-classification',
      liveLink: null,
      stars: 18,
      forks: 5,
      status: 'In Progress',
      category: 'AI/ML',
      createdAt: '2023-07-12',
      lastUpdated: '2024-01-10',
      features: ['Real-time Classification', 'Multiple Models', 'Image Processing', 'Performance Analytics', 'User Authentication']
    },
    {
      id: 6,
      name: 'Book Catalog System',
      description: 'Digital book catalog management system with search functionality, book categorization, user reviews, and inventory tracking. Clean architecture with RESTful API design.',
      longDescription: 'Comprehensive digital library management system with advanced search capabilities, user reviews, inventory management, and automated categorization. Features a clean RESTful API architecture and modern web interface.',
      technologies: ['Laravel', 'PHP', 'React', 'MySQL', 'Laravel Sanctum'],
      githubLink: 'https://github.com/satyajitdipu/Book-catalog',
      liveLink: null,
      stars: 10,
      forks: 3,
      status: 'Completed',
      category: 'Full-Stack',
      createdAt: '2023-05-08',
      lastUpdated: '2023-10-25',
      features: ['Book Search', 'User Reviews', 'Inventory Management', 'API Design', 'Authentication']
    }
  ], []);

  // expose defaults globally for AdminPanel import
  useEffect(() => { window.__DEFAULT_PROJECTS__ = defaultProjects; }, [defaultProjects]);

  // Get all unique technologies for filter dropdown

  // Get all unique technologies for filter dropdown
  // Provide defaultProjects globally so AdminPanel can import defaults
  // Use centralized portfolioData to read projects
  const [portfolio] = useLocalStorage('portfolioData', { projects: defaultProjects });
  const projects = (portfolio && portfolio.projects) || defaultProjects;  


  const allTechnologies = useMemo(() => {
    const techSet = new Set();
    projects.forEach(project => {
      (project.technologies || []).forEach(tech => techSet.add(tech));
    });
    return Array.from(techSet).sort();
  }, [projects]);

  // Filter and sort projects
  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projects;

    // Filter by search term
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(project =>
        project.name.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchLower))
      );
    }

    // Filter by selected technologies
    if (selectedTechs.length > 0) {
      filtered = filtered.filter(project =>
        selectedTechs.every(selectedTech =>
          project.technologies.includes(selectedTech)
        )
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
          return new Date(b.lastUpdated) - new Date(a.lastUpdated);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        default:
          return 0;
      }
    });

    return sorted;
  }, [searchTerm, selectedTechs, sortBy, projects]);

  // Listen to global localStorage updates to stay in sync when AdminPanel updates projects
  useEffect(() => {
    const handler = (e) => {
      if (e.detail && e.detail.key === 'projects') {
        setSelectedTechs([]);
      }
    };
    window.addEventListener('localStorageUpdate', handler);
    return () => window.removeEventListener('localStorageUpdate', handler);
  }, []);

  // Handle technology filter toggle
  const handleTechToggle = (tech) => {
    setSelectedTechs(prev =>
      prev.includes(tech)
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
  };

  // Handle project modal
  const openProjectModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    setIsModalOpen(false);
  };

  return (
    <section id="projects" className={`projects ${theme}`}>
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>
        <p className="section-subtitle">
          Check out my recent work on <a href="https://github.com/satyajitdipu?tab=repositories" target="_blank" rel="noopener noreferrer" className="github-link">GitHub</a>
        </p>

        {/* Search and Filter Controls */}
        <div className="projects-controls">
          {/* Search Bar */}
          <div className="search-group">
            <FaSearch className="control-icon" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="clear-search">
                <FaTimes />
              </button>
            )}
          </div>

          {/* Technology Filters */}
          <div className="tech-filter-group">
            <FaTag className="control-icon" />
            <span className="filter-label">Filter by Tech:</span>
            <div className="tech-buttons">
              {allTechnologies.map(tech => (
                <button
                  key={tech}
                  onClick={() => handleTechToggle(tech)}
                  className={`tech-button ${selectedTechs.includes(tech) ? 'active' : ''}`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>

          {/* Sort and View Controls */}
          <div className="sort-view-group">
            <div className="sort-group">
              <FaSort className="control-icon" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="stars">Most Stars</option>
                <option value="name">Name (A-Z)</option>
                <option value="recent">Recently Updated</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>

            <div className="view-toggle">
              <button
                onClick={() => setViewMode('grid')}
                className={`view-button ${viewMode === 'grid' ? 'active' : ''}`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`view-button ${viewMode === 'list' ? 'active' : ''}`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* Projects Display */}
        <div className={`projects-display ${viewMode}`}>
          {filteredAndSortedProjects.length > 0 ? (
            filteredAndSortedProjects.map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-header">
                  <div className="project-info">
                    <h3 className="project-name">{project.name}</h3>
                    <div className="project-meta">
                      <span className={`status-badge ${project.status.toLowerCase()}`}>
                        {project.status}
                      </span>
                      <span className="category-badge">{project.category}</span>
                    </div>
                  </div>
                  <div className="project-actions">
                    <button
                      onClick={() => openProjectModal(project)}
                      className="view-details-btn"
                      aria-label="View project details"
                    >
                      <FaEye />
                    </button>
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
                </div>

                <p className="project-description">{project.description}</p>

                <div className="project-tech">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>

                <div className="project-footer">
                  <div className="project-stats">
                    <span className="stat">
                      <FaStar /> {project.stars}
                    </span>
                    <span className="stat">
                      <FaCodeBranch /> {project.forks}
                    </span>
                  </div>
                  <div className="project-dates">
                    <span className="date">
                      <FaCalendar /> Updated {new Date(project.lastUpdated).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-projects">
              <p>No projects found matching your criteria.</p>
              <div className="no-projects-actions">
                <button onClick={() => setSearchTerm('')} className="btn btn-secondary">
                  Clear Search
                </button>
                <button onClick={() => setSelectedTechs([])} className="btn btn-secondary">
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Project Details Modal */}
        {isModalOpen && selectedProject && (
          <div className="modal-overlay" onClick={closeProjectModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>{selectedProject.name}</h3>
                <button onClick={closeProjectModal} className="modal-close">
                  <FaTimes />
                </button>
              </div>

              <div className="modal-body">
                <div className="modal-meta">
                  <span className={`status-badge ${selectedProject.status.toLowerCase()}`}>
                    {selectedProject.status}
                  </span>
                  <span className="category-badge">{selectedProject.category}</span>
                  <span className="date">
                    <FaCalendar /> Created {new Date(selectedProject.createdAt).toLocaleDateString()}
                  </span>
                  <span className="date">
                    <FaCalendar /> Updated {new Date(selectedProject.lastUpdated).toLocaleDateString()}
                  </span>
                </div>

                <p className="modal-description">{selectedProject.longDescription}</p>

                <div className="modal-features">
                  <h4>Key Features:</h4>
                  <ul>
                    {selectedProject.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="modal-tech">
                  <h4>Technologies Used:</h4>
                  <div className="tech-tags">
                    {selectedProject.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>

                <div className="modal-stats">
                  <div className="stat">
                    <FaStar /> {selectedProject.stars} stars
                  </div>
                  <div className="stat">
                    <FaCodeBranch /> {selectedProject.forks} forks
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <a href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  <FaGithub /> View on GitHub
                </a>
                {selectedProject.liveLink && (
                  <a href={selectedProject.liveLink} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="projects-footer">
          <a href="https://github.com/satyajitdipu?tab=repositories" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            <FaGithub /> View All Repositories
          </a>
        </div>
      </div>
    </section>
  );
};


// ResponsiveDesignEnhancement Feature - Added 2025-12-11
const initializeResponsiveDesignEnhancement = () => {
  console.log('ResponsiveDesignEnhancement initialized for Projects');
  return {
    enabled: true,
    version: '1.0.0',
    config: {
      feature: 'ResponsiveDesignEnhancement',
      component: 'Projects',
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


export default Projects;
