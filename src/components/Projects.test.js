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

describe('Projects Component', () => {
  test('renders section title', () => {
    renderWithTheme();
    expect(screen.getByText('Featured Projects')).toBeInTheDocument();
  });

  test('renders all project cards', () => {
    renderWithTheme();
    const cards = screen.getAllByRole('article');
    expect(cards).toHaveLength(5);
  });

  test('renders project names and GitHub links', () => {
    renderWithTheme();
    expect(screen.getByText('AI Drawing & Image Analysis Tool')).toBeInTheDocument();

    const link = screen.getByLabelText('View AI Drawing & Image Analysis Tool on GitHub');
    expect(link).toHaveAttribute('href', 'https://github.com/satyajitdipu/image-classification');
  });

  test('renders technology tags for a project', () => {
    renderWithTheme();
    expect(screen.getByText('Django')).toBeInTheDocument();
  });

  test('renders view all repositories link', () => {
    renderWithTheme();
    const link = screen.getByRole('link', { name: /view all repositories/i });
    expect(link).toHaveAttribute('href', 'https://github.com/satyajitdipu?tab=repositories');
  });
});
