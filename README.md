# Timeless Luxury - Premium Artifact E-commerce Platform

## Brand Identity
- **Concept**: Timeless Luxury with Structured Elegance
- **Design Philosophy**: Museum/gallery-inspired minimal layout with generous spacing

## Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: Headless UI, Radix UI
- **Image Handling**: Next/Image with AWS S3/Cloudinary
- **State Management**: React Context + SWR

### Backend
- **API**: Next.js API Routes + Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: NextAuth.js with JWT
- **File Storage**: AWS S3 (configurable to Cloudinary)

### Security & Infrastructure
- **Password Hashing**: bcrypt (12 rounds)
- **Rate Limiting**: Custom implementation (in-memory)
- **CSRF Protection**: Token-based validation
- **Security Headers**: CSP, X-Frame-Options, HSTS
- **Session Management**: JWT with auto-refresh
- **Input Validation**: Zod schemas
- **Environment Validation**: Runtime checks

### DevOps
- **Containerization**: Docker & Docker Compose
- **Deployment**: Vercel (configured)
- **Testing**: Jest + React Testing Library

## Design System

### Colors
- **Primary**: #111111 (Deep Black)
- **Secondary**: #FDFBF5 (Warm Cream)
- **Accent**: #D4AF37 (Metallic Gold)

### Typography
- **Headings**: Playfair Display (Serif)
- **Body**: Lato (Sans-serif)

## Features

### Customer Features
- ✅ Full-screen hero with video/image support
- ✅ Featured products in asymmetric masonry grid
- ✅ Detailed product pages with zoomable gallery
- ✅ Shopping cart with real-time updates
- ✅ Secure checkout process
- ✅ User authentication & email verification
- ✅ Order history & tracking
- ✅ Responsive design

### Admin Features
- ✅ Product management (CRUD)
- ✅ Order management & status updates
- ✅ Inventory tracking
- ✅ Analytics dashboard

### Technical Features
- ✅ SEO optimized with meta tags
- ✅ Responsive design (mobile-first)
- ✅ Rate limiting & security headers
- ✅ Database migrations & seeding
- ✅ Environment-based configuration

## Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL 14+
- Docker & Docker Compose (optional)
- AWS Account (for S3) or Cloudinary account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd luxury-articles
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   **Quick Setup (Recommended):**
   ```bash
   # Windows PowerShell
   .\setup-security.ps1
   
   # Linux/Mac
   chmod +x setup-security.sh
   ./setup-security.sh
   ```
   
   **Manual Setup:**
   ```bash
   cp .env.example .env
   ```
   
   Then generate a secure secret and update `.env`:
   ```bash
   # Generate NEXTAUTH_SECRET (32+ characters)
   openssl rand -base64 32
   ```
   
   Fill in the required environment variables (see [SECURITY-IMPLEMENTATION.md](SECURITY-IMPLEMENTATION.md))

