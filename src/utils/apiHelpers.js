// API integration utilities for portfolio data management
// Provides comprehensive API client functionality with error handling

export class APIClient {
  constructor(baseURL, options = {}) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...options.headers
    };
    this.timeout = options.timeout || 30000;
    this.retryAttempts = options.retryAttempts || 3;
    this.retryDelay = options.retryDelay || 1000;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      ...options,
      headers: {
        ...this.defaultHeaders,
        ...options.headers
      }
    };

    let lastError;
    for (let attempt = 0; attempt < this.retryAttempts; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        const response = await fetch(url, {
          ...config,
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new APIError(
            `HTTP ${response.status}: ${response.statusText}`,
            response.status,
            await response.json().catch(() => null)
          );
        }

        return await response.json();
      } catch (error) {
        lastError = error;
        if (attempt < this.retryAttempts - 1) {
          await this.delay(this.retryDelay * Math.pow(2, attempt));
        }
      }
    }

    throw lastError;
  }

  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    return this.request(url, { method: 'GET' });
  }

  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async patch(endpoint, data) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
  }

  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export class APIError extends Error {
  constructor(message, status, details) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.details = details;
  }
}

export class CacheManager {
  constructor(options = {}) {
    this.cache = new Map();
    this.maxSize = options.maxSize || 100;
    this.ttl = options.ttl || 300000; // 5 minutes
    this.cleanupInterval = setInterval(() => this.cleanup(), 60000);
  }

  set(key, value, ttl = this.ttl) {
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }

    this.cache.set(key, {
      value,
      expires: Date.now() + ttl
    });
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() > item.expires) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  has(key) {
    return this.get(key) !== null;
  }

  delete(key) {
    return this.cache.delete(key);
  }

  clear() {
    this.cache.clear();
  }

  cleanup() {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expires) {
        this.cache.delete(key);
      }
    }
  }

  destroy() {
    clearInterval(this.cleanupInterval);
    this.clear();
  }
}

export class RequestQueue {
  constructor(options = {}) {
    this.queue = [];
    this.running = 0;
    this.concurrency = options.concurrency || 5;
    this.paused = false;
  }

  add(fn) {
    return new Promise((resolve, reject) => {
      this.queue.push({ fn, resolve, reject });
      this.process();
    });
  }

  async process() {
    if (this.paused || this.running >= this.concurrency || this.queue.length === 0) {
      return;
    }

    this.running++;
    const { fn, resolve, reject } = this.queue.shift();

    try {
      const result = await fn();
      resolve(result);
    } catch (error) {
      reject(error);
    } finally {
      this.running--;
      this.process();
    }
  }

  pause() {
    this.paused = true;
  }

  resume() {
    this.paused = false;
    this.process();
  }

  clear() {
    this.queue = [];
  }

  get pending() {
    return this.queue.length;
  }
}

export class DataValidator {
  static validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  static validateURL(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  static validatePhone(phone) {
    const re = /^[\d\s\-\+\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
  }

  static validateRequired(value) {
    return value !== null && value !== undefined && value !== '';
  }

  static validateMinLength(value, min) {
    return value && value.length >= min;
  }

  static validateMaxLength(value, max) {
    return value && value.length <= max;
  }

  static validatePattern(value, pattern) {
    return pattern.test(value);
  }

  static validateRange(value, min, max) {
    const num = parseFloat(value);
    return !isNaN(num) && num >= min && num <= max;
  }

  static validateSchema(data, schema) {
    const errors = {};

    for (const [field, rules] of Object.entries(schema)) {
      const value = data[field];
      const fieldErrors = [];

      if (rules.required && !this.validateRequired(value)) {
        fieldErrors.push('This field is required');
      }

      if (value && rules.type) {
        if (rules.type === 'email' && !this.validateEmail(value)) {
          fieldErrors.push('Invalid email format');
        }
        if (rules.type === 'url' && !this.validateURL(value)) {
          fieldErrors.push('Invalid URL format');
        }
        if (rules.type === 'phone' && !this.validatePhone(value)) {
          fieldErrors.push('Invalid phone number');
        }
      }

      if (value && rules.minLength && !this.validateMinLength(value, rules.minLength)) {
        fieldErrors.push(`Minimum length is ${rules.minLength}`);
      }

      if (value && rules.maxLength && !this.validateMaxLength(value, rules.maxLength)) {
        fieldErrors.push(`Maximum length is ${rules.maxLength}`);
      }

      if (value && rules.pattern && !this.validatePattern(value, rules.pattern)) {
        fieldErrors.push('Invalid format');
      }

      if (value !== undefined && rules.min !== undefined && rules.max !== undefined) {
        if (!this.validateRange(value, rules.min, rules.max)) {
          fieldErrors.push(`Value must be between ${rules.min} and ${rules.max}`);
        }
      }

      if (fieldErrors.length > 0) {
        errors[field] = fieldErrors;
      }
    }

    return {
      valid: Object.keys(errors).length === 0,
      errors
    };
  }
}

export class RateLimiter {
  constructor(maxRequests, windowMs) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.requests = [];
  }

  async acquire() {
    const now = Date.now();
    this.requests = this.requests.filter(time => now - time < this.windowMs);

    if (this.requests.length >= this.maxRequests) {
      const oldestRequest = this.requests[0];
      const waitTime = this.windowMs - (now - oldestRequest);
      await new Promise(resolve => setTimeout(resolve, waitTime));
      return this.acquire();
    }

    this.requests.push(now);
    return true;
  }

  reset() {
    this.requests = [];
  }
}

export class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
    return () => this.off(event, listener);
  }

  once(event, listener) {
    const onceWrapper = (...args) => {
      listener(...args);
      this.off(event, onceWrapper);
    };
    return this.on(event, onceWrapper);
  }

  off(event, listener) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(l => l !== listener);
  }

  emit(event, ...args) {
    if (!this.events[event]) return;
    this.events[event].forEach(listener => listener(...args));
  }

  removeAllListeners(event) {
    if (event) {
      delete this.events[event];
    } else {
      this.events = {};
    }
  }

  listenerCount(event) {
    return this.events[event] ? this.events[event].length : 0;
  }
}

