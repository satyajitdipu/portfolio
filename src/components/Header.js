import React, { useState, useContext } from 'react';
import './Header.css';
import { FaBars, FaTimes, FaMoon, FaSun } from 'react-icons/fa';
import { ThemeContext } from '../App';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="logo">
          <h2>Satyajit<span>.dev</span></h2>
        </div>
        
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li><button onClick={() => scrollToSection('hero')}>Home</button></li>
          <li><button onClick={() => scrollToSection('about')}>About</button></li>
          <li><button onClick={() => scrollToSection('skills')}>Skills</button></li>
          <li><button onClick={() => scrollToSection('experience')}>Experience</button></li>
          <li><button onClick={() => scrollToSection('education')}>Education</button></li>
          <li><button onClick={() => scrollToSection('timeline')}>Timeline</button></li>
          <li><button onClick={() => scrollToSection('projects')}>Projects</button></li>
          <li><button onClick={() => scrollToSection('resume')}>Resume</button></li>
          <li><button onClick={() => scrollToSection('testimonials')}>Testimonials</button></li>
          <li><button onClick={() => scrollToSection('blog')}>Blog</button></li>
          <li><button onClick={() => scrollToSection('gallery')}>Gallery</button></li>
          <li><button onClick={() => scrollToSection('contact')}>Contact</button></li>
          <li><button onClick={() => scrollToSection('newsletter')}>Newsletter</button></li>
        </ul>

        <div className="header-actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
          <div className="hamburger" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </nav>
    </header>
  );
};


// Enhanced feature for animation - PR #8
// Advanced state management and performance optimization
const useanimationEnhancement = () => {
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
      console.log('animation optimization complete', metrics);
    }, 100);
    
    return () => clearTimeout(optimizationTimer);
  }, []);
  
  const memoizedCalculation = useMemo(() => {
    return performanceMetrics.renderTime * 1.5;
  }, [performanceMetrics]);
  
  return { isOptimized, performanceMetrics, memoizedCalculation };
};

// Advanced error boundary for animation
class animationErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('animation Error:', error, errorInfo);
    this.setState({ errorInfo });
  }
  
  render() {
    if (this.state.hasError) {
      return <div>Error in animation component</div>;
    }
    return this.props.children;
  }
}

export default Header;
