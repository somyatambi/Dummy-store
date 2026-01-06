# Security Setup Script for Windows
# Run this to generate secure secrets for your .env file

Write-Host "🔒 Security Setup for Timeless Luxury E-Commerce" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host ""

# Check if .env exists
if (Test-Path ".env") {
    Write-Host "⚠️  .env file already exists!" -ForegroundColor Yellow
    $overwrite = Read-Host "Do you want to update it? (y/n)"
    if ($overwrite -ne "y") {
        Write-Host "Aborted." -ForegroundColor Red
        exit
    }
} else {
    Copy-Item ".env.example" ".env"
    Write-Host "✅ Created .env file from .env.example" -ForegroundColor Green
}

Write-Host ""
Write-Host "Generating secure secrets..." -ForegroundColor Cyan

# Generate NEXTAUTH_SECRET (32 bytes = 44 characters base64)
$nextAuthSecret = [Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))

# Generate database password (24 characters alphanumeric)
$dbPasswordChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"
$dbPassword = -join ((1..24) | ForEach-Object { $dbPasswordChars[(Get-Random -Maximum $dbPasswordChars.Length)] })

Write-Host ""
Write-Host "✅ Generated secure secrets!" -ForegroundColor Green
Write-Host ""
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "IMPORTANT - Copy these values to your .env file:" -ForegroundColor Yellow
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "NEXTAUTH_SECRET='$nextAuthSecret'" -ForegroundColor White
Write-Host "POSTGRES_PASSWORD='$dbPassword'" -ForegroundColor White
Write-Host ""
Write-Host "Database URL:" -ForegroundColor Cyan
Write-Host "DATABASE_URL='postgresql://postgres:$dbPassword@localhost:5432/timeless_luxury?schema=public'" -ForegroundColor White
Write-Host ""

# Update .env file
$envContent = Get-Content ".env" -Raw

$envContent = $envContent -replace 'NEXTAUTH_SECRET=".*?"', "NEXTAUTH_SECRET=`"$nextAuthSecret`""
$envContent = $envContent -replace 'POSTGRES_PASSWORD=".*?"', "POSTGRES_PASSWORD=`"$dbPassword`""
$envContent = $envContent -replace 'DATABASE_URL="postgresql://postgres:.*?@', "DATABASE_URL=`"postgresql://postgres:$dbPassword@"

Set-Content ".env" $envContent

Write-Host "✅ Updated .env file with secure values!" -ForegroundColor Green
Write-Host ""
Write-Host "⚠️  IMPORTANT SECURITY NOTES:" -ForegroundColor Yellow
Write-Host "1. Never commit .env file to version control" -ForegroundColor White
Write-Host "2. Store these secrets securely (password manager)" -ForegroundColor White
Write-Host "3. Use different secrets for production" -ForegroundColor White
Write-Host "4. Rotate secrets regularly (every 90 days)" -ForegroundColor White
Write-Host ""
Write-Host "🚀 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Review .env file and configure optional services" -ForegroundColor White
Write-Host "2. Run: npm install" -ForegroundColor White
Write-Host "3. Run: npx prisma migrate dev" -ForegroundColor White
Write-Host "4. Run: npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "📖 For more information, see SECURITY-IMPLEMENTATION.md" -ForegroundColor Cyan
