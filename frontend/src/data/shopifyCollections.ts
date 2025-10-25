import { shopifyService } from '../services/shopifyService';

let cachedCollections = null;
let cacheTimestamp = null;
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

export const getShopifyCollections = async () => {
  // Return cached data if still valid
  if (cachedCollections && cacheTimestamp && (Date.now() - cacheTimestamp < CACHE_DURATION)) {
    return cachedCollections;
  }

  try {
    const collections = await shopifyService.getCollections(50);
    cachedCollections = collections;
    cacheTimestamp = Date.now();
    return collections;
  } catch (error) {
    console.error('Failed to load Shopify collections:', error);
    return [];
  }
};

export const getProductsByCollection = async (handle) => {
  try {
    const products = await shopifyService.getProductsByCollection(handle);
    return products;
  } catch (error) {
    console.error('Failed to load products by collection:', error);
    return [];
  }
};

export const clearCollectionCache = () => {
  cachedCollections = null;
  cacheTimestamp = null;
};
