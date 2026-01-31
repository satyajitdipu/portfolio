import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Skills from './Skills';

test('renders skills section', () => {
  render(<Skills />);
  const skillsElement = screen.getByText(/Skills/i);
  expect(skillsElement).toBeInTheDocument();
});

test('renders python skill', () => {
  render(<Skills />);
  const pythonElement = screen.getByText(/Python/i);
  expect(pythonElement).toBeInTheDocument();
});