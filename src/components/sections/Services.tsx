import { SectionHeading } from '../ui/SectionHeading';
import { GlassCard } from '../ui/GlassCard';
import { Search, Clock, Users, Briefcase, CreditCard } from 'lucide-react';

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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="opacity-0 animate-fade-in-up animate-fill-forwards"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <GlassCard>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-voltify-100 mb-6 mx-auto">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-stone-900">{service.title}</h3>
                  <p className="text-stone-600">{service.description}</p>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-6 md:p-10 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4 text-stone-900">Additional Support</h3>
            <p className="text-stone-600">We go beyond traditional staffing services to ensure success for both candidates and employers.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-4 items-start">
                <div className="rounded-full bg-voltify-100 p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-voltify-600">
                    <path d="M2 9h18v12H2z"/>
                    <path d="M4 4h16v2"/>
                    <path d="M4 7h16"/>
                    <path d="M10 11h4"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">Reference & Background Checks</h4>
                  <p className="text-stone-600 text-sm">Thorough verification of candidate credentials, work experience, and background checks.</p>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-4 items-start">
                <div className="rounded-full bg-voltify-100 p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-voltify-600">
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">Coaching & Training</h4>
                  <p className="text-stone-600 text-sm">Professional development support for candidates to enhance their skills and career prospects.</p>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow md:col-span-2">
              <div className="flex gap-4 items-start">
                <div className="rounded-full bg-voltify-100 p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-voltify-600">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
                    <path d="m9 12 2 2 4-4"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">Risk-Free Hiring</h4>
                  <p className="text-stone-600 text-sm">Clients pay only when the hire starts, ensuring a risk-free recruitment process with guaranteed results.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
