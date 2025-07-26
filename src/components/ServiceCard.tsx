import React from 'react';
import { ServiceItem } from '../types';

interface ServiceCardProps {
  service: ServiceItem;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="prestige-card group">
      <div className="mb-6 flex justify-center">{service.icon}</div>
      <h3 className="text-xl font-display font-semibold text-dark-900 mb-4 tracking-wide text-center">{service.title}</h3>
      <p className="text-dark-800 mb-6 elegant-spacing text-center">{service.description}</p>
    </div>
  );
};

export default ServiceCard;