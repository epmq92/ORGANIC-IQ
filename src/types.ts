export interface Product {
  id: string;
  nameEn: string;
  nameAr: string;
  priceIqd: number;
  descEn: string;
  descAr: string;
  image: string;
  categoryId: string;
  isSpecial: boolean;
}

export interface Category {
  id: string;
  nameEn: string;
  nameAr: string;
}

export interface ThemeSettings {
  primary: string; // Luxury Forest Green (e.g., #0F2E22)
  gold: string; // Golden accents (e.g., #C5A85C)
  bgWarm: string; // Soft organic cream (e.g., #F9F8F5)
  textDark: string; // Muted deep dark green (e.g., #1A2F25)
  name: string; // Theme Preset name
}

export interface HomeSettings {
  sliderImages: string[];
  aboutUsTitleEn: string;
  aboutUsTitleAr: string;
  aboutUsTextEn: string;
  aboutUsTextAr: string;
  whatsappNumber: string; // For inquiries
  producerImage?: string; // Optional image for the producer/owner section
}

export type Language = 'en' | 'ar';
