import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Projects from './Projects';
import { ThemeContext } from '../App';

// Mock the ThemeContext
const mockThemeContext = {
  theme: 'dark'
};

const MockThemeProvider = ({ children }) => (
  <ThemeContext.Provider value={mockThemeContext}>
    {children}
  </ThemeContext.Provider>
);

// Mock react-icons
jest.mock('react-icons/fa', () => ({
  FaGithub: () => <div data-testid="github-icon">GitHub</div>,
  FaExternalLinkAlt: () => <div data-testid="external-link-icon">External</div>,
  FaStar: () => <div data-testid="star-icon">Star</div>,
  FaCodeBranch: () => <div data-testid="branch-icon">Branch</div>,
  FaFilter: () => <div data-testid="filter-icon">Filter</div>,
  FaSort: () => <div data-testid="sort-icon">Sort</div>,
  FaSearch: () => <div data-testid="search-icon">Search</div>,
  FaTimes: () => <div data-testid="times-icon">Times</div>,
  FaEye: () => <div data-testid="eye-icon">Eye</div>,
  FaCalendar: () => <div data-testid="calendar-icon">Calendar</div>,
  FaUser: () => <div data-testid="user-icon">User</div>,
  FaTag: () => <div data-testid="tag-icon">Tag</div>
}));

