import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Projects from './Projects';

test('renders projects section', () => {
  render(<Projects />);
  expect(screen.getByText('Projects')).toBeInTheDocument();
});

test('renders project cards', () => {
  render(<Projects />);
  const projectCards = screen.getAllByRole('article');
  expect(projectCards.length).toBeGreaterThan(0);
});

test('renders project links', () => {
  render(<Projects />);
  const links = screen.getAllByRole('link');
  expect(links.length).toBeGreaterThan(0);
});</content>
<parameter name="filePath">d:\portfolio\src\components\Projects.integration.test.js