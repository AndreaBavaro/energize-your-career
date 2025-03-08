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
    <section id="testimonials" className="py-24 white-brick-bg relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-voltify-100/40 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-voltify-200/40 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-voltify-300/40 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="flex justify-center mb-2">
          <div className="bg-voltify-400 text-white px-4 py-1 rounded-full text-sm font-medium inline-flex items-center shadow-md">
            <CheckCircle2 className="h-4 w-4 mr-1" />
            <span>Verified Client Testimonials</span>
          </div>
        </div>
        
        <SectionHeading 
          title="What Our Clients Say"
          subtitle="Hear directly from professionals who've partnered with Melinda and Ban Partners."
          className="text-stone-800 mb-12"
        />
        
        <div className="max-w-5xl mx-auto relative">
          {!showFullQuote && (
            <>
              <button 
                onClick={prevTestimonial}
                className="absolute -left-4 md:-left-12 top-1/2 transform -translate-y-1/2 z-10 bg-voltify-400/90 hover:bg-voltify-500 text-white p-2 rounded-full transition-all duration-300 shadow-lg"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button 
                onClick={nextTestimonial}
                className="absolute -right-4 md:-right-12 top-1/2 transform -translate-y-1/2 z-10 bg-voltify-400/90 hover:bg-voltify-500 text-white p-2 rounded-full transition-all duration-300 shadow-lg"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
          
          <div className="relative">
            <div className={`transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-stone-200">
                <div className="flex items-start gap-4 mb-6">
                  <div className={`${testimonials[currentIndex].avatarColor} w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0`}>
                    {testimonials[currentIndex].author.split(' ').map(word => word[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-stone-900">{testimonials[currentIndex].author}</h3>
                    <p className="text-stone-600">{testimonials[currentIndex].position}</p>
                    <p className="text-voltify-500 font-medium">{testimonials[currentIndex].company}</p>
                  </div>
                  <div className="ml-auto flex">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-voltify-400" fill="currentColor" />
                    ))}
                  </div>
                </div>
                
                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 h-8 w-8 text-voltify-200" />
                  <p className="text-stone-700 text-lg leading-relaxed pl-6">
                    {showFullQuote ? testimonials[currentIndex].fullQuote : testimonials[currentIndex].quote}
                  </p>
                  {testimonials[currentIndex].fullQuote !== testimonials[currentIndex].quote && (
                    <button
                      onClick={toggleQuoteLength}
                      className="mt-4 text-voltify-500 hover:text-voltify-600 font-medium transition-colors"
                    >
                      {showFullQuote ? 'Show Less' : 'Read More'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Testimonial Navigation Dots */}
          {!showFullQuote && (
            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-voltify-400 w-8' 
                      : 'bg-stone-300 hover:bg-stone-400'
                  }`}
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
