// Advanced data transformation utilities for portfolio components
// This module provides comprehensive data processing capabilities

export const transformProjectData = (projects) => {
  return projects.map(project => ({
    ...project,
    normalizedTitle: normalizeString(project.title),
    searchableContent: createSearchableContent(project),
    tags: extractTags(project.description),
    metadata: enrichMetadata(project)
  }));
};

export const normalizeString = (str) => {
  if (!str) return '';
  return str.toLowerCase().trim().replace(/\s+/g, ' ');
};

export const createSearchableContent = (item) => {
  const fields = ['title', 'description', 'content', 'summary'];
  return fields
    .map(field => item[field])
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
};

export const extractTags = (text) => {
  if (!text) return [];
  const tagPattern = /#(\w+)/g;
  const matches = text.match(tagPattern);
  return matches ? matches.map(tag => tag.slice(1)) : [];
};

export const enrichMetadata = (item) => {
  return {
    createdAt: item.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    version: item.version || '1.0.0',
    status: item.status || 'active',
    priority: calculatePriority(item),
    score: calculateRelevanceScore(item)
  };
};

export const calculatePriority = (item) => {
  let priority = 0;
  if (item.featured) priority += 10;
  if (item.recent) priority += 5;
  if (item.popular) priority += 3;
  return priority;
};

export const calculateRelevanceScore = (item) => {
  let score = 0;
  if (item.title) score += item.title.length / 10;
  if (item.description) score += item.description.length / 50;
  if (item.tags) score += item.tags.length * 2;
  return Math.min(score, 100);
};

export const filterByDateRange = (items, startDate, endDate) => {
  return items.filter(item => {
    const itemDate = new Date(item.createdAt || item.date);
    return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
  });
};

export const sortByField = (items, field, direction = 'asc') => {
  return [...items].sort((a, b) => {
    const aVal = a[field];
    const bVal = b[field];
    
    if (aVal < bVal) return direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return direction === 'asc' ? 1 : -1;
    return 0;
  });
};

export const groupByCategory = (items, categoryField = 'category') => {
  return items.reduce((groups, item) => {
    const category = item[categoryField] || 'uncategorized';
    if (!groups[category]) groups[category] = [];
    groups[category].push(item);
    return groups;
  }, {});
};

export const paginateData = (items, page, pageSize) => {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return {
    data: items.slice(start, end),
    total: items.length,
    page,
    pageSize,
    totalPages: Math.ceil(items.length / pageSize)
  };
};

export const mergeDataSources = (...sources) => {
  return sources.flat().reduce((merged, item) => {
    const existing = merged.find(m => m.id === item.id);
    if (existing) {
      Object.assign(existing, item);
    } else {
      merged.push({ ...item });
    }
    return merged;
  }, []);
};

export const validateDataStructure = (data, schema) => {
  if (!data || typeof data !== 'object') return false;
  
  for (const [key, type] of Object.entries(schema)) {
    if (!(key in data)) return false;
    if (typeof data[key] !== type) return false;
  }
  
  return true;
};

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim();
};

export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(amount);
};

export const formatDate = (date, format = 'long') => {
  const options = {
    short: { year: 'numeric', month: 'short', day: 'numeric' },
    long: { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' },
    time: { hour: '2-digit', minute: '2-digit', second: '2-digit' }
  };
  
  return new Intl.DateTimeFormat('en-US', options[format]).format(new Date(date));
};

export const calculateStatistics = (numbers) => {
  if (!numbers || numbers.length === 0) return null;
  
  const sorted = [...numbers].sort((a, b) => a - b);
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  const mean = sum / numbers.length;
  const median = sorted[Math.floor(sorted.length / 2)];
  const min = sorted[0];
  const max = sorted[sorted.length - 1];
  const range = max - min;
  
  const variance = numbers.reduce((acc, num) => acc + Math.pow(num - mean, 2), 0) / numbers.length;
  const stdDev = Math.sqrt(variance);
  
  return { sum, mean, median, min, max, range, variance, stdDev, count: numbers.length };
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  
  const clonedObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      clonedObj[key] = deepClone(obj[key]);
    }
  }
  return clonedObj;
};

export const deepMerge = (target, ...sources) => {
  if (!sources.length) return target;
  const source = sources.shift();
  
  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        deepMerge(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }
  
  return deepMerge(target, ...sources);
};

export const isObject = (item) => {
  return item && typeof item === 'object' && !Array.isArray(item);
};

export const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export const hashString = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(36);
};

export const compressData = (data) => {
  const str = JSON.stringify(data);
  return btoa(encodeURIComponent(str));
};

export const decompressData = (compressed) => {
  try {
    const str = decodeURIComponent(atob(compressed));
    return JSON.parse(str);
  } catch (e) {
    return null;
  }
};

export const chunkArray = (array, size) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

