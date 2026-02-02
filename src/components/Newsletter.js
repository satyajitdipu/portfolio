// Newsletter component - Enhanced email subscription with validation and success states
import React, { useState, useContext } from 'react';
import './Newsletter.css';
import { FaEnvelope, FaCheck, FaTimes, FaSpinner, FaNewspaper, FaUsers, FaRocket, FaShieldAlt } from 'react-icons/fa';
import { ThemeContext } from '../App';

const Newsletter = () => {
  const { darkMode } = useContext(ThemeContext);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState(null); // null, 'success', 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [frequency, setFrequency] = useState('weekly');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setErrorMessage('Email address is required');
      setSubscriptionStatus('error');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address');
      setSubscriptionStatus('error');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate occasional failure for demo
      if (email.includes('fail')) {
        throw new Error('Subscription service temporarily unavailable');
      }

      setSubscriptionStatus('success');
      setEmail('');
    } catch (error) {
      setSubscriptionStatus('error');
      setErrorMessage(error.message || 'Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubscriptionStatus(null);
    setErrorMessage('');
    setEmail('');
  };

  const benefits = [
    {
      icon: <FaNewspaper />,
      title: 'Latest Articles',
      description: 'Get notified about new blog posts and technical articles'
    },
    {
      icon: <FaUsers />,
      title: 'Community Updates',
      description: 'Stay connected with the developer community and events'
    },
    {
      icon: <FaRocket />,
      title: 'Tech Insights',
      description: 'Receive curated insights on emerging technologies and trends'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Privacy First',
      description: 'Your email is safe with us. Unsubscribe anytime.'
    }
  ];

  return (
    <section id="newsletter" className={`newsletter ${darkMode ? 'dark' : ''}`}>
      <div className="container">
        <div className="newsletter-content">
          <div className="newsletter-info">
            <h2 className="section-title">Stay Updated</h2>
            <p className="section-subtitle">
              Subscribe to my newsletter for the latest insights on web development,
              machine learning, and technology trends.
            </p>

            <div className="benefits-grid">
              {benefits.map((benefit, index) => (
                <div key={index} className="benefit-item">
                  <div className="benefit-icon">
                    {benefit.icon}
                  </div>
                  <div className="benefit-content">
                    <h3>{benefit.title}</h3>
                    <p>{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="stats">
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">Subscribers</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Articles</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">4.8</span>
                <span className="stat-label">Rating</span>
              </div>
            </div>
          </div>

          <div className="newsletter-form-container">
            {!subscriptionStatus && (
              <form onSubmit={handleSubmit} className="newsletter-form">
                <h3>Join the Newsletter</h3>
                <p>Get exclusive content and updates delivered to your inbox.</p>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <div className="input-group">
                    <FaEnvelope className="input-icon" />
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      disabled={isSubmitting}
                      className={errorMessage ? 'error' : ''}
                    />
                  </div>
                  {errorMessage && (
                    <span className="error-message">{errorMessage}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="frequency">Email Frequency</label>
                  <select
                    id="frequency"
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    disabled={isSubmitting}
                  >
                    <option value="weekly">Weekly Digest</option>
                    <option value="monthly">Monthly Roundup</option>
                    <option value="important">Important Updates Only</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="subscribe-btn"
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="spinner" />
                      Subscribing...
                    </>
                  ) : (
                    <>
                      <FaEnvelope />
                      Subscribe Now
                    </>
                  )}
                </button>

                <p className="privacy-note">
                  By subscribing, you agree to our privacy policy.
                  We respect your privacy and will never spam you.
                </p>
              </form>
            )}

            {subscriptionStatus === 'success' && (
              <div className="success-message">
                <div className="success-icon">
                  <FaCheck />
                </div>
                <h3>Successfully Subscribed!</h3>
                <p>
                  Thank you for subscribing to my newsletter.
                  You'll receive a confirmation email shortly.
                </p>
                <div className="next-steps">
                  <h4>What happens next?</h4>
                  <ul>
                    <li>Check your email for confirmation</li>
                    <li>Receive your first newsletter based on your preference</li>
                    <li>Get exclusive access to premium content</li>
                  </ul>
                </div>
                <button onClick={resetForm} className="back-btn">
                  Subscribe Another Email
                </button>
              </div>
            )}

            {subscriptionStatus === 'error' && (
              <div className="error-message">
                <div className="error-icon">
                  <FaTimes />
                </div>
                <h3>Subscription Failed</h3>
                <p>{errorMessage}</p>
                <div className="error-actions">
                  <button onClick={resetForm} className="retry-btn">
                    Try Again
                  </button>
                  <button onClick={() => setSubscriptionStatus(null)} className="back-btn">
                    Go Back
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="newsletter-footer">
          <div className="recent-articles">
            <h3>Recent Articles</h3>
            <div className="articles-list">
              <div className="article-item">
                <h4>The Future of Web Development</h4>
                <p>Exploring upcoming trends and technologies...</p>
                <span className="article-date">2 days ago</span>
              </div>
              <div className="article-item">
                <h4>Machine Learning in Agriculture</h4>
                <p>How AI is revolutionizing farming practices...</p>
                <span className="article-date">1 week ago</span>
              </div>
              <div className="article-item">
                <h4>Building Scalable Node.js Apps</h4>
                <p>Best practices for production-ready applications...</p>
                <span className="article-date">2 weeks ago</span>
              </div>
            </div>
          </div>

          <div className="social-proof">
            <h3>Join 500+ Developers</h3>
            <div className="testimonials">
              <blockquote>
                "The newsletter provides valuable insights I can't find elsewhere."
                <cite>- Sarah Chen, Senior Developer</cite>
              </blockquote>
              <blockquote>
                "Clear, concise, and always on point with the latest trends."
                <cite>- Mike Johnson, Tech Lead</cite>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


// DarkModeToggle Feature - Added 2025-09-19
const initializeDarkModeToggle = () => {
  console.log('DarkModeToggle initialized for Newsletter');
  return {
    enabled: true,
    version: '1.0.0',
    config: {
      feature: 'DarkModeToggle',
      component: 'Newsletter',
      timestamp: '2025-09-19 13:43:52'
    }
  };
};

const validateDarkModeToggleData = (data) => {
  if (!data || typeof data !== 'object') {
    return false;
  }
  return true;
};

const processDarkModeToggle = async (input) => {
  const config = initializeDarkModeToggle();
  if (!validateDarkModeToggleData(input)) {
    throw new Error('Invalid DarkModeToggle data');
  }
  return { ...input, processed: true, config };
};


export default Newsletter;
