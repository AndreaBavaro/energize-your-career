import React from 'react';
import { Twitter, Youtube, Instagram, Facebook, Linkedin, FileText } from 'lucide-react';
import { EmbedType } from '@/utils/embedUtils';

interface EmbedTypeIconProps {
  type: EmbedType;
  className?: string;
  size?: number;
}

export const EmbedTypeIcon: React.FC<EmbedTypeIconProps> = ({ 
  type, 
  className = "", 
  size = 16 
}) => {
  const getIcon = () => {
    switch (type) {
      case 'twitter':
        return <Twitter size={size} className={`text-sky-500 ${className}`} />;
      case 'youtube':
        return <Youtube size={size} className={`text-red-600 ${className}`} />;
      case 'instagram':
        return <Instagram size={size} className={`text-pink-500 ${className}`} />;
      case 'facebook':
        return <Facebook size={size} className={`text-blue-600 ${className}`} />;
      case 'linkedin':
        return <Linkedin size={size} className={`text-blue-700 ${className}`} />;
      case 'article':
        return <FileText size={size} className={`text-gray-700 ${className}`} />;
      default:
        return null;
    }
  };

  if (type === 'unknown') return null;

  return (
    <div className="inline-flex items-center justify-center">
      {getIcon()}
    </div>
  );
};

export default EmbedTypeIcon;
