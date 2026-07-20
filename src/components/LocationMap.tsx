import { MapPin, Clock, Phone, Navigation } from 'lucide-react';
import { Language } from '../types';

interface LocationMapProps {
  lang: Language;
  isDarkMode: boolean;
}

export default function LocationMap({ lang, isDarkMode }: LocationMapProps) {
  const baghdadGmapsUrl = "https://maps.app.goo.gl/q8PnzFpSvRScutE5A";

  return (
    <section 
      id="location" 
      className="py-20 sm:py-24 border-t border-b border-brand-gold/10 relative overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: 'var(--brand-map-bg)' }}
    >
      {/* Absolute background golden lines */}
      <div className={`absolute inset-0 opacity-[0.04] pointer-events-none transition-colors duration-300 ${
        isDarkMode ? 'text-brand-gold' : 'text-brand-primary'
      }`}>
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Text details - 5 cols */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <span className="text-[10px] tracking-[0.25em] uppercase font-sans text-brand-gold font-bold mb-2">
            {lang === 'en' ? 'Sip with Us' : 'تفضل بزيارتنا'}
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-brand-primary font-semibold mb-6">
            {lang === 'en' ? 'Our Sanctuary' : 'ملاذنا الفاخر'}
          </h2>
          <div className="w-16 h-[1px] bg-brand-gold mb-8" />

          {/* Details list */}
          <div className="space-y-6">
            {/* Address */}
            <div className="flex gap-4 items-start">
              <div className={`p-2.5 rounded-lg transition-colors duration-300 ${
                isDarkMode 
                  ? 'bg-brand-primary/20 border border-brand-gold/30 text-brand-gold' 
                  : 'bg-brand-primary border border-brand-gold/45 text-brand-gold'
              }`}>
                <MapPin size={18} />
              </div>
              <div>
                <h4 className="font-serif-luxury text-sm font-semibold text-brand-primary mb-1">
                  {lang === 'en' ? 'Location' : 'العنوان الفاخر'}
                </h4>
                <p className="font-sans text-xs text-brand-text/80 leading-relaxed font-light">
                  {lang === 'en' 
                    ? 'Baghdad Road, Kirkuk, Iraq' 
                    : 'طريق بغداد، كركوك، العراق'}
                </p>
              </div>
            </div>

            {/* Hours */}
            <div className="flex gap-4 items-start">
              <div className={`p-2.5 rounded-lg transition-colors duration-300 ${
                isDarkMode 
                  ? 'bg-brand-primary/20 border border-brand-gold/30 text-brand-gold' 
                  : 'bg-brand-primary border border-brand-gold/45 text-brand-gold'
              }`}>
                <Clock size={18} />
              </div>
              <div>
                <h4 className="font-serif-luxury text-sm font-semibold text-brand-primary mb-1">
                  {lang === 'en' ? 'Opening Hours' : 'أوقات العمل'}
                </h4>
                <p className="font-sans text-xs text-brand-text/80 leading-relaxed font-light">
                  {lang === 'en' ? 'Daily: 8:00 AM – Midnight' : 'يومياً: 8:00 صباحاً – منتصف الليل'}
                </p>
                <p className="font-sans text-[11px] text-brand-text/60">
                  {lang === 'en' ? 'Weekend High Tea: 3:00 PM – 7:00 PM' : 'شاي العصر الفاخر بالويكند: 3:00 م – 7:00 م'}
                </p>
              </div>
            </div>

            {/* Inquiries */}
            <div className="flex gap-4 items-start">
              <div className={`p-2.5 rounded-lg transition-colors duration-300 ${
                isDarkMode 
                  ? 'bg-brand-primary/20 border border-brand-gold/30 text-brand-gold' 
                  : 'bg-brand-primary border border-brand-gold/45 text-brand-gold'
              }`}>
                <Phone size={18} />
              </div>
              <div>
                <h4 className="font-serif-luxury text-sm font-semibold text-brand-primary mb-1">
                  {lang === 'en' ? 'Concierge Phone' : 'هاتف الاستفسارات'}
                </h4>
                <p className="font-sans text-xs text-brand-text/80 leading-relaxed font-light">
                  +964 (0) 770 000 0000
                </p>
                <p className="font-sans text-[11px] text-brand-text/60">
                  {lang === 'en' ? 'Available for private reserve events' : 'متاح لحجوزات المناسبات الخاصة'}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <a
              href={baghdadGmapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-5 py-3 font-sans font-medium text-xs tracking-wider uppercase transition-all duration-300 rounded-full cursor-pointer ${
                isDarkMode 
                  ? 'bg-brand-gold hover:bg-brand-gold/90 text-brand-primary border border-brand-gold' 
                  : 'bg-brand-primary hover:bg-brand-primary/90 text-brand-gold border border-brand-gold/40'
              }`}
            >
              <Navigation size={12} className={isDarkMode ? 'keep-dark' : 'text-brand-gold'} />
              <span className={isDarkMode ? 'keep-dark' : 'text-brand-gold'}>
                {lang === 'en' ? 'Get Directions' : 'احصل على الاتجاهات'}
              </span>
            </a>
          </div>
        </div>

        {/* Custom Luxury Map Illustration Card - 7 cols */}
        <div className="lg:col-span-7">
          <div className={`relative border rounded-2xl overflow-hidden p-3 shadow-lg transition-all duration-300 ${
            isDarkMode ? 'bg-[#081511] border-brand-gold/30 shadow-black/20' : 'bg-brand-bg border-brand-gold/25'
          }`}>
            {/* Embedded Inner Golden Frame */}
            <div className={`absolute inset-1.5 border pointer-events-none rounded-xl transition-all duration-300 ${
              isDarkMode ? 'border-brand-gold/20' : 'border-brand-gold/10'
            }`} />
            
            {/* The Map Graphic */}
            <a
              href={baghdadGmapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`relative block w-full aspect-video rounded-xl overflow-hidden flex items-center justify-center p-4 transition-all duration-500 hover:scale-[1.01] hover:brightness-[1.03] cursor-pointer group ${
                isDarkMode ? 'bg-[#0a2218] text-brand-gold' : 'bg-brand-gold/15 text-brand-primary'
              }`}
            >
              
              {/* Dynamic Abstract Blueprint Grid */}
              <div className="absolute inset-0 opacity-20">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 0 50 Q 150 150 300 50 T 600 50" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M 0 100 Q 200 40 400 120 T 800 100" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M 0 150 Q 250 200 500 100 T 1000 150" fill="none" stroke="currentColor" strokeWidth="1" />
                  <circle cx="350" cy="110" r="140" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                </svg>
              </div>

              {/* Central Luxury Pin */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="relative">
                  {/* Pulsing ring */}
                  <span className={`absolute -inset-2 rounded-full animate-ping ${isDarkMode ? 'bg-brand-gold/30' : 'bg-brand-primary/30'}`} />
                  <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-110 ${
                    isDarkMode ? 'bg-[#081511] border-brand-gold text-brand-gold' : 'bg-brand-primary border-brand-gold text-brand-gold'
                  }`}>
                    <MapPin size={20} className="stroke-[2px] text-brand-gold" />
                  </div>
                </div>
                <div className="mt-3.5 border border-brand-gold/40 rounded-xl px-4.5 py-2.5 text-center shadow-md max-w-xs backdrop-blur-md bg-brand-primary/95 transition-all duration-300 group-hover:border-brand-gold/70">
                  <p className="font-serif-luxury text-[13px] font-semibold text-white keep-light">
                    ORGANIC SIP
                  </p>
                  <p className="font-sans text-[10px] text-brand-gold mt-0.5 tracking-wider uppercase font-medium">
                    {lang === 'en' ? 'Baghdad Road, Kirkuk' : 'طريق بغداد، كركوك'}
                  </p>
                </div>
              </div>

              {/* Decorative Compass Rose in corner */}
              <div className={`absolute bottom-4 left-4 z-10 opacity-30 w-12 h-12 transition-all duration-300 group-hover:rotate-12 ${isDarkMode ? 'text-brand-gold' : 'text-brand-primary'}`}>
                <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current" strokeWidth="1.5">
                  <circle cx="50" cy="50" r="40" />
                  <path d="M50 10 L50 90 M10 50 L90 50 M25 25 L75 75 M25 75 L75 25" />
                  <polygon points="50,10 54,35 50,30 46,35" fill="currentColor" />
                  <polygon points="50,90 54,65 50,70 46,65" fill="currentColor" />
                  <polygon points="90,50 65,54 70,50 65,46" fill="currentColor" />
                  <polygon points="10,50 35,54 30,50 35,46" fill="currentColor" />
                </svg>
              </div>

              {/* Watermark in Arabic/English corner */}
              <div className={`absolute top-4 right-4 z-10 font-serif-luxury text-[10px] tracking-widest text-right transition-colors duration-300 ${isDarkMode ? 'text-white/35' : 'text-brand-primary/45'}`}>
                ORGANIC SIP
              </div>
            </a>

            {/* Quick Map Action */}
            <div className="mt-3 flex flex-col sm:flex-row gap-2.5 justify-between items-start sm:items-center text-xs font-sans px-1">
              <span className={isDarkMode ? 'text-brand-gold/60' : 'text-brand-text/50 force-black-dark'}>
                {lang === 'en' ? 'Coordinates: 33.3136° N, 44.3486° E' : 'الإحداثيات: ٣٣.٣١٣٦° شمالاً، ٤٤.٣٤٨٦° شرقاً'}
              </span>
              <a
                href={baghdadGmapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors font-medium hover:underline flex items-center gap-1 ${
                  isDarkMode ? 'text-brand-gold hover:text-white' : 'text-brand-gold hover:text-brand-primary force-black-dark'
                }`}
              >
                <span>{lang === 'en' ? 'Open in Google Maps' : 'افتح في خرائط جوجل'}</span>
                <span className="text-[10px]">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
