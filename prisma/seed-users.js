const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding users...');

  // Hash passwords
  const adminPassword = await bcrypt.hash('admin123', 12);
  const customerPassword = await bcrypt.hash('customer123', 12);

  // Create Admin User
  const admin = await prisma.user.upsert({
    where: { email: 'admin@timelessluxury.com' },
    update: {},
    create: {
      email: 'admin@timelessluxury.com',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
      emailVerified: true,
    },
  });

  console.log('Created admin user:', admin.email);

  // Create Customer User
  const customer = await prisma.user.upsert({
    where: { email: 'customer@example.com' },
    update: {},
    create: {
      email: 'customer@example.com',
      password: customerPassword,
      firstName: 'Test',
      lastName: 'Customer',
      role: 'CUSTOMER',
      emailVerified: true,
    },
  });

  console.log('Created customer user:', customer.email);

  console.log('\n===========================================');
  console.log('✅ User seeding completed!');
  console.log('===========================================');
  console.log('\nLogin Credentials:');
  console.log('\n📧 ADMIN:');
  console.log('   Email: admin@timelessluxury.com');
  console.log('   Password: admin123');
  console.log('\n📧 CUSTOMER:');
  console.log('   Email: customer@example.com');
  console.log('   Password: customer123');
  console.log('===========================================\n');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
