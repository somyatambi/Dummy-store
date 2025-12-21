# Timeless Luxury - Setup Guide

## Quick Start (5 minutes)

### 1. Install Dependencies
```powershell
npm install
```

### 2. Set Up Environment Variables
```powershell
cp .env.example .env.local
```

Edit `.env.local` and add your credentials:
- Database URL (PostgreSQL)
- NextAuth secret (generate with: `openssl rand -base64 32`)
- Payment keys (from Payment Dashboard)
- AWS S3 credentials (from AWS Console)
- Email SMTP settings

### 3. Set Up Database
```powershell
# Start PostgreSQL (if using Docker)
docker-compose up -d postgres

# Run migrations
npx prisma migrate dev

# Seed database with sample products
npm run db:seed
```

### 4. Start Development Server
```powershell
npm run dev
```

Open http://localhost:3000

## Default Credentials

After seeding:
- **Admin**: admin@timelessluxury.com / admin123
- **Customer**: customer@example.com / customer123

## Key Features Implemented

### ✅ Frontend
- Full-screen hero with overlay
- Masonry grid featured products
- Responsive navigation with cart badge
- Product listing and detail pages
- Shopping cart functionality
- Checkout flow with Payment
- User authentication (login/register)
- Account dashboard
- Order history
- Admin panel

### ✅ Backend
- RESTful API routes
- NextAuth.js authentication
- Prisma ORM with PostgreSQL
- Payment integration
- Payment webhook handling
- Email notifications
- AWS S3 image uploads
- Input validation with Zod
- Rate limiting
- Error tracking with Sentry

### ✅ Security
- Password hashing (bcrypt)
- JWT tokens
- Email verification
- CORS configuration
- Security headers (Helmet)
- Input validation
- SQL injection prevention
- XSS protection

### ✅ DevOps
- Docker configuration
- GitHub Actions CI/CD
- Vercel deployment config
- Environment-based configuration

## Project Structure

```
luxury-articles/
├── src/
│   ├── app/                    # Next.js 14 App Router
│   │   ├── (shop)/            # Public shop pages
│   │   ├── (auth)/            # Auth pages
│   │   ├── admin/             # Admin dashboard
│   │   ├── api/               # API routes
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Homepage
│   ├── components/
│   │   ├── layout/           # Header, Footer
│   │   ├── home/             # Hero, Featured
│   │   ├── product/          # Product cards, details
│   │   ├── cart/             # Cart components
│   │   ├── admin/            # Admin components
│   │   └── ui/               # Reusable UI components
│   ├── lib/                  # Utilities
│   │   ├── db.ts            # Prisma client
│   │   ├── auth.ts          # Auth helpers
│   │   ├── Payment.ts        # Payment client
│   │   ├── s3.ts            # AWS S3 client
│   │   ├── email.ts         # Email service
│   │   ├── validation.ts    # Zod schemas
│   │   └── utils.ts         # Helpers
│   ├── hooks/               # React hooks
│   └── styles/              # Global styles
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── seed.ts             # Seed script
├── public/                 # Static assets
└── tests/                  # Test files
```

## Development Workflow

### Running Tests
```powershell
npm test
npm run test:watch
npm run test:coverage
```

### Database Commands
```powershell
# View database in browser
npm run db:studio

# Create new migration
npx prisma migrate dev --name your-migration-name

# Reset database
npx prisma migrate reset

# Re-seed database
npm run db:seed
```

### Code Quality
```powershell
# Lint code
npm run lint

# Format code
npm run format
```

## API Endpoints

### Public
- `GET /api/products` - List products
- `GET /api/products/[slug]` - Get product
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login (handled by NextAuth)

### Protected (requires authentication)
- `GET /api/cart` - Get cart
- `POST /api/cart/add` - Add to cart
- `PUT /api/cart/update/[id]` - Update cart item
- `DELETE /api/cart/remove/[id]` - Remove from cart
- `POST /api/checkout` - Create checkout
- `GET /api/orders` - List user orders
- `GET /api/orders/[id]` - Get order details

### Admin (requires ADMIN role)
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/[id]` - Update product
- `DELETE /api/admin/products/[id]` - Delete product
- `PUT /api/admin/orders/[id]` - Update order
- `POST /api/admin/upload` - Upload image

### Webhooks
- `POST /api/webhooks/Payment` - Payment events

## Environment Variables

### Required
```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="generate-random-string"
NEXTAUTH_URL="http://localhost:3000"
Payment_SECRET_KEY="sk_test_..."
Payment_PUBLISHABLE_KEY="pk_test_..."
Payment_WEBHOOK_SECRET="whsec_..."
```

### AWS S3
```env
AWS_ACCESS_KEY_ID="..."
AWS_SECRET_ACCESS_KEY="..."
AWS_REGION="us-east-1"
AWS_S3_BUCKET="timeless-luxury-images"
```

### Email
```env
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="app-password"
EMAIL_FROM="noreply@timelessluxury.com"
```

### Optional
```env
NEXT_PUBLIC_SENTRY_DSN="..."
NEXT_PUBLIC_GA_ID="G-..."
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

Vercel will automatically:
- Build the Next.js app
- Run database migrations
- Deploy to production

### Docker

```powershell
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## Payment Setup

1. Create account at https://Payment.com
2. Get API keys from Dashboard > Developers > API keys
3. Set up webhook endpoint:
   - URL: https://your-domain.com/api/webhooks/Payment
   - Events: `payment_intent.succeeded`, `payment_intent.payment_failed`
4. Copy webhook signing secret to `.env.local`

## AWS S3 Setup

1. Create S3 bucket
2. Set bucket policy for public read access
3. Create IAM user with S3 permissions
4. Add access keys to `.env.local`

Alternative: Use Cloudinary (easier setup)

## Common Issues

### Database Connection Error
```powershell
# Check PostgreSQL is running
docker-compose ps

# Restart database
docker-compose restart postgres
```

### Module Not Found Errors
```powershell
# Clear cache and reinstall
rm -rf node_modules .next
npm install
```

### Port Already in Use
```powershell
# Change port in package.json dev script
"dev": "next dev -p 3001"
```

## Next Steps

1. **Customize Design**: Update colors in `tailwind.config.js`
2. **Add More Products**: Use admin panel or seed script
3. **Configure Email**: Set up SMTP for order confirmations
4. **Set Up Payment**: Add your Payment keys for payments
5. **Deploy**: Push to Vercel or your hosting provider
6. **Add Content**: Create About, Contact, FAQ pages
7. **SEO**: Add meta tags and sitemap
8. **Analytics**: Configure Google Analytics
9. **Monitoring**: Set up Sentry for error tracking

## Support

- Documentation: See README.md
- Issues: Check GitHub Issues
- Email: support@timelessluxury.com

## License

MIT License - See LICENSE file

---

Built with ❤️ using Next.js, React, Tailwind CSS, Prisma, and Payment
