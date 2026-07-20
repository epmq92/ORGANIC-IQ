import { Category, Product, ThemeSettings, HomeSettings } from '../types';

// Let's import the newly generated premium images as defaults or use the direct relative paths
export const DEFAULT_THEMES: ThemeSettings[] = [
  {
    name: 'Professional Polish (الأناقة المهنية)',
    primary: '#1B3022', // Deep forest pine green
    gold: '#C5A059', // Polished bronze gold
    bgWarm: '#FAF9F6', // Very light alabaster cream
    textDark: '#1B3022', // Deep pine forest green text
  },
  {
    name: 'Jade Botanical (الجاد النباتي)',
    primary: '#163E2D', // Deep jade green
    gold: '#D4AF37', // Metallic leaf gold
    bgWarm: '#FAF9F6', // Alabaster white
    textDark: '#192C23', // Muted forest green
  },
  {
    name: 'Royal Olive (الزيتون الفاخر)',
    primary: '#1E291C', // Warm olive black
    gold: '#DFBA6B', // Soft champagne gold
    bgWarm: '#FDFBF7', // Silk cream
    textDark: '#222A20', // Warm charcoal
  },
  {
    name: 'Champagne Gold (الذهبي الفاتح)',
    primary: '#2D3E35', // Slate botanical green
    gold: '#E3C16F', // Brilliant bright gold
    bgWarm: '#F5F5F0', // Ivory white
    textDark: '#2C3531', // Muted slate text
  }
];

export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'signatures', nameEn: 'Sumi Signatures', nameAr: 'توقيعات سومي الفاخرة' },
  { id: 'cold-brews', nameEn: 'Cold Infusions', nameAr: 'منقوعات باردة وعضوية' },
  { id: 'hot-drinks', nameEn: 'Artisan Hot Brews', nameAr: 'مشروبات ساخنة محضرة يدويًا' },
];

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 'prod-pink-sig',
    categoryId: 'signatures',
    nameEn: 'Sumi Signature Pink',
    nameAr: 'توقيع سومي الوردي',
    priceIqd: 7500,
    descEn: 'A delicate, velvet organic blend of premium pink dragonfruit essence, pure organic rose water, and cold foam oat milk.',
    descAr: 'مزيج مخملي رقيق من خلاصة ثمرة التنين الوردية الفاخرة، ماء الورد العضوي النقي ورغوة حليب الشوفان الباردة.',
    image: '/src/assets/images/hero_rose_dream_1784219728674.jpg',
    isSpecial: true
  },
  {
    id: 'prod-rose-dream',
    categoryId: 'signatures',
    nameEn: 'Rose Dream',
    nameAr: 'حلم الورد العضوي',
    priceIqd: 8000,
    descEn: 'Certified organic espresso layered with organic rose petal essence, sweetened with raw organic acacia honey and microfoam.',
    descAr: 'إسبريسو عضوي معتمد مغمور بخلاصة بتلات الورد الطبيعية، محلى بعسل الأكاسيا العضوي الخام ورغوة الحليب الغنية.',
    image: '/src/assets/images/hero_rose_dream_1784219728674.jpg',
    isSpecial: true
  },
  {
    id: 'prod-berry-bliss',
    categoryId: 'signatures',
    nameEn: 'Berry Bliss',
    nameAr: 'بهجة التوت والذهب',
    priceIqd: 7000,
    descEn: 'An iced luxury infusion of organic elderberries, wild forest berries, crisp mountain mint, and shimmering edible gold dust.',
    descAr: 'منقوع بارد فاخر من ثمار البلسان البرية، التوت الغابوي المنعش، نعناع الجبال، وغبار الذهب الصالح للأكل الشامخ.',
    image: '/src/assets/images/hero_berry_bliss_1784219741959.jpg',
    isSpecial: true
  },
  {
    id: 'prod-matcha-gold',
    categoryId: 'signatures',
    nameEn: 'Ceremonial Matcha Gold',
    nameAr: 'الماتشا الاحتفالية بالذهب',
    priceIqd: 8500,
    descEn: 'High-grade ceremonial organic matcha whisked with pure water, organic unsweetened almond milk, topped with 24k gold leaf.',
    descAr: 'ماتشا احتفالية عالية الجودة محضرة بحليب اللوز العضوي غير المحلى، وتتوج بورقة ذهب عيار 24 قيراط صالحة للأكل.',
    image: '/src/assets/images/hero_matcha_1784219714085.jpg',
    isSpecial: true
  },
  {
    id: 'prod-iced-latte',
    categoryId: 'cold-brews',
    nameEn: 'Gold Dusted Cold Brew',
    nameAr: 'كولد برو منثر بالذهب',
    priceIqd: 6500,
    descEn: 'Our 18-hour cold brew coffee, made from single-origin organic Colombian beans, served with gold leaf and orange blossom sprig.',
    descAr: 'قهوة باردة مقطرة ببطء لمدة 18 ساعة من حبوب كولومبية عضوية أحادية المصدر، تقدم بلمسة من ورق الذهب وزهر البرتقال.',
    image: '/src/assets/images/hero_matcha_1784219714085.jpg',
    isSpecial: false
  },
  {
    id: 'prod-rose-tea',
    categoryId: 'cold-brews',
    nameEn: 'Damask Rose Hibiscus Elixir',
    nameAr: 'إكسير الكركديه والورد الدمشقي',
    priceIqd: 6000,
    descEn: 'Organic sun-dried Egyptian hibiscus steeped with sweet Damask rose buds, served chilled over crystalline ice spheres.',
    descAr: 'كركديه مصري عضوي مجفف تحت أشعة الشمس، منقوع مع براعم الورد الدمشقي العطرية، يقدم مبرداً فوق كرات من الثلج الكريستالي.',
    image: '/src/assets/images/hero_berry_bliss_1784219741959.jpg',
    isSpecial: false
  },
  {
    id: 'prod-gold-latte',
    categoryId: 'hot-drinks',
    nameEn: 'Golden Turmeric Latte',
    nameAr: 'لاتيه الكركم الذهبي العضوي',
    priceIqd: 7000,
    descEn: 'An aromatic, warming blend of fresh organic turmeric root, Ceylon cinnamon, black pepper, and frothed oat milk with honey.',
    descAr: 'مزيج دافئ وعطري من جذور الكركم العضوي الطازج، قرفة السيلان، القليل من الفلفل الأسود، وحليب الشوفان المخفوق بالعسل.',
    image: '/src/assets/images/hero_rose_dream_1784219728674.jpg',
    isSpecial: false
  },
  {
    id: 'prod-espresso',
    categoryId: 'hot-drinks',
    nameEn: 'Double Espresso Origin',
    nameAr: 'إسبريسو مزدوج أحادي المصدر',
    priceIqd: 5000,
    descEn: 'An elegant, rich double shot of fair-trade single-origin Ethiopian Yirgacheffe, boasting notes of jasmine, lemon blossom and honey.',
    descAr: 'جرعة مزدوجة غنية وأنيقة من قهوة هضاب إثيوبيا ييرغاشيف العضوية، متميزة بلمحات من الياسمين، زهر الليمون والعسل النقي.',
    image: '/src/assets/images/hero_matcha_1784219714085.jpg',
    isSpecial: false
  }
];

