import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Contact from './Contact';

test('renders contact form', () => {
  render(<Contact />);
  expect(screen.getByRole('form')).toBeInTheDocument();
});

test('renders contact input fields', () => {
  render(<Contact />);
  expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
});

test('renders submit button', () => {
  render(<Contact />);
  expect(screen.getByRole('button', { name: /send|submit/i })).toBeInTheDocument();
});