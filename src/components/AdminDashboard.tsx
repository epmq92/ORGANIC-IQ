import React, { useState, FormEvent, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, Settings, Plus, Trash2, Edit3, Image, 
  Palette, RefreshCw, Layers, Check, X, Eye, EyeOff, Upload
} from 'lucide-react';
import { Product, Category, ThemeSettings, HomeSettings, Language } from '../types';
import { DEFAULT_THEMES } from '../data/defaults';

interface AdminDashboardProps {
  products: Product[];
  setProducts: (p: Product[]) => void;
  categories: Category[];
  setCategories: (c: Category[]) => void;
  currentTheme: ThemeSettings;
  setTheme: (t: ThemeSettings) => void;
  homeSettings: HomeSettings;
  setHomeSettings: (h: HomeSettings) => void;
  lang: Language;
  onRestoreDefaults: () => void;
  isOpen: boolean;
  onClose: () => void;
  isDarkMode?: boolean;
  setIsDarkMode?: (dark: boolean) => void;
  onApplyChanges: () => Promise<boolean>;
}

export default function AdminDashboard({
  products,
  setProducts,
  categories,
  setCategories,
  currentTheme,
  setTheme,
  homeSettings,
  setHomeSettings,
  lang,
  onRestoreDefaults,
  isOpen,
  onClose,
  isDarkMode,
  setIsDarkMode,
  onApplyChanges
}: AdminDashboardProps) {
  // Authorization State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Applying Changes State
  const [isApplying, setIsApplying] = useState(false);

  const handleApplyClick = async () => {
    setIsApplying(true);
    const success = await onApplyChanges();
    setIsApplying(false);
    if (success) {
      triggerSuccess(lang === 'en' ? 'Changes applied and published to live site!' : 'تم تطبيق ونشر التغييرات على الموقع الحي بنجاح!');
    } else {
      alert(lang === 'en' ? 'Failed to publish changes to the server.' : 'فشل نشر التغييرات على الخادم.');
    }
  };

  // Dashboard Navigation
  const [activeSubTab, setActiveSubTab] = useState<'products' | 'categories' | 'slider'>('products');

  // Edit / Add States for Products
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [productForm, setProductForm] = useState<Omit<Product, 'id'>>({
    nameEn: '',
    nameAr: '',
    priceIqd: 7000,
    descEn: '',
    descAr: '',
    image: '',
    categoryId: 'signatures',
    isSpecial: false
  });

  // Edit / Add States for Categories
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [categoryForm, setCategoryForm] = useState<Omit<Category, 'id'>>({
    nameEn: '',
    nameAr: ''
  });

  // Edit State for Theme / Custom Hex
  const [customPrimary, setCustomPrimary] = useState(currentTheme.primary);
  const [customGold, setCustomGold] = useState(currentTheme.gold);
  const [customBg, setCustomBg] = useState(currentTheme.bgWarm);
  const [customText, setCustomText] = useState(currentTheme.textDark);

  // Edit State for Hero Slider URLs
  const [sliderUrls, setSliderUrls] = useState<string[]>([...homeSettings.sliderImages]);
  const [newSliderUrl, setNewSliderUrl] = useState('');

  // Edit State for Owner / Producer Image URL
  const [producerImageInput, setProducerImageInput] = useState(homeSettings.producerImage || '');

  // Synchronize when homeSettings changes
  useEffect(() => {
    setSliderUrls([...homeSettings.sliderImages]);
    setProducerImageInput(homeSettings.producerImage || '');
  }, [homeSettings]);

  // Notifications
  const [successMsg, setSuccessMsg] = useState('');

  const triggerSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  // Password Verification (default: 9227)
  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (password === '9227') {
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg(lang === 'en' ? 'Incorrect password.' : 'كلمة المرور غير صحيحة.');
    }
  };

  // Add / Edit Product
  const handleProductSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      // Save Edits
      const updated = products.map(p => p.id === editingProduct.id ? { ...p, ...productForm } : p);
      setProducts(updated);
      triggerSuccess(lang === 'en' ? 'Product updated successfully!' : 'تم تحديث المشروب بنجاح!');
      setEditingProduct(null);
    } else {
      // Add New
      const newProduct: Product = {
        id: `prod-${Date.now()}`,
        ...productForm
      };
      setProducts([newProduct, ...products]);
      triggerSuccess(lang === 'en' ? 'New product created!' : 'تم إضافة المشروب الجديد بنجاح!');
      setIsAddingProduct(false);
    }
    // Reset Form
    setProductForm({
      nameEn: '',
      nameAr: '',
      priceIqd: 7000,
      descEn: '',
      descAr: '',
      image: '/src/assets/images/hero_matcha_1784219714085.jpg',
      categoryId: categories[0]?.id || 'signatures',
      isSpecial: false
    });
  };

  // Delete Product
  const handleDeleteProduct = (id: string) => {
    if (confirm(lang === 'en' ? 'Delete this drink?' : 'هل أنت متأكد من حذف هذا المشروب؟')) {
      setProducts(products.filter(p => p.id !== id));
      triggerSuccess(lang === 'en' ? 'Product removed.' : 'تم حذف المنتج.');
    }
  };

  // Populate form for Editing
  const startEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setIsAddingProduct(true);
    setProductForm({
      nameEn: prod.nameEn,
      nameAr: prod.nameAr,
      priceIqd: prod.priceIqd,
      descEn: prod.descEn,
      descAr: prod.descAr,
      image: prod.image,
      categoryId: prod.categoryId,
      isSpecial: prod.isSpecial
    });
  };

  // Add Category
  const handleCategorySubmit = (e: FormEvent) => {
    e.preventDefault();
    const newCat: Category = {
      id: `cat-${Date.now()}`,
      ...categoryForm
    };
    setCategories([...categories, newCat]);
    triggerSuccess(lang === 'en' ? 'Menu Tab added!' : 'تم إضافة قسم القائمة بنجاح!');
    setIsAddingCategory(false);
    setCategoryForm({ nameEn: '', nameAr: '' });
  };

  // Delete Category
  const handleDeleteCategory = (id: string) => {
    if (categories.length <= 1) {
      alert(lang === 'en' ? 'Cannot delete the last remaining menu tab!' : 'لا يمكن حذف آخر قسم متبقٍ في القائمة!');
      return;
    }
    if (confirm(lang === 'en' ? 'Delete this menu tab? This will also un-assign products from this tab.' : 'حذف هذا القسم؟ سيتم إلغاء تصنيف المنتجات الموجودة فيه.')) {
      setCategories(categories.filter(c => c.id !== id));
      triggerSuccess(lang === 'en' ? 'Menu Tab removed.' : 'تم حذف القسم.');
    }
  };

  // Apply Theme Preset
  const handleApplyPreset = (preset: ThemeSettings) => {
    setTheme(preset);
    setCustomPrimary(preset.primary);
    setCustomGold(preset.gold);
    setCustomBg(preset.bgWarm);
    setCustomText(preset.textDark);
    if (setIsDarkMode) {
      setIsDarkMode(false);
    }
    triggerSuccess(lang === 'en' ? `Theme preset '${preset.name}' applied!` : `تم تطبيق المظهر المسبق بنجاح!`);
  };

  // Apply Custom Colors
  const handleApplyCustomColors = () => {
    const customTheme: ThemeSettings = {
      name: lang === 'en' ? 'Custom Palette' : 'لوحة ألوان مخصصة',
      primary: customPrimary,
      gold: customGold,
      bgWarm: customBg,
      textDark: customText
    };
    setTheme(customTheme);
    if (setIsDarkMode) {
      setIsDarkMode(false);
    }
    triggerSuccess(lang === 'en' ? 'Custom colors applied!' : 'تم تطبيق الألوان المخصصة!');
  };

  // Add Slider Image
  const handleAddSliderImg = () => {
    if (!newSliderUrl) return;
    const updated = [...sliderUrls, newSliderUrl];
    setSliderUrls(updated);
    setHomeSettings({
      ...homeSettings,
      sliderImages: updated
    });
    setNewSliderUrl('');
    triggerSuccess(lang === 'en' ? 'Slider image added!' : 'تم إضافة صورة العرض!');
  };

  // Delete Slider Image
  const handleDeleteSliderImg = (index: number) => {
    if (sliderUrls.length <= 1) {
      alert(lang === 'en' ? 'Must have at least 1 image sliding!' : 'يجب أن تحتوي الشاشة على صورة عرض واحدة على الأقل!');
      return;
    }
    const updated = sliderUrls.filter((_, idx) => idx !== index);
    setSliderUrls(updated);
    setHomeSettings({
      ...homeSettings,
      sliderImages: updated
    });
    triggerSuccess(lang === 'en' ? 'Slider image removed.' : 'تم حذف صورة العرض.');
  };

  // Save Producer/Owner Section Image
  const handleSaveProducerImage = () => {
    setHomeSettings({
      ...homeSettings,
      producerImage: producerImageInput
    });
    triggerSuccess(lang === 'en' ? 'Owner section image updated!' : 'تم تحديث صورة قسم المالك بنجاح!');
  };

  // Upload Slider Image from Laptop
  const handleSliderFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const updated = [...sliderUrls, base64String];
        setSliderUrls(updated);
        setHomeSettings({
          ...homeSettings,
          sliderImages: updated
        });
        triggerSuccess(lang === 'en' ? 'Slide image uploaded from laptop!' : 'تم رفع صورة الشريحة من جهازك بنجاح!');
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload Producer/Owner Image from Laptop
  const handleProducerFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProducerImageInput(base64String);
        setHomeSettings({
          ...homeSettings,
          producerImage: base64String
        });
        triggerSuccess(lang === 'en' ? 'Owner section image uploaded from laptop!' : 'تم رفع صورة المالك من جهازك بنجاح!');
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload Product Image from Device
  const handleProductFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProductForm(prev => ({ ...prev, image: base64String }));
        triggerSuccess(lang === 'en' ? 'Product image updated from device!' : 'تم رفع صورة المشروب من جهازك بنجاح!');
      };
      reader.readAsDataURL(file);
    }
  };

  // Global Reset
  const handleGlobalReset = () => {
    if (confirm(lang === 'en' 
      ? 'Warning: This will restore the cafe to its original design, products, colors, and premium photography. Continue?' 
      : 'تحذير: سيؤدي هذا إلى إعادة المتجر بالكامل إلى تصميمه الأصلي، ومنتجاته، وألوانه المذهلة. هل تود الاستمرار؟')) {
      onRestoreDefaults();
      setIsAuthenticated(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end font-sans">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Slide Drawer */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative w-full max-w-2xl h-full bg-[#081511] dark-mode shadow-2xl flex flex-col z-10 border-l border-brand-gold/20 overflow-hidden text-white"
      >
        {/* Floating Success Alert */}
        <AnimatePresence>
          {successMsg && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-4 left-4 right-4 z-50 bg-[#0b251c] border border-brand-gold text-brand-gold px-4 py-3 shadow-lg rounded-sm flex items-center gap-2.5"
            >
              <Check size={16} />
              <span className="text-xs font-semibold uppercase tracking-wider">{successMsg}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Drawer Header */}
        <div className="p-6 border-b border-brand-gold/15 flex items-center justify-between bg-[#061812] text-white">
          <div className="flex items-center gap-2.5">
            <Settings className="text-brand-gold animate-spin-slow" size={20} />
            <div>
              <h2 className="font-serif-luxury text-lg tracking-wide font-medium text-brand-gold">
                {lang === 'en' ? 'Organic Sip Owner Console' : 'لوحة تحكم المالك - ORGANIC SIP'}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* AUTH BLOCK */}
        {!isAuthenticated ? (
          <div className="flex-grow flex flex-col justify-center items-center p-8 text-center max-w-sm mx-auto">
            <div className="p-4 bg-[#0b251c]/30 border border-brand-gold/25 rounded-full text-brand-gold mb-6">
              <Lock size={32} />
            </div>
            <h3 className="font-serif-luxury text-xl text-brand-gold font-semibold mb-2">
              {lang === 'en' ? 'Owner Authorization' : 'تفويض المالك'}
            </h3>
            <p className="text-white/80 text-xs font-light tracking-wide mb-6 leading-relaxed">
              {lang === 'en' 
                ? 'Please verify ownership with your passcode to unlock full-site editing controls.' 
                : 'الرجاء إدخال رمز المرور الخاص بك لإلغاء قفل ميزات التحكم وتعديل المتجر بالكامل.'}
            </p>
            
            <form onSubmit={handleLogin} className="w-full space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder={lang === 'en' ? 'Enter Passcode' : 'أدخل رمز المرور'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0b251c]/50 border border-brand-gold/30 rounded-sm focus:outline-none focus:border-brand-gold font-sans text-xs text-white tracking-widest text-center"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-gold/70 hover:text-brand-gold cursor-pointer"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
              
              {errorMsg && (
                <p className="text-[11px] text-red-400 font-medium">
                  {errorMsg}
                </p>
              )}
 
              <button
                type="submit"
                className="w-full py-3 bg-[#0b251c] hover:bg-[#071913] text-brand-gold border border-brand-gold/40 hover:border-brand-gold font-sans text-xs tracking-widest font-semibold uppercase transition-all duration-300 rounded-sm cursor-pointer"
              >
                {lang === 'en' ? 'Authorize Console' : 'تفويض الدخول'}
              </button>
            </form>
          </div>
        ) : (
          /* DASHBOARD PANEL */
          <div className="flex-grow flex flex-col overflow-hidden">
            
            {/* Navigation Tabs */}
            <div className="flex border-b border-brand-gold/10 bg-[#0b251c]/40 overflow-x-auto whitespace-nowrap">
              <button
                onClick={() => setActiveSubTab('products')}
                className={`flex-1 py-4 px-3 flex items-center justify-center gap-1.5 text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer border-b-2 ${
                  activeSubTab === 'products'
                    ? 'border-brand-gold text-brand-gold bg-[#0b251c]/50'
                    : 'border-transparent text-white/70 hover:text-brand-gold hover:bg-white/5'
                }`}
              >
                <Layers size={14} />
                <span>{lang === 'en' ? 'Drinks' : 'المشروبات'}</span>
              </button>
              <button
                onClick={() => setActiveSubTab('categories')}
                className={`flex-1 py-4 px-3 flex items-center justify-center gap-1.5 text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer border-b-2 ${
                  activeSubTab === 'categories'
                    ? 'border-brand-gold text-brand-gold bg-[#0b251c]/50'
                    : 'border-transparent text-white/70 hover:text-brand-gold hover:bg-white/5'
                }`}
              >
                <Layers size={14} />
                <span>{lang === 'en' ? 'Menu Tabs' : 'الأقسام'}</span>
              </button>
              <button
                onClick={() => setActiveSubTab('slider')}
                className={`flex-1 py-4 px-3 flex items-center justify-center gap-1.5 text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer border-b-2 ${
                  activeSubTab === 'slider'
                    ? 'border-brand-gold text-brand-gold bg-[#0b251c]/50'
                    : 'border-transparent text-white/70 hover:text-brand-gold hover:bg-white/5'
                }`}
              >
                <Image size={14} />
                <span>{lang === 'en' ? 'Slider' : 'المعرض'}</span>
              </button>
            </div>

            {/* Scrollable Panel Area */}
            <div className="flex-grow overflow-y-auto p-6">
              
              {/* ============= 1. DRINKS & PRODUCTS TAB ============= */}
              {activeSubTab === 'products' && (
                <div className="space-y-6">
                  {/* Title & Add Button */}
                  <div className="flex items-center justify-between pb-4 border-b border-brand-gold/10">
                    <div>
                      <h4 className="font-serif-luxury text-base text-brand-gold font-semibold">
                        {lang === 'en' ? 'Artisan Creations Portfolio' : 'حقيبة مشروبات البوتيك'}
                      </h4>
                      <p className="text-[10px] text-white/60">
                        {lang === 'en' ? `Currently showing ${products.length} catalog items` : `يعرض حاليًا ${products.length} من عناصر القائمة`}
                      </p>
                    </div>
                    {!isAddingProduct && (
                      <button
                        onClick={() => {
                          setEditingProduct(null);
                          setIsAddingProduct(true);
                        }}
                        className="flex items-center gap-1.5 px-3.5 py-2 bg-[#0b251c] text-brand-gold border border-brand-gold/30 hover:border-brand-gold text-xs uppercase tracking-wider font-semibold transition-all rounded-sm cursor-pointer"
                      >
                        <Plus size={14} />
                        <span>{lang === 'en' ? 'Add Drink' : 'أضف مشروباً'}</span>
                      </button>
                    )}
                  </div>

                  {/* Add / Edit Form */}
                  {isAddingProduct && (
                    <motion.form 
                       initial={{ opacity: 0, height: 0 }}
                       animate={{ opacity: 1, height: 'auto' }}
                       onSubmit={handleProductSubmit}
                       className="p-5 border border-brand-gold/30 rounded-sm bg-[#0b251c]/30 space-y-4"
                    >
                      <h5 className="font-serif-luxury text-sm font-semibold text-white flex items-center justify-between">
                        <span>{editingProduct ? (lang === 'en' ? 'Edit Product Details' : 'تعديل تفاصيل المشروب') : (lang === 'en' ? 'New Drink Spec' : 'مواصفات مشروب جديد')}</span>
                        <button 
                          type="button" 
                          onClick={() => {
                            setIsAddingProduct(false);
                            setEditingProduct(null);
                          }}
                          className="text-xs text-white/50 hover:text-brand-gold uppercase cursor-pointer"
                        >
                          {lang === 'en' ? 'Cancel' : 'إلغاء'}
                        </button>
                      </h5>
 
                      <div className="grid grid-cols-2 gap-4">
                        {/* Name EN */}
                        <div>
                          <label className="block text-[10px] uppercase text-white/70 mb-1 font-semibold">{lang === 'en' ? 'English Name' : 'الاسم بالإنجليزية'}</label>
                          <input
                            type="text"
                            required
                            value={productForm.nameEn}
                            onChange={(e) => setProductForm({ ...productForm, nameEn: e.target.value })}
                            className="w-full px-3 py-2 bg-[#0b251c] text-white border border-brand-gold/20 rounded-sm focus:outline-none focus:border-brand-gold text-xs"
                          />
                        </div>
                        {/* Name AR */}
                        <div>
                          <label className="block text-[10px] uppercase text-white/70 mb-1 font-semibold">{lang === 'en' ? 'Arabic Name' : 'الاسم بالعربية'}</label>
                          <input
                            type="text"
                            required
                            value={productForm.nameAr}
                            onChange={(e) => setProductForm({ ...productForm, nameAr: e.target.value })}
                            className="w-full px-3 py-2 bg-[#0b251c] text-white border border-brand-gold/20 rounded-sm focus:outline-none focus:border-brand-gold text-xs"
                            dir="rtl"
                          />
                        </div>
                      </div>
 
                      <div className="grid grid-cols-2 gap-4">
                        {/* Price IQD */}
                        <div>
                          <label className="block text-[10px] uppercase text-white/70 mb-1 font-semibold">{lang === 'en' ? 'Price (IQD)' : 'السعر (د.ع)'}</label>
                          <input
                            type="number"
                            required
                            value={productForm.priceIqd}
                            onChange={(e) => setProductForm({ ...productForm, priceIqd: Number(e.target.value) })}
                            className="w-full px-3 py-2 bg-[#0b251c] text-white border border-brand-gold/20 rounded-sm focus:outline-none focus:border-brand-gold text-xs font-mono"
                          />
                        </div>
                        {/* Category */}
                        <div>
                          <label className="block text-[10px] uppercase text-white/70 mb-1 font-semibold">{lang === 'en' ? 'Menu Category' : 'قسم القائمة'}</label>
                          <select
                            value={productForm.categoryId}
                            onChange={(e) => setProductForm({ ...productForm, categoryId: e.target.value })}
                            className="w-full px-3 py-2 bg-[#0b251c] text-white border border-brand-gold/20 rounded-sm focus:outline-none focus:border-brand-gold text-xs"
                          >
                            {categories.map(c => (
                              <option key={c.id} value={c.id} className="bg-[#081511] text-white">{lang === 'en' ? c.nameEn : c.nameAr}</option>
                            ))}
                          </select>
                        </div>
                      </div>
 
                      {/* Image URL */}
                      <div>
                        <label className="block text-[10px] uppercase text-white/70 mb-1 font-semibold">{lang === 'en' ? 'Drink Photo URL' : 'رابط صورة المشروب'}</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            required
                            value={productForm.image}
                            onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                            placeholder="/src/assets/images/hero_matcha_1784219714085.jpg"
                            className="flex-grow px-3 py-2 bg-[#0b251c] text-white border border-brand-gold/20 rounded-sm focus:outline-none focus:border-brand-gold text-xs"
                          />
                          <label className="flex items-center gap-1.5 px-3.5 py-2 bg-[#0b251c] hover:bg-[#071913] text-brand-gold border border-brand-gold/30 hover:border-brand-gold text-xs uppercase tracking-wider font-semibold transition-all rounded-sm cursor-pointer whitespace-nowrap">
                            <Upload size={12} />
                            <span>{lang === 'en' ? 'add form devide' : 'إضافة من الجهاز'}</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleProductFileChange}
                              className="hidden"
                            />
                          </label>
                        </div>
                        <span className="text-[9px] text-white/50 mt-0.5 block">{lang === 'en' ? 'Enter direct image URL, path, or upload a photo from your device.' : 'أدخل رابط الصورة المباشر، أو مسار الصورة، أو ارفعها من جهازك.'}</span>
                      </div>
 
                      {/* Desc EN */}
                      <div>
                        <label className="block text-[10px] uppercase text-white/70 mb-1 font-semibold">{lang === 'en' ? 'Ingredients Description (English)' : 'مكونات المشروب (بالإنجليزية)'}</label>
                        <textarea
                          required
                          rows={2}
                          value={productForm.descEn}
                          onChange={(e) => setProductForm({ ...productForm, descEn: e.target.value })}
                          className="w-full px-3 py-2 bg-[#0b251c] text-white border border-brand-gold/20 rounded-sm focus:outline-none focus:border-brand-gold text-xs resize-none"
                        />
                      </div>
 
                      {/* Desc AR */}
                      <div>
                        <label className="block text-[10px] uppercase text-white/70 mb-1 font-semibold">{lang === 'en' ? 'Ingredients Description (Arabic)' : 'مكونات المشروب (بالعربية)'}</label>
                        <textarea
                          required
                          rows={2}
                          value={productForm.descAr}
                          onChange={(e) => setProductForm({ ...productForm, descAr: e.target.value })}
                          className="w-full px-3 py-2 bg-[#0b251c] text-white border border-brand-gold/20 rounded-sm focus:outline-none focus:border-brand-gold text-xs resize-none"
                          dir="rtl"
                        />
                      </div>
 
                      {/* Special Switch */}
                      <div className="flex items-center gap-2.5 pt-1">
                        <input
                          type="checkbox"
                          id="isSpecial"
                          checked={productForm.isSpecial}
                          onChange={(e) => setProductForm({ ...productForm, isSpecial: e.target.checked })}
                          className="w-4 h-4 text-brand-primary border-brand-gold/30 rounded focus:ring-brand-gold"
                        />
                        <label htmlFor="isSpecial" className="text-xs text-white/95 font-medium cursor-pointer">
                          {lang === 'en' ? 'Promote to Special Selection (large layout card)' : 'ترقية إلى التوقيعات الخاصة (صندوق عرض كبير)'}
                        </label>
                      </div>
 
                      <button
                        type="submit"
                        className="w-full py-2.5 bg-[#0b251c] hover:bg-[#071913] text-brand-gold border border-brand-gold/35 hover:border-brand-gold text-xs uppercase tracking-wider font-semibold rounded-sm cursor-pointer transition-colors"
                      >
                        {editingProduct ? (lang === 'en' ? 'Save Spec Edits' : 'حفظ تعديلات المشروب') : (lang === 'en' ? 'Create Luxury Drink' : 'إنشاء وتأكيد المشروب الفاخر')}
                      </button>
                    </motion.form>
                  )}
 
                  {/* Active List */}
                  <div className="space-y-3">
                    {products.map(prod => (
                      <div 
                        key={prod.id}
                        className="flex items-center gap-4 p-3 border border-brand-gold/10 rounded-sm bg-[#0b251c]/30 hover:bg-[#0b251c]/65 hover:border-brand-gold/25 transition-all"
                      >
                        <img 
                          src={prod.image} 
                          alt={prod.nameEn} 
                          className="w-11 h-11 object-cover rounded-sm border border-brand-gold/15"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-grow min-w-0">
                          <h6 className="font-serif-luxury text-sm font-semibold text-white truncate">
                            {lang === 'en' ? prod.nameEn : prod.nameAr}
                          </h6>
                          <div className="flex items-center gap-2 text-[10px] text-white/60 mt-0.5">
                            <span className="font-mono text-brand-gold font-medium">{prod.priceIqd.toLocaleString()} IQD</span>
                            <span>•</span>
                            <span className="uppercase text-white/50">{prod.categoryId}</span>
                            {prod.isSpecial && (
                              <>
                                <span>•</span>
                                <span className="text-brand-gold font-bold">★ SIGNATURE</span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <button
                            onClick={() => startEditProduct(prod)}
                            className="p-1.5 text-white/50 hover:text-brand-gold transition-colors cursor-pointer"
                            title="Edit"
                          >
                            <Edit3 size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(prod.id)}
                            className="p-1.5 text-white/50 hover:text-red-400 transition-colors cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}                {/* ============= 2. CATEGORIES / MENU TABS TAB ============= */}
              {activeSubTab === 'categories' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-brand-gold/10">
                    <div>
                      <h4 className="font-serif-luxury text-base text-brand-gold font-semibold">
                        {lang === 'en' ? 'Menu Navigation Tabs' : 'أقسام تبويب قائمة الطعام'}
                      </h4>
                      <p className="text-[10px] text-white/60">
                        {lang === 'en' ? 'Manage the tab buttons that filter drinks' : 'إدارة أزرار التبويب التي تقوم بتصفية المشروبات'}
                      </p>
                    </div>
                    {!isAddingCategory && (
                      <button
                        onClick={() => setIsAddingCategory(true)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0b251c] hover:bg-[#071913] text-brand-gold border border-brand-gold/30 text-xs uppercase tracking-wider font-semibold rounded-sm cursor-pointer"
                      >
                        <Plus size={12} />
                        <span>{lang === 'en' ? 'Add Tab' : 'أضف قسماً'}</span>
                      </button>
                    )}
                  </div>
 
                  {isAddingCategory && (
                    <motion.form
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      onSubmit={handleCategorySubmit}
                      className="p-4 border border-brand-gold/30 bg-[#0b251c]/30 rounded-sm space-y-4"
                    >
                      <h5 className="font-serif-luxury text-xs font-bold text-white uppercase">
                        {lang === 'en' ? 'New Navigation Tab Spec' : 'مواصفات قسم التبويب الجديد'}
                      </h5>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[9px] uppercase text-white/70 mb-1 font-semibold">{lang === 'en' ? 'English Label' : 'العنوان بالإنجليزية'}</label>
                          <input
                            type="text"
                            required
                            value={categoryForm.nameEn}
                            onChange={(e) => setCategoryForm({ ...categoryForm, nameEn: e.target.value })}
                            className="w-full px-3 py-2 bg-[#0b251c] text-white border border-brand-gold/20 rounded-sm focus:outline-none focus:border-brand-gold text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] uppercase text-white/70 mb-1 font-semibold">{lang === 'en' ? 'Arabic Label' : 'العنوان بالعربية'}</label>
                          <input
                            type="text"
                            required
                            value={categoryForm.nameAr}
                            onChange={(e) => setCategoryForm({ ...categoryForm, nameAr: e.target.value })}
                            className="w-full px-3 py-2 bg-[#0b251c] text-white border border-brand-gold/20 rounded-sm focus:outline-none focus:border-brand-gold text-xs text-right"
                            dir="rtl"
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="w-full py-2 bg-[#0b251c] hover:bg-[#071913] text-brand-gold border border-brand-gold/30 hover:border-brand-gold text-xs uppercase tracking-wider font-semibold rounded-sm cursor-pointer"
                      >
                        {lang === 'en' ? 'Add Navigation Tab' : 'تأكيد إضافة قسم التبويب'}
                      </button>
                    </motion.form>
                  )}
 
                  {/* List */}
                  <div className="space-y-3">
                    {categories.map(cat => (
                      <div 
                        key={cat.id}
                        className="flex items-center justify-between p-3 border border-brand-gold/10 rounded-sm bg-[#0b251c]/30"
                      >
                        <div>
                          <h6 className="font-serif-luxury text-sm font-semibold text-white">
                            {cat.nameEn}
                          </h6>
                          <p className="text-[10px] text-brand-gold italic mt-0.5">
                            {cat.nameAr}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDeleteCategory(cat.id)}
                          className="p-1.5 text-white/50 hover:text-red-400 transition-colors cursor-pointer"
                          title="Delete Tab"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}



              {/* ============= 4. HERO SLIDER TAB ============= */}
              {activeSubTab === 'slider' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-serif-luxury text-base text-brand-gold font-semibold border-b border-brand-gold/10 pb-2">
                      {lang === 'en' ? 'Slow Hero Carousel Images' : 'صور معرض الواجهة الرئيسي'}
                    </h4>
                    <p className="text-[10px] text-white/60 mt-1">
                      {lang === 'en' ? 'Provide custom image URLs to cycle slowly in the high-quality home page background.' : 'وفر روابط صور مخصصة ليتم تدويرها ببطء كخلفية سينمائية جذابة.'}
                    </p>
                  </div>

                  {/* Add Image URL */}
                  <div className="space-y-3">
                    <label className="block text-[10px] uppercase tracking-wider font-semibold text-white/75">
                      {lang === 'en' ? 'Add Carousel Slide Image' : 'إضافة صورة عرض جديدة'}
                    </label>
                    
                    {/* Upload from computer zone */}
                    <div className="p-4 border border-dashed border-brand-gold/30 rounded-md bg-[#0b251c]/40 hover:bg-[#0b251c]/70 transition-colors flex flex-col items-center justify-center text-center group cursor-pointer relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleSliderFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        title={lang === 'en' ? 'Upload image from computer' : 'رفع صورة من جهازك'}
                      />
                      <Upload className="text-brand-gold w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
                      <span className="text-[11px] font-medium text-white/85">
                        {lang === 'en' ? 'Upload Image from Laptop' : 'رفع صورة من جهازك المحمول/المكتبي'}
                      </span>
                      <span className="text-[9px] text-white/50 mt-1">
                        {lang === 'en' ? 'Supports JPG, PNG, WEBP' : 'يدعم صيغ JPG، PNG، WEBP'}
                      </span>
                    </div>

                    <div className="relative flex py-1 items-center">
                      <div className="flex-grow border-t border-brand-gold/10"></div>
                      <span className="flex-shrink mx-3 text-[9px] uppercase tracking-widest text-white/40">{lang === 'en' ? 'Or paste URL' : 'أو الصق رابط الصورة'}</span>
                      <div className="flex-grow border-t border-brand-gold/10"></div>
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="https://images.unsplash.com/photo-xxx"
                        value={newSliderUrl}
                        onChange={(e) => setNewSliderUrl(e.target.value)}
                        className="flex-grow px-3 py-2 bg-[#0b251c] text-white border border-brand-gold/20 rounded-sm text-xs focus:outline-none focus:border-brand-gold"
                      />
                      <button
                        onClick={handleAddSliderImg}
                        className="px-4 py-2 bg-[#0b251c] hover:bg-[#071913] text-brand-gold border border-brand-gold/30 text-xs uppercase tracking-wider font-semibold rounded-sm cursor-pointer"
                      >
                        {lang === 'en' ? 'Add URL' : 'إضافة رابط'}
                      </button>
                    </div>
                  </div>

                  {/* Current Images list with preview */}
                  <div className="space-y-3">
                    <label className="block text-[10px] uppercase tracking-wider font-semibold text-white/75">{lang === 'en' ? 'Active Slides' : 'الصور النشطة الحالية'}</label>
                    <div className="grid grid-cols-2 gap-4">
                      {sliderUrls.map((url, index) => (
                        <div 
                          key={index}
                          className="relative border border-brand-gold/15 rounded-sm overflow-hidden group bg-[#0b251c]/40 aspect-[16/9]"
                        >
                          <img 
                            src={url} 
                            alt={`Slide preview ${index}`} 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                              onClick={() => handleDeleteSliderImg(index)}
                              className="p-2 bg-red-700/90 text-white rounded-full hover:bg-red-700 transition-colors cursor-pointer"
                              title="Remove Slide"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <span className="absolute bottom-2 left-2 bg-[#0b251c]/85 border border-brand-gold/30 text-[9px] text-brand-gold font-bold px-2 py-0.5 rounded-sm">
                            Slide {index + 1}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Owner / Producer Section Image URL */}
                  <div className="space-y-3 pt-6 border-t border-brand-gold/15">
                    <label className="block text-[10px] uppercase tracking-wider font-semibold text-white/75">
                      {lang === 'en' ? 'Owner / Producer Section Image' : 'صورة قسم المالك / المنتج'}
                    </label>
                    <p className="text-[10px] text-white/60">
                      {lang === 'en' 
                        ? 'Upload a custom image directly from your laptop or provide a custom image URL.' 
                        : 'قم برفع صورة مخصصة مباشرة من جهازك أو الصق رابط صورة مخصص.'}
                    </p>

                    {/* Upload from computer zone */}
                    <div className="p-4 border border-dashed border-brand-gold/30 rounded-md bg-[#0b251c]/40 hover:bg-[#0b251c]/70 transition-colors flex flex-col items-center justify-center text-center group cursor-pointer relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleProducerFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        title={lang === 'en' ? 'Upload image from computer' : 'رفع صورة من جهازك'}
                      />
                      <Upload className="text-brand-gold w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
                      <span className="text-[11px] font-medium text-white/85">
                        {lang === 'en' ? 'Upload Image from Laptop' : 'رفع صورة من جهازك المحمول/المكتبي'}
                      </span>
                      <span className="text-[9px] text-white/50 mt-1">
                        {lang === 'en' ? 'Supports JPG, PNG, WEBP' : 'يدعم صيغ JPG، PNG، WEBP'}
                      </span>
                    </div>

                    <div className="relative flex py-1 items-center">
                      <div className="flex-grow border-t border-brand-gold/10"></div>
                      <span className="flex-shrink mx-3 text-[9px] uppercase tracking-widest text-white/40">{lang === 'en' ? 'Or paste URL' : 'أو الصق رابط الصورة'}</span>
                      <div className="flex-grow border-t border-brand-gold/10"></div>
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="https://images.unsplash.com/photo-xxx"
                        value={producerImageInput}
                        onChange={(e) => setProducerImageInput(e.target.value)}
                        className="flex-grow px-3 py-2 bg-[#0b251c] text-white border border-brand-gold/20 rounded-sm text-xs focus:outline-none focus:border-brand-gold"
                      />
                      <button
                        onClick={handleSaveProducerImage}
                        className="px-4 py-2 bg-[#0b251c] text-brand-gold border border-brand-gold/30 hover:border-brand-gold text-xs uppercase tracking-wider font-semibold rounded-sm cursor-pointer"
                      >
                        {lang === 'en' ? 'Save URL' : 'حفظ الرابط'}
                      </button>
                    </div>

                    {producerImageInput && (
                      <div className="relative border border-brand-gold/15 rounded-sm overflow-hidden bg-[#0b251c] aspect-[16/10] max-w-xs mt-2">
                        <img 
                          src={producerImageInput} 
                          alt="Producer preview" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}
                  </div>

                </div>
              )}

            </div>

            {/* Global Actions Footer (Reset / Log Out) */}
            <div className="p-5 border-t border-brand-gold/15 bg-[#061812] flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                onClick={handleGlobalReset}
                className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 font-medium transition-colors cursor-pointer"
              >
                <RefreshCw size={14} className="animate-spin-slow" />
                <span>{lang === 'en' ? 'Reset Entire Store' : 'إعادة ضبط المتجر بالكامل'}</span>
              </button>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleApplyClick}
                  disabled={isApplying}
                  className="flex-1 sm:flex-initial px-5 py-2.5 bg-brand-gold text-[#081511] font-sans text-xs uppercase tracking-wider font-bold rounded-sm cursor-pointer hover:bg-brand-gold/80 hover:shadow-[0_0_15px_rgba(242,193,68,0.4)] transition-all duration-300 flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  {isApplying ? (
                    <>
                      <RefreshCw size={13} className="animate-spin" />
                      <span>{lang === 'en' ? 'Applying...' : 'جاري التطبيق...'}</span>
                    </>
                  ) : (
                    <>
                      <Check size={14} />
                      <span>{lang === 'en' ? 'Apply & Publish' : 'تطبيق ونشر التغييرات'}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setIsAuthenticated(false)}
                  className="px-4 py-2 bg-transparent hover:bg-white/10 border border-brand-gold/30 text-brand-gold text-xs uppercase tracking-wider font-semibold rounded-sm cursor-pointer transition-colors"
                >
                  {lang === 'en' ? 'Lock Console' : 'إغلاق وتأمين اللوحة'}
                </button>
              </div>
            </div>

          </div>
        )}
      </motion.div>
    </div>
  );
}
