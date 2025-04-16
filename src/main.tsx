import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initPerformanceMonitoring } from './utils/performanceMonitor'
import { deferInitialization, scheduleIdleWork } from './utils/deferredExecution'
import { initScriptOptimizer } from './utils/scriptOptimizer'

// Initialize performance monitoring and script optimization
if (typeof window !== 'undefined') {
  // Critical initialization - run immediately
  initPerformanceMonitoring();
  
  // Add font preloading for better LCP performance
  // This helps reduce render-blocking resources
  const fontPreloadLink = document.createElement('link');
  fontPreloadLink.rel = 'preload';
  fontPreloadLink.as = 'font';
  fontPreloadLink.href = '/fonts/inter-var-latin.woff2'; // Adjust path as needed
  fontPreloadLink.type = 'font/woff2';
  fontPreloadLink.crossOrigin = 'anonymous';
  document.head.appendChild(fontPreloadLink);
  
  // Non-critical initialization - defer to idle time
  deferInitialization(() => {
    // Initialize script optimizer after the page has loaded
    initScriptOptimizer();
    
    // Preconnect to any third-party domains to speed up subsequent requests
    ['https://fonts.googleapis.com', 'https://fonts.gstatic.com'].forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  });
  
  // Monitor long tasks to identify JavaScript bottlenecks
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          // Log long tasks (>50ms) that might be causing jank
          if (entry.duration > 50) {
            console.warn(`Long task detected: ${entry.duration.toFixed(2)}ms`, entry);
          }
        }
      });
      
      observer.observe({ type: 'longtask', buffered: true });
    } catch (e) {
      console.error('PerformanceObserver for longtask not supported', e);
    }
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
