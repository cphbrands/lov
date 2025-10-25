import React, { useState } from 'react';
import { X, ShoppingCart, Heart, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useCurrency } from '../context/CurrencyContext';
import { useTranslation } from 'react-i18next';
import { toast } from '../hooks/use-toast';
import { Link } from 'react-router-dom';

const QuickViewModal = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { formatPrice } = useCurrency();
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast({
      title: t('product.addToCart'),
      description: `${quantity} x ${product.name} ${t('toast.addedToCart')}`,
    });
    onClose();
  };

  const handleWishlistToggle = () => {
    toggleWishlist(product);
    toast({
      title: isInWishlist(product.id) ? t('toast.removedFromWishlist') : t('toast.addedToWishlist'),
      description: product.name,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-in fade-in duration-200" onClick={onClose}>
      <div 
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-zinc-200 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-lg font-semibold">{t('quickview.title')}</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-900 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="aspect-square rounded-lg overflow-hidden bg-zinc-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="space-y-4">
              {product.isNew && (
                <span className="inline-block bg-zinc-900 text-white text-xs px-3 py-1 rounded">
                  {t('common.new')}
                </span>
              )}
              
              <div>
                <p className="text-zinc-600 mb-1">{product.brand}</p>
                <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                <p className="text-2xl font-bold">{formatPrice(product.price, product.currency)}</p>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-sm text-zinc-600">
                  {product.inStock ? t('product.inStock') : t('product.outOfStock')}
                </span>
              </div>

              <p className="text-zinc-600">
                {product.description || `${t('quickview.quality')} ${product.brand}`}
              </p>

              {/* Quantity Selector */}
              <div>
                <label className="block text-sm font-medium mb-2">{t('product.quantity')}</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-zinc-300 rounded-md hover:bg-zinc-100 transition-colors flex items-center justify-center"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border border-zinc-300 rounded-md hover:bg-zinc-100 transition-colors flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="w-full bg-zinc-900 text-white py-3 rounded-md hover:bg-zinc-800 transition-colors disabled:bg-zinc-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {t('product.addToCart')}
                </button>

                <button
                  onClick={handleWishlistToggle}
                  className="w-full border border-zinc-300 py-3 rounded-md hover:bg-zinc-50 transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                  {isInWishlist(product.id) ? t('product.removeFromWishlist') : t('product.addToWishlist')}
                </button>

                <Link
                  to={`/produkt/${product.id}`}
                  onClick={onClose}
                  className="block text-center text-zinc-600 hover:text-zinc-900 transition-colors py-2"
                >
                  {t('quickview.fullDetails')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
