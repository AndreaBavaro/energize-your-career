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

  // Effect to set video playback rate
  useEffect(() => {
    const video = document.querySelector('video');
    if (video) {
      video.playbackRate = 0.75;
    }
  }, []);

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
    <section id="hero" className="relative min-h-screen flex flex-col justify-between items-start md:items-center overflow-hidden -mt-[1.5rem] sm:-mt-4 md:-mt-8 pt-6 sm:pt-12 md:pt-0 pb-4 md:pb-20">
      {/* Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover sm:scale-100 sm:translate-y-0 sm:translate-x-0 scale-150 -translate-y-16 -translate-x-20" 
          style={{
            filter: 'contrast(1.2) brightness(1.0) saturate(1.0)',
          }}
        >
          <source src="/images/istockphoto-1372856395-640_adpp_is.mp4" type="video/mp4" />
        </video>
      </div>
      
      {/* Content */}
      <div className="container-custom relative z-10 flex flex-col justify-between h-full py-4">
        <div className="max-w-5xl mx-auto mt-4 sm:mt-8 md:mt-8">
          <div className="pt-7 sm:pt-12 md:pt-20">
            {/* Main content with right-side trending section */}
            <div className="flex flex-col md:flex-row gap-6 items-stretch">
              {/* Left content column */}
              <div className="flex-1">
                {/* Text content with backdrop */}
                <div className="relative p-4 sm:p-5 md:p-6 rounded-xl bg-voltify-950/60 backdrop-blur-sm shadow-lg border border-voltify-200/20 text-center md:text-left h-auto flex flex-col justify-between space-y-3 sm:space-y-0">
                  
                  <div className="md:grid md:grid-cols-3 md:gap-8 lg:gap-12">
                    <div className="col-span-2">
                      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-2 sm:mb-3 opacity-0 animate-fade-in-up animate-fill-forwards text-white">
                        <AnimatedText 
                          text="Energize Your Career" 
                          className="text-white block mb-3"
                          animation="fade-in-up"
                          delay={200}
                        />
                        <div className="flex items-center justify-center md:justify-start mt-1 sm:mt-1">
                          <span className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">With</span>
                          <div className="flex items-center ml-2 sm:ml-3">
                            <span className="text-voltify-400/95 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">Voltify</span>
                            <Zap className="h-8 w-6 sm:h-10 sm:w-8 md:h-12 md:w-10 text-voltify-400/95 ml-1 sm:ml-2" />
                          </div>
                        </div>
                      </h1>
                      
                      <div className="md:pr-6">
                        <p className="text-lg sm:text-xl md:text-xl text-white mb-3 sm:mb-4 mx-auto md:mx-0 opacity-0 animate-fade-in-up animate-fill-forwards animate-delay-500 leading-relaxed">
                          True to the meaning of our name – Voltify – our mission is clear: to energize careers, build lasting relationships, connect you with opportunities, and help you grow, all supported by a positive mindset that leads to success.
                        </p>
                      </div>
                      
                      <div className="md:flex md:items-end md:justify-start">
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center md:justify-start opacity-0 animate-fade-in-up animate-fill-forwards animate-delay-700">
                          <Button 
                            className="bg-voltify-400 hover:bg-voltify-500 text-white px-5 sm:px-6 py-3 sm:py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-base sm:text-lg font-medium"
                            size="lg"
                            onClick={() => setIsJobSeekerModalOpen(true)}
                          >
                            For Job Seekers
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Button>
                          
                          <Button 
                            className="bg-voltify-900 hover:bg-voltify-950 text-white px-5 sm:px-6 py-3 sm:py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-base sm:text-lg font-medium"
                            size="lg"
                            onClick={() => setIsEmployerModalOpen(true)}
                          >
                            For Employers
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Testimonial card - positioned on the right side */}
                    <div className="hidden md:block col-span-1 opacity-0 animate-fade-in-up animate-fill-forwards animate-delay-600">
                      <div className="bg-voltify-950/80 backdrop-blur-md rounded-lg p-4 border border-voltify-400/20 shadow-lg hover:shadow-voltify-400/10 transition-all duration-300 h-full flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-center mb-3 bg-voltify-400/20 px-3 py-1.5 rounded">
                            <h3 className="text-white font-bold text-sm tracking-wide">Client Testimonials</h3>
                          </div>
                          
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <div className={`w-9 h-9 rounded-full ${currentTestimonial.bgColor} flex items-center justify-center text-white font-bold text-xs mr-2 shadow-sm`}>
                                {currentTestimonial.initials}
                              </div>
                              <div>
                                <h4 className="text-sm font-semibold text-white">{currentTestimonial.author}</h4>
                                <p className="text-xs text-stone-200">{currentTestimonial.position}</p>
                              </div>
                            </div>
                          </div>

                          <blockquote className="text-sm text-stone-100 mb-3 leading-relaxed italic">
                            "{currentTestimonial.quote}"
                          </blockquote>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex space-x-1.5">
                            {testimonials.map((_, index) => (
                              <button 
                                key={index}
                                onClick={() => setCurrentTestimonialIndex(index)}
                                className={`w-2 h-2 rounded-full transition-colors shadow-sm ${index === currentTestimonialIndex ? 'bg-voltify-400' : 'bg-white/40'}`}
                                aria-label={`Go to testimonial ${index + 1}`}
                              />
                            ))}
                          </div>
                          
                          <div className="flex space-x-1.5">
                            <button 
                              onClick={prevTestimonial}
                              className="w-7 h-7 rounded-full bg-voltify-400/30 hover:bg-voltify-400/50 flex items-center justify-center transition-colors shadow-sm"
                              aria-label="Previous testimonial"
                            >
                              <ChevronLeft className="h-4 w-4 text-white" />
                            </button>
                            <button 
                              onClick={nextTestimonial}
                              className="w-7 h-7 rounded-full bg-voltify-400/30 hover:bg-voltify-400/50 flex items-center justify-center transition-colors shadow-sm"
                              aria-label="Next testimonial"
                            >
                              <ChevronRight className="h-4 w-4 text-white" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Spacer div to create distance */}
            <div className="h-0 md:h-80"></div>
          </div>
        </div>
      </div>
      
      {/* Bottom content with badge and stats */}
      <div className="container-custom relative z-10 mt-auto">
        {/* Women-Owned Badge - Creative Version */}
        <div className="text-center opacity-0 animate-fade-in-up animate-fill-forwards animate-delay-800 mb-3 md:mb-6">
          <div className="inline-block">
            <div className="flex items-center space-x-2 bg-voltify-900/40 backdrop-blur-md px-5 py-3 rounded-full border border-voltify-500/30 shadow-md hover:border-voltify-500/50 transition-all duration-300">
              <Award className="h-5 w-5 text-voltify-300" />
              <span className="text-sm font-semibold text-white tracking-wider">
                PROUDLY WOMEN-OWNED & OPERATED
              </span>
                <Award className="h-5 w-5 text-voltify-300" />
              </div>
            </div>
          </div>

        
        {/* Stats Bar */}
        <div className="mb-2 md:mb-0 opacity-0 animate-fade-in-up animate-fill-forwards animate-delay-1000">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 py-3 md:py-6 px-2 md:px-4 rounded-xl bg-voltify-950/40 border-voltify-500/30 backdrop-blur-md shadow-lg border border-gray-500/20">
            <div className="text-center p-2 md:p-4">
              <div className="text-xl md:text-3xl lg:text-4xl font-bold text-white mb-1 md:mb-2">20+</div>
              <div className="text-[8px] md:text-xs uppercase tracking-wider text-voltify-300">YEARS EXPERIENCE</div>
            </div>
            
            <div className="text-center p-2 md:p-4">
              <div className="text-xl md:text-3xl lg:text-4xl font-bold text-white mb-1 md:mb-2">500+</div>
              <div className="text-[8px] md:text-xs uppercase tracking-wider text-voltify-300">SUCCESSFUL PLACEMENTS</div>
            </div>
            
            <div className="text-center p-2 md:p-4">
              <div className="text-xl md:text-3xl lg:text-4xl font-bold text-white mb-1 md:mb-2">95%</div>
              <div className="text-[8px] md:text-xs uppercase tracking-wider text-voltify-300">CLIENT SATISFACTION</div>
            </div>
            
            <div className="text-center p-2 md:p-4">
              <div className="text-xl md:text-3xl lg:text-4xl font-bold text-white mb-1 md:mb-2">5%</div>
              <div className="text-[8px] md:text-xs uppercase tracking-wider text-voltify-300">TO CHARITY</div>
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
