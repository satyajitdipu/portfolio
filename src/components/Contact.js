// Contact component - Contact information and message form
import React, { useState } from 'react';
import './Contact.css';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaGithub } from 'react-icons/fa';
import Reveal from './Reveal';
import { useLocalStorage } from '../utils/helpers';
import { defaultPortfolio } from '../data/defaultPortfolio';

const iconMap = {
  email: <FaEnvelope />,
  phone: <FaPhone />,
  location: <FaMapMarkerAlt />
};

const socialIconMap = {
  GitHub: <FaGithub />,
  LinkedIn: <FaLinkedin />
};

const Contact = () => {
  const [portfolio] = useLocalStorage('portfolioData', defaultPortfolio);
  const contact = (portfolio && portfolio.contact) || defaultPortfolio.contact;

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitMessage('');

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const emailBody = `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`;
    const mailtoLink = `mailto:${defaultPortfolio.personal.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;

    setSubmitMessage('Thank you for your message! Opening your email client...');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <Reveal className="section-header">
          <span className="eyebrow">Let's talk</span>
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            I'm open to backend / full-stack engineering opportunities — feel free to reach out.
          </p>
        </Reveal>

        <div className="contact-container">
          <Reveal className="contact-methods-section">
            <h3>Contact Information</h3>
            <div className="contact-details">
              {contact.contactMethods.map((item, index) => (
                <div key={index} className="contact-item">
                  <div className="contact-icon">{iconMap[item.type]}</div>
                  <div className="contact-text">
                    <h5>{item.label}</h5>
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
              <h4>Connect With Me</h4>
              <div className="social-links-grid">
                {contact.socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link-card"
                  >
                    <span className="social-icon">{socialIconMap[social.label]}</span>
                    <span>{social.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={150} className="contact-form-section">
            <form onSubmit={handleSubmit} className="contact-form" aria-label="Contact form">
              <h3>Send a Message</h3>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={errors.name ? 'error' : ''}
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What would you like to discuss?"
                  className={errors.subject ? 'error' : ''}
                />
                {errors.subject && <span className="error-message">{errors.subject}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me more..."
                  rows="6"
                  className={errors.message ? 'error' : ''}
                ></textarea>
                {errors.message && <span className="error-message">{errors.message}</span>}
              </div>

              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {submitMessage && (
                <div className="submit-message success">{submitMessage}</div>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
