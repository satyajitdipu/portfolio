import React from 'react';
import './Skills.css';
import { 
  FaPython, 
  FaPhp, 
  FaJs, 
  FaReact, 
  FaLaravel, 
  FaGitAlt, 
  FaDatabase,
  FaNodeJs 
} from 'react-icons/fa';
import { 
  SiMysql, 
  SiPostgresql, 
  SiMongodb,
  SiPostman,
  SiDjango,
  SiFlask,
  SiExpress,
  SiPytorch,
  SiScikitlearn,
  SiTypescript,
  SiTailwindcss,
  SiBootstrap,
  SiSocketdotio
} from 'react-icons/si';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Backend Development',
      skills: [
        { name: 'Python', icon: <FaPython />, level: 90 },
        { name: 'Django', icon: <SiDjango />, level: 85 },
        { name: 'Flask', icon: <SiFlask />, level: 85 },
        { name: 'PHP', icon: <FaPhp />, level: 85 },
        { name: 'Laravel', icon: <FaLaravel />, level: 85 },
        { name: 'Node.js', icon: <FaNodeJs />, level: 80 },
        { name: 'Express', icon: <SiExpress />, level: 80 }
      ]
    },
    {
      title: 'Frontend Development',
      skills: [
        { name: 'JavaScript', icon: <FaJs />, level: 85 },
        { name: 'TypeScript', icon: <SiTypescript />, level: 80 },
        { name: 'React', icon: <FaReact />, level: 85 },
        { name: 'Tailwind CSS', icon: <SiTailwindcss />, level: 80 },
        { name: 'Bootstrap', icon: <SiBootstrap />, level: 80 }
      ]
    },
    {
      title: 'Database Management',
      skills: [
        { name: 'MySQL', icon: <SiMysql />, level: 85 },
        { name: 'PostgreSQL', icon: <SiPostgresql />, level: 85 },
        { name: 'MongoDB', icon: <SiMongodb />, level: 75 },
        { name: 'SQLite', icon: <FaDatabase />, level: 80 }
      ]
    },
    {
      title: 'Machine Learning & AI',
      skills: [
        { name: 'PyTorch', icon: <SiPytorch />, level: 80 },
        { name: 'scikit-learn', icon: <SiScikitlearn />, level: 85 },
        { name: 'Deep Learning', icon: <FaPython />, level: 75 }
      ]
    },
    {
      title: 'Tools & Technologies',
      skills: [
        { name: 'Git', icon: <FaGitAlt />, level: 90 },
        { name: 'REST API', icon: <SiPostman />, level: 90 },
        { name: 'Socket.io', icon: <SiSocketdotio />, level: 75 }
      ]
    }
  ];

  const coreSkills = [
    'Full-Stack Development',
    'API Design & Integration',
    'System Architecture',
    'Database Optimization',
    'Machine Learning & Computer Vision',
    'E-Commerce Solutions',
    'HR Management Systems',
    'Vendor Management',
    'RESTful Services',
    'Real-time Applications',
    'Problem Solving',
    'Clean Code Practices'
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
