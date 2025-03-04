
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

const navigation = [
  { name: 'Home', href: '#' },
  { name: 'Who We Are', href: '#about' },
  { name: 'Our Story', href: '#our-story' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Why Partner With Us', href: '#why-partner' },
  { name: 'What We Do', href: '#services' },
  { name: 'The Sectors We Serve', href: '#sectors' },
  { name: 'Job Seekers', href: '#job-seekers' },
  { name: 'Employers', href: '#employers' },
  { name: 'Giving Back', href: '#giving-back' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header className={cn(
      "fixed top-0 inset-x-0 z-50 transition-all duration-300 ease-in-out",
      scrolled ? "bg-stone-900/80 backdrop-blur-md shadow-md" : "bg-transparent"
    )}>
      <nav className="container-custom flex items-center justify-between py-4">
        <div className="flex items-center">
          <a href="#" className={cn(
            "text-2xl font-bold transition-colors duration-300",
            scrolled ? "text-voltify-400" : "text-white"
          )}>
            Voltify
          </a>
        </div>
        
        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-1">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={cn(
                "nav-link px-2 py-1 text-sm font-medium hover:text-voltify-300 transition-colors",
                scrolled ? "text-stone-100" : "text-white"
              )}
            >
              {item.name}
            </a>
          ))}
        </div>
        
        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>
      
      {/* Mobile menu */}
      <div 
        className={cn(
          "fixed inset-0 z-50 bg-stone-900/95 backdrop-blur-md transform transition-transform duration-300 ease-in-out",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="container-custom p-4 flex justify-end">
          <button
            type="button"
            className="rounded-md p-2.5 text-white hover:text-voltify-300"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="sr-only">Close menu</span>
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="container-custom py-6">
          <div className="flex flex-col gap-y-6 text-center">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-xl font-medium text-white hover:text-voltify-300 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
