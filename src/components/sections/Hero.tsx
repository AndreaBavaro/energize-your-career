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
      className="relative min-h-screen flex flex-col justify-between pt-4 overflow-hidden"
    >
      {/* Voltify Donates 5% - Top Left */}
      <div className="absolute top-20 left-[10%] z-20 w-auto max-w-[350px] min-w-[280px] mt-14">
        <div 
          className="bg-transparent backdrop-blur-sm border-l-4 border-r-4 border-red-500 rounded-lg shadow-lg overflow-hidden p-3 flex flex-col justify-between hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] animate-fade-in relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/5 before:to-transparent"
        >
          <div>
            <div className="rounded-t-lg px-0 py-3">
              <h3 className="text-alternative-600 font-bold text-lg sm:text-xl md:text-2xl tracking-wide text-center flex items-center justify-center gap-2">
                Voltify Donates 5%
              </h3>
            </div>
            
            <div className="px-3 pt-2 pb-3 rounded-b-lg mb-0">
              <div className="flex justify-center mb-2">
                <div className="bg-red-500/10 rounded-full px-6 py-2 border border-red-500/30 transform hover:scale-105 transition-transform duration-300">
                  <span className="font-bold text-red-500 text-xl sm:text-2xl md:text-2xl lg:text-3xl">5%</span>
                </div>
              </div>
              
              <p className="text-lg text-alternative-600 leading-relaxed text-center">
                For each candidate hired, we contribute a portion of the fee to assisting those in need through charitable initiatives.
              </p>
              
              {/* Heart decoration */}
              <div className="flex justify-center mt-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Heart key={i} className="h-3 w-3 text-red-500 fill-red-500 mx-0.5" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover" 
          style={{
            filter: 'contrast(1.2) brightness(1.0) saturate(1.0)',
            transform: 'translateY(100px)'
          }}
          onError={(e) => console.error("Video loading error:", e)}
        >
          <source src={`${import.meta.env.BASE_URL}images/herovideo.mp4`} type="video/mp4" />
        </video>
      </div>
      
      {/* Flexbox layout for side-by-side containers */}
      <div className="container-custom relative z-20 flex flex-col justify-start py-0">
        <div className="max-w-7xl mx-auto w-full mt-2 sm:mt-2 md:mt-0 md:-ml-[5px]">
          <div className="pt-10 sm:pt-8 md:pt-14">
            {/* Three-column layout on desktop, stacked on mobile */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-center">
              
              {/* PRIMARY FOCUS: Heading and Mission Statement - Center column */}
              <div className="w-full md:w-[95%] order-1 md:px-0 md:pr-0">
                {/* Heading - PRIMARY FOCUS PART 1 */}
                <div className="text-center mb-4 animate-fade-in-up overflow-visible">
                  <h1 className="relative text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-[54px] font-bold tracking-tight mt-1 mb-1 sm:mb-2 whitespace-nowrap overflow-visible py-4"> 
                    <span className="text-red-500 drop-shadow-[0_0_15px_rgba(255,82,82,1)]">
                      Energize Your Career With Voltify
                      <Zap 
                        className="inline-block h-6 w-5 sm:h-8 sm:w-6 md:h-10 md:w-8 lg:h-12 lg:w-10 ml-1 text-yellow-400 drop-shadow-[0_0_10px_rgba(255,82,82,1)] fill-current animate-pulse"
                      />
                    </span>
                  </h1>
                </div>
                
                {/* Mission statement - PRIMARY FOCUS PART 2 */}
                <div className="relative z-10 mb-8">
                  <div className="bg-transparent backdrop-blur-sm border-l-4 border-r-4 border-red-500 pl-8 pr-10 py-1 rounded-l-lg rounded-r-lg shadow-lg mx-auto max-w-[1000px] relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/5 before:to-transparent">
                    <p className="text-xl sm:text-2xl md:text-[33px] font-bold text-red-700 leading-relaxed text-center relative z-10">
                      <span className="block mb-2">True to the meaning of our name – <span className="font-bold text-red-500">Voltify</span> – our mission is clear:</span>
                      <span className="block mb-2"><span className="font-bold text-red-500">To energize careers</span>, build lasting relationships, connect you with opportunities, and help you grow.</span>
                      <span className="block mb-1">All supported by a positive mindset that leads to success.</span>
                    </p>
                    
                    {/* CTA Button */}
                    <div className="flex justify-center relative z-10 mt-6 mb-2">
                      <Button 
                        className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 hover:from-red-500 hover:to-red-600 text-white px-6 py-3 rounded-full shadow-xl transition-all duration-300 text-lg sm:text-xl font-medium border border-red-400/30 relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:opacity-70 transform hover:scale-105"
                        onClick={() => window.open('/contact', '_self')}
                      >
                        Connect With Us
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Client Testimonials - Bottom Center */}
      <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center">
        <div 
          className="bg-transparent backdrop-blur-sm border-l-4 border-r-4 border-red-500 rounded-lg shadow-lg overflow-hidden p-0 flex flex-col justify-between cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] animate-fade-in relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/5 before:to-transparent w-full max-w-[750px]"
          onClick={goToTestimonialsPage}
        >
          {/* Title at the top */}
          <div className="px-4 pt-0 pb-0 border-b border-red-500/30 flex justify-center">
            <h3 className="text-alternative-600 font-bold text-xl sm:text-2xl tracking-wide flex mr-13 items-center gap-2 mb-0">
              Client Testimonials
            </h3>
          </div>
          
          {/* Content row */}
          <div className="flex items-center justify-between px-4 pb-0">
            {/* Left: Author info with stars below */}
            <div className="flex flex-col min-w-[180px] pr-4">
              <div className="flex items-center mb-1">
                <div className={`w-10 h-10 rounded-full ${currentTestimonial.bgColor} flex items-center justify-center text-white font-bold text-sm mr-2 shadow-sm`}>
                  {currentTestimonial.initials}
                </div>
                <div>
                  <h4 className="text-base font-semibold text-alternative-600">{currentTestimonial.author}</h4>
                  <p className="text-xs text-alternative-500">{currentTestimonial.position}</p>
                </div>
              </div>
              {/* 5-star review below author */}
              <div className="flex ml-2 mt-3 ml-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
            </div>
            
            {/* Center: Quote */}
            <div className="flex-1 border-l-2 border-red-500/30 pl-4 py-2">
              <blockquote className="text-sm text-alternative-600 italic">
                "{currentTestimonial.quote}"
              </blockquote>
            </div>
          </div>
          
          {/* Navigation dots and arrows */}
          <div className="flex justify-between items-center px-4 py-2 border-t border-red-500/30">
            <div className="flex space-x-1.5">
              {testimonials.map((_, index) => (
                <button 
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent navigation when clicking on dots
                    setCurrentTestimonialIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-colors ${index === currentTestimonialIndex ? 'bg-red-500' : 'bg-red-500/40'}`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <div className="flex space-x-1.5">
              <button 
                onClick={(e) => {
                  e.stopPropagation(); // Prevent navigation when clicking navigation buttons
                  prevTestimonial();
                }}
                className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center transition-colors hover:bg-red-500/30"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-4 w-4 text-red-500" />
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation(); // Prevent navigation when clicking navigation buttons
                  nextTestimonial();
                }}
                className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center transition-colors hover:bg-red-500/30"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-4 w-4 text-red-500" />
              </button>
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
      
      <div className="absolute bottom-4 md:bottom-10 left-1/2 transform -translate-x-1/2">
        <a href="#about" className="text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </a>
      </div>
    </section>
  );
}
