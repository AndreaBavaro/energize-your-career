import { SectionHeading } from '../ui/SectionHeading';
import { GlassCard } from '../ui/GlassCard';
import { Briefcase, CheckCircle, Lightbulb, CreditCard } from 'lucide-react';

export default function WhatWeDo() {
  // List of positions we place
  const positions = [
    'CIO', 'CTO', 'VP', 'Director', 'Manager of IT', 'Manager of HR', 'Manager of Sales',
    'Project Managers', 'Business Analyst', 'AI Engineers', 'Machine Learning Engineers',
    'Robotics Engineer', 'Software Developers', 'Network Administrators', 'Systems Administrators',
    'Data Warehouse', 'Information Security', 'Web Developers', 'Web Designers', 'QA', 'BI', 'Marketing Managers'
  ];

  // Additional services
  const additionalServices = [
    {
      icon: <CheckCircle className="h-8 w-8 text-voltify-600" />,
      title: 'Reference & Background Checks',
      description: 'We handle comprehensive reference and background checks for all candidates.'
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-voltify-600" />,
      title: 'Coaching & Training',
      description: 'We provide coaching and training to help candidates succeed in their new roles.'
    },
    {
      icon: <CreditCard className="h-8 w-8 text-voltify-600" />,
      title: 'Pay Only When Hired',
      description: 'Clients pay only when the hire starts, ensuring satisfaction with our placements.'
    }
  ];

  return (
    <section id="what-we-do" className="py-16 md:py-24 white-brick-bg relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-voltify-50 rounded-full filter blur-3xl opacity-30 transform -translate-x-1/4"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <SectionHeading 
          title="What We Do"
          subtitle="Voltify provides placements of highly qualified, fully screened professionals across various roles and industries."
        />
        
        <div className="max-w-xs sm:max-w-md md:max-w-5xl mx-auto mb-12 md:mb-16">
          <GlassCard className="border-0 shadow-xl">
            <div className="p-4 md:p-6">
              <div className="flex items-center mb-3 md:mb-6">
                <Briefcase className="h-6 w-6 md:h-8 md:w-8 text-voltify-600 mr-2 md:mr-3" />
                <h3 className="text-lg md:text-xl font-semibold text-stone-900">Positions We Place</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {positions.map((position, index) => (
                  <div 
                    key={index} 
                    className="bg-white px-2 py-1 md:px-3 md:py-1.5 rounded-full text-xs md:text-sm border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300 hover:border-voltify-300 text-stone-700 hover:text-voltify-700 whitespace-nowrap"
                  >
                    {position}
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {additionalServices.map((service, index) => (
            <GlassCard 
              key={index}
              className={`opacity-0 animate-fade-in-up animate-fill-forwards`}
              animationDelay={`${index * 100 + 200}ms`}
            >
              <div className="flex flex-col h-full">
                <div className="rounded-full w-12 h-12 bg-voltify-100 flex items-center justify-center mb-4">
                  {service.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-stone-900">{service.title}</h3>
                <p className="text-stone-600 text-sm">{service.description}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
