import React from 'react';
import { PortfolioItem as PortfolioItemType } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface PortfolioItemProps {
  item: PortfolioItemType;
}

const PortfolioItem: React.FC<PortfolioItemProps> = ({ item }) => {
  return (
    <div className="relative overflow-hidden group shadow-xl border border-bronze-400/30">
      <div className="relative">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent opacity-40 group-hover:opacity-10 transition-opacity duration-500"></div>
      </div>
      <div className="portfolio-overlay backdrop-blur-sm bg-dark-900/80 border border-bronze-400/20">
        <span className="text-bronze-400 text-sm uppercase tracking-wider mb-4 text-center">{item.category}</span>
        <h3 className="text-2xl font-display font-semibold text-white mb-4 tracking-wide text-center">{item.title}</h3>
        <div className="w-16 h-0.5 bg-bronze-400 mb-6 mx-auto"></div>
        <p className="text-light-300 mb-6 text-center text-sm">{item.description}</p>
        <a href={`/portfolio/${item.id}`} className="inline-flex items-center text-bronze-400 hover:text-bronze-300 transition-colors duration-300 tracking-wide border border-bronze-400/30 px-6 py-2 hover:bg-bronze-400/10">
          Learn More <ArrowUpRight className="ml-2 h-4 w-4" />
        </a>
      </div>
    </div>
  );
};

export default PortfolioItem;