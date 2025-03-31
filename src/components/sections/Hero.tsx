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
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        filter: 'contrast(1.2) brightness(0.9) saturate(1.0)',
      }}
    ></div>
    <div className="absolute inset-0 bg-blue-900/30 backdrop-blur-[1px]"></div>
  </div>
</div>


      {/* Voltify Donates 5% - Top Right on desktop, Bottom Left on mobile */}
      <div 
        className="absolute md:top-[13vh] lg:top-[13vh] xl:top-[17vh] right-[5vw] hidden md:block z-[25] w-[clamp(220px,21vw,400px)] h-[clamp(150px,12vw,400px)]"
      >
        <div 
          className="bg-white/95 backdrop-blur-sm border-l-4 border-r-4 border-blue-500 rounded-lg shadow-lg overflow-hidden p-[1vw] flex flex-col justify-between hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/10 before:to-transparent cursor-pointer h-full"
          onClick={(e) => {
            e.stopPropagation(); // Prevent double navigation
            goToCharityPage(); // Use the navigate function instead of window.open
          }}
        >
          <div className="flex flex-col h-full justify-between">
            <div className="rounded-t-lg px-0 border-b border-blue-200">
              <h3 className="text-black font-bold text-[clamp(14px,1.2vw,22px)] tracking-wide text-center flex items-center justify-center gap-2">
                Voltify Donates 5%
              </h3>
            </div>
            
            <div className="px-[0.8vw] pt-[0.8vw] pb-[0.9vw] rounded-b-lg mb-0 flex-grow flex flex-col justify-between">
              <p className="text-[clamp(12px,0.9vw,16px)] text-black leading-tight max-w-xl mx-auto font-light">
                For each candidate hired, we contribute <span className="font-bold text-blue-500 text-[clamp(13px,1vw,18px)]">5%</span> of the fee to assisting those in need through charitable initiatives.
              </p>
              <div className="flex justify-center mt-[0.8vw]">
                <Button 
                  className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 hover:from-blue-500 hover:to-blue-600 text-white rounded-full shadow-lg transition-all duration-300 text-[clamp(12px,1.1vw,18px)] font-medium border border-blue-400/30 relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:opacity-70 scale-95 hover:scale-100 px-[clamp(12px,1.5vw,20px)] py-[clamp(6px,0.8vw,12px)]"
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
        className="absolute bottom-[35vh] right-[2vw] md:hidden"
        style={{ 
          zIndex: 25,
          width: '170px',
        }}
      >
        <div 
          className="bg-white/95 backdrop-blur-sm border-l-4 border-r-4 border-blue-500 rounded-lg shadow-lg overflow-hidden p-2 flex flex-col justify-between hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/5 before:to-transparent cursor-pointer h-full"
          onClick={(e) => {
            e.stopPropagation(); // Prevent double navigation
            goToCharityPage(); // Use the navigate function instead of window.open
          }}
        >
          <div>
            <div className="rounded-t-lg px-0 py-1 border-b border-blue-200 mb-4">
              <h3 className="text-black font-bold text-xs tracking-wide text-center flex items-center justify-center gap-1">
                Voltify Donates 5%
              </h3>
            </div>
            
            <div className="px-1 pt-1 pb-0 rounded-b-lg mb-0">
              <p className="text-xs text-black leading-tight max-w-xl mx-auto font-light">
              For each candidate hired, we contribute <span className="font-bold text-blue-500">5%</span> to those in need through charitable initiatives.
              </p>
              <div className="flex justify-center mt-4">
              <Button 
                className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 hover:from-blue-500 hover:to-blue-600 text-white px-2 py-1 rounded-full shadow-lg transition-all duration-300 text-[10px] font-medium border border-blue-400/30 relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:opacity-70 transform hover:scale-105 scale-90"
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

      <div 
        className="absolute bottom-[20vh] right-[5vw] hidden md:block mb-2 z-[25] w-[clamp(200px,21vw,400px)] h-auto max-h-[clamp(170px,28vh,500px)]"
      >
        <div 
          className="bg-white/95 backdrop-blur-sm border-l-4 border-r-4 border-blue-500 rounded-lg shadow-lg overflow-hidden p-[1vw] pb-[1vw] flex flex-col justify-between cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/10 before:to-transparent h-full"
          onClick={goToTestimonialsPage}
        >
          <div className="flex flex-col h-full justify-between">
            <div className="rounded-t-lg px-0 border-b border-blue-200 mb-[0.5vw]">
              <h3 className="text-black font-bold text-[clamp(14px,1.2vw,22px)] tracking-wide text-center flex items-center justify-center gap-2">
                Client Testimonials
              </h3>
            </div>
            
            <div className="px-[0.8vw] pt-[0.5vw] pb-[0.5vw] rounded-b-lg mb-0 flex-grow">
              <div className="flex items-center mb-[0.6vw]">
                <div className={`w-[clamp(24px,1.8vw,32px)] h-[clamp(24px,1.8vw,32px)] rounded-full ${currentTestimonial.bgColor} flex items-center justify-center text-white font-bold text-[clamp(11px,0.7vw,14px)] mr-[0.5vw] shadow-sm`}>
                  {currentTestimonial.initials}
                </div>
                <div>
                  <h4 className="font-semibold text-[clamp(12px,0.9vw,16px)] text-stone-900">{currentTestimonial.author}</h4>
                  <p className="text-[clamp(10px,0.7vw,14px)] text-stone-500">{currentTestimonial.position}</p>
                </div>
              </div>
              <p className="text-[clamp(11px,0.8vw,15px)] text-stone-700 italic mb-[0.8vw] min-h-[clamp(40px,6vh,80px)] flex items-center">
                "{currentTestimonial.quote}"
              </p>
              <div className="flex justify-between items-center">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-[clamp(10px,0.8vw,14px)] w-[clamp(10px,0.8vw,14px)] text-yellow-500" fill="currentColor" />
                  ))}
                </div>
                <div className="flex">
                  <ChevronLeft 
                    className="h-[clamp(16px,1.2vw,20px)] w-[clamp(16px,1.2vw,20px)] text-stone-400 hover:text-stone-700 cursor-pointer" 
                    onClick={(e) => {
                      e.stopPropagation();
                      prevTestimonial();
                    }}
                  />
                  <ChevronRight 
                    className="h-[clamp(16px,1.2vw,20px)] w-[clamp(16px,1.2vw,20px)] text-stone-400 hover:text-stone-700 cursor-pointer" 
                    onClick={(e) => {
                      e.stopPropagation();
                      nextTestimonial();
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile version of Client Testimonials - Bottom Right */}
      <div 
        className="absolute bottom-[35vh] left-[10vw] md:hidden"
        style={{ 
          zIndex: 25,
          width: '170px',
        }}
      >
        <div 
          className="bg-white/95 backdrop-blur-sm border-l-4 border-r-4 border-blue-500 rounded-lg shadow-lg overflow-hidden p-2 flex flex-col justify-between hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/5 before:to-transparent cursor-pointer"
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
<div className="container-custom relative z-20 flex flex-col justify-start py-0 pl-[2vw] ml-[15vw]">
  <div className="max-w-7xl w-full mt-[0.5vh] ml-[1vw]">
    <div className="pt-[3vh] md:pt-[7vh]">
      {/* Three-column layout on desktop, stacked on mobile */}
      <div className="flex flex-col md:flex-row md:items-start">
        
        {/* PRIMARY FOCUS: Heading and Mission Statement - Left-aligned column */}
        <div className="w-full order-1 md:px-0 md:pr-0">
          {/* Heading - PRIMARY FOCUS PART 1 */}
          <div className="text-center overflow-visible mx-auto w-full mb-[1vh]">
            <h1 className="relative text-[clamp(24px,3vw,44px)] font-bold tracking-tight mb-0 overflow-visible py-[0.3vh] px-0 leading-tight whitespace-normal mt-0"> 
              <span className="text-blue-500 relative">
                {/* Gradient text with animation */}
                <span className="bg-[#000000] bg-clip-text text-transparent animate-gradient-x font-extrabold hidden md:inline-block">
                  Voltify
                </span>
                
                <Zap 
                  shapeRendering="crispEdges"
                  className="bg-transparent inline-block h-[clamp(28px,2.75vw,60px)] w-[clamp(25px,2vw,48px)] ml-[0.5vw] text-[#fde90c] fill-current hover:scale-110 transition-transform duration-300 hidden md:inline-block"
                  style={{
                    stroke: '#fde90c',
                    strokeWidth: 1.5,
                    strokeLinejoin: 'miter',
                    strokeLinecap: 'butt',
                    filter: "drop-shadow(0 0 8px rgba(253, 233, 12, 0.8))"
                  }}
                />
              </span>
            </h1>
          </div>
          
         {/* Desktop Mission statement - PRIMARY FOCUS PART 2 */}
<div className="relative z-10 ml-[-3.5vw] xl:ml-0 lg:ml-0 md:ml-[-1.5vw] px-0 mx-auto mt-[-0.5vh] hidden md:block">
   <div 
       className="bg-white/95 backdrop-blur-sm border-l-2 border-r-2 border-blue-500 pl-[1vw] pr-[0.8vw] py-[0.8vw] rounded-lg mr-auto relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/5 before:to-transparent h-auto md:w-auto"
       style={{ width: 'clamp(315px, 55vw, 750px)', maxWidth: '95%' }}
   >
     <div className="flex flex-col items-center justify-center">
       <p className="relative text-[clamp(17px,1.8vw,25px)] font-bold text-black leading-tight text-left relative z-10 py-[0.8vh]">
         <span className="block mb-[0.5vh]">
           We energize careers, build lasting relationships,
         </span>
         <span className="block mb-[0.75vh]">
           connect you with opportunities, and help you grow.
         </span>
       </p>
       
       <Button 
         className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 hover:from-blue-500 hover:to-blue-600 text-white px-[clamp(12px,1.2vw,16px)] py-[clamp(6px,0.8vw,12px)] rounded-full shadow-lg transition-all duration-300 text-[clamp(14px,1vw,18px)] font-medium border border-blue-400/30 mb-[0.5vh] relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:opacity-70 transform hover:scale-105 self-center"
         onClick={() => navigate('/contact')}
       >
         Discover Opportunities
         <ArrowRight className="ml-[0.5vw] h-[clamp(14px,1.2vw,20px)] w-[clamp(14px,1.2vw,20px)]" />
       </Button>
     </div>
   </div>
</div>

{/* Mobile Mission statement */}
<div className="relative z-10 px-1 mr-[5vw] mx-auto mt-[2vh] block md:hidden">
   <div 
       className="bg-white/95 backdrop-blur-sm border-l-2 border-r-2 border-blue-500 px-3 py-2 rounded-lg mx-auto relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/5 before:to-transparent h-auto w-[100%] max-w-[500px] shadow-lg"
   >
     <div className="flex flex-col items-center justify-center">
       <p className="relative text-[16px] font-bold text-black leading-[1.15] text-center relative z-10 tracking-tight w-full">
         <span className="inline-block">We energize careers and build</span>
         <span className="inline-block">relationships, connecting you</span>
         <span className="inline-block mb-1.5">with opportunities.</span>
       </p>
       
       <Button 
         className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 hover:from-blue-500 hover:to-blue-600 text-white px-[10px] py-[6px] rounded-full shadow-lg transition-all duration-300 text-[12px] font-medium border border-blue-400/30 mb-1 relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:opacity-70 transform hover:scale-105 self-center"
         onClick={() => navigate('/contact')}
       >
         Discover Opportunities
         <ArrowRight className="ml-1.5 h-[12px] w-[12px]" />
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
