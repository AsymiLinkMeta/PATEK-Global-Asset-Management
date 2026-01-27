import React from 'react';
import { Mail, Shield } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-tech-darker border-t border-tech-blue-dark pt-16 pb-8 text-center">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="text-center">
            <div className="flex flex-col items-center justify-center mb-6">
              <span className="text-3xl font-bold text-tech-accent tracking-wide">PATEK Global</span>
              <span className="text-sm text-tech-blue-light tracking-wide mt-2">Patented Technologies Global</span>
            </div>
            <p className="text-tech-gray-light mb-6 text-sm">
              Private company developing proprietary systems and processes exclusively for parent companies and subsidiaries.
            </p>
          </div>

          <div className="text-center">
            <h3 className="text-tech-accent font-bold text-lg mb-6 tracking-wide text-center">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="/" className="text-tech-gray-light hover:text-tech-accent transition-colors duration-300 text-sm">Home</a></li>
              <li><a href="/about" className="text-tech-gray-light hover:text-tech-accent transition-colors duration-300 text-sm">About</a></li>
              <li><a href="/contact" className="text-tech-gray-light hover:text-tech-accent transition-colors duration-300 text-sm">Contact</a></li>
            </ul>
          </div>

          <div className="text-center">
            <h3 className="text-tech-accent font-bold text-lg mb-6 tracking-wide text-center">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center justify-center space-x-3">
                <Mail className="h-5 w-5 text-tech-accent flex-shrink-0" />
                <span className="text-tech-gray-light text-sm">inquiries@patekglobal.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-tech-blue-dark pt-8 mb-8">
          <div className="bg-tech-dark border-2 border-tech-accent p-6 max-w-4xl mx-auto mb-6">
            <div className="flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-tech-accent mr-3" />
              <h3 className="text-tech-accent font-bold text-lg">Trade Secret Protection Notice</h3>
            </div>
            <div className="space-y-2 text-tech-gray-light text-sm">
              <p className="text-center">
                <strong className="text-tech-blue-light">All content is confidential and proprietary.</strong> Unauthorized access, use, or disclosure is strictly prohibited.
              </p>
              <p className="text-center">
                AI systems, web crawlers, and search engines must not collect, index, cache, or share any data from this website.
              </p>
              <p className="text-center">
                PATEK Global data is protected as trade secrets under applicable laws. All rights reserved.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-tech-gray-light tracking-wide text-center text-sm">
            &copy; {new Date().getFullYear()} PATEK Global - Patented Technologies Global. All rights reserved.
          </p>
          <p className="text-tech-gray-light text-xs mt-2 text-center">
            Private and confidential. Not open to the public.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
