import React from 'react';
import './Skills.css';
import { 
  FaPython, 
  FaPhp, 
  FaJs, 
  FaReact, 
  FaLaravel, 
  FaGitAlt, 
  FaDatabase 
} from 'react-icons/fa';
import { 
  SiMysql, 
  SiPostgresql, 
  SiMongodb,
  SiPostman
} from 'react-icons/si';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Backend Development',
      skills: [
        { name: 'Python', icon: <FaPython />, level: 90 },
        { name: 'PHP', icon: <FaPhp />, level: 85 },
        { name: 'Laravel', icon: <FaLaravel />, level: 85 }
      ]
    },
    {
      title: 'Frontend & JavaScript',
      skills: [
        { name: 'JavaScript', icon: <FaJs />, level: 80 },
        { name: 'React', icon: <FaReact />, level: 75 }
      ]
    },
    {
      title: 'Database Management',
      skills: [
        { name: 'MySQL', icon: <SiMysql />, level: 85 },
        { name: 'PostgreSQL', icon: <SiPostgresql />, level: 80 },
        { name: 'MongoDB', icon: <SiMongodb />, level: 75 }
      ]
    },
    {
      title: 'Tools & Technologies',
      skills: [
        { name: 'Git', icon: <FaGitAlt />, level: 85 },
        { name: 'REST API', icon: <SiPostman />, level: 90 },
        { name: 'JSON', icon: <FaDatabase />, level: 90 }
      ]
    }
  ];

  const coreSkills = [
    'API Design & Integration',
    'System Architecture',
    'Database Optimization',
    'Problem Solving',
    'Clean Code Practices',
    'Performance Tuning',
    'Version Control',
    'CRM Development',
    'HR Management Systems'
  ];

  return (
    <section id="skills" className="skills">
      <h2 className="section-title">Skills & Expertise</h2>
      
      <div className="skills-grid">
        {skillCategories.map((category, index) => (
          <div key={index} className="skill-category">
            <h3>{category.title}</h3>
            <div className="skills-list">
              {category.skills.map((skill, idx) => (
                <div key={idx} className="skill-item">
                  <div className="skill-header">
                    <span className="skill-icon">{skill.icon}</span>
                    <span className="skill-name">{skill.name}</span>
                  </div>
                  <div className="skill-bar">
                    <div 
                      className="skill-progress" 
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="core-skills">
        <h3>Core Competencies</h3>
        <div className="core-skills-grid">
          {coreSkills.map((skill, index) => (
            <div key={index} className="core-skill-item">
              <span>✓</span> {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
