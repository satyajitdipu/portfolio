import React from 'react';
import { render, screen } from '@testing-library/react';
import Projects from './Projects';

test('renders projects section', () => {
  render(<Projects />);
  const projectsElement = screen.getByText(/Projects/i);
  expect(projectsElement).toBeInTheDocument();
});

test('renders e-commerce project', () => {
  render(<Projects />);
  const projectElement = screen.getByText(/E-Commerce Platform/i);
  expect(projectElement).toBeInTheDocument();
});