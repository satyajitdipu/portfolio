import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { ThemeContext } from './App';

// Mock the ThemeContext
const mockThemeContext = {
  darkMode: false,
  toggleTheme: jest.fn()
};

const MockThemeProvider = ({ children }) => (
  <ThemeContext.Provider value={mockThemeContext}>
    {children}
  </ThemeContext.Provider>
);

// Mock react-icons
jest.mock('react-icons/fa', () => ({
  FaGithub: () => <div data-testid="github-icon">GitHub</div>,
  FaLinkedin: () => <div data-testid="linkedin-icon">LinkedIn</div>,
  FaPhone: () => <div data-testid="phone-icon">Phone</div>,
  FaEnvelope: () => <div data-testid="envelope-icon">Envelope</div>,
  FaChevronUp: () => <div data-testid="chevron-up-icon">ChevronUp</div>,
  FaMoon: () => <div data-testid="moon-icon">Moon</div>,
  FaSun: () => <div data-testid="sun-icon">Sun</div>,
  FaBars: () => <div data-testid="bars-icon">Bars</div>,
  FaTimes: () => <div data-testid="times-icon">Times</div>,
  FaMapMarkerAlt: () => <div data-testid="map-marker-icon">MapMarker</div>,
  FaCalendar: () => <div data-testid="calendar-icon">Calendar</div>,
  FaCalendarAlt: () => <div data-testid="calendar-alt-icon">CalendarAlt</div>,
  FaGraduationCap: () => <div data-testid="graduation-icon">Graduation</div>,
  FaUniversity: () => <div data-testid="university-icon">University</div>,
  FaBriefcase: () => <div data-testid="briefcase-icon">Briefcase</div>,
  FaCode: () => <div data-testid="code-icon">Code</div>,
  FaDatabase: () => <div data-testid="database-icon">Database</div>,
  FaServer: () => <div data-testid="server-icon">Server</div>,
  FaCloud: () => <div data-testid="cloud-icon">Cloud</div>,
  FaTools: () => <div data-testid="tools-icon">Tools</div>,
  FaProjectDiagram: () => <div data-testid="project-icon">Project</div>,
  FaExternalLinkAlt: () => <div data-testid="external-link-icon">ExternalLink</div>,
  FaGithubAlt: () => <div data-testid="github-alt-icon">GitHubAlt</div>,
  FaGlobe: () => <div data-testid="globe-icon">Globe</div>,
  FaDownload: () => <div data-testid="download-icon">Download</div>,
  FaPrint: () => <div data-testid="print-icon">Print</div>,
  FaQuoteLeft: () => <div data-testid="quote-left-icon">QuoteLeft</div>,
  FaQuoteRight: () => <div data-testid="quote-right-icon">QuoteRight</div>,
  FaStar: () => <div data-testid="star-icon">Star</div>,
  FaCodeBranch: () => <div data-testid="code-branch-icon">CodeBranch</div>,
  FaSort: () => <div data-testid="sort-icon">Sort</div>,
  FaSearch: () => <div data-testid="search-icon">Search</div>,
  FaEye: () => <div data-testid="eye-icon">Eye</div>,
  FaTag: () => <div data-testid="tag-icon">Tag</div>,
  FaUser: () => <div data-testid="user-icon">User</div>,
  FaPaperPlane: () => <div data-testid="paper-plane-icon">PaperPlane</div>,
  FaCheck: () => <div data-testid="check-icon">Check</div>,
  FaTimes: () => <div data-testid="times-icon">Times</div>,
  FaSpinner: () => <div data-testid="spinner-icon">Spinner</div>,
  FaNewspaper: () => <div data-testid="newspaper-icon">Newspaper</div>,
  FaUsers: () => <div data-testid="users-icon">Users</div>,
  FaRocket: () => <div data-testid="rocket-icon">Rocket</div>,
  FaShieldAlt: () => <div data-testid="shield-icon">Shield</div>,
  FaPython: () => <div data-testid="python-fa-icon">Python</div>,
  FaPhp: () => <div data-testid="php-fa-icon">PHP</div>,
  FaJs: () => <div data-testid="js-fa-icon">JavaScript</div>,
  FaReact: () => <div data-testid="react-fa-icon">React</div>,
  FaLaravel: () => <div data-testid="laravel-fa-icon">Laravel</div>,
  FaGitAlt: () => <div data-testid="git-alt-fa-icon">GitAlt</div>,
  FaDatabase: () => <div data-testid="database-fa-icon">Database</div>,
  FaNodeJs: () => <div data-testid="nodejs-fa-icon">NodeJs</div>,
  FaTrophy: () => <div data-testid="trophy-icon">Trophy</div>,
  FaCertificate: () => <div data-testid="certificate-icon">Certificate</div>,
  FaChevronLeft: () => <div data-testid="chevron-left-icon">ChevronLeft</div>,
  FaChevronRight: () => <div data-testid="chevron-right-icon">ChevronRight</div>,
  FaVideo: () => <div data-testid="video-icon">Video</div>,
  FaComments: () => <div data-testid="comments-icon">Comments</div>,
  FaClock: () => <div data-testid="clock-icon">Clock</div>,
  FaCheckCircle: () => <div data-testid="check-circle-icon">CheckCircle</div>,
  FaHeart: () => <span data-testid="heart-icon">Heart</span>,
}));

