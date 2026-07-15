import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Projects from './Projects';
import { ThemeContext } from '../App';

const renderWithTheme = () => render(
  <ThemeContext.Provider value={{ darkMode: false, toggleTheme: jest.fn() }}>
    <Projects />
  </ThemeContext.Provider>
);

test('renders projects section', () => {
  renderWithTheme();
  expect(screen.getByText(/Featured Projects/i)).toBeInTheDocument();
});

test('renders project cards', () => {
  renderWithTheme();
  const projectCards = screen.getAllByRole('article');
  expect(projectCards.length).toBeGreaterThan(0);
});

test('renders project links', () => {
  renderWithTheme();
  const links = screen.getAllByRole('link');
  expect(links.length).toBeGreaterThan(0);
});
