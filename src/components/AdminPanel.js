/**
 * AdminPanel
 * Simple local admin interface for editing portfolio data stored in localStorage.
 * This panel is intentionally lightweight and stores data under the `portfolioData` key.
 */
import React, { useState, useEffect, useRef } from 'react';
import './AdminPanel.css';
import { useLocalStorage } from '../utils/helpers';
import { defaultPortfolio } from '../data/defaultPortfolio';

const defaultState = {
  projects: [],
};

const AdminPanel = () => {
  const [portfolio, setPortfolio] = useLocalStorage('portfolioData', defaultPortfolio);
  const [section, setSection] = useState('projects'); // projects|blog|timeline|testimonials|gallery
  const [items, setItems] = useState((portfolio && portfolio[section]) || defaultPortfolio[section] || []);

  // Authentication (session + optional env/local hash)
  const ENV_ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD || '';
  const [isUnlocked, setIsUnlocked] = useState(() => sessionStorage.getItem('adminAuth') === 'true');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Form state (generic)
  const [form, setForm] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState('');

  const fileInputRef = useRef(null);
  const [pwCurrent, setPwCurrent] = useState('');
  const [pwNew, setPwNew] = useState('');
  const [pwConfirm, setPwConfirm] = useState('');

  useEffect(() => {
    setItems((portfolio && portfolio[section]) || defaultPortfolio[section] || []);
  }, [portfolio, section]);

  // Helper to save the whole portfolio
  const saveSection = (newItems) => {
    const newPortfolio = { ...(portfolio || defaultPortfolio), [section]: newItems };
    setItems(newItems);
    setPortfolio(newPortfolio);
  };

  // Generic reset form
  const resetForm = () => setForm({});

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const newId = items.length > 0 ? Math.max(...items.map(i => i.id || 0)) + 1 : 1;
    let newItem = { ...form, id: newId };

    // Normalize collections
    if (section === 'projects') {
      newItem = {
        ...newItem,
        stars: Number(newItem.stars) || 0,
        forks: Number(newItem.forks) || 0,
        technologies: (newItem.technologies || '').split(',').map(s => s.trim()).filter(Boolean),
        features: (newItem.features || '').split('\n').map(s => s.trim()).filter(Boolean),
        createdAt: newItem.createdAt || new Date().toISOString().slice(0,10),
        lastUpdated: newItem.lastUpdated || new Date().toISOString().slice(0,10)
      };
    }

    if (section === 'blog') {
      newItem = { ...newItem, tags: (newItem.tags || '').split(',').map(s => s.trim()).filter(Boolean), readTime: newItem.readTime || '3 min read' };
    }

    if (section === 'testimonials') {
      newItem = { ...newItem, rating: Number(newItem.rating) || 5 };
    }

    const updated = [...items, newItem];
    saveSection(updated);
    resetForm();
  };

  const startEdit = (item) => {
    setEditMode(true);
    if (section === 'projects') {
      setForm({ ...item, technologies: (item.technologies || []).join(', '), features: (item.features || []).join('\n') });
    } else if (section === 'blog') {
      setForm({ ...item, tags: (item.tags || []).join(', ') });
    } else {
      setForm({ ...item });
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updated = items.map(i => i.id === form.id ? {
      ...form,
      ...(section === 'projects' ? { technologies: (form.technologies || '').split(',').map(s => s.trim()).filter(Boolean), features: (form.features || '').split('\n').map(s => s.trim()).filter(Boolean) } : {}),
      ...(section === 'blog' ? { tags: (form.tags || '').split(',').map(s => s.trim()).filter(Boolean) } : {})
    } : i);
    saveSection(updated);
    setEditMode(false);
    resetForm();
  };

  const handleDelete = (id) => {
    if (!window.confirm('Delete item?')) return;
    saveSection(items.filter(i => i.id !== id));
  };

  const importDefaults = () => {
    // Replace whole portfolio with defaultPortfolio
    setPortfolio(defaultPortfolio);
    sessionStorage.setItem('adminAuth', 'true');
    setIsUnlocked(true);
    setMessage('Imported defaults');
  };

  const clearAll = () => {
    if (!window.confirm('Clear all data for this section?')) return;
    saveSection([]);
    setMessage('Cleared section');
  };

  // Export portfolio JSON
  const exportPortfolio = () => {
    try {
      const data = JSON.stringify(portfolio || defaultPortfolio, null, 2);
      // Some test environments (jsdom) may not implement URL.createObjectURL reliably
      if (typeof URL === 'undefined' || typeof URL.createObjectURL !== 'function') {
        // Fallback via data URL
        const a = document.createElement('a');
        a.href = 'data:application/json;charset=utf-8,' + encodeURIComponent(data);
        a.download = 'portfolio.json';
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'portfolio.json';
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      }
      setMessage('Exported portfolio.json');
    } catch (e) {
      setMessage('Export failed');
    }
  };

  // Import portfolio JSON from file input
  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        if (parsed && typeof parsed === 'object') {
          setPortfolio(parsed);
          setMessage('Imported portfolio JSON');
        } else {
          setMessage('Invalid JSON file');
        }
      } catch (err) {
        setMessage('Error parsing JSON');
      }
    };
    reader.readAsText(file);
  };

  // Password utilities
  const checkPasswordMatch = async (input) => {
    // If env password is set, match directly
    if (ENV_ADMIN_PASSWORD) return input === ENV_ADMIN_PASSWORD;
    const storedHash = localStorage.getItem('adminPasswordHash');
    if (storedHash) {
      const { hashString } = require('../utils/helpers');
      const h = await hashString(input);
      return h === storedHash;
    }
    // default fallback
    return input === 'admin123';
  };

  const handleUnlock = async () => {
    const ok = await checkPasswordMatch(password);
    if (ok) {
      setIsUnlocked(true);
      sessionStorage.setItem('adminAuth', 'true');
      setAuthError('');
      setMessage('Unlocked admin');
    } else {
      setAuthError('Invalid password');
    }
    setPassword('');
  };

  const handleChangePassword = async () => {
    setMessage('');
    if (ENV_ADMIN_PASSWORD) {
      setMessage('Cannot change password while env password is set');
      return;
    }
    if (pwNew !== pwConfirm) {
      setMessage('New passwords do not match');
      return;
    }
    const ok = await checkPasswordMatch(pwCurrent);
    if (!ok) {
      setMessage('Current password is incorrect');
      return;
    }
    const { hashString } = require('../utils/helpers');
    const newHash = await hashString(pwNew);
    localStorage.setItem('adminPasswordHash', newHash);
    setMessage('Password changed');
    setPwCurrent(''); setPwNew(''); setPwConfirm('');
  };

  // Simple section forms
  const renderForm = () => {
    if (section === 'projects') {
      return (
        <form onSubmit={editMode ? handleUpdate : handleAdd}>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" value={form.name || ''} onChange={handleInput} required />

          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" value={form.description || ''} onChange={handleInput} rows={3} />

          <label htmlFor="githubLink">GitHub Link</label>
          <input id="githubLink" name="githubLink" value={form.githubLink || ''} onChange={handleInput} />

          <label htmlFor="liveLink">Live Link</label>
          <input id="liveLink" name="liveLink" value={form.liveLink || ''} onChange={handleInput} />

          <label htmlFor="technologies">Technologies (comma separated)</label>
          <input id="technologies" name="technologies" value={form.technologies || ''} onChange={handleInput} />

          <label htmlFor="features">Features (one per line)</label>
          <textarea id="features" name="features" value={form.features || ''} onChange={handleInput} rows={4} />

          <label htmlFor="category">Category</label>
          <input id="category" name="category" value={form.category || ''} onChange={handleInput} />

          <label htmlFor="status">Status</label>
          <select id="status" name="status" value={form.status || 'Completed'} onChange={handleInput}>
            <option>Completed</option>
            <option>In Progress</option>
            <option>Planned</option>
          </select>

          <label htmlFor="stars">Stars</label>
          <input id="stars" name="stars" type="number" value={form.stars || 0} onChange={handleInput} />

          <label htmlFor="forks">Forks</label>
          <input id="forks" name="forks" type="number" value={form.forks || 0} onChange={handleInput} />

          <div className="admin-actions">
            <button type="submit" className="btn btn-primary">{editMode ? 'Save' : 'Add'}</button>
            <button type="button" className="btn" onClick={resetForm}>Reset</button>
            {editMode && <button type="button" className="btn btn-secondary" onClick={() => { resetForm(); setEditMode(false); }}>Cancel</button>}
          </div>
        </form>
      );
    }

    if (section === 'blog') {
      return (
        <form onSubmit={editMode ? handleUpdate : handleAdd}>
          <label htmlFor="title">Title</label>
          <input id="title" name="title" value={form.title || ''} onChange={handleInput} required />

          <label htmlFor="excerpt">Excerpt</label>
          <input id="excerpt" name="excerpt" value={form.excerpt || ''} onChange={handleInput} />

          <label htmlFor="content">Content (HTML)</label>
          <textarea id="content" name="content" value={form.content || ''} onChange={handleInput} rows={6} />

          <label htmlFor="tags">Tags (comma separated)</label>
          <input id="tags" name="tags" value={form.tags || ''} onChange={handleInput} />

          <label htmlFor="author">Author</label>
          <input id="author" name="author" value={form.author || ''} onChange={handleInput} />

          <label htmlFor="date">Date</label>
          <input id="date" name="date" type="date" value={form.date || ''} onChange={handleInput} />

          <div className="admin-actions">
            <button type="submit" className="btn btn-primary">{editMode ? 'Save' : 'Add'}</button>
            <button type="button" className="btn" onClick={resetForm}>Reset</button>
          </div>
        </form>
      );
    }

    if (section === 'testimonials') {
      return (
        <form onSubmit={editMode ? handleUpdate : handleAdd}>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" value={form.name || ''} onChange={handleInput} required />

          <label htmlFor="position">Position</label>
          <input id="position" name="position" value={form.position || ''} onChange={handleInput} />

          <label htmlFor="company">Company</label>
          <input id="company" name="company" value={form.company || ''} onChange={handleInput} />

          <label htmlFor="content">Content</label>
          <textarea id="content" name="content" value={form.content || ''} onChange={handleInput} rows={4} />

          <label htmlFor="rating">Rating</label>
          <input id="rating" name="rating" type="number" min="1" max="5" value={form.rating || 5} onChange={handleInput} />

          <div className="admin-actions">
            <button type="submit" className="btn btn-primary">{editMode ? 'Save' : 'Add'}</button>
            <button type="button" className="btn" onClick={resetForm}>Reset</button>
          </div>
        </form>
      );
    }

    if (section === 'timeline') {
      return (
        <form onSubmit={editMode ? handleUpdate : handleAdd}>
          <label htmlFor="date">Date</label>
          <input id="date" name="date" value={form.date || ''} onChange={handleInput} />

          <label htmlFor="title">Title</label>
          <input id="title" name="title" value={form.title || ''} onChange={handleInput} required />

          <label htmlFor="subtitle">Subtitle</label>
          <input id="subtitle" name="subtitle" value={form.subtitle || ''} onChange={handleInput} />

          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" value={form.description || ''} onChange={handleInput} rows={3} />

          <label htmlFor="location">Location</label>
          <input id="location" name="location" value={form.location || ''} onChange={handleInput} />

          <div className="admin-actions">
            <button type="submit" className="btn btn-primary">{editMode ? 'Save' : 'Add'}</button>
            <button type="button" className="btn" onClick={resetForm}>Reset</button>
          </div>
        </form>
      );
    }

    if (section === 'gallery') {
      return (
        <form onSubmit={editMode ? handleUpdate : handleAdd}>
          <label>Title</label>
          <input name="title" value={form.title || ''} onChange={handleInput} required />

          <label>Image URL</label>
          <input name="image" value={form.image || ''} onChange={handleInput} />

          <label>Category</label>
          <input name="category" value={form.category || ''} onChange={handleInput} />

          <label>Description</label>
          <textarea name="description" value={form.description || ''} onChange={handleInput} rows={3} />

          <div className="admin-actions">
            <button type="submit" className="btn btn-primary">{editMode ? 'Save' : 'Add'}</button>
            <button type="button" className="btn" onClick={resetForm}>Reset</button>
          </div>
        </form>
      );
    }

    return null;
  };

  return (
    <section className="admin-panel" id="admin">
      <div className="container">
        <h2>Admin Panel</h2>
        <p className="admin-sub">Edit portfolio content stored in <code>localStorage</code>.</p>

        {!isUnlocked ? (
          <div className="admin-lock">
            <h3>Unlock Admin</h3>
            <input aria-label="admin-password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <div style={{marginTop:8}}>
              <button className="btn btn-primary" onClick={handleUnlock}>Unlock</button>
              <button className="btn" onClick={() => { setPassword(''); setAuthError(''); }}>Clear</button>
            </div>
            {authError && <div className="error">{authError}</div>}
            <p className="admin-note">Default password: <code>admin123</code> (change in source for production)</p>
          </div>
        ) : (
          <>
            <div className="admin-controls">
              <div className="section-tabs">
                {['projects','blog','timeline','testimonials','gallery'].map(s => (
                  <button key={s} className={`tab ${s === section ? 'active' : ''}`} onClick={() => { setSection(s); resetForm(); setEditMode(false); }}>{s.charAt(0).toUpperCase()+s.slice(1)}</button>
                ))}
                <button className="tab" onClick={() => { importDefaults(); }}>Import Defaults</button>
                <button className="tab" onClick={() => { sessionStorage.removeItem('adminAuth'); setIsUnlocked(false); }}>Lock</button>
              </div>

              <div className="admin-grid">
                <div className="admin-form">
                  <h3>{editMode ? `Edit ${section}` : `Add ${section}`}</h3>
                  {renderForm()}

                  <div className="admin-import">
                    <h4>Actions</h4>
                    <button className="btn" onClick={() => clearAll()}>Clear Section</button>
                    <button className="btn" onClick={() => { setPortfolio(defaultPortfolio); }}>Reset Whole Portfolio</button>

                    <div style={{ marginTop: 8 }}>
                      <button className="btn" onClick={() => exportPortfolio()}>Export Portfolio (JSON)</button>
                      <button className="btn" onClick={() => fileInputRef.current && fileInputRef.current.click()}>Import Portfolio (JSON)</button>
                      <input ref={fileInputRef} onChange={handleFileChange} type="file" accept="application/json,.json" style={{ display: 'none' }} />
                    </div>

                    <div style={{ marginTop: 12 }}>
                      <h4>Change Password</h4>
                      {ENV_ADMIN_PASSWORD ? (
                        <p className="admin-note">Password managed by environment variable; change it there.</p>
                      ) : (
                        <div>
                          <label htmlFor="pw-current">Current Password</label>
                          <input id="pw-current" aria-label="Current Password" type="password" value={pwCurrent} onChange={(e) => setPwCurrent(e.target.value)} />
                          <label htmlFor="pw-new">New Password</label>
                          <input id="pw-new" aria-label="New Password" type="password" value={pwNew} onChange={(e) => setPwNew(e.target.value)} />
                          <label htmlFor="pw-confirm">Confirm New Password</label>
                          <input id="pw-confirm" aria-label="Confirm New Password" type="password" value={pwConfirm} onChange={(e) => setPwConfirm(e.target.value)} />
                          <div style={{ marginTop: 8 }}>
                            <button className="btn" onClick={handleChangePassword}>Change Password</button>
                          </div>
                        </div>
                      )}
                    </div>

                    {message && <div className="admin-note" style={{ marginTop: 8 }}>{message}</div>}
                  </div>
                </div>

                <div className="admin-list">
                  <h3>Existing {section.charAt(0).toUpperCase()+section.slice(1)} ({items.length})</h3>
                  <ul>
                    {items.map((it) => (
                      <li key={it.id || Math.random()} className="admin-item">
                        <div className="meta">
                          <strong>{it.name || it.title || it.title || it.title || it.id}</strong>
                          <span className="category">{it.category || it.position || it.type || ''}</span>
                        </div>
                        <div className="actions">
                          <button className="btn" onClick={() => startEdit(it)}>Edit</button>
                          <button className="btn btn-secondary" onClick={() => handleDelete(it.id)}>Delete</button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <p className="admin-note">Note: Data is stored locally in your browser's localStorage under key <code>portfolioData</code>.</p>
          </>
        )}
      </div>
    </section>
  );
};

export default AdminPanel;