jest.mock('react-icons/si', () => ({
  SiHackerrank: () => <div data-testid="hackerrank-icon">HackerRank</div>,
  SiLeetcode: () => <div data-testid="leetcode-icon">LeetCode</div>,
  SiPython: () => <div data-testid="python-icon">Python</div>,
  SiJavascript: () => <div data-testid="javascript-icon">JavaScript</div>,
  SiReact: () => <div data-testid="react-icon">React</div>,
  SiNodedotjs: () => <div data-testid="nodejs-icon">Node.js</div>,
  SiMongodb: () => <div data-testid="mongodb-icon">MongoDB</div>,
  SiPostgresql: () => <div data-testid="postgresql-icon">PostgreSQL</div>,
  SiMysql: () => <div data-testid="mysql-icon">MySQL</div>,
  SiLaravel: () => <div data-testid="laravel-icon">Laravel</div>,
  SiPhp: () => <div data-testid="php-icon">PHP</div>,
  SiDocker: () => <div data-testid="docker-icon">Docker</div>,
  SiGit: () => <div data-testid="git-icon">Git</div>,
  SiGithub: () => <div data-testid="github-si-icon">GitHub</div>,
  SiLinux: () => <div data-testid="linux-icon">Linux</div>,
  SiHtml5: () => <div data-testid="html5-icon">HTML5</div>,
  SiCss3: () => <div data-testid="css3-icon">CSS3</div>,
  SiMysql: () => <div data-testid="mysql-si-icon">MySQL</div>,
  SiPostgresql: () => <div data-testid="postgresql-si-icon">PostgreSQL</div>,
  SiMongodb: () => <div data-testid="mongodb-si-icon">MongoDB</div>,
  SiPostman: () => <div data-testid="postman-icon">Postman</div>,
  SiDjango: () => <div data-testid="django-icon">Django</div>,
  SiFlask: () => <div data-testid="flask-icon">Flask</div>,
  SiExpress: () => <div data-testid="express-icon">Express</div>,
  SiPytorch: () => <div data-testid="pytorch-icon">PyTorch</div>,
  SiScikitlearn: () => <div data-testid="scikitlearn-icon">ScikitLearn</div>,
  SiTypescript: () => <div data-testid="typescript-icon">TypeScript</div>,
  SiTailwindcss: () => <div data-testid="tailwind-icon">TailwindCSS</div>,
  SiBootstrap: () => <div data-testid="bootstrap-icon">Bootstrap</div>,
  SiSocketdotio: () => <div data-testid="socketio-icon">SocketIO</div>
}));

jest.mock('react-icons/md', () => ({
  MdEmail: () => <div data-testid="md-email-icon">Email</div>,
  MdPhone: () => <div data-testid="md-phone-icon">Phone</div>,
  MdLocationOn: () => <div data-testid="md-location-icon">Location</div>
}));

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders portfolio app', () => {
    render(
      <MockThemeProvider>
        <App />
      </MockThemeProvider>
    );
    const nameElement = screen.getByText('Satyajit Sahoo');
    expect(nameElement).toBeInTheDocument();
  });

  test('renders backend developer title', () => {
    render(
      <MockThemeProvider>
        <App />
      </MockThemeProvider>
    );
    const titleElement = screen.getByRole('heading', { level: 2, name: /Backend Developer/i });
    expect(titleElement).toBeInTheDocument();
  });
});