export const flattenObject = (obj, prefix = '') => {
  return Object.keys(obj).reduce((acc, key) => {
    const pre = prefix.length ? prefix + '.' : '';
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      Object.assign(acc, flattenObject(obj[key], pre + key));
    } else {
      acc[pre + key] = obj[key];
    }
    return acc;
  }, {});
};

export const unflattenObject = (obj) => {
  const result = {};
  for (const key in obj) {
    const keys = key.split('.');
    keys.reduce((acc, part, index) => {
      if (index === keys.length - 1) {
        acc[part] = obj[key];
      } else {
        acc[part] = acc[part] || {};
      }
      return acc[part];
    }, result);
  }
  return result;
};

export const removeDuplicates = (array, key) => {
  if (!key) return [...new Set(array)];
  
  const seen = new Set();
  return array.filter(item => {
    const value = item[key];
    if (seen.has(value)) return false;
    seen.add(value);
    return true;
  });
};

export const intersect = (...arrays) => {
  if (arrays.length === 0) return [];
  return arrays.reduce((a, b) => a.filter(c => b.includes(c)));
};

export const difference = (arr1, arr2) => {
  return arr1.filter(x => !arr2.includes(x));
};

export const symmetricDifference = (arr1, arr2) => {
  return [...difference(arr1, arr2), ...difference(arr2, arr1)];
};

export const union = (...arrays) => {
  return [...new Set(arrays.flat())];
};

export const pickRandom = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

export const shuffle = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const sample = (array, n) => {
  return shuffle(array).slice(0, n);
};

export const partition = (array, predicate) => {
  return array.reduce(([pass, fail], item) => {
    return predicate(item) ? [[...pass, item], fail] : [pass, [...fail, item]];
  }, [[], []]);
};

export const groupBy = (array, keyFn) => {
  return array.reduce((groups, item) => {
    const key = typeof keyFn === 'function' ? keyFn(item) : item[keyFn];
    if (!groups[key]) groups[key] = [];
    groups[key].push(item);
    return groups;
  }, {});
};

export const countBy = (array, keyFn) => {
  return array.reduce((counts, item) => {
    const key = typeof keyFn === 'function' ? keyFn(item) : item[keyFn];
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});
};

export const indexBy = (array, keyFn) => {
  return array.reduce((index, item) => {
    const key = typeof keyFn === 'function' ? keyFn(item) : item[keyFn];
    index[key] = item;
    return index;
  }, {});
};

export const findWhere = (array, properties) => {
  return array.find(item => {
    return Object.keys(properties).every(key => item[key] === properties[key]);
  });
};

export const pluck = (array, key) => {
  return array.map(item => item[key]);
};

export const reject = (array, predicate) => {
  return array.filter(item => !predicate(item));
};

export const compact = (array) => {
  return array.filter(Boolean);
};

export const without = (array, ...values) => {
  return array.filter(item => !values.includes(item));
};

export const initial = (array, n = 1) => {
  return array.slice(0, -n);
};

export const tail = (array, n = 1) => {
  return array.slice(n);
};

export const take = (array, n = 1) => {
  return array.slice(0, n);
};

export const drop = (array, n = 1) => {
  return array.slice(n);
};

export const zip = (...arrays) => {
  const length = Math.max(...arrays.map(arr => arr.length));
  return Array.from({ length }, (_, i) => arrays.map(arr => arr[i]));
};

export const unzip = (arrays) => {
  return zip(...arrays);
};

export const range = (start, end, step = 1) => {
  const result = [];
  for (let i = start; i < end; i += step) {
    result.push(i);
  }
  return result;
};

export const times = (n, iteratee) => {
  return Array.from({ length: n }, (_, i) => iteratee(i));
};

export const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

export const once = (fn) => {
  let called = false;
  let result;
  return (...args) => {
    if (!called) {
      result = fn(...args);
      called = true;
    }
    return result;
  };
};

export const after = (n, fn) => {
  let count = 0;
  return (...args) => {
    count++;
    if (count >= n) return fn(...args);
  };
};

export const before = (n, fn) => {
  let count = 0;
  let result;
  return (...args) => {
    if (count < n) {
      result = fn(...args);
      count++;
    }
    return result;
  };
};

export const compose = (...fns) => {
  return (arg) => fns.reduceRight((acc, fn) => fn(acc), arg);
};

export const pipe = (...fns) => {
  return (arg) => fns.reduce((acc, fn) => fn(acc), arg);
};

export const curry = (fn) => {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return (...nextArgs) => curried.apply(this, [...args, ...nextArgs]);
  };
};

export const partial = (fn, ...args) => {
  return (...remainingArgs) => fn(...args, ...remainingArgs);
};

export const negate = (predicate) => {
  return (...args) => !predicate(...args);
};

export const matches = (source) => {
  return (obj) => {
    return Object.keys(source).every(key => obj[key] === source[key]);
  };
};

