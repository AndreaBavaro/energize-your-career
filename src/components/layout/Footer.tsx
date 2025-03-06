import { cn } from '@/lib/utils';
import { Facebook, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';

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
              <a href="#" className="text-stone-300 hover:text-voltify-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-stone-300 hover:text-voltify-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-stone-300 hover:text-voltify-400 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-stone-300 hover:text-white transition-colors">About Us</a>
              </li>
              <li>
                <a href="#services" className="text-stone-300 hover:text-white transition-colors">Our Services</a>
              </li>
              <li>
                <a href="#sectors" className="text-stone-300 hover:text-white transition-colors">Sectors We Serve</a>
              </li>
              <li>
                <a href="#job-seekers" className="text-stone-300 hover:text-white transition-colors">For Job Seekers</a>
              </li>
              <li>
                <a href="#employers" className="text-stone-300 hover:text-white transition-colors">For Employers</a>
              </li>
              <li>
                <a href="/contact" className="text-stone-300 hover:text-white transition-colors">Contact Us</a>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="space-y-2">
              <li className="text-stone-300">Fulltime Placements</li>
              <li className="text-stone-300">Executive Search</li>
              <li className="text-stone-300">Short & Long-term Contracts</li>
              <li className="text-stone-300">Contract to Full-time</li>
              <li className="text-stone-300">Payroll Services</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone size={18} className="mr-2 mt-0.5 text-voltify-400" />
                <span className="text-stone-300">
                  (555) 123-4567
                </span>
              </li>
              <li className="flex items-start">
                <Mail size={18} className="mr-2 mt-0.5 text-voltify-400" />
                <span className="text-stone-300">
                  info@voltify.com
                </span>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-0.5 text-voltify-400" />
                <span className="text-stone-300">
                  123 Energy Way, Suite 100<br />
                  Tech City, TX 75001
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-stone-800 text-center text-stone-400 text-sm">
          <p> {currentYear} Voltify. All rights reserved. A subsidiary of Ban Partners (est. 2005)</p>
        </div>
      </div>
    </footer>
  );
}
