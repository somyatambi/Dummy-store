const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding expanded home decor products...');

  // Delete existing products
  await prisma.product.deleteMany({});

  const products = [
    // Wall Hangings
    {
      name: 'Handwoven Macrame Wall Hanging',
      slug: 'handwoven-macrame-wall-hanging',
      category: 'Wall Hangings',
      description: 'Intricate handwoven macrame art piece featuring geometric patterns and natural cotton fibers.',
      story: 'Each macrame piece is carefully handwoven by skilled artisans using traditional knotting techniques passed down through generations.',
      price: 3499,
      compareAtPrice: 4999,
      images: [
        'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=800',
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800',
        'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=800',
      ],
      materials: ['Cotton', 'Wood'],
      dimensions: '24 x 36 inches',
      weight: '800g',
      stockQuantity: 25,
      featured: true,
      active: true,
    },
    {
      name: 'Mandala Metal Wall Art',
      slug: 'mandala-metal-wall-art',
      category: 'Wall Hangings',
      description: 'Exquisite laser-cut metal mandala design with antique gold finish.',
      story: 'Inspired by sacred geometry, this mandala brings harmony and positive energy to any space.',
      price: 6999,
      compareAtPrice: 8999,
      images: [
        'https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=800',
        'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800',
        'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=800',
      ],
      materials: ['Metal', 'Gold Finish'],
      dimensions: '30 x 30 inches',
      weight: '1.5kg',
      stockQuantity: 15,
      featured: true,
      active: true,
    },
    {
      name: 'Wooden Tribal Wall Mask',
      slug: 'wooden-tribal-wall-mask',
      category: 'Wall Hangings',
      description: 'Handcarved wooden tribal mask with ethnic patterns and natural finish.',
      story: 'Crafted by tribal artisans, each mask tells a unique story of ancient traditions.',
      price: 4999,
      images: [
        'https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=800',
        'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=800',
        'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800',
      ],
      materials: ['Teak Wood', 'Natural Wax'],
      dimensions: '18 x 12 inches',
      weight: '1.2kg',
      stockQuantity: 12,
      featured: true,
      active: true,
    },

    // Lamps
    {
      name: 'Himalayan Salt Crystal Lamp',
      slug: 'himalayan-salt-crystal-lamp',
      category: 'Lamps',
      description: 'Natural Himalayan salt crystal lamp with wooden base, creates warm ambient glow.',
      story: 'Hand-mined from the Himalayan mountains, believed to purify air and enhance mood.',
      price: 2999,
      compareAtPrice: 3999,
      images: [
        'https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=800',
        'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800',
        'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=800',
      ],
      materials: ['Himalayan Salt', 'Wood'],
      dimensions: '8 x 8 x 12 inches',
      weight: '3kg',
      stockQuantity: 30,
      featured: true,
      active: true,
    },
    {
      name: 'Moroccan Brass Table Lamp',
      slug: 'moroccan-brass-table-lamp',
      category: 'Lamps',
      description: 'Handcrafted brass lamp with intricate perforated patterns casting beautiful shadows.',
      story: 'Inspired by traditional Moroccan lanterns, each piece is individually crafted by artisans.',
      price: 8999,
      compareAtPrice: 11999,
      images: [
        'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800',
        'https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=800',
        'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800',
      ],
      materials: ['Brass', 'Glass'],
      dimensions: '10 x 10 x 18 inches',
      weight: '2kg',
      stockQuantity: 18,
      featured: true,
      active: true,
    },

    // Vases & Planters
    {
      name: 'Ceramic Vase Set - Nordic Style',
      slug: 'ceramic-vase-set-nordic',
      category: 'Vases & Planters',
      description: 'Set of 3 minimalist ceramic vases with matte glaze finish in neutral tones.',
      story: 'Inspired by Scandinavian design philosophy, these vases blend form and function beautifully.',
      price: 4499,
      compareAtPrice: 5999,
      images: [
        'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800',
        'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800',
        'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=800',
      ],
      materials: ['Ceramic', 'Matte Glaze'],
      dimensions: 'Small: 6", Medium: 8", Large: 10" height',
      weight: '2.5kg (set)',
      stockQuantity: 22,
      featured: true,
      active: true,
    },
    {
      name: 'Terracotta Planter with Stand',
      slug: 'terracotta-planter-with-stand',
      category: 'Vases & Planters',
      description: 'Handmade terracotta planter with modern geometric metal stand.',
      story: 'Combines traditional pottery techniques with contemporary design aesthetics.',
      price: 3999,
      images: [
        'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800',
        'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800',
        'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800',
      ],
      materials: ['Terracotta', 'Metal'],
      dimensions: '12 x 12 x 16 inches',
      weight: '3kg',
      stockQuantity: 28,
      featured: true,
      active: true,
    },

    // Showpieces & Figurines
    {
      name: 'Brass Peacock Showpiece',
      slug: 'brass-peacock-showpiece',
      category: 'Showpieces',
      description: 'Majestic brass peacock with intricate feather detailing and antique patina finish.',
      story: 'Symbol of grace and beauty, handcrafted using traditional lost-wax casting technique.',
      price: 8999,
      compareAtPrice: 12999,
      images: [
        'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800',
        'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800',
        'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800',
      ],
      materials: ['Brass', 'Antique Finish'],
      dimensions: '15 x 8 x 18 inches',
      weight: '2.5kg',
      stockQuantity: 10,
      featured: true,
      active: true,
    },
    {
      name: 'Buddha Meditation Statue',
      slug: 'buddha-meditation-statue',
      category: 'Showpieces',
      description: 'Serene Buddha statue in meditation pose with stone finish.',
      story: 'Brings peace and positive energy. Handcrafted by skilled artisans with attention to detail.',
      price: 5499,
      compareAtPrice: 7999,
      images: [
        'https://images.unsplash.com/photo-1545972154-9bb223aac798?w=800',
        'https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=800',
        'https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=800',
      ],
      materials: ['Resin', 'Stone Finish'],
      dimensions: '10 x 8 x 14 inches',
      weight: '2kg',
      stockQuantity: 20,
      featured: true,
      active: true,
    },
    {
      name: 'Marble Elephant Pair',
      slug: 'marble-elephant-pair',
      category: 'Showpieces',
      description: 'Pair of intricately carved marble elephants symbolizing prosperity and good fortune.',
      story: 'Carved from pure white marble, these elephants represent strength and wisdom.',
      price: 6999,
      compareAtPrice: 9999,
      images: [
        'https://images.unsplash.com/photo-1587582423116-ec07293f0395?w=800',
        'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800',
        'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800',
      ],
      materials: ['Marble', 'Hand Carved'],
      dimensions: '8 x 5 x 6 inches each',
      weight: '3kg (pair)',
      stockQuantity: 14,
      featured: true,
      active: true,
    },
    {
      name: 'Gold Ganesh Wall Art',
      slug: 'gold-ganesh-wall-art',
      category: 'Showpieces',
      description: 'Elegant Ganesh wall art with intricate gold detailing and traditional motifs.',
      story: 'Lord Ganesh, the remover of obstacles, crafted with devotion and precision.',
      price: 2999,
      images: [
        'https://m.media-amazon.com/images/I/71i7FsNO+dL._AC_UL480_FMwebp_QL65_.jpg',
        'https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=800',
        'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800',
      ],
      materials: ['Metal', 'Gold Plating'],
      dimensions: '12 x 12 inches',
      weight: '800g',
      stockQuantity: 35,
      featured: true,
      active: true,
    },

    // Candle Holders
    {
      name: 'Luxury Aromatherapy Candle Set',
      slug: 'luxury-aromatherapy-candle-set',
      category: 'Candles & Holders',
      description: 'Set of 3 premium scented candles in decorative ceramic holders.',
      story: 'Infused with natural essential oils for a luxurious aromatherapy experience.',
      price: 1999,
      compareAtPrice: 2999,
      images: [
        'https://images.unsplash.com/photo-1602874801006-e3d97621f9af?w=800',
        'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800',
        'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800',
      ],
      materials: ['Soy Wax', 'Ceramic', 'Essential Oils'],
      dimensions: '3.5 x 3.5 x 4 inches each',
      weight: '1kg (set)',
      stockQuantity: 40,
      featured: true,
      active: true,
    },
    {
      name: 'Brass Hurricane Candle Holder',
      slug: 'brass-hurricane-candle-holder',
      category: 'Candles & Holders',
      description: 'Vintage-style brass hurricane lamp with glass chimney for elegant candle display.',
      story: 'Timeless design that adds warmth and sophistication to any setting.',
      price: 4999,
      images: [
        'https://images.unsplash.com/photo-1602874801006-e3d97621f9af?w=800',
        'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800',
        'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800',
      ],
      materials: ['Brass', 'Glass'],
      dimensions: '8 x 8 x 20 inches',
      weight: '1.5kg',
      stockQuantity: 16,
      featured: true,
      active: true,
    },

    // Photo Frames & Mirrors
    {
      name: 'Carved Wooden Mirror Frame',
      slug: 'carved-wooden-mirror-frame',
      category: 'Mirrors & Frames',
      description: 'Ornate hand-carved wooden mirror with vintage floral motifs.',
      story: 'Each frame is uniquely carved by master craftsmen, making it a true work of art.',
      price: 11999,
      compareAtPrice: 15999,
      images: [
        'https://images.unsplash.com/photo-1618220179428-22790b461013?w=800',
        'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800',
        'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800',
      ],
      materials: ['Sheesham Wood', 'Mirror Glass'],
      dimensions: '36 x 24 inches',
      weight: '4.5kg',
      stockQuantity: 8,
      featured: true,
      active: true,
    },
    {
      name: 'Antique Brass Photo Frame Set',
      slug: 'antique-brass-photo-frame-set',
      category: 'Mirrors & Frames',
      description: 'Set of 3 vintage-style brass photo frames with ornate detailing.',
      story: 'Perfect for displaying cherished memories with classic elegance.',
      price: 3499,
      images: [
        'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=800',
        'https://images.unsplash.com/photo-1618220179428-22790b461013?w=800',
        'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800',
      ],
      materials: ['Brass', 'Glass'],
      dimensions: '4x6", 5x7", 8x10"',
      weight: '1.8kg (set)',
      stockQuantity: 24,
      featured: true,
      active: true,
    },

    // Clocks
    {
      name: 'Vintage Wall Clock - Industrial',
      slug: 'vintage-wall-clock-industrial',
      category: 'Clocks',
      description: 'Large industrial-style wall clock with Roman numerals and metal frame.',
      story: 'Inspired by vintage railway station clocks, adds character to any space.',
      price: 7999,
      images: [
        'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=800',
        'https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=800',
        'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=800',
      ],
      materials: ['Metal', 'Glass'],
      dimensions: '24 x 24 x 3 inches',
      weight: '2.2kg',
      stockQuantity: 12,
      featured: true,
      active: true,
    },

    // Storage & Organization
    {
      name: 'Handwoven Jute Storage Baskets',
      slug: 'handwoven-jute-storage-baskets',
      category: 'Storage & Organization',
      description: 'Set of 3 natural jute baskets with leather handles for stylish storage.',
      story: 'Eco-friendly and versatile, handwoven by rural artisan communities.',
      price: 2499,
      images: [
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800',
        'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=800',
        'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800',
      ],
      materials: ['Jute', 'Leather'],
      dimensions: 'Small: 8", Medium: 10", Large: 12" diameter',
      weight: '1.5kg (set)',
      stockQuantity: 30,
      featured: true,
      active: true,
    },

    // Tabletop Decor
    {
      name: 'Crystal Geode Bookends',
      slug: 'crystal-geode-bookends',
      category: 'Tabletop Decor',
      description: 'Natural agate geode bookends with stunning crystal formations.',
      story: 'Each pair is unique, showcasing nature\'s artistry in mineral formation.',
      price: 9999,
      compareAtPrice: 12999,
      images: [
        'https://images.unsplash.com/photo-1587582423116-ec07293f0395?w=800',
        'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800',
        'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800',
      ],
      materials: ['Agate', 'Crystal'],
      dimensions: '6 x 4 x 8 inches each',
      weight: '4kg (pair)',
      stockQuantity: 6,
      featured: true,
      active: true,
    },
    {
      name: 'Marble Serving Tray with Handles',
      slug: 'marble-serving-tray-handles',
      category: 'Tabletop Decor',
      description: 'Elegant white marble tray with brass handles, perfect for serving or display.',
      story: 'Combines functionality with luxury, ideal for entertaining in style.',
      price: 5999,
      images: [
        'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800',
        'https://images.unsplash.com/photo-1587582423116-ec07293f0395?w=800',
        'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800',
      ],
      materials: ['Marble', 'Brass'],
      dimensions: '16 x 12 x 2 inches',
      weight: '2.8kg',
      stockQuantity: 18,
      featured: true,
      active: true,
    },

    // Wind Chimes & Hangings
    {
      name: 'Bamboo Wind Chimes - Zen',
      slug: 'bamboo-wind-chimes-zen',
      category: 'Wind Chimes',
      description: 'Handcrafted bamboo wind chimes with soothing natural tones.',
      story: 'Creates peaceful melodies with gentle breezes, promoting relaxation.',
      price: 1799,
      images: [
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800',
        'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=800',
        'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=800',
      ],
      materials: ['Bamboo', 'Cotton Cord'],
      dimensions: '24 inches length',
      weight: '400g',
      stockQuantity: 32,
      featured: true,
      active: true,
    },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
    console.log(`Created product: ${product.name}`);
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
