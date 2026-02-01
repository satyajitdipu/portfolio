import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Portfolio from './App';

test('renders portfolio title', () => {
  render(<Portfolio />);
  const titleElement = screen.getByText(/portfolio/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders navigation links', () => {
  render(<Portfolio />);
  expect(screen.getByText('About')).toBeInTheDocument();
  expect(screen.getByText('Projects')).toBeInTheDocument();
  expect(screen.getByText('Contact')).toBeInTheDocument();
});

test('renders hero section', () => {
  render(<Portfolio />);
  expect(screen.getByRole('banner')).toBeInTheDocument();
});</content>
<parameter name="filePath">d:\portfolio\src\App.integration.test.js