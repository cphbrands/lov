import axios from 'axios';

const SHOPIFY_STORE_DOMAIN = 'hztmcs-09.myshopify.com';
const STOREFRONT_ACCESS_TOKEN = 'f736803a6786e7c47579c2cc527669ca';
const API_VERSION = '2025-07';

const shopifyClient = axios.create({
  baseURL: `https://${SHOPIFY_STORE_DOMAIN}/api/${API_VERSION}`,
  headers: {
    'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
    'Content-Type': 'application/json',
  },
});

// GraphQL query for products
const PRODUCTS_QUERY = `
  query GetProducts($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      edges {
        node {
          id
          title
          handle
          description
          vendor
          availableForSale
          tags
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                availableForSale
                quantityAvailable
                priceV2 {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

// GraphQL query for collections
const COLLECTIONS_QUERY = `
  query GetCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
        }
      }
    }
  }
`;

// GraphQL query for products by collection (with pagination)
const PRODUCTS_BY_COLLECTION_QUERY = `
  query GetProductsByCollection($handle: String!, $first: Int!, $after: String) {
    collectionByHandle(handle: $handle) {
      id
      title
      products(first: $first, after: $after) {
        edges {
          node {
            id
            title
            handle
            description
            vendor
            availableForSale
            tags
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  quantityAvailable
                  priceV2 {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;

// Transform Shopify product to our format
const transformProduct = (shopifyProduct) => {
  const product = shopifyProduct.node;
  const images = product.images.edges.map(img => img.node);
  const variants = product.variants.edges.map(v => v.node);
  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const currencyCode = product.priceRange.minVariantPrice.currencyCode;
  
  // Extract product ID (remove gid://shopify/Product/ prefix)
  const id = product.id.split('/').pop();
  
  // Check if any variant has inventory
  const inStock = variants.some(v => v.availableForSale && v.quantityAvailable > 0);
  
  // Determine if new based on tags
  const isNew = product.tags.some(tag => tag.toLowerCase().includes('new') || tag.toLowerCase().includes('nyhed'));
  
  return {
    id: id,
    name: product.title,
    brand: product.vendor || 'Christmas House',
    price: price,
    currency: currencyCode,
    image: images[0]?.url || 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500',
    images: images.map(img => img.url),
    description: product.description,
    handle: product.handle,
    category: determineCategory(product.tags),
    inStock: inStock,
    isNew: isNew,
    tags: product.tags,
    variants: variants,
    availableForSale: product.availableForSale
  };
};

// Determine category from tags
const determineCategory = (tags) => {
  const lowerTags = tags.map(t => t.toLowerCase());
  
  // Check if explicitly tagged as "gave" or "gift" (only these go to gaver)
  const isGift = lowerTags.some(t => 
    t === 'gave' || 
    t === 'gaver' || 
    t === 'gift' || 
    t === 'gifts' ||
    t.includes('gaveidé') ||
    t.includes('present')
  );
  
  if (isGift) {
    return 'gaver';
  }
  
  // Everything else (including jul, christmas, betlehem, kranse, etc.) goes to julepynt
  return 'julepynt';
};

export const shopifyService = {
  // Fetch all products with pagination
  async getAllProducts() {
    try {
      let allProducts = [];
      let hasNextPage = true;
      let cursor = null;
      let pageCount = 0;
      
      while (hasNextPage && pageCount < 10) { // Max 10 pages for safety
        pageCount++;
        const response = await shopifyClient.post('/graphql.json', {
          query: PRODUCTS_QUERY,
          variables: cursor ? { first: 250, after: cursor } : { first: 250 }
        });
        
        if (response.data.errors) {
          console.error('Shopify GraphQL errors:', response.data.errors);
          break;
        }
        
        const products = response.data.data.products.edges.map(transformProduct);
        allProducts = [...allProducts, ...products];
        
        const pageInfo = response.data.data.products.pageInfo;
        hasNextPage = pageInfo.hasNextPage;
        cursor = pageInfo.endCursor;
        
        console.log(`Page ${pageCount}: +${products.length} products (total: ${allProducts.length})`);
      }
      
      return allProducts;
    } catch (error) {
      console.error('Error fetching Shopify products:', error);
      throw error;
    }
  },

  // Fetch products by category
  async getProductsByCategory(category, limit = 50) {
    try {
      const allProducts = await this.getAllProducts(limit);
      return allProducts.filter(p => p.category === category);
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  },

  // Fetch single product
  async getProductById(id) {
    try {
      const allProducts = await this.getAllProducts();
      return allProducts.find(p => p.id === id);
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  // Fetch collections
  async getCollections(limit = 20) {
    try {
      const response = await shopifyClient.post('/graphql.json', {
        query: COLLECTIONS_QUERY,
        variables: { first: limit }
      });
      
      if (response.data.errors) {
        console.error('Shopify GraphQL errors:', response.data.errors);
        throw new Error('Failed to fetch collections from Shopify');
      }
      
      return response.data.data.collections.edges.map(c => c.node);
    } catch (error) {
      console.error('Error fetching collections:', error);
      throw error;
    }
  },

  // Fetch products by collection handle (with pagination)
  async getProductsByCollection(handle, perPage = 250) {
    try {
      let allProducts = [];
      let hasNextPage = true;
      let cursor = null;
      let pageCount = 0;

      while (hasNextPage) {
        pageCount++;
        const response = await shopifyClient.post('/graphql.json', {
          query: PRODUCTS_BY_COLLECTION_QUERY,
          variables: { handle, first: perPage, after: cursor }
        });
        
        if (response.data.errors) {
          console.error('Shopify GraphQL errors:', response.data.errors);
          throw new Error('Failed to fetch products by collection');
        }
        
        const collection = response.data.data.collectionByHandle;
        if (!collection) return [];
        
        const products = collection.products.edges.map(transformProduct);
        allProducts = [...allProducts, ...products];
        
        const pageInfo = collection.products.pageInfo;
        hasNextPage = pageInfo.hasNextPage;
        cursor = pageInfo.endCursor;
        
        console.log(`Collection "${handle}" page ${pageCount}: +${products.length} products (total: ${allProducts.length})`);
      }
      
      return allProducts;
    } catch (error) {
      console.error('Error fetching products by collection:', error);
      throw error;
    }
  }
};
