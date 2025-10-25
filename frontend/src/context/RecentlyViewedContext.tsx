import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface RecentlyViewedContextType {
  recentlyViewed: any[];
  addToRecentlyViewed: (product: any) => void;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(undefined);

export const useRecentlyViewed = () => {
  const context = useContext(RecentlyViewedContext);
  if (!context) {
    throw new Error('useRecentlyViewed must be used within RecentlyViewedProvider');
  }
  return context;
};

export const RecentlyViewedProvider = ({ children }: { children: React.ReactNode }) => {
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const MAX_ITEMS = 8;

  useEffect(() => {
    const saved = localStorage.getItem('bahne_recently_viewed');
    if (saved) {
      try {
        setRecentlyViewed(JSON.parse(saved));
      } catch (error) {
        console.error('Error parsing recently viewed:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (recentlyViewed.length > 0) {
      localStorage.setItem('bahne_recently_viewed', JSON.stringify(recentlyViewed));
    }
  }, [recentlyViewed]);

  const addToRecentlyViewed = useCallback((product) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(item => item.id !== product.id);
      const updated = [product, ...filtered].slice(0, MAX_ITEMS);
      return updated;
    });
  }, []);

  return (
    <RecentlyViewedContext.Provider value={{ recentlyViewed, addToRecentlyViewed }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
};
