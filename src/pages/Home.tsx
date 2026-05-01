
import React from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS, CATEGORIES } from '../lib/data';
import { ProductCard } from '../components/ProductCard';
import { motion } from 'motion/react';
import { ArrowRight, ShoppingCart, MessageCircle, Star, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Home = () => {
  const { t, language, isRTL } = useApp();

  const bestSellers = PRODUCTS.filter(p => p.isBestSeller);

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-blue/5 blur-[120px] rounded-full -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-brand-blue/5 blur-[120px] rounded-full translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-3xl space-y-8">
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-brand-blue/10 border border-brand-blue/20 rounded-full text-brand-blue text-xs font-bold uppercase tracking-widest mb-6">
                <Zap className="w-3 h-3 fill-current" />
                Next-Gen Accessories
              </span>
              <h1 className="text-6xl md:text-8xl font-bold leading-[0.9] mb-6">
                {t.hero.title.split(' ').map((word: string, i: number) => (
                  <span key={i} className={i === 0 ? "text-white" : "text-brand-blue"}>
                    {word}{' '}
                  </span>
                ))}
              </h1>
              <p className="text-xl text-gray-400 max-w-lg mb-8">
                {t.hero.subtitle}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/shop">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-brand-blue text-white rounded-2xl font-bold flex items-center gap-3 shadow-xl shadow-brand-blue/20"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {t.hero.shopNow}
                  </motion.button>
                </Link>
                <a href="https://wa.me/218910000000">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-bold flex items-center gap-3 hover:bg-white/10 transition-all"
                  >
                    <MessageCircle className="w-5 h-5" />
                    {t.hero.whatsapp}
                  </motion.button>
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Hero Image / Illustration */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-2/3 hidden lg:block opacity-40 mix-blend-screen"
        >
          <img 
            src="https://images.unsplash.com/photo-1616410011236-7a42121da981?auto=format&fit=crop&q=80&w=800" 
            className="w-full h-full object-contain"
            alt="Tech Accessory hero"
          />
        </motion.div>
      </section>

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">{t.sections.categories}</h2>
            <div className="h-1 w-20 bg-brand-blue rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {CATEGORIES.map((category, i) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={`/shop?category=${category.id}`} className="group block space-y-4 text-center">
                <div className="aspect-square rounded-3xl overflow-hidden bg-brand-surface border border-white/5 group-hover:border-brand-blue/50 transition-all">
                  <img src={category.image} alt={category.name[language]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h3 className="font-bold text-sm group-hover:text-brand-blue transition-colors">{category.name[language]}</h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="bg-brand-surface py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">{t.sections.bestSellers}</h2>
              <div className="h-1 w-20 bg-brand-blue rounded-full" />
            </div>
            <Link to="/shop" className="text-brand-blue flex items-center gap-2 text-sm font-bold hover:underline">
              {t.hero.shopNow} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Signals Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: ShieldCheck, title: 'Warranty Guaranteed', desc: '6-12 months warranty on all electronics.' },
            { icon: Zap, title: 'Express Delivery', desc: 'Fast shipping right to your doorstep anywhere in Libya.' },
            { icon: Star, title: 'Verified Authentic', desc: 'Original products from manufacturers we trust.' }
          ].map((item, i) => (
            <div key={i} className="flex gap-4 p-8 bg-brand-surface rounded-3xl border border-white/5">
              <item.icon className="w-10 h-10 text-brand-blue shrink-0" />
              <div>
                <h4 className="font-bold mb-1">{item.title}</h4>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