export const DEFAULT_HOME: HomeSettings = {
  sliderImages: [
    '/src/assets/images/hero_matcha_1784219714085.jpg',
    '/src/assets/images/hero_rose_dream_1784219728674.jpg',
    '/src/assets/images/hero_berry_bliss_1784219741959.jpg',
    '/src/assets/images/hero_producer_1784219753826.jpg'
  ],
  aboutUsTitleEn: 'Our Sourcing & Artistry',
  aboutUsTitleAr: 'قصتنا ومصادرنا الطبيعية',
  aboutUsTextEn: 'At Organic Sip, we believe that true luxury lies in absolute purity. Rooted in both English refinement and warm Arab hospitality, every brew we serve is a testament to sustainable luxury. We source certified organic, fair-trade ingredients to create playful yet sophisticated coffee & wellness mocktails adorned with delicate gold details, delivering an exquisite multi-sensory experience designed for young, passionate lovers of beautiful tastes.',
  aboutUsTextAr: 'في ORGANIC SIP، نؤمن بأن الفخامة الحقيقية تكمن في النقاء المطلق. نجمع بين الأناقة الإنجليزية الراقية وكرم الضيافة العربية الدافئة. كل مشروب نقدمه هو تجسيد للمثالية المستدامة. نحضر مكوناتنا العضوية المعتمدة من مزارع عادلة لنصنع لك قهوة ومشروبات صحية راقية مزينة بلمسات الذهب البراقة، لتقديم تجربة تلامس جميع الحواس، صُممت خصيصاً لعشاق المذاق الرفيع والجمال المعاصر.',
  whatsappNumber: '+9647700000000', // High-end Iraqi phone number format for WhatsApp contact
  producerImage: '/src/assets/images/hero_producer_1784219753826.jpg'
};
