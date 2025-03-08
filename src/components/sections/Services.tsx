import { SectionHeading } from '../ui/SectionHeading';
import { GlassCard } from '../ui/GlassCard';
import { Search, Clock, Users, Briefcase, CreditCard } from 'lucide-react';
import React from 'react';

export default function Services() {
  const services = [
    {
      icon: <Briefcase className="h-10 w-10 text-voltify-600" />,
      title: 'Fulltime Placements',
      description: 'Connect with permanent positions that match your skills and career goals.',
    },
    {
      icon: <Search className="h-10 w-10 text-voltify-600" />,
      title: 'Executive Search',
      description: 'Specialized recruitment for executive-level and leadership positions.',
    },
    {
      icon: <Clock className="h-10 w-10 text-voltify-600" />,
      title: 'Short & Long-term Contracts',
      description: 'Flexible contract opportunities tailored to your preferences and availability.',
    },
    {
      icon: <Users className="h-10 w-10 text-voltify-600" />,
      title: 'Contract to Full-time',
      description: 'Begin with a contract position with potential for permanent employment.',
    },
    {
      icon: <CreditCard className="h-10 w-10 text-voltify-600" />,
      title: 'Payroll Services',
      description: 'Comprehensive payroll management for businesses of all sizes.',
    }
  ];

  return (
    <section id="services" className="py-24 white-brick-bg relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-voltify-100 rounded-full filter blur-3xl opacity-40 transform -translate-x-1/4 translate-y-1/4"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <SectionHeading 
          title="Our Services"
          subtitle="We specialize in finding the perfect match between exceptional talent and outstanding organizations."
        />
        
        {/* Mobile view: 2x2+1 grid */}
        <div className="block sm:hidden">
          {/* First row: 2 cards */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {services.slice(0, 2).map((service, index) => (
              <div 
                key={index} 
                className="opacity-0 animate-fade-in-up animate-fill-forwards h-full"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <GlassCard className="p-4 h-full flex flex-col">
                  <div className="text-center flex flex-col h-full">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-voltify-100 mb-3 mx-auto">
                      {React.cloneElement(service.icon, { className: 'h-6 w-6 text-voltify-600' })}
                    </div>
                    <h3 className="text-base font-bold mb-2 text-stone-900">{service.title}</h3>
                    <p className="text-xs text-stone-600 flex-grow">{service.description}</p>
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
          
          {/* Second row: 2 cards */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {services.slice(2, 4).map((service, index) => (
              <div 
                key={index + 2} 
                className="opacity-0 animate-fade-in-up animate-fill-forwards h-full"
                style={{ animationDelay: `${(index + 2) * 100}ms` }}
              >
                <GlassCard className="p-4 h-full flex flex-col">
                  <div className="text-center flex flex-col h-full">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-voltify-100 mb-3 mx-auto">
                      {React.cloneElement(service.icon, { className: 'h-6 w-6 text-voltify-600' })}
                    </div>
                    <h3 className="text-base font-bold mb-2 text-stone-900">{service.title}</h3>
                    <p className="text-xs text-stone-600 flex-grow">{service.description}</p>
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
          
          {/* Third row: 1 card centered */}
          <div className="flex justify-center">
            <div 
              className="opacity-0 animate-fade-in-up animate-fill-forwards w-1/2"
              style={{ animationDelay: `${4 * 100}ms` }}
            >
              <GlassCard className="p-4 h-full">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-voltify-100 mb-3 mx-auto">
                    {React.cloneElement(services[4].icon, { className: 'h-6 w-6 text-voltify-600' })}
                  </div>
                  <h3 className="text-base font-bold mb-2 text-stone-900">{services[4].title}</h3>
                  <p className="text-xs text-stone-600">{services[4].description}</p>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
        
        {/* Desktop view: custom layout with centered bottom row */}
        <div className="hidden sm:block max-w-5xl mx-auto">
          {/* Top row: 3 cards */}
          <div className="grid grid-cols-3 gap-8 mb-8">
            {services.slice(0, 3).map((service, index) => (
              <div 
                key={index} 
                className="opacity-0 animate-fade-in-up animate-fill-forwards h-full"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <GlassCard className="h-full">
                  <div className="text-center flex flex-col h-full">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-voltify-100 mb-6 mx-auto">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-stone-900">{service.title}</h3>
                    <p className="text-stone-600 flex-grow">{service.description}</p>
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
          
          {/* Bottom row: 2 cards centered */}
          <div className="flex justify-center gap-8">
            {services.slice(3, 5).map((service, index) => (
              <div 
                key={index + 3} 
                className="opacity-0 animate-fade-in-up animate-fill-forwards w-1/3 h-full"
                style={{ animationDelay: `${(index + 3) * 100}ms` }}
              >
                <GlassCard className="h-full">
                  <div className="text-center flex flex-col h-full">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-voltify-100 mb-6 mx-auto">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-stone-900">{service.title}</h3>
                    <p className="text-stone-600 flex-grow">{service.description}</p>
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
