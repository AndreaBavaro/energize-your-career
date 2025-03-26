import { SectionHeading } from '../ui/SectionHeading';
import { Zap, Database, Heart, CreditCard, Microscope, BarChart3 } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

export default function Sectors() {
  const sectors = [
    {
      icon: <Zap className="h-8 w-8 text-white" />,
      name: 'Energy',
    },
    {
      icon: <Database className="h-8 w-8 text-white" />,
      name: 'Information Technology',
    },
    {
      icon: <Heart className="h-8 w-8 text-alternative-600" />,
      name: 'Human Resources',
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-alternative-600" />,
      name: 'Marketing',
    },
    {
      icon: <CreditCard className="h-8 w-8 text-alternative-600" />,
      name: 'Financial Services',
    },
    {
      icon: <Microscope className="h-8 w-8 text-alternative-600" />,
      name: 'Life Science',
    },
    {
      icon: <CreditCard className="h-8 w-8 text-alternative-600" />,
      name: 'FinTech',
    },
  ];

  const positions = [
    'CIO', 'CTO', 'VP', 'Director', 'Manager of IT', 'Manager of HR', 
    'Manager of Sales', 'Project Managers', 'Business Analyst', 'AI Engineers', 
    'Machine Learning Engineers', 'Robotics Engineer', 'Software Developers', 
    'Network Administrators', 'Systems Administrators', 'Data Warehouse', 
    'Information Security', 'Web Developers', 'Web Designers', 'QA', 
    'BI', 'Marketing Managers'
  ];

  return (
    <section id="sectors" className="py-24 white-brick-bg relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-alternative-600 rounded-full filter blur-3xl opacity-40 transform translate-x-1/4 -translate-y-1/4"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <SectionHeading 
          title="The Sectors We Serve"
          subtitle="We provide specialized staffing solutions across a diverse range of industries."
        />
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-20">
          {sectors.map((sector, index) => (
            <GlassCard 
              key={index}
              className="opacity-0 animate-fade-in-up animate-fill-forwards"
              animationDelay={`${index * 100}ms`}
            >
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-alternative-600 mb-4 mx-auto">
                  {sector.icon}
                </div>
                <h3 className="font-semibold text-stone-900">{sector.name}</h3>
              </div>
            </GlassCard>
          ))}
        </div>
        
        <div className="bg-alternative-600 backdrop-blur-sm rounded-2xl p-8 md:p-12 max-w-5xl mx-auto shadow-md">
          <h3 className="text-2xl font-bold mb-8 text-center text-stone-900">Positions We Place</h3>
          
          <div className="flex flex-wrap justify-center gap-3">
            {positions.map((position, index) => (
              <span 
                key={index}
                className="px-4 py-2 bg-white/80 backdrop-blur-sm text-stone-800 rounded-full shadow-sm text-sm font-medium transition-all duration-300 hover:shadow-md hover:bg-alternative-100"
              >
                {position}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
