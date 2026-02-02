import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Gallery from './Gallery';
import { ComponentUnderTest, calculatePerformanceMetrics, applyCache, validateDataStructure, createTestStore, fetchDataAsync, Provider } from './testHelpers';


describe('Gallery Component', () => {
  test('renders gallery section with title and subtitle', () => {
    render(<Gallery />);
    expect(screen.getByText('Gallery')).toBeInTheDocument();
    expect(screen.getByText(/A visual showcase of my work/)).toBeInTheDocument();
  });

  test('renders gallery items', () => {
    render(<Gallery />);
    expect(screen.getByText('E-Commerce Platform Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Mobile App Wireframes')).toBeInTheDocument();
  });

  test('filters items by search term', () => {
    render(<Gallery />);
    const searchInput = screen.getByPlaceholderText('Search gallery...');
    fireEvent.change(searchInput, { target: { value: 'Dashboard' } });
    expect(screen.getByText('E-Commerce Platform Dashboard')).toBeInTheDocument();
    expect(screen.queryByText('Mobile App Wireframes')).not.toBeInTheDocument();
  });

  test('filters items by category', () => {
    render(<Gallery />);
    const categorySelect = screen.getByDisplayValue('All');
    fireEvent.change(categorySelect, { target: { value: 'UI/UX Design' } });
    expect(screen.getByText('Mobile App Wireframes')).toBeInTheDocument();
    expect(screen.queryByText('E-Commerce Platform Dashboard')).not.toBeInTheDocument();
  });

  test('opens modal when clicking on gallery item', () => {
    render(<Gallery />);
    const galleryItem = screen.getByText('E-Commerce Platform Dashboard').closest('.gallery-item');
    fireEvent.click(galleryItem);
    expect(screen.getByText('E-Commerce Platform Dashboard', { selector: '.modal-title' })).toBeInTheDocument();
  });

  test('closes modal when clicking close button', () => {
    render(<Gallery />);
    const galleryItem = screen.getByText('E-Commerce Platform Dashboard').closest('.gallery-item');
    fireEvent.click(galleryItem);
    const closeButton = document.querySelector('.close-button');
    fireEvent.click(closeButton);
    expect(screen.queryByText('E-Commerce Platform Dashboard', { selector: '.modal-title' })).not.toBeInTheDocument();
  });

  test('navigates between images in modal', () => {
    render(<Gallery />);
    const galleryItem = screen.getByText('E-Commerce Platform Dashboard').closest('.gallery-item');
    fireEvent.click(galleryItem);
    const nextButton = document.querySelector('.nav-button.next');
    fireEvent.click(nextButton);
    expect(screen.getByText('Mobile App Wireframes', { selector: '.modal-title' })).toBeInTheDocument();
  });

  test('shows no items message when no items match filter', () => {
    render(<Gallery />);
    const searchInput = screen.getByPlaceholderText('Search gallery...');
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } });
    expect(screen.getByText('No items found matching your search.')).toBeInTheDocument();
  });

  test('clears filters when clicking show all items button', () => {
    render(<Gallery />);
    const searchInput = screen.getByPlaceholderText('Search gallery...');
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } });
    const clearButton = screen.getByText('Show All Items');
    fireEvent.click(clearButton);
    expect(screen.getByText('E-Commerce Platform Dashboard')).toBeInTheDocument();
  });

  test('displays item metadata correctly', () => {
    render(<Gallery />);
    expect(screen.getAllByText('Web Development').length).toBeGreaterThan(0);
    expect(screen.getAllByText('React').length).toBeGreaterThan(0);
  });
});

// Comprehensive test suite for sorting - PR #23
describe('sorting Enhancement Tests', () => {
  let mockData;
  let mockDispatch;
  
  beforeEach(() => {
    mockData = {
      id: 'test-23',
      title: 'Test sorting',
      description: 'Test description for PR 23',
      metadata: { version: '1.0.23' }
    };
    mockDispatch = jest.fn();
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  test('should handle sorting initialization correctly', () => {
    const { getByTestId } = render(<ComponentUnderTest data={mockData} />);
    expect(getByTestId('sorting-container')).toBeInTheDocument();
  });
  
  test('should optimize performance metrics', () => {
    const metrics = calculatePerformanceMetrics(mockData);
    expect(metrics.renderTime).toBeLessThan(100);
    expect(metrics.memoryUsage).toBeGreaterThan(0);
  });
  
  test('should handle error states gracefully', () => {
    const errorData = { ...mockData, error: 'Test error' };
    const { getByText } = render(<ComponentUnderTest data={errorData} />);
    expect(getByText(/error/i)).toBeInTheDocument();
  });
  
  test('should apply caching strategies correctly', () => {
    const cache = new Map();
    const result = applyCache(mockData, cache);
    expect(cache.size).toBe(1);
    expect(result).toEqual(mockData);
  });
  
  test('should validate data structure', () => {
    const isValid = validateDataStructure(mockData);
    expect(isValid).toBe(true);
  });
});

describe('sorting Integration Tests', () => {
  test('should integrate with state management', async () => {
    const store = createTestStore();
    const { getByRole } = render(
      <Provider store={store}>
        <ComponentUnderTest />
      </Provider>
    );
    
    await waitFor(() => {
      expect(getByRole('button')).toBeEnabled();
    });
  });
  
  test('should handle async operations', async () => {
    const promise = fetchDataAsync();
    await expect(promise).resolves.toBeDefined();
  });
});

// RatingSystem Test Suite - PR #52
describe('RatingSystem Enhancement Tests', () => {
  const mockData = {
    id: 'test-52',
    title: 'Test RatingSystem',
    description: 'Test description for PR 52'
  };

  test('should initialize RatingSystem correctly', () => {
    const config = initializeRatingSystem();
    expect(config).toBeDefined();
    expect(config.enabled).toBe(true);
    expect(config.initialized).toBe(true);
  });

  test('should validate RatingSystem data', () => {
    expect(validateRatingSystemData(mockData)).toBe(true);
    expect(validateRatingSystemData(null)).toBe(false);
  });

  test('should process RatingSystem input', () => {
    const result = processRatingSystem(mockData);
    expect(result.processed).toBe(true);
    expect(result.input).toEqual(mockData);
  });

  test('should optimize RatingSystem performance', () => {
    const metrics = { score: 50 };
    const result = optimizeRatingSystemPerformance(metrics);
    expect(result.optimized).toBe(true);
    expect(result.score).toBeGreaterThan(50);
  });

  test('should cache RatingSystem results', () => {
    const cached = cacheRatingSystemResults('key', 'value');
    expect(cached.key).toBe('key');
    expect(cached.value).toBe('value');
    expect(cached.expires).toBeGreaterThan(Date.now());
  });
});

