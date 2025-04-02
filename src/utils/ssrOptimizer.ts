/**
 * SSR Optimization Utility
 * Provides utilities to optimize the application for Server-Side Rendering
 */

/**
 * Detects if the code is running in a server environment
 * @returns boolean indicating if code is running on server
 */
export const isServer = (): boolean => {
  return typeof window === 'undefined';
};

/**
 * Detects if the code is running in a browser environment
 * @returns boolean indicating if code is running in browser
 */
export const isBrowser = (): boolean => {
  return !isServer();
};

/**
 * Safely accesses browser APIs only when in browser environment
 * @param callback Function to execute in browser environment
 * @param fallback Optional fallback value to return in server environment
 */
export function withBrowser<T>(callback: () => T, fallback?: T): T {
  if (isBrowser()) {
    return callback();
  }
  return fallback as T;
}

/**
 * Prepares data for hydration during SSR
 * @param data Data to be serialized for hydration
 * @returns Serialized data string
 */
export const prepareDataForHydration = (data: any): string => {
  return `window.__INITIAL_DATA__ = ${JSON.stringify(data)};`;
};

/**
 * Retrieves hydration data in client
 * @returns Hydrated data or null if not available
 */
export const getHydrationData = (): any => {
  return withBrowser(() => (window as any).__INITIAL_DATA__ || null, null);
};

/**
 * Creates a script tag with hydration data
 * @param id ID for the script tag
 * @param data Data to hydrate
 * @returns HTML string with script tag
 */
export const createHydrationScript = (id: string, data: any): string => {
  return `<script id="${id}">${prepareDataForHydration(data)}</script>`;
};

/**
 * Handles conditional rendering for SSR
 * @param serverComponent Component to render on server
 * @param clientComponent Component to render on client
 * @returns The appropriate component based on environment
 */
export const conditionalSSR = <T,>(
  serverComponent: T,
  clientComponent: T
): T => {
  return isServer() ? serverComponent : clientComponent;
};

/**
 * Helper for critical CSS extraction
 * @param css CSS string to be included in SSR output
 * @returns HTML string with style tag
 */
export const createCriticalCSSTag = (css: string): string => {
  return `<style id="critical-css">${css}</style>`;
};

/**
 * Adds SSR-friendly attributes to an element
 * @param props Props object to enhance
 * @returns Enhanced props with SSR attributes
 */
export const withSSRProps = (props: Record<string, any>): Record<string, any> => {
  // Add data-ssr attribute to help identify server-rendered content
  return {
    ...props,
    'data-ssr': true,
  };
};

/**
 * Prepares meta tags for SEO in SSR context
 * @param title Page title
 * @param description Meta description
 * @param keywords Meta keywords
 * @param canonical Canonical URL
 * @returns HTML string with meta tags
 */
export const prepareSEOMeta = (
  title: string,
  description: string,
  keywords: string = '',
  canonical: string = ''
): string => {
  let metaTags = `<title>${title}</title>
<meta name="description" content="${description}" />`;

  if (keywords) {
    metaTags += `\n<meta name="keywords" content="${keywords}" />`;
  }

  if (canonical) {
    metaTags += `\n<link rel="canonical" href="${canonical}" />`;
  }

  return metaTags;
};

/**
 * Utility to help with SSR data fetching
 * @param fetchFn Async function to fetch data
 * @param cacheKey Optional cache key for the data
 * @returns Promise with fetched data
 */
export const fetchSSRData = async <T>(
  fetchFn: () => Promise<T>,
  cacheKey?: string
): Promise<T> => {
  // In a real SSR setup, this would check a server-side cache first
  try {
    const data = await fetchFn();
    
    // In a real implementation, we would cache the result on the server
    // if (isServer() && cacheKey) { serverCache.set(cacheKey, data); }
    
    return data;
  } catch (error) {
    console.error('Error fetching SSR data:', error);
    throw error;
  }
};
