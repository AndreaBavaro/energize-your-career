import Navbar from "@/components/layout/Navbar";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { ArrowDownAZ, ArrowDownUp, ArrowUpAZ, Calendar, ChevronDown, Search, SlidersHorizontal, Video } from "lucide-react";
import { Link } from "react-router-dom";
import { findEmbeds, EmbedType } from "@/utils/embedUtils";
import EmbedTypeIcon from "@/components/ui/EmbedTypeIcon";
import Newsletter from "@/components/ui/Newsletter";
import Footer from "@/components/layout/Footer";

interface BlogPost {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  categories: number[];
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

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [postEmbeds, setPostEmbeds] = useState<Record<number, string[]>>({});
  const [sortOption, setSortOption] = useState<'newest' | 'oldest' | 'a-z' | 'z-a' | 'media'>('newest');
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://public-api.wordpress.com/wp/v2/sites/voltifyblog.wordpress.com/posts?_embed=true&per_page=100"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data: BlogPost[] = await response.json();
        setPosts(data);

        // Extract unique categories and remove "Uncategorized"
        const uniqueCategories = new Set<string>();
        data.forEach((post) => {
          post._embedded?.["wp:term"]?.[0]?.forEach((term) => {
            if (term.name !== "Uncategorized") {
              uniqueCategories.add(term.name);
            }
          });
        });
        setCategories(Array.from(uniqueCategories).sort());

        // Find embeds in posts
        const embedsMap: Record<number, string[]> = {};
        data.forEach(post => {
          const embeds = findEmbeds(post.content.rendered);
          if (embeds.length > 0) {
            // Extract just the embed types as strings, but ensure they match the EmbedType type
            embedsMap[post.id] = embeds.map(embed => embed.type);
          }
        });
        setPostEmbeds(embedsMap);

        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts based on selected category and search query
  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" ||
      post._embedded?.["wp:term"]?.[0]?.some(
        (term) => term.name === selectedCategory
      );

