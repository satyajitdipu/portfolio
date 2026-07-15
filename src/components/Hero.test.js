import React from 'react';
import { render, screen } from '@testing-library/react';
import Hero from './Hero';

test('renders hero section with name', () => {
  render(<Hero />);
  expect(screen.getByText(/Satyajit Sahoo/i)).toBeInTheDocument();
});

test('renders software engineer subtitle', () => {
  render(<Hero />);
  expect(screen.getByText(/Software Engineer/i)).toBeInTheDocument();
});

test('renders resume download link', () => {
  render(<Hero />);
  expect(screen.getByRole('link', { name: /resume/i })).toBeInTheDocument();
});
