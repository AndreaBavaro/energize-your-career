import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, ChevronDown, Zap } from 'lucide-react';
import Image from 'next/image';


// Standalone navigation items
const standaloneItems = [
  { name: 'Our Story', href: '#who-we-are' },
  { name: 'Why Partner With Us', href: '#why-partner' },
  { name: 'Contact', href: '/contact' },
  { name: 'Testimonials', href: '#testimonials' },
];

const navigationGroups = [
  {
    name: 'Services',
    items: [
      { name: 'Who We Are', href: '#about' },
      { name: 'What We Do', href: '#what-we-do' },
      { name: 'Job Seekers', href: '#job-seekers' },
      { name: 'Employers', href: '#employers' },
      { name: 'Positions We Place', href: '#positions' },
      { name: 'Giving Back', href: '#giving-back' },
    ]
  }
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpandedGroups, setMobileExpandedGroups] = useState<string[]>(
    navigationGroups.map(group => group.name) // Start with all groups expanded
  );

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };
  
  // Toggle mobile group expansion
  const toggleMobileGroup = (name: string) => {
    setMobileExpandedGroups(prev => 
      prev.includes(name) 
        ? prev.filter(item => item !== name) 
        : [...prev, name]
    );
  };

  return (
    <header className={cn(
      "fixed top-0 inset-x-0 z-50 transition-all duration-300 ease-in-out",
      scrolled ? "bg-blue-600/90 backdrop-blur-md shadow-md" : "bg-blue-600/40 backdrop-blur-sm"
    )}>
      {/* Logo positioned absolutely at the top left */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 p-4 flex items-center z-50">
        <a href="#" className="flex items-center">
          <Zap className="h-6 w-6 text-voltify-300 mr-1" />
          <div className="text-2xl font-bold text-white">Voltify</div>
        </a>
      </div>
      
      {/* Navigation container */}
      <nav className="container-custom flex items-center justify-end py-3 px-4">
        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-x-1">
          {/* Standalone items at the beginning */}
          {standaloneItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={cn(
                "nav-link px-3 py-2 text-sm font-medium hover:text-blue-100 transition-colors text-white"
              )}
              dangerouslySetInnerHTML={{ __html: item.name }}
            />
          ))}
          
          {/* Dropdown navigation groups */}
          {navigationGroups.map((group) => (
            <div key={group.name} className="relative group">
              <button
                className={cn(
                  "nav-link flex items-center px-3 py-2 text-sm font-medium hover:text-blue-100 transition-colors text-white"
                )}
                onClick={() => toggleDropdown(group.name)}
                onMouseEnter={() => setActiveDropdown(group.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {group.name}
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              <div 
                className={cn(
                  "absolute left-0 mt-1 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-200 origin-top-left",
                  activeDropdown === group.name ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                )}
                onMouseEnter={() => setActiveDropdown(group.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <div className="py-1">
                  {group.items.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      onClick={() => setActiveDropdown(null)}
                      dangerouslySetInnerHTML={{ __html: item.name }}
                    />
                  ))}
                </div>
              </div>
            </div>
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
          "fixed inset-0 z-50 bg-blue-900 transform transition-transform duration-300 ease-in-out",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Mobile menu header with close button in top right */}
        <div className="relative p-4">
          {/* Logo in top left */}
          <div className="absolute left-4 top-4 flex items-center">
            <Zap className="h-5 w-5 text-voltify-300 mr-1" />
            <div className="text-xl font-bold text-white">Voltify</div>
          </div>
          
          {/* Close button in top right */}
          <button
            type="button"
            className="absolute right-4 top-4 rounded-full p-3 bg-blue-800/80 text-white hover:bg-blue-700 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="sr-only">Close menu</span>
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="container-custom py-6 mt-10">
          {/* All navigation items in one list */}
          <div className="flex flex-col gap-y-4 bg-blue-800 rounded-lg p-4">
            {/* Standalone items first */}
            {standaloneItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-lg font-medium text-white hover:text-blue-200 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
                dangerouslySetInnerHTML={{ __html: item.name }}
              />
            ))}
            
            {/* Group items */}
            {navigationGroups.flatMap(group => 
              group.items.map(item => (
                <a
                  key={`${group.name}-${item.name}`}
                  href={item.href}
                  className="text-lg font-medium text-white hover:text-blue-200 transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                  dangerouslySetInnerHTML={{ __html: item.name }}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
