/**
 * Script to find potentially unused dependencies in the project
 * Run with: node scripts/find-unused-deps.js
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Read package.json
const packageJson = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8'));

// Get all dependencies
const allDependencies = {
  ...packageJson.dependencies,
  ...packageJson.devDependencies
};

// Exclude core packages that might not be directly imported
const excludePackages = [
  'vite',
  'typescript',
  'eslint',
  'postcss',
  'tailwindcss',
  'autoprefixer',
  '@vitejs/plugin-react-swc',
  'tailwindcss-animate',
  '@tailwindcss/typography',
  'sharp',
  '@types/react',
  '@types/react-dom',
  '@types/node',
  'globals',
  'rollup-plugin-visualizer'
];

// Get all source files
const getAllFiles = (dir, fileList = []) => {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !filePath.includes('node_modules') && !filePath.includes('dist')) {
      getAllFiles(filePath, fileList);
    } else if (
      stat.isFile() && 
      (filePath.endsWith('.js') || 
       filePath.endsWith('.jsx') || 
       filePath.endsWith('.ts') || 
       filePath.endsWith('.tsx'))
    ) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
};

const sourceFiles = getAllFiles(path.join(rootDir, 'src'));

// Check which dependencies are actually used
const usedDependencies = new Set();

sourceFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  
  // Check for import statements
  Object.keys(allDependencies).forEach(dep => {
    // Skip excluded packages
    if (excludePackages.includes(dep)) {
      usedDependencies.add(dep);
      return;
    }
    
    // Handle scoped packages (e.g., @radix-ui/react-accordion)
    const packageName = dep.startsWith('@') ? dep.split('/')[0] + '/' + dep.split('/')[1] : dep;
    
    // Check for various import patterns
    const importPatterns = [
      `from ['"](${packageName})`,
      `from ['"](${packageName}/`,
      `import ['"](${packageName})`,
      `import ['"](${packageName}/`,
      `require\(['"](${packageName})`,
      `require\(['"](${packageName}/`
    ];
    
    for (const pattern of importPatterns) {
      if (new RegExp(pattern).test(content)) {
        usedDependencies.add(dep);
        break;
      }
    }
  });
});

// Find unused dependencies
const unusedDependencies = Object.keys(allDependencies).filter(dep => !usedDependencies.has(dep));

// Print results
console.log('\nPotentially unused dependencies:');
unusedDependencies.forEach(dep => {
  console.log(`- ${dep}`);
});

console.log('\nNote: This is a static analysis and may not catch dynamic imports or complex patterns.');
console.log('Please verify before removing any dependencies.\n');

// Check for duplicate dependencies with different versions
console.log('\nChecking for duplicate dependencies...');
try {
  const dedupe = execSync('npm dedupe --dry-run', { cwd: rootDir }).toString();
  console.log(dedupe || 'No duplicates found.');
} catch (error) {
  console.log('Error checking for duplicates:', error.message);
}

// Suggest optimizations
console.log('\nSuggested optimizations:');
console.log('1. Consider removing unused dependencies');
console.log('2. Run `npm dedupe` to remove duplicate packages');
console.log('3. Consider using smaller alternatives for large packages');
