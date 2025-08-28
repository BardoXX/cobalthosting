import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useConfig } from '../context/ConfigContext';
import LanguageSwitcher from './LanguageSwitcher';
import CurrencySwitcher from './CurrencySwitcher';

const Navbar = () => {
  const { t, theme } = useConfig();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const navItems = [
    { path: '/home', key: 'nav.home' },
    { path: '/pricing', key: 'nav.pricing' },
    { path: '/about', key: 'nav.about' },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-0' : 'bg-white/90 backdrop-blur-sm py-2'}`}
      style={{ 
        '--primary-color': theme?.colors?.primary || '#2563eb',
        '--primary-hover': theme?.colors?.accent || '#7c3aed',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold" style={{ color: 'var(--primary-color)' }}>
                {t('site.name', 'Cobalt Hosting')}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:ml-10 md:flex md:items-center md:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'text-primary-600'
                    : 'text-gray-600 hover:text-primary-600'
                }`}
                style={{
                  color: location.pathname === item.path ? 'var(--primary-color)' : '',
                }}
              >
                {t(item.key)}
              </Link>
            ))}
          </div>

          {/* Right side items */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <CurrencySwitcher />
            <Link
              to="/login"
              className="ml-4 px-4 py-2 text-sm font-medium text-white rounded-md transition-colors"
              style={{ backgroundColor: 'var(--primary-color)', '&:hover': { backgroundColor: 'var(--primary-hover)' } }}
            >
              {t('common.nav.login', 'Inloggen')}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 h-auto' : 'opacity-0 h-0 overflow-hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === item.path
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
              style={{
                color: location.pathname === item.path ? 'var(--primary-color)' : '',
              }}
            >
              {t(item.key)}
            </Link>
          ))}
          <div className="pt-4 pb-2 border-t border-gray-200">
            <div className="flex items-center justify-between px-3">
              <LanguageSwitcher />
              <CurrencySwitcher />
            </div>
            <div className="mt-3 space-y-1">
              <Link
                to="/login"
                className="block w-full px-3 py-2 text-base font-medium text-center text-white rounded-md"
                style={{ backgroundColor: 'var(--primary-color)' }}
              >
                {t('common.nav.login', 'Inloggen')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