export class StateManager {
  constructor(initialState = {}) {
    this.state = initialState;
    this.listeners = new Set();
    this.history = [];
    this.maxHistory = 50;
  }

  getState() {
    return { ...this.state };
  }

  setState(updates) {
    const prevState = this.getState();
    this.state = { ...this.state, ...updates };
    
    if (this.history.length >= this.maxHistory) {
      this.history.shift();
    }
    this.history.push(prevState);

    this.notify(this.state, prevState);
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify(newState, oldState) {
    this.listeners.forEach(listener => listener(newState, oldState));
  }

  undo() {
    if (this.history.length === 0) return false;
    this.state = this.history.pop();
    this.notify(this.state, null);
    return true;
  }

  reset(newState = {}) {
    this.state = newState;
    this.history = [];
    this.notify(this.state, null);
  }
}

export class WebSocketClient extends EventEmitter {
  constructor(url, options = {}) {
    super();
    this.url = url;
    this.options = options;
    this.ws = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = options.maxReconnectAttempts || 5;
    this.reconnectDelay = options.reconnectDelay || 1000;
    this.connect();
  }

  connect() {
    try {
      this.ws = new WebSocket(this.url);

      this.ws.onopen = () => {
        this.reconnectAttempts = 0;
        this.emit('connected');
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.emit('message', data);
        } catch {
          this.emit('message', event.data);
        }
      };

      this.ws.onerror = (error) => {
        this.emit('error', error);
      };

      this.ws.onclose = () => {
        this.emit('disconnected');
        this.reconnect();
      };
    } catch (error) {
      this.emit('error', error);
      this.reconnect();
    }
  }

  reconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      this.emit('reconnect_failed');
      return;
    }

    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
    
    setTimeout(() => {
      this.emit('reconnecting', this.reconnectAttempts);
      this.connect();
    }, delay);
  }

  send(data) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(typeof data === 'string' ? data : JSON.stringify(data));
      return true;
    }
    return false;
  }

  close() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  get isConnected() {
    return this.ws && this.ws.readyState === WebSocket.OPEN;
  }
}

export class LocalStorageManager {
  constructor(prefix = 'app_') {
    this.prefix = prefix;
  }

  set(key, value, ttl = null) {
    const item = {
      value,
      timestamp: Date.now(),
      ttl
    };
    localStorage.setItem(this.prefix + key, JSON.stringify(item));
  }

  get(key) {
    const itemStr = localStorage.getItem(this.prefix + key);
    if (!itemStr) return null;

    try {
      const item = JSON.parse(itemStr);
      if (item.ttl && Date.now() - item.timestamp > item.ttl) {
        this.remove(key);
        return null;
      }
      return item.value;
    } catch {
      return null;
    }
  }

  remove(key) {
    localStorage.removeItem(this.prefix + key);
  }

  clear() {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(this.prefix)) {
        localStorage.removeItem(key);
      }
    });
  }

  has(key) {
    return this.get(key) !== null;
  }

  keys() {
    return Object.keys(localStorage)
      .filter(key => key.startsWith(this.prefix))
      .map(key => key.substring(this.prefix.length));
  }
}

export class SessionStorageManager extends LocalStorageManager {
  set(key, value, ttl = null) {
    const item = {
      value,
      timestamp: Date.now(),
      ttl
    };
    sessionStorage.setItem(this.prefix + key, JSON.stringify(item));
  }

  get(key) {
    const itemStr = sessionStorage.getItem(this.prefix + key);
    if (!itemStr) return null;

    try {
      const item = JSON.parse(itemStr);
      if (item.ttl && Date.now() - item.timestamp > item.ttl) {
        this.remove(key);
        return null;
      }
      return item.value;
    } catch {
      return null;
    }
  }

  remove(key) {
    sessionStorage.removeItem(this.prefix + key);
  }

  clear() {
    const keys = Object.keys(sessionStorage);
    keys.forEach(key => {
      if (key.startsWith(this.prefix)) {
        sessionStorage.removeItem(key);
      }
    });
  }

  keys() {
    return Object.keys(sessionStorage)
      .filter(key => key.startsWith(this.prefix))
      .map(key => key.substring(this.prefix.length));
  }
}

export const apiClient = new APIClient(process.env.REACT_APP_API_URL || '/api');
export const cacheManager = new CacheManager({ maxSize: 200, ttl: 600000 });
export const requestQueue = new RequestQueue({ concurrency: 10 });
export const localStorage = new LocalStorageManager('portfolio_');
export const sessionStorage = new SessionStorageManager('portfolio_session_');

export default {
  APIClient,
  APIError,
  CacheManager,
  RequestQueue,
  DataValidator,
  RateLimiter,
  EventEmitter,
  StateManager,
  WebSocketClient,
  LocalStorageManager,
  SessionStorageManager,
  apiClient,
  cacheManager,
  requestQueue,
  localStorage,
  sessionStorage
};
