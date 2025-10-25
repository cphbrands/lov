import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getShopifyProducts } from '../data/shopifyProducts';
import { ShoppingCart, Heart, Eye, Search, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useCurrency } from '../context/CurrencyContext';
import { useTranslation } from 'react-i18next';
import { toast } from '../hooks/use-toast';
import QuickViewModal from '../components/QuickViewModal';
import SEO from '../components/SEO';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { formatPrice } = useCurrency();
  const { t } = useTranslation();
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const allProducts = await getShopifyProducts();
        
        if (searchQuery.trim()) {
          const filtered = allProducts.filter(product => 
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setProducts(filtered);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error('Error loading products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [searchQuery]);

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast({
      title: t('product.addToCart'),
      description: `${product.name} ${t('toast.addedToCart')}`,
    });
  };

  const handleWishlistToggle = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    toast({
      title: isInWishlist(product.id) ? t('toast.removedFromWishlist') : t('toast.addedToWishlist'),
      description: product.name,
    });
  };

  const handleQuickView = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  return (
    <>
      <SEO 
        title={`Søgeresultater: ${searchQuery} - Christmas House`}
        description={`Søgeresultater for "${searchQuery}" hos Christmas House`}
      />
      <div className="min-h-screen bg-gradient-to-b from-[#faf8f5] to-white">
        {/* Search Header */}
        <div className="bg-gradient-to-br from-[#0F2922] to-[#1a4039] py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Search className="w-8 h-8 text-[#D4AF37]" />
                <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-white">
                  Søgeresultater
                </h1>
              </div>
              {searchQuery && (
                <p className="text-white/90 text-lg">
                  Du søgte efter: <span className="text-[#D4AF37] font-semibold">"{searchQuery}"</span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="container mx-auto px-4 py-12">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-[#0F2922]/40" />
              <span className="ml-3 text-[#0F2922]/60">Søger...</span>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 max-w-2xl mx-auto">
              <div className="w-20 h-20 rounded-full bg-[#0F2922]/10 flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-[#0F2922]/40" />
              </div>
              <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0F2922] mb-4">
                Ingen resultater fundet
              </h2>
              <p className="text-[#0F2922]/70 mb-8">
                Vi kunne desværre ikke finde nogen produkter der matcher "{searchQuery}". Prøv at søge med andre søgeord.
              </p>
              <Link
                to="/"
                className="inline-block bg-gradient-to-r from-[#0F2922] to-[#1a4039] text-white px-8 py-3 rounded-sm hover:from-[#1a4039] hover:to-[#0F2922] transition-all duration-300 font-medium"
              >
                Tilbage til Forsiden
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <p className="text-[#0F2922]/70">
                  Fandt <span className="font-semibold text-[#0F2922]">{products.length}</span> {products.length === 1 ? 'produkt' : 'produkter'}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="group relative">
                    <Link to={`/produkt/${product.id}`} className="block">
                      <div className="aspect-square overflow-hidden rounded-sm mb-3 bg-[#faf8f5] relative shadow-md">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        
                        {/* Quick View Button */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                          <button
                            onClick={(e) => handleQuickView(e, product)}
                            className="flex-1 bg-white text-[#0F2922] py-2 rounded-sm hover:bg-[#faf8f5] transition-colors flex items-center justify-center gap-2 font-medium shadow-md border border-[#0F2922]/10 mx-4"
                          >
                            <Eye className="w-4 h-4" />
                            Quick View
                          </button>
                        </div>

                        {/* Stock Badge */}
                        <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                          <div className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
                          {product.inStock ? t('product.inStock') : t('product.outOfStock')}
                        </div>
                      </div>

                      {/* Wishlist Button */}
                      <button
                        onClick={(e) => handleWishlistToggle(e, product)}
                        className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-[#faf8f5] transition-colors z-10"
                        aria-label="Tilføj til ønskeliste"
                      >
                        <Heart 
                          className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-[#0F2922]/60'}`} 
                        />
                      </button>

                      <div className="space-y-2">
                        {product.isNew && (
                          <span className="inline-block bg-gradient-to-r from-[#0F2922] to-[#1a4039] text-white text-xs px-3 py-1 rounded-sm font-medium">
                            {t('common.new')}
                          </span>
                        )}
                        <p className="text-sm text-[#0F2922]/60">{product.brand}</p>
                        <h3 className="font-medium hover:underline line-clamp-2 text-[#0F2922]">{product.name}</h3>
                        <div className="flex items-center justify-between">
                          <p className="text-lg font-bold text-[#0F2922]">{formatPrice(product.price)}</p>
                          <button
                            onClick={(e) => handleAddToCart(e, product)}
                            disabled={!product.inStock}
                            className="bg-gradient-to-r from-[#0F2922] to-[#1a4039] text-white p-2.5 rounded-sm hover:from-[#1a4039] hover:to-[#0F2922] transition-all duration-300 disabled:from-[#0F2922]/30 disabled:to-[#1a4039]/30 disabled:cursor-not-allowed"
                            aria-label="Tilføj til kurv"
                          >
                            <ShoppingCart className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </>
  );
};

export default SearchPage;
