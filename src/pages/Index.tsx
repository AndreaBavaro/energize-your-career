import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import AboutUs from "@/components/sections/AboutUs";
import Services from "@/components/sections/Services";
import Sectors from "@/components/sections/Sectors";
import ClientTypes from "@/components/sections/ClientTypes";
import GivingBack from "@/components/sections/GivingBack";
import OurStory from "@/components/sections/OurStory";
import Testimonials from "@/components/sections/Testimonials";
import WhyPartner from "@/components/sections/WhyPartner";
import WhatWeDo from "@/components/sections/WhatWeDo";

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
      
      <Hero />
      
      <main className="flex-grow relative">
        <AboutUs />
        <WhatWeDo />
        <OurStory />
        <Testimonials />
        <WhyPartner />
        <Services />
        <Sectors />
        <ClientTypes />
        <GivingBack />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
