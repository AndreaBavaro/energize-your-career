import { GlassCard } from '../ui/GlassCard';
import { 
  Briefcase, CheckCircle, Lightbulb, CreditCard, Zap, Database, Heart, BarChart3, Microscope,
  Users, Code, Server, Shield, Globe, LineChart, Cpu, ChevronRight, Monitor, Layout, PieChart, UserCog
} from 'lucide-react';
import CharityBanner from '../ui/CharityBanner';

export default function WhatWeDo() {
  // List of positions we place
  const positions = [
    'CIO', 'CTO', 'VP', 'Director', 'Manager of IT', 'Manager of HR', 'Manager of Sales',
    'Project Managers', 'Business Analyst', 'AI Engineers', 'Machine Learning Engineers',
    'Robotics Engineer', 'Software Developers', 'Network Administrators', 'Systems Administrators',
    'Data Warehouse', 'Information Security', 'Web Developers', 'Web Designers', 'QA', 'BI', 'Marketing Managers'
  ];

  // Industry sectors we serve
  const sectors = [
    {
      icon: <Zap className="h-8 w-8 text-voltify-600" />,
      name: 'Energy',
    },
    {
      icon: <Database className="h-8 w-8 text-voltify-600" />,
      name: 'Information Technology',
    },
    {
      icon: <Heart className="h-8 w-8 text-voltify-600" />,
      name: 'Human Resources',
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-voltify-600" />,
      name: 'Marketing',
    },
    {
      icon: <CreditCard className="h-8 w-8 text-voltify-600" />,
      name: 'Financial Services',
    },
    {
      icon: <Microscope className="h-8 w-8 text-voltify-600" />,
      name: 'Life Science',
    },
    {
      icon: <CreditCard className="h-8 w-8 text-voltify-600" />,
      name: 'FinTech',
    },
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

  // List of positions we place with icons
  const positionGroups = [
    {
      category: "Leadership",
      icon: <Users className="h-6 w-6 text-voltify-600" />,
      positions: ['CIO', 'CTO', 'VP', 'Director', 'Manager of IT', 'Manager of HR', 'Manager of Sales']
    },
    {
      category: "Project Management",
      icon: <Briefcase className="h-6 w-6 text-voltify-600" />,
      positions: ['Project Managers', 'Business Analyst']
    },
    {
      category: "Engineering",
      icon: <Cpu className="h-6 w-6 text-voltify-600" />,
      positions: ['AI Engineers', 'Machine Learning Engineers', 'Robotics Engineer', 'Software Developers']
    },
    {
      category: "Infrastructure",
      icon: <Server className="h-6 w-6 text-voltify-600" />,
      positions: ['Network Administrators', 'Systems Administrators', 'Data Warehouse', 'Information Security']
    },
    {
      category: "Web & Design",
      icon: <Layout className="h-6 w-6 text-voltify-600" />,
      positions: ['Web Developers', 'Web Designers']
    },
    {
      category: "Analytics & Marketing",
      icon: <PieChart className="h-6 w-6 text-voltify-600" />,
      positions: ['QA', 'BI', 'Marketing Managers']
    }
  ];

  return (
    <section id="what-we-do" className="py-16 md:py-24 white-brick-bg relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-voltify-50 rounded-full filter blur-3xl opacity-30 transform -translate-x-1/4"></div>
        <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-voltify-100 rounded-full filter blur-3xl opacity-20 transform translate-x-1/4"></div>
      </div>
      
      <div className="container-custom relative z-10">
        {/* Enhanced heading that combines both sections */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-stone-900">
            What We Do
          </h2>
        </div>
        
        {/* Bubble with specialized placement text and steps */}
        <div className="max-w-5xl mx-auto mb-16">
          <GlassCard className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
            <div className="p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-semibold mb-4 text-stone-800 text-center">
                Specialized Placement Across Industries
              </h3>
              <p className="text-lg text-stone-600 mb-8 text-center">
                Voltify provides placements of <span className="text-voltify-700 font-semibold">highly qualified, fully screened professionals</span> across various roles and specialized industry sectors.
              </p>
              
              <h4 className="text-lg font-semibold mb-4 text-stone-800 text-center">Your Path to the Perfect Role</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-voltify-100 flex items-center justify-center mb-3">
                    <span className="text-voltify-700 font-bold text-lg">1</span>
                  </div>
                  <h5 className="font-semibold text-stone-800 mb-2">Initial Consultation</h5>
                  <p className="text-stone-600 text-sm">We discuss your skills, experience, and career goals to understand your unique qualifications.</p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-voltify-100 flex items-center justify-center mb-3">
                    <span className="text-voltify-700 font-bold text-lg">2</span>
                  </div>
                  <h5 className="font-semibold text-stone-800 mb-2">Matching & Preparation</h5>
                  <p className="text-stone-600 text-sm">We match you with suitable opportunities and prepare you for interviews with potential employers.</p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-voltify-100 flex items-center justify-center mb-3">
                    <span className="text-voltify-700 font-bold text-lg">3</span>
                  </div>
                  <h5 className="font-semibold text-stone-800 mb-2">Placement & Support</h5>
                  <p className="text-stone-600 text-sm">Once placed, we provide ongoing support to ensure your success in the new role.</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
        
        {/* Industry Sectors Grid */}
        <div id="sectors" className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center text-stone-900">Industries We Serve</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 md:gap-6">
            {sectors.map((sector, index) => (
              <GlassCard 
                key={index}
                className="opacity-0 animate-fade-in-up animate-fill-forwards"
                animationDelay={`${index * 100}ms`}
              >
                <div className="text-center p-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-voltify-50 mb-3 mx-auto">
                    {sector.icon}
                  </div>
                  <h3 className="font-semibold text-stone-900 text-sm md:text-base">{sector.name}</h3>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
        
        {/* Positions We Place - Enhanced with icons and categories */}
        <div className="max-w-5xl mx-auto mb-16">
          <GlassCard className="border-0 shadow-xl">
            <div className="p-6 md:p-8">
              <div className="flex items-center mb-6">
                <Briefcase className="h-8 w-8 text-voltify-600 mr-3" />
                <h3 className="text-xl font-semibold text-stone-900">Positions We Place</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {positionGroups.map((group, groupIndex) => (
                  <div key={groupIndex} className="bg-white/50 backdrop-blur-sm rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="flex items-center mb-3">
                      {group.icon}
                      <h4 className="ml-2 font-semibold text-stone-800">{group.category}</h4>
                    </div>
                    <ul className="space-y-1">
                      {group.positions.map((position, posIndex) => (
                        <li key={posIndex} className="flex items-center text-stone-700 text-sm">
                          <ChevronRight className="h-4 w-4 text-voltify-500 mr-1 flex-shrink-0" />
                          <span>{position}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>
        
        {/* Additional Services */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {additionalServices.map((service, index) => (
            <GlassCard 
              key={index}
              className={`opacity-0 animate-fade-in-up animate-fill-forwards`}
              animationDelay={`${(index + 3) * 100}ms`}
            >
              <div className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-voltify-50 mb-4 mx-auto">
                  {service.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-stone-900">{service.title}</h3>
                <p className="text-stone-600">{service.description}</p>
              </div>
            </GlassCard>
          ))}
        </div>
        
        {/* Charity Banner */}
        <CharityBanner />
      </div>
    </section>
  );
}
