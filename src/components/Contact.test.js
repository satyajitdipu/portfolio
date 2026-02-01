import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Contact from './Contact';
import { ThemeContext } from '../App';

// Mock ThemeContext
const mockThemeContext = {
  darkMode: false,
  toggleTheme: jest.fn()
};

const renderWithTheme = (component) => {
  return render(
    <ThemeContext.Provider value={mockThemeContext}>
      {component}
    </ThemeContext.Provider>
  );
};

describe('Contact Component', () => {
  beforeEach(() => {
    // Mock window.location.href
    delete window.location;
    window.location = { href: '' };

    // Mock window.open
    global.open = jest.fn();
  });

  test('renders contact section with hero content', () => {
    renderWithTheme(<Contact />);

    expect(screen.getByText('Get In Touch')).toBeInTheDocument();
    expect(screen.getByText(/Ready to bring your ideas to life/)).toBeInTheDocument();
  });

  test('displays contact statistics', () => {
    renderWithTheme(<Contact />);

    expect(screen.getByText('50+')).toBeInTheDocument();
    expect(screen.getByText('Projects Completed')).toBeInTheDocument();
    expect(screen.getByText('25+')).toBeInTheDocument();
    expect(screen.getByText('Happy Clients')).toBeInTheDocument();
  });

  test('renders contact methods grid', () => {
    renderWithTheme(<Contact />);

    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Phone')).toBeInTheDocument();
    expect(screen.getByText('Video Call')).toBeInTheDocument();
    expect(screen.getByText('Live Chat')).toBeInTheDocument();
  });

  test('displays contact information', () => {
    renderWithTheme(<Contact />);

    expect(screen.getByText('Contact Information')).toBeInTheDocument();
    expect(screen.getByText('+91 6372754900')).toBeInTheDocument();
    expect(screen.getByText('satyajits1001@gmail.com')).toBeInTheDocument();
    expect(screen.getByText('Bhubaneswar, Odisha, India')).toBeInTheDocument();
  });

  test('renders social links', () => {
    renderWithTheme(<Contact />);

    expect(screen.getByText('Connect With Me')).toBeInTheDocument();
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('HackerRank')).toBeInTheDocument();
    expect(screen.getByText('LeetCode')).toBeInTheDocument();
  });

  test('renders contact form with all fields', () => {
    renderWithTheme(<Contact />);

    expect(screen.getByText('Project Inquiry')).toBeInTheDocument();
    expect(screen.getByLabelText('Full Name *')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address *')).toBeInTheDocument();
    expect(screen.getByLabelText('Subject *')).toBeInTheDocument();
    expect(screen.getByLabelText('Priority Level')).toBeInTheDocument();
    expect(screen.getByLabelText('Project Type')).toBeInTheDocument();
    expect(screen.getByLabelText('Budget Range')).toBeInTheDocument();
    expect(screen.getByLabelText('Project Timeline')).toBeInTheDocument();
    expect(screen.getByLabelText('Project Details *')).toBeInTheDocument();
  });

  test('validates required fields', async () => {
    renderWithTheme(<Contact />);

    const submitButton = screen.getByText('Send Inquiry');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Subject is required')).toBeInTheDocument();
      expect(screen.getByText('Message is required')).toBeInTheDocument();
    });
  });

  test('validates email format', async () => {
    renderWithTheme(<Contact />);

    const emailInput = screen.getByLabelText('Email Address *');
    const submitButton = screen.getByText('Send Inquiry');

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
    });
  });

  test('validates minimum lengths', async () => {
    renderWithTheme(<Contact />);

    const nameInput = screen.getByLabelText('Full Name *');
    const subjectInput = screen.getByLabelText('Subject *');
    const messageInput = screen.getByLabelText('Project Details *');
    const submitButton = screen.getByText('Send Inquiry');

    fireEvent.change(nameInput, { target: { value: 'A' } });
    fireEvent.change(subjectInput, { target: { value: 'Hi' } });
    fireEvent.change(messageInput, { target: { value: 'Short' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Name must be at least 2 characters')).toBeInTheDocument();
      expect(screen.getByText('Subject must be at least 5 characters')).toBeInTheDocument();
      expect(screen.getByText('Message must be at least 10 characters')).toBeInTheDocument();
    });
  });

  test('submits form successfully', async () => {
    renderWithTheme(<Contact />);

    const nameInput = screen.getByLabelText('Full Name *');
    const emailInput = screen.getByLabelText('Email Address *');
    const subjectInput = screen.getByLabelText('Subject *');
    const messageInput = screen.getByLabelText('Project Details *');
    const submitButton = screen.getByText('Send Inquiry');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(subjectInput, { target: { value: 'Project Inquiry' } });
    fireEvent.change(messageInput, { target: { value: 'This is a detailed project description with enough content to pass validation.' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Thank you for your message! Opening your email client...')).toBeInTheDocument();
    });

    expect(window.location.href).toContain('mailto:satyajits1001@gmail.com');
    expect(window.location.href).toContain('subject=Project%20Inquiry');
    expect(window.location.href).toContain('body=');
  });

  test('shows loading state during submission', async () => {
    renderWithTheme(<Contact />);

    const nameInput = screen.getByLabelText('Full Name *');
    const emailInput = screen.getByLabelText('Email Address *');
    const subjectInput = screen.getByLabelText('Subject *');
    const messageInput = screen.getByLabelText('Project Details *');
    const submitButton = screen.getByText('Send Inquiry');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(subjectInput, { target: { value: 'Project Inquiry' } });
    fireEvent.change(messageInput, { target: { value: 'This is a detailed project description with enough content to pass validation.' } });

    fireEvent.click(submitButton);

    expect(screen.getByText('Sending...')).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  test('clears errors when user starts typing', async () => {
    renderWithTheme(<Contact />);

    const nameInput = screen.getByLabelText('Full Name *');
    const submitButton = screen.getByText('Send Inquiry');

    // Submit empty form to trigger errors
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
    });

    // Start typing to clear error
    fireEvent.change(nameInput, { target: { value: 'J' } });

    await waitFor(() => {
      expect(screen.queryByText('Name is required')).not.toBeInTheDocument();
    });
  });

  test('switches between form and FAQ tabs', () => {
    renderWithTheme(<Contact />);

    // Initially shows form
    expect(screen.getByText('Project Inquiry')).toBeInTheDocument();

    // Click FAQ tab
    const faqTab = screen.getByText('FAQ');
    fireEvent.click(faqTab);

    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
    expect(screen.queryByText('Project Inquiry')).not.toBeInTheDocument();

    // Click back to form tab
    const formTab = screen.getByText('Send Message');
    fireEvent.click(formTab);

    expect(screen.getByText('Project Inquiry')).toBeInTheDocument();
  });

  test('renders FAQ section with questions and answers', () => {
    renderWithTheme(<Contact />);

    const faqTab = screen.getByText('FAQ');
    fireEvent.click(faqTab);

    expect(screen.getByText('What types of projects do you work on?')).toBeInTheDocument();
    expect(screen.getByText('What is your typical project timeline?')).toBeInTheDocument();
    expect(screen.getByText('Do you work with international clients?')).toBeInTheDocument();
    expect(screen.getByText('What is your availability for new projects?')).toBeInTheDocument();
  });

  test('renders with dark theme', () => {
    const darkThemeContext = {
      darkMode: true,
      toggleTheme: jest.fn()
    };

    render(
      <ThemeContext.Provider value={darkThemeContext}>
        <Contact />
      </ThemeContext.Provider>
    );

    // Component should render without errors in dark mode
    expect(screen.getByText('Get In Touch')).toBeInTheDocument();
  });

  test('contact method links work correctly', () => {
    renderWithTheme(<Contact />);

    const emailLink = screen.getByText('satyajits1001@gmail.com');
    const phoneLink = screen.getByText('+91 6372754900');

    expect(emailLink.closest('a')).toHaveAttribute('href', 'mailto:satyajits1001@gmail.com');
    expect(phoneLink.closest('a')).toHaveAttribute('href', 'tel:+916372754900');
  });

  test('social links have correct URLs', () => {
    renderWithTheme(<Contact />);

    const linkedinLink = screen.getByText('LinkedIn').closest('a');
    const githubLink = screen.getByText('GitHub').closest('a');
    const hackerrankLink = screen.getByText('HackerRank').closest('a');
    const leetcodeLink = screen.getByText('LeetCode').closest('a');

    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/satyajit-sahoo-backend');
    expect(githubLink).toHaveAttribute('href', 'https://github.com/satyajitdipu');
    expect(hackerrankLink).toHaveAttribute('href', 'https://www.hackerrank.com/profile/19btcse40');
    expect(leetcodeLink).toHaveAttribute('href', 'https://leetcode.com/u/satyajitdipu/');
  });

  test('form fields update correctly', () => {
    renderWithTheme(<Contact />);

    const nameInput = screen.getByLabelText('Full Name *');
    const emailInput = screen.getByLabelText('Email Address *');
    const subjectInput = screen.getByLabelText('Subject *');
    const prioritySelect = screen.getByLabelText('Priority Level');
    const projectTypeSelect = screen.getByLabelText('Project Type');

    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(subjectInput, { target: { value: 'Test Subject' } });
    fireEvent.change(prioritySelect, { target: { value: 'high' } });
    fireEvent.change(projectTypeSelect, { target: { value: 'web-development' } });

    expect(nameInput.value).toBe('Test User');
    expect(emailInput.value).toBe('test@example.com');
    expect(subjectInput.value).toBe('Test Subject');
    expect(prioritySelect.value).toBe('high');
    expect(projectTypeSelect.value).toBe('web-development');
  });

  test('form clears after successful submission', async () => {
    renderWithTheme(<Contact />);

    const nameInput = screen.getByLabelText('Full Name *');
    const emailInput = screen.getByLabelText('Email Address *');
    const subjectInput = screen.getByLabelText('Subject *');
    const messageInput = screen.getByLabelText('Project Details *');
    const submitButton = screen.getByText('Send Inquiry');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(subjectInput, { target: { value: 'Project Inquiry' } });
    fireEvent.change(messageInput, { target: { value: 'This is a detailed project description with enough content to pass validation.' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(nameInput.value).toBe('');
      expect(emailInput.value).toBe('');
      expect(subjectInput.value).toBe('');
      expect(messageInput.value).toBe('');
    });
  });
});