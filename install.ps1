# 🚀 INSTALLATION SCRIPT FOR WINDOWS POWERSHELL

# Run this script in PowerShell from the project root directory (d:\Luxury Articles)

Write-Host "🏛️ Starting Timeless Luxury Installation..." -ForegroundColor Green
Write-Host ""

# Step 1: Install dependencies
Write-Host "📦 Step 1/7: Installing dependencies..." -ForegroundColor Cyan
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Dependencies installed" -ForegroundColor Green
Write-Host ""

# Step 2: Copy environment file
Write-Host "📝 Step 2/7: Creating environment file..." -ForegroundColor Cyan
if (Test-Path .env.local) {
    Write-Host "⚠️  .env.local already exists, skipping..." -ForegroundColor Yellow
} else {
    Copy-Item .env.example .env.local
    Write-Host "✅ Created .env.local from template" -ForegroundColor Green
}
Write-Host ""

# Step 3: Start PostgreSQL with Docker
Write-Host "🐳 Step 3/7: Starting PostgreSQL with Docker..." -ForegroundColor Cyan
docker-compose up -d postgres
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to start PostgreSQL. Make sure Docker is running." -ForegroundColor Red
    exit 1
}
Write-Host "✅ PostgreSQL started" -ForegroundColor Green
Write-Host ""

# Step 4: Wait for PostgreSQL to be ready
Write-Host "⏳ Step 4/7: Waiting for PostgreSQL to be ready (15 seconds)..." -ForegroundColor Cyan
Start-Sleep -Seconds 15
Write-Host "✅ PostgreSQL should be ready" -ForegroundColor Green
Write-Host ""

# Step 5: Generate Prisma Client
Write-Host "🔧 Step 5/7: Generating Prisma Client..." -ForegroundColor Cyan
npx prisma generate
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to generate Prisma Client" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Prisma Client generated" -ForegroundColor Green
Write-Host ""

# Step 6: Run database migrations
Write-Host "🗄️  Step 6/7: Running database migrations..." -ForegroundColor Cyan
npx prisma migrate dev --name init
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to run migrations" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Migrations completed" -ForegroundColor Green
Write-Host ""

# Step 7: Seed database
Write-Host "🌱 Step 7/7: Seeding database with sample products..." -ForegroundColor Cyan
npx tsx prisma/seed.ts
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to seed database" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Database seeded with 8 luxury products" -ForegroundColor Green
Write-Host ""

# Success message
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host "🎉 INSTALLATION COMPLETE!" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host ""
Write-Host "⚠️  IMPORTANT: Configure your .env.local file!" -ForegroundColor Yellow
Write-Host ""
Write-Host "Required environment variables:" -ForegroundColor White
Write-Host "  • NEXTAUTH_SECRET (generate a random string)" -ForegroundColor White
Write-Host "  • STRIPE_SECRET_KEY (from Stripe Dashboard)" -ForegroundColor White
Write-Host "  • STRIPE_PUBLISHABLE_KEY (from Stripe Dashboard)" -ForegroundColor White
Write-Host "  • AWS credentials (or use Cloudinary)" -ForegroundColor White
Write-Host ""
Write-Host "To generate NEXTAUTH_SECRET, run:" -ForegroundColor Cyan
Write-Host '  -join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | % {[char]$_})' -ForegroundColor White
Write-Host ""
Write-Host "Test credentials (after starting the app):" -ForegroundColor White
Write-Host "  Admin: admin@timelessluxury.com / admin123" -ForegroundColor White
Write-Host "  Customer: customer@example.com / customer123" -ForegroundColor White
Write-Host ""
Write-Host "To start the development server:" -ForegroundColor Cyan
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Then open: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Happy coding! 🏛️✨" -ForegroundColor Green
Write-Host ""
