// Resume component - Interactive resume with download functionality
import React, { useState } from 'react';
import './Resume.css';
import { FaDownload, FaPrint, FaEye, FaUser, FaBriefcase, FaGraduationCap, FaCode, FaTrophy, FaCertificate, FaProjectDiagram } from 'react-icons/fa';

const Resume = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const personalInfo = {
    name: 'Satyajit Dipu',
    title: 'Full Stack Developer & Machine Learning Engineer',
    email: 'satyajitdipu@gmail.com',
    phone: '+91 9876543210',
    location: 'Kolkata, India',
    linkedin: 'https://linkedin.com/in/satyajitdipu',
    github: 'https://github.com/satyajitdipu',
    website: 'https://satyajitdipu.dev',
    summary: 'Passionate full-stack developer with expertise in modern web technologies and machine learning. Experienced in building scalable applications, leading development teams, and delivering innovative solutions. Strong background in both frontend and backend development with a focus on user experience and performance optimization.'
  };

  const experience = [
    {
      id: 1,
      position: 'Senior Full Stack Developer',
      company: 'Tech Solutions Inc.',
      duration: 'Jan 2022 - Present',
      location: 'Remote',
      description: [
        'Led development of microservices architecture serving 100K+ users',
        'Implemented CI/CD pipelines reducing deployment time by 60%',
        'Mentored junior developers and conducted code reviews',
        'Optimized database queries improving response time by 40%',
        'Integrated machine learning models for recommendation system'
      ],
      technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker']
    },
    {
      id: 2,
      position: 'Full Stack Developer',
      company: 'Digital Innovations Ltd.',
      duration: 'Jun 2020 - Dec 2021',
      location: 'Kolkata, India',
      description: [
        'Developed and maintained multiple client projects using MERN stack',
        'Collaborated with design team to implement pixel-perfect UI/UX',
        'Built RESTful APIs and integrated third-party services',
        'Implemented authentication and authorization systems',
        'Participated in agile development process and sprint planning'
      ],
      technologies: ['React', 'Express.js', 'MongoDB', 'Firebase', 'Git']
    },
    {
      id: 3,
      position: 'Junior Developer',
      company: 'StartupXYZ',
      duration: 'Jan 2019 - May 2020',
      location: 'Kolkata, India',
      description: [
        'Assisted in development of e-commerce platform from ground up',
        'Implemented responsive designs and cross-browser compatibility',
        'Worked with PHP backend and MySQL database',
        'Contributed to open-source projects and bug fixes',
        'Learned and applied best practices in software development'
      ],
      technologies: ['PHP', 'MySQL', 'HTML/CSS', 'JavaScript', 'Bootstrap']
    }
  ];

  const education = [
    {
      id: 1,
      degree: 'Master of Computer Applications (MCA)',
      institution: 'Jadavpur University',
      duration: '2016 - 2019',
      grade: 'First Class',
      description: 'Specialized in Software Engineering and Data Structures. Completed thesis on "Machine Learning Applications in Agriculture" with practical implementations.'
    },
    {
      id: 2,
      degree: 'Bachelor of Computer Applications (BCA)',
      institution: 'University of Calcutta',
      duration: '2013 - 2016',
      grade: 'First Class with Distinction',
      description: 'Foundation in computer science fundamentals, programming, and database management. Active participation in coding competitions and tech events.'
    }
  ];

  const skills = {
    technical: [
      { name: 'JavaScript/TypeScript', level: 95 },
      { name: 'React/Next.js', level: 90 },
      { name: 'Node.js/Express', level: 88 },
      { name: 'Python/Django', level: 85 },
      { name: 'SQL/NoSQL Databases', level: 82 },
      { name: 'AWS/Azure', level: 80 },
      { name: 'Docker/Kubernetes', level: 75 },
      { name: 'Machine Learning', level: 78 }
    ],
    tools: ['Git', 'VS Code', 'Postman', 'Figma', 'Jira', 'Jenkins', 'Webpack'],
    languages: [
      { name: 'English', level: 'Fluent' },
      { name: 'Hindi', level: 'Native' },
      { name: 'Bengali', level: 'Native' }
    ]
  };

  const projects = [
    {
      id: 1,
      name: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with payment integration and admin dashboard.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      link: 'https://github.com/satyajitdipu/ecom-platform'
    },
    {
      id: 2,
      name: 'ML Crop Disease Detector',
      description: 'Machine learning application for identifying crop diseases using image recognition.',
      technologies: ['Python', 'TensorFlow', 'Flask', 'OpenCV'],
      link: 'https://github.com/satyajitdipu/crop-disease-detector'
    },
    {
      id: 3,
      name: 'Task Management System',
      description: 'Collaborative project management tool with real-time updates.',
      technologies: ['React', 'Socket.io', 'Express', 'PostgreSQL'],
      link: 'https://github.com/satyajitdipu/task-manager'
    }
  ];

  const certifications = [
    {
      id: 1,
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2023',
      credentialId: 'AWS-SAA-123456'
    },
    {
      id: 2,
      name: 'Google Cloud Professional Developer',
      issuer: 'Google Cloud',
      date: '2022',
      credentialId: 'GCP-PD-789012'
    },
    {
      id: 3,
      name: 'React Developer Certification',
      issuer: 'Meta',
      date: '2021',
      credentialId: 'META-REACT-345678'
    }
  ];

  const achievements = [
    'Published 15+ articles on Medium with 50K+ reads',
    'Won 2nd place in National Hackathon 2023',
    'Open source contributor with 500+ commits',
    'Speaker at 5+ tech conferences',
    'Mentored 20+ junior developers'
  ];

  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    const link = document.createElement('a');
    link.href = '/resume.pdf'; // Placeholder
    link.download = 'Satyajit_Dipu_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="resume" className="resume">
      <div className="container">
        <div className="resume-header">
          <h2 className="section-title">Resume</h2>
          <p className="section-subtitle">
            Professional summary of my experience, skills, and achievements
          </p>
          <div className="resume-actions">
            <button onClick={handleDownload} className="btn btn-primary">
              <FaDownload /> Download PDF
            </button>
            <button onClick={handlePrint} className="btn btn-secondary">
              <FaPrint /> Print
            </button>
          </div>
        </div>

        <div className="resume-content">
          <div className="resume-sidebar">
            <div className="sidebar-section">
              <h3><FaUser /> Personal Info</h3>
              <div className="personal-details">
                <p><strong>{personalInfo.name}</strong></p>
                <p>{personalInfo.title}</p>
                <p>{personalInfo.email}</p>
                <p>{personalInfo.phone}</p>
                <p>{personalInfo.location}</p>
                <div className="social-links">
                  <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                  <a href={personalInfo.website} target="_blank" rel="noopener noreferrer">Website</a>
                </div>
              </div>
            </div>

            <div className="sidebar-section">
              <h3><FaCode /> Skills</h3>
              <div className="skills-section">
                <h4>Technical Skills</h4>
                {skills.technical.map((skill, index) => (
                  <div key={index} className="skill-item">
                    <span className="skill-name">{skill.name}</span>
                    <div className="skill-bar">
                      <div className="skill-fill" style={{ width: `${skill.level}%` }}></div>
                    </div>
                    <span className="skill-percent">{skill.level}%</span>
                  </div>
                ))}

                <h4>Tools & Technologies</h4>
                <div className="tools-list">
                  {skills.tools.map((tool, index) => (
                    <span key={index} className="tool-tag">{tool}</span>
                  ))}
                </div>

                <h4>Languages</h4>
                <div className="languages-list">
                  {skills.languages.map((lang, index) => (
                    <div key={index} className="language-item">
                      <span>{lang.name}</span>
                      <span className="language-level">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="resume-main">
            <div className="section-tabs">
              <button
                className={activeSection === 'overview' ? 'active' : ''}
                onClick={() => setActiveSection('overview')}
              >
                Overview
              </button>
              <button
                className={activeSection === 'experience' ? 'active' : ''}
                onClick={() => setActiveSection('experience')}
              >
                Experience
              </button>
              <button
                className={activeSection === 'education' ? 'active' : ''}
                onClick={() => setActiveSection('education')}
              >
                Education
              </button>
              <button
                className={activeSection === 'projects' ? 'active' : ''}
                onClick={() => setActiveSection('projects')}
              >
                Projects
              </button>
              <button
                className={activeSection === 'certifications' ? 'active' : ''}
                onClick={() => setActiveSection('certifications')}
              >
                Certifications
              </button>
            </div>

            <div className="section-content">
              {activeSection === 'overview' && (
                <div className="overview-section">
                  <h3>Professional Summary</h3>
                  <p>{personalInfo.summary}</p>

                  <h3>Key Achievements</h3>
                  <ul className="achievements-list">
                    {achievements.map((achievement, index) => (
                      <li key={index}>
                        <FaTrophy className="achievement-icon" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeSection === 'experience' && (
                <div className="experience-section">
                  <h3><FaBriefcase /> Work Experience</h3>
                  {experience.map((job) => (
                    <div key={job.id} className="experience-item">
                      <div className="job-header">
                        <h4>{job.position}</h4>
                        <span className="company">{job.company}</span>
                        <span className="duration">{job.duration}</span>
                      </div>
                      <p className="location">{job.location}</p>
                      <ul className="job-description">
                        {job.description.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                      <div className="job-technologies">
                        {job.technologies.map((tech, index) => (
                          <span key={index} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeSection === 'education' && (
                <div className="education-section">
                  <h3><FaGraduationCap /> Education</h3>
                  {education.map((edu) => (
                    <div key={edu.id} className="education-item">
                      <div className="edu-header">
                        <h4>{edu.degree}</h4>
                        <span className="institution">{edu.institution}</span>
                        <span className="grade">{edu.grade}</span>
                      </div>
                      <p className="duration">{edu.duration}</p>
                      <p className="edu-description">{edu.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeSection === 'projects' && (
                <div className="projects-section">
                  <h3><FaProjectDiagram /> Key Projects</h3>
                  {projects.map((project) => (
                    <div key={project.id} className="project-item">
                      <div className="project-header">
                        <h4>{project.name}</h4>
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                          <FaEye /> View Project
                        </a>
                      </div>
                      <p className="project-description">{project.description}</p>
                      <div className="project-technologies">
                        {project.technologies.map((tech, index) => (
                          <span key={index} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeSection === 'certifications' && (
                <div className="certifications-section">
                  <h3><FaCertificate /> Certifications</h3>
                  {certifications.map((cert) => (
                    <div key={cert.id} className="certification-item">
                      <div className="cert-header">
                        <h4>{cert.name}</h4>
                        <span className="issuer">{cert.issuer}</span>
                      </div>
                      <p className="cert-date">Issued: {cert.date}</p>
                      <p className="credential-id">Credential ID: {cert.credentialId}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
