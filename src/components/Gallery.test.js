// Gallery Component Tests
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Gallery from './Gallery';
import { ThemeContext } from '../App';

// Mock window.scrollTo
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: jest.fn()
});

// Mock document.body.style
Object.defineProperty(document.body, 'style', {
  writable: true,
  value: {}
});

// Test wrapper component that provides ThemeContext
const TestWrapper = ({ children, darkMode = false }) => (
  <ThemeContext.Provider value={{ darkMode, toggleTheme: jest.fn() }}>
    {children}
  </ThemeContext.Provider>
);

// Mock window.scrollTo
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: jest.fn()
});

// Mock document.body.style
Object.defineProperty(document.body, 'style', {
  writable: true,
  value: {}
});

describe('Gallery Component', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
  });

  test('renders gallery title and subtitle', () => {
    render(
      <TestWrapper>
        <Gallery />
      </TestWrapper>
    );
    expect(screen.getByText('Project Gallery')).toBeInTheDocument();
    expect(screen.getByText(/Explore my portfolio/)).toBeInTheDocument();
  });

  test('displays all gallery items initially', () => {
    render(
      <TestWrapper>
        <Gallery />
      </TestWrapper>
    );
    // Should show 6 items per page initially
    const galleryItems = screen.getAllByRole('img');
    expect(galleryItems).toHaveLength(6);
  });

  test('filters items by category', () => {
    render(
      <TestWrapper>
        <Gallery />
      </TestWrapper>
    );

    // Click on Web Development category
    const webDevButton = screen.getByText('Web Development');
    fireEvent.click(webDevButton);

    // Should show filtered results
    expect(screen.getByText(/Showing \d+ of \d+ projects in Web Development/)).toBeInTheDocument();
  });

  test('searches items by title', () => {
    render(
      <TestWrapper>
        <Gallery />
      </TestWrapper>
    );

    const searchInput = screen.getByPlaceholderText('Search projects, technologies...');
    fireEvent.change(searchInput, { target: { value: 'E-commerce' } });

    expect(screen.getByText(/matching "E-commerce"/)).toBeInTheDocument();
  });

  test('searches items by technology', () => {
    render(<Gallery />);

    const searchInput = screen.getByPlaceholderText('Search projects, technologies...');
    fireEvent.change(searchInput, { target: { value: 'React' } });

    expect(screen.getByText(/matching "React"/)).toBeInTheDocument();
  });

  test('toggles featured projects only', () => {
    render(<Gallery />);

    const featuredCheckbox = screen.getByLabelText('Featured Only');
    fireEvent.click(featuredCheckbox);

    // Should show only featured projects
    const featuredItems = screen.getAllByText('⭐ Featured');
    expect(featuredItems.length).toBeGreaterThan(0);
  });

  test('sorts items by year', () => {
    render(<Gallery />);

    const sortSelect = screen.getByDisplayValue('Sort by Year');
    fireEvent.change(sortSelect, { target: { value: 'year' } });

    // Items should be sorted by year (newest first by default)
    const yearElements = screen.getAllByText(/\d{4}/);
    expect(yearElements.length).toBeGreaterThan(0);
  });

  test('changes sort order', () => {
    render(<Gallery />);

    const sortOrderButton = screen.getByTitle('Sort Descending');
    fireEvent.click(sortOrderButton);

    expect(screen.getByTitle('Sort Ascending')).toBeInTheDocument();
  });

  test('paginates through items', () => {
    render(<Gallery />);

    // Should start on page 1
    expect(screen.getByText('1')).toHaveClass('active');

    // Click next page
    const nextButton = screen.getByText('Next →');
    fireEvent.click(nextButton);

    // Should be on page 2
    expect(screen.getByText('2')).toHaveClass('active');
  });

  test('opens modal when clicking gallery item', () => {
    render(<Gallery />);

    const firstItem = screen.getAllByRole('img')[0];
    const itemContainer = firstItem.closest('.gallery-item');
    fireEvent.click(itemContainer);

    // Modal should be open
    expect(screen.getByText('×')).toBeInTheDocument();
  });

  test('closes modal when clicking close button', () => {
    render(<Gallery />);

    // Open modal
    const firstItem = screen.getAllByRole('img')[0];
    const itemContainer = firstItem.closest('.gallery-item');
    fireEvent.click(itemContainer);

    // Close modal
    const closeButton = screen.getByText('×');
    fireEvent.click(closeButton);

    // Modal should be closed
    expect(screen.queryByText('×')).not.toBeInTheDocument();
  });

  test('closes modal when clicking overlay', () => {
    render(<Gallery />);

    // Open modal
    const firstItem = screen.getAllByRole('img')[0];
    const itemContainer = firstItem.closest('.gallery-item');
    fireEvent.click(itemContainer);

    // Click overlay
    const overlay = screen.getByTestId ? screen.getByTestId('modal-overlay') :
                  document.querySelector('.modal-overlay');
    if (overlay) {
      fireEvent.click(overlay);
      // Modal should be closed
      expect(screen.queryByText('×')).not.toBeInTheDocument();
    }
  });

  test('closes modal on Escape key press', () => {
    render(<Gallery />);

    // Open modal
    const firstItem = screen.getAllByRole('img')[0];
    const itemContainer = firstItem.closest('.gallery-item');
    fireEvent.click(itemContainer);

    // Press Escape
    fireEvent.keyDown(document, { key: 'Escape' });

    // Modal should be closed
    expect(screen.queryByText('×')).not.toBeInTheDocument();
  });

  test('displays empty state when no items match filters', () => {
    render(<Gallery />);

    const searchInput = screen.getByPlaceholderText('Search projects, technologies...');
    fireEvent.change(searchInput, { target: { value: 'nonexistentproject' } });

    expect(screen.getByText('No projects found')).toBeInTheDocument();
    expect(screen.getByText('Try adjusting your search terms or filters')).toBeInTheDocument();
  });

  test('resets filters when clicking reset button in empty state', () => {
    render(<Gallery />);

    // Set a search that will return no results
    const searchInput = screen.getByPlaceholderText('Search projects, technologies...');
    fireEvent.change(searchInput, { target: { value: 'nonexistentproject' } });

    // Click reset button
    const resetButton = screen.getByText('Reset Filters');
    fireEvent.click(resetButton);

    // Search should be cleared
    expect(searchInput.value).toBe('');
    // Should show items again
    expect(screen.queryByText('No projects found')).not.toBeInTheDocument();
  });

  test('displays correct category counts', () => {
    render(<Gallery />);

    // Check that category buttons show counts
    expect(screen.getByText('(12)')).toBeInTheDocument(); // All projects
    expect(screen.getByText('(1)')).toBeInTheDocument(); // Some categories have 1 project
  });

  test('shows featured badge on featured items', () => {
    render(<Gallery />);

    const featuredBadges = screen.getAllByText('⭐ Featured');
    expect(featuredBadges.length).toBeGreaterThan(0);
  });

  test('displays technology tags in overlay on hover', () => {
    render(<Gallery />);

    const firstItem = screen.getAllByRole('img')[0].closest('.gallery-item');
    fireEvent.mouseEnter(firstItem);

    // Should show overlay with tech tags
    const techTags = document.querySelectorAll('.tech-tag');
    expect(techTags.length).toBeGreaterThan(0);
  });

  test('modal displays project details correctly', () => {
    render(<Gallery />);

    // Open modal for first item
    const firstItem = screen.getAllByRole('img')[0].closest('.gallery-item');
    fireEvent.click(firstItem);

    // Check modal content
    expect(screen.getByText('View Live Demo')).toBeInTheDocument();
    expect(screen.getByText('View Source Code')).toBeInTheDocument();
    expect(screen.getByText('Technologies Used:')).toBeInTheDocument();
  });

  test('pagination buttons are disabled appropriately', () => {
    render(<Gallery />);

    // On first page, Previous should be disabled
    const prevButton = screen.getByText('← Previous');
    expect(prevButton).toBeDisabled();

    // On first page, Next should be enabled
    const nextButton = screen.getByText('Next →');
    expect(nextButton).not.toBeDisabled();
  });

  test('scrolls to top when changing pages', () => {
    render(<Gallery />);

    const nextButton = screen.getByText('Next →');
    fireEvent.click(nextButton);

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  test('prevents body scroll when modal is open', () => {
    render(<Gallery />);

    // Open modal
    const firstItem = screen.getAllByRole('img')[0].closest('.gallery-item');
    fireEvent.click(firstItem);

    expect(document.body.style.overflow).toBe('hidden');

    // Close modal
    const closeButton = screen.getByText('×');
    fireEvent.click(closeButton);

    expect(document.body.style.overflow).toBe('unset');
  });

  test('displays correct results summary', () => {
    render(<Gallery />);

    expect(screen.getByText('Showing 6 of 12 projects')).toBeInTheDocument();
  });

  test('filters work in combination', () => {
    render(<Gallery />);

    // Set search term
    const searchInput = screen.getByPlaceholderText('Search projects, technologies...');
    fireEvent.change(searchInput, { target: { value: 'web' } });

    // Set category
    const webDevButton = screen.getByText('Web Development');
    fireEvent.click(webDevButton);

    // Should show combined filtered results
    expect(screen.getByText(/Showing \d+ of \d+ projects in Web Development matching "web"/)).toBeInTheDocument();
  });

  test('lazy loads images', () => {
    render(<Gallery />);

    const images = screen.getAllByRole('img');
    images.forEach(img => {
      expect(img).toHaveAttribute('loading', 'lazy');
    });
  });

  test('handles keyboard navigation in modal', () => {
    render(<Gallery />);

    // Open modal
    const firstItem = screen.getAllByRole('img')[0].closest('.gallery-item');
    fireEvent.click(firstItem);

    // Test that Escape closes modal (already tested above)
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByText('×')).not.toBeInTheDocument();
  });

  test('renders in dark mode', () => {
    // Mock dark mode
    mockThemeContext.darkMode = true;

    render(<Gallery />);

    // Should have dark class
    const gallery = document.querySelector('.gallery');
    expect(gallery).toHaveClass('dark');
  });

  test('handles edge case with single page of results', () => {
    render(<Gallery />);

    // Filter to show only a few items
    const searchInput = screen.getByPlaceholderText('Search projects, technologies...');
    fireEvent.change(searchInput, { target: { value: 'E-commerce Platform' } });

    // Should not show pagination for single result
    expect(screen.queryByText('← Previous')).not.toBeInTheDocument();
    expect(screen.queryByText('Next →')).not.toBeInTheDocument();
  });

  test('maintains filter state when navigating pages', () => {
    render(<Gallery />);

    // Apply a filter
    const webDevButton = screen.getByText('Web Development');
    fireEvent.click(webDevButton);

    // Navigate to next page
    const nextButton = screen.getByText('Next →');
    fireEvent.click(nextButton);

    // Filter should still be applied
    expect(screen.getByText(/in Web Development/)).toBeInTheDocument();
  });
});