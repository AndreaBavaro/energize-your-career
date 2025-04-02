/**
 * Font optimization utility
 * Helps with font loading performance by implementing:
 * - Font preloading
 * - Variable font support
 * - Font display strategies
 */

/**
 * Creates preload link elements for critical fonts
 * @param fonts Array of font URLs to preload
 */
export const preloadCriticalFonts = (fonts: string[]): void => {
  if (typeof document === 'undefined') return;
  
  fonts.forEach(fontUrl => {
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.href = fontUrl;
    preloadLink.as = 'font';
    preloadLink.type = 'font/woff2'; // Assuming WOFF2 format for best compression
    preloadLink.crossOrigin = 'anonymous';
    
    document.head.appendChild(preloadLink);
  });
};

/**
 * Generates optimized @font-face CSS for variable fonts
 * @param fontFamily Font family name
 * @param fontUrl URL to the variable font file
 * @param fontDisplay Font display strategy ('swap', 'optional', 'fallback', 'block', 'auto')
 * @returns CSS string for the font-face declaration
 */
export const generateVariableFontFace = (
  fontFamily: string,
  fontUrl: string,
  fontDisplay: 'swap' | 'optional' | 'fallback' | 'block' | 'auto' = 'swap'
): string => {
  return `
    @font-face {
      font-family: '${fontFamily}';
      src: url('${fontUrl}') format('woff2-variations');
      font-weight: 100 900;
      font-stretch: 25% 151%;
      font-display: ${fontDisplay};
    }
  `;
};

/**
 * Injects CSS for font optimization into the document
 * @param css CSS string to inject
 */
export const injectFontCSS = (css: string): void => {
  if (typeof document === 'undefined') return;
  
  const style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);
};

/**
 * Initialize font optimization
 * @param criticalFonts Array of critical font URLs to preload
 */
export const initFontOptimization = (criticalFonts: string[] = []): void => {
  if (typeof window === 'undefined') return;
  
  // Preload critical fonts
  if (criticalFonts.length > 0) {
    preloadCriticalFonts(criticalFonts);
  }
  
  // Add font-display: swap to all font-face declarations
  // This ensures text remains visible during font loading
  const fontDisplayCSS = `
    @font-face {
      font-display: swap !important;
    }
  `;
  
  injectFontCSS(fontDisplayCSS);
  
  // Disable font loading for users who prefer reduced motion
  // This can help with performance for users with this preference
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
    const reducedMotionCSS = `
      * {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;
      }
    `;
    injectFontCSS(reducedMotionCSS);
  }
};
