import { SectionHeading } from '../ui/SectionHeading';
import { GlassCard } from '../ui/GlassCard';
import { CheckCircle, Users, History, Trophy, Briefcase, Heart, Award } from 'lucide-react';

export default function AboutUs() {
  const features = [
    {
      icon: <Users className="h-6 w-6 text-white" />,
      title: 'Women-Owned Business',
      description: 'Founded in 2005, we bring decades of industry expertise to every engagement.'
    },
    {
      icon: <History className="h-6 w-6 text-white" />,
      title: '20+ Years of Experience',
      description: 'Our founder has over two decades of experience in the technology and professional staffing industry.'
    },
    {
      icon: <Trophy className="h-6 w-6 text-white" />,
      title: 'Proven Track Record',
      description: "We've helped hundreds of professionals improve their careers and organizations find their perfect match."
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-white" />,
      title: 'Tailored Approach',
      description: 'We believe in personalized recruitment, treating every candidate and client with respect and consideration.'
    },
  ];

  return (
    <section id="who-we-are" className="py-24 white-brick-bg relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-alternative-100 rounded-full filter blur-3xl opacity-40 transform translate-x-1/4 -translate-y-1/4"></div>
      </div>
      
      <div className="container-custom relative z-10">
        {/* Women-Owned Banner - moved above section heading */}
        <div className="max-w-6xl mx-auto mb-10">
          <div className="bg-gradient-to-r from-alternative-600 to-alternative-700 rounded-lg shadow-md overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center justify-between p-4 sm:p-6">
              <div className="flex items-center mb-4 sm:mb-0">
                <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full mr-4">
                  <Users className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Proudly Women-Owned & Operated</h3>
                  <p className="text-white/90 max-w-xl">
                    Founded by industry veterans with over 20 years of experience serving small and Fortune 500 businesses.
                  </p>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                <p className="text-white font-semibold text-sm">Est. 2005</p>
              </div>
            </div>
          </div>
        </div>
        
        <SectionHeading 
          title="Who We Are"
          subtitle="Voltify is a women-owned staffing solutions business built on a solid foundation of industry expertise."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-black mb-3 flex items-center">
                <Briefcase className="h-5 w-5 mr-2 text-red-500" />
                Our Approach
              </h3>
              <p className="text-lg text-stone-700 leading-relaxed">
                We partner with <span className="font-bold text-black">Human Resources departments</span> to meet staffing needs in:
              </p>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="bg-alternative-600 p-4 rounded-lg border border-alternative-100">
                  <p className="text-center font-medium text-white">Information Technology</p>
                </div>
                <div className="bg-alternative-600 p-4 rounded-lg border border-alternative-100">
                  <p className="text-center font-medium text-white">Human Resources</p>
                </div>
                <div className="bg-alternative-600 p-4 rounded-lg border border-alternative-100">
                  <p className="text-center font-medium text-white">Executive Leadership</p>
                </div>
              </div>
              <p className="mt-3 text-lg text-stone-600 leading-relaxed">
                We've built an excellent reputation for delivering quality results efficiently.
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-black mb-3 flex items-center">
                <Heart className="h-5 w-5 mr-2 text-red-500" />
                Our Values
              </h3>
              <p className="text-lg text-stone-700 leading-relaxed">
                We believe in a more <span className="font-bold text-black">tailored approach</span> to staffing and recruitment, treating every candidate and client with the same respect and consideration we would expect ourselves.
              </p>
              <div className="mt-3 flex justify-center">
                <div className="bg-alternative-600 px-4 py-2 rounded-lg border border-alternative-100 inline-block">
                  <p className="text-center italic text-white">"Respect and consideration in every interaction"</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-black mb-3 flex items-center">
                <Award className="h-5 w-5 mr-2 text-red-500" />
                Our Experience
              </h3>
              <p className="text-lg text-stone-700 leading-relaxed">
                Our founder's <span className="font-bold text-black">20 years of experience</span> serving small and Fortune 500 businesses has helped hundreds of individuals improve their careers and lives through personalized placement services.
              </p>
              <div className="mt-3 flex items-center justify-center space-x-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-alternative-600">20+</p>
                  <p className="text-sm text-stone-600">Years Experience</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-alternative-600">100s</p>
                  <p className="text-sm text-stone-600">Careers Enhanced</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-alternative-600">500+</p>
                  <p className="text-sm text-stone-600">Fortune Companies</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Features section - 2x2 grid on mobile, 2x2 on tablet/desktop */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <GlassCard 
                key={index}
                className={`opacity-0 animate-fade-in-up animate-fill-forwards`}
                animationDelay={`${index * 100 + 200}ms`}
              >
                <div className="flex flex-col h-full">
                  <div className="rounded-full w-10 h-10 sm:w-12 sm:h-12 bg-alternative-600 flex items-center justify-center mb-2 sm:mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 text-stone-900">{feature.title}</h3>
                  <p className="text-stone-600 text-xs sm:text-sm">{feature.description}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
