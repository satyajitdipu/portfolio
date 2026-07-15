import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Contact from './Contact';
import { ThemeContext } from '../App';

const mockThemeContext = {
  darkMode: false,
  toggleTheme: jest.fn()
};

const renderWithTheme = (component) => render(
  <ThemeContext.Provider value={mockThemeContext}>
    {component}
  </ThemeContext.Provider>
);

describe('Contact Component', () => {
  beforeEach(() => {
    delete window.location;
    window.location = { href: '' };
  });

  test('renders section title', () => {
    renderWithTheme(<Contact />);
    expect(screen.getByText('Get In Touch')).toBeInTheDocument();
  });

  test('renders contact information', () => {
    renderWithTheme(<Contact />);
    const emailLink = screen.getByText('satyajits101@gmail.com').closest('a');
    const phoneLink = screen.getByText('+91 6372754900').closest('a');

    expect(emailLink).toHaveAttribute('href', 'mailto:satyajits101@gmail.com');
    expect(phoneLink).toHaveAttribute('href', 'tel:+916372754900');
    expect(screen.getByText('Bhubaneswar, Odisha, India')).toBeInTheDocument();
  });

  test('renders social links with correct URLs', () => {
    renderWithTheme(<Contact />);

    const githubLink = screen.getByText('GitHub').closest('a');
    const linkedinLink = screen.getByText('LinkedIn').closest('a');

    expect(githubLink).toHaveAttribute('href', 'https://github.com/satyajitdipu');
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/satyajit-sahoo-2457601a6/');
  });

  test('shows validation errors on empty submit', async () => {
    renderWithTheme(<Contact />);

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Subject is required')).toBeInTheDocument();
      expect(screen.getByText('Message is required')).toBeInTheDocument();
    });
  });

  test('clears an error when the user starts typing', async () => {
    renderWithTheme(<Contact />);

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'J' } });

    await waitFor(() => {
      expect(screen.queryByText('Name is required')).not.toBeInTheDocument();
    });
  });

  test('submits successfully with valid input', async () => {
    renderWithTheme(<Contact />);

    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/subject/i), { target: { value: 'Project Inquiry' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'This message is long enough to pass validation.' } });

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/Thank you for your message/i)).toBeInTheDocument();
    });

    expect(window.location.href).toContain('mailto:satyajits101@gmail.com');
  });

  test('renders without errors in dark mode', () => {
    render(
      <ThemeContext.Provider value={{ darkMode: true, toggleTheme: jest.fn() }}>
        <Contact />
      </ThemeContext.Provider>
    );
    expect(screen.getByText('Get In Touch')).toBeInTheDocument();
  });
});
