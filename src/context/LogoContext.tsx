import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the available logo options
export const logoOptions = [
  { id: 'adobe1', path: 'Adobe Express - file (1).png', name: 'Adobe Logo 1' },
  { id: 'adobe2', path: 'Adobe Express - file (2).png', name: 'Adobe Logo 2' },
  { id: 'adobe3', path: 'Adobe Express - file (3).png', name: 'Adobe Logo 3' },
  { id: 'adobe4', path: 'Adobe Express - file (4).png', name: 'Adobe Logo 4' },
  { id: 'adobe5', path: 'Adobe Express - file (5).png', name: 'Adobe Logo 5' },
];

type LogoContextType = {
  selectedLogo: string;
  setSelectedLogo: (logoPath: string) => void;
  showLogoSelector: boolean;
  setShowLogoSelector: (show: boolean) => void;
};

const LogoContext = createContext<LogoContextType | undefined>(undefined);

export const LogoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Try to get the saved logo from localStorage, or default to the first logo
  const [selectedLogo, setSelectedLogo] = useState<string>(() => {
    const savedLogo = localStorage.getItem('selectedLogo');
    return savedLogo || logoOptions[0].path;
  });
  
  const [showLogoSelector, setShowLogoSelector] = useState(false);

  // Save the selected logo to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('selectedLogo', selectedLogo);
  }, [selectedLogo]);

  return (
    <LogoContext.Provider value={{ selectedLogo, setSelectedLogo, showLogoSelector, setShowLogoSelector }}>
      {children}
    </LogoContext.Provider>
  );
};

export const useLogo = (): LogoContextType => {
  const context = useContext(LogoContext);
  if (context === undefined) {
    throw new Error('useLogo must be used within a LogoProvider');
  }
  return context;
};
