
import { ArrowRight } from 'lucide-react';
import { AnimatedText } from '../ui/AnimatedText';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-voltify-100 rounded-full filter blur-3xl opacity-60 transform translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-voltify-200 rounded-full filter blur-3xl opacity-60 transform -translate-x-1/4 translate-y-1/4"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-6 inline-block">
            <span className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-voltify-100 text-voltify-800 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-voltify-500 mr-2"></span>
              Women-Owned Staffing Solutions
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 opacity-0 animate-fade-in-up animate-fill-forwards">
            <AnimatedText 
              text="Energize Your Career" 
              className="text-voltify-800 block mb-3"
              animation="fade-in-up"
              delay={200}
            />
            <AnimatedText 
              text="With Voltify" 
              className="text-stone-800 block"
              animation="fade-in-up"
              delay={400}
            />
          </h1>
          
          <p className="text-xl text-stone-600 mb-10 max-w-xl mx-auto opacity-0 animate-fade-in-up animate-fill-forwards animate-delay-500">
            We connect exceptional talent with outstanding organizations, creating perfect matches that drive success for both.
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
              className="border-2 border-voltify-600 text-voltify-700 hover:bg-voltify-50 px-8 py-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-lg font-medium"
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
        <a href="#about" className="text-stone-500 hover:text-voltify-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </a>
      </div>
    </div>
  );
}
