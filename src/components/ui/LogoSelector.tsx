import React from 'react';
import { useLogo, logoOptions } from '../../context/LogoContext';
import { X } from 'lucide-react';

export const LogoSelector: React.FC = () => {
  const { selectedLogo, setSelectedLogo, showLogoSelector, setShowLogoSelector } = useLogo();

  if (!showLogoSelector) {
    return (
      <button 
        onClick={() => setShowLogoSelector(true)}
        className="fixed bottom-4 right-4 z-50 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-all duration-300"
        title="Change Logo"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white p-4 rounded-lg shadow-xl border border-gray-200 w-[320px] max-h-[400px] overflow-y-auto">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-gray-800">Select Logo Design</h3>
        <button 
          onClick={() => setShowLogoSelector(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {logoOptions.map((logo) => (
          <div 
            key={logo.id}
            className={`border-2 rounded-lg p-3 cursor-pointer transition-all duration-200 ${
              selectedLogo === logo.path ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedLogo(logo.path)}
          >
            <div className="bg-white rounded flex items-center justify-center mb-2 overflow-hidden" style={{ aspectRatio: '3/1', height: '60px' }}>
              <img 
                src={`${import.meta.env.BASE_URL}images/${logo.path}`} 
                alt={logo.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <p className="text-sm text-center text-gray-700">{logo.name}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-3 text-xs text-gray-500 text-center">
        Click on a logo to preview it across the site
      </div>
    </div>
  );
};
