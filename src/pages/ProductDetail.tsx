
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../lib/data';
import { ShoppingCart, MessageCircle, ShieldCheck, Zap, ArrowLeft, ArrowRight, Star, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ProductCard } from '../components/ProductCard';

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language, addToCart, t, isRTL } = useApp();
  const [activeImage, setActiveImage] = useState(0);

  const product = PRODUCTS.find(p => p.id === id);

  if (!product) {
    return (
      <div className="py-32 text-center">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <button onClick={() => navigate('/shop')} className="text-brand-blue hover:underline mt-4">Back to Shop</button>
      </div>
    );
  }

  const name = product.name[language];
  const description = product.description[language];
  const features = product.features[language];
  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const buyViaWhatsApp = () => {
    const text = encodeURIComponent(`Hello NEOTECH, I want to order "${name}" (${product.price} LYD).`);
    window.open(`https://wa.me/218910000000?text=${text}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
      >
        {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
        {t.nav.shop}
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="aspect-square rounded-3xl overflow-hidden bg-brand-surface border border-white/10">
            <motion.img 
              key={activeImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={product.images[activeImage]} 
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${activeImage === i ? 'border-brand-blue' : 'border-transparent opacity-50 hover:opacity-100'}`}
                >
                  <img src={img} className="w-full h-full object-cover" alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-brand-blue font-bold text-sm tracking-widest uppercase">{product.brand}</span>
              {product.isBestSeller && (
                 <span className="bg-brand-blue/10 text-brand-blue text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full border border-brand-blue/20">
                  {t.product.bestSeller}
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{name}</h1>
            <div className="flex items-center gap-4 text-2xl font-bold text-white">
              <span>{product.price} LYD</span>
              {product.originalPrice && (
                <span className="text-lg text-gray-500 line-through font-medium">{product.originalPrice} LYD</span>
              )}
            </div>
          </div>

          <p className="text-gray-400 leading-relaxed text-lg">
            {description}
          </p>

          {/* Social Proof */}
          <div className="bg-white/5 border border-white/5 p-4 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-500">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <span className="text-sm font-bold">4.9/5.0</span>
            </div>
            <div className="flex items-center gap-2 text-orange-400 text-sm font-bold">
              <Clock className="w-4 h-4" />
              {product.stock <= 5 ? t.product.lowStock.replace('{count}', product.stock.toString()) : t.product.inStock}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => addToCart(product)}
              className="flex-1 px-8 py-4 bg-brand-blue text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-brand-blue/20 transition-all hover:bg-blue-600"
            >
              <ShoppingCart className="w-5 h-5" />
              {t.product.addToCart}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={buyViaWhatsApp}
              className="px-8 py-4 bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-[#25D366] hover:text-white transition-all shadow-xl shadow-[#25D366]/5"
            >
              <MessageCircle className="w-5 h-5" />
              {t.product.buyWhatsapp}
            </motion.button>
          </div>

          {/* Features */}
          <div className="pt-8 space-y-4">
            <h3 className="font-bold text-lg">{t.product.features}</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-400 text-sm">
                  <div className="p-1 bg-brand-blue/10 rounded-full">
                    <Zap className="w-3 h-3 text-brand-blue fill-current" />
                  </div>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Tabs / specs */}
      <div className="mb-24">
        <div className="border-b border-white/10 mb-8 flex gap-8">
          <button className="pb-4 border-b-2 border-brand-blue text-white font-bold">{t.product.specifications}</button>
          <button className="pb-4 text-gray-500 font-medium hover:text-white">{t.product.reviews}</button>
        </div>
        <div className="bg-brand-surface rounded-3xl p-8 border border-white/5 overflow-hidden">
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b border-white/5">
                <td className="py-4 text-gray-500 font-medium">Brand</td>
                <td className="py-4 text-white font-bold text-right">{product.brand}</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-4 text-gray-500 font-medium">Model</td>
                <td className="py-4 text-white font-bold text-right">{product.id}</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-4 text-gray-500 font-medium">Warranty</td>
                <td className="py-4 text-white font-bold text-right">12 Months Official</td>
              </tr>
              <tr>
                <td className="py-4 text-gray-500 font-medium">Origin</td>
                <td className="py-4 text-white font-bold text-right">100% Authentic / Factory Sealed</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold mb-12">Complete Your Setup</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
};
