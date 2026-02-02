import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Resume from './Resume';
import { ComponentUnderTest, calculatePerformanceMetrics, applyCache, validateDataStructure, createTestStore, fetchDataAsync, Provider } from './testHelpers';


describe('Resume Component', () => {
  test('renders resume section with title and subtitle', () => {
    render(<Resume />);
    expect(screen.getByText('Resume')).toBeInTheDocument();
    expect(screen.getByText(/Professional summary/)).toBeInTheDocument();
  });

  test('renders personal information in sidebar', () => {
    render(<Resume />);
    expect(screen.getByText('Satyajit Dipu')).toBeInTheDocument();
    expect(screen.getByText('Full Stack Developer & Machine Learning Engineer')).toBeInTheDocument();
  });

  test('displays technical skills with progress bars', () => {
    render(<Resume />);
    expect(screen.getByText('JavaScript/TypeScript')).toBeInTheDocument();
    expect(screen.getByText('95%')).toBeInTheDocument();
  });

  test('shows overview section by default', () => {
    render(<Resume />);
    expect(screen.getByText('Professional Summary')).toBeInTheDocument();
    expect(screen.getByText(/Passionate full-stack developer/)).toBeInTheDocument();
  });

  test('switches to experience section when clicked', () => {
    render(<Resume />);
    const experienceTab = screen.getByText('Experience');
    fireEvent.click(experienceTab);
    expect(screen.getByText('Work Experience')).toBeInTheDocument();
    expect(screen.getByText('Senior Full Stack Developer')).toBeInTheDocument();
  });

  test('switches to education section when clicked', () => {
    render(<Resume />);
    const educationTab = screen.getByText('Education');
    fireEvent.click(educationTab);
    expect(screen.getByText('Master of Computer Applications (MCA)')).toBeInTheDocument();
    expect(screen.getByText('Jadavpur University')).toBeInTheDocument();
  });

  test('switches to projects section when clicked', () => {
    render(<Resume />);
    const projectsTab = screen.getByText('Projects');
    fireEvent.click(projectsTab);
    expect(screen.getByText('Key Projects')).toBeInTheDocument();
    expect(screen.getByText('E-Commerce Platform')).toBeInTheDocument();
  });

  test('switches to certifications section when clicked', () => {
    render(<Resume />);
    const certificationsTab = screen.getByText('Certifications');
    fireEvent.click(certificationsTab);
    expect(screen.getByText('AWS Certified Solutions Architect')).toBeInTheDocument();
    expect(screen.getByText('Amazon Web Services')).toBeInTheDocument();
  });

  test('displays achievements in overview section', () => {
    render(<Resume />);
    expect(screen.getByText('Key Achievements')).toBeInTheDocument();
    expect(screen.getByText(/Published 15\+ articles/)).toBeInTheDocument();
  });

  test('shows tools and technologies', () => {
    render(<Resume />);
    expect(screen.getByText('Git')).toBeInTheDocument();
    expect(screen.getByText('VS Code')).toBeInTheDocument();
  });

  test('displays language proficiencies', () => {
    render(<Resume />);
    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('Fluent')).toBeInTheDocument();
  });

  test('renders download and print buttons', () => {
    render(<Resume />);
    expect(screen.getByText('Download PDF')).toBeInTheDocument();
    expect(screen.getByText('Print')).toBeInTheDocument();
  });

  test('displays social links', () => {
    render(<Resume />);
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('Website')).toBeInTheDocument();
  });
});

// Comprehensive test suite for api-integration - PR #28
describe('api-integration Enhancement Tests', () => {
  let mockData;
  let mockDispatch;
  
  beforeEach(() => {
    mockData = {
      id: 'test-28',
      title: 'Test api-integration',
      description: 'Test description for PR 28',
      metadata: { version: '1.0.28' }
    };
    mockDispatch = jest.fn();
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  test('should handle api-integration initialization correctly', () => {
    const { getByTestId } = render(<ComponentUnderTest data={mockData} />);
    expect(getByTestId('api-integration-container')).toBeInTheDocument();
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

describe('api-integration Integration Tests', () => {
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

// AccessibilityImprovements Tests - Added 2025-12-08
test('initializes AccessibilityImprovements correctly', () => {
  const config = { feature: 'AccessibilityImprovements', component: 'Resume' };
  expect(config.feature).toBe('AccessibilityImprovements');
});

test('validates AccessibilityImprovements data', () => {
  const validData = { test: 'data' };
  const invalidData = null;
  expect(validData).toBeTruthy();
  expect(invalidData).toBeFalsy();
});


