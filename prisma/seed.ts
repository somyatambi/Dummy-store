import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@timelessluxury.com' },
    update: {},
    create: {
      email: 'admin@timelessluxury.com',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: UserRole.ADMIN,
      emailVerified: true,
    },
  });
  console.log('✅ Admin user created:', admin.email);

  // Create test customer
  const customerPassword = await bcrypt.hash('customer123', 12);
  const customer = await prisma.user.upsert({
    where: { email: 'customer@example.com' },
    update: {},
    create: {
      email: 'customer@example.com',
      password: customerPassword,
      firstName: 'John',
      lastName: 'Doe',
      role: UserRole.CUSTOMER,
      emailVerified: true,
    },
  });
  console.log('✅ Customer user created:', customer.email);

  // Sample luxury products
  const products = [
    {
      name: 'Ancient Roman Bronze Bust',
      slug: 'ancient-roman-bronze-bust',
      story: 'Discovered in the ruins of Pompeii, this exquisite bronze bust dates back to the 1st century AD. The remarkable preservation showcases the mastery of Roman artisans, with intricate details that have survived millennia. Each line and contour tells the story of an empire at its zenith.',
      description: 'A museum-quality replica of an authentic Roman bronze bust, crafted using traditional lost-wax casting methods. This piece embodies the timeless elegance of classical antiquity.',
      price: 12500.00,
      compareAtPrice: 15000.00,
      images: [
        'https://images.unsplash.com/photo-1578320339396-c2e6d3c25753?w=800',
        'https://images.unsplash.com/photo-1582561833595-27b68a2b65e9?w=800',
        'https://images.unsplash.com/photo-1574706671835-4b8b9c5b7bff?w=800',
      ],
      materials: ['Bronze', 'Patina Finish'],
      dimensions: '18 x 12 x 10 inches',
      weight: '15 lbs',
      stockQuantity: 3,
      sku: 'RB-001-BRZ',
      featured: true,
    },
    {
      name: 'Ming Dynasty Celadon Vase',
      slug: 'ming-dynasty-celadon-vase',
      story: 'This extraordinary celadon vase exemplifies the pinnacle of Ming Dynasty craftsmanship. The jade-green glaze, achieved through careful kiln control and iron oxide, creates a luminous surface that has captivated collectors for centuries. Its elegant form reflects the philosophical harmony central to Chinese aesthetic tradition.',
      description: 'An authenticated Ming Dynasty-style celadon vase featuring the characteristic crackle glaze and refined proportions that define this celebrated period.',
      price: 28000.00,
      images: [
        'https://images.unsplash.com/photo-1610701957780-ddb8c4e87be4?w=800',
        'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800',
      ],
      materials: ['Porcelain', 'Celadon Glaze'],
      dimensions: '14 x 8 x 8 inches',
      weight: '8 lbs',
      stockQuantity: 1,
      sku: 'MD-002-CEL',
      featured: true,
    },
    {
      name: 'Art Deco Marble Sculpture',
      slug: 'art-deco-marble-sculpture',
      story: 'Embodying the geometric elegance of the Art Deco movement, this Carrara marble sculpture captures the optimism and modernity of the 1920s. The artist\'s bold interpretation of human form, combined with the pristine white marble, creates a timeless piece that bridges classical technique with modernist vision.',
      description: 'Hand-carved from premium Carrara marble, this Art Deco sculpture showcases the period\'s distinctive style with clean lines and dynamic composition.',
      price: 19500.00,
      images: [
        'https://images.unsplash.com/photo-1580626345727-c628f78b8cf2?w=800',
        'https://images.unsplash.com/photo-1561209590-b9e8209d2e86?w=800',
        'https://images.unsplash.com/photo-1577083862631-8bb8e6c7e9ed?w=800',
      ],
      materials: ['Carrara Marble', 'Bronze Base'],
      dimensions: '24 x 10 x 8 inches',
      weight: '35 lbs',
      stockQuantity: 2,
      sku: 'AD-003-MAR',
      featured: true,
    },
    {
      name: 'Egyptian Revival Gold Necklace',
      slug: 'egyptian-revival-gold-necklace',
      story: 'Inspired by the treasures of Tutankhamun, this opulent necklace captures the grandeur of ancient Egypt. Master jewelers have recreated the intricate hieroglyphic patterns and symbolic motifs using 18K gold and semi-precious stones, creating a wearable piece of art that connects the modern wearer to an ancient civilization.',
      description: 'A magnificent 18K gold necklace featuring authentic Egyptian-inspired design elements, semi-precious stones, and museum-quality craftsmanship.',
      price: 45000.00,
      images: [
        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
        'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800',
      ],
      materials: ['18K Gold', 'Lapis Lazuli', 'Carnelian', 'Turquoise'],
      dimensions: '16 inch chain, 3 inch pendant',
      weight: '120 grams',
      stockQuantity: 1,
      sku: 'ER-004-GLD',
      featured: true,
    },
    {
      name: 'Renaissance Bronze Candlestick Pair',
      slug: 'renaissance-bronze-candlestick-pair',
      story: 'These magnificent candlesticks echo the grandeur of Italian Renaissance palazzos. Cast in bronze using centuries-old techniques, their elaborate baroque details and perfect symmetry represent the period\'s mastery of decorative arts. Once gracing the halls of European nobility, pieces like these illuminated the great masterworks of the era.',
      description: 'A matched pair of Renaissance-style bronze candlesticks featuring intricate relief work and a rich patina that develops character over time.',
      price: 8900.00,
      images: [
        'https://images.unsplash.com/photo-1565191999001-551c187427bb?w=800',
        'https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?w=800',
      ],
      materials: ['Bronze', 'Hand-rubbed Patina'],
      dimensions: '18 x 6 x 6 inches each',
      weight: '12 lbs per piece',
      stockQuantity: 4,
      sku: 'RN-005-BRZ',
      featured: false,
    },
    {
      name: 'Japanese Edo Period Lacquer Box',
      slug: 'japanese-edo-period-lacquer-box',
      story: 'This exquisite lacquerware box showcases the refined aesthetic of Edo period Japan. Created through the application of dozens of layers of natural urushi lacquer, each hand-polished to perfection, the box displays masterful maki-e gold dust decoration depicting cherry blossoms and flowing water—symbols of transience and eternity.',
      description: 'An authentic Edo period-style lacquer box featuring traditional maki-e gold decoration and multiple compartments for precious items.',
      price: 6750.00,
      images: [
        'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=800',
      ],
      materials: ['Natural Urushi Lacquer', 'Gold Maki-e', 'Paulownia Wood'],
      dimensions: '8 x 6 x 4 inches',
      weight: '2 lbs',
      stockQuantity: 2,
      sku: 'JP-006-LAC',
      featured: false,
    },
    {
      name: 'Greek Amphora with Mythological Scene',
      slug: 'greek-amphora-mythological-scene',
      story: 'This stunning amphora captures the artistry of ancient Greek pottery, featuring a meticulously painted mythological scene in the red-figure technique. The narrative depicts Athena and Poseidon\'s contest for Athens, rendered with the dynamic composition and attention to anatomical detail that defined Classical Greek art.',
      description: 'Museum-quality reproduction of a Greek amphora with hand-painted mythological scenes using traditional red-figure pottery techniques.',
      price: 15800.00,
      images: [
        'https://images.unsplash.com/photo-1580274472058-7b87faa0da8e?w=800',
        'https://images.unsplash.com/photo-1571943461950-794f53da3f24?w=800',
      ],
      materials: ['Terracotta', 'Natural Pigments', 'Glaze'],
      dimensions: '22 x 14 x 14 inches',
      weight: '18 lbs',
      stockQuantity: 2,
      sku: 'GR-007-AMP',
      featured: false,
    },
    {
      name: 'Victorian Sterling Silver Tea Service',
      slug: 'victorian-sterling-silver-tea-service',
      story: 'This magnificent tea service embodies the refinement of Victorian-era craftsmanship. Each piece bears the hallmarks of master silversmiths, with elaborate floral engravings and perfectly balanced proportions. Such services were the centerpiece of aristocratic social gatherings, where the ritual of tea became an art form.',
      description: 'Complete five-piece sterling silver tea service including teapot, coffee pot, sugar bowl, creamer, and waste bowl with ornate Victorian decoration.',
      price: 22000.00,
      compareAtPrice: 26000.00,
      images: [
        'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800',
      ],
      materials: ['Sterling Silver .925', 'Ebony Handles'],
      dimensions: 'Teapot: 10 x 8 x 6 inches',
      weight: '95 oz total weight',
      stockQuantity: 1,
      sku: 'VT-008-SLV',
      featured: true,
    },
    {
      name: 'Royal Indian Brass Elephant Sculpture',
      slug: 'royal-indian-brass-elephant-sculpture',
      story: 'This magnificent brass elephant embodies centuries of Indian artistic tradition, where elephants symbolize wisdom, strength, and royal power. Crafted by master artisans using traditional lost-wax casting techniques passed down through generations, every intricate detail—from the ornate saddle cloth to the delicate trunk curl—tells a story of regal splendor. In Indian culture, the elephant is revered as a sacred creature, associated with Lord Ganesha, the remover of obstacles and patron of arts and sciences. This piece captures that divine essence, featuring elaborate floral and geometric patterns hand-etched into the metal, creating a mesmerizing play of light and shadow. The rich golden-bronze patina develops character over time, making each piece truly unique.',
      description: 'An exquisite hand-crafted brass elephant sculpture featuring intricate traditional Indian motifs, ornate saddle cloth design, and masterful detailing. Perfect as a centerpiece or decorative accent that brings prosperity and positive energy to any space.',
      category: 'Showpieces',
      price: 8500.00,
      compareAtPrice: 10500.00,
      images: [
        '/images/products/elephant-1.jpg',
        '/images/products/elephant-2.jpg',
      ],
      materials: ['Solid Brass', 'Hand-applied Patina', 'Traditional Lost-wax Casting'],
      dimensions: '10 x 7 x 5 inches',
      weight: '4.5 lbs',
      stockQuantity: 3,
      sku: 'IN-009-BRS',
      featured: true,
    },
    {
      name: 'Antique Meditation Buddha Brass Statue',
      slug: 'antique-meditation-buddha-brass-statue',
      story: 'This serene Buddha statue represents the pinnacle of Buddhist artistic expression, capturing the moment of deep meditation and enlightenment. Crafted in the classical Bhumisparsha Mudra pose—where Buddha touches the earth, calling it to witness his awakening—this piece embodies tranquility and spiritual wisdom. The intricate detailing of the robes reveals skilled craftsmanship, with each fold and curve meticulously rendered to create a sense of flowing fabric frozen in time. The Buddha sits upon an ornate pedestal featuring traditional lotus motifs and sacred geometric patterns that represent the unfolding of spiritual consciousness. The aged brass finish, with its beautiful patina, gives this piece an authentic antique appearance, as if it has been passed down through temple collections for generations. The serene expression on Buddha\'s face, combined with the perfectly balanced proportions following ancient iconographic traditions, makes this more than mere decoration—it is a meditation tool, a focal point for contemplation and inner peace.',
      description: 'A museum-quality brass Buddha statue in meditation pose, featuring exquisite hand-carved details, traditional iconography, and an ornate decorative base. The antique patina finish and masterful craftsmanship make this piece perfect for meditation spaces, home altars, or as a statement of refined taste.',
      category: 'Showpieces',
      price: 12800.00,
      compareAtPrice: 15000.00,
      images: [
        '/images/products/buddha-1.jpg',
        '/images/products/buddha-2.jpg',
      ],
      materials: ['Solid Brass', 'Hand-carved Details', 'Antique Patina Finish'],
      dimensions: '16 x 10 x 8 inches (with base)',
      weight: '8.2 lbs',
      stockQuantity: 2,
      sku: 'BD-010-BRS',
      featured: true,
    },
  ];

  console.log('📦 Creating products...');
  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    });
    console.log(`  ✅ Created: ${product.name}`);
  }

  console.log('\n🎉 Seed completed successfully!');
  console.log('\n📝 Test credentials:');
  console.log('   Admin: admin@timelessluxury.com / admin123');
  console.log('   Customer: customer@example.com / customer123');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
