import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, ChevronDown, Zap } from 'lucide-react';
import Image from 'next/image';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// Navigation items in the specified order
const navigationItems = [
  { name: 'Who We Are', href: '#who-we-are', isRouterLink: false },
  { name: 'What We Do', href: '#what-we-do', isRouterLink: false },
  { name: 'Our Story', href: '#our-story', isRouterLink: false },
  { name: 'Testimonials', href: '/testimonials', isRouterLink: true },
  { name: 'Why Partner With Us', href: '#why-partner', isRouterLink: false },
  { name: 'Sectors We Serve', href: '#sectors', isRouterLink: false },
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
          !(event.target as Element).closest('button[aria-label="Open main menu"]')) {
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
      scrolled ? "py-1 bg-alternative-450 backdrop-blur-md shadow-md" : "py-1 bg-alternative-450 backdrop-blur-sm"
    )}>
      {/* Logo positioned absolutely at the top left */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 p-2 sm:p-3 flex items-center z-50">
        <Link to="/" className="flex items-center">
          <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
          <div className="text-lg sm:text-xl font-bold text-white">Voltify</div>
        </Link>
      </div>

      {/* Navigation container */}
      <nav className="container-custom flex items-center justify-end py-0.5 sm:py-1 px-3 sm:px-4">
        {/* Desktop navigation */}
        <div className="hidden lg:flex items-center space-x-2">
          {/* Navigation items */}
          {navigationItems.map((item) => (
            renderNavLink(
              item,
              cn("px-4 py-2 text-white hover:text-stone-100 transition-colors")
            )
          ))}
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        ref={mobileMenuRef}
        className={cn(
          "absolute top-full left-0 right-0 z-50 bg-alternative-600 transform transition-transform duration-300 ease-in-out shadow-lg",
          mobileMenuOpen ? "translate-y-0" : "-translate-y-full opacity-0 pointer-events-none"
        )}
      >
        <div className="container-custom py-4">
          {/* Close button */}
          <div className="flex justify-end mb-2">
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
