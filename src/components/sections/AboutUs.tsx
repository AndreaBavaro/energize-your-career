import { SectionHeading } from '../ui/SectionHeading';
import { GlassCard } from '../ui/GlassCard';
import { CheckCircle, Users, History, Trophy } from 'lucide-react';
import CharityBanner from '../ui/CharityBanner';

export default function AboutUs() {
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
    <section id="our-story" className="py-24 white-brick-bg relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-voltify-100 rounded-full filter blur-3xl opacity-40 transform translate-x-1/4 -translate-y-1/4"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <SectionHeading 
          title="Who We Are"
          subtitle="Voltify is a women-owned staffing solutions business built on a solid foundation of industry expertise. (Subsidiary of Ban Partners founded in 2005)"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <p className="text-lg text-stone-700">
                We partner with the Human Resources departments of organizations in the U.S. to meet the staffing needs of the Information Technology, Human Resources, and professional communities, including executive-level roles and leadership positions. We have built an excellent reputation for delivering quality results efficiently.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <p className="text-lg text-stone-700">
                We believe in a more tailored approach to staffing and recruitment, treating every candidate and client with the same respect and consideration we would expect ourselves.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <p className="text-lg text-stone-700">
                Our founder's 20 years of experience serving small and Fortune 500 businesses has helped hundreds of individuals improve their careers and lives through personalized placement services.
              </p>
            </div>
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
        
        {/* Charity Banner */}
        <div className="mt-12">
          <CharityBanner />
        </div>
      </div>
    </section>
  );
}
