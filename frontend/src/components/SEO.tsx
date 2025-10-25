import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = 'Christmas House | Nordisk Julepynt & Gaver',
  description = 'Mere end 10.000 gaveidéer. Levering indenfor 1-3 hverdage. Byt i alle vores butikker. Shop online hos Christmas House nu.',
  keywords = 'jule pynt, gaver, gaveideer, julepynt, christmas, dansk design, boligindretning, christmas house',
  image = 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=1200',
  url = 'https://nordic-christmas.preview.emergentagent.com',
  type = 'website'
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Christmas House" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#0f0f10" />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO;
