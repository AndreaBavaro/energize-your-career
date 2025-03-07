import Navbar from "@/components/layout/Navbar";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { format } from "date-fns";
import { ChevronDown, ChevronUp, Search, Briefcase, BookOpen, X } from "lucide-react";

interface BlogPost {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  author: number;
  _embedded?: {
    author?: Array<{
      name: string;
      avatar_urls?: {
        [key: string]: string;
      };
    }>;
  };
}

interface EmbedMatch {
  type: 'twitter' | 'youtube' | 'instagram' | 'article';
  url: string;
  html?: string;
}

interface VideoThumbnail {
  url: string;
  type: 'youtube';
  videoId: string;
}

interface ImageThumbnail {
  url: string;
  type: 'image';
}

type Thumbnail = VideoThumbnail | ImageThumbnail | null;

declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: (element?: HTMLElement) => void;
        createTweet: (tweetId: string, element: HTMLElement, options?: any) => Promise<HTMLElement>;
      };
    };
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedPost, setExpandedPost] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [contentLoading, setContentLoading] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [needsScroll, setNeedsScroll] = useState(false);
  const postsPerPage = 3;
  const totalPages = Math.ceil((posts?.length || 0) / postsPerPage);

  // Load Twitter and Instagram embed scripts
  useEffect(() => {
    const twitterScript = document.createElement('script');
    twitterScript.src = 'https://platform.twitter.com/widgets.js';
    twitterScript.async = true;
    document.body.appendChild(twitterScript);

    const instagramScript = document.createElement('script');
    instagramScript.src = '//www.instagram.com/embed.js';
    instagramScript.async = true;
    document.body.appendChild(instagramScript);

    return () => {
      document.body.removeChild(twitterScript);
      document.body.removeChild(instagramScript);
    };
  }, []);

  // Re-run embed scripts when post expansion changes
  useEffect(() => {
    if (window.twttr?.widgets) {
      window.twttr.widgets.load();
    }
    if (window.instgrm?.Embeds) {
      window.instgrm.Embeds.process();
    }
  }, [expandedPost]);

  // Fetch posts from WordPress API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          'https://public-api.wordpress.com/wp/v2/sites/voltifyblog.wordpress.com/posts?_embed'
        );
        if (!response.ok) throw new Error('Failed to fetch blog posts');
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load blog posts');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const openPopup = (post: BlogPost) => {
    setContentLoading(true);
    setSelectedPost(post);
    
    // Small delay to allow state update before showing popup
    setTimeout(() => {
      // Load Twitter script first
      const loadTwitterAndShowPopup = () => {
        if (!window.twttr) {
          const script = document.createElement('script');
          script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
          script.setAttribute('async', 'true');
          script.setAttribute('charset', 'utf-8');
          
          script.onload = () => {
            // Once Twitter script is loaded, show the popup
            setPopupVisible(true);
            // Set a timeout to ensure content is fully processed
            setTimeout(() => setContentLoading(false), 800);
          };
          
          document.head.appendChild(script);
        } else {
          // Twitter script already loaded, show popup
          setPopupVisible(true);
          // Set a timeout to ensure content is fully processed
          setTimeout(() => setContentLoading(false), 800);
        }
      };
      
      loadTwitterAndShowPopup();
    }, 100);
  };

  const closePopup = () => {
    setPopupVisible(false);
    document.body.style.overflow = ''; // Re-enable scrolling
  };

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        closePopup();
      }
    };

    if (popupVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popupVisible]);

  // Close popup on escape key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closePopup();
      }
    };

    if (popupVisible) {
      document.addEventListener('keydown', handleEscKey);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [popupVisible]);

  // Re-run embed scripts when popup visibility changes
  useEffect(() => {
    if (popupVisible && window.twttr?.widgets) {
      window.twttr.widgets.load();
    }
    if (popupVisible && window.instgrm?.Embeds) {
      window.instgrm.Embeds.process();
    }
  }, [popupVisible]);

  const extractThumbnail = (content: string): Thumbnail => {
    // Try to find a regular image
    const imgRegex = /<img[^>]+src="([^">]+)"/;
    const imgMatch = content.match(imgRegex);
    if (imgMatch) {
      return { url: imgMatch[1], type: 'image' };
    }

    // Look for a YouTube video if no image found
    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const youtubeMatch = content.match(youtubeRegex);
    if (youtubeMatch) {
      const videoId = youtubeMatch[1];
      return {
        url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        type: 'youtube',
        videoId,
      };
    }

    return null;
  };

  const createPreview = (html: string) => {
    const text = html.replace(/<[^>]*>/g, '');
    return text.length > 150 ? text.slice(0, 150) + '...' : text;
  };

  const findEmbeds = (content: string): EmbedMatch[] => {
    const embeds: EmbedMatch[] = [];
    let match: RegExpExecArray | null;

    // Twitter embeds
    const twitterRegex = /<blockquote[^>]*class="twitter-tweet"[^>]*>.*?<a[^>]*href="(https:\/\/twitter\.com\/[^"]+)"[^>]*>.*?<\/blockquote>/gs;
    while ((match = twitterRegex.exec(content)) !== null) {
      embeds.push({ type: 'twitter', url: match[1], html: match[0] });
    }

    // YouTube embeds
    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/g;
    while ((match = youtubeRegex.exec(content)) !== null) {
      embeds.push({
        type: 'youtube',
        url: match[0],
        html: `<iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/${match[1]}"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>`,
      });
    }

    // Instagram embeds
    const instagramRegex = /<blockquote[^>]*class="instagram-media"[^>]*>.*?<a[^>]*href="(https:\/\/www\.instagram\.com\/[^"]+)"[^>]*>.*?<\/blockquote>/gs;
    while ((match = instagramRegex.exec(content)) !== null) {
      embeds.push({ type: 'instagram', url: match[1], html: match[0] });
    }

    // News article embeds
    const articleRegex = /<figure[^>]*class="wp-block-embed-wordpress"[^>]*>.*?<a[^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/gs;
    while ((match = articleRegex.exec(content)) !== null) {
      embeds.push({
        type: 'article',
        url: match[1],
        html: `<div class="news-article-embed p-4 bg-white/50 rounded-lg border border-stone-200 hover:border-voltify-300 transition-colors">
          <a href="${match[1]}" target="_blank" rel="noopener noreferrer" class="block">
            <h4 class="text-lg font-medium text-stone-900 hover:text-voltify-600 mb-2">${match[2]}</h4>
            <div class="flex items-center text-sm text-stone-500">
              <BookOpen class="h-4 w-4 mr-1.5" />
              <span>Read full article</span>
            </div>
          </a>
        </div>`,
      });
    }

    return embeds;
  };

  const fixWordPressContent = (content: string) => {
    let fixed = content.replace(/class="aligncenter/g, 'class="mx-auto block');
    
    // Handle Twitter embeds - keep only one instance of each tweet
    // First, find all tweet URLs
    const tweetIds = new Set<string>();
    const tweetUrlRegex = /https?:\/\/twitter\.com\/[a-zA-Z0-9_]+\/status\/([0-9]+)/g;
    let match;
    while ((match = tweetUrlRegex.exec(content)) !== null) {
      if (match[1]) {
        tweetIds.add(match[1]);
      }
    }
    
    // Remove all Twitter URLs and embeds
    fixed = fixed.replace(/<blockquote[^>]*class="twitter-tweet[^>]*>[\s\S]*?<\/blockquote>/g, '');
    fixed = fixed.replace(/<a[^>]*href="https?:\/\/twitter\.com\/[a-zA-Z0-9_]+\/status\/[0-9]+"[^>]*>.*?<\/a>/g, '');
    fixed = fixed.replace(/https?:\/\/twitter\.com\/[a-zA-Z0-9_]+\/status\/[0-9]+/g, '');
    
    // For each unique tweet ID, add a placeholder div that will be replaced by the Twitter widget
    tweetIds.forEach(id => {
      // Add a placeholder at the end of the content
      fixed += `<div id="tweet-${id}" class="twitter-embed-placeholder" data-tweet-id="${id}"></div>`;
    });
    
    // Center embedded articles specifically - further reduced margins and size
    fixed = fixed.replace(/<blockquote/g, '<blockquote class="w-full my-0.5 mx-auto block max-w-md"');
    
    // Fix iframes to be responsive, larger, and centered - further reduced margins and size
    fixed = fixed.replace(/<iframe/g, '<iframe class="w-full aspect-video my-0.5 mx-auto block max-w-md"');
    
    // Enhance embedded content containers - further reduced size
    fixed = fixed.replace(/wp-embedded-content/g, 'wp-embedded-content w-full mx-auto block max-w-md');
    
    // Make images responsive and centered - further reduced size
    fixed = fixed.replace(/<img/g, '<img class="max-w-full h-auto mx-auto block max-w-md"');
    
    // Center embedded articles from external sources - further reduced size
    fixed = fixed.replace(/class="wp-block-embed/g, 'class="wp-block-embed mx-auto block w-full max-w-md');
    
    // Remove empty paragraphs that might be left after removing Twitter URLs
    fixed = fixed.replace(/<p>\s*<\/p>/g, '');
    
    return fixed;
  };

  const getCurrentPosts = () => {
    const start = activeTab * postsPerPage;
    const end = start + postsPerPage;
    return posts.slice(start, end);
  };

  const goToNextPage = () => {
    if (activeTab < totalPages - 1) {
      setActiveTab(activeTab + 1);
    }
  };

  const goToPrevPage = () => {
    if (activeTab > 0) {
      setActiveTab(activeTab - 1);
    }
  };

  // Effect to load Twitter widgets when popup content changes
  useEffect(() => {
    if (popupVisible && selectedPost) {
      // Small delay to ensure the DOM is updated before loading widgets
      const timer = setTimeout(() => {
        // Load Twitter widgets
        if (!window.twttr) {
          // If Twitter script is not loaded, create and append it
          const script = document.createElement('script');
          script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
          script.setAttribute('async', 'true');
          script.setAttribute('charset', 'utf-8');
          
          script.onload = () => {
            // Once loaded, find all tweet placeholders and replace them with actual tweets
            document.querySelectorAll('.twitter-embed-placeholder').forEach(placeholder => {
              const tweetId = placeholder.getAttribute('data-tweet-id');
              if (tweetId && window.twttr) {
                window.twttr.widgets.createTweet(
                  tweetId,
                  placeholder,
                  {
                    align: 'center',
                    theme: 'light',
                    dnt: true,
                    width: '100%',
                    maxWidth: 350
                  }
                );
              }
            });
            
            // Force no scrolling after tweets load
            setTimeout(() => {
              setContentLoading(false);
            }, 500);
          };
          
          document.head.appendChild(script);
        } else {
          // If Twitter script is already loaded, just create the tweets
          document.querySelectorAll('.twitter-embed-placeholder').forEach(placeholder => {
            const tweetId = placeholder.getAttribute('data-tweet-id');
            if (tweetId && window.twttr) {
              window.twttr.widgets.createTweet(
                tweetId,
                placeholder,
                {
                  align: 'center',
                  theme: 'light',
                  dnt: true,
                  width: '100%',
                  maxWidth: 350
                }
              );
            }
          });
          
          // Force no scrolling after tweets load
          setTimeout(() => {
            setContentLoading(false);
          }, 500);
        }
        
        // Also handle Instagram embeds if present
        if (window.instgrm) {
          window.instgrm.Embeds.process();
        }
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [popupVisible, selectedPost]);

  // Check if content needs scrolling after it's rendered - always set to false
  useLayoutEffect(() => {
    if (popupVisible && contentRef.current) {
      // Always set to false to prevent scrolling
      setNeedsScroll(false);
    }
  }, [popupVisible]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow white-brick-bg">
        {/* Header Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/3 left-0 w-96 h-96 bg-voltify-50 rounded-full filter blur-3xl opacity-30 transform -translate-x-1/4"></div>
            <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-voltify-100 rounded-full filter blur-3xl opacity-30 transform translate-x-1/4"></div>
          </div>

          <div className="container-custom relative z-10">
            <SectionHeading 
              title="Insights & Perspectives"
              subtitle="Stay updated with our latest thoughts on career development and industry trends."
            />

            {/* Search and Categories */}
            <div className="max-w-5xl mx-auto mt-8 mb-12">
              <GlassCard className="border-0 shadow-xl">
                <div className="p-4 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                    <div className="flex-1">
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="Search articles..." 
                          className="w-full pl-10 pr-4 py-2 rounded-full border border-stone-200 focus:ring-2 focus:ring-voltify-300 focus:border-transparent outline-none text-stone-600 bg-white/50"
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 h-5 w-5" />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button className="bg-voltify-500 text-white px-4 py-1.5 rounded-full text-sm font-medium flex items-center hover:bg-voltify-600 transition-colors">
                        <BookOpen className="h-4 w-4 mr-1.5" />
                        All Topics
                      </button>
                      <button className="bg-white/80 text-stone-700 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-white transition-colors flex items-center">
                        <Briefcase className="h-4 w-4 mr-1.5" />
                        Career Growth
                      </button>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* Blog Posts Section */}
        <section className="pb-20">
          <div className="container-custom">
            {error && (
              <div className="text-center p-4 bg-red-50 rounded-xl border border-red-100 mb-8">
                <p className="text-red-600">{error}</p>
              </div>
            )}

            {loading ? (
              <div className="flex flex-col items-center text-center min-h-[300px]">
                <div className="animate-spin rounded-full h-12 w-12 border-3 border-voltify-600 border-t-transparent"></div>
                <p className="mt-4 text-stone-600">Loading insights...</p>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {getCurrentPosts().map((post, index) => {
                    const thumbnail = extractThumbnail(post.content.rendered);
                    const preview = createPreview(post.excerpt.rendered || post.content.rendered);
                    const authorName = post._embedded?.author?.[0]?.name || 'Anonymous';
                    const avatarUrl = post._embedded?.author?.[0]?.avatar_urls?.['96'] || null;
                    const isVideoActive = thumbnail?.type === 'youtube' && activeVideo === (thumbnail as VideoThumbnail).videoId;

                    return (
                      <GlassCard 
                        key={post.id}
                        className={`opacity-0 animate-fade-in-up animate-fill-forwards`}
                        animationDelay={`${index * 100 + 200}ms`}
                      >
                        <div className="flex flex-col">
                          <div 
                            className="relative h-48 overflow-hidden rounded-t-xl"
                            onClick={() => {
                              if (thumbnail?.type === 'youtube' && !isVideoActive) {
                                setActiveVideo((thumbnail as VideoThumbnail).videoId);
                              }
                            }}
                          >
                            {isVideoActive ? (
                              <div className="relative w-full h-full">
                                <iframe
                                  src={`https://www.youtube.com/embed/${(thumbnail as VideoThumbnail).videoId}?autoplay=1`}
                                  className="absolute inset-0 w-full h-full z-10"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                  frameBorder="0"
                                />
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveVideo(null);
                                  }}
                                  className="absolute top-2 right-2 z-20 bg-black/70 p-1 rounded-full hover:bg-black transition-colors"
                                >
                                  <X className="w-4 h-4 text-white" />
                                </button>
                              </div>
                            ) : (
                              thumbnail ? (
                                <>
                                  <img 
                                    src={thumbnail.url} 
                                    alt="Post thumbnail"
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 cursor-pointer"
                                  />
                                  {thumbnail.type === 'youtube' && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg transform transition-transform hover:scale-110">
                                        <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                                          <path d="M8 5v14l11-7z" />
                                        </svg>
                                      </div>
                                    </div>
                                  )}
                                </>
                              ) : (
                                <div className="w-full h-full bg-stone-100 flex items-center justify-center">
                                  <BookOpen className="w-12 h-12 text-stone-300" />
                                </div>
                              )
                            )}
                            {!isVideoActive && (
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
                            )}
                          </div>

                          <div className="p-6 flex-grow flex flex-col">
                            <div className="flex items-center mb-4">
                              {avatarUrl && (
                                <img 
                                  src={avatarUrl} 
                                  alt={authorName}
                                  className="w-10 h-10 rounded-full ring-2 ring-voltify-200"
                                />
                              )}
                              <div className="ml-3">
                                <div className="font-medium text-stone-900">{authorName}</div>
                                <div className="text-sm text-stone-500">
                                  {format(new Date(post.date), 'MMM d, yyyy')}
                                </div>
                              </div>
                            </div>
                            
                            <h3 
                              className="text-xl font-bold text-stone-900 mb-2 hover:text-voltify-600 transition-colors cursor-pointer"
                              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                              onClick={() => openPopup(post)}
                            />
                            
                            <p className="text-stone-600 mb-4 line-clamp-3">{preview}</p>
                            
                            <button
                              onClick={() => openPopup(post)}
                              className="mt-auto inline-flex items-center px-4 py-2 rounded-lg bg-voltify-500 text-white font-medium text-sm transition-all duration-300 hover:bg-voltify-600 self-start"
                            >
                              <ChevronDown className="h-4 w-4 mr-1.5" />
                              Read More
                            </button>
                          </div>
                        </div>
                      </GlassCard>
                    );
                  })}
                </div>
                
                {totalPages > 1 && (
                  <div className="flex justify-center items-center mt-12 space-x-2">
                    <button 
                      onClick={goToPrevPage}
                      disabled={activeTab === 0}
                      className={`p-2 rounded-lg ${activeTab === 0 ? 'text-stone-400 cursor-not-allowed' : 'text-voltify-600 hover:bg-voltify-50'}`}
                      aria-label="Previous page"
                    >
                      <ChevronUp className="rotate-90 h-5 w-5" />
                    </button>
                    
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveTab(index)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${activeTab === index ? 'bg-voltify-500 text-white' : 'text-stone-600 hover:bg-stone-100'}`}
                          aria-label={`Page ${index + 1}`}
                        >
                          {index + 1}
                        </button>
                      ))}
                    </div>
                    
                    <button 
                      onClick={goToNextPage}
                      disabled={activeTab === totalPages - 1}
                      className={`p-2 rounded-lg ${activeTab === totalPages - 1 ? 'text-stone-400 cursor-not-allowed' : 'text-voltify-600 hover:bg-voltify-50'}`}
                      aria-label="Next page"
                    >
                      <ChevronUp className="-rotate-90 h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Blog Post Popup */}
      {popupVisible && selectedPost && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-hidden transition-opacity duration-300">
          <div 
            ref={popupRef}
            className="bg-white w-full max-w-4xl max-h-[90vh] shadow-2xl rounded-xl animate-fade-in-scale flex flex-col white-brick-bg relative overflow-hidden"
          >
            {/* Loading overlay */}
            {contentLoading && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50 rounded-xl">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 border-4 border-voltify-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-voltify-700 font-medium">Loading content...</p>
                </div>
              </div>
            )}
            
            {/* Decorative header accent */}
            <div className="h-2 bg-gradient-to-r from-voltify-400 via-voltify-500 to-voltify-600 rounded-t-xl"></div>
            
            <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-stone-200 flex justify-between items-center p-5 shadow-sm">
              <div className="flex-1 text-center pr-10">
                <h2 
                  className="text-3xl font-bold text-stone-900 line-clamp-1"
                  dangerouslySetInnerHTML={{ __html: selectedPost.title.rendered }}
                />
              </div>
              <button 
                onClick={closePopup}
                className="p-2 rounded-full hover:bg-stone-100 transition-colors absolute right-4 hover:rotate-90 duration-300"
                aria-label="Close popup"
              >
                <X className="h-6 w-6 text-stone-600" />
              </button>
            </div>
            
            {/* Content */}
            <div ref={contentRef} className="px-6 py-3 pb-6 flex-grow overflow-visible">
              <div className="prose prose-stone prose-sm max-w-4xl mx-auto">
                {/* Reading time estimate and author info combined */}
                <div className="flex items-center justify-center mb-3 text-xs text-stone-500">
                  <div className="flex items-center px-3 py-1.5 rounded-full bg-voltify-100/80 text-voltify-700 backdrop-blur-sm mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {Math.ceil(selectedPost.content.rendered.split(' ').length / 200)} min read
                  </div>
                  
                  <div className="flex items-center px-3 py-1.5 rounded-full bg-voltify-100/80 text-voltify-700 backdrop-blur-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {selectedPost._embedded?.author?.[0]?.name || 'Anonymous'}
                    <span className="mx-1">•</span>
                    {format(new Date(selectedPost.date), 'MMM d, yyyy')}
                  </div>
                </div>
                
                {/* Title */}
                <h1 
                  className="text-center text-2xl font-bold text-stone-900 mb-3 leading-tight"
                  dangerouslySetInnerHTML={{ __html: selectedPost.title.rendered }}
                />
                
                {/* Article content with centered text and embedded content */}
                <div className="grid place-items-center w-full">
                  <div 
                    className="first-letter:text-4xl first-letter:font-bold first-letter:text-voltify-600 first-letter:mr-2 first-letter:float-left first-paragraph text-left text-xs w-full pl-2 md:pl-10 embedded-content"
                    dangerouslySetInnerHTML={{ __html: fixWordPressContent(selectedPost.content.rendered) }} 
                  />
                </div>
              </div>
            </div>
            
            {/* Social sharing buttons - fixed at bottom */}
            <div className="flex justify-center gap-2 p-2 bg-white border-t border-stone-200 mt-auto">
              <button className="p-1.5 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors" aria-label="Share on Twitter">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </button>
              <button className="p-1.5 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors" aria-label="Share on Facebook">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>
              <button className="p-1.5 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors" aria-label="Share on WhatsApp">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </button>
              <button className="p-1.5 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors" aria-label="Share on LinkedIn">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </button>
              <button className="p-1.5 rounded-full bg-stone-200 text-stone-600 hover:bg-stone-300 transition-colors" aria-label="Copy link">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
