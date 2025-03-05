import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronUp } from 'lucide-react';

export default function ScrollToTop() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Effect to handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      // Show button as soon as user scrolls down at all
      if (window.scrollY > 0) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      type="button"
      className={cn(
        "fixed bottom-6 right-6 z-50 rounded-full p-3 bg-voltify-500 text-white shadow-lg hover:bg-voltify-600 transition-all duration-300",
        showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      )}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <ChevronUp className="h-6 w-6" aria-hidden="true" />
    </button>
  );
}
