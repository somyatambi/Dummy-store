# 📋 MANUAL INSTALLATION STEPS

Follow these steps to manually install and set up the Timeless Luxury e-commerce platform.

## Prerequisites

Before you begin, ensure you have:
- ✅ Node.js 18+ installed
- ✅ PostgreSQL 14+ installed (or Docker)
- ✅ Git installed
- ✅ A code editor (VS Code recommended)

## Step-by-Step Installation

### Step 1: Install Dependencies (2-3 minutes)

Open PowerShell in the project directory and run:

```powershell
npm install
```

This will install all required packages including:
- Next.js 14
- React 18
- Tailwind CSS
- Prisma
- Stripe
- NextAuth.js
- and 40+ other dependencies

**Expected output**: "added XXX packages" and no errors

---

### Step 2: Configure Environment Variables (2 minutes)

1. Copy the environment template:
```powershell
Copy-Item .env.example .env.local
```

2. Open `.env.local` in your editor

3. **Required configurations**:

#### Generate NextAuth Secret
Run this in PowerShell to generate a secure secret:
```powershell
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | % {[char]$_})
```

Copy the output and paste it in `.env.local`:
```env
NEXTAUTH_SECRET="your-generated-secret-here"
```

#### Database URL (if using Docker)
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/timeless_luxury?schema=public"
```

#### Stripe Keys (for testing)
Sign up at https://stripe.com and get test keys:
```env
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

#### Optional (can configure later)
- AWS S3 credentials
- Email SMTP settings
- Sentry DSN
- Google Analytics ID

---

### Step 3: Start PostgreSQL (1 minute)

#### Option A: Using Docker (Recommended)
```powershell
docker-compose up -d postgres
```

Wait 10-15 seconds for PostgreSQL to start.

#### Option B: Using Local PostgreSQL
Make sure PostgreSQL is running and update the `DATABASE_URL` in `.env.local`

---

### Step 4: Generate Prisma Client (30 seconds)

```powershell
npx prisma generate
```

This creates the TypeScript types for your database models.

**Expected output**: "Generated Prisma Client"

---

### Step 5: Run Database Migrations (30 seconds)

```powershell
npx prisma migrate dev --name init
```

This creates all the database tables:
- users
- products
- carts
- cart_items
- orders
- order_items
- addresses

**Expected output**: "Your database is now in sync with your schema"

---

### Step 6: Seed the Database (10 seconds)

```powershell
npx tsx prisma/seed.ts
```

This adds:
- 2 test users (admin + customer)
- 8 luxury products with full details

**Expected output**: 
```
🌱 Starting database seed...
✅ Admin user created: admin@timelessluxury.com
✅ Customer user created: customer@example.com
📦 Creating products...
  ✅ Created: Ancient Roman Bronze Bust
  ✅ Created: Ming Dynasty Celadon Vase
  ...
🎉 Seed completed successfully!
```

---

### Step 7: Start Development Server (10 seconds)

```powershell
npm run dev
```

**Expected output**:
```
▲ Next.js 14.x.x
- Local:        http://localhost:3000
- Ready in XXXms
```

---

## ✅ Verify Installation

1. Open your browser to **http://localhost:3000**

2. You should see:
   - A full-screen hero image with "Timeless Luxury" branding
   - Featured products in a masonry grid
   - Header with navigation and cart icon
   - Footer with links

3. Test login with credentials:
   - **Admin**: admin@timelessluxury.com / admin123
   - **Customer**: customer@example.com / customer123

4. Browse products and test cart functionality

---

## 🎯 Quick Commands Reference

```powershell
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run start           # Start production server

# Database
npm run db:studio       # Open Prisma Studio GUI
npm run db:seed         # Re-seed database
npx prisma migrate dev  # Create new migration
npx prisma migrate reset # Reset database

# Code Quality
npm run lint            # Check for code issues
npm run format          # Format code with Prettier
npm test               # Run tests

# Docker
docker-compose up -d    # Start all services
docker-compose down     # Stop services
docker-compose logs -f  # View logs
docker-compose ps       # Check status
```

---

## 🔧 Troubleshooting

### Problem: "Port 3000 is already in use"
**Solution**: Use a different port
```powershell
npm run dev -- -p 3001
```

### Problem: "Cannot connect to database"
**Solution**: Check PostgreSQL is running
```powershell
# If using Docker:
docker-compose ps
docker-compose restart postgres

# If using local PostgreSQL:
# Ensure PostgreSQL service is running
```

### Problem: "Module not found" errors
**Solution**: Clean install
```powershell
Remove-Item -Recurse -Force node_modules, .next
npm install
```

### Problem: Prisma errors
**Solution**: Regenerate client
```powershell
npx prisma generate
npx prisma migrate reset
npm run db:seed
```

### Problem: Slow npm install
**Solution**: Clear npm cache
```powershell
npm cache clean --force
npm install
```

---

## 📚 Next Steps After Installation

1. **Explore the codebase**
   - Check out `src/app/page.tsx` for homepage
   - Look at `src/components/` for UI components
   - Review `src/lib/` for utilities

2. **Customize the design**
   - Edit `tailwind.config.js` for colors
   - Update fonts in `src/app/layout.tsx`
   - Change hero image in `src/components/home/Hero.tsx`

3. **Add more products**
   - Use Prisma Studio: `npm run db:studio`
   - Or create via admin panel
   - Or edit `prisma/seed.ts`

4. **Configure Stripe**
   - Get API keys from https://dashboard.stripe.com
   - Add webhook endpoint in Stripe Dashboard
   - Test checkout flow

5. **Set up email**
   - Configure SMTP in `.env.local`
   - Test email verification
   - Test order confirmations

6. **Deploy to production**
   - Push code to GitHub
   - Import to Vercel
   - Add production environment variables
   - Deploy!

---

## 📞 Need Help?

- 📖 **Documentation**: See README.md, SETUP.md, QUICKSTART.md
- 🐛 **Issues**: Check common issues above
- 💬 **Questions**: Review code comments
- 📧 **Support**: Open GitHub issue

---

## ✨ You're Ready!

Your premium luxury e-commerce platform is now running locally.

**Time to explore and customize!** 🏛️✨

Happy coding!
