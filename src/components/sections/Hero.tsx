import { useState, useEffect, useCallback } from 'react';
import { ArrowRight, Award, Heart, Star, Briefcase, Tag, Zap, TrendingUp, ChevronDown, ChevronUp, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatedText } from '../ui/AnimatedText';
import { Button } from '@/components/ui/button';
import { JobSeekerModal } from '../ui/JobSeekerModal';
import { EmployerModal } from '../ui/EmployerModal';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  // State to track if the mobile dropdown is open
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // State to track the current testimonial index
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  // Effect to set video playback rate
  useEffect(() => {
    const video = document.querySelector('video');
    if (video) {
      video.playbackRate = 1.0;
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

  // For navigation to testimonials page
  const navigate = useNavigate();
  
  // Function to navigate to testimonials page
  const goToTestimonialsPage = () => {
    navigate('/testimonials');
  };

  // Function to navigate to charity page
  const goToCharityPage = () => {
    navigate('/charity');
  };

  // State for modals
  const [isJobSeekerModalOpen, setIsJobSeekerModalOpen] = useState(false);
  const [isEmployerModalOpen, setIsEmployerModalOpen] = useState(false);
  const [isCharityModalOpen, setIsCharityModalOpen] = useState(false);

  return (
    <section 
      id="hero" 
      className="relative min-h-[100svh] flex flex-col justify-between pt-4 overflow-hidden"
    >
      {/* Voltify Donates 5% - Top Left on desktop, Bottom Left on mobile */}
      <div className="absolute md:top-20 md:left-[10%] bottom-0 left-2 md:bottom-auto z-20 w-auto max-w-[300px] min-w-[200px] md:min-w-[240px] md:mt-14 hidden md:block">
        <div 
          className="bg-transparent backdrop-blur-sm border-l-4 border-r-4 border-red-500 rounded-lg shadow-lg overflow-hidden p-2 flex flex-col justify-between hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] animate-fade-in relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/5 before:to-transparent cursor-pointer"
          onClick={() => window.open('/charity', '_self')}
        >
          <div>
            <div className="rounded-t-lg px-0 py-2">
              <h3 className="text-alternative-600 font-bold text-base sm:text-xl md:text-2xl lg:text-3xl tracking-wide text-center flex items-center justify-center gap-2">
                Voltify Donates 5%
              </h3>
            </div>
            
            <div className="px-2 pt-1 pb-2 rounded-b-lg mb-0">
              <p className="text-sm sm:text-base md:text-lg text-alternative-600 leading-tight max-w-xl mx-auto font-light">
                For each candidate hired, we contribute <span className="font-bold text-red-500 text-base sm:text-lg md:text-xl">5%</span> of the fee to assisting those in need through charitable initiatives.
              </p>
              <div className="flex justify-center">
                <Button 
                  className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 hover:from-red-500 hover:to-red-600 text-white px-3 py-1 rounded-full shadow-lg transition-all duration-300 text-xs sm:text-sm md:text-base font-medium border border-red-400/30 mt-2 relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:opacity-70"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent double navigation
                    window.open('/charity', '_self');
                  }}
                >
                  Learn About Our Impact
                  <Heart className="ml-1 h-3 w-3 text-red-200 fill-red-200" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile version of Voltify Donates - Bottom Left */}
      <div className="absolute bottom-[70px] left-4 z-30 w-[45%] max-w-[180px] min-w-[150px] md:hidden">
        <div 
          className="bg-transparent backdrop-blur-sm border-l-4 border-r-4 border-red-500 rounded-lg shadow-lg overflow-hidden p-2 flex flex-col justify-between hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] animate-fade-in relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/5 before:to-transparent cursor-pointer"
          onClick={() => window.open('/charity', '_self')}
        >
          <div>
            <div className="rounded-t-lg px-0 py-1">
              <h3 className="text-alternative-600 font-bold text-sm tracking-wide text-center flex items-center justify-center gap-1">
                Voltify Donates 5%
              </h3>
            </div>
            
            <div className="px-2 pt-1 pb-1 rounded-b-lg mb-0">
              <p className="text-xs text-alternative-600 leading-tight max-w-xl mx-auto font-light">
                For each hire, we donate <span className="font-bold text-red-500 text-xs">5%</span> to charity.
              </p>
              <div className="flex justify-center">
                <Button 
                  className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 hover:from-red-500 hover:to-red-600 text-white px-2 py-1 rounded-full shadow-lg transition-all duration-300 text-[10px] font-medium border border-red-400/30 mt-1 relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:opacity-70"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent double navigation
                    window.open('/charity', '_self');
                  }}
                >
                  Learn More
                  <Heart className="ml-0.5 h-2 w-2 text-red-200 fill-red-200" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile CTA Button positioned in bottom left */}
      <div className="absolute bottom-4 left-1 flex justify-center z-30 md:hidden">
        <Button 
          className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 hover:from-red-500 hover:to-red-600 text-white px-4 sm:px-6 py-3 rounded-full shadow-2xl transition-all duration-300 text-base sm:text-xl font-bold border border-red-400/30 relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:opacity-70 transform hover:scale-105"
          onClick={() => window.open('/contact', '_self')}
        >
          Connect With Us
          <ArrowRight className="ml-1 h-5 w-5 sm:h-6 sm:w-6" />
        </Button>
      </div>

      {/* Client Testimonials - Top Right on desktop, Bottom Right on mobile */}
      <div className="absolute md:top-20 md:right-[10%] bottom-auto right-auto z-20 w-auto max-w-[300px] min-w-[240px] md:mt-14 hidden md:block">
        <div 
          className="bg-transparent backdrop-blur-sm border-l-4 border-r-4 border-red-500 rounded-lg shadow-lg overflow-hidden p-2 flex flex-col justify-between cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] animate-fade-in relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/5 before:to-transparent"
          onClick={goToTestimonialsPage}
        >
          <div>
            <div className="rounded-t-lg px-0 py-2">
              <h3 className="text-alternative-600 font-bold text-base sm:text-lg md:text-xl lg:text-2xl tracking-wide text-center flex items-center justify-center gap-2">
                Client Testimonials
              </h3>
            </div>
            
            <div className="px-2 pt-1 pb-2 rounded-b-lg mb-0">
              <div className="flex items-center mb-1">
                <div className={`w-8 h-8 rounded-full ${currentTestimonial.bgColor} flex items-center justify-center text-white font-bold text-medium mr-2 shadow-sm`}>
                  {currentTestimonial.initials}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-alternative-600">{currentTestimonial.author}</h4>
                  <p className="text-xs text-alternative-600">{currentTestimonial.position}</p>
                </div>
              </div>

              <blockquote className="text-sm text-alternative-600 mb-2 leading-relaxed italic min-h-[70px] flex items-center mt-1">
                <p>"{currentTestimonial.quote}"</p>
              </blockquote>
              
              {/* 5-star review */}
              <div className="flex justify-center mb-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center px-2">
            <div className="flex space-x-1">
              {testimonials.map((_, index) => (
                <button 
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent navigation when clicking on dots
                    setCurrentTestimonialIndex(index);
                  }}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${index === currentTestimonialIndex ? 'bg-red-500' : 'bg-red-500/40'}`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <div className="flex space-x-1">
              <button 
                onClick={(e) => {
                  e.stopPropagation(); // Prevent navigation when clicking navigation buttons
                  prevTestimonial();
                }}
                className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-3 w-3 text-red-500" />
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation(); // Prevent navigation when clicking navigation buttons
                  nextTestimonial();
                }}
                className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-3 w-3 text-red-500" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile version of Client Testimonials - Bottom Right */}
      <div className="absolute bottom-4 right-4 z-30 w-[45%] max-w-[180px] min-w-[150px] md:hidden">
        <div 
          className="bg-transparent backdrop-blur-sm border-l-4 border-r-4 border-red-500 rounded-lg shadow-lg overflow-hidden p-2 flex flex-col justify-between cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] animate-fade-in relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/5 before:to-transparent"
          onClick={goToTestimonialsPage}
        >
          <div>
            <div className="rounded-t-lg px-0 py-1">
              <h3 className="text-alternative-600 font-bold text-sm tracking-wide text-center flex items-center justify-center gap-1">
                Client Testimonials
              </h3>
            </div>
            
            <div className="px-2 pt-1 pb-1 rounded-b-lg mb-0">
              <div className="flex items-center mb-1">
                <div className={`w-5 h-5 rounded-full ${currentTestimonial.bgColor} flex items-center justify-center text-white font-bold text-[10px] mr-1 shadow-sm`}>
                  {currentTestimonial.initials}
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-alternative-600">{currentTestimonial.author}</h4>
                  <p className="text-[10px] text-alternative-600">{currentTestimonial.position}</p>
                </div>
              </div>

              <blockquote className="text-xs text-alternative-600 mb-1 leading-tight italic min-h-[40px] flex items-center">
                <p>"{currentTestimonial.quote.length > 60 ? currentTestimonial.quote.substring(0, 60) + '...' : currentTestimonial.quote}"</p>
              </blockquote>
              
              {/* 5-star review */}
              <div className="flex justify-center mb-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-2 w-2 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center px-1">
            <div className="flex space-x-0.5">
              {testimonials.map((_, index) => (
                <button 
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent navigation when clicking on dots
                    setCurrentTestimonialIndex(index);
                  }}
                  className={`w-1 h-1 rounded-full transition-colors ${index === currentTestimonialIndex ? 'bg-red-500' : 'bg-red-500/40'}`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <div className="flex space-x-0.5">
              <button 
                onClick={(e) => {
                  e.stopPropagation(); // Prevent navigation when clicking navigation buttons
                  prevTestimonial();
                }}
                className="w-4 h-4 rounded-full bg-red-500/20 flex items-center justify-center transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-2 w-2 text-red-500" />
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation(); // Prevent navigation when clicking navigation buttons
                  nextTestimonial();
                }}
                className="w-4 h-4 rounded-full bg-red-500/20 flex items-center justify-center transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-2 w-2 text-red-500" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="hidden md:block">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover" 
            style={{
              filter: 'contrast(1.2) brightness(1.0) saturate(1.0)',
              transform: 'translateY(100px) scale(1.0)'
            }}
            onError={(e) => console.error("Video loading error:", e)}
          >
            <source src={`${import.meta.env.BASE_URL}images/herovideo.mp4`} type="video/mp4" />
          </video>
        </div>
        <div className="md:hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover" 
            style={{
              filter: 'contrast(1.2) brightness(1.0) saturate(1.0)',
              transform: 'translateY(0) scale(1.0)'
            }}
            onError={(e) => console.error("Video loading error:", e)}
          >
            <source src={`${import.meta.env.BASE_URL}images/herovideo.mp4`} type="video/mp4" />
          </video>
        </div>
      </div>
      
      {/* Flexbox layout for side-by-side containers */}
      <div className="container-custom relative z-20 flex flex-col justify-start py-0">
        <div className="max-w-7xl mx-auto w-full mt-2 sm:mt-2 md:mt-0 md:-ml-[5px]">
          <div className="pt-6 sm:pt-8 md:pt-14">
            {/* Three-column layout on desktop, stacked on mobile */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-center">
              
              {/* PRIMARY FOCUS: Heading and Mission Statement - Center column */}
              <div className="w-full md:w-[95%] order-1 md:px-0 md:pr-0">
                {/* Heading - PRIMARY FOCUS PART 1 */}
                <div className="text-center mb-2 sm:mb-4 animate-fade-in-up overflow-visible">
                  <h1 className="relative text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[59px] font-bold tracking-tight mt-1 mb-1 sm:mb-2 overflow-visible py-2 sm:py-4 px-2 sm:px-0 leading-tight sm:leading-normal sm:whitespace-nowrap"> 
                    <span className="text-red-500 drop-shadow-[0_2px_4px_rgba(239,68,68,0.8)] md:drop-shadow-[0_0_15px_rgba(255,82,82,1)]">
                      Energize Your Career With Voltify
                      <Zap 
                        className="inline-block h-5 w-4 xs:h-6 xs:w-5 sm:h-8 sm:w-6 md:h-10 md:w-8 lg:h-12 lg:w-10 ml-1 text-yellow-400 drop-shadow-[0_2px_4px_rgba(250,204,21,0.8)] md:drop-shadow-[0_0_10px_rgba(255,82,82,1)] fill-current animate-pulse ml-2"
                      />
                    </span>
                  </h1>
                </div>
                
                {/* Mission statement - PRIMARY FOCUS PART 2 */}
                <div className="relative z-10 mb-4 sm:mb-8 px-2 sm:px-4 md:px-0">
                  <div className="bg-transparent backdrop-blur-sm border-l-4 border-r-4 border-red-500 pl-3 pr-3 sm:pl-8 sm:pr-10 py-1 rounded-l-lg rounded-r-lg shadow-lg mx-auto max-w-[1000px] relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/5 before:to-transparent">
                    <p className="text-lg xs:text-xl sm:text-2xl md:text-[33px] lg:text-4xl font-bold text-red-700 leading-tight sm:leading-relaxed text-center relative z-10 py-2">
                      <span className="block mb-1 sm:mb-2 mt-1">True to the meaning of our name – <span className="font-bold text-red-500">Voltify</span> – our mission is clear:</span>
                      <span className="block mb-1 sm:mb-2"><span className="font-bold text-red-500 sm:ml-8">To energize careers</span>, build lasting relationships, connect you with opportunities, and help you grow.</span>
                      <span className="block mb-1 sm:mb-2">All supported by a positive mindset that leads to success.</span>
                    </p>
                  </div>
                </div>

                {/* Removed CTA Button that was under mission statement */}
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
      
      {/* Scroll down indicator - desktop only */}
      <div className="absolute bottom-4 md:bottom-10 left-1/2 transform -translate-x-1/2 z-20 hidden md:block">
        <a href="#about" className="text-white bg-red-500/30 hover:bg-red-500/50 rounded-full p-2 flex items-center justify-center transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down animate-bounce">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </a>
      </div>
      
      {/* CTA Button at bottom - desktop only */}
      <div className="absolute bottom-10 left-0 right-0 flex-col items-center z-20 hidden md:flex">
        {/* CTA Button */}
        <div className="flex justify-center relative z-10 mt-3 mb-0">
          <Button 
            className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 hover:from-red-500 hover:to-red-600 text-white px-10 py-5 rounded-full shadow-2xl transition-all duration-300 text-xl sm:text-2xl md:text-3xl font-bold border border-red-400/30 relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:opacity-70 transform hover:scale-105"
            onClick={() => window.open('/contact', '_self')}
          >
            Connect With Us
            <ArrowRight className="ml-0 h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10" />
          </Button>
        </div>
      </div>
    </section>
  );
}
