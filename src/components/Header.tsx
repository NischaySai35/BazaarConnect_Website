import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Globe, Menu, X } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({ language, setLanguage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const t = translations[language];

  const navItems = [
    { path: '/', label: t.home },
    { path: '/vendor', label: t.vendorForm },
    { path: '/supplier', label: t.supplierForm },
    { path: '/directory', label: t.directory },
    { path: '/about', label: t.about },
    { path: '/contact', label: t.contact }
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-orange-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-orange-500 to-green-500 p-2 rounded-xl">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                {t.title}
              </h1>
              <p className="text-xs text-gray-600 hidden sm:block">{t.subtitle}</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors duration-200 hover:text-orange-600 ${
                  location.pathname === item.path
                    ? 'text-orange-600 border-b-2 border-orange-600 pb-1'
                    : 'text-gray-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Language Toggle & Mobile Menu */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setLanguage(language === 'hi' ? 'en' : 'hi')}
              className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm p-2 pl-3 pr-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-200 hover:scale-110"
            >
              <Globe className="w-4 h-4 text-orange-600" />
              <span className="text-xs font-semibold text-orange-700">
                {language === 'hi' ? 'Hindi' : 'English'}
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-200"
            >
              {isMenuOpen ? (
                <X className="w-4 h-4 text-orange-600" />
              ) : (
                <Menu className="w-4 h-4 text-orange-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-orange-100 pt-4">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-sm font-medium transition-colors duration-200 hover:text-orange-600 py-2 px-3 rounded-lg ${
                    location.pathname === item.path
                      ? 'text-orange-600 bg-orange-50'
                      : 'text-gray-700'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};