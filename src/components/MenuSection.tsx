import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, Category, Language } from '../types';
import ProductCard from './ProductCard';

interface MenuSectionProps {
  products: Product[];
  categories: Category[];
  lang: Language;
}

export default function MenuSection({ products, categories, lang }: MenuSectionProps) {
  const [activeTab, setActiveTab] = useState<string>(categories[0]?.id || 'all');

  const specialProducts = products.filter(p => p.isSpecial);

  // If activeTab category is removed, reset to first available or 'all'
  const currentTab = categories.some(c => c.id === activeTab) ? activeTab : (categories[0]?.id || 'all');

  const filteredProducts = currentTab === 'all' 
    ? products 
    : products.filter(p => p.categoryId === currentTab);

  return (
    <div 
      className="w-full transition-colors duration-500 border-t border-b border-brand-gold/10"
      style={{ backgroundColor: 'var(--brand-menu-bg)' }}
    >
      <section id="menu" className="py-20 sm:py-28 px-4 max-w-7xl mx-auto">
      
      {/* ================= CATEGORIZED MENU SECTION ================= */}
      <div className="pt-8 border-t border-brand-gold/15">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl text-brand-primary font-semibold mt-1 mb-3">
            {lang === 'en' ? 'The Menu' : 'قائمة الطعام'}
          </h2>
          <p className="text-brand-text/70 text-xs sm:text-sm font-light font-sans-clean">
            {lang === 'en'
              ? 'Sourced ethically, served beautifully. Browse our comprehensive list of organic creations.'
              : 'مصادر أخلاقية، تُقدم بجمال أخّاذ. تصفح قائمتنا الشاملة من الإبداعات العضوية.'}
          </p>
        </div>

        {/* Dynamic Category Switcher Tabs */}
        {categories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-5 py-2.5 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300 font-sans cursor-pointer ${
                currentTab === 'all'
                  ? 'bg-brand-primary text-brand-gold border border-brand-gold/45'
                  : 'bg-transparent text-brand-text/75 hover:text-brand-primary border border-brand-gold/10 hover:border-brand-gold/30'
              }`}
            >
              {lang === 'en' ? 'All Creations' : 'جميع المشروبات'}
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300 font-sans cursor-pointer ${
                  currentTab === category.id
                    ? 'bg-brand-primary text-brand-gold border border-brand-gold/45'
                    : 'bg-transparent text-brand-text/75 hover:text-brand-primary border border-brand-gold/10 hover:border-brand-gold/30'
                }`}
              >
                {lang === 'en' ? category.nameEn : category.nameAr}
              </button>
            ))}
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <motion.div
                  layout
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                >
                  <ProductCard product={product} lang={lang} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-16 bg-brand-primary/5 border border-brand-gold/10 rounded-sm">
                <p className="text-brand-text/60 italic text-xs font-sans-clean">
                  {lang === 'en'
                    ? 'No products found in this organic collection.'
                    : 'لا توجد منتجات متوفرة في هذا القسم العضوي حاليًا.'}
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  </div>
  );
}
