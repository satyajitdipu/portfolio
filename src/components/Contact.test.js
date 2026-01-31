import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Contact from './Contact';

test('renders contact section', () => {
  render(<Contact />);
  const contactElement = screen.getByText(/Get In Touch/i);
  expect(contactElement).toBeInTheDocument();
});

test('renders contact form', () => {
  render(<Contact />);
  const formElement = screen.getByPlaceholderText(/John Doe/i);
  expect(formElement).toBeInTheDocument();
});