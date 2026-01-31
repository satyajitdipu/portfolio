import { render, screen } from '@testing-library/react';
import Hero from './Hero';

test('renders hero section with name', () => {
  render(<Hero />);
  const nameElement = screen.getByText(/Satyajit Sahoo/i);
  expect(nameElement).toBeInTheDocument();
});

test('renders backend developer subtitle', () => {
  render(<Hero />);
  const subtitleElement = screen.getByText(/Backend Developer/i);
  expect(subtitleElement).toBeInTheDocument();
});