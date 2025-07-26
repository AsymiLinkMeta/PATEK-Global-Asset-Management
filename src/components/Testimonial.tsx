import React from 'react';
import { Testimonial as TestimonialType } from '../types';
import { Quote } from 'lucide-react';

interface TestimonialProps {
  testimonial: TestimonialType;
}

const Testimonial: React.FC<TestimonialProps> = ({ testimonial }) => {
  return (
    <div className="bg-light-50 p-8 relative shadow-lg border-l-2 border-bronze-400">
      <Quote className="absolute top-6 right-6 h-10 w-10 text-bronze-300 opacity-20" />
      <p className="text-dark-800 mb-6 italic elegant-spacing">{testimonial.quote}</p>
      <div className="flex items-center">
        <div className="w-10 h-0.5 bg-bronze-400 mr-4"></div>
        <div>
          <p className="text-dark-900 font-semibold">{testimonial.author}</p>
          <p className="text-bronze-500 tracking-wide">{testimonial.position}, {testimonial.company}</p>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;