/**
 * Performance monitoring utility to track and measure page load performance
 */

// Extended PerformanceEntry interfaces for specific entry types
interface PerformanceResourceEntry extends PerformanceEntry {
  initiatorType: string;
  transferSize?: number;
}

interface LayoutShiftEntry extends PerformanceEntry {
  hadRecentInput: boolean;
  value: number;
}

interface FirstInputEntry extends PerformanceEntry {
  processingStart: number;
}

interface PerformanceMetrics {
  timeToFirstByte?: number;
  domContentLoaded?: number;
  windowLoaded?: number;
  firstPaint?: number;
  firstContentfulPaint?: number;
  largestContentfulPaint?: number;
  firstInputDelay?: number;
  cumulativeLayoutShift?: number;
  resourceLoadTimes: {
    name: string;
    duration: number;
    size?: number;
    type?: string;
  }[];
}

/**
 * Collects performance metrics from the browser's Performance API
 * @returns Object containing various performance metrics
 */
export const collectPerformanceMetrics = (): PerformanceMetrics => {
  const metrics: PerformanceMetrics = {
    resourceLoadTimes: []
  };

  // Only run in browser environment
  if (typeof window === 'undefined' || !window.performance) {
    return metrics;
  }

  const performance = window.performance;
  const navigationStart = performance.timing?.navigationStart || 0;

  // Basic timing metrics
  if (performance.timing) {
    metrics.timeToFirstByte = performance.timing.responseStart - performance.timing.navigationStart;
    metrics.domContentLoaded = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
    metrics.windowLoaded = performance.timing.loadEventEnd - performance.timing.navigationStart;
  }

  // Paint metrics
  const paintEntries = performance.getEntriesByType('paint');
  paintEntries.forEach(entry => {
    if (entry.name === 'first-paint') {
      metrics.firstPaint = entry.startTime;
    }
    if (entry.name === 'first-contentful-paint') {
      metrics.firstContentfulPaint = entry.startTime;
    }
  });

  // Resource timing
  const resourceEntries = performance.getEntriesByType('resource') as PerformanceResourceEntry[];
  resourceEntries.forEach(entry => {
    metrics.resourceLoadTimes.push({
      name: entry.name,
      duration: entry.duration,
      size: entry.transferSize,
      type: entry.initiatorType
    });
  });

  // Web Vitals metrics via PerformanceObserver (if available)
  // These would typically be collected over time rather than immediately

  return metrics;
};

/**
 * Logs performance metrics to the console
 * @param metrics Performance metrics to log
 */
export const logPerformanceMetrics = (metrics: PerformanceMetrics): void => {
  console.group('Performance Metrics');
  
  if (metrics.timeToFirstByte) {
    console.log(`Time to First Byte: ${metrics.timeToFirstByte.toFixed(2)}ms`);
  }
  
  if (metrics.firstPaint) {
    console.log(`First Paint: ${metrics.firstPaint.toFixed(2)}ms`);
  }
  
  if (metrics.firstContentfulPaint) {
    console.log(`First Contentful Paint: ${metrics.firstContentfulPaint.toFixed(2)}ms`);
  }
  
  if (metrics.domContentLoaded) {
    console.log(`DOM Content Loaded: ${metrics.domContentLoaded.toFixed(2)}ms`);
  }
  
  if (metrics.windowLoaded) {
    console.log(`Window Loaded: ${metrics.windowLoaded.toFixed(2)}ms`);
  }
  
  // Log slow resources (taking more than 500ms)
  const slowResources = metrics.resourceLoadTimes
    .filter(resource => resource.duration > 500)
    .sort((a, b) => b.duration - a.duration);
  
  if (slowResources.length > 0) {
    console.group('Slow Resources (>500ms)');
    slowResources.forEach(resource => {
      console.log(`${resource.name}: ${resource.duration.toFixed(2)}ms (${resource.type})`);
    });
    console.groupEnd();
  }
  
  console.groupEnd();
};

/**
 * Initialize performance monitoring
 * Call this function early in your application lifecycle
 */
export const initPerformanceMonitoring = (): void => {
  if (typeof window === 'undefined') return;

  // Collect metrics when the page finishes loading
  window.addEventListener('load', () => {
    // Wait a moment for final metrics to be available
    setTimeout(() => {
      const metrics = collectPerformanceMetrics();
      logPerformanceMetrics(metrics);
      
      // You could send these metrics to an analytics service here
      // sendMetricsToAnalytics(metrics);
    }, 1000);
  });

  // Set up LCP observer
  if ('PerformanceObserver' in window) {
    try {
      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log(`Largest Contentful Paint: ${lastEntry.startTime.toFixed(2)}ms`);
      });
      
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
      
      // Cumulative Layout Shift
      const clsObserver = new PerformanceObserver((entryList) => {
        let cumulativeLayoutShift = 0;
        
        for (const entry of entryList.getEntries()) {
          const layoutShiftEntry = entry as LayoutShiftEntry;
          if (!layoutShiftEntry.hadRecentInput) {
            cumulativeLayoutShift += layoutShiftEntry.value;
          }
        }
        
        console.log(`Cumulative Layout Shift: ${cumulativeLayoutShift.toFixed(4)}`);
      });
      
      clsObserver.observe({ type: 'layout-shift', buffered: true });
      
      // First Input Delay
      const fidObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          const firstInputEntry = entry as FirstInputEntry;
          console.log(`First Input Delay: ${firstInputEntry.processingStart - firstInputEntry.startTime}ms`);
          break; // Only need the first one
        }
      });
      
      fidObserver.observe({ type: 'first-input', buffered: true });
    } catch (e) {
      console.error('Performance Observer error:', e);
    }
  }
};
