import { X, Building, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from './GlassCard';
import { useNavigate } from 'react-router-dom';

interface EmployerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EmployerModal({ isOpen, onClose }: EmployerModalProps) {
  if (!isOpen) return null;
  
  const navigate = useNavigate();
  
  const employerBenefits = [
    'Access to pre-screened, qualified candidates',
    'Reduced time-to-hire and recruitment costs',
    'Comprehensive candidate screening and validation',
    'Pay only when the hire starts',
    'Tailored recruitment strategies for your needs',
    'Ongoing support after placement',
  ];

  const handleContactRedirect = () => {
    onClose();
    navigate('/contact');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-2xl max-h-[90vh] overflow-auto" 
        onClick={(e) => e.stopPropagation()}
      >
        <GlassCard className="border-0 shadow-2xl relative" hoverEffect={false}>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full bg-stone-200 hover:bg-stone-300 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5 text-stone-700" />
          </button>
          
          <div className="p-6 md:p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-voltify-100 flex items-center justify-center mr-4">
                <Building className="h-6 w-6 text-voltify-600" />
              </div>
              <h3 className="text-2xl font-bold text-stone-900">For Employers</h3>
            </div>
            
            <p className="text-stone-600 mb-8">
              We provide immediate access to top-performing talent that drives success, today and into the future, with a deep understanding of your unique needs and goals.
            </p>
            
            <ul className="space-y-3 mb-8">
              {employerBenefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-voltify-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-stone-700">{benefit}</span>
                </li>
              ))}
            </ul>
            
            <div className="space-y-5 mb-8">
              <h4 className="text-xl font-bold text-stone-900">Hire Top Talent</h4>
              <p className="text-stone-600">
                Our clients rely on us to address one of their biggest challenges – gaining immediate access to top-performing talent.
              </p>
              <p className="text-stone-600">
                By combining our extensive expertise with a deep understanding of each client's unique needs, we connect you with the most qualified candidates, ensuring a perfect fit for every role.
              </p>
            </div>
            
            <div className="flex justify-center md:justify-end space-x-4">
              <Button 
                className="bg-voltify-600 hover:bg-voltify-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                onClick={handleContactRedirect}
              >
                Contact Us
              </Button>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
