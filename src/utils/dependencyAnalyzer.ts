/**
 * Dependency Analyzer Utility
 * Helps identify unused dependencies and optimize imports
 */

interface DependencyUsage {
  name: string;
  importCount: number;
  usageCount: number;
  unusedImports: string[];
  files: string[];
}

/**
 * Analyzes the usage of dependencies in the application
 * This is a client-side utility for development purposes
 * For a more comprehensive analysis, use tools like webpack-bundle-analyzer or import-cost
 */
export const analyzeDependencies = (): void => {
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') {
    return;
  }

  console.group('Dependency Analysis');
  console.log('This is a development utility to help identify potential unused dependencies.');
  console.log('For a more comprehensive analysis, use tools like webpack-bundle-analyzer.');
  
  // Log bundle size information if available
  if (window.performance && window.performance.getEntriesByType) {
    const resources = window.performance.getEntriesByType('resource');
    const jsResources = resources.filter(resource => 
      resource.name.endsWith('.js') && 
      !resource.name.includes('hot-update')
    );
    
    if (jsResources.length > 0) {
      console.group('JS Bundle Size Analysis');
      jsResources.forEach(resource => {
        const sizeInKB = ((resource as any).encodedBodySize || 0) / 1024;
        console.log(`${resource.name.split('/').pop()}: ${sizeInKB.toFixed(2)} KB`);
      });
      console.groupEnd();
    }
  }
  
  console.groupEnd();
};

/**
 * Provides recommendations for optimizing dependencies
 * @param dependencies List of dependencies to analyze
 */
export const getDependencyRecommendations = (dependencies: string[]): string[] => {
  // Common dependencies that can be replaced with lighter alternatives
  const recommendations: Record<string, string> = {
    'moment': 'Consider using date-fns or Luxon for a smaller bundle size',
    'lodash': 'Consider importing only the specific lodash functions you need',
    'jquery': 'Consider using native DOM APIs instead',
    'bootstrap': 'Consider using a more lightweight UI library or custom CSS',
    'material-ui': 'Consider code-splitting Material-UI components',
    '@material-ui/core': 'Consider code-splitting Material-UI components',
    'react-bootstrap': 'Consider using a more lightweight UI library',
    'chart.js': 'Consider lazy-loading chart components',
    'react-chartjs-2': 'Consider lazy-loading chart components',
    'd3': 'Consider using a smaller visualization library or importing only needed d3 modules'
  };
  
  return dependencies
    .filter(dep => recommendations[dep])
    .map(dep => `${dep}: ${recommendations[dep]}`);
};

/**
 * Initializes dependency analysis in development mode
 */
export const initDependencyAnalysis = (): void => {
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') {
    return;
  }
  
  // Wait for the application to fully load
  window.addEventListener('load', () => {
    setTimeout(() => {
      analyzeDependencies();
      
      // Example of how to use dependency recommendations
      // In a real implementation, this would be dynamically generated
      const exampleDeps = ['lodash', 'moment'];
      const recommendations = getDependencyRecommendations(exampleDeps);
      
      if (recommendations.length > 0) {
        console.group('Dependency Optimization Recommendations');
        recommendations.forEach(rec => console.log(rec));
        console.groupEnd();
      }
    }, 2000);
  });
};
