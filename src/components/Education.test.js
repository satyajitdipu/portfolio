import React from 'react';
import { render, screen } from '@testing-library/react';
import Education from './Education';

test('renders education section', () => {
  render(<Education />);
  expect(screen.getByText(/Education & Certifications/i)).toBeInTheDocument();
});

test('renders university name', () => {
  render(<Education />);
  expect(screen.getByText(/Sambalpur University/i)).toBeInTheDocument();
});
