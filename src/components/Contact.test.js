import { render, screen } from '@testing-library/react';
import Contact from './Contact';

test('renders contact section', () => {
  render(<Contact />);
  const contactElement = screen.getByText(/Contact/i);
  expect(contactElement).toBeInTheDocument();
});

test('renders contact form', () => {
  render(<Contact />);
  const formElement = screen.getByPlaceholderText(/Your Name/i);
  expect(formElement).toBeInTheDocument();
});