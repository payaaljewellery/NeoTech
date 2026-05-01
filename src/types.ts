
export type Language = 'en' | 'ar';

export interface Product {
  id: string;
  name: { en: string; ar: string };
  description: { en: string; ar: string };
  price: number;
  originalPrice?: number;
  category: string;
  images: string[];
  features: { en: string[]; ar: string[] };
  stock: number;
  isBestSeller?: boolean;
  isHot?: boolean;
  brand: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type Category = {
  id: string;
  name: { en: string; ar: string };
  image: string;
};
