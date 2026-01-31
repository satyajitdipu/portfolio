import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Newsletter from './Newsletter';

describe('Newsletter Component', () => {
  test('renders newsletter section with title and benefits', () => {
    render(<Newsletter />);
    expect(screen.getByText('Stay Updated')).toBeInTheDocument();
    expect(screen.getByText('Latest Articles')).toBeInTheDocument();
    expect(screen.getByText('Community Updates')).toBeInTheDocument();
  });

  test('displays subscription form by default', () => {
    render(<Newsletter />);
    expect(screen.getByText('Join the Newsletter')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    expect(screen.getByText('Subscribe Now')).toBeInTheDocument();
  });

  test('shows error for empty email', async () => {
    render(<Newsletter />);
    const submitButton = screen.getByText('Subscribe Now');
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText('Email address is required')).toBeInTheDocument();
    });
  });

  test('shows error for invalid email', async () => {
    render(<Newsletter />);
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const submitButton = screen.getByText('Subscribe Now');

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
    });
  });

  test('shows loading state during submission', async () => {
    render(<Newsletter />);
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const submitButton = screen.getByText('Subscribe Now');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    expect(screen.getByText('Subscribing...')).toBeInTheDocument();
    expect(screen.getByText('Subscribing...').closest('button')).toBeDisabled();
  });

  test('shows success message on successful subscription', async () => {
    render(<Newsletter />);
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const submitButton = screen.getByText('Subscribe Now');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Successfully Subscribed!')).toBeInTheDocument();
    });
  });

  test('shows error message on failed subscription', async () => {
    render(<Newsletter />);
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const submitButton = screen.getByText('Subscribe Now');

    fireEvent.change(emailInput, { target: { value: 'fail@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Subscription Failed')).toBeInTheDocument();
    });
  });

  test('allows frequency selection', () => {
    render(<Newsletter />);
    const frequencySelect = screen.getByDisplayValue('Weekly Digest');
    expect(frequencySelect).toBeInTheDocument();

    fireEvent.change(frequencySelect, { target: { value: 'monthly' } });
    expect(frequencySelect.value).toBe('monthly');
  });

  test('displays statistics', () => {
    render(<Newsletter />);
    expect(screen.getByText('500+')).toBeInTheDocument();
    expect(screen.getByText('Subscribers')).toBeInTheDocument();
    expect(screen.getByText('50+')).toBeInTheDocument();
    expect(screen.getByText('Articles')).toBeInTheDocument();
  });

  test('shows recent articles in footer', () => {
    render(<Newsletter />);
    expect(screen.getByText('Recent Articles')).toBeInTheDocument();
    expect(screen.getByText('The Future of Web Development')).toBeInTheDocument();
  });

  test('displays social proof testimonials', () => {
    render(<Newsletter />);
    expect(screen.getByText('Join 500+ Developers')).toBeInTheDocument();
    expect(screen.getByText(/Sarah Chen/)).toBeInTheDocument();
  });

  test('resets form after successful subscription', async () => {
    render(<Newsletter />);
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const submitButton = screen.getByText('Subscribe Now');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Successfully Subscribed!')).toBeInTheDocument();
    });

    const backButton = screen.getByText('Subscribe Another Email');
    fireEvent.click(backButton);

    expect(screen.getByText('Join the Newsletter')).toBeInTheDocument();
    expect(emailInput.value).toBe('');
  });
});