import { SectionHeading } from '../ui/SectionHeading';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star, Building, Award, CheckCircle2 } from 'lucide-react';

export default function Testimonials() {
  // Create shortened versions of testimonials for display
  const testimonials = [
    {
      fullQuote: "Working with Melinda was an absolute game-changer for my job search! From the very first conversation, I felt supported and valued. Melinda took the time to truly understand my skills, goals, and career aspirations. She matched me with an opportunity that was perfectly aligned with my experience, and I never felt like I was being pushed into something that was not right for me. What really stood out was her personalized approach u2014 she did not just send me a generic job listings; she provided tailored advice and guided me through each step of the process. Melinda kept me updated regularly, offering constructive feedback after interviews and helped me navigate each step with confidence. She was proactive, responsive, and genuinely cared about my success. Thanks to her expertise, I secured a role that I'm excited about and that aligns perfectly with my long-term goals.",
      quote: "Working with Melinda was an absolute game-changer for my job search! She took the time to truly understand my skills, goals, and career aspirations. What really stood out was her personalized approach u2014 she provided tailored advice and guided me through each step of the process. She was proactive, responsive, and genuinely cared about my success. Thanks to her expertise, I secured a role that I'm excited about and that aligns perfectly with my long-term goals.",
      author: "Jared Drepaul",
      position: "Director HR Operations Technology",
      company: "TMX Group",
      rating: 5,
      avatarColor: "bg-voltify-200"
    },
    {
      fullQuote: "Melinda played a key role in helping me secure a Senior Project Manager position with a U.S. company. From our very first conversation, it was clear that she had the best intentions in bringing me on board and ensuring my skill set aligned with the company's needs for success in this role. Her guidance and support throughout the screening and interview process were invaluable, and I can confidently say I wouldn't have succeeded without her. I highly recommend working with Melinda and building a professional relationship with her to elevate your career.",
      quote: "Melinda played a key role in helping me secure a Senior Project Manager position with a U.S. company. Her guidance and support throughout the screening and interview process were invaluable, and I can confidently say I wouldn't have succeeded without her. I highly recommend working with Melinda to elevate your career.",
      author: "Gabriela Alcina",
      position: "Global Project Manager",
      company: "IPC Systems",
      rating: 5,
      avatarColor: "bg-voltify-300"
    },
    {
      fullQuote: "From start to finish, my customer relationship experience with you has been excellent. I have always felt heard and continue to have full faith in you representing my interests at the bargaining table with the client. Your experience in the job market is evident as is your pulse on it. Your responses have always been direct and timely, and any questions or concerns were addressed with clarity and professionalism. Throughout our interactions, I have always felt treated fairly and with respect, which has made the entire process smooth and positive.",
      quote: "From start to finish, my customer relationship experience with Melinda has been excellent. I have always felt heard and continue to have full faith in her representing my interests at the bargaining table with the client. Her responses have always been direct and timely, making the entire process smooth and positive.",
      author: "Adelle DSilva",
      position: "Senior Project Manager",
      company: "DECIEM/The Abnormal Beauty Company",
      rating: 5,
      avatarColor: "bg-voltify-400"
    },
    {
      fullQuote: "I worked with Ban Partners on an extended contract. Melinda was instrumental in getting me the position which was well paid and very much suited to my skills. She advocated on my behalf on several extensions resulting in a contract length of over three years. She was always there to answer any questions and went to significant lengths on my behalf. I thank her very much for one of the best positions I ever held.",
      quote: "Melinda was instrumental in getting me a position which was well paid and very much suited to my skills. She advocated on my behalf on several extensions resulting in a contract length of over three years. I thank her very much for one of the best positions I ever held.",
      author: "Werner Strijewski",
      position: "Principal Software Engineer",
      company: "Yamaha Motor Canada",
      rating: 5,
      avatarColor: "bg-voltify-500"
    },
    {
      fullQuote: "I've had the pleasure of working with Melinda over the past four years as a Senior Project Manager at Deciem, and her support has been nothing short of transformative. Her clear communication, responsiveness, and unwavering commitment to ensuring timely payments and seamless contract extensions have made working on contract smooth and successful. Melinda's proactive approach in addressing any questions or concerns, combined with her dedication to building a truly supportive professional relationship, makes her an exceptional partner for anyone in the tech industry.",
      quote: "I've had the pleasure of working with Melinda over the past four years, and her support has been nothing short of transformative. Her clear communication, responsiveness, and unwavering commitment have made working on contract smooth and successful. She's an exceptional partner for anyone in the tech industry.",
      author: "Shayan Nedaei",
      position: "Senior Project Manager Digital Transformation",
      company: "DECIEM/The Abnormal Beauty Company",
      rating: 5,
      avatarColor: "bg-voltify-600"
    },
    {
      fullQuote: "Having been in the Banking/Finance/Fintech sector for some 15+ years now, and in contract roles for more than 10 of those years, I have dealt with many recruitment firms and spoken with various senior recruiters both in Canada and the US over the years. Melinda contacted me last year with an opportunity that she felt suited my qualifications, experience and career path, towards the end of my previous 3 year contract engagement. What stood out for me throughout the process was open channels of communication, full transparency, honest feedback, and being kept in the loop with updates while waiting for client responses.",
      quote: "What stood out working with Melinda was open channels of communication, full transparency, honest feedback, and being kept in the loop with updates. She contacted me with an opportunity that perfectly suited my qualifications and career path, demonstrating her understanding of the Banking/Finance/Fintech sector.",
      author: "Ali Darbani",
      position: "Senior Project Manager",
      company: "RBC Capital Markets",
      rating: 5,
      avatarColor: "bg-voltify-700"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showFullQuote, setShowFullQuote] = useState(false);
  
  useEffect(() => {
    // Auto rotate testimonials only when not showing full quote
    if (!showFullQuote) {
      const interval = setInterval(() => {
        nextTestimonial();
      }, 10000);
      
      return () => clearInterval(interval);
    }
    return undefined;
  }, [currentIndex, showFullQuote]);
  
  const nextTestimonial = () => {
    if (isAnimating || showFullQuote) return;
    
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };
  
  const prevTestimonial = () => {
    if (isAnimating || showFullQuote) return;
    
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const toggleQuoteLength = () => {
    setShowFullQuote(!showFullQuote);
  };

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-br from-stone-900 to-stone-800 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-voltify-900/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-voltify-600/20 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-voltify-800/20 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="flex justify-center mb-2">
          <div className="bg-voltify-600 text-white px-4 py-1 rounded-full text-sm font-medium inline-flex items-center">
            <CheckCircle2 className="h-4 w-4 mr-1" />
            <span>Verified Client Testimonials</span>
          </div>
        </div>
        
        <SectionHeading 
          title="What Our Clients Say"
          subtitle="Hear directly from professionals who've partnered with Melinda and Ban Partners."
          className="text-white mb-12"
        />
        
        <div className="max-w-5xl mx-auto relative">
          {!showFullQuote && (
            <>
              <button 
                onClick={prevTestimonial}
                className="absolute -left-4 md:-left-12 top-1/2 transform -translate-y-1/2 z-10 bg-voltify-700/50 hover:bg-voltify-700/70 text-white p-2 rounded-full transition-all duration-300 shadow-lg"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              
              <button 
                onClick={nextTestimonial}
                className="absolute -right-4 md:-right-12 top-1/2 transform -translate-y-1/2 z-10 bg-voltify-700/50 hover:bg-voltify-700/70 text-white p-2 rounded-full transition-all duration-300 shadow-lg"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
          
          <div className="relative overflow-hidden min-h-[400px] flex items-center">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className={`absolute inset-0 transition-all duration-500 ease-in-out flex flex-col items-center justify-center py-6 px-4 md:px-8 ${
                  index === currentIndex 
                    ? 'opacity-100 translate-x-0' 
                    : index < currentIndex 
                      ? 'opacity-0 -translate-x-full' 
                      : 'opacity-0 translate-x-full'
                }`}
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 md:p-10 shadow-xl border border-white/20 w-full max-w-4xl">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-8 gap-4">
                    <div className="flex items-center">
                      <div className={`w-16 h-16 rounded-full ${testimonial.avatarColor} flex items-center justify-center mr-5 shadow-md border-2 border-white/30`}>
                        <span className="font-bold text-stone-900 text-2xl">{testimonial.author[0]}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-white text-xl">{testimonial.author}</p>
                        <p className="text-stone-300 text-lg">{testimonial.position}</p>
                        <div className="flex items-center mt-1">
                          <Building className="h-4 w-4 text-stone-400 mr-1" />
                          <p className="text-sm text-stone-300">{testimonial.company}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center bg-voltify-900/30 px-4 py-2 rounded-full">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400 mx-0.5" />
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <Quote className="h-10 w-10 text-voltify-400 mb-4 float-left mr-4" />
                    <p className="text-base md:text-lg text-stone-100 leading-relaxed">
                      {showFullQuote ? testimonial.fullQuote : testimonial.quote}
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-center mt-8 pt-4 border-t border-white/10">
                    <div className="flex items-center">
                      <Award className="h-5 w-5 text-voltify-400 mr-2" />
                      <span className="text-sm text-stone-300">Verified Client</span>
                    </div>
                    <button 
                      onClick={toggleQuoteLength} 
                      className="text-sm text-voltify-400 hover:text-voltify-300 transition-colors duration-300 underline"
                    >
                      {showFullQuote ? "Show Less" : "Read Full Testimonial"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {!showFullQuote && (
            <div className="flex justify-center mt-8 gap-2">
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
          )}
        </div>
      </div>
    </section>
  );
}
