import React from 'react';
import { Briefcase } from 'lucide-react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeMap = {
    sm: { text: 'text-xl', icon: 'w-5 h-5' },
    md: { text: 'text-3xl', icon: 'w-8 h-8' },
    lg: { text: 'text-4xl', icon: 'w-10 h-10' }
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <Briefcase className={`${sizeMap[size].icon} text-bronze-500`} />
      <span className={`${sizeMap[size].text} font-bold text-bronze-500 tracking-wider letter-spacing-wide`}>
        PATEK Global
      </span>
    </div>
  );
};

export default Logo;