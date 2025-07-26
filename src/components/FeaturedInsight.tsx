import React from 'react';
import { InsightItem } from '../types';
import { Calendar, User, Clock, ArrowRight } from 'lucide-react';

interface FeaturedInsightProps {
  insight: InsightItem;
}

const FeaturedInsight: React.FC<FeaturedInsightProps> = ({ insight }) => {
  return (
    <div className="relative overflow-hidden group h-[500px] shadow-xl border border-bronze-400/30">
      <img 
        src={insight.image} 
        alt={insight.title} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/70 to-transparent"></div>
      
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block bg-bronze-500 text-light-50 text-xs uppercase tracking-wider py-1 px-3 mb-4">
            {insight.category}
          </span>
          
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-light-50 mb-4 tracking-wide">
            {insight.title}
          </h2>
          
          <div className="w-16 h-0.5 bg-bronze-400 mb-6 mx-auto"></div>
          
          <div className="flex items-center justify-center text-sm text-light-300 mb-6 space-x-6">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              {insight.date}
            </div>
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              {insight.author}
            </div>
            {insight.readTime && (
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                {insight.readTime}
              </div>
            )}
          </div>
          
          <p className="text-light-200 mb-8 elegant-spacing max-w-2xl mx-auto">
            {insight.excerpt}
          </p>
          
          <a 
            href={`/insights/${insight.id}`} 
            className="inline-flex items-center px-6 py-3 bg-bronze-500 text-light-50 font-medium tracking-wide transition-all duration-300 hover:bg-bronze-600 border border-bronze-400/50 shadow-lg"
          >
            Read Full Analysis <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default FeaturedInsight;