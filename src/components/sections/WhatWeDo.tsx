import { GlassCard } from '../ui/GlassCard';
import { 
  Briefcase, CheckCircle, Lightbulb, CreditCard, Zap, Database, Heart, BarChart3, Microscope,
  Users, Code, Server, Shield, Globe, LineChart, Cpu, ChevronRight, Monitor, Layout, PieChart, UserCog,
  ChevronLeft
} from 'lucide-react';
import { useState } from 'react';

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
      icon: <CreditCard className="h-8 w-8 text-voltify-600" />,
      title: 'Pay Only When Hired',
      description: 'Clients pay only when the hire starts, ensuring satisfaction with our placements.'
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-voltify-600" />,
      title: 'Reference & Background Checks',
      description: 'We handle comprehensive reference and background checks for all candidates.'
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-voltify-600" />,
      title: 'Coaching & Training',
      description: 'We provide coaching and training to help candidates succeed in their new roles.'
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
    <section 
      id="what-we-do" 
      className="py-16 md:py-24 white-brick-bg relative overflow-hidden"
    >
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
        <div className="max-w-5xl mx-auto mb-12">
          <GlassCard className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
            <div className="p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-semibold mb-4 text-stone-900 text-center">
                Specialized Placement Across Industries
              </h3>
              <p className="text-lg text-stone-900 mb-8 text-center">
                Voltify provides placements of <span className="text-voltify-500 font-semibold">highly qualified, fully screened professionals</span> across various roles and specialized industry sectors.
              </p>
              
              <h4 className="text-lg font-semibold mb-4 text-stone-900 text-center">Your Path to the Perfect Role</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-voltify-200 flex items-center justify-center mb-3">
                    <span className="text-voltify-500 font-bold text-lg">1</span>
                  </div>
                  <h5 className="font-semibold text-stone-900 mb-2">Initial Consultation</h5>
                  <p className="text-stone-900 text-sm">We discuss your skills, experience, and career goals to understand your unique qualifications.</p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-voltify-200 flex items-center justify-center mb-3">
                    <span className="text-voltify-500 font-bold text-lg">2</span>
                  </div>
                  <h5 className="font-semibold text-stone-900 mb-2">Matching & Preparation</h5>
                  <p className="text-stone-900 text-sm">We match you with suitable opportunities and prepare you for interviews with potential employers.</p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-voltify-200 flex items-center justify-center mb-3">
                    <span className="text-voltify-500 font-bold text-lg">3</span>
                  </div>
                  <h5 className="font-semibold text-stone-900 mb-2">Placement & Support</h5>
                  <p className="text-stone-900 text-sm">Once placed, we provide ongoing support to ensure your success in the new role.</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
        
        {/* Industries Banner */}
        <div className="relative py-24 md:py-32 my-12 md:my-16 overflow-hidden w-screen -ml-[50vw] left-1/2 min-h-[500px] md:min-h-[500px] flex items-center justify-center bg-[position:calc(50%+400px)_30%] md:bg-[position:center_30%]" 
          style={{
            backgroundImage: 'url("/images/lightbulb.jpg")',
            backgroundSize: 'cover'
          }}>
          {/* Semi-transparent overlay with stronger opacity on mobile */}
          <div className="absolute inset-0 bg-black/60 md:bg-black/50"></div>
          
          {/* Content container with increased padding on mobile */}
          <div className="relative z-10 container mx-auto px-6 sm:px-6 lg:px-8 py-8 md:py-0">
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between">
              {/* Left side - Main heading */}
              <div className="md:w-1/2 mb-10 md:mb-0 md:pr-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-md">Powering Industries Forward</h2>
    
              </div>
              
              {/* Right side - Industries list */}
              <div className="md:w-1/2 md:pl-10">
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-6 text-center md:text-left">Industries We Specialize In</h3>
                
                <div className="space-y-3 max-w-md mx-auto md:mx-0">
                  {sectors.map((sector, index) => (
                    <div 
                      key={index}
                      className="opacity-0 animate-fade-in-up animate-fill-forwards bg-white/20 backdrop-blur-sm rounded-lg shadow-md p-3 flex items-center"
                      style={{animationDelay: `${index * 100}ms`}}
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-voltify-50 flex items-center justify-center mr-3">
                        {sector.icon}
                      </div>
                      <h4 className="font-semibold text-white text-base">{sector.name}</h4>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Positions We Place - Enhanced with icons and categories */}
        <div className="max-w-5xl mx-auto my-16">
          <GlassCard className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
            <div className="p-6 md:p-8">
              <div className="flex items-center mb-6">
                <Briefcase className="h-8 w-8 text-voltify-600 mr-3" />
                <h3 className="text-xl font-semibold text-stone-900">Positions We Place</h3>
              </div>
              
              {/* Mobile view - dropdown/accordion style */}
              <div className="block md:hidden">
                <details className="mb-3">
                  <summary className="flex items-center cursor-pointer p-2 bg-voltify-50/50 rounded-lg">
                    <Users className="h-5 w-5 text-voltify-600 mr-2" />
                    <span className="font-semibold text-stone-900">Leadership & Management</span>
                  </summary>
                  <div className="pl-7 pt-2 pb-1">
                    <p className="text-sm text-stone-700">CIO, CTO, VP, Director, Manager of IT, Manager of HR, Manager of Sales</p>
                  </div>
                </details>
                
                <details className="mb-3">
                  <summary className="flex items-center cursor-pointer p-2 bg-voltify-50/50 rounded-lg">
                    <Briefcase className="h-5 w-5 text-voltify-600 mr-2" />
                    <span className="font-semibold text-stone-900">Project Management</span>
                  </summary>
                  <div className="pl-7 pt-2 pb-1">
                    <p className="text-sm text-stone-700">Project Managers, Business Analyst</p>
                  </div>
                </details>
                
                <details className="mb-3">
                  <summary className="flex items-center cursor-pointer p-2 bg-voltify-50/50 rounded-lg">
                    <Cpu className="h-5 w-5 text-voltify-600 mr-2" />
                    <span className="font-semibold text-stone-900">Engineering</span>
                  </summary>
                  <div className="pl-7 pt-2 pb-1">
                    <p className="text-sm text-stone-700">AI Engineers, Machine Learning Engineers, Robotics Engineer, Software Developers</p>
                  </div>
                </details>
                
                <details className="mb-3">
                  <summary className="flex items-center cursor-pointer p-2 bg-voltify-50/50 rounded-lg">
                    <Server className="h-5 w-5 text-voltify-600 mr-2" />
                    <span className="font-semibold text-stone-900">Infrastructure</span>
                  </summary>
                  <div className="pl-7 pt-2 pb-1">
                    <p className="text-sm text-stone-700">Network Administrators, Systems Administrators, Data Warehouse, Information Security</p>
                  </div>
                </details>
                
                <details className="mb-3">
                  <summary className="flex items-center cursor-pointer p-2 bg-voltify-50/50 rounded-lg">
                    <Layout className="h-5 w-5 text-voltify-600 mr-2" />
                    <span className="font-semibold text-stone-900">Web & Design</span>
                  </summary>
                  <div className="pl-7 pt-2 pb-1">
                    <p className="text-sm text-stone-700">Web Developers, Web Designers</p>
                  </div>
                </details>
                
                <details className="mb-3">
                  <summary className="flex items-center cursor-pointer p-2 bg-voltify-50/50 rounded-lg">
                    <PieChart className="h-5 w-5 text-voltify-600 mr-2" />
                    <span className="font-semibold text-stone-900">Analytics & Marketing</span>
                  </summary>
                  <div className="pl-7 pt-2 pb-1">
                    <p className="text-sm text-stone-700">QA, BI, Marketing Managers</p>
                  </div>
                </details>
              </div>
              
              {/* Desktop view - grid layout */}
              <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {positionGroups.map((group, groupIndex) => (
                  <div key={groupIndex} className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="flex items-center mb-3">
                      {group.icon}
                      <h4 className="ml-2 font-semibold text-stone-900">{group.category}</h4>
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
        
        {/* Additional Services - 2x1 grid layout */}
        <div className="max-w-5xl mx-auto mb-12">
          {/* Top service - Pay Only When Hired */}
          <GlassCard 
            key="top-service"
            className="opacity-0 animate-fade-in-up animate-fill-forwards mb-3 sm:mb-6 bg-white/90 backdrop-blur-sm"
            animationDelay="300ms"
          >
            <div className="p-4 sm:p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-voltify-50 mb-2 sm:mb-4 mx-auto">
                {additionalServices[0].icon}
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 text-stone-900">{additionalServices[0].title}</h3>
              <p className="text-stone-900 text-sm sm:text-base max-w-lg mx-auto">{additionalServices[0].description}</p>
            </div>
          </GlassCard>
          
          {/* Bottom row - two services side by side */}
          <div className="grid grid-cols-2 gap-3 sm:gap-6">
            {additionalServices.slice(1).map((service, index) => (
              <GlassCard 
                key={index + 1}
                className={`opacity-0 animate-fade-in-up animate-fill-forwards bg-white/80 backdrop-blur-sm`}
                animationDelay={`${(index + 4) * 100}ms`}
              >
                <div className="p-3 sm:p-6 text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-voltify-50 mb-2 sm:mb-4 mx-auto">
                    {service.icon}
                  </div>
                  <h3 className="text-sm sm:text-lg font-semibold mb-1 sm:mb-2 text-stone-900">{service.title}</h3>
                  <p className="text-stone-900 text-xs sm:text-base">{service.description}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
