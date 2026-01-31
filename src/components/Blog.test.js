import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Blog from './Blog';

describe('Blog Component', () => {
  test('renders blog section with title and subtitle', () => {
    render(<Blog />);
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText(/Thoughts, insights, and tutorials/)).toBeInTheDocument();
  });

  test('renders blog posts', () => {
    render(<Blog />);
    expect(screen.getByText('The Evolution of Web Development: From Static Sites to Modern Frameworks')).toBeInTheDocument();
    expect(screen.getByText('Machine Learning in Agriculture: Revolutionizing Crop Management')).toBeInTheDocument();
  });

  test('filters posts by search term', () => {
    render(<Blog />);
    const searchInput = screen.getByPlaceholderText('Search posts...');
    fireEvent.change(searchInput, { target: { value: 'Machine Learning' } });
    expect(screen.getByText('Machine Learning in Agriculture: Revolutionizing Crop Management')).toBeInTheDocument();
    expect(screen.queryByText('The Evolution of Web Development: From Static Sites to Modern Frameworks')).not.toBeInTheDocument();
  });

  test('filters posts by tag', () => {
    render(<Blog />);
    const tagSelect = screen.getByDisplayValue('All');
    fireEvent.change(tagSelect, { target: { value: 'AI' } });
    expect(screen.getByText('Machine Learning in Agriculture: Revolutionizing Crop Management')).toBeInTheDocument();
    expect(screen.queryByText('The Evolution of Web Development: From Static Sites to Modern Frameworks')).not.toBeInTheDocument();
  });

  test('opens full post view when clicking on a blog card', () => {
    render(<Blog />);
    const blogCard = screen.getByText('The Evolution of Web Development: From Static Sites to Modern Frameworks').closest('.blog-card');
    fireEvent.click(blogCard);
    expect(screen.getByText('The Dawn of the Web')).toBeInTheDocument();
  });

  test('returns to blog list when clicking back button', () => {
    render(<Blog />);
    const blogCard = screen.getByText('The Evolution of Web Development: From Static Sites to Modern Frameworks').closest('.blog-card');
    fireEvent.click(blogCard);
    const backButton = screen.getByText('Back to Blog');
    fireEvent.click(backButton);
    expect(screen.getByText('Thoughts, insights, and tutorials')).toBeInTheDocument();
  });

  test('displays pagination when there are multiple pages', () => {
    render(<Blog />);
    // Since we have 6 posts and 3 per page, there should be pagination
    expect(screen.getByText('2')).toBeInTheDocument(); // Page 2 button
  });

  test('shows no posts message when no posts match filter', () => {
    render(<Blog />);
    const searchInput = screen.getByPlaceholderText('Search posts...');
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } });
    expect(screen.getByText('No posts found matching your search.')).toBeInTheDocument();
  });

  test('clears filters when clicking clear filters button', () => {
    render(<Blog />);
    const searchInput = screen.getByPlaceholderText('Search posts...');
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } });
    const clearButton = screen.getByText('Clear Filters');
    fireEvent.click(clearButton);
    expect(screen.getByText('The Evolution of Web Development: From Static Sites to Modern Frameworks')).toBeInTheDocument();
  });
});