import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Performance optimization note:
// The performance monitoring, font optimization, and CSS optimization utilities
// have been removed as part of the codebase cleanup.
// These optimizations can be re-implemented when needed.

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
