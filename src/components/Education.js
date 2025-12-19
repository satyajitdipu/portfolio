import React from 'react';
import './Education.css';
import { FaGraduationCap, FaCalendar, FaUniversity } from 'react-icons/fa';

const Education = () => {
  const education = [
    {
      institution: 'Sambalpur University Institute of Information Technology (SUIIT)',
      degree: 'Bachelor of Technology - BTech',
      field: 'Computer Science',
      duration: 'August 2019 - May 2023',
      description: [
        'Completed comprehensive Computer Science curriculum',
        'Gained strong foundation in programming and software development',
        'Participated in various technical projects and hackathons',
        'Developed problem-solving and analytical skills'
      ]
    },
    {
      institution: 'Jawahar Navodaya Vidyalaya (JNV)',
      degree: '12th Grade',
      field: 'Science',
      duration: 'August 2015 - April 2019',
      description: [
        'Completed higher secondary education with Science stream',
        'Strong foundation in Mathematics, Physics, and Chemistry',
        'Developed early interest in technology and programming'
      ]
    }
  ];

  const certifications = [
    'upStart - Priceless Learning Programs from upGrad',
    'Introduction to Back-End Development',
    'Skills Boost Arcade Trivia April 2025 Week 1'
  ];

  return (
    <section id="education" className="education">
      <h2 className="section-title">Education & Certifications</h2>
      
      <div className="education-container">
        <div className="education-list">
          {education.map((edu, index) => (
            <div key={index} className="education-card">
              <div className="education-icon">
                <FaGraduationCap />
              </div>
              <div className="education-content">
                <h3>{edu.degree}</h3>
                <h4>{edu.field}</h4>
                <div className="education-meta">
                  <span className="meta-item">
                    <FaUniversity /> {edu.institution}
                  </span>
                  <span className="meta-item">
                    <FaCalendar /> {edu.duration}
                  </span>
                </div>
                <ul className="education-description">
                  {edu.description.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="certifications">
          <h3>Certifications</h3>
          <div className="certifications-list">
            {certifications.map((cert, index) => (
              <div key={index} className="certification-item">
                <span className="cert-icon">🏆</span>
                <span>{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
