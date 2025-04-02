/**
 * CSS Optimization Utility
 * Helps with identifying and removing unused CSS styles
 */

/**
 * Analyzes the DOM to find unused CSS selectors
 * @param styleSheets Array of stylesheets to analyze
 * @returns Array of unused CSS selectors
 */
export const findUnusedSelectors = (styleSheets: StyleSheetList): string[] => {
  if (typeof document === 'undefined') return [];
  
  const unusedSelectors: string[] = [];
  
  try {
    // Process each stylesheet
    Array.from(styleSheets).forEach(sheet => {
      try {
        // Skip if not a CSSStyleSheet or if it's an external stylesheet with CORS issues
        if (!sheet.cssRules) return;
        
        // Check each rule in the stylesheet
        Array.from(sheet.cssRules).forEach(rule => {
          // Only process style rules (not @media, @font-face, etc.)
          if (rule.type === 1) { // CSSRule.STYLE_RULE
            const styleRule = rule as CSSStyleRule;
            const selector = styleRule.selectorText;
            
            // Skip complex selectors that might cause issues
            if (selector.includes(':') || selector.includes('[') || selector.includes('*')) {
              return;
            }
            
            try {
              // Check if any elements match this selector
              const elements = document.querySelectorAll(selector);
              if (elements.length === 0) {
                unusedSelectors.push(selector);
              }
            } catch (e) {
              // Skip selectors that cause errors (like pseudo-elements)
              console.debug(`Skipping problematic selector: ${selector}`);
            }
          }
        });
      } catch (e) {
        console.debug('Error processing stylesheet:', e);
      }
    });
  } catch (e) {
    console.error('Error analyzing CSS:', e);
  }
  
  return unusedSelectors;
};

/**
 * Removes unused CSS rules from stylesheets
 * @param unusedSelectors Array of selectors to remove
 * @param styleSheets Stylesheets to process
 */
export const removeUnusedCSS = (unusedSelectors: string[], styleSheets: StyleSheetList): void => {
  if (typeof document === 'undefined' || unusedSelectors.length === 0) return;
  
  try {
    // Process each stylesheet
    Array.from(styleSheets).forEach(sheet => {
      try {
        // Skip if not a CSSStyleSheet or if it's an external stylesheet with CORS issues
        if (!sheet.cssRules) return;
        
        // We need to remove rules from the end to avoid index shifting
        for (let i = sheet.cssRules.length - 1; i >= 0; i--) {
          const rule = sheet.cssRules[i];
          
          // Only process style rules
          if (rule.type === 1) { // CSSRule.STYLE_RULE
            const styleRule = rule as CSSStyleRule;
            
            // Check if this rule's selector is in our unused list
            if (unusedSelectors.includes(styleRule.selectorText)) {
              (sheet as CSSStyleSheet).deleteRule(i);
            }
          }
        }
      } catch (e) {
        console.debug('Error processing stylesheet for removal:', e);
      }
    });
  } catch (e) {
    console.error('Error removing unused CSS:', e);
  }
};

/**
 * Initializes CSS optimization by analyzing and removing unused styles
 * Should be called after the page has fully loaded
 */
export const initCSSOptimization = (): void => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  
  // Wait for the page to fully load before analyzing CSS
  window.addEventListener('load', () => {
    // Wait a bit longer to ensure dynamic content is loaded
    setTimeout(() => {
      console.log('Analyzing CSS for optimization...');
      
      // Find unused selectors
      const unusedSelectors = findUnusedSelectors(document.styleSheets);
      
      if (unusedSelectors.length > 0) {
        console.log(`Found ${unusedSelectors.length} unused CSS selectors`);
        
        // Only remove in production to avoid affecting development
        if (process.env.NODE_ENV === 'production') {
          removeUnusedCSS(unusedSelectors, document.styleSheets);
          console.log('Removed unused CSS selectors');
        } else {
          console.log('Unused selectors (not removed in development):', unusedSelectors);
        }
      } else {
        console.log('No unused CSS selectors found');
      }
    }, 2000); // Wait 2 seconds after load event
  });
};
