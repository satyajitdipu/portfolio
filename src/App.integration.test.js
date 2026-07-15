import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders hero heading with name', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Satyajit Sahoo');
});

test('renders navigation links', () => {
  render(<App />);
  expect(screen.getByText('About')).toBeInTheDocument();
  expect(screen.getByText('Projects')).toBeInTheDocument();
  expect(screen.getByText('Contact')).toBeInTheDocument();
});

test('renders hero section', () => {
  render(<App />);
  expect(screen.getByRole('banner')).toBeInTheDocument();
});
