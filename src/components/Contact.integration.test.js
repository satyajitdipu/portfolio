import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeContext } from '../App';
import Contact from './Contact';

const renderContact = () => render(
  <ThemeContext.Provider value={{ darkMode: false, toggleTheme: jest.fn() }}>
    <Contact />
  </ThemeContext.Provider>
);

test('renders contact form', () => {
  renderContact();
  expect(screen.getByRole('form')).toBeInTheDocument();
});

test('renders contact input fields', () => {
  renderContact();
  expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
});

test('renders submit button', () => {
  renderContact();
  expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
});
