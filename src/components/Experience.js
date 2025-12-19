import React from 'react';
import './Experience.css';
import { FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';

const Experience = () => {
  const experiences = [
    {
      company: 'VirtualTx',
      role: 'Software Developer',
      duration: 'August 2024 - Present',
      location: 'Remote',
      type: 'Full-time',
      description: [
        'Developing and maintaining scalable backend systems',
        'Working with modern tech stack including Python, PHP, and JavaScript',
        'Collaborating with cross-functional teams to deliver high-quality solutions',
        'Contributing to system architecture and design decisions'
      ]
    },
    {
      company: 'HyScaler',
      role: 'Junior Technical Programmer',
      duration: 'June 2023 - April 2024',
      location: 'Bhubaneswar, Odisha, India',
      type: 'Full-time',
      description: [
        'Designed and implemented CRM and HR management systems',
        'Ensured smooth data flow and clean architecture',
        'Worked on API integration and database management',
        'Focused on backend optimization and reliable performance',
        'Collaborated with team members on various projects'
      ]
    },
    {
      company: 'HyScaler',
      role: 'Junior Software Developer Trainee',
      duration: 'February 2023 - June 2023',
      location: 'Bhubaneswar, Odisha, India',
      type: 'Trainee',
      description: [
        'Completed intensive training in backend development',
        'Learned Laravel framework and modern development practices',
        'Worked on real-world projects under senior developers',
        'Gained hands-on experience with API development and testing',
        'Participated in code reviews and team meetings'
      ]
    }
  ];

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

export default Experience;
