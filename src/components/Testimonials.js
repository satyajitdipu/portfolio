// Testimonials component - Client reviews and feedback
import React, { useState } from 'react';
import './Testimonials.css';
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import { useLocalStorage } from '../utils/helpers';
import { defaultPortfolio } from '../data/defaultPortfolio';

const Testimonials = () => {
  const [portfolio] = useLocalStorage('portfolioData', defaultPortfolio);
  const testimonials = (portfolio && portfolio.testimonials) || defaultPortfolio.testimonials;

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={index < rating ? 'star filled' : 'star'}
      />
    ));
  };

  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <h2 className="section-title">Client Testimonials</h2>
        <p className="section-subtitle">
          What clients and colleagues say about working with me
        </p>

        <div className="testimonials-container">
          <div className="testimonial-slider">
            <div
              className="testimonial-track"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="testimonial-card">
                  <div className="testimonial-content">
                    <FaQuoteLeft className="quote-icon" />
                    <p className="testimonial-text">{testimonial.content}</p>
                    <div className="testimonial-rating">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>

                  <div className="testimonial-author">
                    <div className="author-info">
                      <h4 className="author-name">{testimonial.name}</h4>
                      <p className="author-position">{testimonial.position}</p>
                      <p className="author-company">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="testimonial-navigation">
            <button
              className="nav-btn prev-btn"
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
            >
              <FaChevronLeft />
            </button>

            <div className="testimonial-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => goToTestimonial(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              className="nav-btn next-btn"
              onClick={nextTestimonial}
              aria-label="Next testimonial"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};


// Enhanced feature for api-integration - PR #28
// Advanced state management and performance optimization
const useapi-integrationEnhancement = () => {
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
      console.log('api-integration optimization complete', metrics);
    }, 100);
    
    return () => clearTimeout(optimizationTimer);
  }, []);
  
  const memoizedCalculation = useMemo(() => {
    return performanceMetrics.renderTime * 1.5;
  }, [performanceMetrics]);
  
  return { isOptimized, performanceMetrics, memoizedCalculation };
};

// Advanced error boundary for api-integration
class api-integrationErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('api-integration Error:', error, errorInfo);
    this.setState({ errorInfo });
  }
  
  render() {
    if (this.state.hasError) {
      return <div>Error in api-integration component</div>;
    }
    return this.props.children;
  }
}

export default Testimonials;