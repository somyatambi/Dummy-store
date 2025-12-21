# 🎯 QUICK START - Timeless Luxury E-commerce Platform

## ⚡ Installation (Copy & Paste)

Open PowerShell in the `d:\Luxury Articles` directory and run:

```powershell
# 1. Install all dependencies
npm install

# 2. Copy environment template
Copy-Item .env.example .env.local

# 3. Start PostgreSQL (using Docker)
docker-compose up -d postgres

# 4. Wait 10 seconds for PostgreSQL to start
Start-Sleep -Seconds 10

# 5. Generate Prisma Client
npx prisma generate

# 6. Run database migrations
npx prisma migrate dev --name init

# 7. Seed database with sample luxury products
npx tsx prisma/seed.ts

# 8. Start development server
npm run dev
```

## 🔐 Configure Environment Variables

Edit `.env.local` and update these required values:

```env
# Generate a secure secret (run this in PowerShell):
# -join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | % {[char]$_})

NEXTAUTH_SECRET="your-generated-secret-here"

# For Payment testing (get from https://dashboard.Payment.com/test/apikeys)
Payment_SECRET_KEY="sk_test_your_key"
Payment_PUBLISHABLE_KEY="pk_test_your_key"
NEXT_PUBLIC_Payment_PUBLISHABLE_KEY="pk_test_your_key"

# For AWS S3 (or use Cloudinary)
AWS_ACCESS_KEY_ID="your-key"
AWS_SECRET_ACCESS_KEY="your-secret"
AWS_S3_BUCKET="your-bucket-name"
```

## ✅ Verify Installation

1. Open http://localhost:3000
2. You should see the luxury homepage with hero image
3. Login with test credentials:
   - **Admin**: admin@timelessluxury.com / admin123
   - **Customer**: customer@example.com / customer123

## 📦 What's Included

### ✨ Frontend Features
- ✅ Full-screen hero with brand overlay
- ✅ Masonry grid for featured products
- ✅ Product detail pages with image gallery
- ✅ Shopping cart with real-time updates
- ✅ Payment checkout integration
- ✅ User authentication & registration
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Accessibility (WCAG 2.1 AA)

### 🛠️ Backend Features
- ✅ Next.js 14 App Router
- ✅ PostgreSQL + Prisma ORM
- ✅ NextAuth.js authentication
- ✅ RESTful API routes
- ✅ Payment processing
- ✅ Payment webhook handling
- ✅ Email notifications
- ✅ AWS S3 image uploads
- ✅ Input validation (Zod)
- ✅ Error tracking (Sentry ready)

### 🎨 Design System
- **Colors**: 
  - Primary: #111111 (Deep Black)
  - Secondary: #FDFBF5 (Warm Cream)
  - Accent: #D4AF37 (Metallic Gold)
- **Fonts**: 
  - Headings: Playfair Display (Serif)
  - Body: Lato (Sans-serif)
- **Layout**: Museum/gallery style with generous spacing

### 🔒 Security Features
- ✅ bcrypt password hashing (12 rounds)
- ✅ JWT tokens with secure cookies
- ✅ Email verification
- ✅ Input validation
- ✅ Rate limiting
- ✅ CORS configuration
- ✅ Security headers (Helmet)
- ✅ SQL injection prevention

### 📊 Database Models
- User (authentication, roles)
- Product (with images, materials, dimensions)
- Cart & CartItem
- Order & OrderItem
- Address (shipping/billing)

### 🚀 DevOps
- ✅ Docker & Docker Compose
- ✅ GitHub Actions CI/CD
- ✅ Vercel deployment config
- ✅ Environment-based configuration

## 📱 Sample Products

The seed script includes 8 premium products:
1. Ancient Roman Bronze Bust ($12,500)
2. Ming Dynasty Celadon Vase ($28,000)
3. Art Deco Marble Sculpture ($19,500)
4. Egyptian Revival Gold Necklace ($45,000)
5. Renaissance Bronze Candlestick Pair ($8,900)
6. Japanese Edo Period Lacquer Box ($6,750)
7. Greek Amphora with Mythological Scene ($15,800)
8. Victorian Sterling Silver Tea Service ($22,000)

## 🌐 API Endpoints

### Public
- `GET /api/products` - List products
- `GET /api/products/[slug]` - Get product details

### Protected
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add to cart
- `PUT /api/cart/update/[id]` - Update quantity
- `DELETE /api/cart/remove/[id]` - Remove item
- `POST /api/checkout` - Create checkout
- `GET /api/orders` - List orders

### Admin
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/[id]` - Update product
- `DELETE /api/admin/products/[id]` - Delete product
- `POST /api/admin/upload` - Upload images

## 🔧 Common Commands

```powershell
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run start           # Start production server

# Database
npm run db:studio       # Open Prisma Studio
npm run db:seed         # Re-seed database
npx prisma migrate dev  # Create new migration

# Code Quality
npm run lint            # Lint code
npm run format          # Format code
npm test               # Run tests
npm run test:coverage  # Test coverage

# Docker
docker-compose up -d    # Start all services
docker-compose down     # Stop all services
docker-compose logs -f  # View logs
```

## 🎯 Next Steps

1. **Configure Payment**
   - Sign up at https://Payment.com
   - Get test API keys
   - Add webhook endpoint

2. **Set Up Email**
   - Configure SMTP settings in `.env.local`
   - Test email verification

3. **Configure AWS S3** (or use Cloudinary)
   - Create S3 bucket
   - Set up IAM credentials
   - Or use Cloudinary for easier setup

4. **Customize**
   - Update brand colors in `tailwind.config.js`
   - Add your logo to `public/`
   - Customize hero image

5. **Deploy**
   - Push to GitHub
   - Import to Vercel
   - Add environment variables
   - Deploy!

## 📚 Documentation

- **README.md** - Overview and features
- **SETUP.md** - Detailed setup guide
- **TESTING.md** - Testing guide
- **CONTRIBUTING.md** - How to contribute

## 🆘 Troubleshooting

### Database Connection Error
```powershell
# Restart PostgreSQL
docker-compose restart postgres
```

### Port 3000 Already in Use
```powershell
# Use different port
npm run dev -- -p 3001
```

### Module Not Found
```powershell
# Clean install
Remove-Item -Recurse -Force node_modules, .next
npm install
```

## 📧 Support

- 📖 Documentation: See README.md and SETUP.md
- 🐛 Issues: Create GitHub issue
- 💬 Questions: Open discussion

---

## 🎉 You're All Set!

Your premium e-commerce platform is ready. Open http://localhost:3000 and start exploring!

Built with ❤️ using:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL
- Payment
- NextAuth.js

**Enjoy building your luxury artifact store! 🏛️✨**
