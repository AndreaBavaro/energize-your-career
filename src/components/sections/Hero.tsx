
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { AnimatedText } from '../ui/AnimatedText';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center overflow-hidden">
      {/* Office Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/lovable-uploads/fa2de695-0bf5-4f8a-89f0-ac1c6ed56faa.png')`,
            filter: 'blur(2px)'
          }}
        />
        
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/70 via-stone-950/50 to-stone-950/70"></div>
      </div>
      
      {/* Content */}
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-6 inline-block">
            <span className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-voltify-100/20 text-voltify-100 backdrop-blur-sm animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-voltify-400 mr-2"></span>
              Women-Owned Staffing Solutions
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 opacity-0 animate-fade-in-up animate-fill-forwards text-white">
            <AnimatedText 
              text="Energize Your Career" 
              className="text-white block mb-3"
              animation="fade-in-up"
              delay={200}
            />
            <AnimatedText 
              text="With Voltify" 
              className="text-voltify-200 block"
              animation="fade-in-up"
              delay={400}
            />
          </h1>
          
          <p className="text-xl text-stone-200 mb-10 max-w-2xl mx-auto opacity-0 animate-fade-in-up animate-fill-forwards animate-delay-500 leading-relaxed">
            True to the meaning of our name – Voltify – our mission is clear: to energize careers, 
            build lasting relationships, connect you with opportunities, and help you grow, all supported 
            by a positive mindset that leads to success.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in-up animate-fill-forwards animate-delay-700">
            <Button 
              className="bg-voltify-600 hover:bg-voltify-700 text-white px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-lg font-medium"
              size="lg"
              asChild
            >
              <a href="#job-seekers">
                For Job Seekers
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-lg font-medium backdrop-blur-sm"
              size="lg"
              asChild
            >
              <a href="#employers">
                For Employers
              </a>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" className="text-white hover:text-voltify-300 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </a>
      </div>
    </div>
  );
}
