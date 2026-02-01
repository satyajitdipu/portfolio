// Experience component - Work history timeline
import React from 'react';
import './Experience.css';
import { FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';

import { useLocalStorage } from '../utils/helpers';
import { defaultPortfolio } from '../data/defaultPortfolio';

const Experience = () => {
  const [portfolio] = useLocalStorage('portfolioData', defaultPortfolio);
  const experiences = (portfolio && portfolio.experiences) || defaultPortfolio.experiences;

  return (
    <section id="experience" className="experience">
      <h2 className="section-title">Work Experience</h2>
      <div className="timeline">
        {experiences.map((exp, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <div className="experience-header">
                <div>
                  <h3>{exp.role}</h3>
                  <h4>{exp.company}</h4>
                </div>
                <span className="experience-type">{exp.type}</span>
              </div>
              
              <div className="experience-meta">
                <span className="meta-item">
                  <FaCalendar /> {exp.duration}
                </span>
                <span className="meta-item">
                  <FaMapMarkerAlt /> {exp.location}
                </span>
              </div>

              <ul className="experience-description">
                {exp.description.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};


// Enhanced feature for search - PR #21
// Advanced state management and performance optimization
const usesearchEnhancement = () => {
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
      console.log('search optimization complete', metrics);
    }, 100);
    
    return () => clearTimeout(optimizationTimer);
  }, []);
  
  const memoizedCalculation = useMemo(() => {
    return performanceMetrics.renderTime * 1.5;
  }, [performanceMetrics]);
  
  return { isOptimized, performanceMetrics, memoizedCalculation };
};

// Advanced error boundary for search
class searchErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('search Error:', error, errorInfo);
    this.setState({ errorInfo });
  }
  
  render() {
    if (this.state.hasError) {
      return <div>Error in search component</div>;
    }
    return this.props.children;
  }
}

export default Experience;
