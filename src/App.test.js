import { render, screen } from '@testing-library/react';
import App from './App';

test('renders portfolio app', () => {
  render(<App />);
  const nameElement = screen.getByText('Satyajit Sahoo');
  expect(nameElement).toBeInTheDocument();
});

test('renders backend developer title', () => {
  render(<App />);
  const titleElement = screen.getByRole('heading', { level: 2, name: /Backend Developer/i });
  expect(titleElement).toBeInTheDocument();
});