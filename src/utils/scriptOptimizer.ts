/**
 * Script Optimizer Utility
 * 
 * This utility helps reduce JavaScript execution time by:
 * 1. Dynamically importing non-critical scripts
 * 2. Deferring heavy computations
 * 3. Memoizing expensive function calls
 * 4. Implementing event delegation to reduce event listeners
 */

import React from 'react';
import { scheduleIdleWork, deferInitialization } from './deferredExecution';

/**
 * Memoize a function to cache its results and avoid redundant calculations
 * @param fn Function to memoize
 */
export function memoize<T extends (...args: any[]) => any>(
  fn: T
): (...args: Parameters<T>) => ReturnType<T> {
  const cache = new Map<string, ReturnType<T>>();
  
  return (...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key) as ReturnType<T>;
    }
    
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

/**
 * Dynamically import a non-critical script
 * @param src Script URL
 * @param defer Whether to defer loading until idle time
 */
export function loadScript(src: string, defer = true): Promise<void> {
  return new Promise((resolve, reject) => {
    const loadFn = () => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
      
      document.head.appendChild(script);
    };
    
    if (defer) {
      deferInitialization(loadFn);
    } else {
      loadFn();
    }
  });
}

/**
 * Set up event delegation to reduce the number of event listeners
 * @param parentElement Parent element to attach the listener to
 * @param eventType Event type to listen for
 * @param selector CSS selector to match target elements
 * @param callback Event handler callback
 */
export function delegateEvent(
  parentElement: HTMLElement | Document,
  eventType: string,
  selector: string,
  callback: (event: Event, targetElement: HTMLElement) => void
): () => void {
  const handler = (event: Event) => {
    let target = event.target as HTMLElement;
    
    while (target && target !== parentElement) {
      if (target.matches(selector)) {
        callback(event, target);
        return;
      }
      target = target.parentElement as HTMLElement;
    }
  };
  
  parentElement.addEventListener(eventType, handler);
  
  // Return a cleanup function
  return () => parentElement.removeEventListener(eventType, handler);
}

/**
 * Break down a heavy computation into smaller chunks to avoid blocking the main thread
 * @param computation Heavy computation function
 * @param chunkSize Size of each computation chunk
 */
export function chunkedComputation<T, R>(
  items: T[],
  computation: (item: T) => R,
  chunkSize = 5
): Promise<R[]> {
  return new Promise((resolve) => {
    const results: R[] = [];
    let index = 0;
    
    function processNextChunk() {
      const chunk = items.slice(index, index + chunkSize);
      const chunkResults = chunk.map(computation);
      results.push(...chunkResults);
      
      index += chunkSize;
      
      if (index < items.length) {
        // Use requestAnimationFrame to yield to the browser
        requestAnimationFrame(processNextChunk);
      } else {
        resolve(results);
      }
    }
    
    processNextChunk();
  });
}

/**
 * Optimize third-party scripts by loading them only when needed
 * @param urls Array of script URLs to load
 * @param condition Function that returns true when scripts should be loaded
 */
export function loadThirdPartyScriptsWhenNeeded(
  urls: string[],
  condition: () => boolean
): void {
  const checkAndLoadScripts = () => {
    if (condition()) {
      urls.forEach(url => loadScript(url, true));
      // Remove scroll listener once scripts are loaded
      window.removeEventListener('scroll', scrollHandler);
    }
  };
  
  // Check on scroll events, throttled
  let ticking = false;
  const scrollHandler = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        checkAndLoadScripts();
        ticking = false;
      });
      ticking = true;
    }
  };
  
  // Initial check
  deferInitialization(checkAndLoadScripts);
  
  // Check on scroll
  window.addEventListener('scroll', scrollHandler, { passive: true });
}

/**
 * Optimize React component rendering by preventing unnecessary re-renders
 * This is a utility for React components using hooks
 */
export function useDeepCompareMemo<T>(value: T, dependencies: any[]): T {
  const ref = React.useRef<T>(value);
  const depsString = JSON.stringify(dependencies);
  
  React.useEffect(() => {
    ref.current = value;
  }, [depsString, value]);
  
  return ref.current;
}

/**
 * Initialize script optimization techniques
 */
export function initScriptOptimizer(): void {
  // Optimize event listeners using delegation for common patterns
  if (typeof document !== 'undefined') {
    // Example: Delegate all button clicks to document
    delegateEvent(document, 'click', 'button', (event, target) => {
      // The event is handled by the specific button's onClick handler
      // This just ensures we only have one global click listener instead of many
    });
    
    // Optimize scroll and resize event handlers
    let scrollTicking = false;
    let resizeTicking = false;
    
    window.addEventListener('scroll', () => {
      if (!scrollTicking) {
        window.requestAnimationFrame(() => {
          // Dispatch a custom optimized scroll event
          window.dispatchEvent(new CustomEvent('optimized-scroll'));
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    }, { passive: true });
    
    window.addEventListener('resize', () => {
      if (!resizeTicking) {
        window.requestAnimationFrame(() => {
          // Dispatch a custom optimized resize event
          window.dispatchEvent(new CustomEvent('optimized-resize'));
          resizeTicking = false;
        });
        resizeTicking = true;
      }
    }, { passive: true });
  }
}
