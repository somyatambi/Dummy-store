// Shared constants across the application

export const PRODUCT_CATEGORIES = [
  'Wall Hangings',
  'Lamps',
  'Vases & Planters',
  'Showpieces',
  'Candles & Holders',
  'Mirrors & Frames',
  'Clocks',
  'Storage & Organization',
  'Tabletop Decor',
  'Wind Chimes',
] as const;

export type ProductCategory = typeof PRODUCT_CATEGORIES[number];
