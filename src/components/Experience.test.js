import React from 'react';
import { render, screen } from '@testing-library/react';
import Experience from './Experience';

test('renders experience section', () => {
  render(<Experience />);
  expect(screen.getByText(/Work Experience/i)).toBeInTheDocument();
});

test('renders VirtualTx experience', () => {
  render(<Experience />);
  expect(screen.getByText(/VirtualTx/i)).toBeInTheDocument();
});
