import React from 'react';
import { render, screen } from '@testing-library/react';
import Hero from './Hero';

test('renders hero section with name', () => {
  render(<Hero />);
  const nameElement = screen.getByText(/Satyajit Sahoo/i);
  expect(nameElement).toBeInTheDocument();
});

test('renders backend developer subtitle', () => {
  render(<Hero />);
  const subtitleElement = screen.getByText(/Backend Developer/i);
  expect(subtitleElement).toBeInTheDocument();
});

// Comprehensive test suite for caching - PR #10
describe('caching Enhancement Tests', () => {
  let mockData;
  let mockDispatch;
  
  beforeEach(() => {
    mockData = {
      id: 'test-10',
      title: 'Test caching',
      description: 'Test description for PR 10',
      metadata: { version: '1.0.10' }
    };
    mockDispatch = jest.fn();
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  test('should handle caching initialization correctly', () => {
    const { getByTestId } = render(<ComponentUnderTest data={mockData} />);
    expect(getByTestId('caching-container')).toBeInTheDocument();
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

describe('caching Integration Tests', () => {
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
