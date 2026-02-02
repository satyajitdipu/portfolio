// Advanced analytics and performance monitoring utilities
// Provides comprehensive tracking and analysis capabilities

export class PerformanceMonitor {
  constructor() {
    this.metrics = new Map();
    this.observers = [];
    this.startTime = performance.now();
  }

  mark(name) {
    performance.mark(name);
    this.metrics.set(name, performance.now() - this.startTime);
  }

  measure(name, startMark, endMark) {
    try {
      performance.measure(name, startMark, endMark);
      const measure = performance.getEntriesByName(name, 'measure')[0];
      return {
        name,
        duration: measure.duration,
        startTime: measure.startTime
      };
    } catch (error) {
      console.error('Performance measurement failed:', error);
      return null;
    }
  }

  getMetric(name) {
    return this.metrics.get(name);
  }

  getAllMetrics() {
    return Object.fromEntries(this.metrics);
  }

  clearMetrics() {
    this.metrics.clear();
    performance.clearMarks();
    performance.clearMeasures();
  }

  observe(callback) {
    this.observers.push(callback);
    return () => {
      this.observers = this.observers.filter(cb => cb !== callback);
    };
  }

  notify(metric) {
    this.observers.forEach(callback => callback(metric));
  }

  trackComponentRender(componentName) {
    const startMark = `${componentName}-render-start`;
    const endMark = `${componentName}-render-end`;
    
    return {
      start: () => this.mark(startMark),
      end: () => {
        this.mark(endMark);
        const duration = this.measure(`${componentName}-render`, startMark, endMark);
        this.notify({ component: componentName, ...duration });
        return duration;
      }
    };
  }

  getNavigationTiming() {
    if (!performance.getEntriesByType) return null;
    
    const navTiming = performance.getEntriesByType('navigation')[0];
    if (!navTiming) return null;

    return {
      dns: navTiming.domainLookupEnd - navTiming.domainLookupStart,
      tcp: navTiming.connectEnd - navTiming.connectStart,
      request: navTiming.responseStart - navTiming.requestStart,
      response: navTiming.responseEnd - navTiming.responseStart,
      domInteractive: navTiming.domInteractive - navTiming.fetchStart,
      domComplete: navTiming.domComplete - navTiming.fetchStart,
      loadComplete: navTiming.loadEventEnd - navTiming.fetchStart
    };
  }

  getResourceTiming() {
    if (!performance.getEntriesByType) return [];
    
    return performance.getEntriesByType('resource').map(resource => ({
      name: resource.name,
      type: resource.initiatorType,
      duration: resource.duration,
      size: resource.transferSize,
      cached: resource.transferSize === 0 && resource.decodedBodySize > 0
    }));
  }

  getLargestContentfulPaint() {
    return new Promise((resolve) => {
      if (!window.PerformanceObserver) {
        resolve(null);
        return;
      }

      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        resolve(lastEntry.renderTime || lastEntry.loadTime);
      });

      observer.observe({ entryTypes: ['largest-contentful-paint'] });

      setTimeout(() => {
        observer.disconnect();
        resolve(null);
      }, 10000);
    });
  }

  getFirstInputDelay() {
    return new Promise((resolve) => {
      if (!window.PerformanceObserver) {
        resolve(null);
        return;
      }

      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (entry.processingStart) {
            resolve(entry.processingStart - entry.startTime);
          }
        });
      });

      observer.observe({ entryTypes: ['first-input'] });

      setTimeout(() => {
        observer.disconnect();
        resolve(null);
      }, 10000);
    });
  }

  getCumulativeLayoutShift() {
    return new Promise((resolve) => {
      if (!window.PerformanceObserver) {
        resolve(null);
        return;
      }

      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
      });

      observer.observe({ entryTypes: ['layout-shift'] });

      setTimeout(() => {
        observer.disconnect();
        resolve(clsValue);
      }, 10000);
    });
  }

  getMemoryUsage() {
    if (!performance.memory) return null;

    return {
      usedJSHeapSize: performance.memory.usedJSHeapSize,
      totalJSHeapSize: performance.memory.totalJSHeapSize,
      jsHeapSizeLimit: performance.memory.jsHeapSizeLimit,
      percentage: (performance.memory.usedJSHeapSize / performance.memory.jsHeapSizeLimit) * 100
    };
  }
}

