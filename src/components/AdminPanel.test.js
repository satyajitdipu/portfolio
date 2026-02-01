import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdminPanel from './AdminPanel';

describe('AdminPanel', () => {
  beforeEach(() => {
    // clear storage before each test
    window.localStorage.clear();
    window.sessionStorage.clear();
  });

  test('renders lock screen before unlocking', () => {
    render(<AdminPanel />);
    expect(screen.getByText('Unlock Admin')).toBeInTheDocument();
    expect(screen.getByLabelText('admin-password')).toBeInTheDocument();
  });

  test('unlock with wrong password shows error', async () => {
    render(<AdminPanel />);
    fireEvent.change(screen.getByLabelText('admin-password'), { target: { value: 'wrong' } });
    fireEvent.click(screen.getByText('Unlock'));
    await waitFor(() => {
      expect(screen.getByText('Invalid password')).toBeInTheDocument();
    });
  });

  test('unlock with correct password shows admin UI', async () => {
    render(<AdminPanel />);
    fireEvent.change(screen.getByLabelText('admin-password'), { target: { value: 'admin123' } });
    fireEvent.click(screen.getByText('Unlock'));
    await waitFor(() => {
      expect(screen.getByText(/Existing Projects/)).toBeInTheDocument();
    });
  });

  test('adds a project and shows it in the list after unlocking', async () => {
    render(<AdminPanel />);
    // unlock
    fireEvent.change(screen.getByLabelText('admin-password'), { target: { value: 'admin123' } });
    fireEvent.click(screen.getByText('Unlock'));
    await waitFor(() => {
      expect(screen.getByText(/Existing Projects/)).toBeInTheDocument();
    });

    const nameInput = screen.getByLabelText(/Name/i);
    const descInput = screen.getByLabelText(/Description/i);
    const techInput = screen.getByLabelText(/Technologies/i);
    const addButton = screen.getByText('Add');

    fireEvent.change(nameInput, { target: { value: 'Test Project X' } });
    fireEvent.change(descInput, { target: { value: 'A project added from test' } });
    fireEvent.change(techInput, { target: { value: 'React, Node.js' } });

    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText(/Existing Projects \(1\)|Existing Projects \(\d+\)/)).toBeInTheDocument();
      expect(screen.getByText('Test Project X')).toBeInTheDocument();
    });
  });

  test('import defaults button loads defaults into storage', async () => {
    // Ensure the defaults are available (simulate Projects exposure)
    const { defaultPortfolio } = require('../data/defaultPortfolio');
    window.__DEFAULT_PROJECTS__ = defaultPortfolio.projects;

    render(<AdminPanel />);

    // Unlock first
    fireEvent.change(screen.getByLabelText('admin-password'), { target: { value: 'admin123' } });
    fireEvent.click(screen.getByText('Unlock'));
    await waitFor(() => {
      expect(screen.getByText(/Existing Projects/)).toBeInTheDocument();
    });

    const importBtn = screen.getByText('Import Defaults');
    fireEvent.click(importBtn);

    await waitFor(() => {
      // After importing defaults, list should show many items
      const header = screen.getByText(/Existing Projects \(\d+\)/);
      expect(header).toBeInTheDocument();
    });
  });

  test('export portfolio button triggers download and shows message', async () => {
    render(<AdminPanel />);
    fireEvent.change(screen.getByLabelText('admin-password'), { target: { value: 'admin123' } });
    fireEvent.click(screen.getByText('Unlock'));
    await waitFor(() => {
      expect(screen.getByText(/Existing Projects/)).toBeInTheDocument();
    });

    const exportBtn = screen.getByText('Export Portfolio (JSON)');
    fireEvent.click(exportBtn);

    await waitFor(() => {
      expect(screen.getByText('Exported portfolio.json')).toBeInTheDocument();
    });
  });

  test('import portfolio via file input works', async () => {
    render(<AdminPanel />);
    fireEvent.change(screen.getByLabelText('admin-password'), { target: { value: 'admin123' } });
    fireEvent.click(screen.getByText('Unlock'));
    await waitFor(() => {
      expect(screen.getByText(/Existing Projects/)).toBeInTheDocument();
    });

    const input = document.querySelector('input[type="file"]');
    const json = JSON.stringify({ projects: [{ id: 999, name: 'Imported Project' }] });
    const file = new File([json], 'portfolio.json', { type: 'application/json' });

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByText('Imported portfolio JSON')).toBeInTheDocument();
    });
  });

  test('change password flow updates and allows unlock with new password', async () => {
    render(<AdminPanel />);
    fireEvent.change(screen.getByLabelText('admin-password'), { target: { value: 'admin123' } });
    fireEvent.click(screen.getByText('Unlock'));
    await waitFor(() => {
      expect(screen.getByText(/Existing Projects/)).toBeInTheDocument();
    });

    // Fill password fields
    fireEvent.change(screen.getByLabelText(/Current Password/i), { target: { value: 'admin123' } });
    fireEvent.change(screen.getByLabelText('New Password'), { target: { value: 'newsecret' } });
    fireEvent.change(screen.getByLabelText('Confirm New Password'), { target: { value: 'newsecret' } });

    fireEvent.click(screen.getByRole('button', { name: 'Change Password' }));

    await waitFor(() => {
      expect(screen.getByText('Password changed')).toBeInTheDocument();
    });

    // Lock and unlock with new password
    fireEvent.click(screen.getByText('Lock'));
    fireEvent.change(screen.getByLabelText('admin-password'), { target: { value: 'newsecret' } });
    fireEvent.click(screen.getByText('Unlock'));

    await waitFor(() => {
      expect(screen.getByText(/Existing Projects/)).toBeInTheDocument();
    });
  });
});