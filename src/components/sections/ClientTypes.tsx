import { SectionHeading } from '../ui/SectionHeading';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Users, Building } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ClientTypes() {
  const navigate = useNavigate();
  
  // Function to handle navigation to contact page
  const navigateToContact = () => {
    navigate('/contact');
  };
  
  const seekerBenefits = [
    'Expert career guidance and advice',
    'Access to exclusive job opportunities',
    'Connection with top-tier employers',
    'Interview preparation and coaching',
    'Personalized matching to ideal positions',
    'Long-term career support',
  ];

  const employerBenefits = [
    'Access to pre-screened, qualified candidates',
    'Reduced time-to-hire and recruitment costs',
    'Comprehensive candidate screening and validation',
    'Pay only when the hire starts',
    'Tailored recruitment strategies for your needs',
    'Ongoing support after placement',
  ];

  return (
    <section className="py-24 white-brick-bg">
      <div className="container-custom">
        <div id="job-seekers" className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <GlassCard className="border-0 shadow-xl" hoverEffect={false}>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-alternative-600 flex items-center justify-center mr-4">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-stone-900">For Job Seekers</h3>
                </div>
                
                <p className="text-stone-600 mb-8">
                  We listen, offer expert advice, and connect you with the right opportunities. Our long-standing relationships with top-tier employers give you access to exclusive positions.
                </p>
                
                <ul className="space-y-3 mb-8">
                  {seekerBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-alternative-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-stone-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className="w-full bg-alternative-600 hover:bg-alternative-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  onClick={navigateToContact}
                >
                  Submit Your Resume
                </Button>
              </GlassCard>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="space-y-5">
                <h2 className="text-3xl md:text-4xl font-bold text-stone-900">Find Your Dream Role</h2>
                <p className="text-xl text-stone-600">
                  We connect professionals with opportunities that match their skills, experience, and career goals.
                </p>
                <p className="text-lg text-stone-600">
                  Our personalized approach ensures you're not just another resume – we take the time to understand your unique strengths and aspirations to find the perfect match.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div id="employers" className="pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-5">
                <h2 className="text-3xl md:text-4xl font-bold text-stone-900">
                  Hire Top Talent
                </h2>
                <p className="text-xl text-stone-600">
                  Our clients rely on us to address one of their biggest challenges – gaining immediate access to top-performing talent.
                </p>
                <p className="text-lg text-stone-600">
                  By combining our extensive expertise with a deep understanding of each client's unique needs, we connect you with the most qualified candidates, ensuring a perfect fit for every role.
                </p>
              </div>
            </div>
            
            <div>
              <GlassCard className="border-0 shadow-xl" hoverEffect={false}>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-alternative-600 flex items-center justify-center mr-4">
                    <Building className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-stone-900">For Employers</h3>
                </div>
                
                <p className="text-stone-600 mb-8">
                  We provide immediate access to top-performing talent that drives success, today and into the future, with a deep understanding of your unique needs and goals.
                </p>
                
                <ul className="space-y-3 mb-8">
                  {employerBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-alternative-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-stone-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className="w-full bg-alternative-600 hover:bg-alternative-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  onClick={navigateToContact}
                >
                  Partner With Us
                </Button>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
