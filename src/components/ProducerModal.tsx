import { motion } from 'motion/react';
import { X, Instagram, Phone, Send, MessageCircle, ExternalLink, Sparkles } from 'lucide-react';
import { Language } from '../types';
import BrandLogo from './BrandLogo';

interface ProducerModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export default function ProducerModal({ isOpen, onClose, lang }: ProducerModalProps) {
  if (!isOpen) return null;

  // Sourcing links
  const contacts = [
    {
      name: lang === 'en' ? 'Instagram' : 'إنستغرام',
      handle: '@xs92m',
      url: 'https://instagram.com/xs92m',
      icon: Instagram,
      color: 'from-pink-600 to-amber-500',
      textColor: 'text-pink-400',
    },
    {
      name: lang === 'en' ? 'WhatsApp' : 'واتساب',
      handle: '@xm92s',
      url: 'https://wa.me/9647706460230',
      icon: MessageCircle,
      color: 'from-emerald-600 to-green-500',
      textColor: 'text-emerald-400',
    },
    {
      name: lang === 'en' ? 'Phone Number' : 'رقم الهاتف',
      handle: '0770 646 0230',
      url: 'tel:07706460230',
      icon: Phone,
      color: 'from-blue-600 to-cyan-500',
      textColor: 'text-blue-400',
    },
    {
      name: lang === 'en' ? 'Telegram' : 'تيليغرام',
      handle: 'xs92m',
      url: 'https://t.me/xs92m',
      icon: Send,
      color: 'from-sky-600 to-blue-400',
      textColor: 'text-sky-400',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 1. Backdrop overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* 2. Imaginary, Ethereal Atmospheric Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <motion.div
          animate={{
            scale: [1, 1.2, 0.9, 1.1, 1],
            rotate: [0, 90, 180, 270, 360],
            x: [0, 40, -30, 20, 0],
            y: [0, -40, 30, -10, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-[10%] -left-[10%] w-[60%] aspect-square rounded-full bg-gradient-to-tr from-emerald-950/40 via-brand-gold/10 to-transparent blur-3xl opacity-60"
        />
        <motion.div
          animate={{
            scale: [1, 0.85, 1.15, 1, 1],
            rotate: [360, 270, 180, 90, 0],
            x: [0, -30, 40, -20, 0],
            y: [0, 30, -40, 20, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -bottom-[10%] -right-[10%] w-[60%] aspect-square rounded-full bg-gradient-to-bl from-brand-gold/15 via-emerald-900/30 to-transparent blur-3xl opacity-50"
        />
        {/* Shimmering gold stars / dust */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(218,165,32,0.06),transparent_70%)]" />
      </div>

      {/* 3. Modal Container Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="relative z-20 w-full max-w-md bg-[#050f0b]/90 border border-brand-gold/30 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-xl"
      >
        {/* Inner thin decorative golden frame */}
        <div className="absolute inset-2 border border-brand-gold/10 pointer-events-none rounded-xl" />

        {/* Golden Sparkles in Corner */}
        <div className="absolute top-4 left-4 text-brand-gold/30 pointer-events-none">
          <Sparkles size={16} className="animate-pulse" />
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 text-white/60 hover:text-brand-gold hover:bg-white/5 rounded-full transition-all duration-300 cursor-pointer"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Modal content */}
        <div className="p-6 sm:p-8 flex flex-col items-center">
          
          {/* Decorative Logo / Badge */}
          <div className="relative mb-5 flex items-center justify-center">
            <div className="absolute inset-0 bg-brand-gold/20 rounded-full blur-xl animate-pulse" />
            <div className="relative w-16 h-16 rounded-full border border-brand-gold/40 flex items-center justify-center bg-[#081511]">
              <BrandLogo size={42} showText={false} />
            </div>
          </div>

          {/* Heading */}
          <h3 className="font-serif-luxury text-2xl text-white font-semibold text-center tracking-wide mb-1">
            {lang === 'en' ? 'The Producer' : 'المنتج / المطور'}
          </h3>
          <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-brand-gold text-center font-semibold mb-6">
            {lang === 'en' ? 'Digital Sourcing & Creative Direction' : 'المطور الفني والاتصال الإبداعي'}
          </p>

          <p className="font-sans text-xs text-white/70 text-center font-light leading-relaxed max-w-xs mb-8">
            {lang === 'en'
              ? 'Connect directly with our creative developer & producer through any of the official luxury channels listed below.'
              : 'تواصل مباشرة مع منتج ومطور المنصة الفني من خلال قنوات الاتصال الرسمية المدرجة أدناه.'}
          </p>

          {/* Link Cards */}
          <div className="w-full space-y-3.5 relative z-30">
            {contacts.map((c, index) => {
              const IconComp = c.icon;
              return (
                <motion.a
                  key={index}
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 + 0.15 }}
                  className="flex items-center justify-between p-4 rounded-xl border border-white/5 hover:border-brand-gold/40 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    {/* Icon container */}
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${c.color} bg-opacity-20 text-white shadow-inner group-hover:scale-105 transition-transform duration-300`}>
                      <IconComp size={18} className="stroke-[2px]" />
                    </div>
                    {/* Handle details */}
                    <div className="flex flex-col">
                      <span className="font-sans text-[10px] uppercase tracking-wider text-white/50 font-semibold leading-none mb-1">
                        {c.name}
                      </span>
                      <span className="font-mono text-sm text-brand-gold font-medium leading-none">
                        {c.handle}
                      </span>
                    </div>
                  </div>

                  {/* External Arrow */}
                  <div className="text-white/30 group-hover:text-brand-gold group-hover:translate-x-0.5 transition-all duration-300">
                    <ExternalLink size={14} />
                  </div>
                </motion.a>
              );
            })}
          </div>

          {/* Luxury Footer Line */}
          <div className="mt-8 pt-5 border-t border-brand-gold/10 w-full text-center">
            <span className="font-serif-luxury text-[10px] italic text-white/40 tracking-wider">
              {lang === 'en' ? 'Designed for ORGANIC SIP' : 'صُمم خصيصاً لـ ORGANIC SIP'}
            </span>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
