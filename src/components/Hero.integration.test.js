import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Hero from './Hero';

test('renders hero section with heading', () => {
  render(<Hero />);
  expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
});

test('renders hero description mentioning full-stack work', () => {
  render(<Hero />);
  expect(screen.getByText(/full.?stack/i)).toBeInTheDocument();
});

test('renders view work link', () => {
  render(<Hero />);
  const link = screen.getByRole('link', { name: /view work/i });
  expect(link).toBeInTheDocument();
});
