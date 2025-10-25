import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Package, Truck, CheckCircle, Clock, ExternalLink } from 'lucide-react';
import SEO from '../components/SEO';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { z } from 'zod';
import { toast } from '../hooks/use-toast';

const SHOPIFY_STORE_DOMAIN = 'hztmcs-09.myshopify.com';

const TrackOrderPage = () => {
  const { t } = useTranslation();
  
  const orderSchema = z.object({
    orderNumber: z.string()
      .trim()
      .min(1, t('track.validation.orderRequired'))
      .max(100, t('track.validation.orderMax')),
    email: z.string()
      .trim()
      .email(t('track.validation.emailInvalid'))
      .max(255, t('track.validation.emailMax'))
  });

  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [showTracking, setShowTracking] = useState(false);
  const [trackingUrl, setTrackingUrl] = useState('');
  const [validationErrors, setValidationErrors] = useState<{ orderNumber?: string; email?: string }>({});

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors({});
    
    // Validate inputs
    const result = orderSchema.safeParse({ orderNumber, email });
    
    if (!result.success) {
      const errors: { orderNumber?: string; email?: string } = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0] === 'orderNumber') errors.orderNumber = issue.message;
        if (issue.path[0] === 'email') errors.email = issue.message;
      });
      setValidationErrors(errors);
      return;
    }
    
    // Construct Shopify order status URL
    // Clean order number (remove # if present)
    const cleanOrderNumber = orderNumber.replace(/^#/, '').trim();
    
    // Shopify's order lookup page
    const encodedEmail = encodeURIComponent(email);
    const encodedOrderNumber = encodeURIComponent(cleanOrderNumber);
    const url = `https://${SHOPIFY_STORE_DOMAIN}/tools/order-lookup?email=${encodedEmail}&order_number=${encodedOrderNumber}`;
    
    setTrackingUrl(url);
    setShowTracking(true);
    
    toast({
      title: t('track.toastTitle'),
      description: t('track.toastDesc'),
    });
  };

  return (
    <>
      <SEO 
        title={`${t('track.title')} - Christmas House`}
        description={t('track.description')}
      />
      <div className="min-h-screen bg-zinc-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-zinc-900 rounded-full mb-6">
                <Package className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold mb-4">{t('track.title')}</h1>
              <p className="text-zinc-600 text-lg">
                {t('track.description')}
              </p>
            </div>

            {/* Track Order Form */}
            {!showTracking ? (
              <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
                <form onSubmit={handleTrackOrder} className="space-y-6">
                  <div>
                    <label htmlFor="orderNumber" className="block text-sm font-medium mb-2">
                      {t('track.orderNumber')}
                    </label>
                    <Input
                      id="orderNumber"
                      type="text"
                      placeholder={t('track.orderPlaceholder')}
                      value={orderNumber}
                      onChange={(e) => {
                        setOrderNumber(e.target.value);
                        setValidationErrors(prev => ({ ...prev, orderNumber: undefined }));
                      }}
                      className={`w-full ${validationErrors.orderNumber ? 'border-red-500' : ''}`}
                    />
                    {validationErrors.orderNumber && (
                      <p className="text-sm text-red-600 mt-1">{validationErrors.orderNumber}</p>
                    )}
                    <p className="text-sm text-zinc-500 mt-2">
                      {t('track.orderHelp')}
                    </p>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      {t('track.email')}
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t('track.emailPlaceholder')}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setValidationErrors(prev => ({ ...prev, email: undefined }));
                      }}
                      className={`w-full ${validationErrors.email ? 'border-red-500' : ''}`}
                    />
                    {validationErrors.email && (
                      <p className="text-sm text-red-600 mt-1">{validationErrors.email}</p>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    {t('track.search')}
                  </Button>
                </form>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">{t('track.orderStatus')}</h2>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(trackingUrl, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {t('track.openNewTab')}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setShowTracking(false);
                        setOrderNumber('');
                        setEmail('');
                      }}
                    >
                      {t('track.newSearch')}
                    </Button>
                  </div>
                </div>
                
                <div className="relative" style={{ paddingBottom: '75%', height: 0 }}>
                  <iframe
                    src={trackingUrl}
                    title="Shopify Order Tracking"
                    className="absolute top-0 left-0 w-full h-full border border-zinc-200 rounded"
                    sandbox="allow-same-origin allow-scripts allow-forms"
                  />
                </div>
                
                <p className="text-sm text-zinc-500 mt-4">
                  {t('track.iframeHelp')}
                </p>
              </div>
            )}

            {/* How it works */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">{t('track.howItWorks')}</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center">
                    <Package className="w-6 h-6 text-zinc-900" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{t('track.step1.title')}</h3>
                    <p className="text-sm text-zinc-600">
                      {t('track.step1.desc')}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-zinc-900" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{t('track.step2.title')}</h3>
                    <p className="text-sm text-zinc-600">
                      {t('track.step2.desc')}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center">
                    <Truck className="w-6 h-6 text-zinc-900" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{t('track.step3.title')}</h3>
                    <p className="text-sm text-zinc-600">
                      {t('track.step3.desc')}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-zinc-900" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{t('track.step4.title')}</h3>
                    <p className="text-sm text-zinc-600">
                      {t('track.step4.desc')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Help section */}
            <div className="mt-12 text-center">
              <p className="text-zinc-600 mb-4">
                {t('track.needHelp')}
              </p>
              <a 
                href="/kontakt" 
                className="text-zinc-900 font-medium hover:underline"
              >
                {t('track.contactUs')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrackOrderPage;
