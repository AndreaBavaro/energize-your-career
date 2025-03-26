import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import "@/styles/twitter-embeds.css";
import { processEmbeds, findEmbeds, EmbedInfo } from "@/utils/embedUtils";
import EmbedTypeIcon from "@/components/ui/EmbedTypeIcon";
import Newsletter from "@/components/ui/Newsletter";
import Footer from "@/components/layout/Footer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { createRoot } from 'react-dom/client';

// Twitter widget type declaration
declare global {
  interface Window {
    twttr: {
      widgets: {
        load: (element?: HTMLElement | null) => void;
      };
    };
  }
}

interface BlogPost {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  date: string;
  _embedded?: {
    author?: Array<{
      name: string;
      avatar_urls?: {
        [key: string]: string;
      };
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
    }>>;
  };
}

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [processedContent, setProcessedContent] = useState<string>('');
  const [embeds, setEmbeds] = useState<EmbedInfo[]>([]);

  // Process content to enhance embeds
  useEffect(() => {
    if (post?.content?.rendered) {
      // Process the content to enhance embeds
      const processed = processEmbeds(post.content.rendered);
      setProcessedContent(processed);
      
      // Find all embeds in the content
      const foundEmbeds = findEmbeds(post.content.rendered);
      setEmbeds(foundEmbeds);
    }
  }, [post]);

  // Add embed type icons after content is rendered
  useEffect(() => {
    if (contentRef.current && processedContent) {
      // Find all elements with data-embed-type attribute
      const embedElements = contentRef.current.querySelectorAll('[data-embed-type]');
      
      embedElements.forEach(element => {
        const embedType = element.getAttribute('data-embed-type');
        if (!embedType) return;
        
        // Check if icon already exists
        if (element.querySelector('.embed-type-icon')) return;
        
        // Create icon container
        const iconContainer = document.createElement('div');
        iconContainer.className = 'embed-type-icon';
        
        // Create React element for the icon
        const iconRoot = document.createElement('div');
        element.appendChild(iconContainer);
        
        // Use ReactDOM to render the icon component
        const root = createRoot(iconRoot);
        root.render(<EmbedTypeIcon type={embedType as any} size={20} />);
        iconContainer.appendChild(iconRoot);
      });
    }
  }, [processedContent]);

  // Load Twitter widget script
  useEffect(() => {
    // Only load the script once the post content is available and processed
    if (post && contentRef.current && processedContent) {
      // Remove any existing Twitter script to avoid duplicates
      const existingScript = document.getElementById('twitter-widget-script');
      if (existingScript) {
        existingScript.remove();
      }

      // Create and add the Twitter widget script
      const script = document.createElement('script');
      script.id = 'twitter-widget-script';
      script.src = 'https://platform.twitter.com/widgets.js';
      script.async = true;
      script.charset = 'utf-8';
      
      // When the script loads, call the Twitter widgets load function
      script.onload = () => {
        if (window.twttr && window.twttr.widgets) {
          window.twttr.widgets.load(contentRef.current);
        }
      };
      
      document.body.appendChild(script);
      
      // Clean up function
      return () => {
        if (document.getElementById('twitter-widget-script')) {
          document.getElementById('twitter-widget-script')?.remove();
        }
      };
    }
  }, [post, processedContent]);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const response = await fetch(
          `https://public-api.wordpress.com/wp/v2/sites/voltifyblog.wordpress.com/posts/${id}?_embed`
        );
        
        if (!response.ok) throw new Error('Failed to fetch blog post');
        
        const data = await response.json();
        setPost(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load blog post');
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Main content section with white brick background */}
      <main className="flex-grow pt-20 pb-16 white-brick-bg relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back to blog link */}
          <Link 
            to="/blog" 
            className="inline-flex items-center text-alternative-600 hover:text-alternative-700 mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to all posts
          </Link>

          {loading ? (
            <div className="text-center py-12">Loading post...</div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">{error}</p>
              <Link 
                to="/blog" 
                className="inline-block bg-alternative-500 hover:bg-alternative-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Return to Blog
              </Link>
            </div>
          ) : post ? (
            <article className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-6 sm:p-8 md:p-10">
              {/* Categories */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post._embedded?.['wp:term']?.[0]?.map((category) => (
                  <span
                    key={category.id}
                    className="px-3 py-1 text-sm font-medium bg-alternative-100 text-alternative-800 rounded-md"
                  >
                    {category.name}
                  </span>
                ))}
              </div>

              {/* Date */}
              <div className="text-sm text-stone-500 mb-4">
                {format(new Date(post.date), 'MMMM d, yyyy')}
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-6" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />

              {/* Author info if available */}
              {post._embedded?.author?.[0] && (
                <div className="flex items-center mb-8 pb-6 border-b border-stone-200">
                  {post._embedded.author[0].avatar_urls?.['96'] && (
                    <img 
                      src={post._embedded.author[0].avatar_urls['96']} 
                      alt={post._embedded.author[0].name}
                      className="h-12 w-12 rounded-full mr-4 object-cover"
                    />
                  )}
                  <div>
                    <p className="font-medium text-stone-900">By {post._embedded.author[0].name}</p>
                  </div>
                </div>
              )}

              {/* Content */}
              <div 
                ref={contentRef}
                className="prose prose-stone max-w-none prose-headings:text-alternative-900 prose-a:text-alternative-600 hover:prose-a:text-alternative-700 relative"
                dangerouslySetInnerHTML={{ __html: processedContent }}
              />
              
              {/* Embed Icons */}
              {embeds.length > 0 && (
                <div className="flex gap-2 mt-4 justify-end">
                  <div className="text-sm text-stone-500 mr-1">Contains:</div>
                  {[...new Set(embeds.map(embed => embed.type))].map((type, index) => (
                    <div key={index} className="bg-white rounded-full p-1 shadow-sm">
                      <EmbedTypeIcon type={type} size={18} />
                    </div>
                  ))}
                </div>
              )}
            </article>
          ) : (
            <div className="text-center py-12">Post not found</div>
          )}
        </div>
        
        {/* Newsletter Section */}
        <section className="py-16 bg-stone-100">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <SectionHeading
                title="Subscribe to Our Newsletter"
                subtitle="Never miss a new post. Get notified when we publish new content."
                className="mb-8"
              />
              <div className="max-w-md mx-auto">
                <Newsletter className="mt-6" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
