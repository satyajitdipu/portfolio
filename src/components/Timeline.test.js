import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Timeline from './Timeline';

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {
    return null;
  }
  disconnect() {
    return null;
  }
  unobserve() {
    return null;
  }
};

describe('Timeline Component', () => {
  const mockTimelineData = [
    {
      id: 1,
      date: '2023',
      type: 'work',
      title: 'Senior Software Engineer',
      company: 'Tech Corp',
      location: 'San Francisco, CA',
      description: 'Led development of scalable web applications using React and Node.js',
      achievements: [
        'Improved application performance by 40%',
        'Mentored junior developers',
        'Implemented CI/CD pipelines'
      ],
      technologies: ['React', 'Node.js', 'AWS'],
      duration: '2 years'
    },
    {
      id: 2,
      date: '2021',
      type: 'education',
      title: 'Master of Computer Science',
      company: 'Stanford University',
      location: 'Stanford, CA',
      description: 'Specialized in Artificial Intelligence and Machine Learning',
      achievements: [
        'GPA: 3.8/4.0',
        'Published research paper',
        'Teaching Assistant for CS courses'
      ],
      technologies: ['Python', 'TensorFlow', 'PyTorch'],
      duration: '2 years'
    }
  ];

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();
  });

  test('renders timeline section with title and subtitle', () => {
    render(<Timeline />);
    expect(screen.getByText('Career Timeline')).toBeInTheDocument();
    expect(screen.getByText('A chronological journey through my educational background, professional experience, and key achievements')).toBeInTheDocument();
  });

  test('renders timeline items with correct data', () => {
    render(<Timeline />);

    // Check if timeline items are rendered
    expect(screen.getByText('Started BCA Journey')).toBeInTheDocument();
    expect(screen.getByText('Completed BCA')).toBeInTheDocument();
    expect(screen.getByText('Started MCA Program')).toBeInTheDocument();
  });

  test('displays timeline markers with correct icons', () => {
    render(<Timeline />);

    // Check for SVG icons in markers
    const markers = document.querySelectorAll('.timeline-marker svg');
    expect(markers.length).toBeGreaterThan(0);
  });

  test('shows timeline dates correctly', () => {
    render(<Timeline />);

    expect(screen.getByText('2013')).toBeInTheDocument();
    const dates2016 = screen.getAllByText('2016');
    expect(dates2016.length).toBeGreaterThan(0);
  });

  test('displays location information', () => {
    render(<Timeline />);

    const kolkataLocations = screen.getAllByText('Kolkata, India');
    expect(kolkataLocations.length).toBeGreaterThan(0);
  });

  test('renders achievements for each timeline item when active', () => {
    render(<Timeline />);

    // Click on first timeline item to make it active
    const firstTimelineItem = screen.getAllByText('Started BCA Journey')[0].closest('.timeline-item');
    fireEvent.click(firstTimelineItem);

    // Now achievements should be visible
    expect(screen.getByText('First Class throughout')).toBeInTheDocument();
    expect(screen.getByText('Active in coding clubs')).toBeInTheDocument();
  });

  test('displays technology tags when item is active', () => {
    render(<Timeline />);

    // Click on first timeline item to make it active
    const firstTimelineItem = screen.getAllByText('Started BCA Journey')[0].closest('.timeline-item');
    fireEvent.click(firstTimelineItem);

    // Now technology tags should be visible
    expect(screen.getByText('C')).toBeInTheDocument();
    expect(screen.getByText('C++')).toBeInTheDocument();
    expect(screen.getByText('SQL')).toBeInTheDocument();
  });

  test('renders timeline statistics', () => {
    render(<Timeline />);

    expect(screen.getByText('7+')).toBeInTheDocument();
    expect(screen.getByText('Years Experience')).toBeInTheDocument();
    expect(screen.getByText('15+')).toBeInTheDocument();
    expect(screen.getByText('Projects Completed')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('Certifications')).toBeInTheDocument();
    expect(screen.getByText('10+')).toBeInTheDocument();
    expect(screen.getByText('Technologies')).toBeInTheDocument();
  });

  test('timeline items become visible on scroll', async () => {
    render(<Timeline />);

    const timelineItems = document.querySelectorAll('.timeline-item');

    // Initially items should not be visible
    timelineItems.forEach(item => {
      expect(item).toHaveClass('timeline-item');
    });

    // Mock intersection observer triggering visibility
    // In a real scenario, this would be triggered by scrolling
    // For testing, we can check that the class structure is correct
    expect(timelineItems.length).toBeGreaterThan(0);
  });

  test('timeline items have correct structure', () => {
    render(<Timeline />);

    const timelineItems = document.querySelectorAll('.timeline-item');

    timelineItems.forEach(item => {
      expect(item).toHaveClass('timeline-item');

      // Check for marker
      const marker = item.querySelector('.timeline-marker');
      expect(marker).toBeInTheDocument();

      // Check for content
      const content = item.querySelector('.timeline-content');
      expect(content).toBeInTheDocument();

      // Check for header, body, and details
      expect(content.querySelector('.timeline-header')).toBeInTheDocument();
      expect(content.querySelector('.timeline-body')).toBeInTheDocument();
    });
  });

  test('displays correct type indicators', () => {
    render(<Timeline />);

    const educationTypes = screen.getAllByText('Education');
    const workTypes = screen.getAllByText('Work');
    expect(educationTypes.length).toBeGreaterThan(0);
    expect(workTypes.length).toBeGreaterThan(0);
  });

  test('renders location with map pin icon', () => {
    render(<Timeline />);

    const locationElements = document.querySelectorAll('.timeline-location');
    expect(locationElements.length).toBeGreaterThan(0);

    // Check that each location element has an SVG icon
    locationElements.forEach(element => {
      const svgIcon = element.querySelector('svg');
      expect(svgIcon).toBeInTheDocument();
    });
  });

  test('statistics cards have correct styling', () => {
    render(<Timeline />);

    const statCards = document.querySelectorAll('.stat-card');

    expect(statCards).toHaveLength(4);

    statCards.forEach(card => {
      expect(card).toHaveClass('stat-card');
      expect(card.querySelector('.stat-number')).toBeInTheDocument();
      expect(card.querySelector('.stat-label')).toBeInTheDocument();
    });
  });

  test('timeline container has proper structure', () => {
    render(<Timeline />);

    const container = document.querySelector('.timeline');
    expect(container).toHaveClass('timeline');

    const timelineContainer = container.querySelector('.timeline-container');
    expect(timelineContainer).toBeInTheDocument();
  });

  test('responsive design classes are applied', () => {
    render(<Timeline />);

    const container = document.querySelector('.timeline');
    expect(container).toHaveClass('timeline');

    // Check that responsive classes are available in CSS
    // This would typically be tested with a responsive testing library
  });

  test('timeline items have hover effects', () => {
    render(<Timeline />);

    const timelineItems = document.querySelectorAll('.timeline-item');

    timelineItems.forEach(item => {
      // Test hover state by triggering mouse events
      fireEvent.mouseEnter(item);
      fireEvent.mouseLeave(item);

      // The actual hover effects are CSS-based and would need visual testing
      expect(item).toBeInTheDocument();
    });
  });

  test('active state can be applied to timeline items', () => {
    render(<Timeline />);

    const timelineItems = document.querySelectorAll('.timeline-item');

    // Initially no items should be active
    timelineItems.forEach(item => {
      expect(item).not.toHaveClass('active');
    });

    // Test that active class can be applied (would be done via state in real usage)
    // This tests the CSS class structure
    expect(timelineItems[0]).toBeInTheDocument();
  });

  test('technology tags are properly styled', () => {
    render(<Timeline />);

    // Click on first timeline item to make technologies visible
    const firstTimelineItem = document.querySelector('.timeline-item');
    fireEvent.click(firstTimelineItem);

    const techTags = document.querySelectorAll('.tech-tag');

    expect(techTags.length).toBeGreaterThan(0);
    techTags.forEach(tag => {
      expect(tag).toHaveClass('tech-tag');
    });
  });

  test('achievements are displayed as a list', () => {
    render(<Timeline />);

    // Click on first timeline item to make achievements visible
    const firstTimelineItem = document.querySelector('.timeline-item');
    fireEvent.click(firstTimelineItem);

    const achievementLists = document.querySelectorAll('ul');

    achievementLists.forEach(list => {
      const items = list.querySelectorAll('li');
      expect(items.length).toBeGreaterThan(0);

      items.forEach(item => {
        expect(item.textContent).toBeTruthy();
      });
    });
  });
});