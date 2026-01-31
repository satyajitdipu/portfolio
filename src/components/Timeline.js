// Timeline component - Interactive career timeline with milestones
import React, { useState, useRef, useEffect } from 'react';
import './Timeline.css';
import { FaCalendarAlt, FaMapMarkerAlt, FaBriefcase, FaGraduationCap, FaTrophy, FaProjectDiagram, FaCertificate, FaCode, FaRocket } from 'react-icons/fa';

const Timeline = () => {
  const [activeItem, setActiveItem] = useState(null);
  const [visibleItems, setVisibleItems] = useState(new Set());
  const timelineRef = useRef(null);

  const timelineData = [
    {
      id: 1,
      date: '2013',
      title: 'Started BCA Journey',
      subtitle: 'University of Calcutta',
      description: 'Began my computer science education, learning fundamental programming concepts and database management.',
      type: 'education',
      icon: <FaGraduationCap />,
      location: 'Kolkata, India',
      achievements: ['First Class throughout', 'Active in coding clubs'],
      technologies: ['C', 'C++', 'SQL']
    },
    {
      id: 2,
      date: '2016',
      title: 'Completed BCA',
      subtitle: 'University of Calcutta',
      description: 'Graduated with First Class distinction, specializing in software development and system design.',
      type: 'education',
      icon: <FaGraduationCap />,
      location: 'Kolkata, India',
      achievements: ['First Class with Distinction', 'Best Project Award'],
      technologies: ['Java', 'Oracle', 'Web Technologies']
    },
    {
      id: 3,
      date: '2016',
      title: 'Started MCA Program',
      subtitle: 'Jadavpur University',
      description: 'Advanced studies in computer applications with focus on software engineering and data structures.',
      type: 'education',
      icon: <FaGraduationCap />,
      location: 'Kolkata, India',
      achievements: ['Research on ML applications', 'Published paper on crop disease detection'],
      technologies: ['Python', 'Machine Learning', 'Data Structures']
    },
    {
      id: 4,
      date: '2019',
      title: 'MCA Graduation',
      subtitle: 'Jadavpur University',
      description: 'Completed Master\'s degree with thesis on "Machine Learning Applications in Agriculture".',
      type: 'education',
      icon: <FaGraduationCap />,
      location: 'Kolkata, India',
      achievements: ['First Class', 'Thesis publication', 'ML research project'],
      technologies: ['Python', 'TensorFlow', 'Computer Vision']
    },
    {
      id: 5,
      date: '2019',
      title: 'Junior Developer',
      subtitle: 'StartupXYZ',
      description: 'First professional role as a web developer, working on e-commerce platforms and learning industry best practices.',
      type: 'work',
      icon: <FaBriefcase />,
      location: 'Kolkata, India',
      achievements: ['Built e-commerce platform from scratch', 'Learned PHP/Laravel', 'Contributed to open source'],
      technologies: ['PHP', 'MySQL', 'Laravel', 'Bootstrap']
    },
    {
      id: 6,
      date: '2020',
      title: 'Full Stack Developer',
      subtitle: 'Digital Innovations Ltd.',
      description: 'Promoted to full stack developer, leading multiple client projects and implementing modern web technologies.',
      type: 'work',
      icon: <FaBriefcase />,
      location: 'Kolkata, India',
      achievements: ['Led MERN stack projects', 'Implemented CI/CD', 'Client project delivery'],
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Firebase']
    },
    {
      id: 7,
      date: '2021',
      title: 'AWS Certification',
      subtitle: 'Amazon Web Services',
      description: 'Achieved AWS Certified Solutions Architect certification, expanding cloud computing expertise.',
      type: 'certification',
      icon: <FaCertificate />,
      location: 'Online',
      achievements: ['Passed SAA-C02 exam', 'Cloud architecture knowledge', 'Infrastructure design skills'],
      technologies: ['AWS EC2', 'S3', 'Lambda', 'RDS']
    },
    {
      id: 8,
      date: '2022',
      title: 'Senior Full Stack Developer',
      subtitle: 'Tech Solutions Inc.',
      description: 'Senior role leading development teams, architecting scalable systems, and mentoring junior developers.',
      type: 'work',
      icon: <FaBriefcase />,
      location: 'Remote',
      achievements: ['Led microservices architecture', '60% improvement in deployment time', 'Team mentoring'],
      technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker', 'Kubernetes']
    },
    {
      id: 9,
      date: '2023',
      title: 'Crop Disease Detection Project',
      subtitle: 'Open Source Contribution',
      description: 'Developed and open-sourced ML-powered crop disease detection system using computer vision.',
      type: 'project',
      icon: <FaProjectDiagram />,
      location: 'GitHub',
      achievements: ['200+ stars on GitHub', 'Used by agricultural researchers', 'Academic citations'],
      technologies: ['Python', 'PyTorch', 'OpenCV', 'Flask']
    },
    {
      id: 10,
      date: '2023',
      title: 'Google Cloud Certification',
      subtitle: 'Google Cloud Platform',
      description: 'Earned Google Cloud Professional Developer certification, enhancing cloud development skills.',
      type: 'certification',
      icon: <FaCertificate />,
      location: 'Online',
      achievements: ['GCP developer expertise', 'Cloud-native applications', 'Serverless architecture'],
      technologies: ['Google Cloud', 'App Engine', 'Cloud Functions', 'Firestore']
    },
    {
      id: 11,
      date: '2023',
      title: 'Hackathon Winner',
      subtitle: 'National Level Competition',
      description: 'Won 2nd place in national hackathon with innovative healthcare solution using AI and IoT.',
      type: 'achievement',
      icon: <FaTrophy />,
      location: 'Mumbai, India',
      achievements: ['2nd place award', 'AI-powered healthcare app', 'IoT integration'],
      technologies: ['React Native', 'TensorFlow Lite', 'Bluetooth LE']
    },
    {
      id: 12,
      date: '2024',
      title: 'Portfolio Website Launch',
      subtitle: 'Personal Project',
      description: 'Designed and developed comprehensive portfolio website showcasing projects, skills, and achievements.',
      type: 'project',
      icon: <FaCode />,
      location: 'Online',
      achievements: ['Modern React architecture', 'SEO optimized', 'Responsive design', '80/100 repository rating'],
      technologies: ['React', 'CSS3', 'JavaScript', 'GitHub Actions']
    },
    {
      id: 13,
      date: '2024',
      title: 'Technical Blog Launch',
      subtitle: 'Content Creation',
      description: 'Started technical blog sharing insights on web development, ML, and software engineering best practices.',
      type: 'achievement',
      icon: <FaRocket />,
      location: 'Online',
      achievements: ['50K+ reads across articles', 'Technical writing skills', 'Community engagement'],
      technologies: ['Markdown', 'Jekyll', 'SEO', 'Analytics']
    }
  ];

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
                  {item.icon}
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