import React from 'react';
import { LogoDisplay } from '../ui/LogoDisplay';
import { Link } from 'react-router-dom';

export function FixedLogo() {
  return (
    <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-[-50px] z-50 transition-all duration-300">
      <Link to="/" aria-label="Home">
        <LogoDisplay 
          position="relative"
          width="clamp(320px, 18vw, 450px)"
          height="auto"
          className="transition-all duration-300 hover:scale-105 drop-shadow-lg"
          responsive={true}
        />
      </Link>
    </div>
  );
}
