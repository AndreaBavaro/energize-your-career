import { cn } from '@/lib/utils';
import { Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import Newsletter from '@/components/ui/Newsletter';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-stone-950 text-white">
      <div className="container-custom pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Voltify Group</h3>
            <p className="text-stone-300 max-w-xs">
              Voltify Group energizes careers, builds lasting relationships, and connects you with opportunities across industries.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/company/voltifygroup/" target="_blank" rel="noopener noreferrer" className="text-stone-300 hover:text-red-500 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="mailto:info@voltifygroup.com" className="text-stone-300 hover:text-red-500 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/#who-we-are" className="text-stone-300 hover:text-white transition-colors">About Voltify Group</a>
              </li>
              <li>
                <a href="/#what-we-do" className="text-stone-300 hover:text-white transition-colors">Voltify Group Services</a>
              </li>
              <li>
                <a href="/#our-story" className="text-stone-300 hover:text-white transition-colors">Voltify Group Story</a>
              </li>
              <li>
                <a href="/#why-partner" className="text-stone-300 hover:text-white transition-colors">Partner With Voltify Group</a>
              </li>
              <li>
                <a href="/contact" className="text-stone-300 hover:text-white transition-colors">Contact Us</a>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="space-y-2">
              <li className="text-stone-300">
                <a href="/#services" className="text-stone-300 hover:text-white transition-colors">Fulltime Placements</a>
              </li>
              <li className="text-stone-300">
                <a href="/#services" className="text-stone-300 hover:text-white transition-colors">Executive Search</a>
              </li>
              <li className="text-stone-300">
                <a href="/#services" className="text-stone-300 hover:text-white transition-colors">Short & Long-term Contracts</a>
              </li>
              <li className="text-stone-300">
                <a href="/#services" className="text-stone-300 hover:text-white transition-colors">Contract to Full-time</a>
              </li>
              <li className="text-stone-300">
                <a href="/#services" className="text-stone-300 hover:text-white transition-colors">Payroll Services</a>
              </li>
              <li className="text-stone-300">
                <a href="/charity" className="text-stone-300 hover:text-white transition-colors">Voltify Group Charity</a>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Newsletter</h3>
            <p className="text-stone-300 text-sm">Subscribe to get updates on our latest job opportunities and industry news.</p>
            <Newsletter 
              variant="compact" 
              className="mt-2" 
            />
            
            <h3 className="text-lg font-semibold mt-6">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail size={18} className="mr-2 mt-0.5 text-blue-500" />
                <a href="mailto:info@voltifygroup.com" className="text-stone-300 hover:text-white transition-colors">
                  info@voltifygroup.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-stone-800 text-center text-stone-400 text-sm">
          <p>&copy; {currentYear} Voltify Group. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
