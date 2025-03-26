import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import ScrollToTop from "./components/ui/ScrollToTop";
import RouteScrollToTop from "./components/ui/RouteScrollToTop";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import TestimonialsPage from "./pages/TestimonialsPage";
import ThemePreview from "./components/ThemePreview";
import Charity from "./pages/Charity";
import { useEffect } from "react";
import { initContentProtection } from "./utils/contentProtection";

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
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
