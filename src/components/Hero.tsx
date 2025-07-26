import React from 'react';
import { ChevronRight } from 'lucide-react';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundClass: string;
}

const Hero: React.FC<HeroProps> = ({ 
  title, 
  subtitle, 
  ctaText, 
  ctaLink,
  backgroundClass 
}) => {
  return (
    <div className={`${backgroundClass} bg-cover bg-center min-h-screen flex items-center justify-center parallax`}>
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center w-full">
        <div className="max-w-4xl mx-auto bg-dark-900/60 backdrop-blur-sm p-16 border border-bronze-400/50 shadow-2xl relative">
          {/* Gold border effect */}
          <div className="absolute inset-0 border border-bronze-400/70"></div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bodoni font-bold text-light-50 leading-tight mb-6 tracking-wide">
            {title}
          </h1>
          
          <div className="w-32 h-0.5 bg-bronze-400 my-8 mx-auto"></div>
          
          <p className="text-xl text-light-200 mb-12 max-w-3xl mx-auto leading-relaxed elegant-spacing">
            {subtitle}
          </p>

          {ctaText && ctaLink && (
            <a 
              href={ctaLink}
              className="inline-flex items-center px-8 py-4 bg-bronze-500 text-light-50 font-medium tracking-wide transition-all duration-300 hover:bg-bronze-600 border border-bronze-400/50 shadow-lg"
            >
              {ctaText} <ChevronRight className="ml-2 h-5 w-5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;