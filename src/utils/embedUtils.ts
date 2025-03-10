// Types of embeds that we can detect and display
export type EmbedType = 'twitter' | 'youtube' | 'instagram' | 'facebook' | 'linkedin' | 'article' | 'unknown';

// Interface for embed information
export interface EmbedInfo {
  type: EmbedType;
  url: string;
}

/**
 * Detects the type of embed from a URL
 * @param url The URL to check
 * @returns The embed type
 */
export function detectEmbedType(url: string): EmbedType {
  if (!url) return 'unknown';
  
  const lowerUrl = url.toLowerCase();
  
  if (lowerUrl.includes('twitter.com') || lowerUrl.includes('x.com')) {
    return 'twitter';
  } else if (lowerUrl.includes('youtube.com') || lowerUrl.includes('youtu.be')) {
    return 'youtube';
  } else if (lowerUrl.includes('instagram.com')) {
    return 'instagram';
  } else if (lowerUrl.includes('facebook.com') || lowerUrl.includes('fb.com')) {
    return 'facebook';
  } else if (lowerUrl.includes('linkedin.com')) {
    return 'linkedin';
  } else if (lowerUrl.includes('medium.com') || 
            lowerUrl.includes('nytimes.com') || 
            lowerUrl.includes('washingtonpost.com') ||
            lowerUrl.includes('bbc.com') ||
            lowerUrl.includes('cnn.com')) {
    return 'article';
  }
  
  return 'unknown';
}

/**
 * Processes HTML content to find embeds
 * @param htmlContent The HTML content to process
 * @returns Array of embed information
 */
export function findEmbeds(htmlContent: string): EmbedInfo[] {
  if (!htmlContent) return [];
  
  const embeds: EmbedInfo[] = [];
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;
  
  // Find all links
  const links = tempDiv.querySelectorAll('a');
  links.forEach(link => {
    const url = link.getAttribute('href');
    if (url) {
      const type = detectEmbedType(url);
      if (type !== 'unknown') {
        embeds.push({ type, url });
      }
    }
  });
  
  // Find iframes (for already embedded content)
  const iframes = tempDiv.querySelectorAll('iframe');
  iframes.forEach(iframe => {
    const src = iframe.getAttribute('src');
    if (src) {
      const type = detectEmbedType(src);
      embeds.push({ type, url: src });
    }
  });
  
  return embeds;
}

/**
 * Processes HTML content to enhance embeds
 * @param htmlContent The HTML content to process
 * @returns Processed HTML content with enhanced embeds
 */
export function processEmbeds(htmlContent: string): string {
  if (!htmlContent) return '';
  
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;
  
  // Process Twitter embeds
  processTwitterEmbeds(tempDiv);
  
  // Process YouTube embeds
  processYouTubeEmbeds(tempDiv);
  
  // Process other embeds as needed
  // processInstagramEmbeds(tempDiv);
  // processFacebookEmbeds(tempDiv);
  // processLinkedInEmbeds(tempDiv);
  
  return tempDiv.innerHTML;
}

/**
 * Processes Twitter embeds in content
 * @param container The container element
 */
function processTwitterEmbeds(container: HTMLElement): void {
  // Find all links that might be Twitter links
  const links = container.querySelectorAll('a');
  
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href.match(/twitter\.com\/[^/]+\/status\/\d+/) || href.match(/x\.com\/[^/]+\/status\/\d+/))) {
      // Create a blockquote element for the Twitter embed
      const tweetBlockquote = document.createElement('blockquote');
      tweetBlockquote.className = 'twitter-tweet';
      tweetBlockquote.setAttribute('data-dnt', 'true');
      
      // Create a paragraph with the link inside the blockquote
      const p = document.createElement('p');
      const a = document.createElement('a');
      a.href = href;
      a.textContent = 'Loading tweet...';
      p.appendChild(a);
      tweetBlockquote.appendChild(p);
      
      // Add a data attribute for the embed type
      tweetBlockquote.setAttribute('data-embed-type', 'twitter');
      
      // Replace the original link with the blockquote
      if (link.parentNode) {
        link.parentNode.replaceChild(tweetBlockquote, link);
      }
    }
  });
}

/**
 * Processes YouTube embeds in content
 * @param container The container element
 */
function processYouTubeEmbeds(container: HTMLElement): void {
  // Find all links that might be YouTube links
  const links = container.querySelectorAll('a');
  
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    
    // Extract YouTube video ID
    let videoId: string | null = null;
    
    if (href.includes('youtube.com/watch')) {
      const url = new URL(href);
      videoId = url.searchParams.get('v');
    } else if (href.includes('youtu.be/')) {
      videoId = href.split('youtu.be/')[1]?.split('?')[0];
    }
    
    if (videoId) {
      // Create a wrapper div
      const wrapper = document.createElement('div');
      wrapper.className = 'youtube-embed-container';
      wrapper.setAttribute('data-embed-type', 'youtube');
      
      // Create the iframe
      const iframe = document.createElement('iframe');
      iframe.width = '560';
      iframe.height = '315';
      iframe.src = `https://www.youtube.com/embed/${videoId}`;
      iframe.frameBorder = '0';
      iframe.allowFullscreen = true;
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      
      wrapper.appendChild(iframe);
      
      // Replace the original link with the iframe
      if (link.parentNode) {
        link.parentNode.replaceChild(wrapper, link);
      }
    }
  });
}
