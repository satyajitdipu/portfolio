import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Hero from './Hero';

test('renders hero section with title', () => {
  render(<Hero />);
  expect(screen.getByRole('heading')).toBeInTheDocument();
});

test('renders hero description', () => {
  render(<Hero />);
  expect(screen.getByText(/full.?stack/i)).toBeInTheDocument();
});

test('renders call-to-action button', () => {
  render(<Hero />);
  const button = screen.getByRole('button', { name: /view projects/i });
  expect(button).toBeInTheDocument();
});