/**
 * Content Protection Utility
 * 
 * This utility provides functions to help protect images and videos on the website
 * from being easily downloaded or saved by users.
 */

/**
 * Initializes content protection features for the website
 */
export const initContentProtection = () => {
  // Prevent right-click context menu
  document.addEventListener('contextmenu', (e) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'IMG' || target.tagName === 'VIDEO') {
      e.preventDefault();
      return false;
    }
  });

  // Prevent keyboard shortcuts for saving images
  document.addEventListener('keydown', (e) => {
    // Prevent Ctrl+S, Ctrl+U, Ctrl+Shift+I, F12
    if (
      (e.ctrlKey && (e.key === 's' || e.key === 'S' || e.key === 'u' || e.key === 'U')) ||
      (e.ctrlKey && e.shiftKey && (e.key === 'i' || e.key === 'I')) ||
      e.key === 'F12'
    ) {
      e.preventDefault();
      return false;
    }
  });

  // Add invisible overlay on images to make them harder to save
  const addOverlaysToImages = () => {
    const images = document.querySelectorAll('img');
    images.forEach((img) => {
      // Skip if already has overlay
      if (img.parentElement?.classList.contains('protected-image-container')) {
        return;
      }

      // Create container
      const container = document.createElement('div');
      container.classList.add('protected-image-container');
      container.style.position = 'relative';
      container.style.display = 'inline-block';
      container.style.overflow = 'hidden';

      // Create overlay
      const overlay = document.createElement('div');
      overlay.classList.add('image-protection-overlay');
      overlay.style.position = 'absolute';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.zIndex = '1';

      // Replace image with container
      img.parentNode?.insertBefore(container, img);
      container.appendChild(img);
      container.appendChild(overlay);
    });
  };

  // Run on page load and when DOM changes
  addOverlaysToImages();
  
  // Use MutationObserver to detect when new images are added
  const observer = new MutationObserver((mutations) => {
    let shouldUpdate = false;
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length) {
        shouldUpdate = true;
      }
    });
    
    if (shouldUpdate) {
      addOverlaysToImages();
    }
  });
  
  observer.observe(document.body, { 
    childList: true,
    subtree: true 
  });
};

/**
 * Adds a watermark to images (can be called selectively)
 * @param selector CSS selector for images to watermark
 * @param watermarkText Text to use as watermark
 */
export const addWatermark = (selector: string = 'img.watermarked', watermarkText: string = 'Voltify © 2025') => {
  const images = document.querySelectorAll(selector);
  
  images.forEach((img) => {
    const imgElement = img as HTMLImageElement;
    
    // Skip if already watermarked
    if (imgElement.getAttribute('data-watermarked') === 'true') {
      return;
    }
    
    // Create canvas to add watermark
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Wait for image to load
    imgElement.onload = () => {
      // Set canvas dimensions
      canvas.width = imgElement.naturalWidth;
      canvas.height = imgElement.naturalHeight;
      
      if (ctx) {
        // Draw image on canvas
        ctx.drawImage(imgElement, 0, 0);
        
        // Add watermark
        ctx.font = `${Math.max(canvas.width * 0.03, 14)}px Arial`;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(watermarkText, canvas.width / 2, canvas.height / 2);
        
        // Replace image source with canvas data
        const dataURL = canvas.toDataURL('image/jpeg', 0.92);
        imgElement.src = dataURL;
        imgElement.setAttribute('data-watermarked', 'true');
      }
    };
    
    // Force reload if image is already loaded
    if (imgElement.complete) {
      const currentSrc = imgElement.src;
      imgElement.src = '';
      imgElement.src = currentSrc;
    }
  });
};
