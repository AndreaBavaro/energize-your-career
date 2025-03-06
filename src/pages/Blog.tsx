import Navbar from "@/components/layout/Navbar";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { useEffect, useState, useRef } from "react";
import { format } from "date-fns";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Zap, ChevronDown, ChevronUp, Calendar, User, Clock, Search, Tag, Briefcase, BookOpen, X } from "lucide-react";

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

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedPost, setExpandedPost] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const postsPerPage = 3;
  const totalPages = Math.ceil((posts?.length || 0) / postsPerPage);

  useEffect(() => {
    // Load Twitter embed script
    const twitterScript = document.createElement('script');
    twitterScript.src = 'https://platform.twitter.com/widgets.js';
    twitterScript.async = true;
    document.body.appendChild(twitterScript);

    // Load Instagram embed script
    const instagramScript = document.createElement('script');
    instagramScript.src = '//www.instagram.com/embed.js';
    instagramScript.async = true;
    document.body.appendChild(instagramScript);

    return () => {
      document.body.removeChild(twitterScript);
      document.body.removeChild(instagramScript);
    };
  }, []);

  useEffect(() => {
    // Re-run Twitter and Instagram embed when content changes
    if (window.twttr?.widgets) {
      window.twttr.widgets.load();
    }
    if (window.instgrm?.Embeds) {
      window.instgrm.Embeds.process();
    }
  }, [expandedPost]);

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

  const togglePost = (postId: number) => {
    setExpandedPost(expandedPost === postId ? null : postId);
  };

  const extractThumbnail = (content: string): Thumbnail => {
    // First try to find a regular image
    const imgRegex = /<img[^>]+src="([^">]+)"/;
    const imgMatch = content.match(imgRegex);
    if (imgMatch) {
      return { url: imgMatch[1], type: 'image' };
    }

    // If no image found, look for YouTube video
    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const youtubeMatch = content.match(youtubeRegex);
    if (youtubeMatch) {
      const videoId = youtubeMatch[1];
      return {
        url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        type: 'youtube',
        videoId
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
    
    // Find Twitter embeds
    const twitterRegex = /<blockquote[^>]*class="twitter-tweet"[^>]*>.*?<a[^>]*href="(https:\/\/twitter\.com\/[^"]+)"[^>]*>.*?<\/blockquote>/gs;
    let match;
    while ((match = twitterRegex.exec(content)) !== null) {
      embeds.push({ type: 'twitter', url: match[1], html: match[0] });
    }

    // Find YouTube embeds
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
        ></iframe>`
      });
    }

    // Find Instagram embeds
    const instagramRegex = /<blockquote[^>]*class="instagram-media"[^>]*>.*?<a[^>]*href="(https:\/\/www\.instagram\.com\/[^"]+)"[^>]*>.*?<\/blockquote>/gs;
    while ((match = instagramRegex.exec(content)) !== null) {
      embeds.push({ type: 'instagram', url: match[1], html: match[0] });
    }

    // Find news article embeds
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
        </div>`
      });
    }

    return embeds;
  };

  const fixWordPressContent = (content: string) => {
    let fixed = content
      .replace(/class="aligncenter/g, 'class="mx-auto block')
      .replace(/class="alignleft/g, 'class="float-left mr-4 mb-2')
      .replace(/class="alignright/g, 'class="float-right ml-4 mb-2')
      .replace(/class="wp-caption/g, 'class="my-4')
      .replace(/class="wp-caption-text/g, 'class="text-sm text-center text-stone-500 mt-1')
      .replace(/class="gallery/g, 'class="grid grid-cols-2 md:grid-cols-3 gap-2 my-4')
      .replace(/class="gallery-item/g, 'class="')
      .replace(/class="wp-block-embed/g, 'class="my-4')
      .replace(/<ul>/g, '<ul class="list-disc pl-5 my-4">')
      .replace(/<ol>/g, '<ol class="list-decimal pl-5 my-4">')
      .replace(/<table/g, '<table class="w-full border-collapse my-4"')
      .replace(/<th/g, '<th class="border border-stone-300 p-2 bg-stone-100"')
      .replace(/<td/g, '<td class="border border-stone-300 p-2"')
      .replace(/<blockquote/g, '<blockquote class="border-l-4 border-voltify-300 pl-4 italic my-4"');

    // Process embeds
    const embeds = findEmbeds(fixed);
    embeds.forEach(embed => {
      if (embed.html) {
        const embedWrapper = `<div class="my-6 overflow-hidden ${
          embed.type === 'twitter' ? 'twitter-embed' :
          embed.type === 'youtube' ? 'youtube-embed' :
          embed.type === 'instagram' ? 'instagram-embed' :
          'article-embed'
        }">${embed.html}</div>`;
        
        // Replace the original embed code with our wrapped version
        fixed = fixed.replace(embed.html, embedWrapper);
      }
    });
    
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
              <div className="flex flex-col items-center justify-center min-h-[300px]">
                <div className="animate-spin rounded-full h-12 w-12 border-3 border-voltify-600 border-t-transparent"></div>
                <p className="mt-4 text-stone-600">Loading insights...</p>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {getCurrentPosts().map((post, index) => {
                    const thumbnail = extractThumbnail(post.content.rendered);
                    const preview = createPreview(post.excerpt.rendered || post.content.rendered);
                    const isExpanded = expandedPost === post.id;
                    const authorName = post._embedded?.author?.[0]?.name || 'Anonymous';
                    const avatarUrl = post._embedded?.author?.[0]?.avatar_urls?.['96'] || null;
                    const fixedContent = fixWordPressContent(post.content.rendered);
                    const isVideoActive = thumbnail?.type === 'youtube' && activeVideo === (thumbnail as VideoThumbnail).videoId;

                    return (
                      <GlassCard 
                        key={post.id}
                        className={`opacity-0 animate-fade-in-up animate-fill-forwards ${isExpanded ? 'lg:col-span-3' : ''}`}
                        animationDelay={`${index * 100 + 200}ms`}
                      >
                        <div className={`flex flex-col ${isExpanded ? 'lg:flex-row' : ''}`}>
                          <div 
                            className={`relative ${isExpanded ? 'lg:w-1/3' : ''} h-48 overflow-hidden rounded-t-xl ${isExpanded ? 'lg:rounded-l-xl lg:rounded-tr-none' : ''}`}
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
                                    alt=""
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
                              )}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
                            )}
                          </div>

                          <div className={`p-6 flex-grow flex flex-col ${isExpanded ? 'lg:w-2/3' : ''}`}>
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
                                  {format(new Date(post.date), 'MMMM d, yyyy')}
                                </div>
                              </div>
                            </div>

                            <h3 
                              className={`font-semibold text-stone-900 mb-3 ${isExpanded ? 'text-2xl' : 'text-xl'}`}
                              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                            />
                            
                            {!isExpanded ? (
                              <p className="text-stone-600 mb-4 line-clamp-3">{preview}</p>
                            ) : (
                              <div className="prose prose-stone max-w-none mb-4">
                                <div dangerouslySetInnerHTML={{ __html: fixedContent }} />
                              </div>
                            )}
                            
                            <button
                              onClick={() => togglePost(post.id)}
                              className="mt-auto inline-flex items-center px-4 py-2 rounded-lg bg-voltify-500 text-white font-medium text-sm transition-all duration-300 hover:bg-voltify-600 self-start"
                            >
                              {isExpanded ? (
                                <>
                                  <ChevronUp className="h-4 w-4 mr-1.5" />
                                  Show Less
                                </>
                              ) : (
                                <>
                                  <ChevronDown className="h-4 w-4 mr-1.5" />
                                  Read More
                                </>
                              )}
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
    </div>
  );
}
