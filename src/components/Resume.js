import React, { useState, useContext, useEffect } from 'react';
import './Resume.css';
import { ThemeContext } from '../App';

const Resume = () => {
  const { darkMode } = useContext(ThemeContext);
  const [activeSection, setActiveSection] = useState('experience');
  const [expandedItems, setExpandedItems] = useState(new Set());

  // Resume data
  const personalInfo = {
    name: 'John Doe',
    title: 'Full Stack Developer',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/johndoe',
    github: 'github.com/johndoe',
    website: 'johndoe.dev',
    summary: 'Passionate full-stack developer with 5+ years of experience building scalable web applications. Expertise in React, Node.js, and cloud technologies. Committed to writing clean, maintainable code and delivering exceptional user experiences.'
  };

  const experience = [
    {
      id: 1,
      company: 'TechCorp Inc.',
      position: 'Senior Full Stack Developer',
      location: 'San Francisco, CA',
      startDate: 'Jan 2022',
      endDate: 'Present',
      description: 'Led development of microservices architecture serving 1M+ users. Implemented CI/CD pipelines reducing deployment time by 60%. Mentored junior developers and established coding standards.',
      achievements: [
        'Architected and implemented microservices infrastructure using Node.js and Docker',
        'Reduced application load time by 40% through performance optimizations',
        'Led cross-functional team of 8 developers on enterprise-scale projects',
        'Implemented automated testing suite achieving 85% code coverage',
        'Mentored 5 junior developers and established development best practices'
      ],
      technologies: ['React', 'Node.js', 'TypeScript', 'Docker', 'AWS', 'PostgreSQL', 'Redis']
    },
    {
      id: 2,
      company: 'StartupXYZ',
      position: 'Full Stack Developer',
      location: 'Remote',
      startDate: 'Mar 2020',
      endDate: 'Dec 2021',
      description: 'Developed and maintained multiple client-facing applications. Collaborated closely with design team to implement pixel-perfect UI components.',
      achievements: [
        'Built responsive web applications using React and modern CSS frameworks',
        'Integrated third-party APIs and payment processing systems',
        'Optimized database queries improving application performance by 50%',
        'Implemented real-time features using WebSocket technology',
        'Contributed to open-source projects and company knowledge base'
      ],
      technologies: ['React', 'Vue.js', 'Express.js', 'MongoDB', 'Socket.io', 'Stripe API']
    },
    {
      id: 3,
      company: 'Digital Agency Pro',
      position: 'Frontend Developer',
      location: 'New York, NY',
      startDate: 'Jun 2019',
      endDate: 'Feb 2020',
      description: 'Created custom websites and web applications for various clients. Worked in fast-paced environment delivering projects on tight deadlines.',
      achievements: [
        'Developed 20+ custom websites and web applications for diverse clients',
        'Implemented responsive designs ensuring mobile-first approach',
        'Collaborated with designers to create intuitive user interfaces',
        'Optimized websites for performance and SEO best practices',
        'Maintained and updated legacy codebases'
      ],
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'WordPress', 'PHP']
    }
  ];

  const education = [
    {
      id: 1,
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science in Computer Science',
      location: 'Berkeley, CA',
      startDate: 'Aug 2015',
      endDate: 'May 2019',
      gpa: '3.8/4.0',
      honors: ['Summa Cum Laude', 'Dean\'s List (6 semesters)', 'Computer Science Excellence Award'],
      relevantCourses: ['Data Structures & Algorithms', 'Software Engineering', 'Database Systems', 'Web Development', 'Machine Learning'],
      activities: ['Computer Science Club President', 'Hackathon Organizer', 'Teaching Assistant for CS 61A']
    }
  ];

  const skills = {
    technical: [
      { category: 'Frontend', skills: ['React', 'Vue.js', 'Angular', 'TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'SASS/SCSS'] },
      { category: 'Backend', skills: ['Node.js', 'Express.js', 'Python', 'Django', 'PostgreSQL', 'MongoDB', 'Redis', 'GraphQL'] },
      { category: 'DevOps & Tools', skills: ['Docker', 'AWS', 'Git', 'Jenkins', 'Webpack', 'Jest', 'Cypress', 'Figma'] },
      { category: 'Mobile', skills: ['React Native', 'Flutter', 'iOS Development', 'Android Development'] }
    ],
    soft: [
      'Problem Solving',
      'Team Leadership',
      'Communication',
      'Agile/Scrum',
      'Mentoring',
      'Project Management',
      'Time Management',
      'Continuous Learning'
    ]
  };

  const certifications = [
    {
      id: 1,
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: 'Dec 2022',
      credentialId: 'AWS-SAA-123456',
      url: 'https://aws.amazon.com/certification/',
      description: 'Demonstrated expertise in designing distributed systems on AWS platform'
    },
    {
      id: 2,
      name: 'Google Cloud Professional Developer',
      issuer: 'Google Cloud',
      date: 'Aug 2021',
      credentialId: 'GCP-PD-789012',
      url: 'https://cloud.google.com/certification/',
      description: 'Certified in developing scalable applications on Google Cloud Platform'
    },
    {
      id: 3,
      name: 'Certified Scrum Master',
      issuer: 'Scrum Alliance',
      date: 'Mar 2021',
      credentialId: 'CSM-345678',
      url: 'https://www.scrumalliance.org/',
      description: 'Trained in Scrum framework and agile project management methodologies'
    }
  ];

  const projects = [
    {
      id: 1,
      name: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with payment processing, inventory management, and admin dashboard.',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS'],
      github: 'https://github.com/johndoe/ecommerce-platform',
      live: 'https://ecommerce-demo.johndoe.dev',
      highlights: [
        'Processed $50K+ in transactions',
        '99.9% uptime with automated monitoring',
        'Scalable architecture handling 10K+ concurrent users'
      ]
    },
    {
      id: 2,
      name: 'Task Management App',
      description: 'Collaborative project management tool with real-time updates and team communication features.',
      technologies: ['React', 'Socket.io', 'MongoDB', 'Express.js', 'Docker'],
      github: 'https://github.com/johndoe/task-manager',
      live: 'https://tasks.johndoe.dev',
      highlights: [
        'Real-time collaboration for distributed teams',
        'Advanced filtering and search capabilities',
        'Mobile-responsive design with PWA features'
      ]
    },
    {
      id: 3,
      name: 'Data Visualization Dashboard',
      description: 'Interactive dashboard for business intelligence with customizable charts and real-time data updates.',
      technologies: ['D3.js', 'React', 'Python', 'Flask', 'PostgreSQL'],
      github: 'https://github.com/johndoe/data-dashboard',
      live: 'https://dashboard.johndoe.dev',
      highlights: [
        'Interactive charts with drill-down capabilities',
        'Real-time data streaming and updates',
        'Customizable dashboards for different user roles'
      ]
    }
  ];

  const languages = [
    { language: 'English', proficiency: 'Native' },
    { language: 'Spanish', proficiency: 'Conversational' },
    { language: 'French', proficiency: 'Basic' }
  ];

  const toggleExpanded = (id) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['experience', 'education', 'skills', 'projects', 'certifications'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`resume ${darkMode ? 'dark' : ''}`}>
      <div className="resume-container">
        {/* Header Section */}
        <header className="resume-header">
          <div className="resume-hero">
            <div className="hero-content">
              <h1 className="hero-name">{personalInfo.name}</h1>
              <h2 className="hero-title">{personalInfo.title}</h2>
              <p className="hero-summary">{personalInfo.summary}</p>
            </div>
            <div className="hero-contact">
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <span>{personalInfo.email}</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <span>{personalInfo.phone}</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>{personalInfo.location}</span>
              </div>
              <div className="contact-item">
                <i className="fab fa-linkedin"></i>
                <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer">
                  {personalInfo.linkedin}
                </a>
              </div>
              <div className="contact-item">
                <i className="fab fa-github"></i>
                <a href={`https://${personalInfo.github}`} target="_blank" rel="noopener noreferrer">
                  {personalInfo.github}
                </a>
              </div>
              <div className="contact-item">
                <i className="fas fa-globe"></i>
                <a href={`https://${personalInfo.website}`} target="_blank" rel="noopener noreferrer">
                  {personalInfo.website}
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <nav className="resume-nav">
          <div className="nav-container">
            {[
              { id: 'experience', label: 'Experience', icon: 'fas fa-briefcase' },
              { id: 'education', label: 'Education', icon: 'fas fa-graduation-cap' },
              { id: 'skills', label: 'Skills', icon: 'fas fa-code' },
              { id: 'projects', label: 'Projects', icon: 'fas fa-project-diagram' },
              { id: 'certifications', label: 'Certifications', icon: 'fas fa-certificate' }
            ].map(section => (
              <button
                key={section.id}
                className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => scrollToSection(section.id)}
              >
                <i className={section.icon}></i>
                <span>{section.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Main Content */}
        <main className="resume-main">
          {/* Experience Section */}
          <section id="experience" className="resume-section">
            <div className="section-header">
              <h2 className="section-title">
                <i className="fas fa-briefcase"></i>
                Professional Experience
              </h2>
            </div>
            <div className="section-content">
              {experience.map(job => (
                <div key={job.id} className="experience-item">
                  <div className="experience-header" onClick={() => toggleExpanded(`exp-${job.id}`)}>
                    <div className="experience-summary">
                      <h3 className="experience-position">{job.position}</h3>
                      <div className="experience-company">{job.company}</div>
                      <div className="experience-meta">
                        <span className="experience-location">
                          <i className="fas fa-map-marker-alt"></i>
                          {job.location}
                        </span>
                        <span className="experience-duration">
                          <i className="fas fa-calendar"></i>
                          {job.startDate} - {job.endDate}
                        </span>
                      </div>
                    </div>
                    <div className="experience-toggle">
                      <i className={`fas fa-chevron-${expandedItems.has(`exp-${job.id}`) ? 'up' : 'down'}`}></i>
                    </div>
                  </div>
                  {expandedItems.has(`exp-${job.id}`) && (
                    <div className="experience-details">
                      <p className="experience-description">{job.description}</p>
                      <div className="experience-achievements">
                        <h4>Key Achievements:</h4>
                        <ul>
                          {job.achievements.map((achievement, index) => (
                            <li key={index}>{achievement}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="experience-technologies">
                        <h4>Technologies Used:</h4>
                        <div className="tech-tags">
                          {job.technologies.map(tech => (
                            <span key={tech} className="tech-tag">{tech}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Education Section */}
          <section id="education" className="resume-section">
            <div className="section-header">
              <h2 className="section-title">
                <i className="fas fa-graduation-cap"></i>
                Education
              </h2>
            </div>
            <div className="section-content">
              {education.map(edu => (
                <div key={edu.id} className="education-item">
                  <div className="education-header">
                    <h3 className="education-degree">{edu.degree}</h3>
                    <div className="education-institution">{edu.institution}</div>
                    <div className="education-meta">
                      <span className="education-location">
                        <i className="fas fa-map-marker-alt"></i>
                        {edu.location}
                      </span>
                      <span className="education-duration">
                        <i className="fas fa-calendar"></i>
                        {edu.startDate} - {edu.endDate}
                      </span>
                      <span className="education-gpa">
                        <i className="fas fa-star"></i>
                        GPA: {edu.gpa}
                      </span>
                    </div>
                  </div>
                  <div className="education-details">
                    {edu.honors && edu.honors.length > 0 && (
                      <div className="education-honors">
                        <h4>Honors & Awards:</h4>
                        <ul>
                          {edu.honors.map((honor, index) => (
                            <li key={index}>{honor}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {edu.relevantCourses && edu.relevantCourses.length > 0 && (
                      <div className="education-courses">
                        <h4>Relevant Coursework:</h4>
                        <div className="course-tags">
                          {edu.relevantCourses.map(course => (
                            <span key={course} className="course-tag">{course}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {edu.activities && edu.activities.length > 0 && (
                      <div className="education-activities">
                        <h4>Activities & Leadership:</h4>
                        <ul>
                          {edu.activities.map((activity, index) => (
                            <li key={index}>{activity}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Skills Section */}
          <section id="skills" className="resume-section">
            <div className="section-header">
              <h2 className="section-title">
                <i className="fas fa-code"></i>
                Skills & Technologies
              </h2>
            </div>
            <div className="section-content">
              <div className="skills-grid">
                {skills.technical.map(category => (
                  <div key={category.category} className="skills-category">
                    <h3 className="category-title">{category.category}</h3>
                    <div className="skills-list">
                      {category.skills.map(skill => (
                        <span key={skill} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="soft-skills">
                <h3 className="category-title">Soft Skills</h3>
                <div className="skills-list">
                  {skills.soft.map(skill => (
                    <span key={skill} className="skill-tag soft-skill">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="resume-section">
            <div className="section-header">
              <h2 className="section-title">
                <i className="fas fa-project-diagram"></i>
                Notable Projects
              </h2>
            </div>
            <div className="section-content">
              <div className="projects-grid">
                {projects.map(project => (
                  <div key={project.id} className="project-card">
                    <div className="project-header">
                      <h3 className="project-name">{project.name}</h3>
                      <div className="project-links">
                        {project.github && (
                          <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                            <i className="fab fa-github"></i>
                          </a>
                        )}
                        {project.live && (
                          <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-link">
                            <i className="fas fa-external-link-alt"></i>
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="project-description">{project.description}</p>
                    <div className="project-highlights">
                      <h4>Key Features:</h4>
                      <ul>
                        {project.highlights.map((highlight, index) => (
                          <li key={index}>{highlight}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="project-technologies">
                      <h4>Technologies:</h4>
                      <div className="tech-tags">
                        {project.technologies.map(tech => (
                          <span key={tech} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Certifications Section */}
          <section id="certifications" className="resume-section">
            <div className="section-header">
              <h2 className="section-title">
                <i className="fas fa-certificate"></i>
                Certifications
              </h2>
            </div>
            <div className="section-content">
              <div className="certifications-grid">
                {certifications.map(cert => (
                  <div key={cert.id} className="certification-card">
                    <div className="certification-header">
                      <h3 className="certification-name">{cert.name}</h3>
                      <div className="certification-issuer">{cert.issuer}</div>
                    </div>
                    <div className="certification-meta">
                      <span className="certification-date">
                        <i className="fas fa-calendar"></i>
                        {cert.date}
                      </span>
                      {cert.credentialId && (
                        <span className="certification-id">
                          <i className="fas fa-id-badge"></i>
                          {cert.credentialId}
                        </span>
                      )}
                    </div>
                    <p className="certification-description">{cert.description}</p>
                    {cert.url && (
                      <a href={cert.url} target="_blank" rel="noopener noreferrer" className="certification-link">
                        <i className="fas fa-external-link-alt"></i>
                        View Certificate
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Languages Section */}
          <section id="languages" className="resume-section">
            <div className="section-header">
              <h2 className="section-title">
                <i className="fas fa-language"></i>
                Languages
              </h2>
            </div>
            <div className="section-content">
              <div className="languages-list">
                {languages.map(lang => (
                  <div key={lang.language} className="language-item">
                    <span className="language-name">{lang.language}</span>
                    <span className="language-proficiency">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="resume-footer">
          <div className="footer-content">
            <p>&copy; 2024 {personalInfo.name}. All rights reserved.</p>
            <div className="footer-links">
              <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href={`https://${personalInfo.github}`} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i>
              </a>
              <a href={`mailto:${personalInfo.email}`}>
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Resume;