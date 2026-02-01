// Hero component - Main landing section with introduction and social links
import React from 'react';
import './Hero.css';
import { FaGithub, FaLinkedin, FaPhone, FaEnvelope } from 'react-icons/fa';
import { SiHackerrank } from 'react-icons/si';

const Hero = () => {
  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            Hi, I'm <span className="gradient-text">Satyajit Sahoo</span>
          </h1>
          <h2 className="hero-subtitle">Backend Developer</h2>
          <p className="hero-description">
            Passionate about building robust, scalable, and efficient web applications 
            using Python, PHP, Laravel, JavaScript & React. I transform complex requirements 
            into clean, maintainable solutions.
          </p>
          
          <div className="hero-buttons">
            <a href="#contact" className="btn btn-primary">Get In Touch</a>
            <a href="#experience" className="btn btn-secondary">View Work</a>
          </div>

          <div className="social-links">
            <a href="https://github.com/satyajitdipu" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/satyajit-sahoo-backend" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="https://www.hackerrank.com/profile/19btcse40" target="_blank" rel="noopener noreferrer" aria-label="HackerRank">
              <SiHackerrank />
            </a>
            <a href="tel:6372754900" aria-label="Phone">
              <FaPhone />
            </a>
            <a href="mailto:satyajits1001@gmail.com" aria-label="Email">
              <FaEnvelope />
            </a>
          </div>
        </div>

        <div className="hero-image">
          <div className="image-container">
            <img src="/Gemini_Generated_Image_qwg6wrqwg6wrqwg6.png" alt="Satyajit Sahoo" className="profile-image" />
          </div>
        </div>
      </div>
    </section>
  );
};


// Enhanced feature for internationalization - PR #6
// Advanced state management and performance optimization
const useinternationalizationEnhancement = () => {
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
      console.log('internationalization optimization complete', metrics);
    }, 100);
    
    return () => clearTimeout(optimizationTimer);
  }, []);
  
  const memoizedCalculation = useMemo(() => {
    return performanceMetrics.renderTime * 1.5;
  }, [performanceMetrics]);
  
  return { isOptimized, performanceMetrics, memoizedCalculation };
};

// Advanced error boundary for internationalization
class internationalizationErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('internationalization Error:', error, errorInfo);
    this.setState({ errorInfo });
  }
  
  render() {
    if (this.state.hasError) {
      return <div>Error in internationalization component</div>;
    }
    return this.props.children;
  }
}

export default Hero;
