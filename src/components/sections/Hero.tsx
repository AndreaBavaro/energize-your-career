import { useState, useEffect, useCallback } from 'react';
import { ArrowRight, Award, Heart, Star, Briefcase, Tag, Zap, TrendingUp, ChevronDown, ChevronUp, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { JobSeekerModal } from '../ui/JobSeekerModal';
import { EmployerModal } from '../ui/EmployerModal';
import { useNavigate } from 'react-router-dom';
import { LogoDisplay } from '../ui/LogoDisplay';
import '/src/styles/hero.css';

export default function Hero() {
  const navigate = useNavigate();

  // State to track if the mobile dropdown is open
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('jobSeekers');
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  // State for modals
  const [showJobSeekerModal, setShowJobSeekerModal] = useState(false);
  const [showEmployerModal, setShowEmployerModal] = useState(false);
  const [isJobSeekerModalOpen, setIsJobSeekerModalOpen] = useState(false);
  const [isEmployerModalOpen, setIsEmployerModalOpen] = useState(false);
  const [isCharityModalOpen, setIsCharityModalOpen] = useState(false);

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

  // Function to navigate to testimonials page
  const goToTestimonialsPage = () => {
    navigate('/testimonials');
  };

  // Function to navigate to charity page
  const goToCharityPage = () => {
    navigate('/charity');
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-[100svh] flex flex-col justify-between pt-3 sm:pt-4 md:pt-6 overflow-hidden position-relative"
    >
      {/* Image Background */}
<div className="absolute inset-0 z-0 overflow-hidden">
  <div className="hidden md:block">
    <div
      className="absolute inset-0 w-full h-full"
      style={{
        backgroundImage: `url("${import.meta.env.BASE_URL}images/city.jpg")`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        filter: 'contrast(1.2) brightness(1.0) saturate(1.0)',        }}
    ></div>
  </div>
  
  <div className="md:hidden">
    <div
      className="absolute inset-0 w-full h-full"
      style={{
        backgroundImage: `url("${import.meta.env.BASE_URL}images/city.jpg")`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        filter: 'contrast(1.2) brightness(1.0) saturate(1.0)',      }}
    ></div>
  </div>
</div>


      {/* Voltify Donates 5% - Top Right on desktop, Bottom Left on mobile */}
      <div 
        className="absolute md:top-20 lg:top-[12%] xl:top-[21%] xl:right-[7%] lg:right-[5%] md:right-[3%] hidden md:block"
        style={{ 
          zIndex: 25,
          width: 'clamp(200px, 35vw, 400px)',
          height: 'clamp(100px, 25vh, 500px)',
          transform: 'translateX(0)'
        }}
      >
        <div 
          className="bg-white/95 backdrop-blur-sm border-l-4 border-r-4 border-blue-500 rounded-lg shadow-lg overflow-hidden p-3 flex flex-col justify-between hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/10 before:to-transparent cursor-pointer h-full"
          onClick={(e) => {
            e.stopPropagation(); // Prevent double navigation
            goToCharityPage(); // Use the navigate function instead of window.open
          }}
        >
          <div className="flex flex-col h-full justify-between">
            <div className="rounded-t-lg px-0 py-2 border-b border-blue-200">
              <h3 className="text-black font-bold text-base sm:text-md md:text-md lg:text-xl xl:text-[22px] tracking-wide text-center flex items-center justify-center gap-2">
                Voltify Donates 5%
              </h3>
            </div>
            
            <div className="px-3 pt-3 pb-2 rounded-b-lg mb-0 flex-grow">
              <p className="text-sm sm:text-base md:text-md lg:text-lg xl:text-[16px] text-black leading-tight max-w-xl mx-auto font-light mb-3">
                For each candidate hired, we contribute <span className="font-bold text-blue-500 text-base sm:text-lg md:text-lg">5%</span> of the fee to assisting those in need through charitable initiatives.
              </p>
              <div className="flex justify-center">
              <Button 
              style={{
                fontSize: 'clamp(0.6rem, 0.9vw, 1rem)', 
                padding: '0.3rem 0.8rem', 
                marginBottom: '0.5rem'
              }}
              className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 hover:from-blue-500 hover:to-blue-600 text-white rounded-full shadow-lg transition-all duration-300 text-xs font-medium border border-blue-400/30 relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:opacity-70 scale-95 hover:scale-100"
              onClick={(e) => {
                e.stopPropagation(); // Prevent double navigation
                goToCharityPage(); // Use the navigate function instead of window.open
              }}
            >
              Learn About Our Impact
            </Button>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile version of Voltify Donates 5% - Bottom Left */}
      <div 
        className="absolute bottom-20 left-4 md:hidden"
        style={{ 
          zIndex: 25,
          width: '190px',
        }}
      >
        <div 
          className="bg-white/90 backdrop-blur-sm border-l-4 border-r-4 border-blue-500 rounded-lg shadow-lg overflow-hidden p-2 flex flex-col justify-between hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/5 before:to-transparent cursor-pointer"
          onClick={(e) => {
            e.stopPropagation(); // Prevent double navigation
            goToCharityPage(); // Use the navigate function instead of window.open
          }}
        >
          <div>
            <div className="rounded-t-lg px-0 py-1 border-b border-blue-200">
              <h3 className="text-black font-bold text-xs tracking-wide text-center flex items-center justify-center gap-1">
                Voltify Donates 5%
              </h3>
            </div>
            
            <div className="px-2 pt-1 pb-0 rounded-b-lg mb-0">
              <p className="text-xs text-black leading-tight max-w-xl mx-auto font-light">
              For each candidate hired, we contribute <span className="font-bold text-blue-500">5%</span> to assisting those in need through charitable initiatives.
              </p>
              <div className="flex justify-center">
              <Button 
              className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 hover:from-blue-500 hover:to-blue-600 text-white rounded-full shadow-lg transition-all duration-300 font-medium border border-blue-400/30 mt-1 relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:opacity-70 text-[10px] py-0.5 px-2 h-5 min-h-0 scale-90"
              onClick={(e) => {
                e.stopPropagation(); // Prevent double navigation
                goToCharityPage(); // Use the navigate function instead of window.open
              }}
            >
              Learn More
            </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile CTA Button positioned in bottom left corner */}
      <div 
        className="absolute bottom-4 left-4 md:hidden"
      >
        <Button 
          className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 hover:from-blue-500 hover:to-blue-600 text-white px-3 py-1.5 rounded-full shadow-lg transition-all duration-300 text-xs font-medium border border-blue-400/30 relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:opacity-70 scale-90"
          onClick={() => navigate('/contact')}
        >
          Connect With Us
          <ArrowRight className="ml-1.5 h-3 w-3" />
        </Button>
      </div>

      <div 
        className="absolute md:bottom-[13%] lg:bottom-[13%] xl:bottom-[13%] xl:right-[7%] lg:right-[5%] md:right-[3%] hidden md:block mb-2"
        style={{ 
          zIndex: 25,
          width: 'clamp(200px, 40vw, 400px)',
          height: 'clamp(120px, 30vh, 500px)',
          transform: 'translateX(0)'
        }}
      >
        <div 
          className="bg-white/95 backdrop-blur-sm border-l-4 border-r-4 border-blue-500 rounded-lg shadow-lg overflow-hidden p-3 pb-5 flex flex-col justify-between cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/10 before:to-transparent h-full"
          onClick={goToTestimonialsPage}
        >
          <div className="flex flex-col h-full justify-between">
            <div className="rounded-t-lg px-0 border-b border-blue-200">
              <h3 className="text-black font-bold text-base sm:text-md md:text-md lg:text-xl xl:text-[22px] tracking-wide text-center flex items-center justify-center gap-2">
                Client Testimonials
              </h3>
            </div>
            
            <div className="px-3 pt-3 pb-2 rounded-b-lg mb-0 flex-grow">
              <div className="flex items-center mb-2">
                <div className={`w-9 h-9 rounded-full ${currentTestimonial.bgColor} flex items-center justify-center text-white font-bold text-medium mr-2 shadow-sm`}>
                  {currentTestimonial.initials}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-black">{currentTestimonial.author}</h4>
                  <p className="text-xs text-stone-600">{currentTestimonial.position}</p>
                </div>
              </div>

              <blockquote className="text-sm text-black mb-3 leading-relaxed italic min-h-[80px] flex items-center mt-1 pb-0">
                <p>"{currentTestimonial.quote}"</p>
              </blockquote>
              
              {/* 5-star review */}
              <div className="flex justify-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center px-2 border-t border-blue-200 pt-1 mb-6">
            <div className="flex space-x-1">
              {testimonials.map((_, index) => (
                <button 
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent navigation when clicking on dots
                    setCurrentTestimonialIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-colors ${index === currentTestimonialIndex ? 'bg-blue-500' : 'bg-blue-300'}`}
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
                className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center transition-colors hover:bg-blue-200"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-3 w-3 text-blue-500" />
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation(); // Prevent navigation when clicking navigation buttons
                  nextTestimonial();
                }}
                className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center transition-colors hover:bg-blue-200"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-3 w-3 text-blue-500" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile version of Client Testimonials - Bottom Right */}
      <div 
        className="absolute bottom-4 right-4 md:hidden"
        style={{ 
          zIndex: 25,
          width: '150px',
        }}
      >
        <div 
          className="bg-white/90 backdrop-blur-sm border-l-4 border-r-4 border-blue-500 rounded-lg shadow-lg overflow-hidden p-2 flex flex-col justify-between cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/5 before:to-transparent"
          onClick={goToTestimonialsPage}
        >
          <div>
            <div className="rounded-t-lg px-0 py-1 border-b border-blue-200">
              <h3 className="text-black font-bold text-xs tracking-wide text-center flex items-center justify-center gap-1">
                Testimonials
              </h3>
            </div>
            
            <div className="px-1 pt-1 pb-2 rounded-b-lg mb-0">
              <div className="flex items-center mb-1">
                <div className={`w-6 h-6 rounded-full ${currentTestimonial.bgColor} flex items-center justify-center text-white font-bold text-[10px] mr-1 shadow-sm`}>
                  {currentTestimonial.initials}
                </div>
                <div>
                  <h4 className="text-[10px] font-semibold text-black">{currentTestimonial.author}</h4>
                  <p className="text-[8px] text-stone-600">{currentTestimonial.position}</p>
                </div>
              </div>

              <blockquote className="text-[10px] text-black mb-1 leading-tight italic min-h-[40px] flex items-center">
                <p>"{currentTestimonial.quote.substring(0, 60)}..."</p>
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
          
          <div className="flex justify-between items-center border-t border-blue-200 pt-1 px-1">
            <div className="flex space-x-0.5">
              {testimonials.map((_, index) => (
                <button 
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent navigation when clicking on dots
                    setCurrentTestimonialIndex(index);
                  }}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${index === currentTestimonialIndex ? 'bg-blue-500' : 'bg-blue-300'}`}
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
                className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center transition-colors hover:bg-blue-200"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-3 w-3 text-blue-500" />
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation(); // Prevent navigation when clicking navigation buttons
                  nextTestimonial();
                }}
                className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center transition-colors hover:bg-blue-200"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-3 w-3 text-blue-500" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Flexbox layout for side-by-side containers */}
