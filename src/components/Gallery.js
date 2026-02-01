// Gallery Component - Interactive image gallery with modal viewer, filtering, and search
import React, { useState, useEffect, useContext } from 'react';
import './Gallery.css';
import { ThemeContext } from '../App';

// Sample gallery data - in a real app, this would come from an API or CMS
const galleryItems = [
  {
    id: 1,
    title: 'E-commerce Platform',
    category: 'web-development',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
    description: 'Full-stack e-commerce solution with React, Node.js, and MongoDB',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    featured: true,
    year: 2024
  },
  {
    id: 2,
    title: 'Mobile Banking App',
    category: 'mobile-development',
    image: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=400&h=300&fit=crop',
    description: 'Secure mobile banking application with biometric authentication',
    technologies: ['React Native', 'Firebase', 'Biometric Auth'],
    featured: true,
    year: 2023
  },
  {
    id: 3,
    title: 'Data Visualization Dashboard',
    category: 'data-science',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    description: 'Interactive dashboard for real-time data analytics and reporting',
    technologies: ['D3.js', 'Python', 'PostgreSQL', 'WebSocket'],
    featured: false,
    year: 2023
  },
  {
    id: 4,
    title: 'AI-Powered Chatbot',
    category: 'ai-ml',
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400&h=300&fit=crop',
    description: 'Intelligent conversational AI with natural language processing',
    technologies: ['Python', 'TensorFlow', 'NLP', 'Dialogflow'],
    featured: true,
    year: 2024
  },
  {
    id: 5,
    title: 'Cloud Infrastructure Setup',
    category: 'devops',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
    description: 'Scalable cloud architecture with CI/CD pipelines and monitoring',
    technologies: ['AWS', 'Docker', 'Kubernetes', 'Jenkins'],
    featured: false,
    year: 2023
  },
  {
    id: 6,
    title: 'Blockchain Voting System',
    category: 'blockchain',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop',
    description: 'Secure and transparent voting platform using blockchain technology',
    technologies: ['Solidity', 'Ethereum', 'Web3.js', 'IPFS'],
    featured: true,
    year: 2024
  },
  {
    id: 7,
    title: 'IoT Smart Home Hub',
    category: 'iot',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    description: 'Centralized control system for smart home devices and automation',
    technologies: ['Arduino', 'Raspberry Pi', 'MQTT', 'Node-RED'],
    featured: false,
    year: 2022
  },
  {
    id: 8,
    title: 'AR Shopping Experience',
    category: 'ar-vr',
    image: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=400&h=300&fit=crop',
    description: 'Augmented reality shopping app with virtual try-on features',
    technologies: ['ARCore', 'Unity', 'C#', 'Blender'],
    featured: true,
    year: 2024
  },
  {
    id: 9,
    title: 'Cybersecurity Monitoring Tool',
    category: 'cybersecurity',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop',
    description: 'Real-time threat detection and incident response platform',
    technologies: ['Python', 'Elasticsearch', 'Kibana', 'SIEM'],
    featured: false,
    year: 2023
  },
  {
    id: 10,
    title: 'Educational VR Platform',
    category: 'ar-vr',
    image: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=300&fit=crop',
    description: 'Immersive virtual reality learning environment for STEM education',
    technologies: ['Unity', 'VR', 'C#', 'Photon'],
    featured: false,
    year: 2023
  },
  {
    id: 11,
    title: 'API Gateway Service',
    category: 'backend',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop',
    description: 'Microservices API gateway with rate limiting and authentication',
    technologies: ['Go', 'Redis', 'JWT', 'gRPC'],
    featured: false,
    year: 2022
  },
  {
    id: 12,
    title: 'Game Development Engine',
    category: 'game-development',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop',
    description: 'Custom 2D game engine with physics simulation and multiplayer support',
    technologies: ['C++', 'OpenGL', 'Box2D', 'ENet'],
    featured: true,
    year: 2024
  }
];

const categories = [
  { id: 'all', name: 'All Projects', icon: '🌟' },
  { id: 'web-development', name: 'Web Development', icon: '💻' },
  { id: 'mobile-development', name: 'Mobile Development', icon: '📱' },
  { id: 'data-science', name: 'Data Science', icon: '📊' },
  { id: 'ai-ml', name: 'AI/ML', icon: '🤖' },
  { id: 'devops', name: 'DevOps', icon: '⚙️' },
  { id: 'blockchain', name: 'Blockchain', icon: '⛓️' },
  { id: 'iot', name: 'IoT', icon: '🔌' },
  { id: 'ar-vr', name: 'AR/VR', icon: '🥽' },
  { id: 'cybersecurity', name: 'Cybersecurity', icon: '🔒' },
  { id: 'backend', name: 'Backend', icon: '🖥️' },
  { id: 'game-development', name: 'Game Development', icon: '🎮' }
];

