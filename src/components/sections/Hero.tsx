import { useState, useEffect, useCallback } from 'react';
import { ArrowRight, Award, Heart, Star, Briefcase, Tag, Zap, TrendingUp, ChevronDown, ChevronUp, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatedText } from '../ui/AnimatedText';
import { Button } from '@/components/ui/button';
import { JobSeekerModal } from '../ui/JobSeekerModal';
import { EmployerModal } from '../ui/EmployerModal';

export default function Hero() {
  // State to track if the mobile dropdown is open
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // State to track the current testimonial index
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  // Testimonials data
  const testimonials = [
    {
      quote: "Melinda’s professionalism and transparency made the hiring process seamless. She provided exceptional support throughout and after I started my new role.",
      author: "Ali Darbani",
      position: "Senior Project Manager, RBC Capital Markets",
      initials: "AD",
      bgColor: "bg-voltify-900"
    },
    {
      quote: "Melinda played a key role in securing a well-paid position for me, advocating for contract extensions that led to a three-year role. I’m grateful for the opportunity to work with her.",
      author: "Werner Strijewski",
      position: "Principal Software Engineer, Yamaha Motor Canada",
      initials: "WS",
      bgColor: "bg-voltify-700"
    },
    {
      quote: "Melinda's support was invaluable throughout the process, making me feel confident and heard. I highly recommend her to anyone seeking career guidance.",
      author: "Jared Drepaul",
      position: "Director HR Operations Technology, TMX Group",
      initials: "JD",
      bgColor: "bg-voltify-400"
    },
    {
      quote: "Her guidance in securing a Senior Project Manager role was instrumental. Melinda's support through the interview process was invaluable.",
      author: "Gabriela Alcina",
      position: "Global Project Manager, IPC Systems",
      initials: "GA",
      bgColor: "bg-voltify-500"
    },
    {
      quote: "Working with Melinda was a transformative experience. She made everything clear, proactive, and stress-free during the contract process.",
      author: "Shayan Nedaei",
      position: "Senior Project Manager Digital Transformation, DECIEM/The Abnormal Beauty Company",
      initials: "SN",
      bgColor: "bg-voltify-800"
    },
    {
      quote: "Melinda was a great partner throughout my job search, providing tailored advice and regular feedback. I felt supported and confident in her hands.",
      author: "Adelle DSilva",
      position: "Senior Project Manager, DECIEM/The Abnormal Beauty Company",
      initials: "AD",
      bgColor: "bg-voltify-600"
    }
  ];
  
  

  // Trending tech buzzwords instead of specific positions
  const trendingBuzzwords = [
    "Artificial Intelligence",
    "Cloud Computing",
    "Data Science",
    "Cybersecurity",
    "DevOps",
    "Blockchain",
    "Machine Learning",
    "UX/UI Design"
  ];

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Function to navigate to the next testimonial
  const nextTestimonial = useCallback(() => {
    setCurrentTestimonialIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  }, [testimonials.length]);

  // Function to navigate to the previous testimonial
  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  // Auto-rotate testimonials every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 10000000);
    
    return () => clearInterval(interval);
  }, [nextTestimonial]);

  // Get the current testimonial
  const currentTestimonial = testimonials[currentTestimonialIndex];

  // State for modals
  const [isJobSeekerModalOpen, setIsJobSeekerModalOpen] = useState(false);
  const [isEmployerModalOpen, setIsEmployerModalOpen] = useState(false);

  return (
    <section id="hero" className="relative min-h-[calc(100vh-2rem)] md:min-h-screen flex items-start md:items-center overflow-hidden -mt-[2.5rem] sm:-mt-6 pt-16 sm:pt-0 pb-16 md:pb-20">
      {/* Office Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 hero-bg-image"
          style={{
            backgroundImage: `url('/images/office-view6.jpg')`,
            filter: 'contrast(1.2) brightness(1.0) saturate(1.0)',
            imageRendering: 'auto'
          }}
        />
        
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/60 via-stone-950/50 to-stone-950/60"></div>
      </div>
      
      {/* Content */}
      <div className="container-custom relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="pt-12 sm:pt-20 md:pt-28">
            {/* Main content with right-side trending section */}
            <div className="flex flex-col md:flex-row gap-6 items-stretch">
              {/* Left content column */}
              <div className="flex-1">
                {/* Text content with backdrop */}
                <div className="relative p-5 sm:p-8 md:p-10 rounded-xl bg-blue-900/60 backdrop-blur-sm shadow-lg border border-blue-500/20 text-center md:text-left h-full flex flex-col justify-between space-y-6 sm:space-y-0">
                  <div>
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
                    
                    <div className="md:flex md:items-start md:gap-6">
                      <div className="md:flex-1">
                        <p className="text-lg sm:text-xl md:text-2xl text-stone-200 mb-6 sm:mb-10 max-w-3xl mx-auto md:mx-0 opacity-0 animate-fade-in-up animate-fill-forwards animate-delay-500 leading-relaxed">
                        True to the meaning of our name – Voltify – our mission is clear: to energize careers, build lasting relationships, connect you with opportunities, and help you grow, all supported by a positive mindset that leads to success.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:flex md:items-end md:justify-between">
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start opacity-0 animate-fade-in-up animate-fill-forwards animate-delay-700">
                      <Button 
                        className="bg-voltify-600 hover:bg-voltify-700 text-white px-6 sm:px-8 py-4 sm:py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-base sm:text-lg font-medium"
                        size="lg"
                        onClick={() => setIsJobSeekerModalOpen(true)}
                      >
                        For Job Seekers
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                      <Button 
                        className="bg-blue-900 hover:bg-blue-800 text-white px-6 sm:px-8 py-4 sm:py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-base sm:text-lg font-medium"
                        size="lg"
                        onClick={() => setIsEmployerModalOpen(true)}
                      >
                        For Employers
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                    
                    {/* Testimonial speech bubble - desktop only */}
                    <div className="hidden md:block md:w-64 lg:w-72 opacity-0 animate-fade-in-up animate-fill-forwards animate-delay-600">
                      <div className="relative bg-blue-300/30 rounded-lg p-4 border border-blue-200/50">
                        <div className="flex items-center justify-center mb-2 bg-voltify-800/40 -mx-2 px-2 py-1 rounded">
                          <h3 className="text-voltify-300 font-bold text-s">Client Testimonials</h3>
                        </div>
                        
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <div className={`w-8 h-8 rounded-full ${currentTestimonial.bgColor} flex items-center justify-center text-white font-bold text-xs mr-2`}>
                              {currentTestimonial.initials}
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-white">{currentTestimonial.author}</h4>
                              <p className="text-xs text-stone-300">{currentTestimonial.position}</p>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-sm text-stone-200 italic leading-relaxed">
                          "{currentTestimonial.quote}"
                        </p>
                        
                        {/* Navigation buttons */}
                        <div className="absolute bottom-4 right-4 flex space-x-1">
                          <button 
                            onClick={prevTestimonial}
                            className="w-6 h-6 rounded-full bg-blue-900/50 hover:bg-blue-800/70 flex items-center justify-center transition-colors"
                            aria-label="Previous testimonial"
                          >
                            <ChevronLeft className="h-4 w-4 text-voltify-200" />
                          </button>
                          <button 
                            onClick={nextTestimonial}
                            className="w-6 h-6 rounded-full bg-blue-900/50 hover:bg-blue-800/70 flex items-center justify-center transition-colors"
                            aria-label="Next testimonial"
                          >
                            <ChevronRight className="h-4 w-4 text-voltify-200" />
                          </button>
                        </div>
                        
                        {/* Dots indicator */}
                        <div className="flex justify-center mt-4 space-x-1.5">
                          {testimonials.map((_, index) => (
                            <button 
                              key={index}
                              onClick={() => setCurrentTestimonialIndex(index)}
                              className={`w-2 h-2 rounded-full transition-colors ${index === currentTestimonialIndex ? 'bg-voltify-100' : 'bg-blue-200/40'}`}
                              aria-label={`Go to testimonial ${index + 1}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Mobile testimonial - only visible on mobile */}
                    <div className="md:hidden mb-8 mt-6 opacity-0 animate-fade-in-up animate-fill-forwards animate-delay-600 bg-blue-300/30 rounded-lg p-5 border border-blue-200/50">
                      <div className="flex items-center justify-center mb-3 bg-voltify-800/40 -mx-3 px-2 py-1 rounded">
                        <h3 className="text-voltify-300 font-bold text-s">Client Testimonials</h3>
                      </div>
                      
                      <div className="flex">
                        <Quote className="h-6 w-6 text-voltify-300 flex-shrink-0 mr-2 mt-1" />
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <div className={`w-6 h-6 rounded-full ${currentTestimonial.bgColor} flex items-center justify-center text-white font-bold text-xs mr-2`}>
                                {currentTestimonial.initials}
                              </div>
                              <div>
                                <h4 className="text-xs font-semibold text-white">{currentTestimonial.author}</h4>
                                <p className="text-xs text-stone-300">{currentTestimonial.position}</p>
                              </div>
                            </div>
                            
                            {/* Mobile navigation buttons */}
                            <div className="flex space-x-1">
                              <button 
                                onClick={prevTestimonial}
                                className="w-6 h-6 rounded-full bg-blue-900/50 hover:bg-blue-800/70 flex items-center justify-center transition-colors"
                                aria-label="Previous testimonial"
                              >
                                <ChevronLeft className="h-3 w-3 text-voltify-200" />
                              </button>
                              <button 
                                onClick={nextTestimonial}
                                className="w-6 h-6 rounded-full bg-blue-900/50 hover:bg-blue-800/70 flex items-center justify-center transition-colors"
                                aria-label="Next testimonial"
                              >
                                <ChevronRight className="h-3 w-3 text-voltify-200" />
                              </button>
                            </div>
                          </div>
                          <p className="text-sm text-stone-200 italic leading-relaxed">
                            "{currentTestimonial.quote}"
                          </p>
                          
                          {/* Mobile dots indicator */}
                          <div className="flex justify-center mt-2 space-x-1.5">
                            {testimonials.map((_, index) => (
                              <button 
                                key={index}
                                onClick={() => setCurrentTestimonialIndex(index)}
                                className={`w-1.5 h-1.5 rounded-full transition-colors ${index === currentTestimonialIndex ? 'bg-voltify-400' : 'bg-blue-600/40'}`}
                                aria-label={`Go to testimonial ${index + 1}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Women-Owned Badge - Creative Version */}
              <div className="mt-10 sm:mt-8 text-center opacity-0 animate-fade-in-up animate-fill-forwards animate-delay-800">
                <div className="inline-block">
                  <div className="flex items-center space-x-2 bg-black/40 backdrop-blur-md px-5 py-3 rounded-full border border-pink-500/30 shadow-md hover:border-pink-500/50 transition-all duration-300">
                    <Award className="h-5 w-5 text-pink-300" />
                    <span className="text-sm font-semibold text-white tracking-wider">
                      PROUDLY WOMEN-OWNED & OPERATED
                    </span>
                    <Award className="h-5 w-5 text-pink-300" />
                  </div>
                </div>
              </div>

            
            {/* Stats Bar */}
            <div className="mt-10 md:mt-12 mb-6 md:mb-0 opacity-0 animate-fade-in-up animate-fill-forwards animate-delay-1000">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-4 py-6 md:py-6 px-4 md:px-4 rounded-xl bg-black/40 border-pink-500/30 backdrop-blur-md shadow-lg border border-gray-500/20">
                <div className="text-center p-3 md:p-4">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 md:mb-1">20+</div>
                  <div className="text-[10px] md:text-xs uppercase tracking-wider text-voltify-300">YEARS EXPERIENCE</div>
                </div>
                
                <div className="text-center p-3 md:p-4">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 md:mb-1">500+</div>
                  <div className="text-[10px] md:text-xs uppercase tracking-wider text-voltify-300">SUCCESSFUL PLACEMENTS</div>
                </div>
                
                <div className="text-center p-3 md:p-4">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 md:mb-1">95%</div>
                  <div className="text-[10px] md:text-xs uppercase tracking-wider text-voltify-300">CLIENT SATISFACTION</div>
                </div>
                
                <div className="text-center p-3 md:p-4">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 md:mb-1">5%</div>
                  <div className="text-[10px] md:text-xs uppercase tracking-wider text-voltify-300">TO CHARITY</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modals */}
      <JobSeekerModal 
        isOpen={isJobSeekerModalOpen} 
        onClose={() => setIsJobSeekerModalOpen(false)} 
      />
      <EmployerModal 
        isOpen={isEmployerModalOpen} 
        onClose={() => setIsEmployerModalOpen(false)} 
      />
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" className="text-white hover:text-voltify-300 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </a>
      </div>
    </section>
  );
}
