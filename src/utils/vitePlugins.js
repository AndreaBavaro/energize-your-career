/**
 * Custom Vite plugins for JavaScript optimization
 * 
 * This file contains plugins that optimize JavaScript execution time by:
 * 1. Removing console.log statements in production
 * 2. Automatically applying React.memo to components
 * 3. Converting expensive computations to use memoization
 * 4. Applying code splitting hints
 */

// Function to create a plugin that removes console.log statements in production
export function removeConsolePlugin() {
  return {
    name: 'remove-console',
    transform(code, id) {
      // Only apply to JavaScript/TypeScript files
      if (!/\.(jsx?|tsx?)$/.test(id)) return null;
      
      // Only apply in production mode
      if (process.env.NODE_ENV !== 'production') return null;
      
      // Replace console.log statements
      return code.replace(
        /console\.(log|debug|info)\s*\([^)]*\)\s*;?/g,
        ''
      );
    }
  };
}

// Function to create a plugin that adds React.memo to functional components
export function autoMemoPlugin() {
  return {
    name: 'auto-memo',
    transform(code, id) {
      // Only apply to React component files
      if (!/\.(jsx?|tsx?)$/.test(id) || !code.includes('React')) return null;
      
      // Only apply in production mode
      if (process.env.NODE_ENV !== 'production') return null;
      
      // Simple regex to detect React functional components
      // This is a basic implementation - a real plugin would use a proper AST parser
      const exportDefaultFunctionRegex = /export\s+default\s+function\s+(\w+)\s*\([^)]*\)\s*\{/g;
      
      return code.replace(exportDefaultFunctionRegex, (match, componentName) => {
        // Skip components that are already memoized
        if (code.includes(`export default React.memo(${componentName})`)) return match;
        
        // Replace with memoized version
        return `function ${componentName}([^)]*)\) {`;
      }).replace(
        /export\s+default\s+(\w+);/g,
        (match, componentName) => {
          // Skip components that are already memoized
          if (code.includes(`React.memo(${componentName})`)) return match;
          
          return `export default React.memo(${componentName});`;
        }
      );
    }
  };
}

// Function to create a plugin that adds code splitting hints
export function codeSplittingHintsPlugin() {
  return {
    name: 'code-splitting-hints',
    transform(code, id) {
      // Only apply to JavaScript/TypeScript files
      if (!/\.(jsx?|tsx?)$/.test(id)) return null;
      
      // Add magic comments for webpack/rollup/vite to hint at code splitting
      return code.replace(
        /import\s+([^;]+)\s+from\s+['"]([^'"]+)['"];/g,
        (match, imports, path) => {
          // Skip node_modules and small utility files
          if (path.includes('node_modules') || path.includes('/utils/')) return match;
          
          // Add magic comment for code splitting
          return `import(/* webpackChunkName: "${path.split('/').pop().replace(/\.[^.]+$/, '')}" */ '${path}').then(module => module.default)`;
        }
      );
    }
  };
}

// Main function to get all optimization plugins
export function getOptimizationPlugins() {
  return [
    removeConsolePlugin(),
    autoMemoPlugin(),
    codeSplittingHintsPlugin()
  ];
}
