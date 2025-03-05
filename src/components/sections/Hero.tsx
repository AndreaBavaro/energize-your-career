import { useState, useEffect } from 'react';
import { ArrowRight, Award, Heart, Star, Briefcase, Tag, Zap, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';
import { AnimatedText } from '../ui/AnimatedText';
import { Button } from '@/components/ui/button';

export default function Hero() {
  // State to track if the mobile dropdown is open
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Trending tech buzzwords instead of specific positions
  const trendingBuzzwords = [
    "AI & Machine Learning",
    "Data Science",
    "Cybersecurity",
    "Blockchain",
    "Cloud Architecture",
    "DevOps & SRE",
    "Full-Stack Development",
    "UX/UI Design",
    "Product Management",
    "And many more..."
  ];

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative min-h-screen flex items-start sm:items-center overflow-hidden -mt-6 sm:-mt-6 pt-20 sm:pt-0">
      {/* Office Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 hero-bg-image"
          style={{
            backgroundImage: `url('/images/office-view.jpg')`,
            filter: 'contrast(1.05) brightness(1.05) saturate(1.05)',
            imageRendering: 'high-quality'
          }}
        />
        
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/60 via-stone-950/50 to-stone-950/60"></div>
      </div>
      
      {/* Content */}
      <div className="container-custom relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Women-Owned Badge - Creative Version */}
          <div className="mb-4 sm:mb-8 text-center mt-12 sm:mt-20 md:mt-28">
            <div className="inline-block">
              <div className="flex items-center space-x-2 bg-black/40 backdrop-blur-md px-5 py-3 rounded-full border border-pink-500/30 shadow-md hover:border-pink-500/50 transition-all duration-300">
                <Award className="h-5 w-5 text-pink-300" />
                <span className="text-sm font-semibold text-white tracking-wider">PROUDLY WOMEN-OWNED & OPERATED</span>
                <Award className="h-5 w-5 text-pink-300" />
              </div>
            </div>
          </div>
          
          {/* Main content with right-side trending section */}
          <div className="flex flex-col md:flex-row gap-6 items-stretch">
            {/* Left content column */}
            <div className="flex-1">
              {/* Text content with backdrop */}
              <div className="relative p-5 sm:p-8 md:p-10 rounded-xl bg-blue-900/60 backdrop-blur-sm shadow-lg border border-blue-500/20 text-center md:text-left h-full flex flex-col justify-between">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-8 opacity-0 animate-fade-in-up animate-fill-forwards text-white">
                  <AnimatedText 
                    text="Energize Your Career" 
                    className="text-white block mb-3"
                    animation="fade-in-up"
                    delay={200}
                  />
                  <div className="flex items-center justify-center md:justify-start mt-1 sm:mt-2">
                    <span className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">With</span>
                    <div className="flex items-center ml-2 sm:ml-3">
                      <span className="text-voltify-200 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">Voltify</span>
                      <Zap className="h-8 w-6 sm:h-10 sm:w-8 md:h-12 md:w-10 text-voltify-300 ml-1 sm:ml-2" />
                    </div>
                  </div>
                </h1>
                
                <p className="text-lg sm:text-xl md:text-2xl text-stone-200 mb-6 sm:mb-10 max-w-3xl mx-auto md:mx-0 opacity-0 animate-fade-in-up animate-fill-forwards animate-delay-500 leading-relaxed">
                True to the meaning of our name – Voltify – our mission is clear: to energize careers, build lasting relationships, connect you with opportunities, and help you grow, all supported by a positive mindset that leads to success.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start opacity-0 animate-fade-in-up animate-fill-forwards animate-delay-700">
                  <Button 
                    className="bg-voltify-600 hover:bg-voltify-700 text-white px-6 sm:px-8 py-4 sm:py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-base sm:text-lg font-medium"
                    size="lg"
                    asChild
                  >
                    <a href="#job-seekers">
                      For Job Seekers
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                  <Button 
                    className="bg-blue-900 hover:bg-blue-800 text-white px-6 sm:px-8 py-4 sm:py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-base sm:text-lg font-medium"
                    size="lg"
                    asChild
                  >
                    <a href="#employers">
                      For Employers
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Right column with trending tech - DESKTOP VERSION */}
            <div className="md:w-64 lg:w-72 opacity-0 animate-fade-in-up animate-fill-forwards animate-delay-600 mx-auto md:mx-0 hidden md:block">
              <div className="bg-blue-900/60 backdrop-blur-sm rounded-xl border border-blue-500/20 shadow-lg overflow-hidden h-full">
                <div className="p-4 bg-gradient-to-r from-blue-900/60 to-voltify-600/40 border-b border-blue-500/20">
                  <div className="flex items-center justify-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-voltify-300" />
                    <h3 className="text-center text-sm font-semibold uppercase tracking-wider text-voltify-200">Connecting Top Talent</h3>
                  </div>
                </div>
                
                {/* Trending buzzwords - Desktop */}
                <div className="p-5">
                  <div className="space-y-3">
                    {trendingBuzzwords.map((buzzword, index) => (
                      <div 
                        key={index} 
                        className={`relative overflow-hidden ${index < 3 ? 'bg-gradient-to-r from-blue-900/60 to-voltify-600/30' : 'bg-blue-900/30'} px-3 py-2 rounded-lg text-sm ${index < 3 ? 'text-white font-medium' : 'text-stone-300'} border ${index < 3 ? 'border-voltify-400/30' : 'border-blue-500/10'} transition-all duration-300 hover:bg-blue-800/40 hover:text-white group`}
                      >
                        <div className="flex items-center">
                          {index < 3 && <Zap className="h-3.5 w-3.5 text-voltify-300 mr-1.5 animate-pulse" />}
                          <span>{buzzword}</span>
                        </div>
                        {index < 3 && (
                          <div className="absolute top-0 right-0 bg-voltify-500/30 text-xs px-1.5 py-0.5 rounded-bl-md text-white">
                            Hot
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mobile version of trending tech */}
            <div className="md:hidden w-full opacity-0 animate-fade-in-up animate-fill-forwards animate-delay-600">
              <div className="bg-blue-900/60 backdrop-blur-sm rounded-xl border border-blue-500/20 shadow-lg overflow-hidden">
                <div className="p-3 bg-gradient-to-r from-blue-900/60 to-voltify-600/40 border-b border-blue-500/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-voltify-300" />
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-voltify-200">Connecting Top Talent</h3>
                    </div>
                    <button 
                      onClick={toggleDropdown}
                      className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-800/50 hover:bg-blue-700/50 transition-colors"
                      aria-label="Toggle dropdown"
                    >
                      {isDropdownOpen ? (
                        <ChevronUp className="h-4 w-4 text-voltify-200" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-voltify-200" />
                      )}
                    </button>
                  </div>
                </div>
                
                {/* Hot buzzwords - always visible on mobile */}
                <div className="p-3">
                  <div className="flex flex-wrap gap-2">
                    {trendingBuzzwords.slice(0, 3).map((buzzword, index) => (
                      <div 
                        key={index} 
                        className="relative overflow-hidden bg-gradient-to-r from-blue-900/60 to-voltify-600/30 px-3 py-2 rounded-lg text-sm text-white font-medium border border-voltify-400/30 transition-all duration-300"
                      >
                        <div className="flex items-center">
                          <Zap className="h-3.5 w-3.5 text-voltify-300 mr-1.5 animate-pulse" />
                          <span className="pr-8">{buzzword}</span>
                        </div>
                        <div className="absolute top-0 right-0 bg-voltify-500/30 text-xs px-1.5 py-0.5 rounded-bl-md text-white">
                          Hot
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Additional buzzwords - only visible when dropdown is open */}
                {isDropdownOpen && (
                  <div className="p-3 pt-0">
                    <div className="flex flex-wrap gap-2">
                      {trendingBuzzwords.slice(3).map((buzzword, index) => (
                        <div 
                          key={index} 
                          className="bg-blue-900/30 px-3 py-2 rounded-lg text-sm text-stone-300 border border-blue-500/10 transition-all duration-300"
                        >
                          <span>{buzzword}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Stats Bar */}
          <div className="mt-4 md:mt-12 mb-6 md:mb-0 opacity-0 animate-fade-in-up animate-fill-forwards animate-delay-1000">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 py-4 md:py-6 px-3 md:px-4 rounded-xl bg-black/25 backdrop-blur-md shadow-lg border border-gray-500/20">
              <div className="text-center p-2 md:p-4">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1">20+</div>
                <div className="text-[10px] md:text-xs uppercase tracking-wider text-purple-300">YEARS EXPERIENCE</div>
              </div>
              
              <div className="text-center p-2 md:p-4">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1">500+</div>
                <div className="text-[10px] md:text-xs uppercase tracking-wider text-voltify-300">SUCCESSFUL PLACEMENTS</div>
              </div>
              
              <div className="text-center p-2 md:p-4">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1">95%</div>
                <div className="text-[10px] md:text-xs uppercase tracking-wider text-voltify-200">CLIENT SATISFACTION</div>
              </div>
              
              <div className="text-center p-2 md:p-4">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1">5%</div>
                <div className="text-[10px] md:text-xs uppercase tracking-wider text-voltify-100">TO CHARITY</div>
              </div>
            </div>
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
