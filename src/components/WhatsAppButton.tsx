
import React from 'react';
import { Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';

export const WhatsAppButton = () => {
  const { t, isRTL } = useApp();
  const phoneNumber = '218910000000'; // Placeholder Libyan number
  const message = encodeURIComponent('Hello NEOTECH, I have an inquiry about...');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`fixed bottom-6 ${isRTL ? 'left-6' : 'right-6'} z-40 bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center gap-2 group overflow-hidden transition-all hover:pr-8 rtl:hover:pl-8`}
    >
      <Phone className="w-6 h-6 fill-current" />
      <span className="max-w-0 group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap font-medium text-sm">
        {t.hero.whatsapp}
      </span>
    </motion.a>
  );
};