4. **Set up the database**
   ```bash
   # Run PostgreSQL (via Docker or locally)
   docker-compose up -d postgres
   
   # Run migrations
   npx prisma migrate dev
   
   # Seed the database
   npm run seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

### Using Docker

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## Environment Variables

See [`.env.example`](.env.example) for a complete list of configuration options.

**Required Variables:**
```env
DATABASE_URL="postgresql://user:password@localhost:5432/timeless_luxury?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="<generate-with-openssl-rand-base64-32>"
```

For detailed configuration, see:
- [SECURITY-IMPLEMENTATION.md](SECURITY-IMPLEMENTATION.md) - Security setup guide
- [.env.example](.env.example) - All available variables

## 🔒 Security Features

This application implements enterprise-grade security:

- ✅ **Rate Limiting** - Protects against brute force and DDoS
- ✅ **CSRF Protection** - Token-based validation for state changes
- ✅ **Security Headers** - CSP, XSS protection, clickjacking prevention
- ✅ **Session Security** - 24-hour timeout with auto-refresh
- ✅ **Input Validation** - Zod schemas for all inputs
- ✅ **Environment Validation** - Runtime checks for critical configs
- ✅ **Password Security** - bcrypt with 12 salt rounds
- ✅ **SQL Injection Protection** - Prisma ORM parameterized queries

**See [SECURITY-IMPLEMENTATION.md](SECURITY-IMPLEMENTATION.md) for complete security documentation.**

## Database Schema

The application uses Prisma ORM with the following models:
- **User**: Authentication and profile
- **Product**: Luxury artifacts with detailed metadata
- **Cart / CartItem**: Shopping cart management
- **Order / OrderItem**: Order processing
- **Address**: Shipping addresses

See `prisma/schema.prisma` for full schema.

## API Routes

### Public APIs
- `GET /api/products` - List all products
- `GET /api/products/[id]` - Get product details
- `POST /api/auth/register` - User registration
- `POST /api/auth/verify-email` - Email verification

### Protected APIs
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item
- `DELETE /api/cart/remove` - Remove cart item
- `POST /api/checkout` - Create checkout session
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user's orders

### Admin APIs
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/[id]` - Update product
- `DELETE /api/admin/products/[id]` - Delete product
- `PUT /api/admin/orders/[id]` - Update order status

## Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Database
npm run db:migrate   # Run database migrations
npm run db:seed      # Seed database with sample data
npm run db:studio    # Open Prisma Studio

# Testing
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Generate coverage report

# Linting & Formatting
npm run lint         # Run ESLint
npm run format       # Format code with Prettier

# Docker
npm run docker:up    # Start Docker containers
npm run docker:down  # Stop Docker containers
```

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

Vercel configuration is included in `vercel.json`

### Manual Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Set up PostgreSQL database

3. Run migrations:
   ```bash
   npx prisma migrate deploy
   ```

4. Start the server:
   ```bash
   npm start
   ```

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## Project Structure

```
luxury-articles/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (auth)/            # Auth pages (login, register)
│   │   ├── (shop)/            # Shop pages (products, cart)
│   │   ├── admin/             # Admin dashboard
│   │   ├── api/               # API routes
│   │   └── layout.tsx         # Root layout
│   ├── components/            # React components
│   │   ├── admin/            # Admin components
│   │   ├── cart/             # Cart components
│   │   ├── layout/           # Layout components
│   │   ├── product/          # Product components
│   │   └── ui/               # Reusable UI components
│   ├── lib/                   # Utility libraries
│   │   ├── auth.ts           # Authentication helpers
│   │   ├── db.ts             # Database client
│   │   ├── s3.ts             # S3 client
│   │   └── validation.ts     # Input validation schemas
│   ├── hooks/                 # Custom React hooks
│   ├── contexts/              # React contexts
│   └── styles/                # Global styles
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── migrations/            # Database migrations
│   └── seed.ts                # Seed script
├── public/                    # Static assets
├── tests/                     # Test files
├── docker-compose.yml         # Docker configuration
├── Dockerfile                 # Docker image
├── .github/workflows/         # GitHub Actions
└── vercel.json               # Vercel config
```

## Security Best Practices

- ✅ Password hashing with bcrypt (12 rounds)
- ✅ JWT tokens with secure httpOnly cookies
- ✅ Email verification for new accounts
- ✅ Input validation with Zod
- ✅ Rate limiting on API routes
- ✅ Security headers (Helmet)
- ✅ CORS configuration
- ✅ SQL injection prevention (Prisma parameterized queries)
- ✅ XSS protection
- ✅ CSRF protection

## Accessibility

- ✅ Semantic HTML
- ✅ ARIA labels and roles
- ✅ Keyboard navigation
- ✅ Focus management
- ✅ Screen reader support
- ✅ Color contrast (WCAG AA)
- ✅ Alt text for images

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - see LICENSE file for details

## Support

For support, email support@timelessluxury.com or open an issue on GitHub.

---

Built with ❤️ for connoisseurs of timeless luxury
