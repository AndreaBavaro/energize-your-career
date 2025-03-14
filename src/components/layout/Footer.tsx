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
            <h3 className="text-xl font-bold">Voltify</h3>
            <p className="text-stone-300 max-w-xs">
              Energizing careers, building lasting relationships, and connecting you with opportunities.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/company/voltify" target="_blank" rel="noopener noreferrer" className="text-stone-300 hover:text-red-500 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="mailto:info@voltify.com" className="text-stone-300 hover:text-red-500 transition-colors">
                <Mail size={20} />
              </a>
              <a href="tel:+15551234567" className="text-stone-300 hover:text-red-500 transition-colors">
                <Phone size={20} />
              </a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/#about" className="text-stone-300 hover:text-white transition-colors">About Us</a>
              </li>
              <li>
                <a href="/#what-we-do" className="text-stone-300 hover:text-white transition-colors">What We Do</a>
              </li>
              <li>
                <a href="/#our-story" className="text-stone-300 hover:text-white transition-colors">Our Story</a>
              </li>
              <li>
                <a href="/#why-partner" className="text-stone-300 hover:text-white transition-colors">Why Partner</a>
              </li>
              <li>
                <a href="/job-seekers" className="text-stone-300 hover:text-white transition-colors">For Job Seekers</a>
              </li>
              <li>
                <a href="/employers" className="text-stone-300 hover:text-white transition-colors">For Employers</a>
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
                <a href="/services#fulltime" className="text-stone-300 hover:text-white transition-colors">Fulltime Placements</a>
              </li>
              <li className="text-stone-300">
                <a href="/services#executive" className="text-stone-300 hover:text-white transition-colors">Executive Search</a>
              </li>
              <li className="text-stone-300">
                <a href="/services#contract" className="text-stone-300 hover:text-white transition-colors">Short & Long-term Contracts</a>
              </li>
              <li className="text-stone-300">
                <a href="/services#c2h" className="text-stone-300 hover:text-white transition-colors">Contract to Full-time</a>
              </li>
              <li className="text-stone-300">
                <a href="/services#payroll" className="text-stone-300 hover:text-white transition-colors">Payroll Services</a>
              </li>
              <li className="text-stone-300">
                <a href="/charity" className="text-stone-300 hover:text-white transition-colors">Charity Work</a>
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
                <Phone size={18} className="mr-2 mt-0.5 text-red-500" />
                <a href="tel:+15551234567" className="text-stone-300 hover:text-white transition-colors">
                  (555) 123-4567
                </a>
              </li>
              <li className="flex items-start">
                <Mail size={18} className="mr-2 mt-0.5 text-red-500" />
                <a href="mailto:info@voltify.com" className="text-stone-300 hover:text-white transition-colors">
                  info@voltify.com
                </a>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-0.5 text-red-500" />
                <span className="text-stone-300">
                  123 Energy Way, Suite 100<br />
                  Tech City, TX 75001
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-stone-800 text-center text-stone-400 text-sm">
          <p>&copy; {currentYear} Voltify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