export const property = (key) => {
  return (obj) => obj[key];
};

export const propertyOf = (obj) => {
  return (key) => obj[key];
};

export const isEqual = (a, b) => {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (typeof a !== typeof b) return false;
  
  if (typeof a === 'object') {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    
    if (keysA.length !== keysB.length) return false;
    
    return keysA.every(key => isEqual(a[key], b[key]));
  }
  
  return false;
};

export const isEmpty = (value) => {
  if (value == null) return true;
  if (Array.isArray(value) || typeof value === 'string') return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
};

export const isArray = Array.isArray;

export const isString = (value) => typeof value === 'string';

export const isNumber = (value) => typeof value === 'number' && !isNaN(value);

export const isBoolean = (value) => typeof value === 'boolean';

export const isFunction = (value) => typeof value === 'function';

export const isDate = (value) => value instanceof Date;

export const isRegExp = (value) => value instanceof RegExp;

export const isNull = (value) => value === null;

export const isUndefined = (value) => value === undefined;

export const isNil = (value) => value == null;

export const toArray = (value) => {
  if (Array.isArray(value)) return value;
  if (value == null) return [];
  return [value];
};

export const toString = (value) => {
  if (value == null) return '';
  if (typeof value === 'string') return value;
  return String(value);
};

export const toNumber = (value) => {
  if (typeof value === 'number') return value;
  return parseFloat(value) || 0;
};

export const toBoolean = (value) => {
  if (typeof value === 'boolean') return value;
  if (value === 'true') return true;
  if (value === 'false') return false;
  return Boolean(value);
};

export const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};

export const inRange = (value, start, end) => {
  if (end === undefined) {
    end = start;
    start = 0;
  }
  return value >= start && value < end;
};

export const random = (min = 0, max = 1) => {
  return Math.random() * (max - min) + min;
};

export const randomInt = (min = 0, max = 100) => {
  return Math.floor(random(min, max + 1));
};

export const round = (value, precision = 0) => {
  const multiplier = Math.pow(10, precision);
  return Math.round(value * multiplier) / multiplier;
};

export const ceil = (value, precision = 0) => {
  const multiplier = Math.pow(10, precision);
  return Math.ceil(value * multiplier) / multiplier;
};

export const floor = (value, precision = 0) => {
  const multiplier = Math.pow(10, precision);
  return Math.floor(value * multiplier) / multiplier;
};

export const sum = (array) => {
  return array.reduce((acc, val) => acc + val, 0);
};

export const mean = (array) => {
  return sum(array) / array.length;
};

export const median = (array) => {
  const sorted = [...array].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
};

export const min = (array) => {
  return Math.min(...array);
};

export const max = (array) => {
  return Math.max(...array);
};

export const minBy = (array, iteratee) => {
  return array.reduce((min, item) => {
    const value = typeof iteratee === 'function' ? iteratee(item) : item[iteratee];
    const minValue = typeof iteratee === 'function' ? iteratee(min) : min[iteratee];
    return value < minValue ? item : min;
  });
};

export const maxBy = (array, iteratee) => {
  return array.reduce((max, item) => {
    const value = typeof iteratee === 'function' ? iteratee(item) : item[iteratee];
    const maxValue = typeof iteratee === 'function' ? iteratee(max) : max[iteratee];
    return value > maxValue ? item : max;
  });
};

export const sumBy = (array, iteratee) => {
  return array.reduce((sum, item) => {
    const value = typeof iteratee === 'function' ? iteratee(item) : item[iteratee];
    return sum + value;
  }, 0);
};

export const meanBy = (array, iteratee) => {
  return sumBy(array, iteratee) / array.length;
};

export const sortBy = (array, iteratees) => {
  const fns = Array.isArray(iteratees) ? iteratees : [iteratees];
  return [...array].sort((a, b) => {
    for (const fn of fns) {
      const aVal = typeof fn === 'function' ? fn(a) : a[fn];
      const bVal = typeof fn === 'function' ? fn(b) : b[fn];
      if (aVal < bVal) return -1;
      if (aVal > bVal) return 1;
    }
    return 0;
  });
};

export const orderBy = (array, iteratees, orders) => {
  const fns = Array.isArray(iteratees) ? iteratees : [iteratees];
  const dirs = Array.isArray(orders) ? orders : [orders || 'asc'];
  
  return [...array].sort((a, b) => {
    for (let i = 0; i < fns.length; i++) {
      const fn = fns[i];
      const dir = dirs[i] || 'asc';
      const aVal = typeof fn === 'function' ? fn(a) : a[fn];
      const bVal = typeof fn === 'function' ? fn(b) : b[fn];
      
      if (aVal < bVal) return dir === 'asc' ? -1 : 1;
      if (aVal > bVal) return dir === 'asc' ? 1 : -1;
    }
    return 0;
  });
};
