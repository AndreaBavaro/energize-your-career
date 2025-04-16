import { SectionHeading } from '../ui/SectionHeading';
import { GlassCard } from '../ui/GlassCard';
import { BookOpen, Award, Heart, Lightbulb, Star, Users } from 'lucide-react';

export default function OurStory() {
  return (
    <section id="our-story" className="py-24 white-brick-bg relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-alternative-50 rounded-full filter blur-3xl opacity-30"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <SectionHeading 
          title="Our Story"
          subtitle="The journey behind Voltify Group and our commitment to transforming careers and organizations."
        />
        
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-10">
            <h3 className="text-2xl font-bold text-black mb-6 text-center">The Voltify Group Journey</h3>
            
            <div className="space-y-6">
              <p className="text-lg text-stone-700 leading-relaxed">
                The founder of Voltify Group brings over <span className="font-bold text-black">two decades of expertise</span> in the technology and professional staffing industry. Throughout her distinguished career, she has partnered with a diverse range of clients—from innovative startups to Fortune 500 corporations—delivering exceptional talent solutions tailored to their unique needs.
              </p>
              
              <p className="text-lg text-black leading-relaxed">
                As the visionary co-founder of our parent company, she has established a proven track record of identifying and placing high-caliber professionals across various specialized roles. Her deep industry knowledge and commitment to excellence have been the cornerstone of our success in building lasting relationships with both clients and candidates.
              </p>
              
              <p className="text-lg text-black leading-relaxed font-medium italic text-center py-4 border-y border-alternative-300/80">
                "She has had the privilege of helping hundreds of individuals transform their careers and enhance their lives—and that's what continues to drive and inspire us every day!"
              </p>
              
              {/* Video showcasing the Voltify journey */}
              <div className="mt-8">
                <video 
                  src="/images/helpingvid.mp4" 
                  autoPlay
                  muted
                  loop
                  poster="/images/helping-poster.jpg"
                  aria-label="Voltify's impact on careers and organizations" 
                  className="w-full h-96 rounded-lg shadow-md object-cover"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
          
          {/* Mobile view: 2x1 grid (first card on top, other two below) */}
          <div className="md:hidden mb-10">
            {/* Top row - Industry Expertise */}
            <GlassCard className="p-6 text-center mb-4">
              <div className="rounded-full w-16 h-16 bg-alternative-100 flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-alternative-600" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-3">Industry Expertise</h3>
              <p className="text-stone-600">
                Two decades of specialized experience in technology and professional staffing across diverse industries.
              </p>
            </GlassCard>
            
            {/* Bottom row - 2 cards side by side */}
            <div className="grid grid-cols-2 gap-4">
              <GlassCard className="p-4 text-center">
                <div className="rounded-full w-12 h-12 bg-alternative-600 flex items-center justify-center mx-auto mb-3">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-base font-bold text-stone-900 mb-2">Proven Success</h3>
                <p className="text-stone-600 text-xs">
                  A track record of excellence in matching exceptional talent with organizations that value their skills.
                </p>
              </GlassCard>
              
              <GlassCard className="p-4 text-center">
                <div className="rounded-full w-12 h-12 bg-alternative-600 flex items-center justify-center mx-auto mb-3">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-base font-bold text-stone-900 mb-2">Meaningful Impact</h3>
                <p className="text-stone-600 text-xs">
                  Dedicated to transforming careers and creating positive change in the lives of hundreds of professionals.
                </p>
              </GlassCard>
            </div>
          </div>
          
          {/* Desktop view: 3 cards in a row */}
          <div className="hidden md:grid grid-cols-3 gap-6 mb-10">
            <GlassCard className="p-6 text-center">
              <div className="rounded-full w-16 h-16 bg-alternative-600 flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-3">Industry Expertise</h3>
              <p className="text-stone-600">
                Two decades of specialized experience in technology and professional staffing across diverse industries.
              </p>
            </GlassCard>
            
            <GlassCard className="p-6 text-center">
              <div className="rounded-full w-16 h-16 bg-alternative-600 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-3">Proven Success</h3>
              <p className="text-stone-600">
                A track record of excellence in matching exceptional talent with organizations that value their skills.
              </p>
            </GlassCard>
            
            <GlassCard className="p-6 text-center">
              <div className="rounded-full w-16 h-16 bg-alternative-600 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-3">Meaningful Impact</h3>
              <p className="text-stone-600">
                Dedicated to transforming careers and creating positive change in the lives of hundreds of professionals.
              </p>
            </GlassCard>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-inner">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Lightbulb className="h-6 w-6 text-alternative-600" />
              <h3 className="text-xl font-bold text-black">The Voltify Group Philosophy</h3>
            </div>
            <p className="text-center text-black max-w-3xl mx-auto">
              True to the meaning of our name – Voltify – our mission is clear: to energize careers, 
              build lasting relationships, connect you with opportunities, and help you grow, all supported 
              by a positive mindset that leads to success.
            </p>
            
            <div className="mt-6 flex justify-center">
              <img 
                src={`${import.meta.env.BASE_URL}images/women2.jpg`}
                alt="Voltify Group professionals helping clients advance their careers" 
                className="rounded-lg shadow-md w-full max-w-4xl h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}