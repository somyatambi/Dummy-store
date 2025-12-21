import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const homeDecorProducts = [
  {
    name: 'Vintage Brass Peacock Showpiece',
    slug: 'vintage-brass-peacock',
    sku: 'HD-001',
    description: 'Exquisite handcrafted brass peacock with intricate feather detailing. Perfect centerpiece for your living room.',
    story: 'This magnificent brass peacock is handcrafted by skilled artisans using traditional techniques passed down through generations. Each feather is meticulously carved to create a stunning display piece.',
    price: 8999,
    compareAtPrice: 12999,
    stockQuantity: 15,
    category: 'Showpieces',
    images: [
      'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800',
      'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&crop=entropy',
    ],
    featured: true,
    metaTitle: 'Vintage Brass Peacock Showpiece - Handcrafted Home Decor',
    metaDescription: 'Beautiful handcrafted brass peacock showpiece for elegant home decoration',
  },
  {
    name: 'Crystal Buddha Meditation Statue',
    slug: 'crystal-buddha-statue',
    sku: 'HD-002',
    description: 'Serene crystal Buddha statue for meditation space. Brings peace and positive energy to your home.',
    story: 'Carved from high-quality crystal, this Buddha statue radiates tranquility. Perfect for meditation rooms, living spaces, or as a thoughtful gift for spiritual seekers.',
    price: 5499,
    compareAtPrice: 7999,
    stockQuantity: 20,
    category: 'Spiritual Decor',
    images: [
      'https://images.unsplash.com/photo-1602524206684-cfbb0febfbbb?w=800',
      'https://images.unsplash.com/photo-1602524206684-cfbb0febfbbb?w=800&crop=entropy',
    ],
    featured: true,
    metaTitle: 'Crystal Buddha Meditation Statue - Peace & Serenity',
    metaDescription: 'Beautiful crystal Buddha statue for meditation and spiritual decor',
  },
  {
    name: 'Handwoven Macrame Wall Hanging',
    slug: 'macrame-wall-hanging',
    sku: 'HD-003',
    description: 'Large bohemian macrame wall hanging. Adds texture and warmth to any room.',
    story: 'Each piece is handwoven by skilled artisans using premium cotton rope. The intricate knotting techniques create beautiful patterns that complement any interior style.',
    price: 3499,
    compareAtPrice: 4999,
    stockQuantity: 25,
    category: 'Wall Decor',
    images: [
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&crop=entropy',
    ],
    featured: false,
    metaTitle: 'Handwoven Macrame Wall Hanging - Bohemian Decor',
    metaDescription: 'Beautiful handwoven macrame wall art for modern home decor',
  },
  {
    name: 'Marble Elephant Family Showpiece',
    slug: 'marble-elephant-family',
    sku: 'HD-004',
    description: 'Set of 3 white marble elephant figurines. Symbol of good luck and prosperity.',
    story: 'Carved from pure white marble, this elephant family set represents strength, wisdom, and good fortune. A perfect addition to your home or office decor.',
    price: 6999,
    compareAtPrice: 9499,
    stockQuantity: 12,
    category: 'Showpieces',
    images: [
      'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=800',
      'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=800&crop=entropy',
    ],
    featured: true,
    metaTitle: 'Marble Elephant Family Showpiece - Good Luck Symbol',
    metaDescription: 'White marble elephant family figurines for prosperity and home decoration',
  },
  {
    name: 'Antique Wooden Wall Mirror',
    slug: 'antique-wooden-mirror',
    sku: 'HD-005',
    description: 'Vintage-style wooden framed mirror with carved details. Adds elegance to hallways and bedrooms.',
    story: 'This stunning mirror features an intricately carved wooden frame with antique finish. The craftsmanship reflects old-world charm while serving as a functional piece.',
    price: 11999,
    compareAtPrice: 15999,
    stockQuantity: 8,
    category: 'Wall Decor',
    images: [
      'https://images.unsplash.com/photo-1618220179428-22790b461013?w=800',
      'https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&crop=entropy',
    ],
    featured: false,
    metaTitle: 'Antique Wooden Wall Mirror - Vintage Home Decor',
    metaDescription: 'Beautifully carved antique wooden mirror for elegant interiors',
  },
  {
    name: 'Ceramic Floral Vase Set',
    slug: 'ceramic-floral-vase-set',
    sku: 'HD-006',
    description: 'Set of 3 handpainted ceramic vases. Perfect for fresh or dried flowers.',
    story: 'These elegant ceramic vases feature hand-painted floral motifs in soft pastel colors. Each piece is unique and adds a touch of sophistication to any space.',
    price: 4499,
    compareAtPrice: 6499,
    stockQuantity: 18,
    category: 'Vases & Planters',
    images: [
      'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800',
      'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&crop=entropy',
    ],
    featured: true,
    metaTitle: 'Ceramic Floral Vase Set - Handpainted Home Decor',
    metaDescription: 'Beautiful handpainted ceramic vase set for flowers and home decoration',
  },
  {
    name: 'Gold Ganesh Wall Hanging',
    slug: 'gold-ganesh-wall-hanging',
    sku: 'HD-007',
    description: 'Brass Ganesh wall hanging with gold finish. Brings blessings and positive energy.',
    story: 'This beautiful Lord Ganesh wall hanging is crafted from brass with an elegant gold finish. A symbol of wisdom and prosperity, perfect for your home entrance or prayer room.',
    price: 2999,
    compareAtPrice: 4499,
    stockQuantity: 30,
    category: 'Spiritual Decor',
    images: [
      'https://images.unsplash.com/photo-1580377968169-a4a5b4d56576?w=800',
      'https://images.unsplash.com/photo-1580377968169-a4a5b4d56576?w=800&crop=entropy',
    ],
    featured: false,
    metaTitle: 'Gold Ganesh Wall Hanging - Spiritual Home Decor',
    metaDescription: 'Brass Ganesh wall hanging with gold finish for blessings and prosperity',
  },
  {
    name: 'Luxury Scented Candle Set',
    slug: 'luxury-candle-set',
    sku: 'HD-008',
    description: 'Set of 3 premium scented candles in decorative jars. Lavender, Vanilla, and Sandalwood fragrances.',
    story: 'Hand-poured with natural soy wax and premium fragrances, these candles create a relaxing ambiance. Presented in beautiful glass jars that double as decor pieces.',
    price: 1999,
    compareAtPrice: 2999,
    stockQuantity: 35,
    category: 'Candles & Fragrance',
    images: [
      'https://images.unsplash.com/photo-1602874801006-96928944fb1a?w=800',
      'https://images.unsplash.com/photo-1602874801006-96928944fb1a?w=800&crop=entropy',
    ],
    featured: true,
    metaTitle: 'Luxury Scented Candle Set - Premium Home Fragrance',
    metaDescription: 'Premium scented candle set with natural fragrances for home ambiance',
  },
];

async function main() {
  console.log('🗑️  Deleting existing products...');
  
  // Delete all existing products
  await prisma.product.deleteMany({});
  console.log('✅ All existing products deleted');

  console.log('\n🏠 Adding new home decor products...');
  
  for (const product of homeDecorProducts) {
    const created = await prisma.product.create({
      data: product,
    });
    console.log(`✅ Created: ${created.name} - ₹${created.price}`);
  }

  console.log('\n🎉 Successfully added all home decor products!');
  console.log(`📦 Total products: ${homeDecorProducts.length}`);
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