<div className="container-custom relative z-20 flex flex-col justify-start py-0 pl-4 md:pl-8 ml-[17%]">
  <div className="max-w-7xl w-full mt-2 sm:mt-1 md:mt-0 ml-0 md:ml-4 lg:ml-8">
    <div className="pt-2 sm:pt-6 md:pt-[10%]">
      {/* Three-column layout on desktop, stacked on mobile */}
      <div className="flex flex-col md:flex-row md:items-start">
        
        {/* PRIMARY FOCUS: Heading and Mission Statement - Left-aligned column */}
        <div className="w-full order-1 md:px-0 md:pr-0">
          {/* Heading - PRIMARY FOCUS PART 1 */}
          <div className="text-left overflow-visible ml-2 md:ml-4 lg:ml-[36%]">
            <h1 className="relative text-[24px] xs:text-xl sm:text-2xl md:text-3xl lg:text-[40px] xl:text-[44px] font-bold tracking-tight mb-0 overflow-visible py-2 px-0 leading-tight whitespace-normal mt-2"> 
              <span className="text-blue-500 relative">
                {/* Gradient text with animation */}
                <span className="bg-[#000000] bg-clip-text text-transparent animate-gradient-x font-extrabold">
                  Voltify
                </span>
                
                <Zap 
                  shapeRendering="crispEdges"
                  className=" bg-transparent inline-block h-4 w-3 xs:h-5 xs:w-4 sm:h-7 sm:w-5 md:h-8 md:w-6 lg:h-10 lg:w-8 xl:h-12 xl:w-10 ml-2 text-[#fde90c] fill-current hover:scale-110 transition-transform duration-300"
                  style={{
                    stroke: '#fde90c', // a brighter yellow for the edges
                    strokeWidth: 1,
                    strokeLinejoin: 'miter',
                    strokeLinecap: 'butt'
                  }}
                />
              </span>
            </h1>
          </div>
          
         {/* Mission statement - PRIMARY FOCUS PART 2 */}
