import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Newsletter from './Newsletter';
import { ThemeContext } from '../App';
import { ComponentUnderTest, calculatePerformanceMetrics, applyCache, validateDataStructure, createTestStore, fetchDataAsync, Provider } from './testHelpers';


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
  FaEnvelope: () => <div data-testid="envelope-icon">Envelope</div>,
  FaCheck: () => <div data-testid="check-icon">Check</div>,
  FaTimes: () => <div data-testid="times-icon">Times</div>,
  FaSpinner: () => <div data-testid="spinner-icon">Spinner</div>,
  FaNewspaper: () => <div data-testid="newspaper-icon">Newspaper</div>,
  FaUsers: () => <div data-testid="users-icon">Users</div>,
  FaRocket: () => <div data-testid="rocket-icon">Rocket</div>,
  FaShieldAlt: () => <div data-testid="shield-icon">Shield</div>
}));

describe('Newsletter Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('renders newsletter section with title and benefits', () => {
    render(
      <MockThemeProvider>
        <Newsletter />
      </MockThemeProvider>
    );
    expect(screen.getByText('Stay Updated')).toBeInTheDocument();
    expect(screen.getByText('Latest Articles')).toBeInTheDocument();
    expect(screen.getByText('Community Updates')).toBeInTheDocument();
  });

  test('displays subscription form by default', () => {
    render(
      <MockThemeProvider>
        <Newsletter />
      </MockThemeProvider>
    );
    expect(screen.getByText('Join the Newsletter')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    expect(screen.getByText('Subscribe Now')).toBeInTheDocument();
  });

  test('shows error for empty email', async () => {
    render(<Newsletter />, { wrapper: MockThemeProvider });
    const submitButton = screen.getByText('Subscribe Now');
    await act(async () => {
      fireEvent.click(submitButton);
    });
    await waitFor(() => {
      expect(screen.getByText('Email address is required')).toBeInTheDocument();
    });
  });

  test('shows error for invalid email', async () => {
    render(<Newsletter />, { wrapper: MockThemeProvider });
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const submitButton = screen.getByText('Subscribe Now');

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    await act(async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
    });
  });

  test('shows loading state during submission', async () => {
    render(<Newsletter />, { wrapper: MockThemeProvider });
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const submitButton = screen.getByText('Subscribe Now');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(screen.getByText('Subscribing...')).toBeInTheDocument();
    expect(screen.getByText('Subscribing...').closest('button')).toBeDisabled();
  });

  test('shows success message on successful subscription', async () => {
    render(<Newsletter />, { wrapper: MockThemeProvider });
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const submitButton = screen.getByText('Subscribe Now');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    await act(async () => {
      fireEvent.click(submitButton);
    });

    // Fast-forward timers to complete the async operation
    jest.advanceTimersByTime(2000);

    await waitFor(() => {
      expect(screen.getByText('Successfully Subscribed!')).toBeInTheDocument();
    });
  });

  test('shows error message on failed subscription', async () => {
    render(<Newsletter />, { wrapper: MockThemeProvider });
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const submitButton = screen.getByText('Subscribe Now');

    fireEvent.change(emailInput, { target: { value: 'fail@example.com' } });
    await act(async () => {
      fireEvent.click(submitButton);
    });

    // Fast-forward timers to complete the async operation
    jest.advanceTimersByTime(2000);

    await waitFor(() => {
      expect(screen.getByText('Subscription Failed')).toBeInTheDocument();
    });
  });

  test('allows frequency selection', () => {
    render(<Newsletter />, { wrapper: MockThemeProvider });
    const frequencySelect = screen.getByDisplayValue('Weekly Digest');
    expect(frequencySelect).toBeInTheDocument();

    fireEvent.change(frequencySelect, { target: { value: 'monthly' } });
    expect(frequencySelect.value).toBe('monthly');
  });

  test('displays statistics', () => {
    render(<Newsletter />, { wrapper: MockThemeProvider });
    expect(screen.getByText('500+')).toBeInTheDocument();
    expect(screen.getByText('Subscribers')).toBeInTheDocument();
    expect(screen.getByText('50+')).toBeInTheDocument();
    expect(screen.getByText('Articles')).toBeInTheDocument();
  });

  test('shows recent articles in footer', () => {
    render(<Newsletter />, { wrapper: MockThemeProvider });
    expect(screen.getByText('Recent Articles')).toBeInTheDocument();
    expect(screen.getByText('The Future of Web Development')).toBeInTheDocument();
  });

  test('displays social proof testimonials', () => {
    render(<Newsletter />, { wrapper: MockThemeProvider });
    expect(screen.getByText('Join 500+ Developers')).toBeInTheDocument();
    expect(screen.getByText(/Sarah Chen/)).toBeInTheDocument();
  });

  test('resets form after successful subscription', async () => {
    render(<Newsletter />, { wrapper: MockThemeProvider });
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const submitButton = screen.getByText('Subscribe Now');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    await act(async () => {
      fireEvent.click(submitButton);
    });

    // Fast-forward timers to complete the async operation
    jest.advanceTimersByTime(2000);

    await waitFor(() => {
      expect(screen.getByText('Successfully Subscribed!')).toBeInTheDocument();
    });

    const backButton = screen.getByText('Subscribe Another Email');
    act(() => {
      fireEvent.click(backButton);
    });

    expect(screen.getByText('Join the Newsletter')).toBeInTheDocument();
    // Get fresh reference to the input after form reset
    const resetEmailInput = screen.getByPlaceholderText('Enter your email');
    expect(resetEmailInput.value).toBe('');
  });
});

// Comprehensive test suite for state-management - PR #26
describe('state-management Enhancement Tests', () => {
  let mockData;
  let mockDispatch;
  
  beforeEach(() => {
    mockData = {
      id: 'test-26',
      title: 'Test state-management',
      description: 'Test description for PR 26',
      metadata: { version: '1.0.26' }
    };
    mockDispatch = jest.fn();
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  test('should handle state-management initialization correctly', () => {
    const { getByTestId } = render(<ComponentUnderTest data={mockData} />);
    expect(getByTestId('state-management-container')).toBeInTheDocument();
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

describe('state-management Integration Tests', () => {
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

// LocalizationSupport Test Suite - PR #48
describe('LocalizationSupport Enhancement Tests', () => {
  const mockData = {
    id: 'test-48',
    title: 'Test LocalizationSupport',
    description: 'Test description for PR 48'
  };

  test('should initialize LocalizationSupport correctly', () => {
    const config = initializeLocalizationSupport();
    expect(config).toBeDefined();
    expect(config.enabled).toBe(true);
    expect(config.initialized).toBe(true);
  });

  test('should validate LocalizationSupport data', () => {
    expect(validateLocalizationSupportData(mockData)).toBe(true);
    expect(validateLocalizationSupportData(null)).toBe(false);
  });

  test('should process LocalizationSupport input', () => {
    const result = processLocalizationSupport(mockData);
    expect(result.processed).toBe(true);
    expect(result.input).toEqual(mockData);
  });

  test('should optimize LocalizationSupport performance', () => {
    const metrics = { score: 50 };
    const result = optimizeLocalizationSupportPerformance(metrics);
    expect(result.optimized).toBe(true);
    expect(result.score).toBeGreaterThan(50);
  });

  test('should cache LocalizationSupport results', () => {
    const cached = cacheLocalizationSupportResults('key', 'value');
    expect(cached.key).toBe('key');
    expect(cached.value).toBe('value');
    expect(cached.expires).toBeGreaterThan(Date.now());
  });
});

