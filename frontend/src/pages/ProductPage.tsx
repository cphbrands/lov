import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getShopifyProducts, getShopifyProductById } from '../data/shopifyProducts';
import { ShoppingCart, Heart, ChevronLeft, Share2, Loader2, ZoomIn, Award } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';
import { useCurrency } from '../context/CurrencyContext';
import { useTranslation } from 'react-i18next';
import { toast } from '../hooks/use-toast';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, FacebookIcon, TwitterIcon, WhatsappIcon } from 'react-share';
import SEO from '../components/SEO';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { recentlyViewed, addToRecentlyViewed } = useRecentlyViewed();
  const { formatPrice } = useCurrency();
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState(1);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      try {
        const productData = await getShopifyProductById(id);
        if (productData) {
          setProduct(productData);
          addToRecentlyViewed(productData);
          
          // Load related products
          const allProducts = await getShopifyProducts();
          const related = allProducts
            .filter(p => p.category === productData.category && p.id !== productData.id)
            .slice(0, 4);
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
    
    // Cleanup
    return () => {
      setProduct(null);
      setRelatedProducts([]);
      setShowShareMenu(false);
    };
  }, [id]);

  const recentlyViewedFiltered = recentlyViewed.filter(p => p.id !== id).slice(0, 4);
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast({
      title: t('product.addToCart'),
      description: `${quantity} x ${product.name} ${t('toast.addedToCart')}`,
    });
  };

  const handleWishlistToggle = () => {
    toggleWishlist(product);
    toast({
      title: isInWishlist(product.id) ? t('toast.removedFromWishlist') : t('toast.addedToWishlist'),
      description: product.name,
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-zinc-400" />
        <span className="ml-3 text-zinc-600">{t('common.loading')}</span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">{t('product.notFound')}</h2>
        <button
          onClick={() => navigate('/')}
          className="text-zinc-600 hover:text-zinc-900 flex items-center gap-2 mx-auto"
        >
          <ChevronLeft className="w-4 h-4" />
          {t('product.back')}
        </button>
      </div>
    );
  }

  const productImages = product.images && product.images.length > 0 ? product.images : [product.image];

  return (
    <>
      <SEO
        title={`${product.name} | ${product.brand} | Christmas House`}
        description={`${t('product.buy')} ${product.name} ${t('product.from')} ${product.brand}. ${formatPrice(product.price, product.currency)}`}
        image={product.image}
        type="product"
      />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900 mb-8 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          {t('product.back')}
        </button>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Images Gallery */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-zinc-100 sticky top-24 relative group">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {productImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {productImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        selectedImage === index ? 'bg-white w-6' : 'bg-white/60'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
            
            {/* Thumbnail Images */}
            {productImages.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {productImages.slice(0, 5).map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-md overflow-hidden border-2 transition-all ${
                      selectedImage === index ? 'border-zinc-900' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {product.isNew && (
              <span className="inline-block bg-zinc-900 text-white text-xs px-3 py-1 rounded">
                {t('common.new')}
              </span>
            )}
            
            {/* Nordic Quality Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-2 rounded-md border border-blue-200">
              <Award className="w-4 h-4 text-blue-900" />
              <span className="text-sm font-medium text-blue-900">{t('home.nordic.quality')}</span>
            </div>
            
            <div>
              <p className="text-zinc-600 mb-2">{product.brand}</p>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
              <p className="text-3xl font-bold">{formatPrice(product.price, product.currency)}</p>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2 p-4 bg-zinc-50 rounded-lg">
              <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="font-medium">
                {product.inStock ? t('product.inStock') : t('product.outOfStock')}
              </span>
            </div>

            {product.description && (
              <div className="border-t border-zinc-200 pt-6">
                <p className="text-zinc-600 leading-relaxed mb-6">
                  {product.description}
                </p>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">{t('product.quantity')}</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-zinc-300 rounded-md hover:bg-zinc-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-xl font-medium w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border border-zinc-300 rounded-md hover:bg-zinc-100 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full bg-zinc-900 text-white py-4 rounded-md hover:bg-zinc-800 transition-colors disabled:bg-zinc-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium"
              >
                <ShoppingCart className="w-5 h-5" />
                {t('product.addToCart')}
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleWishlistToggle}
                  className="border border-zinc-300 py-3 rounded-md hover:bg-zinc-50 transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                  {t('nav.wishlist')}
                </button>

                <div className="relative">
                  <button
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="w-full border border-zinc-300 py-3 rounded-md hover:bg-zinc-50 transition-colors flex items-center justify-center gap-2 font-medium"
                  >
                    <Share2 className="w-5 h-5" />
                    {t('product.share')}
                  </button>
                  
                  {showShareMenu && shareUrl && (
                    <div className="absolute top-full mt-2 left-0 bg-white border border-zinc-200 rounded-lg shadow-lg p-3 z-10 flex gap-2">
                      <FacebookShareButton url={shareUrl}>
                        <FacebookIcon size={32} round />
                      </FacebookShareButton>
                      <TwitterShareButton url={shareUrl} title={product.name}>
                        <TwitterIcon size={32} round />
                      </TwitterShareButton>
                      <WhatsappShareButton url={shareUrl} title={product.name}>
                        <WhatsappIcon size={32} round />
                      </WhatsappShareButton>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="border-t border-zinc-200 pt-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">{t('product.shipping')}</h3>
                <ul className="text-sm text-zinc-600 space-y-1">
                  <li>• {t('product.shipping.info')}</li>
                  <li>• {t('product.shipping.delivery')}</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t('product.return')}</h3>
                <p className="text-sm text-zinc-600">
                  {t('product.return.info')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">{t('product.related')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map(relatedProduct => (
                <Link key={relatedProduct.id} to={`/produkt/${relatedProduct.id}`} className="group">
                  <div className="aspect-square overflow-hidden rounded-lg mb-3 bg-zinc-100">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <p className="text-sm text-zinc-600">{relatedProduct.brand}</p>
                  <h3 className="font-medium group-hover:underline line-clamp-2">{relatedProduct.name}</h3>
                  <p className="font-semibold">{formatPrice(relatedProduct.price, relatedProduct.currency)}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Recently Viewed */}
        {recentlyViewedFiltered.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">{t('product.recentlyViewed')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {recentlyViewedFiltered.map(viewedProduct => (
                <Link key={viewedProduct.id} to={`/produkt/${viewedProduct.id}`} className="group">
                  <div className="aspect-square overflow-hidden rounded-lg mb-3 bg-zinc-100">
                    <img
                      src={viewedProduct.image}
                      alt={viewedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <p className="text-sm text-zinc-600">{viewedProduct.brand}</p>
                  <h3 className="font-medium group-hover:underline line-clamp-2">{viewedProduct.name}</h3>
                  <p className="font-semibold">{formatPrice(viewedProduct.price, viewedProduct.currency)}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductPage;
