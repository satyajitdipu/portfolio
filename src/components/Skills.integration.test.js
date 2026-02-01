import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Skills from './Skills';

test('renders skills section', () => {
  render(<Skills />);
  expect(screen.getByText('Skills')).toBeInTheDocument();
});

test('renders skill categories', () => {
  render(<Skills />);
  expect(screen.getByText(/frontend|backend|tools/i)).toBeInTheDocument();
});

test('renders skill progress bars', () => {
  render(<Skills />);
  const progressBars = document.querySelectorAll('.progress-bar');
  expect(progressBars.length).toBeGreaterThan(0);
});</content>
<parameter name="filePath">d:\portfolio\src\components\Skills.integration.test.js