// Contact component - Contact form and information section
import React, { useState } from 'react';
import './Contact.css';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaGithub } from 'react-icons/fa';
import { SiHackerrank } from 'react-icons/si';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create mailto link
    const mailtoLink = `mailto:satyajits1001@gmail.com?subject=Portfolio Contact from ${formData.name}&body=${formData.message}%0D%0A%0D%0AFrom: ${formData.name}%0D%0AEmail: ${formData.email}`;
    window.location.href = mailtoLink;
  };

  const contactInfo = [
    {
      icon: <FaPhone />,
      title: 'Phone',
      value: '6372754900',
      link: 'tel:6372754900'
    },
    {
      icon: <FaEnvelope />,
      title: 'Email',
      value: 'satyajits1001@gmail.com',
      link: 'mailto:satyajits1001@gmail.com'
    },
    {
      icon: <FaMapMarkerAlt />,
      title: 'Location',
      value: 'Bhubaneswar, Odisha, India',
      link: null
    }
  ];

  const socialLinks = [
    {
      icon: <FaLinkedin />,
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/satyajit-sahoo-backend'
    },
    {
      icon: <FaGithub />,
      name: 'GitHub',
      url: 'https://github.com/satyajitdipu'
    },
    {
      icon: <SiHackerrank />,
      name: 'HackerRank',
      url: 'https://www.hackerrank.com/profile/19btcse40'
    }
  ];

  return (
    <section id="contact" className="contact">
      <h2 className="section-title">Get In Touch</h2>
      
      <div className="contact-container">
        <div className="contact-info-section">
          <h3>Let's Connect</h3>
          <p className="contact-description">
            I'm currently open to new opportunities and exciting projects. 
            Whether you want to discuss a project, collaborate, or just say hi, 
            feel free to reach out!
          </p>

          <div className="contact-details">
            {contactInfo.map((item, index) => (
              <div key={index} className="contact-item">
                <div className="contact-icon">{item.icon}</div>
                <div className="contact-text">
                  <h4>{item.title}</h4>
                  {item.link ? (
                    <a href={item.link}>{item.value}</a>
                  ) : (
                    <p>{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="social-links-section">
            <h4>Find Me On</h4>
            <div className="social-links-grid">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link-card"
                >
                  <span className="social-icon">{social.icon}</span>
                  <span>{social.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="contact-form-section">
          <form onSubmit={handleSubmit} className="contact-form">
            <h3>Send a Message</h3>
            
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message here..."
                rows="5"
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
