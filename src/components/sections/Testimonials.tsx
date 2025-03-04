
import { SectionHeading } from '../ui/SectionHeading';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      quote: "Voltify transformed my job search. Their personal approach and industry connections helped me land my dream role in tech leadership.",
      author: "Sarah J.",
      position: "CTO at a FinTech Startup",
      avatarColor: "bg-voltify-200"
    },
    {
      quote: "As an HR director, I've worked with many staffing agencies, but Voltify stands out. They truly understand our company culture and consistently deliver talent that fits both our skill requirements and our values.",
      author: "Michael T.",
      position: "HR Director, Fortune 500 Company",
      avatarColor: "bg-voltify-300"
    },
    {
      quote: "Their expertise in the energy sector is unmatched. Voltify helped us staff an entire data science team in record time, with candidates who exceeded our expectations.",
      author: "Elena R.",
      position: "VP of Analytics, Energy Sector",
      avatarColor: "bg-voltify-400"
    },
    {
      quote: "What sets Voltify apart is their follow-through. They don't just place you and disappear - they check in and ensure both parties are satisfied with the match.",
      author: "David K.",
      position: "Software Development Manager",
      avatarColor: "bg-voltify-500"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    // Auto rotate testimonials
    const interval = setInterval(() => {
      nextTestimonial();
    }, 8000);
    
    return () => clearInterval(interval);
  }, [currentIndex]);
  
  const nextTestimonial = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };
  
  const prevTestimonial = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  return (
    <section id="testimonials" className="py-24 bg-stone-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-voltify-900/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-voltify-600/20 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-voltify-800/20 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <SectionHeading 
          title="What Our Clients Say"
          subtitle="Trusted by job seekers and employers across industries."
          className="text-white"
        />
        
        <div className="max-w-4xl mx-auto relative">
          <button 
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-voltify-700/30 hover:bg-voltify-700/50 text-white p-2 rounded-full transition-all duration-300"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button 
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-voltify-700/30 hover:bg-voltify-700/50 text-white p-2 rounded-full transition-all duration-300"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          
          <div className="relative overflow-hidden h-80 flex items-center">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className={`absolute inset-0 transition-all duration-500 ease-in-out flex flex-col items-center justify-center p-8 ${
                  index === currentIndex 
                    ? 'opacity-100 translate-x-0' 
                    : index < currentIndex 
                      ? 'opacity-0 -translate-x-full' 
                      : 'opacity-0 translate-x-full'
                }`}
              >
                <div className="mb-6 text-center">
                  <Quote className="h-10 w-10 text-voltify-400 mx-auto mb-4" />
                  <p className="text-xl md:text-2xl text-stone-100 italic font-light leading-relaxed mb-6">
                    "{testimonial.quote}"
                  </p>
                </div>
                
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-full ${testimonial.avatarColor} flex items-center justify-center mr-3`}>
                    <span className="font-bold text-stone-900">{testimonial.author[0]}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-white">{testimonial.author}</p>
                    <p className="text-sm text-stone-300">{testimonial.position}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-voltify-400 w-6' : 'bg-stone-600'
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
