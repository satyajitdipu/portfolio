import React, { useState, useContext, useEffect, useRef } from 'react';
import './Header.css';
import { FaBars, FaTimes, FaMoon, FaSun } from 'react-icons/fa';
import { ThemeContext } from '../App';

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' }
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const observerRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_ITEMS
      .map(item => document.getElementById(item.id))
      .filter(Boolean);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach(section => observerRef.current.observe(section));
    return () => observerRef.current && observerRef.current.disconnect();
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="navbar">
        <div className="logo">
          <h2>Satyajit<span>.dev</span></h2>
        </div>

        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          {NAV_ITEMS.map(item => (
            <li key={item.id}>
              <button
                onClick={() => scrollToSection(item.id)}
                className={activeSection === item.id ? 'active' : ''}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="header-actions">
          <a
            href={`${process.env.PUBLIC_URL}/Satyajit_Sahoo_Resume.pdf`}
            download="Satyajit_Sahoo_Resume.pdf"
            className="btn btn-resume"
          >
            Resume
          </a>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
          <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
