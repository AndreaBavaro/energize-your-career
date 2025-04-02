import { useEffect, lazy, Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";

// Lazy load components that are below the fold
const AboutUs = lazy(() => import("@/components/sections/AboutUs"));
const Services = lazy(() => import("@/components/sections/Services"));
const ClientTypes = lazy(() => import("@/components/sections/ClientTypes"));
const OurStory = lazy(() => import("@/components/sections/OurStory"));
const WhyPartner = lazy(() => import("@/components/sections/WhyPartner"));
const WhatWeDo = lazy(() => import("@/components/sections/WhatWeDo"));

// Loading fallback component
const SectionLoading = () => (
  <div className="py-24 white-brick-bg flex justify-center items-center">
    <div className="animate-pulse bg-alternative-100 rounded-xl h-64 w-full max-w-4xl"></div>
  </div>
);

const Index = () => {
  useEffect(() => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (!targetId) return;
        
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;
        
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'
        });
      });
    });
    
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', function (e) {});
      });
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero is not lazy loaded as it's above the fold */}
      <Hero />
      
      <main className="flex-grow relative">
        <Suspense fallback={<SectionLoading />}>
          <AboutUs />
        </Suspense>
        
        <Suspense fallback={<SectionLoading />}>
          <WhatWeDo />
        </Suspense>
        
        <Suspense fallback={<SectionLoading />}>
          <OurStory />
        </Suspense>
        
        <Suspense fallback={<SectionLoading />}>
          <WhyPartner />
        </Suspense>
        
        <Suspense fallback={<SectionLoading />}>
          <Services />
        </Suspense>
        
        <Suspense fallback={<SectionLoading />}>
          <ClientTypes />
        </Suspense>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
