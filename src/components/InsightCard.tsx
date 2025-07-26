import React from 'react';
import { InsightItem } from '../types';
import { Calendar, User, Clock, Tag } from 'lucide-react';

interface InsightCardProps {
  insight: InsightItem;
  variant?: 'default' | 'featured';
}

const InsightCard: React.FC<InsightCardProps> = ({ insight, variant = 'default' }) => {
  if (variant === 'featured') {
    return (
      <div className="insight-card border-b-2 border-bronze-400 flex flex-col md:flex-row overflow-hidden">
        <div className="relative overflow-hidden md:w-1/2">
          <img 
            src={insight.image} 
            alt={insight.title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute top-4 left-0 bg-bronze-500 text-light-50 text-xs uppercase tracking-wider py-1 px-3">
            {insight.category}
          </div>
        </div>
        <div className="p-8 prestige-gradient md:w-1/2 flex flex-col justify-center">
          <div className="flex items-center justify-center text-sm text-dark-600 mb-4 space-x-6">
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
          <h3 className="text-2xl font-display font-semibold text-dark-900 mb-4 tracking-wide text-center">{insight.title}</h3>
          <div className="w-12 h-0.5 bg-bronze-400 mb-4 mx-auto"></div>
          <p className="text-dark-800 mb-6 elegant-spacing text-center">{insight.excerpt}</p>
          {insight.tags && (
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {insight.tags.map((tag, index) => (
                <span key={index} className="text-xs bg-light-200 text-dark-700 px-3 py-1 rounded-sm flex items-center">
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className="text-center mt-auto">
            <a href={`/insights/${insight.id}`} className="text-bronze-500 hover:text-bronze-600 transition-colors duration-300 tracking-wide">
              Read Full Analysis
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="insight-card border-b-2 border-bronze-400">
      <div className="relative overflow-hidden h-60">
        <img 
          src={insight.image} 
          alt={insight.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-4 left-0 bg-bronze-500 text-light-50 text-xs uppercase tracking-wider py-1 px-3">
          {insight.category}
        </div>
      </div>
      <div className="p-6 prestige-gradient">
        <div className="flex items-center justify-center text-sm text-dark-600 mb-4 space-x-4 flex-wrap">
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
        <h3 className="text-xl font-display font-semibold text-dark-900 mb-4 tracking-wide text-center">{insight.title}</h3>
        <div className="w-12 h-0.5 bg-bronze-400 mb-4 mx-auto"></div>
        <p className="text-dark-800 mb-6 elegant-spacing text-center">{insight.excerpt}</p>
        {insight.tags && (
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {insight.tags.map((tag, index) => (
              <span key={index} className="text-xs bg-light-200 text-dark-700 px-3 py-1 rounded-sm flex items-center">
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="text-center">
          <a href={`/insights/${insight.id}`} className="text-bronze-500 hover:text-bronze-600 transition-colors duration-300 tracking-wide">
            Read Full Analysis
          </a>
        </div>
      </div>
    </div>
  );
};

export default InsightCard;