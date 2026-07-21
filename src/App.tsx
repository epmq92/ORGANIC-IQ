import React, { useState, useEffect, CSSProperties } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Globe, Sparkles, ChevronRight, Compass } from 'lucide-react';
import { Product, Category, ThemeSettings, HomeSettings, Language } from './types';
import { 
  DEFAULT_CATEGORIES, 
  DEFAULT_PRODUCTS, 
  DEFAULT_THEMES, 
  DEFAULT_HOME 
} from './data/defaults';

// Component Imports
import HeroSlider from './components/HeroSlider';
import MenuSection from './components/MenuSection';
import LocationMap from './components/LocationMap';
import AdminDashboard from './components/AdminDashboard';
import BrandLogo from './components/BrandLogo';
import ProducerModal from './components/ProducerModal';

export default function App() {
  // Determine API base: if user opened the HTML via file://, fall back to localhost:3000
  const API_BASE = (() => {
    try {
      if (window.location.protocol === 'file:') return 'http://localhost:3000';
      return '';
    } catch (e) {
      return 'http://localhost:3000';
    }
  })();
  // --- 1. Persisted / Reactive State ---
  const [lang, setLang] = useState<Language>(() => {
    const cached = localStorage.getItem('organic_sip_lang');
    return (cached as Language) || 'en';
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const cached = localStorage.getItem('organic_sip_products');
    return cached ? JSON.parse(cached) : DEFAULT_PRODUCTS;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const cached = localStorage.getItem('organic_sip_categories');
    return cached ? JSON.parse(cached) : DEFAULT_CATEGORIES;
  });

  const [theme, setTheme] = useState<ThemeSettings>(() => {
    const cached = localStorage.getItem('organic_sip_theme_v2');
    return cached ? JSON.parse(cached) : DEFAULT_THEMES[0];
  });

  const [homeSettings, setHomeSettings] = useState<HomeSettings>(() => {
    const cached = localStorage.getItem('organic_sip_home');
    return cached ? JSON.parse(cached) : DEFAULT_HOME;
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  // UI Drawer / Overlay States
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false);
  const [isProducerOpen, setIsProducerOpen] = useState(false);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('organic_sip_lang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('organic_sip_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('organic_sip_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('organic_sip_theme_v2', JSON.stringify(theme));
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('organic_sip_home', JSON.stringify(homeSettings));
  }, [homeSettings]);

  useEffect(() => {
    localStorage.setItem('organic_sip_dark_mode_v2', String(isDarkMode));
  }, [isDarkMode]);

  // Fetch from Server & Poll every 10 seconds to keep visitors in sync
  useEffect(() => {
    const fetchMenu = () => {
      fetch(`${API_BASE}/api/menu`)
        .then(res => res.json())
        .then(data => {
          // If admin is open, do not overwrite state to prevent disturbing the owner's active editing
          if (!isAdminOpen) {
            if (data.products) setProducts(data.products);
            if (data.categories) setCategories(data.categories);
            if (data.theme) setTheme(data.theme);
            if (data.homeSettings) setHomeSettings(data.homeSettings);
          }
        })
        .catch(err => console.error('Error fetching menu from server:', err));
    };

    fetchMenu();
    const interval = setInterval(fetchMenu, 10000);
    return () => clearInterval(interval);
  }, [isAdminOpen]);

  // Apply Changes Handler (saves state to server)
  const handleApplyChanges = async (): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await fetch(`${API_BASE}/api/menu`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          products,
          categories,
          theme,
          homeSettings,
        }),
      });

      if (!response.ok) {
        const text = await response.text().catch(() => '');
        console.error('Apply failed, status:', response.status, text);
        return { success: false, message: `HTTP ${response.status}: ${text}` };
      }

      let data: any = null;
      try {
        data = await response.json();
      } catch (err) {
        console.error('Invalid JSON response from server while applying changes:', err);
        return { success: false, message: 'Invalid JSON response from server' };
      }

      if (data && data.success) return { success: true };
      return { success: false, message: data?.message || 'Unknown server response' };
    } catch (e) {
      console.error('Error applying changes to server:', e);
      return { success: false, message: String(e) };
    }
  };

  // Restore Default Settings Handler
  const handleRestoreDefaults = async () => {
    try {
      await fetch('/api/menu/reset', { method: 'POST' });
    } catch (e) {
      console.error('Failed to reset menu on server:', e);
    }
    setProducts(DEFAULT_PRODUCTS);
    setCategories(DEFAULT_CATEGORIES);
    setTheme(DEFAULT_THEMES[0]);
    setHomeSettings(DEFAULT_HOME);
    setIsDarkMode(true);
    localStorage.clear();
    triggerSmoothScroll('#home');
  };

  // Helper: Scroll smoothly to a section and close mobile menu
  const triggerSmoothScroll = (selector: string) => {
    setIsNavDrawerOpen(false);
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Inject Custom Color Variables for Tailwind v4 mapping
  const customVariables = {
    '--brand-primary': theme.primary,
    '--brand-primary-text': isDarkMode ? '#FFFFFF' : '#000000',
    '--brand-gold': theme.gold,
    '--brand-gold-text': isDarkMode ? '#FFFFFF' : '#000000',
    '--brand-bg': isDarkMode ? '#0B0F0C' : theme.bgWarm,
    '--brand-text': isDarkMode ? '#FFFFFF' : '#000000',
    '--brand-card-bg': isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.85)',
    '--brand-header-bg': isDarkMode ? '#103e37' : '#ffefb3',
    '--brand-header-text': isDarkMode ? '#FFFFFF' : '#000000',
    '--brand-map-bg': isDarkMode ? '#103e37' : '#ffefb3',
    '--brand-menu-bg': isDarkMode ? '#103e37' : '#ffefb3',
    '--brand-producer-bg': isDarkMode ? '#103e37' : '#ffefb3',
    '--brand-about-bg': isDarkMode ? '#103e37' : '#ffefb3',
  } as CSSProperties;

  return (
    <div 
      style={customVariables} 
      dir={lang === 'ar' ? 'rtl' : 'ltr'} 
      className={`min-h-screen bg-brand-bg text-brand-text transition-colors duration-500 overflow-x-hidden border-t-[5px] border-brand-gold ${isDarkMode ? 'dark-mode' : 'light-mode'}`}
    >
      {/* ================= HEADER / TOP NAVIGATION ================= */}
      <header 
        className="sticky top-0 z-40 border-b border-brand-gold/10 backdrop-blur-md transition-all duration-500"
        style={{
          backgroundColor: 'var(--brand-header-bg)',
          color: 'var(--brand-header-text)',
        }}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 h-16 sm:h-20 flex items-center justify-between">
          
          {/* 3 Lines Hamburger Button - Left Corner on English, Right on Arabic */}
          <button
            onClick={() => setIsNavDrawerOpen(true)}
            className="p-1.5 sm:p-2 border border-brand-gold/20 hover:border-brand-gold/50 rounded-sm text-[var(--brand-header-text)] transition-all duration-300 cursor-pointer"
            aria-label="Toggle navigation drawer"
          >
            <Menu size={18} className="sm:size-5 stroke-[1.5px]" />
          </button>

          {/* Central Stylized Brand Logo */}
          <a 
            href="#home"
            onClick={(e) => { e.preventDefault(); triggerSmoothScroll('#home'); }}
            className="flex items-center gap-1.5 sm:gap-2.5 group cursor-pointer"
          >
            <BrandLogo size={32} showText={false} className="sm:w-[38px] sm:h-[38px]" />
            <div className="flex flex-col">
              <span className="font-serif-luxury text-sm xs:text-base sm:text-xl font-semibold tracking-wider text-[var(--brand-header-text)] group-hover:text-brand-gold transition-colors duration-300 leading-tight">
                Organic Sip
              </span>
            </div>
          </a>

          {/* Action Buttons: Language and Theme Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Quick Language Switch Icon Button */}
            <button
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 border border-brand-gold/15 hover:border-brand-gold/45 rounded-full text-xs font-sans text-[var(--brand-header-text)] hover:text-brand-gold transition-all duration-300 cursor-pointer"
            >
              <Globe size={11} className="sm:size-[13px] stroke-[1.5px] text-brand-gold" />
              <span className="text-[9px] sm:text-[10px] uppercase font-semibold tracking-wider">
                {lang === 'en' ? 'العربية' : 'English'}
              </span>
            </button>

            {/* Permanently Dark Mode */}
          </div>

        </div>
      </header>

      {/* ================= 3-LINE DRAWER NAVIGATION ================= */}
      <AnimatePresence>
        {isNavDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsNavDrawerOpen(false)}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            />

            {/* Navigation Drawer Content */}
            <motion.div
              initial={{ x: lang === 'ar' ? '100%' : '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: lang === 'ar' ? '100%' : '-100%' }}
              transition={{ type: 'spring', damping: 24, stiffness: 220 }}
              className={`fixed top-0 bottom-0 z-50 w-[85%] max-w-[320px] p-6 sm:p-8 flex flex-col justify-between transition-colors duration-300 bg-[#081511] border-brand-gold/30 dark-mode ${
                lang === 'ar' ? 'right-0 border-l border-r-0' : 'left-0'
              }`}
            >
              {/* Inner Decorative Golden Border */}
              <div className="absolute inset-2.5 border border-brand-gold/20 pointer-events-none rounded-sm" />

              <div className="relative z-10">
                {/* Header inside drawer */}
                <div className="flex items-center justify-between pb-6 border-b border-brand-gold/15 mb-10">
                  <div className="flex items-center gap-2">
                    <BrandLogo size={32} showText={false} />
                    <div>
                      <h3 className="font-serif-luxury text-base font-semibold leading-tight text-white">
                        organic-sip-iq.com
                      </h3>
                      <p className="text-[8px] uppercase tracking-widest text-brand-gold font-sans">
                        {lang === 'en' ? 'Organic Luxury Reserve' : 'المحمية العضوية الفاخرة'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsNavDrawerOpen(false)}
                    className="p-1.5 rounded-full transition-colors cursor-pointer hover:bg-brand-gold/10 text-brand-gold"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Primary Route Buttons inside Drawer */}
                <nav className="flex flex-col gap-5">
                  
                  {/* MENU button */}
                  <button
                    onClick={() => triggerSmoothScroll('#menu')}
                    className="flex items-center justify-between py-2 text-left transition-colors font-serif-luxury text-xl font-medium cursor-pointer text-white hover:text-brand-gold"
                  >
                    <span>{lang === 'en' ? 'The Menu' : 'قائمة الطعام العضوية'}</span>
                    <ChevronRight size={16} className={`text-brand-gold ${lang === 'ar' ? 'rotate-180' : ''}`} />
                  </button>

                  {/* LOCATION button */}
                  <button
                    onClick={() => triggerSmoothScroll('#location')}
                    className="flex items-center justify-between py-2 text-left transition-colors font-serif-luxury text-xl font-medium cursor-pointer text-white hover:text-brand-gold"
                  >
                    <span>{lang === 'en' ? 'Our Location' : 'موقع الصالون'}</span>
                    <ChevronRight size={16} className={`text-brand-gold ${lang === 'ar' ? 'rotate-180' : ''}`} />
                  </button>

                  {/* PRODUCER button */}
                  <button
                    onClick={() => {
                      setIsNavDrawerOpen(false);
                      setIsProducerOpen(true);
                    }}
                    className="flex items-center justify-between py-2 text-left transition-colors font-serif-luxury text-xl font-medium cursor-pointer text-white hover:text-brand-gold"
                  >
                    <span>{lang === 'en' ? 'Producer' : 'المنتج / المطور'}</span>
                    <ChevronRight size={16} className={`text-brand-gold ${lang === 'ar' ? 'rotate-180' : ''}`} />
                  </button>



                  {/* ORGANIC button (Store/Owner Control) */}
                  <div className="pt-6 border-t border-brand-gold/15 mt-4">
                    <button
                      onClick={() => {
                        setIsNavDrawerOpen(false);
                        setIsAdminOpen(true);
                      }}
                      className="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-sm font-sans text-xs tracking-wider uppercase font-semibold transition-all duration-300 cursor-pointer bg-transparent text-white/90 border border-brand-gold/30 hover:border-brand-gold hover:bg-brand-gold/10 hover:shadow-[0_0_15px_rgba(242,193,68,0.3)] hover:text-brand-gold group"
                    >
                      <Compass size={14} className="animate-spin-slow text-brand-gold/80 group-hover:text-brand-gold group-hover:scale-110 transition-all duration-300" />
                      <span className="text-white/90 group-hover:text-brand-gold transition-colors duration-300">{lang === 'en' ? 'Organic Console (Owner)' : 'بوابة المالك (ORGANIC SIP)'}</span>
                    </button>
                  </div>

                </nav>
              </div>

              {/* Drawer Footer details */}
              <div className="relative z-10 text-center text-[10px] font-sans tracking-wide">
                <p className="text-white/60">© {new Date().getFullYear()} ORGANIC SIP CO.</p>
                <p className="mt-1 text-brand-gold">{lang === 'en' ? 'Iraq * Kirkuk' : 'العراق * كركوك'}</p>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ================= HERO SLOW BACKGROUND SLIDER ================= */}
      <HeroSlider images={homeSettings.sliderImages} lang={lang} />

      {/* ================= THE MENU SECTION ================= */}
      <MenuSection products={products} categories={categories} lang={lang} />

      {/* ================= GEOLOCATION SECTION ================= */}
      <LocationMap lang={lang} isDarkMode={isDarkMode} />



      {/* ================= FOOTER ================= */}
      <footer className="bg-brand-primary text-white border-t border-brand-gold/20 py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Logo & Slogan Column */}
          <div className="md:col-span-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <BrandLogo size={46} showText={false} />
                <h3 className="font-serif-luxury text-2xl text-brand-gold font-semibold tracking-wide">
                  organic-sip-iq.com
                </h3>
              </div>
              <p className="font-sans text-xs text-white/70 max-w-sm mt-1 leading-relaxed font-light">
                {lang === 'en' 
                  ? 'Crafting certified organic, botanical coffee & high tea experiences wrapped in golden luxury.' 
                  : 'نصنع لك توليفات القهوة والشاي العضوية المعتمدة بلمسات من الذهب والجمال البوتيكي الراقي.'}
              </p>
            </div>
            <p className="font-sans text-[10px] text-white/40 mt-6 tracking-wider">
              © {new Date().getFullYear()} ORGANIC SIP INC. {lang === 'en' ? 'ALL RIGHTS RESERVED.' : 'جميع الحقوق محفوظة.'}
            </p>
          </div>

          {/* Quick links replaced with Producer Info */}
          <div>
            <h4 className="font-serif-luxury text-sm font-semibold tracking-wide text-brand-gold mb-4.5">
              {lang === 'en' ? 'The Producer' : 'المنتج / المطور'}
            </h4>
            <ul className="space-y-2.5 text-xs text-white/80 font-light">
              <li>
                <a href="https://instagram.com/xs92m" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors flex items-center gap-2 cursor-pointer">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/60"></span>
                  <span>Instagram: @xs92m</span>
                </a>
              </li>
              <li>
                <a href="https://wa.me/9647706460230" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors flex items-center gap-2 cursor-pointer">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/60"></span>
                  <span>WhatsApp: @xm92s</span>
                </a>
              </li>
              <li>
                <a href="https://t.me/xs92m" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors flex items-center gap-2 cursor-pointer">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/60"></span>
                  <span>Telegram: xs92m</span>
                </a>
              </li>
              <li>
                <a href="tel:07706460230" className="hover:text-brand-gold transition-colors flex items-center gap-2 cursor-pointer">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/60"></span>
                  <span>{lang === 'en' ? 'Phone' : 'رقم الهاتف'}: 0770 646 0230</span>
                </a>
              </li>
              <li className="pt-1.5">
                <button 
                  onClick={() => setIsProducerOpen(true)} 
                  className="text-[11px] font-sans text-brand-gold font-medium tracking-wider uppercase hover:underline hover:underline-offset-4 transition-all duration-300 cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles size={11} className="animate-pulse text-brand-gold" />
                  {lang === 'en' ? 'Interactive Profile' : 'الملف التفاعلي'}
                </button>
              </li>
            </ul>
          </div>

          {/* Store Hours */}
          <div className="flex flex-col justify-between">
            <div>
              <h4 className="font-serif-luxury text-sm font-semibold tracking-wide text-brand-gold mb-4.5">
                {lang === 'en' ? 'Hours' : 'ساعات العمل'}
              </h4>
              <p className="text-xs text-white/80 font-light leading-relaxed">
                {lang === 'en' ? 'Monday – Sunday' : 'الإثنين – الأحد'} <br />
                8:00 AM – Midnight
              </p>
            </div>
          </div>

        </div>
      </footer>

      {/* ================= OWNER ADMIN DASHBOARD MODAL/DRAWER ================= */}
      <AnimatePresence>
        {isAdminOpen && (
          <AdminDashboard
            products={products}
            setProducts={setProducts}
            categories={categories}
            setCategories={setCategories}
            currentTheme={theme}
            setTheme={setTheme}
            homeSettings={homeSettings}
            setHomeSettings={setHomeSettings}
            lang={lang}
            onRestoreDefaults={handleRestoreDefaults}
            isOpen={isAdminOpen}
            onClose={() => setIsAdminOpen(false)}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
            onApplyChanges={handleApplyChanges}
          />
        )}
      </AnimatePresence>

      {/* ================= PRODUCER LINKS MODAL ================= */}
      <AnimatePresence>
        {isProducerOpen && (
          <ProducerModal
            isOpen={isProducerOpen}
            onClose={() => setIsProducerOpen(false)}
            lang={lang}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
