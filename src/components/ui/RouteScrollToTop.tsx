import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// This component automatically scrolls to the top of the page when the route changes
export default function RouteScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there's a hash in the URL (e.g., /contact#form), scroll to that element
    if (hash) {
      // Small delay to ensure the DOM is fully loaded
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          // If element not found, scroll to top
          window.scrollTo(0, 0);
        }
      }, 100);
    } else {
      // No hash, just scroll to top
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}
