
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Gift, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ExitIntentPopup = () => {
  const [show, setShow] = useState(false);
  const { t } = useApp();

  useEffect(() => {
    const handleMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0 && !localStorage.getItem('saw-popup')) {
        setShow(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseOut);
    return () => document.removeEventListener('mouseleave', handleMouseOut);
  }, []);

  const close = () => {
    setShow(false);
    localStorage.setItem('saw-popup', 'true');
  };

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-brand-surface border border-white/10 p-10 rounded-[40px] max-w-lg w-full overflow-hidden shadow-2xl"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/20 blur-[60px] rounded-full" />
            
            <button onClick={close} className="absolute top-6 right-6 text-gray-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>

            <div className="relative z-10 text-center space-y-6">
              <div className="w-16 h-16 bg-brand-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-brand-blue" />
              </div>
              <h2 className="text-3xl font-bold">Wait! Don't leave yet.</h2>
              <p className="text-gray-400">Get <span className="text-brand-blue font-bold">10% OFF</span> on your first order. Use code at checkout on WhatsApp.</p>
              
              <div className="bg-white/5 border border-dashed border-brand-blue/50 p-4 rounded-2xl">
                <span className="text-2xl font-mono font-bold tracking-widest text-brand-blue">NEOPREMIUM10</span>
              </div>

              <button 
                onClick={close}
                className="w-full py-4 bg-brand-blue text-white rounded-2xl font-bold shadow-xl shadow-brand-blue/20 flex items-center justify-center gap-3"
              >
                <Zap className="w-5 h-5 fill-current" />
                Claim This Offer
              </button>
              
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">Valid for new customers only • Limited time</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