const Gallery = () => {
  const { darkMode } = useContext(ThemeContext);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState(galleryItems);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [sortBy, setSortBy] = useState('year');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter and sort items based on current filters
  useEffect(() => {
    let filtered = galleryItems.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesFeatured = !showFeaturedOnly || item.featured;

      return matchesCategory && matchesSearch && matchesFeatured;
    });

    // Sort items
    filtered.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case 'year':
          aValue = a.year;
          bValue = b.year;
          break;
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'category':
          aValue = a.category;
          bValue = b.category;
          break;
        default:
          return 0;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredItems(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [selectedCategory, searchTerm, showFeaturedOnly, sortBy, sortOrder]);

  // Pagination logic
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openModal = (item) => {
    setSelectedItem(item);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedItem(null);
    document.body.style.overflow = 'unset';
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section className={`gallery ${darkMode ? 'dark' : ''}`} id="gallery">
      <div className="gallery-container">
        <div className="gallery-header">
          <h2 className="gallery-title">Project Gallery</h2>
          <p className="gallery-subtitle">
            Explore my portfolio of innovative projects across various technologies and domains
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="gallery-controls">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search projects, technologies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>

          <div className="filter-controls">
            <div className="sort-controls">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="year">Sort by Year</option>
                <option value="title">Sort by Title</option>
                <option value="category">Sort by Category</option>
              </select>

              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="sort-order-btn"
                title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>

            <label className="featured-toggle">
              <input
                type="checkbox"
                checked={showFeaturedOnly}
                onChange={(e) => setShowFeaturedOnly(e.target.checked)}
              />
              <span className="toggle-text">Featured Only</span>
            </label>
          </div>
        </div>

        {/* Category Filter Buttons */}
        <div className="category-filter">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
            >
              <span className="category-icon">{category.icon}</span>
              <span className="category-name">{category.name}</span>
              <span className="category-count">
                ({category.id === 'all' ? galleryItems.length :
                  galleryItems.filter(item => item.category === category.id).length})
              </span>
            </button>
          ))}
        </div>

        {/* Results Summary */}
        <div className="results-summary">
          <p>
            Showing {currentItems.length} of {filteredItems.length} projects
            {selectedCategory !== 'all' && ` in ${categories.find(c => c.id === selectedCategory)?.name}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {currentItems.map(item => (
            <div
              key={item.id}
              className={`gallery-item ${item.featured ? 'featured' : ''}`}
              onClick={() => openModal(item)}
            >
              <div className="item-image-container">
                <img
                  src={item.image}
                  alt={item.title}
                  className="item-image"
                  loading="lazy"
                />
                {item.featured && <div className="featured-badge">⭐ Featured</div>}
                <div className="item-overlay">
                  <div className="overlay-content">
                    <h3 className="overlay-title">{item.title}</h3>
                    <p className="overlay-description">{item.description}</p>
                    <div className="overlay-tech">
                      {item.technologies.slice(0, 3).map(tech => (
                        <span key={tech} className="tech-tag">{tech}</span>
                      ))}
                      {item.technologies.length > 3 && (
                        <span className="tech-more">+{item.technologies.length - 3} more</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="item-info">
                <h3 className="item-title">{item.title}</h3>
                <p className="item-year">{item.year}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="pagination-btn"
            >
              ← Previous
            </button>

            <div className="pagination-numbers">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="pagination-btn"
            >
              Next →
            </button>
          </div>
        )}

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3>No projects found</h3>
            <p>Try adjusting your search terms or filters</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setShowFeaturedOnly(false);
              }}
              className="reset-btn"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Modal */}
        {selectedItem && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <button className="modal-close" onClick={closeModal}>×</button>

              <div className="modal-image-container">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="modal-image"
                />
                {selectedItem.featured && <div className="modal-featured-badge">⭐ Featured Project</div>}
              </div>

              <div className="modal-details">
                <div className="modal-header">
                  <h2 className="modal-title">{selectedItem.title}</h2>
                  <span className="modal-year">{selectedItem.year}</span>
                </div>

                <p className="modal-description">{selectedItem.description}</p>

                <div className="modal-category">
                  <span className="category-label">Category:</span>
                  <span className="category-value">
                    {categories.find(c => c.id === selectedItem.category)?.icon} {' '}
                    {categories.find(c => c.id === selectedItem.category)?.name}
                  </span>
                </div>

                <div className="modal-technologies">
                  <h3>Technologies Used:</h3>
                  <div className="tech-list">
                    {selectedItem.technologies.map(tech => (
                      <span key={tech} className="tech-item">{tech}</span>
                    ))}
                  </div>
                </div>

                <div className="modal-actions">
                  <button className="view-project-btn">
                    View Live Demo
                  </button>
                  <button className="view-code-btn">
                    View Source Code
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;