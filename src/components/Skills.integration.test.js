import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Skills from './Skills';

test('renders skills section heading', () => {
  render(<Skills />);
  expect(screen.getByRole('heading', { level: 2, name: /Skills & Expertise/i })).toBeInTheDocument();
});

test('renders skill categories', () => {
  render(<Skills />);
  expect(screen.getByText(/Backend Frameworks/i)).toBeInTheDocument();
});

test('renders skill tags', () => {
  render(<Skills />);
  const tags = document.querySelectorAll('.skill-tag');
  expect(tags.length).toBeGreaterThan(0);
});
