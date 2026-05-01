
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Globe, Phone } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

export const Navbar = () => {
  const { language, setLanguage, t, cart, isRTL } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: t.nav.home, href: '/' },
    { name: t.nav.shop, href: '/shop' },
    { name: t.nav.about, href: '/about' },
    { name: t.nav.contact, href: '/contact' },
  ];

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 bg-brand-dark/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold font-display text-white tracking-tighter">
                NEO<span className="text-brand-blue">TECH</span>
              </span>
            </Link>

            <div className="hidden md:block">
              <div className="flex items-baseline space-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={cn(
                      "px-3 py-2 text-sm font-medium transition-colors hover:text-brand-blue",
                      location.pathname === link.href ? "text-brand-blue" : "text-gray-300"
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className="p-2 text-gray-300 hover:text-white transition-colors"
              title="Toggle Language"
            >
              <Globe className="w-5 h-5" />
            </button>

            <Link to="/cart" className="relative p-2 text-gray-300 hover:text-white transition-colors">
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-brand-blue rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>

            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-gray-300 hover:text-white"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-surface border-b border-white/10"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "block px-3 py-2 rounded-md text-base font-medium",
                    location.pathname === link.href ? "text-brand-blue bg-white/5" : "text-gray-300"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
