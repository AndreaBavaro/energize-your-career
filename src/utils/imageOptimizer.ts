/**
 * Utility functions for optimizing images in HTML content
 */

/**
 * Transforms image tags in HTML content to use optimized image loading techniques:
 * - Adds loading="lazy" to images
 * - Adds decoding="async" for better performance
 * - Adds width and height attributes when possible to prevent layout shifts
 * 
 * @param htmlContent The HTML content containing image tags
 * @returns Optimized HTML content
 */
export function optimizeImagesInHtml(htmlContent: string): string {
  if (!htmlContent) return '';
  
  // Regular expression to find image tags
  const imgRegex = /<img\s+[^>]*src="([^"]*)"[^>]*>/gi;
  
  // Replace each image tag with an optimized version
  return htmlContent.replace(imgRegex, (match) => {
    // Skip if already has loading attribute
    if (match.includes('loading=')) {
      return match;
    }
    
    // Add loading="lazy" attribute
    match = match.replace(/<img/, '<img loading="lazy" decoding="async"');
    
    // If the image doesn't have explicit width/height, we don't add them
    // as we don't know the dimensions. In a real app, you might want to
    // pre-process images to extract dimensions.
    
    return match;
  });
}

/**
 * Transforms image URLs to WebP format when possible
 * This assumes you have WebP versions of images available with the same name
 * 
 * @param htmlContent The HTML content containing image tags
 * @returns HTML content with WebP image sources when possible
 */
export function convertImagesToWebP(htmlContent: string): string {
  if (!htmlContent) return '';
  
  // Regular expression to find image tags with jpg, jpeg, or png sources
  const imgRegex = /<img\s+[^>]*src="([^"]*\.(jpe?g|png))"[^>]*>/gi;
  
  // Replace each image tag with a picture element containing WebP source
  return htmlContent.replace(imgRegex, (match, src) => {
    // Don't modify if it's already using picture element or has srcset
    if (match.includes('<picture') || match.includes('srcset=')) {
      return match;
    }
    
    // Create WebP source URL
    const webpSrc = src.replace(/\.(jpe?g|png)$/i, '.webp');
    
    // Create picture element with WebP source and original fallback
    return `<picture>
      <source srcset="${webpSrc}" type="image/webp">
      ${match}
    </picture>`;
  });
}

/**
 * Applies all image optimizations to HTML content
 * 
 * @param htmlContent The HTML content to optimize
 * @returns Optimized HTML content
 */
export function optimizeContent(htmlContent: string): string {
  if (!htmlContent) return '';
  
  // Apply optimizations in sequence
  let optimized = optimizeImagesInHtml(htmlContent);
  // Only enable WebP conversion if you have WebP versions of all images
  // optimized = convertImagesToWebP(optimized);
  
  return optimized;
}
