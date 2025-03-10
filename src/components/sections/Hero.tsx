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

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex flex-col justify-between pt-4 overflow-hidden"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover md:scale-100 md:translate-y-0 md:translate-x-0 scale-125 translate-y-12 translate-x-0 md:translate-x-0" 
          style={{
            filter: 'contrast(1.2) brightness(1.0) saturate(1.0)',
          }}
          onError={(e) => console.error("Video loading error:", e)}
        >
          <source src={`${import.meta.env.BASE_URL}images/herovideo.mp4`} type="video/mp4" />
        </video>
      </div>
      
      {/* Flexbox layout for side-by-side containers */}
      <div className="container-custom relative z-20 flex flex-col justify-start py-0">
        <div className="max-w-6xl mx-auto w-full mt-2 sm:mt-4 md:mt-0">
          <div className="pt-10 sm:pt-8 md:pt-20">
            {/* Side-by-side containers with flexbox */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
              
              {/* Text content with backdrop container - made shorter */}
              <div className="w-full md:w-5/6 mx-auto">
                <div className="relative p-3 sm:p-4 md:p-5 rounded-xl bg-voltify-600/80 backdrop-blur-sm shadow-lg border border-voltify-200/20 text-center md:text-left h-auto flex flex-col justify-between space-y-2 sm:space-y-0">
                  
                <div className="md:grid md:grid-cols-3 md:gap-6 lg:gap-8">
                <div className="col-span-2">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-1 sm:mb-2 text-voltify-700">
                    <AnimatedText 
                      text={
                        <>
                          <span className="text-white drop-shadow-[0_0_15px_rgba(255,82,82,1)]">Energize</span> Your Career
                        </>
                      } 
                      className="text-voltify-800 block mb-2"
                      animation="fade-in-up"
                      delay={200}
                    />
                        <div className="flex items-center justify-center md:justify-start mt-1">
                  <span className="text-voltify-800 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">With</span>
                  <div className="flex items-center ml-2 relative">
                    {/* Updated Text Gradient with Orange */}
                    <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 pb-1 leading-relaxed  drop-shadow-[0_0_15px_rgba(255,82,82,1)]
">
                      Voltify
                    </span>

                    {/* Zap Icon with Matching Gradient */}
                  <Zap 
                    className="h-6 w-5 sm:h-8 sm:w-6 md:h-10 md:w-8 ml-1 text-white drop-shadow-[0_0_10px_rgba(255,82,82,1)] fill-current"
                  />
                </div>
                  </div>
                  </h1>
                      
                      <div className="md:pr-6">
                        <div className="bg-voltify-800/40 backdrop-blur-sm border-l-4 border-alternative-400 pl-4 pr-2 py-3 rounded-r-lg shadow-md mt-2 mb-6">
                          <p className="text-lg sm:text-xl md:text-xl text-white leading-relaxed font-small">
                            True to the meaning of our name – Voltify – our mission is clear: to energize careers, build lasting relationships, connect you with opportunities, and help you grow, all supported by a positive mindset that leads to success.
                          </p>
                        </div>
                      </div>
                      
                      <div className="md:flex md:items-end md:justify-start">
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center md:justify-start">
                          <Button 
                            className="bg-alternative-500 text-white px-5 sm:px-6 py-3 sm:py-4 rounded-lg shadow-lg transition-all duration-300 text-base sm:text-lg font-medium"
                            size="lg"
                            onClick={() => setIsJobSeekerModalOpen(true)}
                          >
                            For Job Seekers
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Button>
                          
                          <Button 
                            className="bg-alternative-700 text-white px-5 sm:px-6 py-3 sm:py-4 rounded-lg shadow-lg transition-all duration-300 text-base sm:text-lg font-medium"
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
                    <div className="hidden md:block col-span-1">
                      <div 
                        className="bg-voltify-700/80 backdrop-blur-md rounded-lg border border-voltify-400/20 shadow-lg overflow-hidden p-4 h-full flex flex-col justify-between cursor-pointer hover:shadow-xl transition-all duration-300 border-voltify-900"
                        onClick={goToTestimonialsPage}
                      >
                        <div>
                          <div className="bg-alternative-700 rounded-t-lg px-3 py-2 border-voltify-900">
                            <h3 className="text-white font-bold text-sm tracking-wide text-center">Client Testimonials</h3>
                          </div>
                          
                          <div className="bg-voltify-700/40 px-4 pt-3 pb-2 rounded-b-lg mb-3 border-2 border-voltify-900">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                <div className={`w-9 h-9 rounded-full ${currentTestimonial.bgColor} flex items-center justify-center text-white font-bold text-xs mr-2 shadow-sm`}>
                                  {currentTestimonial.initials}
                                </div>
                                <div>
                                  <h4 className="text-sm font-semibold text-white">{currentTestimonial.author}</h4>
                                  <p className="text-xs text-stone-100">{currentTestimonial.position}</p>
                                </div>
                              </div>
                            </div>

                            <blockquote className="text-sm text-stone-100 mb-2 leading-relaxed italic">
                              "{currentTestimonial.quote}"
                            </blockquote>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex space-x-1.5">
                            {testimonials.map((_, index) => (
                              <button 
                                key={index}
                                onClick={(e) => {
                                  e.stopPropagation(); // Prevent navigation when clicking on dots
                                  setCurrentTestimonialIndex(index);
                                }}
                                className={`w-2 h-2 rounded-full transition-colors ${index === currentTestimonialIndex ? 'bg-white' : 'bg-white/40'}`}
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
                              className="w-7 h-7 rounded-full bg-voltify-700/20 flex items-center justify-center transition-colors"
                              aria-label="Previous testimonial"
                            >
                              <ChevronLeft className="h-4 w-4 text-white" />
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent navigation when clicking navigation buttons
                                nextTestimonial();
                              }}
                              className="w-7 h-7 rounded-full bg-voltify-700/20 flex items-center justify-center transition-colors"
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
          </div>
        </div>
      </div>
      
      {/* Charitable giving banner */}
      <div className="container-custom relative z-10 py-6 md:py-16 mt-2 sm:mt-0.5 mb-16 sm:mb-8">
        <div className="text-center">
          <div className="inline-block max-w-3xl w-full">
            <div 
              className="bg-voltify-600/90 backdrop-blur-md rounded-lg border border-voltify-400/30 shadow-lg overflow-hidden px-4 sm:px-8 py-3 sm:py-6 cursor-pointer hover:bg-voltify-700/90 transition-colors"
              onClick={goToCharityPage}
            >
              <div className="flex flex-row items-center justify-center gap-2 sm:gap-4">
                <Heart className="h-4 w-4 sm:h-6 sm:w-6 text-voltify-200 flex-shrink-0" fill="currentColor" />
                <div className="flex-grow">
                  <h2 className="text-base sm:text-lg md:text-3xl font-bold text-white mb-1">
                    5% Voltify Gives Back
                  </h2>
                  <p className="text-white/95 text-xs sm:text-base leading-relaxed font-light">
                    For each candidate hired, we contribute 5% of the fee to assisting those in need through charitable initiatives.
                  </p>
                </div>
                <Heart className="h-4 w-4 sm:h-6 sm:w-6 text-voltify-200 flex-shrink-0" fill="currentColor" />
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
