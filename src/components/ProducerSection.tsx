import { motion } from 'motion/react';
import { Award, Leaf, ShieldCheck, Heart } from 'lucide-react';
import { Language } from '../types';

interface ProducerSectionProps {
  lang: Language;
  producerImage?: string;
  isDarkMode?: boolean;
}

export default function ProducerSection({ lang, producerImage, isDarkMode = false }: ProducerSectionProps) {
  return (
    <section 
      id="producer" 
      className="py-24 sm:py-28 px-4 relative overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: 'var(--brand-producer-bg)' }}
    >
      {/* Exquisite design border */}
      <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
          
          {/* Sourcing Image Card - 6 cols */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.0, ease: "easeOut" }}
              className={`relative p-3.5 border rounded-2xl shadow-xl transition-all duration-300 ${
                isDarkMode ? 'bg-[#081511] border-brand-gold/30 shadow-black/20' : 'bg-brand-bg border-brand-gold/20'
              }`}
            >
              {/* Inner thin frame */}
              <div className={`absolute inset-2 border pointer-events-none rounded-xl transition-colors duration-300 ${
                isDarkMode ? 'border-brand-gold/20' : 'border-brand-gold/10'
              }`} />
              
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-brand-primary/10">
                <img
                  src={producerImage || "/src/assets/images/hero_producer_1784219753826.jpg"}
                  alt="Organic Tea & Coffee Estate Sourcing"
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-103"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/30 via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>

            {/* Float badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="absolute -bottom-6 -right-6 md:right-4 z-10 bg-brand-primary border border-brand-gold/40 text-brand-gold p-4 shadow-lg rounded-2xl max-w-[210px]"
            >
              <div className="flex gap-2.5 items-center mb-1">
                <Leaf size={14} className="animate-pulse" />
                <span className="font-serif-luxury text-xs font-semibold tracking-wide">
                  100% Certified
                </span>
              </div>
              <p className="font-sans text-[10px] text-white/80 leading-relaxed font-light">
                {lang === 'en' 
                  ? 'Grown naturally without synthetic fertilizers or pesticides.' 
                  : 'مزرع طبيعياً بالكامل بدون أي أسمدة كيميائية أو مبيدات.'}
              </p>
            </motion.div>
          </div>

          {/* Sourcing Narrative - 6 cols */}
          <div className="lg:col-span-6 flex flex-col justify-center mt-6 lg:mt-0">
            <span className="text-[10px] tracking-[0.25em] uppercase font-sans text-brand-gold font-bold mb-2">
              {lang === 'en' ? 'Sourcing Legacy' : 'إرث المصادر العضوية'}
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-brand-primary font-semibold mb-6">
              {lang === 'en' ? 'The Organic Producer Story' : 'قصة المنتج والمنشأ'}
            </h2>
            <div className="w-16 h-[1px] bg-brand-gold mb-6" />

            <p className="font-sans text-sm text-brand-text/80 leading-relaxed font-light tracking-wide mb-8">
              {lang === 'en'
                ? 'We partner with elite, family-owned estates across the highlands of Colombia, Ethiopia, and Japan. By guaranteeing fair-trade premiums and promoting biological diversity, our producers nurture each crop organically in shade-grown sanctuaries. Every single drop poured at Organic Sip represents a direct link to healthy mountain soil, crystalline streams, and generational dedication.'
                : 'نحن شركاء في ORGANIC SIP مع مزارع عائلية رائدة ومستقلة في مرتفعات كولومبيا، وإثيوبيا، واليابان. عبر ضمان هوامش تجارة عادلة ممتازة وتعزيز التنوع الحيوي، يربي مزارعونا محاصيل القهوة والشاي طبيعيًا في محميات مظللة ومستدامة. كل قطرة تنسكب في كوبك تمثل رابطًا مباشرًا بالتربة الجبلية النقية والينابيع العذبة وتفاني الأجيال المتوارث.'}
            </p>

            {/* Certifications row */}
            <div className="grid grid-cols-2 gap-4">
              {/* Card 1 */}
              <div className={`p-4 border rounded-2xl transition-all duration-300 ${
                isDarkMode ? 'bg-[#0a2218]/50 border-brand-gold/25' : 'bg-brand-primary/5 border-brand-gold/15'
              }`}>
                <div className="text-brand-gold mb-2.5">
                  <Award size={20} className="stroke-[1.5px]" />
                </div>
                <h4 className="font-serif-luxury text-xs font-semibold text-brand-primary mb-1">
                  {lang === 'en' ? 'Direct Sourcing' : 'استيراد مباشر وعادل'}
                </h4>
                <p className="font-sans text-[11px] text-brand-text/70 leading-relaxed font-light">
                  {lang === 'en' ? 'Fair-trade pricing and direct family farm contracts.' : 'تسعير عادل وعقود مباشرة مع المزارع العائلية.'}
                </p>
              </div>

              {/* Card 2 */}
              <div className={`p-4 border rounded-2xl transition-all duration-300 ${
                isDarkMode ? 'bg-[#0a2218]/50 border-brand-gold/25' : 'bg-brand-primary/5 border-brand-gold/15'
              }`}>
                <div className="text-brand-gold mb-2.5">
                  <ShieldCheck size={20} className="stroke-[1.5px]" />
                </div>
                <h4 className="font-serif-luxury text-xs font-semibold text-brand-primary mb-1">
                  {lang === 'en' ? 'Purity Verified' : 'مضمون النقاوة'}
                </h4>
                <p className="font-sans text-[11px] text-brand-text/70 leading-relaxed font-light">
                  {lang === 'en' ? 'Rigorous lab testing for zero chemical residues.' : 'فحص مخبري دقيق لضمان خلو المشروبات من أي بقايا كيميائية.'}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Closing trust stamp */}
        <div className="mt-20 text-center flex flex-col items-center max-w-xl mx-auto pt-10 border-t border-brand-gold/10">
          <div className="w-10 h-10 rounded-full border border-brand-gold/25 flex items-center justify-center text-brand-gold mb-4">
            <Heart size={14} className="fill-brand-gold/20 animate-pulse" />
          </div>
          <p className="font-serif-luxury text-sm italic text-brand-primary">
            {lang === 'en' 
              ? '"Honoring the earth, one exquisite cup at a time."' 
              : '"نكرّم الأرض، كوبًا رائعًا تلو الآخر."'}
          </p>
          <span className="font-sans text-[10px] text-brand-gold uppercase tracking-[0.15em] font-medium mt-1">
            — Organic Sip Collective
          </span>
        </div>
      </div>
    </section>
  );
}
