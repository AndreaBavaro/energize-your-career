import { Heart, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function CharityBanner() {
  const navigate = useNavigate();
  
  return (
    <div id="charity" className="relative overflow-hidden bg-gradient-to-r from-voltify-600 to-blue-600 py-6 sm:py-8">
      <div className="absolute top-0 right-0 -mt-20 -mr-20 opacity-20">
        <Heart className="h-64 w-64 text-white" />
      </div>
      
      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center">
            <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full mr-4">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">Voltify Gives Back</h3>
              <p className="text-white/90 max-w-xl">
                5% of each placement fee is donated to charitable organizations and food banks. Together, we're making a difference beyond the workplace.
              </p>
            </div>
          </div>
          
          <Button 
            className="bg-white hover:bg-stone-100 text-voltify-600 font-medium px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 whitespace-nowrap flex items-center"
            onClick={() => navigate('/charity')}
          >
            Learn More
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
