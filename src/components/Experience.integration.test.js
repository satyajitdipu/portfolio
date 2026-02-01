import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Experience from './Experience';

test('renders experience section', () => {
  render(<Experience />);
  expect(screen.getByText('Experience')).toBeInTheDocument();
});

test('renders job positions', () => {
  render(<Experience />);
  const jobTitles = screen.getAllByRole('heading', { level: 3 });
  expect(jobTitles.length).toBeGreaterThan(0);
});

test('renders company names', () => {
  render(<Experience />);
  expect(screen.getByText(/company|organization/i)).toBeInTheDocument();
});</content>
<parameter name="filePath">d:\portfolio\src\components\Experience.integration.test.js