    const matchesSearch =
      searchQuery === "" ||
      post.title.rendered.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stripHtml(post.excerpt.rendered)
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Sort posts based on the selected sort option
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortOption) {
      case 'newest':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'oldest':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'a-z':
        return a.title.rendered.localeCompare(b.title.rendered);
      case 'z-a':
        return b.title.rendered.localeCompare(a.title.rendered);
      case 'media':
        // Sort posts with embeds first
        const aHasEmbed = postEmbeds[a.id] && postEmbeds[a.id].length > 0;
        const bHasEmbed = postEmbeds[b.id] && postEmbeds[b.id].length > 0;
        if (aHasEmbed && !bHasEmbed) return -1;
        if (!aHasEmbed && bHasEmbed) return 1;
        return new Date(b.date).getTime() - new Date(a.date).getTime(); // Default to newest if both have or don't have embeds
      default:
        return 0;
    }
  });

  // Helper function to strip HTML tags
  const stripHtml = (html: string) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const getSortIcon = () => {
    switch (sortOption) {
      case 'newest':
      case 'oldest':
        return <Calendar size={18} />;
      case 'a-z':
        return <ArrowDownAZ size={18} />;
      case 'z-a':
        return <ArrowUpAZ size={18} />;
      case 'media':
        return <Video size={18} />;
      default:
        return <SlidersHorizontal size={18} />;
    }
  };

  const getSortLabel = () => {
    switch (sortOption) {
      case 'newest':
        return 'Newest First';
      case 'oldest':
        return 'Oldest First';
      case 'a-z':
        return 'A to Z';
      case 'z-a':
        return 'Z to A';
      case 'media':
        return 'Media First';
      default:
        return 'Sort By';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow white-brick-bg">
        {/* Header Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/3 left-0 w-96 h-96 bg-alternative-50 rounded-full filter blur-3xl opacity-30 transform -translate-x-1/4"></div>
            <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-alternative-100 rounded-full filter blur-3xl opacity-30 transform translate-x-1/4"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <SectionHeading 
              title="Insights & Perspectives"
              subtitle="Stay updated with our latest thoughts on career development and industry trends."
            />

            {/* Search, Filter, and Sort Section */}
            <div className="mt-12 flex flex-col md:flex-row gap-4 items-center justify-between max-w-7xl mx-auto">
              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  placeholder="Search posts..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-alternative-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-stone-400" />
              </div>

              <div className="flex gap-2 items-center w-full md:w-auto">
                {/* Sort Dropdown */}
                <div className="relative mr-2">
                  <button 
                    onClick={() => setShowSortDropdown(!showSortDropdown)}
                    className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium bg-white text-stone-600 hover:bg-stone-100 transition-colors"
                  >
                    {getSortIcon()}
                    <span className="hidden sm:inline">{getSortLabel()}</span>
                    <ChevronDown size={16} />
                  </button>
                  
                  {showSortDropdown && (
                    <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg z-20 py-1">
                      <button 
                        onClick={() => {
                          setSortOption('newest');
                          setShowSortDropdown(false);
                        }}
                        className={`flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-stone-100 ${sortOption === 'newest' ? 'bg-stone-100 font-medium' : ''}`}
                      >
                        <Calendar size={16} />
                        Newest First
                      </button>
                      <button 
                        onClick={() => {
                          setSortOption('oldest');
                          setShowSortDropdown(false);
                        }}
                        className={`flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-stone-100 ${sortOption === 'oldest' ? 'bg-stone-100 font-medium' : ''}`}
                      >
                        <Calendar size={16} />
                        Oldest First
                      </button>
                      <button 
                        onClick={() => {
                          setSortOption('a-z');
                          setShowSortDropdown(false);
                        }}
                        className={`flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-stone-100 ${sortOption === 'a-z' ? 'bg-stone-100 font-medium' : ''}`}
                      >
                        <ArrowDownAZ size={16} />
                        A to Z
                      </button>
                      <button 
                        onClick={() => {
                          setSortOption('z-a');
                          setShowSortDropdown(false);
                        }}
                        className={`flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-stone-100 ${sortOption === 'z-a' ? 'bg-stone-100 font-medium' : ''}`}
                      >
                        <ArrowUpAZ size={16} />
                        Z to A
                      </button>
                      <button 
                        onClick={() => {
                          setSortOption('media');
                          setShowSortDropdown(false);
                        }}
                        className={`flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-stone-100 ${sortOption === 'media' ? 'bg-stone-100 font-medium' : ''}`}
                      >
                        <Video size={16} />
                        Media First
                      </button>
                    </div>
                  )}
                </div>

                {/* Categories */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                  <button
                    onClick={() => setSelectedCategory("All")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === "All"
                        ? "bg-alternative-600 text-white"
                        : "bg-white text-stone-600 hover:bg-stone-100"
                    }`}
                  >
                    All
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedCategory === category
                          ? "bg-alternative-600 text-white"
                          : "bg-white text-stone-600 hover:bg-stone-100"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts Section */}
        <section className="pb-20">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center py-12">Loading posts...</div>
            ) : error ? (
              <div className="text-center py-12 text-red-600">{error}</div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto">
                {sortedPosts.map((post) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.id}`}
                    className="transform transition-transform hover:scale-[1.02]"
                  >
                    <GlassCard className="h-full">
                      <div className="p-4 sm:p-6 flex flex-col h-full relative">
                        {/* Embed icons - positioned in top right */}
                        {postEmbeds[post.id] && postEmbeds[post.id].length > 0 && (
                          <div className="absolute top-2 right-2 flex gap-1 z-10">
                            {postEmbeds[post.id].map((embedType, index) => (
                              <div key={index} className="bg-white rounded-full p-1 shadow-sm">
                                <EmbedTypeIcon type={embedType as EmbedType} size={16} />
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {/* Categories - hidden on mobile, visible on sm and up */}
                        <div className="hidden sm:flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3">
                          {post._embedded?.['wp:term']?.[0]?.filter(category => category.name !== "Uncategorized").map((category) => (
                            <span
                              key={category.id}
                              className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-medium bg-alternative-100 text-alternative-800 rounded-md"
                            >
                              {category.name}
                            </span>
                          ))}
                        </div>

                        {/* Date */}
                        <div className="text-xs sm:text-sm text-stone-500 mb-1 sm:mb-2 flex items-center mt-1 pr-8">
                          {format(new Date(post.date), 'MMMM d, yyyy')}
                          {post._embedded?.author?.[0]?.name && (
                            <>
                              <span className="mx-1">•</span>
                              <span className="flex items-center">
                                {post._embedded.author[0].avatar_urls?.['24'] && (
                                  <img 
                                    src={post._embedded.author[0].avatar_urls['24']} 
                                    alt={post._embedded.author[0].name}
                                    className="w-4 h-4 rounded-full mr-1"
                                  />
                                )}
                                <span>By {post._embedded.author[0].name}</span>
                              </span>
                            </>
                          )}
                        </div>

                        {/* Title */}
                        <h2 className="text-base sm:text-xl font-bold text-stone-900 mb-2 sm:mb-3">
                          {post.title.rendered}
                        </h2>

                        {/* Excerpt */}
                        <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 sm:line-clamp-3 mb-2 sm:mb-0 flex-grow">
                          {stripHtml(post.excerpt.rendered)}
                        </p>
                        
                        {/* Categories - visible only on mobile at the bottom */}
                        <div className="flex sm:hidden flex-wrap gap-1 mt-auto pt-2">
                          {post._embedded?.['wp:term']?.[0]?.filter(category => category.name !== "Uncategorized").map((category) => (
                            <span
                              key={category.id}
                              className="px-1.5 py-0.5 text-xs font-medium bg-alternative-100 text-alternative-800 rounded-md"
                            >
                              {category.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </GlassCard>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-8 bg-stone-100">
          <div className="container mx-auto px-4">
            <div className="max-w-xl mx-auto text-center">
              <SectionHeading
                title="Subscribe to Our Newsletter"
                subtitle="Get the latest blog posts and career tips delivered to your inbox."
                className="mb-4"
                size="small"
              />
              <div className="max-w-sm mx-auto">
                <Newsletter className="mt-4" variant="compact" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
