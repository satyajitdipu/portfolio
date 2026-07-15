import React from 'react';
import { render, screen } from '@testing-library/react';
import Skills from './Skills';

test('renders skills section', () => {
  render(<Skills />);
  expect(screen.getByText(/Skills & Expertise/i)).toBeInTheDocument();
});

test('renders python skill', () => {
  render(<Skills />);
  expect(screen.getByText(/^Python$/i)).toBeInTheDocument();
});
