import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-900 pt-20 pb-10 text-center" style={{background: "linear-gradient(to bottom, #0a0a0a, #121212, #1a1a1a)"}}>
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Company Info */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-8">
              <span className="text-3xl font-bodoni font-bold text-light-50 tracking-wide letter-spacing-wide">PATEK<span className="text-bronze-400">Global</span></span>
            </div>
            <p className="text-light-300 mb-8 elegant-spacing text-lg">
              Elite asset management for discerning clients worldwide. Excellence in every investment, precision in every decision.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="text-center">
            <h3 className="text-light-50 font-display text-xl mb-8 tracking-wide text-center">Quick Links</h3>
            <ul className="space-y-4">
              <li><a href="/" className="footer-link text-lg">Home</a></li>
              <li><a href="/about" className="footer-link text-lg">About Us</a></li>
              <li><a href="/services" className="footer-link text-lg">Services</a></li>
              <li><a href="/portfolio" className="footer-link text-lg">Portfolio</a></li>
              <li><a href="/faq" className="footer-link text-lg">FAQ</a></li>
              <li><a href="/contact" className="footer-link text-lg">Contact</a></li>
            </ul>
          </div>
          
          {/* Services */}
          <div className="text-center">
            <h3 className="text-light-50 font-display text-xl mb-8 tracking-wide text-center">Our Expertise</h3>
            <ul className="space-y-4">
              <li><a href="/services" className="footer-link text-lg">Corporate Asset Management</a></li>
              <li><a href="/services" className="footer-link text-lg">Commercial Real Estate</a></li>
              <li><a href="/services" className="footer-link text-lg">Maritime Assets</a></li>
              <li><a href="/services" className="footer-link text-lg">Aviation Portfolio</a></li>
              <li><a href="/services" className="footer-link text-lg">Defense Projects</a></li>
              <li><a href="/services" className="footer-link text-lg">Venture Capital</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div className="text-center">
            <h3 className="text-light-50 font-display text-xl mb-8 tracking-wide text-center">Contact Us</h3>
            <ul className="space-y-6">
              <li className="flex items-start justify-center space-x-3">
                <MapPin className="h-6 w-6 text-bronze-400 mt-0.5" />
                <span className="text-light-300 text-lg">701 Brickell Ave, Miami, FL 33131, United States</span>
              </li>
              <li className="flex items-center justify-center space-x-3">
                <Mail className="h-6 w-6 text-bronze-400" />
                <span className="text-light-300 text-lg">inquiries@patekglobal.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-dark-600 pt-10 text-center">
          <p className="text-light-400 tracking-wide text-center text-lg">
            &copy; {new Date().getFullYear()} PATEK Global. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;