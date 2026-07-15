import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders portfolio app with name', () => {
    render(<App />);
    expect(screen.getByText('Satyajit Sahoo')).toBeInTheDocument();
  });

  test('renders software engineer title', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 2, name: /Software Engineer/i })).toBeInTheDocument();
  });

  test('renders all main sections', () => {
    render(<App />);
    expect(screen.getByText(/About Me/i)).toBeInTheDocument();
    expect(screen.getByText(/Skills & Expertise/i)).toBeInTheDocument();
    expect(screen.getByText(/Work Experience/i)).toBeInTheDocument();
    expect(screen.getByText(/Featured Projects/i)).toBeInTheDocument();
    expect(screen.getByText(/Education & Certifications/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Get In Touch' })).toBeInTheDocument();
  });
});
