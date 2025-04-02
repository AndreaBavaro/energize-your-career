/**
 * Favicon Generator Utility
 * Creates an optimized favicon element with proper sizing
 */

/**
 * Creates favicon link elements with different sizes for optimal display
 * @returns HTML string with favicon link elements
 */
export const generateFaviconLinks = (basePath: string = '/images/logo.png'): string => {
  // Standard favicon sizes
  const sizes = [16, 32, 48, 64, 96, 128, 196];
  
  let links = '';
  
  // Generate links for each size
  sizes.forEach(size => {
    links += `<link rel="icon" type="image/png" href="${basePath}" sizes="${size}x${size}" />\n`;
  });
  
  // Add Apple touch icon
  links += `<link rel="apple-touch-icon" href="${basePath}" />\n`;
  
  return links;
};

/**
 * Injects favicon links into the document head
 * For client-side use only
 */
export const injectFavicons = (basePath: string = '/images/logo.png'): void => {
  if (typeof document === 'undefined') return;
  
  const head = document.head;
  const faviconLinks = generateFaviconLinks(basePath);
  
  // Create a temporary element to parse the HTML string
  const temp = document.createElement('div');
  temp.innerHTML = faviconLinks;
  
  // Remove any existing favicon links
  const existingLinks = document.querySelectorAll('link[rel="icon"], link[rel="apple-touch-icon"]');
  existingLinks.forEach(link => link.parentNode?.removeChild(link));
  
  // Append the new favicon links
  while (temp.firstChild) {
    head.appendChild(temp.firstChild);
  }
};
