import { shopifyService } from '../services/shopifyService';

let cachedProducts = null;
let cacheTimestamp = null;
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes (længere cache)
let pendingRequest = null; // Prevent duplicate requests

export const getShopifyProducts = async (forceRefresh = false) => {
  // Clear cache if force refresh
  if (forceRefresh) {
    cachedProducts = null;
    cacheTimestamp = null;
  }
  
  // Return cached data if still valid
  if (cachedProducts && cacheTimestamp && (Date.now() - cacheTimestamp < CACHE_DURATION)) {
    console.log(`Returning ${cachedProducts.length} cached products`);
    return cachedProducts;
  }

  // If there's already a pending request, return it
  if (pendingRequest) {
    console.log('Waiting for existing product request...');
    return pendingRequest;
  }

  try {
    console.log('Fetching products from Shopify...');
    const startTime = Date.now();
    pendingRequest = shopifyService.getAllProducts();
    const products = await pendingRequest;
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`✓ Fetched ${products.length} products in ${duration}s`);
    
    cachedProducts = products;
    cacheTimestamp = Date.now();
    pendingRequest = null;
    return products;
  } catch (error) {
    console.error('Failed to load Shopify products:', error);
    pendingRequest = null;
    return [];
  }
};

export const getShopifyProductsByCategory = async (category) => {
  try {
    const products = await getShopifyProducts();
    return products.filter(p => p.category === category);
  } catch (error) {
    console.error('Failed to load products by category:', error);
    return [];
  }
};

export const getShopifyProductById = async (id) => {
  try {
    const products = await getShopifyProducts();
    return products.find(p => p.id === id);
  } catch (error) {
    console.error('Failed to load product:', error);
    return null;
  }
};

// Clear cache function
export const clearProductCache = () => {
  cachedProducts = null;
  cacheTimestamp = null;
};
