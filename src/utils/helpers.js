/**
 * helpers.js
 * Central utility functions for the portfolio app.
 * - useLocalStorage: React hook that syncs state with localStorage and emits events when data changes.
 * - scrollToSection: smooth scroll helper
 * - validateEmail: simple email validator
 */
import { useState, useEffect } from 'react';

/**
 * React hook to synchronize state with localStorage. Emits a CustomEvent 'localStorageUpdate'
 * when the value is set so other components can react to cross-tab / cross-component changes.
 * @param {string} key localStorage key
 * @param {any} initialValue default value when no stored value exists
 * @returns {[any, function]} tuple of [state, setState]
 */
export function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
      // notify other parts of the app that localStorage-based data changed
      window.dispatchEvent(new CustomEvent('localStorageUpdate', { detail: { key, value: state } }));
    } catch (err) {
      // ignore write errors
    }
  }, [key, state]);

  return [state, setState];
}

/** Smooth-scroll to a DOM element id */
export const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

/** Validate a simple email format */
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * Hash a string using SHA-256 if available, falling back to a base64 encoding.
 * Returns a hex-like string.
 * @param {string} input
 * @returns {Promise<string>}
 */
export async function hashString(input) {
  if (!input) return '';
  if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // Fallback for environments without SubtleCrypto (e.g., some test runners)
  try {
    // use Node's Buffer if available
    if (typeof Buffer !== 'undefined') {
      return Buffer.from(input, 'utf-8').toString('base64');
    }
  } catch (e) {
    // ignore
  }
  return btoa(unescape(encodeURIComponent(input)));
}