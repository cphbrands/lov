import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { useTranslation } from 'react-i18next';
import { createShopifyCheckout } from '../services/shopifyCheckout';
import { toast } from '../hooks/use-toast';
import SEO from '../components/SEO';

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const { formatPrice } = useCurrency();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isChristmasGift, setIsChristmasGift] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const subtotal = getCartTotal();
  const shippingCost = 0; // Fri fragt altid
  const total = subtotal + shippingCost;

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    try {
      const checkoutUrl = await createShopifyCheckout(cart);
      // Redirect to Shopify checkout
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: t('common.error'),
        description: t('cart.checkoutError'),
        variant: 'destructive'
      });
      setCheckoutLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <>
        <SEO
          title={`${t('cart.title')} | Christmas House`}
          description={t('cart.title')}
        />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-zinc-400" />
            <h2 className="text-2xl font-bold mb-4">{t('cart.empty')}</h2>
            <p className="text-zinc-600 mb-8">
              {t('cart.empty.desc')}
            </p>
            <Link
              to="/"
              className="inline-block bg-zinc-900 text-white px-8 py-3 rounded-md hover:bg-zinc-800 transition-colors"
            >
              {t('cart.continue')}
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title={`${t('cart.title')} | Christmas House`}
        description={t('cart.title')}
      />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">{t('cart.title')}</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <div key={item.id} className="bg-white border border-zinc-200 rounded-lg p-4">
                <div className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm text-zinc-600">{item.brand}</p>
                        <h3 className="font-medium">{item.name}</h3>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-zinc-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 border border-zinc-300 rounded-md hover:bg-zinc-100 transition-colors flex items-center justify-center"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 border border-zinc-300 rounded-md hover:bg-zinc-100 transition-colors flex items-center justify-center"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-lg font-semibold">
                        {formatPrice(item.price * item.quantity, item.currency || 'EUR')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">{t('cart.summary')}</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-zinc-600">
                  <span>{t('cart.subtotal')}</span>
                  <span>{formatPrice(subtotal, 'EUR')}</span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>{t('cart.shipping')}</span>
                  <span>{t('cart.shippingFree')}</span>
                </div>
                <div className="border-t border-zinc-300 pt-3 flex justify-between font-bold text-lg">
                  <span>{t('cart.total')}</span>
                  <span>{formatPrice(total, 'EUR')}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={checkoutLoading}
                className="w-full bg-zinc-900 text-white py-4 rounded-md hover:bg-zinc-800 transition-colors font-medium mb-3 disabled:bg-zinc-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {checkoutLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {t('cart.processing')}
                  </>
                ) : (
                  t('cart.checkout')
                )}
              </button>
              
              {/* Julegave Checkbox - Diskret */}
              <div className="mb-4 p-3 bg-zinc-50 rounded-md border border-zinc-200">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isChristmasGift}
                    onChange={(e) => setIsChristmasGift(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900"
                  />
                  <div className="text-sm">
                    <span className="text-zinc-700">{t('cart.christmasGift')}</span>
                    {isChristmasGift && (
                      <p className="text-xs text-zinc-500 mt-1">
                        {t('cart.christmasGift.info')}
                      </p>
                    )}
                  </div>
                </label>
              </div>
              
              <Link
                to="/"
                className="block text-center text-zinc-600 hover:text-zinc-900 transition-colors"
              >
                {t('cart.continue')}
              </Link>

              {/* Benefits */}
              <div className="mt-6 pt-6 border-t border-zinc-300 space-y-3 text-sm text-zinc-600">
                <p className="flex items-start gap-2">
                  <span>✓</span>
                  <span>{t('product.shipping.info')}</span>
                </p>
                <p className="flex items-start gap-2">
                  <span>✓</span>
                  <span>{t('footer.return.desc')}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
