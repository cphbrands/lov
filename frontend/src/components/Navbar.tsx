import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, User, MapPin, Heart, Globe } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { getCartCount } = useCart();
  const { getWishlistCount } = useWishlist();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showLangMenu, setShowLangMenu] = useState(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const languages = [
    { code: 'da', name: 'Dansk', flag: '🇩🇰' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
    { code: 'no', name: 'Norsk', flag: '🇳🇴' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    setShowLangMenu(false);
  };

  return (
    <>
      {/* Top Banner */}
      <div className="bg-zinc-900 text-white text-sm py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-8 overflow-x-auto">
            <span className="whitespace-nowrap">{t('banner.christmas')}</span>
            <span className="whitespace-nowrap">{t('banner.shipping')}</span>
            <span className="whitespace-nowrap">{t('banner.return')}</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white border-b border-zinc-200 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold tracking-wider hover:opacity-80 transition-opacity">
              Christmas House
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link to="/kategori/julepynt" className="text-zinc-700 hover:text-zinc-900 transition-colors">
                {t('nav.jul')}
              </Link>
            <Link to="/kategori/gaver" className="text-zinc-700 hover:text-zinc-900 transition-colors">
              {t('nav.gaver')}
            </Link>
            <Link to="/spor-din-ordre" className="text-zinc-700 hover:text-zinc-900 transition-colors">
              {t('nav.trackOrder')}
            </Link>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="hidden lg:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder={t('nav.search')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-10 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Search className="w-5 h-5 text-zinc-400" />
                </button>
              </div>
            </form>

            {/* Right Icons */}
            <div className="flex items-center gap-4">
              {/* Language Selector */}
              <div className="relative hidden md:block">
                <button
                  onClick={() => setShowLangMenu(!showLangMenu)}
                  className="flex items-center gap-2 text-zinc-700 hover:text-zinc-900 transition-colors"
                >
                  <Globe className="w-5 h-5" />
                  <span className="text-sm">{currentLanguage.flag}</span>
                </button>
                
                {showLangMenu && (
                  <div className="absolute top-full right-0 mt-2 bg-white border border-zinc-200 rounded-lg shadow-lg py-2 min-w-[150px] z-50">
                    {languages.map(lang => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`w-full px-4 py-2 text-left hover:bg-zinc-50 transition-colors flex items-center gap-2 ${
                          i18n.language === lang.code ? 'bg-zinc-100' : ''
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span className="text-sm">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button className="hidden md:block text-zinc-700 hover:text-zinc-900 transition-colors">
                <User className="w-5 h-5" />
              </button>
              <Link to="/onskeliste" className="relative text-zinc-700 hover:text-zinc-900 transition-colors">
                <Heart className="w-5 h-5" />
                {getWishlistCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {getWishlistCount()}
                  </span>
                )}
              </Link>
              <Link to="/kurv" className="relative text-zinc-700 hover:text-zinc-900 transition-colors">
                <ShoppingCart className="w-5 h-5" />
                {getCartCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-zinc-900 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {getCartCount()}
                  </span>
                )}
              </Link>
              <button
                className="md:hidden text-zinc-700"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-zinc-200 bg-white">
            <div className="container mx-auto px-4 py-4 space-y-4">
              <form onSubmit={handleSearch} className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder={t('nav.search')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-4 pr-10 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-900"
                  />
                  <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Search className="w-5 h-5 text-zinc-400" />
                  </button>
                </div>
              </form>
              <Link
                to="/kategori/julepynt"
                className="block py-2 text-zinc-700 hover:text-zinc-900"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.jul')}
              </Link>
              <Link
                to="/kategori/gaver"
                className="block py-2 text-zinc-700 hover:text-zinc-900"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.gaver')}
              </Link>
              <Link
                to="/spor-din-ordre"
                className="block py-2 text-zinc-700 hover:text-zinc-900"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.trackOrder')}
              </Link>
              
              {/* Mobile Language Selector */}
              <div className="border-t pt-4 mt-4">
                <p className="text-sm text-zinc-600 mb-2">Sprog / Language</p>
                <div className="grid grid-cols-2 gap-2">
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        changeLanguage(lang.code);
                        setIsMenuOpen(false);
                      }}
                      className={`px-3 py-2 text-left rounded border transition-colors flex items-center gap-2 ${
                        i18n.language === lang.code 
                          ? 'bg-zinc-900 text-white border-zinc-900' 
                          : 'border-zinc-300 hover:bg-zinc-50'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span className="text-sm">{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
