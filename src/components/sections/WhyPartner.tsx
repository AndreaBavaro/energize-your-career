import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { GlassCard } from '../ui/GlassCard';
import { Trophy, Clock, CheckCircle, Handshake, Key, MessageSquare } from 'lucide-react';

export default function WhyPartner() {
  const reasons = [
    {
      icon: <Trophy className="h-8 w-8 text-white" />,
      title: "20 Years of Experience",
      description: "Two decades of industry knowledge and staffing expertise, working with businesses of all sizes."
    },
    {
      icon: <Clock className="h-8 w-8 text-white" />,
      title: "Fast Turnaround",
      description: "Efficient processes that significantly reduce time-to-hire without sacrificing quality."
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-white" />,
      title: "Proven Track Record",
      description: "Consistent history of successful placements and satisfied clients across industries."
    },
    {
      icon: <Handshake className="h-8 w-8 text-white" />,
      title: "Transparent Approach",
      description: "Straightforward fee structure with no hidden costs, only pay when the hire starts."
    },
    {
      icon: <Key className="h-8 w-8 text-white" />,
      title: "Exclusive Opportunities",
      description: "Access to our network of pre-screened, high-caliber professionals not available elsewhere."
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-white" />,
      title: "Ongoing Support",
      description: "We maintain relationships with both clients and candidates long after placement."
    }
  ];

  return (
    <section id="why-partner" className="py-24 white-brick-bg relative overflow-hidden">
      <div className="container-custom relative z-10">
        <SectionHeading 
          title="Why Partner With Us"
          subtitle="Experience and Transparency! With 20 years of experience in the staffing industry, our commitment to excellence and proven track record are what set us apart."
        />
        
        {/* Mobile view: 3x2 grid */}
        <div className="block sm:hidden">
          <div className="grid grid-cols-3 gap-3 max-w-6xl mx-auto">
            {reasons.map((reason, index) => (
              <GlassCard 
                key={index}
                className="opacity-0 animate-fade-in-up animate-fill-forwards p-3 h-auto"
                animationDelay={`${index * 100 + 200}ms`}
              >
                <div className="flex flex-col h-full items-center text-center">
                  <div className="rounded-full w-10 h-10 bg-alternative-600 flex items-center justify-center mb-2">
                    {React.cloneElement(reason.icon, { className: 'h-5 w-5 text-white' })}
                  </div>
                  <h3 className="text-sm font-semibold mb-1 text-stone-900">{reason.title}</h3>
                  <p className="text-xs text-stone-600">{reason.description}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
        
        {/* Desktop view: original layout */}
        <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reasons.map((reason, index) => (
            <GlassCard 
              key={index}
              className="opacity-0 animate-fade-in-up animate-fill-forwards"
              animationDelay={`${index * 100 + 200}ms`}
            >
              <div className="flex flex-col h-full">
                <div className="rounded-full w-16 h-16 bg-alternative-600 flex items-center justify-center mb-5">
                  {reason.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-stone-900">{reason.title}</h3>
                <p className="text-stone-600">{reason.description}</p>
              </div>
            </GlassCard>
          ))}
        </div>
        
        {/* Commitment to Excellence section with integrated image */}
        <div className="mt-16 max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            {/* Image column - larger now */}
            <div className="w-full lg:w-3/5 order-1 sm:order-1 lg:order-1">
              <div className="relative h-full flex items-center justify-center">
                <div className="absolute w-full h-full bg-alternative-600/10 rounded-2xl transform rotate-3"></div>
                <div className="relative z-10 transform -rotate-2 hover:rotate-0 transition-transform duration-500 w-full max-w-lg mx-auto overflow-hidden rounded-2xl shadow-xl">
                  {/* Overlay to enhance image quality perception */}
                  <div className="absolute inset-0 bg-alternative-600/10 mix-blend-overlay z-10"></div>
                  
                  <img 
                    src="/images/women3.jpg" 
                    alt="Voltify Group team members collaborating to deliver exceptional recruitment services" 
                    className="w-full h-auto object-cover"
                    style={{ maxHeight: "450px" }}
                  />
                </div>
              </div>
            </div>
            
            {/* Content column - smaller now */}
            <div className="w-full lg:w-2/5 order-2 sm:order-2 lg:order-2">
              <div className="bg-alternative-600 rounded-2xl p-6 md:p-8 text-white shadow-xl h-full">
                <h3 className="text-2xl font-bold mb-4 text-center lg:text-left">Our Commitment to Excellence</h3>
                <p className="text-lg mb-4 text-alternative-50">
                  With 20 years in the staffing industry, our commitment to excellence and proven track record have driven our success.
                </p>
                <p className="text-lg text-alternative-50">
                  We take time to understand your unique needs and culture, ensuring candidates have both the right skills and will thrive within your team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
