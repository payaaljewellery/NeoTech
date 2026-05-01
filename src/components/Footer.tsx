
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, ShieldCheck, Truck, PackageCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer = () => {
  const { t } = useApp();

  return (
    <footer className="bg-brand-surface pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="flex items-center">
              <span className="text-3xl font-bold font-display text-white tracking-tighter">
                NEO<span className="text-brand-blue">TECH</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t.footer.about}
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-brand-blue hover:bg-white/10 transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-brand-blue hover:bg-white/10 transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-brand-blue hover:bg-white/10 transition-all">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">{t.footer.links}</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">{t.nav.home}</Link></li>
              <li><Link to="/shop" className="text-gray-400 hover:text-white transition-colors">{t.nav.shop}</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">{t.nav.about}</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">{t.nav.contact}</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
              <ShieldCheck className="w-8 h-8 text-brand-blue mb-4" />
              <h5 className="text-white font-semibold mb-2">Original Products</h5>
              <p className="text-xs text-gray-400">We only source directly from brands like Anker & Baseus.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
              <Truck className="w-8 h-8 text-brand-blue mb-4" />
              <h5 className="text-white font-semibold mb-2">Fast Delivery</h5>
              <p className="text-xs text-gray-400">Same-day delivery in Tripoli, 2-3 days for other cities.</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 text-center">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} NEOTECH. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
};
