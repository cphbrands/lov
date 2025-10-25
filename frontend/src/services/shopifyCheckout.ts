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

// GraphQL mutation to create Cart and get checkout URL (Storefront API)
const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        lines(first: 50) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                }
              }
            }
          }
        }
      }
      userErrors {
        message
        field
      }
    }
  }
`;


// Create Shopify checkout and redirect
export const createShopifyCheckout = async (cartItems) => {
  try {
    console.log('Creating checkout with cart items:', cartItems);
    
    const lineItems = cartItems.map(item => {
      // Get variant ID from the item's variants array
      let variantId = item.variants?.[0]?.id;
      
      // If no variant ID found, construct one from the product ID
      // Note: This is a fallback and may not work for all products
      if (!variantId) {
        console.warn('No variant ID found for product:', item.id, item.name);
        // Try to use the product ID to construct variant ID (first variant)
        variantId = `gid://shopify/ProductVariant/${item.id}`;
      }
      
      console.log('Line item:', { variantId, quantity: item.quantity, product: item.name });
      
      return {
        variantId: variantId,
        quantity: item.quantity
      };
    });

    console.log('Sending checkout request with line items:', lineItems);

    const response = await shopifyClient.post('/graphql.json', {
      query: CART_CREATE_MUTATION,
      variables: {
        input: {
          lines: lineItems.map(li => ({
            merchandiseId: li.variantId,
            quantity: li.quantity,
          })),
          // Optionally set market/country to ensure correct pricing
          // buyerIdentity: { countryCode: 'DK' },
        }
      }
    });

    console.log('Checkout response:', response.data);

    if (response.data.errors) {
      console.error('Shopify GraphQL errors:', response.data.errors);
      throw new Error(`Checkout fejl: ${response.data.errors[0]?.message || 'Ukendt fejl'}`);
    }

    const cart = response.data.data?.cartCreate?.cart;
    const errors = response.data.data?.cartCreate?.userErrors;

    if (errors && errors.length > 0) {
      console.error('Checkout user errors:', errors);
      throw new Error(`Checkout fejl: ${errors[0].message}`);
    }

    if (!cart || !cart.checkoutUrl) {
      console.error('No checkout URL returned:', response.data);
      throw new Error('Kunne ikke oprette checkout - ingen URL modtaget');
    }

    console.log('Checkout created successfully:', cart.checkoutUrl);
    
    // Return the checkout URL to redirect to
    return cart.checkoutUrl;
  } catch (error) {
    console.error('Error creating Shopify checkout:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
    throw new Error(error.message || 'Kunne ikke oprette forbindelse til checkout');
  }
};

export const shopifyService = {
  // ... existing methods ...
  createCheckout: createShopifyCheckout,
};
