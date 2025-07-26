import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  // Size mapping - increasing the sizes
  const sizeMap = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-28 h-28'
  };

  return (
    <div className={`${sizeMap[size]} ${className}`}>
      <img 
        src="https://i.postimg.cc/9QMwkcVw/Patek-Diamond-No-Background.png" 
        alt="PATEK Global Logo" 
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default Logo;