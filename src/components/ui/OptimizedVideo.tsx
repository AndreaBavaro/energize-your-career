import React, { useEffect, useRef } from 'react';

interface OptimizedVideoProps {
  src: string;
  poster?: string;
  className?: string;
  ariaLabel?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  width?: number;
  height?: number;
  preload?: 'auto' | 'metadata' | 'none';
  playbackRate?: number;
}

/**
 * OptimizedVideo component that provides:
 * - Lazy loading of video content
 * - Optimized playback settings
 * - Responsive video display
 */
export const OptimizedVideo: React.FC<OptimizedVideoProps> = ({
  src,
  poster,
  className = '',
  ariaLabel,
  autoPlay = true,
  muted = true,
  loop = true,
  controls = false,
  width,
  height,
  preload = 'metadata',
  playbackRate = 1.0
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Set playback rate when the video is loaded
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.playbackRate = playbackRate;
      
      // Add intersection observer for lazy loading
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            // Only load the video when it's visible in the viewport
            if (entry.isIntersecting) {
              if (autoPlay) videoElement.play().catch(() => {
                // Autoplay might be blocked, handle gracefully
                console.log('Autoplay prevented by browser policy');
              });
              // Disconnect the observer once the video starts playing
              observer.disconnect();
            }
          });
        },
        { threshold: 0.1 } // Trigger when at least 10% of the video is visible
      );
      
      observer.observe(videoElement);
      
      return () => {
        observer.disconnect();
      };
    }
  }, [autoPlay, playbackRate]);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      className={className}
      aria-label={ariaLabel}
      muted={muted}
      loop={loop}
      controls={controls}
      width={width}
      height={height}
      preload={preload}
      playsInline // Better mobile experience
    >
      Your browser does not support the video tag.
    </video>
  );
};

export default OptimizedVideo;
