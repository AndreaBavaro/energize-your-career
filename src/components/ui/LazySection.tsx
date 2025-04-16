import { ReactNode, useEffect, useRef, useState } from 'react';

interface LazyLoadProps {
  children: ReactNode;
  placeholder?: ReactNode;
  threshold?: number; // Visibility threshold (0-1)
  rootMargin?: string; // Margin around root
  id?: string; // Optional ID for the section
  className?: string; // Optional className
}

/**
 * LazySection component that loads its children only when it comes into view
 * Uses Intersection Observer API for performance
 */
export default function LazySection({
  children,
  placeholder,
  threshold = 0.1,
  rootMargin = '200px 0px',
  id,
  className = '',
}: LazyLoadProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Mark as loaded so we don't unload it when scrolling away
          setHasLoaded(true);
          // Once loaded, no need to observe anymore
          observer.unobserve(currentRef);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin]);

  // Default placeholder - a div with the same height
  const defaultPlaceholder = (
    <div className="flex items-center justify-center py-16">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  );

  return (
    <div 
      ref={ref} 
      id={id} 
      className={className}
      style={{ minHeight: '100px' }} // Prevent layout shift
    >
      {(isVisible || hasLoaded) ? children : placeholder || defaultPlaceholder}
    </div>
  );
}