<div className="relative z-10 mb-4 px-0 ml-0 md:ml-4">
  <div 
      className="bg-white/95 backdrop-blur-sm border-l-2 border-r-2 border-blue-500 pl-4 pr-2 py-2 rounded-lg mr-auto relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/5 before:to-transparent h-auto"
      style={{ width: 'clamp(100px, 100%, 750px)' }}
  >
    <div className="flex flex-col items-center justify-center">
      <p className="relative text-[17px] xs:text-[16px] sm:text-lg md:text-[19px] lg:text-[22px] xl:text-[25px] font-bold text-black leading-tight text-left relative z-10 py-4">
        <span className="block mb-1">
          We energize careers, build lasting relationships,
        </span>
        <span className="block">
          connect you with opportunities, and help you grow.
        </span>
      </p>
      
      <Button 
        className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 hover:from-blue-500 hover:to-blue-600 text-white px-4 py-2 rounded-full shadow-lg transition-all duration-300 text-md font-medium border border-blue-400/30 mb-2 relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:opacity-70 transform hover:scale-105 self-center"
        onClick={() => navigate('/contact')}
      >
        Discover Opportunities
        <ArrowRight className="h-5 w-5" />
      </Button>
    </div>
  </div>
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
      
      {/* CTA Button at bottom - desktop only */}
      <div 
        className="absolute bottom-16 left-0 right-0 flex-col items-center z-20 hidden"
      >
        {/* CTA Button */}
        <div className="flex justify-center relative z-10 mt-3 mb-0">
          <div className="flex flex-col items-center justify-center">
            
            <Button 
              className="bg-stone-700 hover:from-red-500 hover:to-red-600 text-white px-4 py-3 rounded-full shadow-2xl transition-all duration-300 text-lg font-bold border border-red-400/30 relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:opacity-70 transform hover:scale-105"
              onClick={() => navigate('/contact')}
            >
              Connect With Us
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
