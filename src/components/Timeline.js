// Timeline component - Interactive career timeline with milestones
import React, { useState, useRef, useEffect } from 'react';
import './Timeline.css';
import { FaCalendarAlt, FaMapMarkerAlt, FaBriefcase, FaGraduationCap, FaTrophy, FaProjectDiagram, FaCertificate } from 'react-icons/fa';
import { useLocalStorage } from '../utils/helpers';
import { defaultPortfolio } from '../data/defaultPortfolio';

const Timeline = () => {
  const [activeItem, setActiveItem] = useState(null);
  const [visibleItems, setVisibleItems] = useState(new Set());
  const timelineRef = useRef(null);

  const [portfolio] = useLocalStorage('portfolioData', defaultPortfolio);
  const timelineData = (portfolio && portfolio.timeline) || defaultPortfolio.timeline;
  // timeline items are sourced from portfolioData or defaults
  

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const itemId = parseInt(entry.target.dataset.id);
            setVisibleItems(prev => new Set([...prev, itemId]));
          }
        });
      },
      { threshold: 0.5 }
    );

    const timelineItems = timelineRef.current?.querySelectorAll('.timeline-item');
    timelineItems?.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const getTypeColor = (type) => {
    const colors = {
      education: '#667eea',
      work: '#764ba2',
      certification: '#f093fb',
      project: '#4facfe',
      achievement: '#00f2fe'
    };
    return colors[type] || '#667eea';
  };

  const getTypeIcon = (type) => {
    const icons = {
      education: <FaGraduationCap />,
      work: <FaBriefcase />,
      certification: <FaCertificate />,
      project: <FaProjectDiagram />,
      achievement: <FaTrophy />
    };
    return icons[type] || <FaCalendarAlt />;
  };

  return (
    <section id="timeline" className="timeline">
      <div className="container">
        <h2 className="section-title">Career Timeline</h2>
        <p className="section-subtitle">
          A chronological journey through my educational background, professional experience, and key achievements
        </p>

        <div className="timeline-container" ref={timelineRef}>
          {timelineData.map((item, index) => (
            <div
              key={item.id}
              className={`timeline-item ${visibleItems.has(item.id) ? 'visible' : ''} ${activeItem === item.id ? 'active' : ''}`}
              data-id={item.id}
              onClick={() => setActiveItem(activeItem === item.id ? null : item.id)}
              style={{ '--type-color': getTypeColor(item.type) }}
            >
              <div className="timeline-marker">
                <div className="marker-icon">
                  {getTypeIcon(item.type)}
                </div>
              </div>

              <div className="timeline-content">
                <div className="timeline-header">
                  <div className="timeline-date">{item.date}</div>
                  <div className="timeline-type">
                    {getTypeIcon(item.type)}
                    <span>{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</span>
                  </div>
                </div>

                <div className="timeline-body">
                  <h3 className="timeline-title">{item.title}</h3>
                  <h4 className="timeline-subtitle">{item.subtitle}</h4>
                  <p className="timeline-description">{item.description}</p>

                  <div className="timeline-location">
                    <FaMapMarkerAlt />
                    <span>{item.location}</span>
                  </div>

                  {activeItem === item.id && (
                    <div className="timeline-details">
                      <div className="details-section">
                        <h5>Key Achievements</h5>
                        <ul>
                          {item.achievements.map((achievement, idx) => (
                            <li key={idx}>{achievement}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="details-section">
                        <h5>Technologies Used</h5>
                        <div className="tech-tags">
                          {item.technologies.map((tech, idx) => (
                            <span key={idx} className="tech-tag">{tech}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="timeline-stats">
          <div className="stat-card">
            <div className="stat-number">7+</div>
            <div className="stat-label">Years Experience</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">15+</div>
            <div className="stat-label">Projects Completed</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">3</div>
            <div className="stat-label">Certifications</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">10+</div>
            <div className="stat-label">Technologies</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;