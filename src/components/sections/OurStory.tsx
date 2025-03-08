import { SectionHeading } from '../ui/SectionHeading';
import { GlassCard } from '../ui/GlassCard';
import { BookOpen, Award, Heart, Lightbulb } from 'lucide-react';

export default function OurStory() {
  return (
    <section id="our-story" className="py-24 white-brick-bg relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-voltify-50 rounded-full filter blur-3xl opacity-30"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <SectionHeading 
          title="Our Story"
          subtitle="The journey behind Voltify and our commitment to transforming careers and organizations."
        />
        
        <div className="max-w-5xl mx-auto">
          <div className="relative mb-16">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-voltify-100"></div>
            
            {/* Experience Point */}
            <div className="relative z-10 mb-16">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0 text-right opacity-0 animate-slide-in-left animate-fill-forwards">
                  <h3 className="text-2xl font-bold text-stone-900 mb-3">20 Years of Experience</h3>
                  <p className="text-stone-600">
                    The founder of Voltify has 20 years of experience in the technology and 
                    professional staffing industry, serving small businesses and Fortune 500 companies.
                  </p>
                </div>
                
                <div className="rounded-full w-16 h-16 bg-voltify-100 flex items-center justify-center z-10 mb-8 md:mb-0 border-4 border-white shadow-lg">
                  <BookOpen className="h-8 w-8 text-voltify-600" />
                </div>
                
                <div className="md:w-1/2 md:pl-12 opacity-0 animate-slide-in-right animate-fill-forwards animate-delay-200">
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <p className="italic text-stone-600">
                      "My journey in the staffing industry began with a simple mission: to create meaningful connections between talented professionals and organizations that value their skills."
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Co-founder Point */}
            <div className="relative z-10 mb-16">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0 text-right order-1 md:order-1 opacity-0 animate-slide-in-left animate-fill-forwards animate-delay-300">
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <p className="italic text-stone-600">
                      "As co-founder of our parent company, Ban Partners, established in 2005, 
                      I've witnessed firsthand how the right placement can transform both careers and organizations."
                    </p>
                  </div>
                </div>
                
                <div className="rounded-full w-16 h-16 bg-voltify-100 flex items-center justify-center z-10 mb-8 md:mb-0 border-4 border-white shadow-lg order-2 md:order-2">
                  <Award className="h-8 w-8 text-voltify-600" />
                </div>
                
                <div className="md:w-1/2 md:pl-12 order-3 md:order-3 opacity-0 animate-slide-in-right animate-fill-forwards animate-delay-400">
                  <h3 className="text-2xl font-bold text-stone-900 mb-3">Proven Track Record</h3>
                  <p className="text-stone-600">
                    Our founder is the co-founder of our parent company and has a proven track record 
                    of delivering high-quality talent for various roles across industries, serving small and Fortune 500 businesses.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Motivation Point */}
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0 text-right opacity-0 animate-slide-in-left animate-fill-forwards animate-delay-500">
                  <h3 className="text-2xl font-bold text-stone-900 mb-3">Our Motivation</h3>
                  <p className="text-stone-600">
                    She has had the privilege of helping hundreds of individuals improve their careers 
                    and lives – and that's what continues to motivate us every day.
                  </p>
                </div>
                
                <div className="rounded-full w-16 h-16 bg-voltify-100 flex items-center justify-center z-10 mb-8 md:mb-0 border-4 border-white shadow-lg">
                  <Heart className="h-8 w-8 text-voltify-600" />
                </div>
                
                <div className="md:w-1/2 md:pl-12 opacity-0 animate-slide-in-right animate-fill-forwards animate-delay-600">
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <p className="italic text-stone-600">
                      "There's no greater satisfaction than seeing someone thrive in a role that we helped them find. 
                      It's about more than filling positions – it's about changing lives."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-voltify-50 rounded-2xl p-8 shadow-inner mt-20">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Lightbulb className="h-6 w-6 text-voltify-600" />
              <h3 className="text-xl font-bold text-stone-900">The Voltify Philosophy</h3>
            </div>
            <p className="text-center text-stone-700 max-w-3xl mx-auto">
              True to the meaning of our name – Voltify – our mission is clear: to energize careers, 
              build lasting relationships, connect you with opportunities, and help you grow, all supported 
              by a positive mindset that leads to success.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
