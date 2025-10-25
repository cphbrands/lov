import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface CurrencyContextType {
  currency: string;
  convertPrice: (price: number, fromCurrency?: string) => number;
  formatPrice: (price: number, fromCurrency?: string) => string;
  currencySymbol: string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within CurrencyProvider');
  }
  return context;
};

// Exchange rates - with EUR as base since Shopify store uses EUR
const exchangeRates = {
  EUR: 1,
  DKK: 7.46,     // 1 EUR = 7.46 DKK
  USD: 1.08,     // 1 EUR = 1.08 USD
  SEK: 11.35,    // 1 EUR = 11.35 SEK
  NOK: 11.80,    // 1 EUR = 11.80 NOK
  GBP: 0.86,     // 1 EUR = 0.86 GBP
};

const currencySymbols = {
  DKK: 'kr.',
  USD: '$',
  EUR: '€',
  SEK: 'kr',
  NOK: 'kr',
  GBP: '£',
};

const languageToCurrency = {
  da: 'DKK',
  en: 'EUR', // Changed from USD to EUR since store uses EUR
  sv: 'SEK',
  no: 'NOK',
  de: 'EUR',
  fr: 'EUR',
  es: 'EUR',
};

export const CurrencyProvider = ({ children }: { children: React.ReactNode }) => {
  const { i18n } = useTranslation();
  const [currency, setCurrency] = useState('EUR');

  useEffect(() => {
    const newCurrency = languageToCurrency[i18n.language] || 'EUR';
    setCurrency(newCurrency);
  }, [i18n.language]);

  const convertPrice = (price, fromCurrency = 'EUR') => {
    // If the price is already in the target currency, no conversion needed
    if (fromCurrency === currency) {
      return price;
    }
    
    // Convert from source currency to EUR first (if not already EUR)
    const priceInEUR = fromCurrency === 'EUR' ? price : price / exchangeRates[fromCurrency];
    
    // Then convert from EUR to target currency
    const rate = exchangeRates[currency];
    return priceInEUR * rate;
  };

  const formatPrice = (price, fromCurrency = 'EUR') => {
    const convertedPrice = convertPrice(price, fromCurrency);
    const symbol = currencySymbols[currency];
    
    // Format based on currency
    if (currency === 'USD' || currency === 'GBP') {
      return `${symbol}${convertedPrice.toFixed(2)}`;
    }
    return `${convertedPrice.toFixed(2)} ${symbol}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, convertPrice, formatPrice, currencySymbol: currencySymbols[currency] }}>
      {children}
    </CurrencyContext.Provider>
  );
};