export class AnalyticsTracker {
  constructor(options = {}) {
    this.queue = [];
    this.userId = options.userId || null;
    this.sessionId = this.generateSessionId();
    this.enabled = options.enabled !== false;
    this.endpoint = options.endpoint || '/api/analytics';
    this.batchSize = options.batchSize || 10;
    this.flushInterval = options.flushInterval || 30000;
    
    if (this.enabled) {
      this.startAutoFlush();
    }
  }

  generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  track(event, properties = {}) {
    if (!this.enabled) return;

    const eventData = {
      event,
      properties,
      userId: this.userId,
      sessionId: this.sessionId,
      timestamp: new Date().toISOString(),
      page: window.location.pathname,
      referrer: document.referrer,
      userAgent: navigator.userAgent
    };

    this.queue.push(eventData);

    if (this.queue.length >= this.batchSize) {
      this.flush();
    }
  }

  page(name, properties = {}) {
    this.track('page_view', {
      name,
      ...properties,
      url: window.location.href,
      path: window.location.pathname,
      search: window.location.search,
      hash: window.location.hash,
      title: document.title
    });
  }

  identify(userId, traits = {}) {
    this.userId = userId;
    this.track('identify', {
      userId,
      traits
    });
  }

  group(groupId, traits = {}) {
    this.track('group', {
      groupId,
      traits
    });
  }

  alias(newId, previousId) {
    this.track('alias', {
      newId,
      previousId: previousId || this.userId
    });
  }

  async flush() {
    if (this.queue.length === 0) return;

    const events = [...this.queue];
    this.queue = [];

    try {
      await fetch(this.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ events })
      });
    } catch (error) {
      console.error('Analytics flush failed:', error);
      this.queue.unshift(...events);
    }
  }

  startAutoFlush() {
    this.autoFlushInterval = setInterval(() => {
      this.flush();
    }, this.flushInterval);
  }

  stopAutoFlush() {
    if (this.autoFlushInterval) {
      clearInterval(this.autoFlushInterval);
      this.autoFlushInterval = null;
    }
  }

  disable() {
    this.enabled = false;
    this.stopAutoFlush();
    this.queue = [];
  }

  enable() {
    this.enabled = true;
    this.startAutoFlush();
  }
}

export class ErrorTracker {
  constructor(options = {}) {
    this.errors = [];
    this.maxErrors = options.maxErrors || 100;
    this.endpoint = options.endpoint || '/api/errors';
    this.enabled = options.enabled !== false;
    
    if (this.enabled) {
      this.attachListeners();
    }
  }

  attachListeners() {
    window.addEventListener('error', (event) => {
      this.captureError({
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error
      });
    });

    window.addEventListener('unhandledrejection', (event) => {
      this.captureError({
        message: 'Unhandled Promise Rejection',
        reason: event.reason
      });
    });
  }

  captureError(error, context = {}) {
    if (!this.enabled) return;

    const errorData = {
      ...error,
      context,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      stack: error.error?.stack || error.stack
    };

    this.errors.push(errorData);

    if (this.errors.length > this.maxErrors) {
      this.errors.shift();
    }

    this.report(errorData);
  }

  async report(error) {
    try {
      await fetch(this.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(error)
      });
    } catch (err) {
      console.error('Error reporting failed:', err);
    }
  }

  getErrors() {
    return [...this.errors];
  }

  clearErrors() {
    this.errors = [];
  }

  disable() {
    this.enabled = false;
  }

  enable() {
    this.enabled = true;
  }
}

export class ABTestManager {
  constructor() {
    this.experiments = new Map();
    this.assignments = new Map();
  }

  createExperiment(id, variants, options = {}) {
    this.experiments.set(id, {
      id,
      variants,
      traffic: options.traffic || 1.0,
      targeting: options.targeting || (() => true)
    });
  }

