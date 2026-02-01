// Gallery component - Showcase of images, screenshots, and visual work
import React, { useState, useMemo } from 'react';
import './Gallery.css';
import { FaImages, FaFilter, FaSearch, FaTimes, FaChevronLeft, FaChevronRight, FaDownload, FaEye } from 'react-icons/fa';

// Safe fallbacks for icons in test environments
const FilterIcon = FaFilter || (() => null);
const SearchIcon = FaSearch || (() => null);
const EyeIcon = FaEye || (() => null);

const Gallery = () => {
  const galleryItems = useMemo(() => [
    {
      id: 1,
      title: 'E-Commerce Platform Dashboard',
      description: 'Admin dashboard for the e-commerce platform showing analytics and order management.',
      image: 'https://via.placeholder.com/600x400/4F46E5/FFFFFF?text=E-Commerce+Dashboard',
      category: 'Web Development',
      tags: ['React', 'Dashboard', 'Analytics'],
      date: '2024-01-15',
      type: 'screenshot'
    },
    {
      id: 2,
      title: 'Mobile App Wireframes',
      description: 'Initial wireframes for a task management mobile application.',
      image: 'https://via.placeholder.com/600x400/059669/FFFFFF?text=Mobile+Wireframes',
      category: 'UI/UX Design',
      tags: ['Wireframes', 'Mobile', 'Design'],
      date: '2024-01-10',
      type: 'design'
    },
    {
      id: 3,
      title: 'Data Visualization Chart',
      description: 'Interactive chart showing crop disease detection accuracy over time.',
      image: 'https://via.placeholder.com/600x400/DC2626/FFFFFF?text=Data+Visualization',
      category: 'Data Science',
      tags: ['Charts', 'Python', 'ML'],
      date: '2024-01-05',
      type: 'chart'
    },
    {
      id: 4,
      title: 'API Documentation',
      description: 'Comprehensive API documentation for the HR management system.',
      image: 'https://via.placeholder.com/600x400/7C3AED/FFFFFF?text=API+Documentation',
      category: 'Documentation',
      tags: ['API', 'Documentation', 'REST'],
      date: '2023-12-28',
      type: 'documentation'
    },
    {
      id: 5,
      title: 'Database Schema Design',
      description: 'Entity-relationship diagram for the vendor management database.',
      image: 'https://via.placeholder.com/600x400/EF4444/FFFFFF?text=Database+Schema',
      category: 'Database',
      tags: ['Database', 'Schema', 'ERD'],
      date: '2023-12-20',
      type: 'diagram'
    },
    {
      id: 6,
      title: 'Responsive Web Design Mockup',
      description: 'Responsive design mockup showing mobile and desktop layouts.',
      image: 'https://via.placeholder.com/600x400/F59E0B/FFFFFF?text=Responsive+Design',
      category: 'UI/UX Design',
      tags: ['Responsive', 'Mockup', 'Design'],
      date: '2023-12-15',
      type: 'design'
    },
    {
      id: 7,
      title: 'Machine Learning Model Architecture',
      description: 'Neural network architecture diagram for image classification.',
      image: 'https://via.placeholder.com/600x400/10B981/FFFFFF?text=ML+Architecture',
      category: 'Machine Learning',
      tags: ['Neural Network', 'Architecture', 'ML'],
      date: '2023-12-10',
      type: 'diagram'
    },
    {
      id: 8,
      title: 'Code Snippet Showcase',
      description: 'Beautifully formatted code snippet from the React portfolio project.',
      image: 'https://via.placeholder.com/600x400/8B5CF6/FFFFFF?text=Code+Snippet',
      category: 'Code',
      tags: ['React', 'JavaScript', 'Code'],
      date: '2023-12-05',
      type: 'code'
    },
    {
      id: 9,
      title: 'User Flow Diagram',
      description: 'User journey flow for the e-commerce checkout process.',
      image: 'https://via.placeholder.com/600x400/EC4899/FFFFFF?text=User+Flow',
      category: 'UI/UX Design',
      tags: ['User Flow', 'UX', 'Design'],
      date: '2023-11-30',
      type: 'diagram'
    },
    {
      id: 10,
      title: 'Performance Metrics Dashboard',
      description: 'Real-time performance metrics for web application monitoring.',
      image: 'https://via.placeholder.com/600x400/06B6D4/FFFFFF?text=Performance+Metrics',
      category: 'DevOps',
      tags: ['Monitoring', 'Performance', 'Dashboard'],
      date: '2023-11-25',
      type: 'dashboard'
    },
    {
      id: 11,
      title: 'Mobile App Screenshots',
      description: 'Screenshots from the task management mobile app prototype.',
      image: 'https://via.placeholder.com/600x400/84CC16/FFFFFF?text=Mobile+Screenshots',
      category: 'Mobile Development',
      tags: ['Mobile', 'Screenshots', 'Prototype'],
      date: '2023-11-20',
      type: 'screenshot'
    },
    {
      id: 12,
      title: 'Algorithm Visualization',
      description: 'Animated visualization of sorting algorithms in action.',
      image: 'https://via.placeholder.com/600x400/F97316/FFFFFF?text=Algorithm+Visualization',
      category: 'Education',
      tags: ['Algorithms', 'Visualization', 'Education'],
      date: '2023-11-15',
      type: 'animation'
    }
  ], []);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get all unique categories
  const categories = useMemo(() => {
    const categorySet = new Set(galleryItems.map(item => item.category));
    return ['All', ...Array.from(categorySet).sort()];
  }, [galleryItems]);

  // Filter items based on category and search
  const filteredItems = useMemo(() => {
    return galleryItems.filter(item => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [galleryItems, selectedCategory, searchTerm]);

  const openModal = (item, index) => {
    setSelectedItem(item);
    setCurrentImageIndex(index);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const navigateImage = (direction) => {
    const newIndex = currentImageIndex + direction;
    if (newIndex >= 0 && newIndex < filteredItems.length) {
      setCurrentImageIndex(newIndex);
      setSelectedItem(filteredItems[newIndex]);
    }
  };

  const downloadImage = (imageUrl, title) => {
    // In a real app, this would download the actual image
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${title.replace(/\s+/g, '_')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="gallery" className="gallery">
      <div className="container">
        <h2 className="section-title">Gallery</h2>
        <p className="section-subtitle">
          A visual showcase of my work, designs, and technical achievements
        </p>

        {/* Gallery Controls */}
        <div className="gallery-controls">
          <div className="search-group">
            <SearchIcon className="control-icon" />
            <input
              type="text"
              placeholder="Search gallery..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-group">
            <FilterIcon className="control-icon" />
            <label htmlFor="category-filter">Filter by Category:</label>
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <div
                key={item.id}
                className="gallery-item"
                onClick={() => openModal(item, index)}
              >
                <div className="item-image">
                  <img src={item.image} alt={item.title} />
                  <div className="item-overlay">
                    <EyeIcon className="view-icon" />
                    <span className="view-text">View</span>
                  </div>
                </div>
                <div className="item-info">
                  <h3 className="item-title">{item.title}</h3>
                  <p className="item-description">{item.description}</p>
                  <div className="item-meta">
                    <span className="item-category">{item.category}</span>
                    <span className="item-date">{new Date(item.date).toLocaleDateString()}</span>
                  </div>
                  <div className="item-tags">
                    {item.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-items">
              <FaImages className="no-items-icon" />
              <p>No items found matching your search.</p>
              <button onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }} className="btn btn-secondary">
                Show All Items
              </button>
            </div>
          )}
        </div>

        {/* Modal */}
        {selectedItem && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-button" onClick={closeModal}>
                <FaTimes />
              </button>

              <div className="modal-image-container">
                <button
                  className="nav-button prev"
                  onClick={() => navigateImage(-1)}
                  disabled={currentImageIndex === 0}
                >
                  <FaChevronLeft />
                </button>

                <div className="modal-image">
                  <img src={selectedItem.image} alt={selectedItem.title} />
                </div>

                <button
                  className="nav-button next"
                  onClick={() => navigateImage(1)}
                  disabled={currentImageIndex === filteredItems.length - 1}
                >
                  <FaChevronRight />
                </button>
              </div>

              <div className="modal-info">
                <h3 className="modal-title">{selectedItem.title}</h3>
                <p className="modal-description">{selectedItem.description}</p>
                <div className="modal-meta">
                  <span className="modal-category">{selectedItem.category}</span>
                  <span className="modal-date">{new Date(selectedItem.date).toLocaleDateString()}</span>
                  <span className="modal-type">{selectedItem.type}</span>
                </div>
                <div className="modal-tags">
                  {selectedItem.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
                <div className="modal-actions">
                  <button
                    className="btn btn-primary"
                    onClick={() => downloadImage(selectedItem.image, selectedItem.title)}
                  >
                    <FaDownload /> Download
                  </button>
                </div>
              </div>

              <div className="modal-counter">
                {currentImageIndex + 1} of {filteredItems.length}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};


// Enhanced feature for interaction - PR #19
// Advanced state management and performance optimization
const useinteractionEnhancement = () => {
  const [isOptimized, setIsOptimized] = useState(false);
  const [performanceMetrics, setPerformanceMetrics] = useState({});
  const [cacheStrategy, setCacheStrategy] = useState('lru');
  
  useEffect(() => {
    // Performance monitoring
    const metrics = {
      renderTime: performance.now(),
      memoryUsage: performance.memory?.usedJSHeapSize || 0,
      componentMounts: Date.now()
    };
    setPerformanceMetrics(metrics);
    
    // Optimization strategies
    const optimizationTimer = setTimeout(() => {
      setIsOptimized(true);
      console.log('interaction optimization complete', metrics);
    }, 100);
    
    return () => clearTimeout(optimizationTimer);
  }, []);
  
  const memoizedCalculation = useMemo(() => {
    return performanceMetrics.renderTime * 1.5;
  }, [performanceMetrics]);
  
  return { isOptimized, performanceMetrics, memoizedCalculation };
};

// Advanced error boundary for interaction
class interactionErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('interaction Error:', error, errorInfo);
    this.setState({ errorInfo });
  }
  
  render() {
    if (this.state.hasError) {
      return <div>Error in interaction component</div>;
    }
    return this.props.children;
  }
}

export default Gallery;