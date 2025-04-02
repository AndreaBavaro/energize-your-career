import React from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

/**
 * OptimizedImage component that provides:
 * - WebP format support with fallback
 * - Lazy loading for below-the-fold images
 * - Responsive image loading with srcset
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
  objectFit = 'cover'
}) => {
  // Convert image path to WebP if it's a jpg/png
  const getWebPPath = (imagePath: string) => {
    // If it's already a WebP, return as is
    if (imagePath.endsWith('.webp')) return imagePath;
    
    // Check if it's an external URL
    if (imagePath.startsWith('http')) return imagePath;
    
    // For local images, assume WebP version exists with same name
    const basePath = imagePath.substring(0, imagePath.lastIndexOf('.'));
    return `${basePath}.webp`;
  };

  // Original image path for fallback
  const originalSrc = src;
  // WebP version of the image
  const webpSrc = getWebPPath(src);

  return (
    <picture>
      {/* WebP format for browsers that support it */}
      <source srcSet={webpSrc} type="image/webp" />
      
      {/* Original format as fallback */}
      <img
        src={originalSrc}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={loading}
        style={{ objectFit }}
      />
    </picture>
  );
};

export default OptimizedImage;