  getVariant(experimentId, userId) {
    if (this.assignments.has(`${experimentId}_${userId}`)) {
      return this.assignments.get(`${experimentId}_${userId}`);
    }

    const experiment = this.experiments.get(experimentId);
    if (!experiment) return null;

    if (!experiment.targeting(userId)) return null;
    if (Math.random() > experiment.traffic) return null;

    const variantIndex = this.hashCode(userId + experimentId) % experiment.variants.length;
    const variant = experiment.variants[variantIndex];

    this.assignments.set(`${experimentId}_${userId}`, variant);
    return variant;
  }

  hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  }

  trackConversion(experimentId, userId, metric, value = 1) {
    const variant = this.getVariant(experimentId, userId);
    if (!variant) return;

    // Send conversion event to analytics
    return {
      experimentId,
      userId,
      variant,
      metric,
      value
    };
  }
}

export class FeatureFlagManager {
  constructor() {
    this.flags = new Map();
    this.overrides = new Map();
  }

  setFlag(name, enabled, options = {}) {
    this.flags.set(name, {
      enabled,
      rollout: options.rollout || 1.0,
      targeting: options.targeting || (() => true)
    });
  }

  isEnabled(name, userId = null) {
    if (this.overrides.has(name)) {
      return this.overrides.get(name);
    }

    const flag = this.flags.get(name);
    if (!flag) return false;

    if (!flag.enabled) return false;
    if (userId && !flag.targeting(userId)) return false;
    
    if (userId) {
      const hash = this.hashCode(userId + name);
      return (hash % 100) < (flag.rollout * 100);
    }

    return Math.random() < flag.rollout;
  }

  override(name, value) {
    this.overrides.set(name, value);
  }

  clearOverride(name) {
    this.overrides.delete(name);
  }

  clearAllOverrides() {
    this.overrides.clear();
  }

  hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  }
}

export class UserBehaviorTracker {
  constructor(options = {}) {
    this.events = [];
    this.sessions = new Map();
    this.maxEvents = options.maxEvents || 1000;
    this.sessionTimeout = options.sessionTimeout || 1800000; // 30 minutes
    
    this.trackPageViews();
    this.trackClicks();
    this.trackScrolls();
    this.trackFormSubmissions();
  }

  trackPageViews() {
    const trackView = () => {
      this.recordEvent('page_view', {
        url: window.location.href,
        title: document.title,
        referrer: document.referrer
      });
    };

    trackView();
    
    window.addEventListener('popstate', trackView);
    
    const originalPushState = history.pushState;
    history.pushState = function(...args) {
      originalPushState.apply(this, args);
      trackView();
    };
  }

  trackClicks() {
    document.addEventListener('click', (event) => {
      const target = event.target;
      this.recordEvent('click', {
        tagName: target.tagName,
        id: target.id,
        className: target.className,
        text: target.textContent?.slice(0, 50),
        x: event.clientX,
        y: event.clientY
      });
    });
  }

  trackScrolls() {
    let lastScrollTop = 0;
    let scrollDepth = 0;

    const trackScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const currentDepth = Math.round((scrollTop / (documentHeight - windowHeight)) * 100);

      if (currentDepth > scrollDepth) {
        scrollDepth = currentDepth;
        if (scrollDepth % 25 === 0) {
          this.recordEvent('scroll_depth', {
            depth: scrollDepth,
            direction: scrollTop > lastScrollTop ? 'down' : 'up'
          });
        }
      }

      lastScrollTop = scrollTop;
    };

    window.addEventListener('scroll', this.throttle(trackScroll, 1000));
  }

  trackFormSubmissions() {
    document.addEventListener('submit', (event) => {
      const form = event.target;
      this.recordEvent('form_submit', {
        formId: form.id,
        formName: form.name,
        action: form.action,
        method: form.method
      });
    });
  }

  recordEvent(type, data) {
    const event = {
      type,
      data,
      timestamp: Date.now(),
      sessionId: this.getCurrentSessionId()
    };

    this.events.push(event);

    if (this.events.length > this.maxEvents) {
      this.events.shift();
    }
  }

  getCurrentSessionId() {
    const now = Date.now();
    let currentSession = null;

    for (const [sessionId, session] of this.sessions.entries()) {
      if (now - session.lastActivity < this.sessionTimeout) {
        currentSession = sessionId;
        session.lastActivity = now;
        break;
      }
    }

    if (!currentSession) {
      currentSession = `session_${now}_${Math.random().toString(36).substr(2, 9)}`;
      this.sessions.set(currentSession, {
        id: currentSession,
        startTime: now,
        lastActivity: now
      });
    }

    return currentSession;
  }

  getEvents(filter = {}) {
    let filtered = this.events;

    if (filter.type) {
      filtered = filtered.filter(e => e.type === filter.type);
    }

    if (filter.startTime) {
      filtered = filtered.filter(e => e.timestamp >= filter.startTime);
    }

    if (filter.endTime) {
      filtered = filtered.filter(e => e.timestamp <= filter.endTime);
    }

    if (filter.sessionId) {
      filtered = filtered.filter(e => e.sessionId === filter.sessionId);
    }

    return filtered;
  }

  getSessions() {
    return Array.from(this.sessions.values());
  }

  clearEvents() {
    this.events = [];
  }

  throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
}

