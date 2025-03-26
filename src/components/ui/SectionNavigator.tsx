import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface SectionNavigatorProps {
  prevSectionId?: string;
  nextSectionId?: string;
  className?: string;
}

const SectionNavigator: React.FC<SectionNavigatorProps> = ({ prevSectionId, nextSectionId, className = '' }) => {
  const scrollToSection = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`flex justify-center space-x-4 ${className}`}>
      {prevSectionId && (
        <button 
          onClick={() => scrollToSection(prevSectionId)}
          className="w-10 h-10 rounded-full bg-transparent hover:bg-blue-900/30 flex items-center justify-center transition-colors"
          aria-label={`Scroll to previous section`}
        >
          <ChevronUp className="h-6 w-6 text-voltify-200" />
        </button>
      )}
      {nextSectionId && (
        <button 
          onClick={() => scrollToSection(nextSectionId)}
          className="w-10 h-10 rounded-full bg-transparent hover:bg-blue-900/30 flex items-center justify-center transition-colors animate-bounce"
          aria-label={`Scroll to next section`}
        >
          <ChevronDown className="h-6 w-6 text-voltify-200" />
        </button>
      )}
    </div>
  );
};

export default SectionNavigator;
