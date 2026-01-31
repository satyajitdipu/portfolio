import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Resume from './Resume';

describe('Resume Component', () => {
  test('renders resume section with title and subtitle', () => {
    render(<Resume />);
    expect(screen.getByText('Resume')).toBeInTheDocument();
    expect(screen.getByText(/Professional summary/)).toBeInTheDocument();
  });

  test('renders personal information in sidebar', () => {
    render(<Resume />);
    expect(screen.getByText('Satyajit Dipu')).toBeInTheDocument();
    expect(screen.getByText('Full Stack Developer & Machine Learning Engineer')).toBeInTheDocument();
  });

  test('displays technical skills with progress bars', () => {
    render(<Resume />);
    expect(screen.getByText('JavaScript/TypeScript')).toBeInTheDocument();
    expect(screen.getByText('95%')).toBeInTheDocument();
  });

  test('shows overview section by default', () => {
    render(<Resume />);
    expect(screen.getByText('Professional Summary')).toBeInTheDocument();
    expect(screen.getByText(/Passionate full-stack developer/)).toBeInTheDocument();
  });

  test('switches to experience section when clicked', () => {
    render(<Resume />);
    const experienceTab = screen.getByText('Experience');
    fireEvent.click(experienceTab);
    expect(screen.getByText('Work Experience')).toBeInTheDocument();
    expect(screen.getByText('Senior Full Stack Developer')).toBeInTheDocument();
  });

  test('switches to education section when clicked', () => {
    render(<Resume />);
    const educationTab = screen.getByText('Education');
    fireEvent.click(educationTab);
    expect(screen.getByText('Master of Computer Applications (MCA)')).toBeInTheDocument();
    expect(screen.getByText('Jadavpur University')).toBeInTheDocument();
  });

  test('switches to projects section when clicked', () => {
    render(<Resume />);
    const projectsTab = screen.getByText('Projects');
    fireEvent.click(projectsTab);
    expect(screen.getByText('Key Projects')).toBeInTheDocument();
    expect(screen.getByText('E-Commerce Platform')).toBeInTheDocument();
  });

  test('switches to certifications section when clicked', () => {
    render(<Resume />);
    const certificationsTab = screen.getByText('Certifications');
    fireEvent.click(certificationsTab);
    expect(screen.getByText('AWS Certified Solutions Architect')).toBeInTheDocument();
    expect(screen.getByText('Amazon Web Services')).toBeInTheDocument();
  });

  test('displays achievements in overview section', () => {
    render(<Resume />);
    expect(screen.getByText('Key Achievements')).toBeInTheDocument();
    expect(screen.getByText(/Published 15\+ articles/)).toBeInTheDocument();
  });

  test('shows tools and technologies', () => {
    render(<Resume />);
    expect(screen.getByText('Git')).toBeInTheDocument();
    expect(screen.getByText('VS Code')).toBeInTheDocument();
  });

  test('displays language proficiencies', () => {
    render(<Resume />);
    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('Fluent')).toBeInTheDocument();
  });

  test('renders download and print buttons', () => {
    render(<Resume />);
    expect(screen.getByText('Download PDF')).toBeInTheDocument();
    expect(screen.getByText('Print')).toBeInTheDocument();
  });

  test('displays social links', () => {
    render(<Resume />);
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('Website')).toBeInTheDocument();
  });
});