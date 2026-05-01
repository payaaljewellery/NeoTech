
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Zap, TrendingUp } from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { language, addToCart, t } = useApp();
  
  const name = product.name[language];
  const lowStock = product.stock > 0 && product.stock <= 5;

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="group relative bg-brand-surface rounded-2xl overflow-hidden border border-white/5 hover:border-brand-blue/30 transition-all duration-300 shadow-xl"
    >
      <Link to={`/product/${product.id}`} className="block aspect-square overflow-hidden relative">
        <img 
          src={product.images[0]} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {product.isBestSeller && (
            <span className="bg-brand-blue text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
              <TrendingUp className="w-3 h-3" />
              {t.product.bestSeller}
            </span>
          )}
          {product.isHot && (
            <span className="bg-orange-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
              <Zap className="w-3 h-3" />
              {t.product.hot}
            </span>
          )}
        </div>

        {/* Discount Badge */}
        {product.originalPrice && (
          <div className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-lg">
            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </div>
        )}
      </Link>

      <div className="p-4 space-y-2">
        <div className="flex justify-between items-start">
          <p className="text-xs text-brand-blue font-semibold uppercase tracking-widest">{product.brand}</p>
          {lowStock && (
            <span className="text-[10px] text-orange-400 font-medium bg-orange-400/10 px-2 py-0.5 rounded">
               {t.product.lowStock.replace('{count}', product.stock.toString())}
            </span>
          )}
        </div>
        
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="text-sm font-medium text-white line-clamp-1 group-hover:text-brand-blue transition-colors">
            {name}
          </h3>
        </Link>
        
        <div className="flex items-end justify-between pt-2">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-white leading-tight">{product.price} LYD</span>
            {product.originalPrice && (
              <span className="text-xs text-gray-500 line-through">{product.originalPrice} LYD</span>
            )}
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className="p-2 bg-white/5 hover:bg-brand-blue text-white rounded-xl transition-all border border-white/10 hover:border-brand-blue shadow-lg"
          >
            <ShoppingCart className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
