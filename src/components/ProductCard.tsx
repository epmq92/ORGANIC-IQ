import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { Product, Language } from '../types';

interface ProductCardProps {
  product: Product;
  lang: Language;
  key?: string;
}

export default function ProductCard({ product, lang }: ProductCardProps) {
  // Format IQD price beautifully
  const formatPrice = (price: number) => {
    if (lang === 'ar') {
      return `${price.toLocaleString('ar-IQ')} د.ع`;
    }
    return `${price.toLocaleString('en-US')} IQD`;
  };

  const name = lang === 'en' ? product.nameEn : product.nameAr;
  const desc = lang === 'en' ? product.descEn : product.descAr;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="group flex flex-col h-full bg-[var(--brand-card-bg,rgba(255,255,255,0.7))] border border-brand-gold/10 rounded-2xl p-3 shadow-xs hover:shadow-md hover:border-brand-gold/25 transition-all duration-500"
    >
      {/* Drink Image Wrapper */}
      <div className="relative w-full aspect-[4/3] sm:h-36 overflow-hidden rounded-xl bg-brand-primary/5 mb-3">
        <img
          src={product.image}
          alt={name}
          className="w-full h-full object-cover grayscale-[0.25] group-hover:grayscale-0 group-hover:scale-105 transition-transform duration-700 ease-out"
          referrerPolicy="no-referrer"
        />
        {/* Soft Golden Gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Special/Signature Floating Tag */}
        {product.isSpecial && (
          <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 px-2 py-0.5 bg-brand-primary text-brand-gold border border-brand-gold/30 rounded-full shadow-sm">
            <Sparkles size={8} className="text-brand-gold animate-pulse" />
            <span className="text-[8px] uppercase tracking-wider font-sans font-semibold">
              {lang === 'en' ? 'Signature' : 'توقيع'}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow px-1">
        {/* Name and Price row */}
        <div className="flex justify-between items-start gap-2">
          <h4 className="font-serif-luxury text-base sm:text-lg text-brand-primary leading-tight font-medium group-hover:text-brand-gold transition-colors duration-300">
            {name}
          </h4>
          <span className="text-[11px] font-mono font-bold text-brand-gold whitespace-nowrap bg-brand-primary/5 px-2 py-0.5 rounded-md border border-brand-gold/10">
            {formatPrice(product.priceIqd)}
          </span>
        </div>

        {/* Ingredients/Description */}
        <p className="text-[10px] sm:text-[11px] mt-2.5 text-brand-text/65 leading-relaxed font-sans font-light flex-grow">
          {desc}
        </p>
      </div>
    </motion.div>
  );
}
