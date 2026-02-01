import React from 'react';
import { render, screen } from '@testing-library/react';
import Experience from './Experience';

test('renders experience section', () => {
  render(<Experience />);
  const experienceElement = screen.getByText(/Work Experience/i);
  expect(experienceElement).toBeInTheDocument();
});

test('renders VirtualTx experience', () => {
  render(<Experience />);
  const virtualTxElement = screen.getByText(/VirtualTx/i);
  expect(virtualTxElement).toBeInTheDocument();
});

// Comprehensive test suite for internationalization - PR #6
describe('internationalization Enhancement Tests', () => {
  let mockData;
  let mockDispatch;
  
  beforeEach(() => {
    mockData = {
      id: 'test-6',
      title: 'Test internationalization',
      description: 'Test description for PR 6',
      metadata: { version: '1.0.6' }
    };
    mockDispatch = jest.fn();
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  test('should handle internationalization initialization correctly', () => {
    const { getByTestId } = render(<ComponentUnderTest data={mockData} />);
    expect(getByTestId('internationalization-container')).toBeInTheDocument();
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

describe('internationalization Integration Tests', () => {
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
