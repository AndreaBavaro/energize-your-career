import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { Heart, Users, Calendar, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Charity() {
  // Sample charity initiatives
  const initiatives = [
    {
      title: "Women in Tech Scholarship",
      description: "Supporting women pursuing careers in technology through educational scholarships and mentorship opportunities.",
      icon: <Sparkles className="h-10 w-10 text-voltify-500" />,
      date: "Ongoing",
      impact: "Funded 12 scholarships in 2024"
    },
    {
      title: "Career Readiness Workshops",
      description: "Free workshops for underserved communities focusing on resume building, interview skills, and professional development.",
      icon: <Users className="h-10 w-10 text-voltify-500" />,
      date: "Monthly",
      impact: "Helped 200+ individuals in 2024"
    },
    {
      title: "Community Job Fair",
      description: "Annual job fair connecting local businesses with job seekers from disadvantaged backgrounds.",
      icon: <Calendar className="h-10 w-10 text-voltify-500" />,
      date: "September 2025",
      impact: "Connected 150 candidates with employers in 2024"
    }
  ];

  // Upcoming volunteer opportunities
  const volunteerOpportunities = [
    {
      title: "Resume Review Day",
      date: "March 20, 2025",
      location: "Downtown Community Center",
      description: "Help job seekers polish their resumes and prepare for interviews."
    },
    {
      title: "Career Mentorship Program",
      date: "Ongoing",
      location: "Virtual",
      description: "Provide guidance to individuals starting their careers or making career transitions."
    },
    {
      title: "Skills Workshop Facilitator",
      date: "April 15, 2025",
      location: "Voltify Headquarters",
      description: "Lead a workshop on your area of expertise to help job seekers develop valuable skills."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow relative">
        {/* Hero Section */}
        <section className="py-16 md:py-24 white-brick-bg relative">
          <div className="absolute inset-0 z-0">
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-voltify-50 rounded-full filter blur-3xl opacity-30 transform translate-x-1/4"></div>
          </div>
          
          <div className="container-custom relative z-10">
            <SectionHeading 
              title="Our Charitable Initiatives"
              subtitle="At Voltify, we believe in giving back to the community and creating opportunities for everyone to succeed."
            />
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              {initiatives.map((initiative, index) => (
                <GlassCard key={index} className="p-8 flex flex-col h-full">
                  <div className="mb-6">{initiative.icon}</div>
                  <h3 className="text-xl font-bold text-stone-900 mb-3">{initiative.title}</h3>
                  <p className="text-stone-600 mb-6 flex-grow">{initiative.description}</p>
                  <div className="mt-auto">
                    <div className="flex items-center justify-between text-sm text-stone-500 border-t border-stone-200 pt-4 mt-4">
                      <span><Calendar className="inline h-4 w-4 mr-1" /> {initiative.date}</span>
                      <span><Heart className="inline h-4 w-4 mr-1 text-voltify-500" /> {initiative.impact}</span>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-16 bg-stone-50">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-6">Our Commitment to Community</h2>
              <p className="text-lg text-stone-600 mb-8">
                We believe that everyone deserves access to career opportunities regardless of their background. 
                Our charitable initiatives focus on breaking down barriers to employment and creating pathways to 
                successful careers for underrepresented groups.
              </p>
              <div className="flex justify-center">
                <Heart className="h-16 w-16 text-voltify-500" />
              </div>
            </div>
          </div>
        </section>

        {/* Volunteer Opportunities */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container-custom">
            <SectionHeading 
              title="Volunteer Opportunities"
              subtitle="Join us in making a difference by volunteering your time and expertise."
            />
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {volunteerOpportunities.map((opportunity, index) => (
                <div key={index} className="bg-stone-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-stone-100">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-stone-900 mb-2">{opportunity.title}</h3>
                    <div className="flex items-center text-sm text-stone-500 mb-4">
                      <Calendar className="h-4 w-4 mr-1.5" />
                      <span className="mr-3">{opportunity.date}</span>
                      <span>{opportunity.location}</span>
                    </div>
                    <p className="text-stone-600 mb-4">{opportunity.description}</p>
                    <Button variant="outline" className="w-full justify-between">
                      <span>Learn More</span>
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-stone-100">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-stone-900 mb-4">Get Involved</h2>
              <p className="text-lg text-stone-600 mb-8">
                Interested in supporting our charitable initiatives or volunteering? 
                We'd love to hear from you!
              </p>
              <Button size="lg" className="bg-voltify-600 hover:bg-voltify-700">
                Contact Our Charity Team
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
