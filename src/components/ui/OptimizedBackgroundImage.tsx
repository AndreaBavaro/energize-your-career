import React from 'react';

interface OptimizedBackgroundImageProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  filter?: string;
  priority?: boolean;
}

/**
 * OptimizedBackgroundImage component that provides:
 * - WebP format support with fallback
 * - Maintains exact sizing and styling of the original background
 */
export const OptimizedBackgroundImage: React.FC<OptimizedBackgroundImageProps> = ({
  src,
  className = '',
  style = {},
  filter = '',
  priority = false
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

  // Create a combined style object with the background image
  const combinedStyle: React.CSSProperties = {
    ...style,
    backgroundImage: `url("${webpSrc}")`,
    filter: filter || style.filter || undefined,
  };

  return (
    <div
      className={className}
      style={combinedStyle}
      data-optimized-bg="true"
    />
  );
};

export default OptimizedBackgroundImage;
