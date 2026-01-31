import React from 'react';
import { render, screen } from '@testing-library/react';
import About from './About';

test('renders about section title', () => {
  render(<About />);
  const titleElement = screen.getByText(/About Me/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders about content', () => {
  render(<About />);
  const contentElement = screen.getByText(/Building Scalable Backend Solutions/i);
  expect(contentElement).toBeInTheDocument();
});