import React from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  sizes?: string;
  priority?: boolean;
}

/**
 * OptimizedImage component that provides:
 * - AVIF and WebP format support with fallbacks
 * - Lazy loading for below-the-fold images
 * - Responsive image loading with srcset
 * - Priority loading for LCP (Largest Contentful Paint) images
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  loading: propLoading,
  objectFit = 'cover',
  sizes = '100vw',
  priority = false
}) => {
  // Set loading based on priority flag
  const loading = priority ? 'eager' : propLoading || 'lazy';
  
  // Extract base path and extension
  const isExternalUrl = src.startsWith('http');
  const hasExtension = src.includes('.');
  const basePath = hasExtension ? src.substring(0, src.lastIndexOf('.')) : src;
  const extension = hasExtension ? src.substring(src.lastIndexOf('.') + 1) : 'jpg';
  
  // Skip optimization for SVGs and external URLs
  const shouldOptimize = !isExternalUrl && extension !== 'svg';
  
  // Generate paths for optimized versions
  const getOptimizedPath = (format: string) => {
    if (!shouldOptimize) return src;
    
    // Check if we're using the optimized directory structure
    if (src.includes('/images/') && !src.includes('/optimized/')) {
      // Replace /images/ with /images/optimized/ and change extension
      return src.replace('/images/', '/images/optimized/').replace(`.${extension}`, `.${format}`);
    }
    
    // Fallback to original path with new extension
    return `${basePath}.${format}`;
  };

  // Generate paths for different formats
  const avifSrc = getOptimizedPath('avif');
  const webpSrc = getOptimizedPath('webp');
  const originalSrc = src;
  
  // Generate srcSet for responsive images if width is provided
  const generateSrcSet = (path: string) => {
    if (!width || !shouldOptimize) return undefined;
    
    // Create srcSet for common viewport widths
    const widths = [640, 750, 828, 1080, 1200, 1920, 2048];
    const srcSet = widths
      .filter(w => w <= width * 2) // Don't go beyond 2x the specified width
      .map(w => `${path} ${w}w`)
      .join(', ');
    
    return srcSet;
  };

  return (
    <picture>
      {shouldOptimize && (
        <>
          {/* AVIF format - best compression, newest format */}
          <source
            srcSet={generateSrcSet(avifSrc) || avifSrc}
            type="image/avif"
            sizes={sizes}
          />
          
          {/* WebP format - good compression, better browser support */}
          <source
            srcSet={generateSrcSet(webpSrc) || webpSrc}
            type="image/webp"
            sizes={sizes}
          />
        </>
      )}
      
      {/* Original format as fallback */}
      <img
        src={originalSrc}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={loading}
        style={{ objectFit }}
        sizes={sizes}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding={priority ? 'sync' : 'async'}
      />
    </picture>
  );
};

export default OptimizedImage;
