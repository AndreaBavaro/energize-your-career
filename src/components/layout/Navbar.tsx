import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogoDisplay } from '@/components/ui/LogoDisplay';

// Navigation items in the specified order
const navigationItems = [
  { name: 'Who We Are', href: '#who-we-are', isRouterLink: false },
  { name: 'What We Do', href: '#what-we-do', isRouterLink: false },
  { name: 'Our Story', href: '#our-story', isRouterLink: false },
  { name: 'Testimonials', href: '/testimonials', isRouterLink: true },
  { name: 'Why Partner With Us', href: '#why-partner', isRouterLink: false },
  { name: 'Sectors We Serve', href: '#what-we-do', isRouterLink: false },
  { name: 'Giving Back', href: '/charity', isRouterLink: true },
  { name: 'Blog', href: '/blog', isRouterLink: true },
  { name: 'Contact Us', href: '/contact', isRouterLink: true },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

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

  // Handle click outside to close mobile menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuOpen && 
          mobileMenuRef.current && 
          !mobileMenuRef.current.contains(event.target as Node) &&
          !(event.target as Element).closest('button[aria-label="Open main menu"]') &&
          !(event.target as Element).closest('.mobile-logo-container')) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  // Handle smooth scrolling for hash links
  const handleHashLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    // If we're not on the homepage, navigate there first
    if (location.pathname !== '/') {
      navigate('/');
      // After navigation, we need to wait for the page to load before scrolling
      setTimeout(() => {
        scrollToElement(href.substring(1));
      }, 100);
    } else {
      // We're already on the homepage, just scroll
      scrollToElement(href.substring(1));
    }
  };

  // Helper function to scroll to an element by ID
  const scrollToElement = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Get the correct href for navigation items based on current location
  const getItemHref = (item: { href: string, isRouterLink: boolean }) => {
    // If it's already a router link, return the href as is
    if (item.isRouterLink) {
      return item.href;
    }

    // For hash links, just return the href as is
    return item.href;
  };

  // Render navigation link based on whether it's a router link or hash link
  const renderNavLink = (item: { name: string; href: string; isRouterLink: boolean }, className: string, onClick?: () => void) => {
    const href = getItemHref(item);

    if (item.isRouterLink) {
      return (
        <Link
          key={item.name}
          to={href}
          className={className}
          onClick={(e) => {
            if (onClick) onClick();
          }}
          dangerouslySetInnerHTML={{ __html: item.name }}
        />
      );
    } else {
      return (
        <a
          key={item.name}
          href={href}
          className={className}
          onClick={(e) => {
            handleHashLinkClick(e, href);
            if (onClick) onClick();
          }}
          dangerouslySetInnerHTML={{ __html: item.name }}
        />
      );
    }
  };

  return (
    <header className={cn(
      "fixed top-0 inset-x-0 z-50 transition-all duration-300 ease-in-out",
      scrolled ? "py-0 bg-alternative-700 backdrop-blur-md shadow-md" : "py-0 bg-alternative-700 backdrop-blur-sm"
    )}>
      {/* Mobile navbar tap indicator - only visible on mobile when menu is closed */}
      {!mobileMenuOpen && (
        <div className="lg:hidden absolute inset-0 bg-white/5 animate-pulse-slow pointer-events-none"></div>
      )}
      {/* Logo positioned absolutely at the top left - hidden on mobile */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 sm:left-2 md:left-4 lg:left-6 hidden sm:flex items-center z-50 mt-3">
        <div className="relative">
          {/* Semi-circle background */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[60px] sm:w-[60px] md:w-[70px] lg:w-[80px] h-[60px] sm:h-[80px] md:h-90px] lg:h-[100px] bg-alternative-700 rounded-t-full transform -rotate-180 z-0"></div>
          
          <Link 
            to="/" 
            className="flex items-center relative z-10"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              if (location.pathname !== '/') {
                navigate('/');
              }
            }}
          >
            <LogoDisplay 
              position="relative"
              width="clamp(120px, 18vw, 220px)"
              height="clamp(60px, 4vw, 200px)"
              className="transition-all duration-300 scale-100 sm:scale-90 md:scale-95 lg:scale-100"
              responsive={true}
            />
          </Link>
        </div>
      </div>

      {/* Navigation container */}
      <nav 
        className={`container-custom flex items-center justify-between sm:justify-end h-8 sm:h-10 md:h-12 lg:h-14 px-2 sm:px-3 md:px-4 lg:px-6 sm:ml-[100px] md:ml-[120px] lg:ml-[180px] mt-1 ${!mobileMenuOpen ? 'lg:cursor-default cursor-pointer' : ''}`}
        onClick={() => {
          if (window.innerWidth < 1024 && !mobileMenuOpen) {
            setMobileMenuOpen(true);
          }
        }}
      >
        {/* Mobile logo - visible only on mobile */}
        <div className={`flex sm:hidden items-center -ml-2 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300 mobile-logo-container`}>
          <div className="relative">
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[50px] h-[55px] bg-alternative-700 rounded-t-full transform -rotate-180 z-0"></div>
            <Link 
              to="/" 
              className="relative z-10"
              onClick={(e) => {
                if (window.innerWidth < 1024 && !mobileMenuOpen) {
                  e.preventDefault();
                  setMobileMenuOpen(true);
                } else {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  if (location.pathname !== '/') {
                    navigate('/');
                  }
                  if (mobileMenuOpen) {
                    setMobileMenuOpen(false);
                  }
                }
              }}
            >
              <LogoDisplay 
                position="relative"
                width="90px"
                height="auto"
                className="transition-all duration-300 scale-75"
                responsive={true}
              />
            </Link>
          </div>
        </div>
        
        {/* Desktop navigation */}
        <div className="hidden lg:flex items-center space-x-1 xl:space-x-1">
          {/* Navigation items */}
          {navigationItems.map((item) => (
            renderNavLink(
              item,
              cn("px-1.5 sm:px-2 md:px-2 lg:px-3 py-0.5 text-xs sm:text-xs md:text-sm lg:text-sm text-white hover:text-stone-100 transition-colors")
            )
          ))}
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="text-white p-0.5 sm:p-1 rounded-lg hover:bg-white/10 transition-colors relative"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open main menu"
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-3 w-3 sm:h-4 sm:w-4" aria-hidden="true" />
            {!mobileMenuOpen && (
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        ref={mobileMenuRef}
        className={cn(
          "absolute top-full left-0 right-0 z-50 bg-alternative-600 transform transition-all duration-300 ease-in-out shadow-lg",
          mobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        )}
      >
        <div className="container-custom py-4">
          {/* Mobile logo and close button */}
          <div className="flex justify-between items-center mb-4">
            <div className="relative ml-2 mobile-logo-container">
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[110px] h-[115px] bg-alternative-700 rounded-t-full transform -rotate-180 z-0"></div>
              <LogoDisplay 
                position="relative"
                width="clamp(160px, 18vw, 220px)"
                height="auto"
                className="transition-all duration-300 relative z-10 animate-fade-in"
                responsive={true}
                style={{ animationDelay: '150ms' }}
              />
            </div>
            <button
              type="button"
              className="rounded-full p-2 bg-white/10 text-white hover:bg-white/20 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          
          {/* All navigation items in one list */}
          <div className="flex flex-col gap-y-2 rounded-lg p-4">
            {/* Navigation items */}
            {navigationItems.map((item) => (
              renderNavLink(
                item,
                "block px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors",
                () => setMobileMenuOpen(false)
              )
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
