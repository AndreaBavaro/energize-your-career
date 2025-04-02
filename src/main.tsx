import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initPerformanceMonitoring } from './utils/performanceMonitor.ts'
import { initFontOptimization } from './utils/fontOptimizer.ts'
import { initCSSOptimization } from './utils/cssOptimizer.ts'
import { initDependencyAnalysis } from './utils/dependencyAnalyzer.ts'
import { injectFavicons } from './utils/faviconGenerator.ts'
import { initEmailJS } from './services/newsletterService.ts'
import './config/firebase.ts' // This will initialize Firebase

// Initialize EmailJS
initEmailJS();

// Initialize performance monitoring in production
if (process.env.NODE_ENV === 'production') {
  initPerformanceMonitoring();
}

// Initialize font optimization with critical fonts
initFontOptimization([
  '/fonts/inter-var.woff2', // Assuming this is the path to your variable font
]);

// Initialize CSS optimization in production
if (process.env.NODE_ENV === 'production') {
  initCSSOptimization();
}

// Initialize dependency analysis in development mode
if (process.env.NODE_ENV === 'development') {
  initDependencyAnalysis();
}

// Ensure favicon is properly loaded with optimal size
injectFavicons('/images/logo.png');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
