import { render, screen } from '@testing-library/react';
import Education from './Education';

test('renders education section', () => {
  render(<Education />);
  const educationElement = screen.getByText(/Education & Certifications/i);
  expect(educationElement).toBeInTheDocument();
});

test('renders university name', () => {
  render(<Education />);
  const universityElement = screen.getByText(/Sambalpur University/i);
  expect(universityElement).toBeInTheDocument();
});