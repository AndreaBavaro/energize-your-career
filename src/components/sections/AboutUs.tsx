import { useState } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { GlassCard } from '../ui/GlassCard';
import { CheckCircle, Users, History, Trophy, ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatedText } from '../ui/AnimatedText';

// City skylines (moved from Hero component)
const cities = [
  {
    name: "Boston",
    image: "/lovable-uploads/07c248d8-4002-45cf-b24f-339ef7c321eb.png",
    position: "bg-center"
  },
  {
    name: "Los Angeles",
    image: "/lovable-uploads/03aace2d-574d-4292-a524-5b760748ade9.png",
    position: "bg-center"
  },
  {
    name: "New York",
    image: "/lovable-uploads/45016fe7-27c2-40eb-95ff-1f2f9f2f71d2.png", 
    position: "bg-center"
  }
];

export default function AboutUs() {
  const [currentCityIndex, setCurrentCityIndex] = useState(0);
  
  const nextCity = () => {
    setCurrentCityIndex((prevIndex) => (prevIndex + 1) % cities.length);
  };
  
  const prevCity = () => {
    setCurrentCityIndex((prevIndex) => (prevIndex - 1 + cities.length) % cities.length);
  };

  const features = [
    {
      icon: <Users className="h-6 w-6 text-voltify-600" />,
      title: 'Women-Owned Business',
      description: 'A subsidiary of Ban Partners founded in 2005, we bring decades of industry expertise to every engagement.'
    },
    {
      icon: <History className="h-6 w-6 text-voltify-600" />,
      title: '20+ Years of Experience',
      description: 'Our founders have over two decades of experience in the technology and professional staffing industry.'
    },
    {
      icon: <Trophy className="h-6 w-6 text-voltify-600" />,
      title: 'Proven Track Record',
      description: "We've helped hundreds of professionals improve their careers and organizations find their perfect match."
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-voltify-600" />,
      title: 'Tailored Approach',
      description: 'We believe in personalized recruitment, treating every candidate and client with respect and consideration.'
    },
  ];

  return (
    <section id="about-us" className="py-24 white-brick-bg relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-voltify-100 rounded-full filter blur-3xl opacity-40 transform translate-x-1/4 -translate-y-1/4"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <SectionHeading 
          title="Who We Are"
          subtitle="Voltify is a women-owned staffing solutions business built on a solid foundation of industry expertise and decades of experience."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          <div className="space-y-8">
            <AnimatedText 
              text="We partner with Human Resources departments of organizations in the U.S. to meet staffing needs across Information Technology, Human Resources, and professional communities."
              className="text-lg text-stone-700"
              animation="slide-in-left"
            />
            
            <AnimatedText 
              text="We specialize in placing candidates in roles from executive-level positions to technical specialists, building a reputation for quality results delivered efficiently."
              className="text-lg text-stone-700"
              animation="slide-in-left"
              delay={200}
            />
            
            <AnimatedText 
              text="Our founder's 20 years of experience serving small businesses and Fortune 500 companies has helped hundreds of individuals improve their careers and lives."
              className="text-lg text-stone-700"
              animation="slide-in-left"
              delay={400}
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <GlassCard 
                key={index}
                className={`opacity-0 animate-fade-in-up animate-fill-forwards`}
                animationDelay={`${index * 100 + 200}ms`}
              >
                <div className="flex flex-col h-full">
                  <div className="rounded-full w-12 h-12 bg-voltify-100 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-stone-900">{feature.title}</h3>
                  <p className="text-stone-600 text-sm">{feature.description}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
        
        {/* Cities We Serve */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center mb-10">Cities We Serve</h3>
          
          <div className="relative max-w-5xl mx-auto h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-xl">
            {/* City Images */}
            {cities.map((city, index) => (
              <div 
                key={city.name}
                className={`absolute inset-0 transition-opacity duration-1000 bg-cover ${city.position} ${
                  index === currentCityIndex ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  backgroundImage: `url(${city.image})`,
                }}
              />
            ))}
            
            {/* City Name */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full font-medium">
              {cities[currentCityIndex].name}
            </div>
            
            {/* Navigation Controls */}
            <button 
              onClick={prevCity}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-300"
              aria-label="Previous city"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <button 
              onClick={nextCity}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-300"
              aria-label="Next city"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
