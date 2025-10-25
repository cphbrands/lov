import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Award, Package, Shield, Gift, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';

const Home = () => {
  const { t } = useTranslation();
  
  return (
    <>
      <SEO />
      <div className="min-h-screen bg-gradient-to-b from-[#faf8f5] to-white">
      {/* Split Hero Section */}
      <div className="h-[calc(100vh-10rem)] flex flex-col md:flex-row relative">
        {/* Decorative Gold Line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
        
        {/* Left Side - Jule Pynt */}
        <Link
          to="/kategori/julepynt"
          className="relative flex-1 group overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-110"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1573829831297-2038252d19e3?w=1200&q=80)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#0F2922]/80 via-[#0F2922]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
          
          <div className="relative h-full flex flex-col items-center justify-center text-white p-8">
            <div className="flex items-center gap-2 mb-4 text-sm tracking-[0.2em] uppercase text-[#D4AF37] font-light">
              <Sparkles className="w-4 h-4" />
              <span>{t('home.nordic.quality')}</span>
            </div>
            <h2 className="font-['Playfair_Display'] text-5xl md:text-7xl font-bold mb-4 text-center tracking-tight leading-tight">
              {t('category.julepynt.title')}
            </h2>
            <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-6" />
            <p className="text-xl md:text-2xl mb-8 text-center opacity-95 font-light max-w-md">
              {t('home.hero.jul')}
            </p>
            <div className="flex items-center gap-2 text-base font-medium group-hover:gap-4 transition-all duration-300 border border-white/30 px-6 py-3 rounded-sm backdrop-blur-sm hover:bg-white/10">
              <span className="tracking-wide">{t('home.hero.explore')}</span>
              <ChevronRight className="w-5 h-5" />
            </div>
          </div>
        </Link>

        {/* Right Side - Gaver */}
        <Link
          to="/kategori/gaver"
          className="relative flex-1 group overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-110"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1200&q=80)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-bl from-[#0F2922]/80 via-[#0F2922]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
          
          <div className="relative h-full flex flex-col items-center justify-center text-white p-8">
            <div className="flex items-center gap-2 mb-4 text-sm tracking-[0.2em] uppercase text-[#D4AF37] font-light">
              <Sparkles className="w-4 h-4" />
              <span>{t('home.nordic.quality')}</span>
            </div>
            <h2 className="font-['Playfair_Display'] text-5xl md:text-7xl font-bold mb-4 text-center tracking-tight leading-tight">
              {t('category.gaver.title')}
            </h2>
            <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-6" />
            <p className="text-xl md:text-2xl mb-8 text-center opacity-95 font-light max-w-md">
              {t('home.hero.gaver')}
            </p>
            <div className="flex items-center gap-2 text-base font-medium group-hover:gap-4 transition-all duration-300 border border-white/30 px-6 py-3 rounded-sm backdrop-blur-sm hover:bg-white/10">
              <span className="tracking-wide">{t('home.hero.find')}</span>
              <ChevronRight className="w-5 h-5" />
            </div>
          </div>
        </Link>
      </div>

      {/* Nordic Quality Banner */}
      <div className="relative bg-gradient-to-br from-[#0F2922] to-[#1a4039] py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]" />
              <Award className="w-8 h-8 text-[#D4AF37]" />
              <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]" />
            </div>
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold mb-6 text-white">{t('home.nordic.title')}</h2>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed font-light">
              {t('home.nordic.description')}
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-b from-white to-[#faf8f5] py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div className="group text-center">
              <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#0F2922]/10 to-[#D4AF37]/10 group-hover:from-[#0F2922]/20 group-hover:to-[#D4AF37]/20 transition-all duration-300">
                <Package className="w-10 h-10 text-[#0F2922]" />
              </div>
              <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-3 text-[#0F2922]">{t('footer.shipping.fast')}</h3>
              <p className="text-sm text-[#0F2922]/70 leading-relaxed">{t('footer.shipping.desc')}</p>
            </div>
            <div className="group text-center">
              <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#0F2922]/10 to-[#D4AF37]/10 group-hover:from-[#0F2922]/20 group-hover:to-[#D4AF37]/20 transition-all duration-300">
                <Shield className="w-10 h-10 text-[#0F2922]" />
              </div>
              <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-3 text-[#0F2922]">{t('footer.payment')}</h3>
              <p className="text-sm text-[#0F2922]/70 leading-relaxed">{t('footer.payment.desc')}</p>
            </div>
            <div className="group text-center">
              <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#0F2922]/10 to-[#D4AF37]/10 group-hover:from-[#0F2922]/20 group-hover:to-[#D4AF37]/20 transition-all duration-300">
                <Gift className="w-10 h-10 text-[#0F2922]" />
              </div>
              <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-3 text-[#0F2922]">{t('footer.return.extended')}</h3>
              <p className="text-sm text-[#0F2922]/70 leading-relaxed">{t('footer.return.desc')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Highlights */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold mb-4 text-[#0F2922]">{t('common.popularCategories')}</h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Link to="/kategori/julepynt" className="group">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm mb-4 shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1573829831297-2038252d19e3?w=600&q=80"
                alt="Jule Pynt"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F2922]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <div className="w-12 h-[1px] bg-[#D4AF37] mb-3" />
                <h3 className="font-['Playfair_Display'] text-2xl font-bold text-white">{t('category.julepynt.title')}</h3>
              </div>
            </div>
          </Link>
          <Link to="/kategori/gaver" className="group">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm mb-4 shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&q=80"
                alt="Gaver"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F2922]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <div className="w-12 h-[1px] bg-[#D4AF37] mb-3" />
                <h3 className="font-['Playfair_Display'] text-2xl font-bold text-white">{t('category.gaver.title')}</h3>
              </div>
            </div>
          </Link>
          <Link to="/spor-din-ordre" className="group">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm mb-4 shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1759563876910-5f54c1735761?w=600&q=80"
                alt="Spor din ordre"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F2922]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <div className="w-12 h-[1px] bg-[#D4AF37] mb-3" />
                <h3 className="font-['Playfair_Display'] text-2xl font-bold text-white">{t('nav.trackOrder')}</h3>
              </div>
            </div>
          </Link>
        </div>
      </div>
      </div>
    </>
  );
};

export default Home;
