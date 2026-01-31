import React from 'react';
import { render, screen } from '@testing-library/react';
import Experience from './Experience';

test('renders experience section', () => {
  render(<Experience />);
  const experienceElement = screen.getByText(/Work Experience/i);
  expect(experienceElement).toBeInTheDocument();
});

test('renders VirtualTx experience', () => {
  render(<Experience />);
  const virtualTxElement = screen.getByText(/VirtualTx/i);
  expect(virtualTxElement).toBeInTheDocument();
});