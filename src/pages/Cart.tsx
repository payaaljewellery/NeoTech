
import React from 'react';
import { useApp } from '../context/AppContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft, MessageCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

export const Cart = () => {
  const { cart, updateQuantity, removeFromCart, t, language, isRTL } = useApp();
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const placeOrderWhatsApp = () => {
    const itemsList = cart.map(item => `- ${item.name[language]} x${item.quantity} (${item.price * item.quantity} LYD)`).join('\n');
    const text = encodeURIComponent(`New Order from NEOTECH Web Store:\n\n${itemsList}\n\nTotal: ${subtotal} LYD\n\nMethod: Cash on Delivery`);
    window.open(`https://wa.me/218910000000?text=${text}`, '_blank');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center space-y-8">
        <div className="w-24 h-24 bg-brand-surface rounded-full flex items-center justify-center mx-auto border border-white/5">
          <ShoppingBag className="w-12 h-12 text-gray-700" />
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{t.cart.empty}</h1>
          <p className="text-gray-400">Start adding items to your cart to power your tech.</p>
        </div>
        <Link 
          to="/shop"
          className="inline-flex items-center gap-2 px-8 py-4 bg-brand-blue text-white rounded-2xl font-bold shadow-xl shadow-brand-blue/20"
        >
          {t.hero.shopNow}
          {isRTL ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-12">{t.cart.title}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <motion.div 
              layout
              key={item.id} 
              className="flex items-center gap-6 p-4 bg-brand-surface rounded-3xl border border-white/5"
            >
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-brand-dark shrink-0">
                <img src={item.images[0]} alt={item.name[language]} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-white mb-1 truncate">{item.name[language]}</h3>
                <p className="text-brand-blue font-bold">{item.price} LYD</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center bg-brand-dark rounded-xl border border-white/10 px-2 py-1">
                  <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-brand-blue"><Minus className="w-4 h-4" /></button>
                  <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-brand-blue"><Plus className="w-4 h-4" /></button>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-brand-surface p-8 rounded-3xl border border-white/5 space-y-6">
            <h2 className="text-xl font-bold border-b border-white/10 pb-4">{t.cart.checkout}</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between text-gray-400">
                <span>{t.cart.subtotal}</span>
                <span>{subtotal} LYD</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Delivery (Tripoli)</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between items-center text-xl font-bold text-white pt-4 border-t border-white/10">
                <span>{t.cart.total}</span>
                <span>{subtotal} LYD</span>
              </div>
            </div>

            <div className="space-y-3">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={placeOrderWhatsApp}
                className="w-full py-4 bg-brand-blue text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-brand-blue/20"
              >
                <div className="p-1 bg-white rounded-full">
                   <MessageCircle className="w-4 h-4 text-brand-blue fill-current" />
                </div>
                {t.cart.whatsappOrder}
              </motion.button>
              <div className="text-center text-xs text-gray-500 pt-2 flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                {t.cart.delivery}
              </div>
            </div>
          </div>

          <div className="p-6 bg-brand-blue/5 border border-brand-blue/10 rounded-3xl flex items-center gap-4">
            <ShoppingBag className="w-10 h-10 text-brand-blue" />
            <div>
              <p className="text-sm font-bold">Fast Checkout</p>
              <p className="text-xs text-gray-400">No registration required. Just order via WhatsApp.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const About = () => {
  const { t } = useApp();
  return (
    <div className="max-w-4xl mx-auto px-4 py-24 space-y-12">
      <h1 className="text-5xl font-bold">Story of <span className="text-brand-blue">NEOTECH</span></h1>
      <div className="aspect-video rounded-3xl overflow-hidden">
         <img src="https://images.unsplash.com/photo-1491933382434-500287f9b54b?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="" />
      </div>
      <div className="prose prose-invert max-w-none text-gray-400 space-y-6 text-lg">
        <p>Founded in Tripoli, NEOTECH was born from a simple observation: Libyans deserve access to premium, authentic tech accessories without the premium markup or the risk of counterfeits.</p>
        <p>We specialze in high-performance hardware—from GaN chargers that power your laptop in minutes to clinical-grade audio gear and rugged power banks designed for the Libyan lifestyle.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
           <div className="p-6 bg-brand-surface rounded-2xl border border-white/5">
              <h4 className="text-white font-bold mb-2">Our Mission</h4>
              <p className="text-sm">To be the #1 destination for tech power-users in Libya, providing only original and tested products.</p>
           </div>
           <div className="p-6 bg-brand-surface rounded-2xl border border-white/5">
              <h4 className="text-white font-bold mb-2">Our Quality</h4>
              <p className="text-sm">Every product in our store undergoes a rigorous testing process by our hardware experts.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div className="space-y-8">
             <h1 className="text-5xl font-bold">Get in <span className="text-brand-blue">Touch</span></h1>
             <p className="text-gray-400 text-lg">Our experts are ready to help you choose the right gear for your setup. Reach out via your preferred channel.</p>
             
             <div className="space-y-6">
                <div className="flex items-center gap-6">
                   <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-brand-blue">
                      <MessageCircle className="w-6 h-6" />
                   </div>
                   <div>
                      <h4 className="font-bold">WhatsApp Support</h4>
                      <p className="text-sm text-gray-400">+218 91 000 0000</p>
                   </div>
                </div>
                <div className="flex items-center gap-6">
                   <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-brand-blue">
                      <ShoppingBag className="w-6 h-6" />
                   </div>
                   <div>
                      <h4 className="font-bold">Visit Store</h4>
                      <p className="text-sm text-gray-400">Hay Al-Andalus, Tripoli, Libya</p>
                   </div>
                </div>
             </div>
          </div>

          <div className="bg-brand-surface p-10 rounded-3xl border border-white/5 space-y-6">
             <h3 className="text-2xl font-bold mb-4">Send a Message</h3>
             <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                <input type="text" placeholder="Full Name" className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-brand-blue outline-none" />
                <input type="email" placeholder="Email Address" className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-brand-blue outline-none" />
                <textarea placeholder="How can we help?" rows={4} className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-brand-blue outline-none resize-none"></textarea>
                <button className="w-full py-4 bg-brand-blue text-white rounded-xl font-bold shadow-xl shadow-brand-blue/20">Send Inquiry</button>
             </form>
          </div>
       </div>
    </div>
  );
};
