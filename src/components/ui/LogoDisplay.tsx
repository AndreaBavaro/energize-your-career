import React from 'react';

interface LogoDisplayProps {
  position?: 'absolute' | 'relative' | 'fixed' | 'sticky';
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  width?: string;
  height?: string;
  zIndex?: string;
  className?: string;
  responsive?: boolean;
  style?: React.CSSProperties;
}

export function LogoDisplay({
  position = 'relative',
  top,
  left,
  right,
  bottom,
  width = '200px',
  height = 'auto',
  zIndex = '1',
  className = '',
  responsive = false,
  style,
}: LogoDisplayProps) {
  // Fixed logo path
  const logoPath = 'Adobe Express - file (5).png';
  // Convert string dimensions to numbers if possible for better styling
  const widthValue = width;
  const heightValue = height === 'auto' ? 'auto' : height;
  
  // Create a style object for the container
  const containerStyle: React.CSSProperties = {
    position,
    zIndex,
    width: widthValue,
    height: heightValue,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...style,
  };
  
  // Add positioning properties
  if (top) containerStyle.top = top;
  if (left) containerStyle.left = left;
  if (right) containerStyle.right = right;
  if (bottom) containerStyle.bottom = bottom;
  
  // If responsive is true, use a different approach for positioning
  if (responsive) {
    if (position === 'absolute') {
      containerStyle.position = 'absolute';
      // Use percentage-based positioning if not already using percentages
      if (left && !left.includes('%') && !left.includes('calc')) {
        containerStyle.left = '50%';
        containerStyle.transform = 'translateX(-50%)';
      }
    }
    
    // Add max-width and max-height to ensure the logo doesn't get too large
    if (!containerStyle.maxWidth) {
      containerStyle.maxWidth = '100%';
    }
    
    if (!containerStyle.maxHeight) {
      containerStyle.maxHeight = '100%';
    }
  }
  
  // For fixed positioning, ensure the logo stays in place regardless of window size
  if (position === 'fixed') {
    containerStyle.position = 'fixed';
    // Ensure transform doesn't get applied to fixed positioning
    if (containerStyle.transform) {
      delete containerStyle.transform;
    }
  }
  
  return (
    <div
      className={`logo-display ${className}`}
      style={containerStyle}
    >
      <div 
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          // Set a fixed aspect ratio container
          aspectRatio: '3/1',
        }}
      >
        <img
          src={`${import.meta.env.BASE_URL}images/${logoPath}`}
          alt="Voltify Logo"
          style={{ 
            width: 'auto',
            height: 'auto',
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
            filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.1))'
          }}
          className="transition-all duration-300"
        />
      </div>
    </div>
  );
}