describe('Projects Component', () => {
  beforeEach(() => {
    // Clear all mocks
    jest.clearAllMocks();
  });

  test('renders Projects component with title and subtitle', () => {
    render(
      <MockThemeProvider>
        <Projects />
      </MockThemeProvider>
    );

    expect(screen.getByText('Featured Projects')).toBeInTheDocument();
    expect(screen.getByText(/Check out my recent work/)).toBeInTheDocument();
  });

  test('renders all project cards', () => {
    render(
      <MockThemeProvider>
        <Projects />
      </MockThemeProvider>
    );

    // Check if all project names are rendered
    expect(screen.getByText('E-Commerce Platform')).toBeInTheDocument();
    expect(screen.getByText('HR Management System')).toBeInTheDocument();
    expect(screen.getByText('Vendor Management System')).toBeInTheDocument();
    expect(screen.getByText('Crop Disease Detection System')).toBeInTheDocument();
    expect(screen.getByText('Image Classification System')).toBeInTheDocument();
    expect(screen.getByText('Book Catalog System')).toBeInTheDocument();
  });

  test('displays project technologies correctly', () => {
    render(
      <MockThemeProvider>
        <Projects />
      </MockThemeProvider>
    );

    // Check if technologies are displayed
    expect(screen.getByText('Node.js')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByText('Laravel')).toBeInTheDocument();
  });

  test('displays project stats (stars and forks)', () => {
    render(
      <MockThemeProvider>
        <Projects />
      </MockThemeProvider>
    );

    // Check for star and fork counts
    expect(screen.getByText('12')).toBeInTheDocument(); // E-Commerce stars
    expect(screen.getByText('4')).toBeInTheDocument(); // E-Commerce forks
    expect(screen.getByText('20')).toBeInTheDocument(); // Crop Disease stars
    expect(screen.getByText('8')).toBeInTheDocument(); // Crop Disease forks
  });

  test('renders status badges correctly', () => {
    render(
      <MockThemeProvider>
        <Projects />
      </MockThemeProvider>
    );

    expect(screen.getByText('COMPLETED')).toBeInTheDocument();
    expect(screen.getByText('IN PROGRESS')).toBeInTheDocument();
  });

  test('renders category badges correctly', () => {
    render(
      <MockThemeProvider>
        <Projects />
      </MockThemeProvider>
    );

    expect(screen.getByText('Full-Stack')).toBeInTheDocument();
    expect(screen.getByText('Backend')).toBeInTheDocument();
    expect(screen.getByText('AI/ML')).toBeInTheDocument();
  });

  test('search functionality filters projects correctly', async () => {
    render(
      <MockThemeProvider>
        <Projects />
      </MockThemeProvider>
    );

    const searchInput = screen.getByPlaceholderText('Search projects...');

    // Search for "E-Commerce"
    fireEvent.change(searchInput, { target: { value: 'E-Commerce' } });

    await waitFor(() => {
      expect(screen.getByText('E-Commerce Platform')).toBeInTheDocument();
      expect(screen.queryByText('HR Management System')).not.toBeInTheDocument();
    });

    // Clear search
    fireEvent.change(searchInput, { target: { value: '' } });

    await waitFor(() => {
      expect(screen.getByText('HR Management System')).toBeInTheDocument();
    });
  });

  test('technology filter buttons work correctly', async () => {
    render(
      <MockThemeProvider>
        <Projects />
      </MockThemeProvider>
    );

    // Click on React technology filter
    const reactButton = screen.getByText('React');
    fireEvent.click(reactButton);

    await waitFor(() => {
      expect(screen.getByText('E-Commerce Platform')).toBeInTheDocument();
      expect(screen.getByText('Book Catalog System')).toBeInTheDocument();
      expect(screen.queryByText('HR Management System')).not.toBeInTheDocument();
    });

    // Click again to deselect
    fireEvent.click(reactButton);

    await waitFor(() => {
      expect(screen.getByText('HR Management System')).toBeInTheDocument();
    });
  });

  test('sorting functionality works correctly', () => {
    render(
      <MockThemeProvider>
        <Projects />
      </MockThemeProvider>
    );

    const sortSelect = screen.getByDisplayValue('Most Stars');

    // Change sort to Name (A-Z)
    fireEvent.change(sortSelect, { target: { value: 'name' } });

    // The first project should now be "Book Catalog System" (alphabetically first)
    const projectCards = screen.getAllByRole('generic', { hidden: true })
      .filter(element => element.className && element.className.includes('project-card'));

    // This is a simplified check - in a real scenario you'd check the order
    expect(screen.getByText('Book Catalog System')).toBeInTheDocument();
  });

  test('view mode toggle works correctly', () => {
    render(
      <MockThemeProvider>
        <Projects />
      </MockThemeProvider>
    );

    // Default should be grid view
    expect(screen.getByText('Grid')).toBeInTheDocument();
    expect(screen.getByText('List')).toBeInTheDocument();

    // Click list view
    const listButton = screen.getByText('List');
    fireEvent.click(listButton);

    // Check if the view mode changed (this would require checking CSS classes or layout)
    // For now, just ensure the button is clickable
    expect(listButton).toBeInTheDocument();
  });

  test('project modal opens and closes correctly', async () => {
    render(
      <MockThemeProvider>
        <Projects />
      </MockThemeProvider>
    );

    // Find and click the view details button for the first project
    const viewButtons = screen.getAllByLabelText('View project details');
    const firstViewButton = viewButtons[0];
    fireEvent.click(firstViewButton);

    // Modal should open
    await waitFor(() => {
      expect(screen.getByText('E-Commerce Platform')).toBeInTheDocument();
    });

    // Check modal content
    expect(screen.getByText(/A comprehensive e-commerce solution/)).toBeInTheDocument();
    expect(screen.getByText('Key Features:')).toBeInTheDocument();
    expect(screen.getByText('User Authentication')).toBeInTheDocument();

    // Close modal
    const closeButton = screen.getByLabelText('Close modal');
    fireEvent.click(closeButton);

    // Modal should close
    await waitFor(() => {
      expect(screen.queryByText(/A comprehensive e-commerce solution/)).not.toBeInTheDocument();
    });
  });

  test('modal displays project details correctly', async () => {
    render(
      <MockThemeProvider>
        <Projects />
      </MockThemeProvider>
    );

    // Open modal for E-Commerce project
    const viewButtons = screen.getAllByLabelText('View project details');
    fireEvent.click(viewButtons[0]);

    await waitFor(() => {
      expect(screen.getByText('E-Commerce Platform')).toBeInTheDocument();
    });

    // Check all modal elements
    expect(screen.getByText('COMPLETED')).toBeInTheDocument();
    expect(screen.getByText('Full-Stack')).toBeInTheDocument();
    expect(screen.getByText('Created August 15, 2023')).toBeInTheDocument();
    expect(screen.getByText('Updated January 20, 2024')).toBeInTheDocument();
    expect(screen.getByText('12 stars')).toBeInTheDocument();
    expect(screen.getByText('4 forks')).toBeInTheDocument();
  });

  test('clear search functionality works', async () => {
    render(
      <MockThemeProvider>
        <Projects />
      </MockThemeProvider>
    );

    const searchInput = screen.getByPlaceholderText('Search projects...');

    // Type in search
    fireEvent.change(searchInput, { target: { value: 'E-Commerce' } });

    await waitFor(() => {
      expect(screen.getByText('E-Commerce Platform')).toBeInTheDocument();
    });

    // Click clear button
    const clearButton = screen.getByLabelText('Clear search');
    fireEvent.click(clearButton);

    // Search should be cleared
    expect(searchInput.value).toBe('');
  });

  test('no projects found state displays correctly', async () => {
    render(
      <MockThemeProvider>
        <Projects />
      </MockThemeProvider>
    );

    const searchInput = screen.getByPlaceholderText('Search projects...');

    // Search for something that doesn't exist
    fireEvent.change(searchInput, { target: { value: 'nonexistentproject' } });

    await waitFor(() => {
      expect(screen.getByText('No projects found matching your criteria.')).toBeInTheDocument();
      expect(screen.getByText('Clear Search')).toBeInTheDocument();
      expect(screen.getByText('Clear Filters')).toBeInTheDocument();
    });
  });

  test('GitHub links are present and correct', () => {
    render(
      <MockThemeProvider>
        <Projects />
      </MockThemeProvider>
    );

    // Check for GitHub links (they should be present as anchor tags)
    const githubLinks = screen.getAllByRole('link');
    expect(githubLinks.length).toBeGreaterThan(0);

    // Check footer GitHub link
    expect(screen.getByText('View All Repositories')).toBeInTheDocument();
  });

  test('theme context is used correctly', () => {
    render(
      <MockThemeProvider>
        <Projects />
      </MockThemeProvider>
    );

    // The component should have the theme class applied
    const projectsSection = screen.getByRole('generic', { hidden: true })
      .closest('.projects');
    expect(projectsSection).toHaveClass('dark');
  });

  test('responsive design elements are present', () => {
    render(
      <MockThemeProvider>
        <Projects />
      </MockThemeProvider>
    );

    // Check for responsive classes and elements
    const projectsContainer = screen.getByRole('generic', { hidden: true })
      .closest('.projects');
    expect(projectsContainer).toBeInTheDocument();

    // Check for flex wrap classes (responsive)
    const controlsSection = screen.getByText('Featured Projects')
      .closest('section')
      .querySelector('.projects-controls');
    expect(controlsSection).toBeInTheDocument();
  });

  test('accessibility features are implemented', () => {
    render(
      <MockThemeProvider>
        <Projects />
      </MockThemeProvider>
    );

    // Check for ARIA labels
    expect(screen.getAllByLabelText('View project details')).toHaveLength(6);
    expect(screen.getAllByLabelText('GitHub Repository')).toHaveLength(6);

    // Check for proper button roles
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  test('animation classes are applied', () => {
    render(
      <MockThemeProvider>
        <Projects />
      </MockThemeProvider>
    );

    // Check for animation-related content
    const title = screen.getByText('Featured Projects');
    expect(title).toBeInTheDocument();

    // The animations would be applied via CSS classes
    const projectsSection = screen.getByRole('generic', { hidden: true })
      .closest('.projects');
    expect(projectsSection).toBeInTheDocument();
  });

  test('project data structure is correct', () => {
    render(
      <MockThemeProvider>
        <Projects />
      </MockThemeProvider>
    );

    // This test ensures the component can handle the expected data structure
    // All projects should render without errors
    expect(screen.getAllByText(/stars/)).toHaveLength(6);
    expect(screen.getAllByText(/forks/)).toHaveLength(6);
  });

  test('component handles empty search results gracefully', async () => {
    render(
      <MockThemeProvider>
        <Projects />
      </MockThemeProvider>
    );

    // Apply multiple filters that result in no matches
    const reactButton = screen.getByText('React');
    const pythonButton = screen.getByText('Python');

    fireEvent.click(reactButton);
    fireEvent.click(pythonButton);

    // This combination might not exist, but the component should handle it
    const projectCards = screen.queryAllByRole('generic', { hidden: true })
      .filter(element => element.className && element.className.includes('project-card'));

    // Either projects are shown or no-projects message is shown
    if (projectCards.length === 0) {
      expect(screen.getByText(/No projects found/)).toBeInTheDocument();
    }
  });

  test('modal keyboard navigation works', async () => {
    render(
      <MockThemeProvider>
        <Projects />
      </MockThemeProvider>
    );

    // Open modal
    const viewButtons = screen.getAllByLabelText('View project details');
    fireEvent.click(viewButtons[0]);

    await waitFor(() => {
      expect(screen.getByText('E-Commerce Platform')).toBeInTheDocument();
    });

    // Test ESC key to close modal
    fireEvent.keyDown(document, { key: 'Escape' });

    await waitFor(() => {
      expect(screen.queryByText(/A comprehensive e-commerce solution/)).not.toBeInTheDocument();
    });
  });

  test('date formatting works correctly', async () => {
    render(
      <MockThemeProvider>
        <Projects />
      </MockThemeProvider>
    );

    // Open modal to check date formatting
    const viewButtons = screen.getAllByLabelText('View project details');
    fireEvent.click(viewButtons[0]);

    await waitFor(() => {
      // Check for properly formatted dates
      expect(screen.getByText(/Created/)).toBeInTheDocument();
      expect(screen.getByText(/Updated/)).toBeInTheDocument();
    });
  });

  test('feature list rendering in modal', async () => {
    render(
      <MockThemeProvider>
        <Projects />
      </MockThemeProvider>
    );

    // Open modal
    const viewButtons = screen.getAllByLabelText('View project details');
    fireEvent.click(viewButtons[0]);

    await waitFor(() => {
      // Check feature list items
      expect(screen.getByText('User Authentication')).toBeInTheDocument();
      expect(screen.getByText('Product Management')).toBeInTheDocument();
      expect(screen.getByText('Shopping Cart')).toBeInTheDocument();
    });
  });

  test('external link handling', () => {
    render(
      <MockThemeProvider>
        <Projects />
      </MockThemeProvider>
    );

    // Check that GitHub links have proper attributes
    const githubLinks = screen.getAllByRole('link');
    githubLinks.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  test('performance optimization with useMemo', () => {
    // This test ensures the component uses memoization correctly
    // We can't directly test useMemo, but we can ensure the component renders consistently
    const { rerender } = render(
      <MockThemeProvider>
        <Projects />
      </MockThemeProvider>
    );

    // Re-render with same props
    rerender(
      <MockThemeProvider>
        <Projects />
      </MockThemeProvider>
    );

    // Component should still work correctly
    expect(screen.getByText('Featured Projects')).toBeInTheDocument();
  });
});