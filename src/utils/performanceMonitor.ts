/**
 * Performance Monitoring Utility
 * 
 * This utility helps track and report Web Vitals metrics including:
 * - FCP (First Contentful Paint)
 * - LCP (Largest Contentful Paint)
 * - FID (First Input Delay)
 * - CLS (Cumulative Layout Shift)
 * - TBT (Total Blocking Time)
 * 
 * It also provides JavaScript execution time tracking to help identify
 * performance bottlenecks.
 */

// Types for performance metrics
type MetricName = 'FCP' | 'LCP' | 'FID' | 'CLS' | 'TBT' | 'JS-Execution' | 'JS-Parse';

interface PerformanceMetric {
  name: MetricName;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  timestamp: number;
}

// Store metrics for later analysis
const metrics: PerformanceMetric[] = [];

// Thresholds for performance ratings (in ms, except CLS which is unitless)
const thresholds = {
  FCP: { good: 1800, poor: 3000 },
  LCP: { good: 2500, poor: 4000 },
  FID: { good: 100, poor: 300 },
  CLS: { good: 0.1, poor: 0.25 },
  TBT: { good: 200, poor: 600 },
  'JS-Execution': { good: 1000, poor: 2000 },
  'JS-Parse': { good: 300, poor: 600 }
};

/**
 * Get rating based on metric value and thresholds
 */
function getRating(name: MetricName, value: number): 'good' | 'needs-improvement' | 'poor' {
  if (value <= thresholds[name].good) return 'good';
  if (value >= thresholds[name].poor) return 'poor';
  return 'needs-improvement';
}

/**
 * Record a performance metric
 */
export function recordMetric(name: MetricName, value: number): void {
  const metric: PerformanceMetric = {
    name,
    value,
    rating: getRating(name, value),
    timestamp: Date.now()
  };
  
  metrics.push(metric);
  
  // Log to console in development
  if (import.meta.env.DEV) {
    console.log(
      `%c${name}: %c${value.toFixed(2)}ms %c${metric.rating}`,
      'font-weight: bold',
      'font-weight: normal',
      `color: ${metric.rating === 'good' ? 'green' : metric.rating === 'poor' ? 'red' : 'orange'}`
    );
  }
}

/**
 * Measure JavaScript execution time for a function
 */
export function measureExecutionTime<T>(fn: () => T, label = 'JS-Execution'): T {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  
  recordMetric(label as MetricName, end - start);
  return result;
}

/**
 * Initialize performance monitoring
 */
export function initPerformanceMonitoring(): void {
  // Report FCP
  const fcpObserver = new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    const fcpEntry = entries[entries.length - 1];
    recordMetric('FCP', fcpEntry.startTime);
  });
  
  fcpObserver.observe({ type: 'paint', buffered: true });
  
  // Report LCP
  const lcpObserver = new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    const lcpEntry = entries[entries.length - 1];
    recordMetric('LCP', lcpEntry.startTime);
  });
  
  lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
  
  // Report FID
  const fidObserver = new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    const fidEntry = entries[entries.length - 1] as PerformanceEventTiming;
    recordMetric('FID', fidEntry.processingStart - fidEntry.startTime);
  });
  
  fidObserver.observe({ type: 'first-input', buffered: true });
  
  // Report CLS
  let clsValue = 0;
  let clsEntries: PerformanceEntry[] = [];
  
  const clsObserver = new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    
    entries.forEach(entry => {
      // Only count layout shifts without recent user input
      if (!(entry as any).hadRecentInput) {
        clsValue += (entry as any).value;
        clsEntries.push(entry);
      }
    });
    
    recordMetric('CLS', clsValue);
  });
  
  clsObserver.observe({ type: 'layout-shift', buffered: true });
  
  // Track JS execution time for route changes
  if (typeof window !== 'undefined') {
    const originalPushState = window.history.pushState;
    window.history.pushState = function(...args) {
      const start = performance.now();
      const result = originalPushState.apply(this, args);
      const end = performance.now();
      recordMetric('JS-Execution', end - start);
      return result;
    };
  }
  
  // Report metrics when page is unloaded
  window.addEventListener('unload', () => {
    // Could send metrics to analytics here
    if (import.meta.env.DEV) {
      console.table(metrics);
    }
  });
}

/**
 * Get all recorded metrics
 */
export function getMetrics(): PerformanceMetric[] {
  return [...metrics];
}

/**
 * Get the latest value for a specific metric
 */
export function getLatestMetric(name: MetricName): PerformanceMetric | undefined {
  return metrics.filter(m => m.name === name).pop();
}
