import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import ScrollToTop from "./components/ui/ScrollToTop";
import RouteScrollToTop from "./components/ui/RouteScrollToTop";
import { lazy, Suspense, useEffect } from "react";
import { initContentProtection } from "./utils/contentProtection";

// Only import the Index page eagerly as it's the landing page
import Index from "./pages/Index";

// Lazy load all other pages
const NotFound = lazy(() => import("./pages/NotFound"));
const Contact = lazy(() => import("./pages/Contact"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const TestimonialsPage = lazy(() => import("./pages/TestimonialsPage"));
const ThemePreview = lazy(() => import("./components/ThemePreview"));
const Charity = lazy(() => import("./pages/Charity"));

// Loading fallback component
const PageLoading = () => (
  <div className="min-h-screen flex items-center justify-center bg-stone-50">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-alternative-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-alternative-600 font-medium">Loading...</p>
    </div>
  </div>
);

const queryClient = new QueryClient();

const App = () => {
  // Initialize content protection when the app loads
  useEffect(() => {
    initContentProtection();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={import.meta.env.BASE_URL || "/"}>
        <RouteScrollToTop />
        <ScrollToTop />
        <Routes>
          {/* Index page is not lazy loaded as it's the landing page */}
          <Route path="/" element={<Index />} />
          
          {/* All other routes are lazy loaded */}
          <Route path="/contact" element={
            <Suspense fallback={<PageLoading />}>
              <Contact />
            </Suspense>
          } />
          
          <Route path="/blog" element={
            <Suspense fallback={<PageLoading />}>
              <Blog />
            </Suspense>
          } />
          
          <Route path="/blog/:id" element={
            <Suspense fallback={<PageLoading />}>
              <BlogPost />
            </Suspense>
          } />
          
          <Route path="/testimonials" element={
            <Suspense fallback={<PageLoading />}>
              <TestimonialsPage />
            </Suspense>
          } />
          
          <Route path="/charity" element={
            <Suspense fallback={<PageLoading />}>
              <Charity />
            </Suspense>
          } />
          
          <Route path="/theme-preview" element={
            <Suspense fallback={<PageLoading />}>
              <ThemePreview />
            </Suspense>
          } />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={
            <Suspense fallback={<PageLoading />}>
              <NotFound />
            </Suspense>
          } />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
