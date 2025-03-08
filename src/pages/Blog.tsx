import Navbar from "@/components/layout/Navbar";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Search } from "lucide-react";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Fetch posts from WordPress API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          'https://public-api.wordpress.com/wp/v2/sites/voltifyblog.wordpress.com/posts?_embed&per_page=100'
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

  // Get unique categories from posts
  const categories = Array.from(new Set(
    posts.flatMap(post => 
      post._embedded?.['wp:term']?.[0]?.map(cat => cat.name) || []
    )
  ));

  // Filter posts based on search and category
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.rendered.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.rendered.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" ||
      post._embedded?.['wp:term']?.[0]?.some(cat => cat.name === selectedCategory);

    return matchesSearch && matchesCategory;
  });

  // Clean HTML content
  const stripHtml = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
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

          <div className="container mx-auto px-4 relative z-10">
            <SectionHeading 
              title="Insights & Perspectives"
              subtitle="Stay updated with our latest thoughts on career development and industry trends."
            />

            {/* Search and Filter Section */}
            <div className="mt-12 flex flex-col md:flex-row gap-4 items-center justify-between max-w-7xl mx-auto">
              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  placeholder="Search posts..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-voltify-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-stone-400" />
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
                <button
                  onClick={() => setSelectedCategory("All")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === "All"
                      ? "bg-voltify-600 text-white"
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
                        ? "bg-voltify-600 text-white"
                        : "bg-white text-stone-600 hover:bg-stone-100"
                    }`}
                  >
                    {category}
                  </button>
                ))}
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {filteredPosts.map((post) => (
                  <a
                    key={post.id}
                    href={`/blog/${post.id}`}
                    className="transform transition-transform hover:scale-[1.02]"
                  >
                    <GlassCard className="h-full">
                      <div className="p-6 flex flex-col h-full">
                        {/* Categories */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post._embedded?.['wp:term']?.[0]?.map((category) => (
                            <span
                              key={category.id}
                              className="px-2 py-1 text-xs font-medium bg-voltify-100 text-voltify-800 rounded-md"
                            >
                              {category.name}
                            </span>
                          ))}
                        </div>

                        {/* Date */}
                        <div className="text-sm text-stone-500 mb-2">
                          {format(new Date(post.date), 'MMMM d, yyyy')}
                        </div>

                        {/* Title */}
                        <h2 className="text-xl font-bold text-stone-900 mb-3">
                          {post.title.rendered}
                        </h2>

                        {/* Excerpt */}
                        <p className="text-stone-600 text-sm line-clamp-3">
                          {stripHtml(post.excerpt.rendered)}
                        </p>
                      </div>
                    </GlassCard>
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
