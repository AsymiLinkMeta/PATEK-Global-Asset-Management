import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeMap = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-4xl'
  };

  return (
    <span className={`${sizeMap[size]} font-bold text-bronze-500 tracking-wider letter-spacing-wide ${className}`}>
      PATEK Global
    </span>
  );
};

export default Logo;