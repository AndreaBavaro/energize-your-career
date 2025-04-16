import { lazy, Suspense, useEffect, useState, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LazySection from "@/components/ui/LazySection";

// Only import Hero eagerly as it's the LCP element
import Hero from "@/components/sections/Hero";

// Lazy load all other section components
const AboutUs = lazy(() => import("@/components/sections/AboutUs"));
const Services = lazy(() => import("@/components/sections/Services"));
const ClientTypes = lazy(() => import("@/components/sections/ClientTypes"));
const OurStory = lazy(() => import("@/components/sections/OurStory"));
const WhyPartner = lazy(() => import("@/components/sections/WhyPartner"));
const WhatWeDo = lazy(() => import("@/components/sections/WhatWeDo"));

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

  // Simple section loading placeholder
  const SectionPlaceholder = () => (
    <div className="flex items-center justify-center py-20">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero is eagerly loaded as it's the LCP element */}
      <Hero />
      
      <main className="flex-grow relative">
        {/* Lazy load sections with Suspense and LazySection */}
        <Suspense fallback={<SectionPlaceholder />}>
          <LazySection id="who-we-are">
            <AboutUs />
          </LazySection>
        </Suspense>

        <Suspense fallback={<SectionPlaceholder />}>
          <LazySection id="what-we-do">
            <WhatWeDo />
          </LazySection>
        </Suspense>

        <Suspense fallback={<SectionPlaceholder />}>
          <LazySection id="our-story">
            <OurStory />
          </LazySection>
        </Suspense>

        <Suspense fallback={<SectionPlaceholder />}>
          <LazySection id="why-partner">
            <WhyPartner />
          </LazySection>
        </Suspense>

        <Suspense fallback={<SectionPlaceholder />}>
          <LazySection id="services">
            <Services />
          </LazySection>
        </Suspense>

        <Suspense fallback={<SectionPlaceholder />}>
          <LazySection>
            <ClientTypes />
          </LazySection>
        </Suspense>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
