import React from 'react';
import { InsightCategory } from '../types';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  category: InsightCategory;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <div className="relative overflow-hidden group shadow-xl border border-bronze-400/30 h-64">
      <img 
        src={category.image} 
        alt={category.name} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent opacity-80"></div>
      <div className="absolute inset-0 flex flex-col justify-end p-6 text-center">
        <h3 className="text-2xl font-display font-semibold text-light-50 mb-2 tracking-wide">{category.name}</h3>
        <p className="text-light-300 mb-4 elegant-spacing">{category.description}</p>
        <a 
          href={`/insights/category/${category.id}`} 
          className="inline-flex items-center justify-center text-bronze-400 hover:text-bronze-300 transition-colors duration-300 tracking-wide"
        >
          Explore {category.name} <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </div>
    </div>
  );
};

export default CategoryCard;