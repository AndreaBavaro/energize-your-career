
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

const navigation = [
  { name: 'Home', href: '#' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Sectors', href: '#sectors' },
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
      scrolled ? "bg-white bg-opacity-80 backdrop-blur-md shadow-sm" : "bg-transparent"
    )}>
      <nav className="container-custom flex items-center justify-between py-4">
        <div className="flex items-center">
          <a href="#" className="text-2xl font-bold text-voltify-700">
            Voltify
          </a>
        </div>
        
        {/* Desktop navigation */}
        <div className="hidden md:flex md:gap-x-8">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="nav-link text-stone-800 hover:text-voltify-600"
            >
              {item.name}
            </a>
          ))}
        </div>
        
        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-stone-700"
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
          "fixed inset-0 z-50 bg-white bg-opacity-95 backdrop-blur-sm transform transition-transform duration-300 ease-in-out",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="container-custom p-4 flex justify-end">
          <button
            type="button"
            className="rounded-md p-2.5 text-stone-700"
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
                className="text-xl font-medium text-stone-900 hover:text-voltify-600"
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
