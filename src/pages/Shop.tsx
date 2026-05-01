
import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { PRODUCTS, CATEGORIES } from '../lib/data';
import { ProductCard } from '../components/ProductCard';
import { Filter, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Shop = () => {
  const { t, language } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  
  const categoryFilter = searchParams.get('category') || 'all';
  const brandFilter = searchParams.get('brand') || 'all';

  const brands = useMemo(() => ['all', ...new Set(PRODUCTS.map(p => p.brand))], []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const catMatch = categoryFilter === 'all' || p.category === categoryFilter;
      const brandMatch = brandFilter === 'all' || p.brand === brandFilter;
      return catMatch && brandMatch;
    });
  }, [categoryFilter, brandFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold mb-2">{t.nav.shop}</h1>
          <p className="text-gray-400 text-sm">Showing {filteredProducts.length} high-performance tech gears</p>
        </div>

        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-6 py-3 bg-brand-surface border border-white/10 rounded-2xl text-sm font-bold hover:bg-white/5 transition-all md:hidden"
        >
          <SlidersHorizontal className="w-4 h-4" />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>

        <div className="hidden md:flex gap-4">
          <div className="relative group">
            <select 
              value={categoryFilter}
              onChange={(e) => setSearchParams({ category: e.target.value, brand: brandFilter })}
              className="appearance-none bg-brand-surface border border-white/10 rounded-xl px-4 py-2 pr-10 text-sm font-medium focus:outline-none focus:border-brand-blue cursor-pointer"
            >
              <option value="all">All Categories</option>
              {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name[language]}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>

          <div className="relative group">
            <select 
              value={brandFilter}
              onChange={(e) => setSearchParams({ category: categoryFilter, brand: e.target.value })}
              className="appearance-none bg-brand-surface border border-white/10 rounded-xl px-4 py-2 pr-10 text-sm font-medium focus:outline-none focus:border-brand-blue cursor-pointer"
            >
              <option value="all">All Brands</option>
              {brands.filter(b => b !== 'all').map(b => <option key={b} value={b}>{b}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Sidebar Filters */}
        <div className="hidden md:block space-y-10">
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Filter className="w-4 h-4 text-brand-blue" />
              Categories
            </h3>
            <div className="space-y-3">
              <button 
                onClick={() => setSearchParams({ category: 'all', brand: brandFilter })}
                className={`block text-sm transition-colors ${categoryFilter === 'all' ? 'text-brand-blue font-bold underline' : 'text-gray-400 hover:text-white'}`}
              >
                All Gear
              </button>
              {CATEGORIES.map(c => (
                <button 
                  key={c.id}
                  onClick={() => setSearchParams({ category: c.id, brand: brandFilter })}
                  className={`block text-sm transition-colors ${categoryFilter === c.id ? 'text-brand-blue font-bold underline' : 'text-gray-400 hover:text-white'}`}
                >
                  {c.name[language]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Brands</h3>
            <div className="flex flex-wrap gap-2">
              {brands.map(b => (
                <button 
                  key={b}
                  onClick={() => setSearchParams({ category: categoryFilter, brand: b })}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all border ${brandFilter === b ? 'bg-brand-blue border-brand-blue text-white' : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'}`}
                >
                  {b.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="md:col-span-3">
          <AnimatePresence mode="popLayout">
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProducts.map(product => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={product.id}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
          
          {filteredProducts.length === 0 && (
            <div className="py-32 text-center space-y-6">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto">
                <Filter className="w-10 h-10 text-gray-600" />
              </div>
              <h2 className="text-xl font-bold">No tech found in this sector.</h2>
              <p className="text-gray-400">Try adjusting your filters to find the right gear.</p>
              <button 
                onClick={() => setSearchParams({})}
                className="text-brand-blue font-bold hover:underline"
              >
                Reset all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
