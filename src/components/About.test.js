import React from 'react';
import { render, screen } from '@testing-library/react';
import About from './About';

test('renders about section title', () => {
  render(<About />);
  expect(screen.getByText(/About Me/i)).toBeInTheDocument();
});

test('renders about content', () => {
  render(<About />);
  expect(screen.getByText(/Building Scalable Backend Solutions/i)).toBeInTheDocument();
});
