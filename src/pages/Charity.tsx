import React from 'react';
import { Heart, Users, Sparkles } from 'lucide-react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SectionHeading } from '@/components/ui/SectionHeading';

export default function Charity() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow relative">
        {/* Hero Section */}
        <section className="py-16 md:py-24 white-brick-bg relative">
          <div className="absolute inset-0 z-0">
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-voltify-50 rounded-full filter blur-3xl opacity-30 transform translate-x-1/4"></div>
          </div>
          
          <div className="container-custom relative z-10">
            <SectionHeading 
              title="Voltify Gives Back"
              subtitle="For each candidate hired, we contribute 5% of the fee to assisting those in need through charitable initiatives."
            />
            
            <div className="mt-12 max-w-3xl mx-auto">
              <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-md border border-stone-100 relative">
                <div className="flex justify-center mb-6">
                  <Heart className="h-16 w-16 text-alternative-600" fill="currentColor" />
                </div>
                
                <h3 className="text-2xl font-bold text-stone-900 mb-4 text-center">Our Commitment to Transparency</h3>
                
                <p className="text-lg text-stone-700 mb-6 text-center">
                  A copy of the donation receipt is provided to the designated client for transparency.
                </p>
                
                <div className="text-center text-stone-600">
                  <p className="mb-2">Thank you for helping us make a difference in our community.</p>
                  <p>Together, we can create positive change while building successful careers.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
