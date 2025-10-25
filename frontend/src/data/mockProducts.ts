// Mock product data for the webshop

export const julepyntProducts = [
  {
    id: 'jp1',
    name: 'Juletræskugle Guld',
    brand: 'Christmas Decor',
    price: 49.95,
    image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=500',
    category: 'julepynt',
    inStock: true,
    isNew: true
  },
  {
    id: 'jp2',
    name: 'Julestjerne LED',
    brand: 'Nordic Light',
    price: 199.00,
    image: 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=500',
    category: 'julepynt',
    inStock: true,
    isNew: false
  },
  {
    id: 'jp3',
    name: 'Kalenderlys Hvid 4-pak',
    brand: 'Klarborg',
    price: 129.95,
    image: 'https://images.unsplash.com/photo-1602874801006-e7f0c5a4c2e4?w=500',
    category: 'julepynt',
    inStock: true,
    isNew: false
  },
  {
    id: 'jp4',
    name: 'Juletræ i Keramik',
    brand: 'Danish Design',
    price: 349.00,
    image: 'https://images.unsplash.com/photo-1544376664-80b17f09d399?w=500',
    category: 'julepynt',
    inStock: true,
    isNew: true
  },
  {
    id: 'jp5',
    name: 'Juleophæng Træ Sæt',
    brand: 'Christmas Decor',
    price: 89.95,
    image: 'https://images.unsplash.com/photo-1576086444767-7a84de9ebae0?w=500',
    category: 'julepynt',
    inStock: true,
    isNew: false
  },
  {
    id: 'jp6',
    name: 'Julenisse Figur',
    brand: 'Kay Bojesen',
    price: 449.00,
    image: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?w=500',
    category: 'julepynt',
    inStock: true,
    isNew: false
  },
  {
    id: 'jp7',
    name: 'Adventskrans',
    brand: 'Nordic Tradition',
    price: 299.00,
    image: 'https://images.unsplash.com/photo-1544973999-99d9b4f0c2b1?w=500',
    category: 'julepynt',
    inStock: true,
    isNew: true
  },
  {
    id: 'jp8',
    name: 'Juleservietter 20-pak',
    brand: 'Royal Copenhagen',
    price: 69.95,
    image: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=500',
    category: 'julepynt',
    inStock: true,
    isNew: false
  }
];

export const gaverProducts = [
  {
    id: 'g1',
    name: 'Hygge Plaid - Grå',
    brand: 'Røros Tweed',
    price: 899.00,
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=500',
    category: 'gaver',
    inStock: true,
    isNew: true
  },
  {
    id: 'g2',
    name: 'Duftlys - Vinter',
    brand: 'Skandinavisk',
    price: 249.00,
    image: 'https://images.unsplash.com/photo-1602874801006-e7f0c5a4c2e4?w=500',
    category: 'gaver',
    inStock: true,
    isNew: false
  },
  {
    id: 'g3',
    name: 'Gavekurv Deluxe',
    brand: 'Bahne Selection',
    price: 549.00,
    image: 'https://images.unsplash.com/photo-1549371156-49e1985e8ff6?w=500',
    category: 'gaver',
    inStock: true,
    isNew: true
  },
  {
    id: 'g4',
    name: 'Keramik Krus Sæt',
    brand: 'Klarborg',
    price: 299.95,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500',
    category: 'gaver',
    inStock: true,
    isNew: false
  },
  {
    id: 'g5',
    name: 'Uldtørklæde - Sort',
    brand: 'Black Colour',
    price: 149.00,
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=500',
    category: 'gaver',
    inStock: true,
    isNew: false
  },
  {
    id: 'g6',
    name: 'Kogebog - Nordisk Mad',
    brand: 'New Mags',
    price: 249.95,
    image: 'https://images.unsplash.com/photo-1600032676726-f0d423bc0b61?w=500',
    category: 'gaver',
    inStock: true,
    isNew: true
  },
  {
    id: 'g7',
    name: 'Lakrids Julekalender',
    brand: 'Lakrids by Bülow',
    price: 549.00,
    image: 'https://images.unsplash.com/photo-1544048485-0279482edd99?w=500',
    category: 'gaver',
    inStock: true,
    isNew: false
  }
];

export const allProducts = [...julepyntProducts, ...gaverProducts];
