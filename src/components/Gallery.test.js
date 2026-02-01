import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Gallery from './Gallery';

describe('Gallery Component', () => {
  test('renders gallery section with title and subtitle', () => {
    render(<Gallery />);
    expect(screen.getByText('Gallery')).toBeInTheDocument();
    expect(screen.getByText(/A visual showcase of my work/)).toBeInTheDocument();
  });

  test('renders gallery items', () => {
    render(<Gallery />);
    expect(screen.getByText('E-Commerce Platform Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Mobile App Wireframes')).toBeInTheDocument();
  });

  test('filters items by search term', () => {
    render(<Gallery />);
    const searchInput = screen.getByPlaceholderText('Search gallery...');
    fireEvent.change(searchInput, { target: { value: 'Dashboard' } });
    expect(screen.getByText('E-Commerce Platform Dashboard')).toBeInTheDocument();
    expect(screen.queryByText('Mobile App Wireframes')).not.toBeInTheDocument();
  });

  test('filters items by category', () => {
    render(<Gallery />);
    const categorySelect = screen.getByDisplayValue('All');
    fireEvent.change(categorySelect, { target: { value: 'UI/UX Design' } });
    expect(screen.getByText('Mobile App Wireframes')).toBeInTheDocument();
    expect(screen.queryByText('E-Commerce Platform Dashboard')).not.toBeInTheDocument();
  });

  test('opens modal when clicking on gallery item', () => {
    render(<Gallery />);
    const galleryItem = screen.getByText('E-Commerce Platform Dashboard').closest('.gallery-item');
    fireEvent.click(galleryItem);
    expect(screen.getByText('E-Commerce Platform Dashboard', { selector: '.modal-title' })).toBeInTheDocument();
  });

  test('closes modal when clicking close button', () => {
    render(<Gallery />);
    const galleryItem = screen.getByText('E-Commerce Platform Dashboard').closest('.gallery-item');
    fireEvent.click(galleryItem);
    const closeButton = document.querySelector('.close-button');
    fireEvent.click(closeButton);
    expect(screen.queryByText('E-Commerce Platform Dashboard', { selector: '.modal-title' })).not.toBeInTheDocument();
  });

  test('navigates between images in modal', () => {
    render(<Gallery />);
    const galleryItem = screen.getByText('E-Commerce Platform Dashboard').closest('.gallery-item');
    fireEvent.click(galleryItem);
    const nextButton = document.querySelector('.nav-button.next');
    fireEvent.click(nextButton);
    expect(screen.getByText('Mobile App Wireframes', { selector: '.modal-title' })).toBeInTheDocument();
  });

  test('shows no items message when no items match filter', () => {
    render(<Gallery />);
    const searchInput = screen.getByPlaceholderText('Search gallery...');
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } });
    expect(screen.getByText('No items found matching your search.')).toBeInTheDocument();
  });

  test('clears filters when clicking show all items button', () => {
    render(<Gallery />);
    const searchInput = screen.getByPlaceholderText('Search gallery...');
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } });
    const clearButton = screen.getByText('Show All Items');
    fireEvent.click(clearButton);
    expect(screen.getByText('E-Commerce Platform Dashboard')).toBeInTheDocument();
  });

  test('displays item metadata correctly', () => {
    render(<Gallery />);
    expect(screen.getAllByText('Web Development').length).toBeGreaterThan(0);
    expect(screen.getAllByText('React').length).toBeGreaterThan(0);
  });
});