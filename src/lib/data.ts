
import { Product, Category } from '../types';

export const CATEGORIES: Category[] = [
  { id: 'chargers', name: { en: 'Chargers', ar: 'شواحن' }, image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&q=80&w=400' },
  { id: 'cables', name: { en: 'Cables', ar: 'كوابل' }, image: 'https://images.unsplash.com/photo-1589139134012-e7df18fd3301?auto=format&fit=crop&q=80&w=400' },
  { id: 'powerbanks', name: { en: 'Power Banks', ar: 'خازن طاقة' }, image: 'https://images.unsplash.com/photo-1609592809440-621817751792?auto=format&fit=crop&q=80&w=400' },
  { id: 'audio', name: { en: 'Audio', ar: 'سماعات' }, image: 'https://images.unsplash.com/photo-1546435770-a3e426ff4737?auto=format&fit=crop&q=80&w=400' },
  { id: 'laptop', name: { en: 'Laptop Acc.', ar: 'ملحقات لابتوب' }, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=400' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'choetech-65w-gan',
    name: { en: 'Choetech 65W GaN Charger', ar: 'شاحن شوتيك 65 واط بتقنية GaN' },
    description: { 
      en: 'Ultra-compact 65W charger with dual USB-C and USB-A ports. Perfect for MacBook and iPhone fast charging.', 
      ar: 'شاحن 65 واط فائق الصغر بمنفذين USB-C و USB-A. مثالي للشحن السريع لأجهزة ماك بوك وآيفون.' 
    },
    price: 145,
    originalPrice: 180,
    category: 'chargers',
    images: [
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1619130730560-f5975c63740e?auto=format&fit=crop&q=80&w=800'
    ],
    features: {
      en: ['65W Fast Charging', 'Dual Port Output', 'GaN Technology', 'Overheat Protection'],
      ar: ['شحن سريع 65 واط', 'مخرج منفذ مزدوج', 'تقنية GaN', 'حماية من الحرارة الزائدة']
    },
    stock: 5,
    isBestSeller: true,
    brand: 'Choetech'
  },
  {
    id: 'anker-magnetic-battery',
    name: { en: 'Anker Magnetic Battery 5K', ar: 'بطارية انكر المغناطيسية 5000' },
    description: {
      en: 'Snap-and-go magnetic portable charger for iPhone 12/13/14 series. High-efficiency charging.',
      ar: 'شاحن محمول مغناطيسي سهل الاستخدام لسلسلة iPhone 12/13/14. شحن عالي الكفاءة.'
    },
    price: 210,
    category: 'powerbanks',
    images: [
      'https://images.unsplash.com/photo-1609592809440-621817751792?auto=format&fit=crop&q=80&w=800'
    ],
    features: {
      en: ['Magnetic Alignment', '5000mAh Capacity', 'Slim Design', 'USB-C In/Out'],
      ar: ['محاذاة مغناطيسية', 'سعة 5000 مللي أمبير', 'تصميم نحيف', 'مدخل/مخرج USB-C']
    },
    stock: 12,
    isHot: true,
    brand: 'Anker'
  },
  {
    id: 'baseus-100w-cable',
    name: { en: 'Baseus 100W USB-C to USB-C', ar: 'كابل بيسوس 100 واط من USB-C إلى USB-C' },
    description: {
      en: 'Reinforced 2-meter charging cable support 100W PD charging for laptops and phones.',
      ar: 'كابل شحن بطول 2 متر يدعم شحن بقوة 100 واط PD لأجهزة الكمبيوتر والهواتف.'
    },
    price: 45,
    originalPrice: 60,
    category: 'cables',
    images: [
      'https://images.unsplash.com/photo-1589139134012-e7df18fd3301?auto=format&fit=crop&q=80&w=800'
    ],
    features: {
      en: ['100W PD Support', '2 Meters Length', 'Nylon Braided', 'Durable Connectors'],
      ar: ['يدعم شحن 100 واط', 'طول 2 متر', 'نايلون مضفر', 'موصلات متينة']
    },
    stock: 25,
    brand: 'Baseus'
  },
  {
    id: 'neotech-pro-buds',
    name: { en: 'NEOTECH Pro Buds Wireless', ar: 'سماعات نيوتك برو لاسلكية' },
    description: {
      en: 'Premium active noise cancellation wireless earbuds with 30-hour battery life.',
      ar: 'سماعات أذن لاسلكية متميزة بخاصية إلغاء الضوضاء وعمر بطارية يصل إلى 30 ساعة.'
    },
    price: 185,
    category: 'audio',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800'
    ],
    features: {
      en: ['Active Noise Cancellation', '30h Playtime', 'Touch Control', 'IPX5 Waterproof'],
      ar: ['إلغاء الضوضاء النشط', '30 ساعة تشغيل', 'تحكم باللمس', 'مقاومة للماء IPX5']
    },
    stock: 3,
    isBestSeller: true,
    brand: 'NEOTECH'
  },
  {
    id: 'ugreen-7-in-1-hub',
    name: { en: 'Ugreen 7-in-1 USB-C Hub', ar: 'موزع يوجرين 7 في 1 بمدخل USB-C' },
    description: {
      en: 'Expand your laptop with 4K HDMI, SD Card reader, and multiple USB ports.',
      ar: 'قم بتوسيع منافذ اللابتوب مع HDMI بدقة 4K وقارئ بطاقات SD ومنافذ USB متعددة.'
    },
    price: 240,
    category: 'laptop',
    images: [
      'https://images.unsplash.com/photo-1625766763788-95accad7dc51?auto=format&fit=crop&q=80&w=800'
    ],
    features: {
      en: ['4K HDMI Output', 'SD/TF Slots', '100W Pass-through', 'USB 3.0 Ports'],
      ar: ['مخرج HDMI بدقة 4K', 'فتحات SD/TF', 'شحن بقوة 100 واط', 'منافذ USB 3.0']
    },
    stock: 8,
    brand: 'Ugreen'
  }
];