export class ConversionFunnel {
  constructor(steps) {
    this.steps = steps;
    this.data = new Map();
  }

  trackStep(userId, stepName, data = {}) {
    if (!this.data.has(userId)) {
      this.data.set(userId, {
        steps: [],
        startTime: Date.now()
      });
    }

    const userData = this.data.get(userId);
    userData.steps.push({
      name: stepName,
      timestamp: Date.now(),
      data
    });
  }

  getConversionRate() {
    const users = Array.from(this.data.values());
    const totalUsers = users.length;
    if (totalUsers === 0) return 0;

    const convertedUsers = users.filter(userData => {
      return this.steps.every(step => 
        userData.steps.some(userStep => userStep.name === step)
      );
    });

    return (convertedUsers.length / totalUsers) * 100;
  }

  getStepConversionRates() {
    const rates = {};
    let previousCount = this.data.size;

    this.steps.forEach(step => {
      const count = Array.from(this.data.values()).filter(userData =>
        userData.steps.some(userStep => userStep.name === step)
      ).length;

      rates[step] = {
        count,
        rate: previousCount > 0 ? (count / previousCount) * 100 : 0,
        dropoff: previousCount - count
      };

      previousCount = count;
    });

    return rates;
  }

  getAverageTimeToConvert() {
    const users = Array.from(this.data.values()).filter(userData => {
      return this.steps.every(step => 
        userData.steps.some(userStep => userStep.name === step)
      );
    });

    if (users.length === 0) return 0;

    const times = users.map(userData => {
      const lastStep = userData.steps[userData.steps.length - 1];
      return lastStep.timestamp - userData.startTime;
    });

    return times.reduce((a, b) => a + b, 0) / times.length;
  }

  getDropoffPoints() {
    const dropoffs = [];
    
    for (let i = 0; i < this.steps.length - 1; i++) {
      const currentStep = this.steps[i];
      const nextStep = this.steps[i + 1];

      const usersAtCurrent = Array.from(this.data.values()).filter(userData =>
        userData.steps.some(userStep => userStep.name === currentStep)
      ).length;

      const usersAtNext = Array.from(this.data.values()).filter(userData =>
        userData.steps.some(userStep => userStep.name === nextStep)
      ).length;

      const dropoffRate = usersAtCurrent > 0 ? 
        ((usersAtCurrent - usersAtNext) / usersAtCurrent) * 100 : 0;

      dropoffs.push({
        from: currentStep,
        to: nextStep,
        dropoffCount: usersAtCurrent - usersAtNext,
        dropoffRate
      });
    }

    return dropoffs.sort((a, b) => b.dropoffRate - a.dropoffRate);
  }
}

export const performanceMonitor = new PerformanceMonitor();
export const analyticsTracker = new AnalyticsTracker({ enabled: true });
export const errorTracker = new ErrorTracker({ enabled: true });
export const abTestManager = new ABTestManager();
export const featureFlagManager = new FeatureFlagManager();
export const userBehaviorTracker = new UserBehaviorTracker();

export default {
  PerformanceMonitor,
  AnalyticsTracker,
  ErrorTracker,
  ABTestManager,
  FeatureFlagManager,
  UserBehaviorTracker,
  ConversionFunnel,
  performanceMonitor,
  analyticsTracker,
  errorTracker,
  abTestManager,
  featureFlagManager,
  userBehaviorTracker
};
