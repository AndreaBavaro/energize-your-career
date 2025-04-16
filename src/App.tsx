import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import ScrollToTop from "./components/ui/ScrollToTop";
import RouteScrollToTop from "./components/ui/RouteScrollToTop";
import { lazy, Suspense, useEffect } from "react";
import { initContentProtection } from "./utils/contentProtection";

// Lazy load all pages to reduce initial bundle size
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Contact = lazy(() => import("./pages/Contact"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const TestimonialsPage = lazy(() => import("./pages/TestimonialsPage"));
const ThemePreview = lazy(() => import("./components/ThemePreview"));
const Charity = lazy(() => import("./pages/Charity"));

const queryClient = new QueryClient();

const App = () => {
  // Initialize content protection when the app loads
  useEffect(() => {
    initContentProtection();
  }, []);

  // Loading fallback component that appears during lazy loading
  const LoadingFallback = () => (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="h-16 w-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-lg font-medium text-muted-foreground">Loading...</p>
      </div>
    </div>
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={import.meta.env.BASE_URL || "/"}>
        <RouteScrollToTop />
        <ScrollToTop />
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/charity" element={<Charity />} />
            <Route path="/theme-preview" element={<ThemePreview />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
