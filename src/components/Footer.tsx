import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-900 border-t border-dark-600 pt-16 pb-8 text-center">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <Logo />
            </div>
            <p className="text-light-300 mb-6 text-sm">
              Excellence in global asset management, delivering sophisticated wealth solutions with precision and expertise.
            </p>
            <div className="flex justify-center space-x-4">
              <a href="#" className="text-light-300 hover:text-bronze-400 transition-colors duration-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-light-300 hover:text-bronze-400 transition-colors duration-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-light-300 hover:text-bronze-400 transition-colors duration-300">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-light-300 hover:text-bronze-400 transition-colors duration-300">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-light-50 font-bold text-lg mb-6 tracking-wide text-center">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="/" className="footer-link text-sm">Home</a></li>
              <li><a href="/about" className="footer-link text-sm">About</a></li>
              <li><a href="/services" className="footer-link text-sm">Services</a></li>
              <li><a href="/portfolio" className="footer-link text-sm">Portfolio</a></li>
              <li><a href="/contact" className="footer-link text-sm">Contact</a></li>
              <li><a href="/faq" className="footer-link text-sm">FAQ</a></li>
            </ul>
          </div>

          <div className="text-center">
            <h3 className="text-light-50 font-bold text-lg mb-6 tracking-wide text-center">Services</h3>
            <ul className="space-y-3">
              <li><a href="/services" className="footer-link text-sm">Corporate Advisory Services</a></li>
              <li><a href="/services" className="footer-link text-sm">Commercial Real Estate</a></li>
              <li><a href="/services" className="footer-link text-sm">Maritime Assets</a></li>
              <li><a href="/services" className="footer-link text-sm">Aviation Portfolio</a></li>
              <li><a href="/services" className="footer-link text-sm">Venture Capital</a></li>
            </ul>
          </div>

          <div className="text-center">
            <h3 className="text-light-50 font-bold text-lg mb-6 tracking-wide text-center">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center justify-center space-x-3">
                <MapPin className="h-5 w-5 text-bronze-400 flex-shrink-0" />
                <span className="text-light-300 text-sm">701 Brickell Ave, Miami, FL 33131</span>
              </li>
              <li className="flex items-center justify-center space-x-3">
                <Mail className="h-5 w-5 text-bronze-400 flex-shrink-0" />
                <span className="text-light-300 text-sm">inquiries@patekglobal.com</span>
              </li>
              <li className="flex items-center justify-center space-x-3">
                <Phone className="h-5 w-5 text-bronze-400 flex-shrink-0" />
                <span className="text-light-300 text-sm">+1 (786) 825-9635</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-600 pt-8">
          <p className="text-light-300 tracking-wide text-center text-sm">
            &copy; {new Date().getFullYear()} PATEK Global. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
