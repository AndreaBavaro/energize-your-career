import { X, Users, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from './GlassCard';
import { useNavigate } from 'react-router-dom';

interface JobSeekerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function JobSeekerModal({ isOpen, onClose }: JobSeekerModalProps) {
  if (!isOpen) return null;
  
  const navigate = useNavigate();

  // Expanded list of benefits for mobile
  const seekerBenefits = [
    'Expert career guidance and advice',
    'Access to exclusive job opportunities',
    'Connection with top-tier employers',
    'Interview preparation and coaching',
    'Personalized matching to ideal positions',
    'Long-term career support',
  ];

  const handleContactRedirect = () => {
    onClose();
    navigate('/contact');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-xs sm:max-w-2xl max-h-[90vh] sm:max-h-[90vh] overflow-auto" 
        onClick={(e) => e.stopPropagation()}
      >
        <GlassCard className="border-0 shadow-2xl relative" hoverEffect={false}>
          <button 
            onClick={onClose}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 p-1 rounded-full bg-stone-200 hover:bg-stone-300 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5 text-stone-700" />
          </button>
          
          <div className="p-3 sm:p-6 md:p-8">
            {/* Mobile view */}
            <div className="block sm:hidden">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-voltify-100 flex items-center justify-center mr-2">
                  <Users className="h-4 w-4 text-voltify-600" />
                </div>
                <h3 className="text-lg font-bold text-stone-900">For Job Seekers</h3>
              </div>
              
              <p className="text-xs text-stone-600 mb-3">
                We listen, offer expert advice, and connect you with the right opportunities and top-tier employers for exclusive positions.
              </p>
              
              <ul className="space-y-1.5 mb-3">
                {seekerBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-3 w-3 text-voltify-500 mr-1 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-stone-700">{benefit}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mb-3">
                <h4 className="text-sm font-bold text-stone-900 mb-1.5">Find Your Dream Role</h4>
                <p className="text-xs text-stone-600">
                  We connect professionals with opportunities that match their skills, experience, and career goals.
                </p>
              </div>
              
              <div className="flex justify-center space-x-2">
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-lg shadow-md hover:shadow-lg transition-all duration-300 py-1.5 px-3"
                  onClick={handleContactRedirect}
                >
                  Submit Resume
                </Button>
              </div>
            </div>
            
            {/* Desktop view */}
            <div className="hidden sm:block">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-voltify-100 flex items-center justify-center mr-4">
                  <Users className="h-6 w-6 text-voltify-600" />
                </div>
                <h3 className="text-2xl font-bold text-stone-900">For Job Seekers</h3>
              </div>
              
              <p className="text-stone-600 mb-8">
                We listen, offer expert advice, and connect you with the right opportunities. Our long-standing relationships with top-tier employers give you access to exclusive positions.
              </p>
              
              <ul className="space-y-3 mb-8">
                {[
                  'Expert career guidance and advice',
                  'Access to exclusive job opportunities',
                  'Connection with top-tier employers',
                  'Interview preparation and coaching',
                  'Personalized matching to ideal positions',
                  'Long-term career support',
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-voltify-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-stone-700">{benefit}</span>
                  </li>
                ))}
              </ul>
              
              <div className="space-y-5 mb-8">
                <h4 className="text-xl font-bold text-stone-900">Find Your Dream Role</h4>
                <p className="text-stone-600">
                  We connect professionals with opportunities that match their skills, experience, and career goals.
                </p>
                <p className="text-stone-600">
                  Our personalized approach ensures you're not just another resume – we take the time to understand your unique strengths and aspirations to find the perfect match.
                </p>
              </div>
              
              <div className="flex justify-center md:justify-end space-x-4">
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  onClick={handleContactRedirect}
                >
                  Submit Your Resume
                </Button>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
