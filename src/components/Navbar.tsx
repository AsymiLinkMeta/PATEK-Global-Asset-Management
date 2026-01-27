import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Main Navigation */}
      <nav className={`w-full z-50 transition-all duration-300 ${scrolled ? 'bg-tech-darker/95 backdrop-blur-sm shadow-lg' : 'bg-tech-darker'}`}>
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-24">
            <div className="flex items-center">
              <Link to="/" className="flex flex-col items-start">
                <span className="text-3xl font-bold text-tech-accent tracking-wider">PATEK Global</span>
                <span className="text-xs text-tech-blue-light tracking-wide mt-1">Patented Technologies Global</span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-end space-x-10 flex-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`nav-link text-base uppercase tracking-wider font-medium ${
                    location.pathname === item.path ? 'nav-link-active' : ''
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            {/* Mobile Navigation Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-light-50 focus:outline-none"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden bg-tech-dark/95 backdrop-blur-sm border-t border-tech-gray-dark">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-3 py-2 text-base font-medium nav-link tracking-wider ${
                    location.pathname === item.path ? 'nav-link-active' : ''
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;