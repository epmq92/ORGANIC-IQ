import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types';

interface HeroSliderProps {
  images: string[];
  lang: Language;
}

export default function HeroSlider({ images, lang }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000); // Slowly slide every 6 seconds
    return () => clearInterval(interval);
  }, [images]);

  if (images.length === 0) return null;

  return (
    <div id="home" className="relative w-full h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] overflow-hidden flex items-end justify-center bg-black pb-24 sm:pb-32">
      {/* Background Slides */}
      <div className="absolute inset-0 z-0 bg-black">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Organic Sip Showcase ${currentIndex + 1}`}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1.02 }}
            exit={{ opacity: 0, scale: 1.0 }}
            transition={{ duration: 2.2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover filter brightness-[0.7] contrast-[1.05]"
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>
      </div>

      {/* Decorative Black Gradient / Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/10 to-black/35 pointer-events-none" />

      {/* Floating Hero Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
        {/* Big Editorial Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1.2 }}
          className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-medium tracking-tight leading-[1.15] mb-6 drop-shadow-md"
        >
          ORGANIC SIP
        </motion.h1>

        {/* Soft Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1.0 }}
          className="flex flex-row gap-4 justify-center"
        >
          <a
            href="#menu"
            className="px-6 py-3 bg-brand-primary border border-brand-gold/40 hover:border-brand-gold text-brand-gold font-sans font-medium text-xs tracking-widest uppercase transition-all duration-300 rounded-full hover:shadow-[0_0_15px_rgba(197,168,92,0.15)] bg-opacity-90 backdrop-blur-sm"
          >
            {lang === 'en' ? 'Explore Menu' : 'استكشف القائمة'}
          </a>
        </motion.div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center gap-2.5">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
              idx === currentIndex
                ? 'w-6 bg-brand-gold'
                : 'bg-white/45 hover:bg-white'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
