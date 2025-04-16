/**
 * Utility for deferring non-critical JavaScript execution
 * to reduce main thread blocking during initial page load
 */

/**
 * Schedule low-priority work to run during browser idle time
 * @param callback Function to execute during idle time
 * @param timeout Fallback timeout if requestIdleCallback isn't supported
 */
export function scheduleIdleWork(callback: () => void, timeout = 2000): void {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(callback, { timeout });
  } else {
    // Fallback for browsers that don't support requestIdleCallback
    const timeoutId = setTimeout(() => {
      const start = Date.now();
      callback();
      const end = Date.now();
      console.log(`Idle callback executed after ${timeout}ms and took ${end - start}ms`);
    }, timeout);
    
    // Store the timeout ID for potential cleanup
    idleCallbacks.push(timeoutId as unknown as number);
  }
}

// Store timeout IDs for cleanup
const idleCallbacks: number[] = [];

/**
 * Clear all scheduled idle callbacks
 */
export function clearIdleCallbacks(): void {
  idleCallbacks.forEach(id => clearTimeout(id));
  idleCallbacks.length = 0;
}

/**
 * Break up long-running tasks into smaller chunks to avoid blocking the main thread
 * @param items Array of items to process
 * @param processor Function to process each item
 * @param chunkSize Number of items to process in each chunk
 * @param delayBetweenChunks Delay between processing chunks (ms)
 */
export function processInChunks<T>(
  items: T[],
  processor: (item: T) => void,
  chunkSize = 5,
  delayBetweenChunks = 16 // ~1 frame at 60fps
): Promise<void> {
  return new Promise((resolve) => {
    if (items.length === 0) {
      resolve();
      return;
    }
    
    let index = 0;
    
    function processNextChunk() {
      const start = performance.now();
      
      // Process the next chunk of items
      const end = Math.min(index + chunkSize, items.length);
      for (let i = index; i < end; i++) {
        processor(items[i]);
      }
      
      index = end;
      
      const elapsed = performance.now() - start;
      
      if (index < items.length) {
        // Schedule the next chunk with dynamic timing based on how long this chunk took
        const nextDelay = Math.max(delayBetweenChunks, elapsed * 2);
        setTimeout(processNextChunk, nextDelay);
      } else {
        resolve();
      }
    }
    
    // Start processing
    scheduleIdleWork(processNextChunk);
  });
}

/**
 * Defer execution of non-critical initialization code
 * @param fn Function to execute after critical content is loaded
 */
export function deferInitialization(fn: () => void): void {
  if (document.readyState === 'complete') {
    scheduleIdleWork(fn);
  } else {
    window.addEventListener('load', () => scheduleIdleWork(fn));
  }
}

/**
 * Queue for managing main thread work
 */
class MainThreadQueue {
  private queue: (() => void)[] = [];
  private isProcessing = false;
  
  /**
   * Add a task to the queue
   */
  add(task: () => void): void {
    this.queue.push(task);
    if (!this.isProcessing) {
      this.processQueue();
    }
  }
  
  /**
   * Process tasks in the queue without blocking the main thread
   */
  private processQueue(): void {
    if (this.queue.length === 0) {
      this.isProcessing = false;
      return;
    }
    
    this.isProcessing = true;
    const task = this.queue.shift()!;
    
    try {
      task();
    } catch (error) {
      console.error('Error in queued task:', error);
    }
    
    // Use requestAnimationFrame to schedule the next task
    // This ensures we yield to the browser for rendering
    requestAnimationFrame(() => this.processQueue());
  }
  
  /**
   * Clear all pending tasks
   */
  clear(): void {
    this.queue = [];
    this.isProcessing = false;
  }
}

// Export a singleton instance
export const mainThreadQueue = new MainThreadQueue();
