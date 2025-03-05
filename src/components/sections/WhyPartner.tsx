import { SectionHeading } from '../ui/SectionHeading';
import { GlassCard } from '../ui/GlassCard';
import { Trophy, Clock, CheckCircle, Handshake, Key, MessageSquare } from 'lucide-react';

export default function WhyPartner() {
  const reasons = [
    {
      icon: <Trophy className="h-8 w-8 text-voltify-600" />,
      title: "20 Years of Experience",
      description: "Two decades of industry knowledge and staffing expertise, working with businesses of all sizes."
    },
    {
      icon: <Clock className="h-8 w-8 text-voltify-600" />,
      title: "Fast Turnaround",
      description: "Efficient processes that significantly reduce time-to-hire without sacrificing quality."
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-voltify-600" />,
      title: "Proven Track Record",
      description: "Consistent history of successful placements and satisfied clients across industries."
    },
    {
      icon: <Handshake className="h-8 w-8 text-voltify-600" />,
      title: "Transparent Approach",
      description: "Straightforward fee structure with no hidden costs, only pay when the hire starts."
    },
    {
      icon: <Key className="h-8 w-8 text-voltify-600" />,
      title: "Exclusive Opportunities",
      description: "Access to our network of pre-screened, high-caliber professionals not available elsewhere."
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-voltify-600" />,
      title: "Ongoing Support",
      description: "We maintain relationships with both clients and candidates long after placement."
    }
  ];

  return (
    <section id="why-partner" className="py-24 white-brick-bg relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-voltify-50 rounded-full filter blur-3xl opacity-30"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <SectionHeading 
          title="Why Partner With Us"
          subtitle="Experience and transparency are at the core of what sets us apart in the staffing industry."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reasons.map((reason, index) => (
            <GlassCard 
              key={index}
              className="opacity-0 animate-fade-in-up animate-fill-forwards"
              animationDelay={`${index * 100 + 200}ms`}
            >
              <div className="flex flex-col h-full">
                <div className="rounded-full w-16 h-16 bg-voltify-50 flex items-center justify-center mb-5">
                  {reason.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-stone-900">{reason.title}</h3>
                <p className="text-stone-600">{reason.description}</p>
              </div>
            </GlassCard>
          ))}
        </div>
        
        <div className="mt-16 bg-voltify-600 rounded-2xl p-8 md:p-12 text-white max-w-4xl mx-auto shadow-xl">
          <h3 className="text-2xl font-bold mb-6 text-center">Our Commitment to Excellence</h3>
          <p className="text-lg mb-6 text-voltify-50">
            With 20 years of experience in the staffing industry, our commitment to excellence and proven track record 
            are the key factors that have driven our success and set us apart.
          </p>
          <p className="text-lg text-voltify-50">
            We understand that finding the right talent is crucial for your organization's success. That's why we take 
            the time to understand your unique needs and culture, ensuring we deliver candidates who not only have the 
            right skills but will also thrive within your team.
          </p>
        </div>
      </div>
    </section>
  );
}
