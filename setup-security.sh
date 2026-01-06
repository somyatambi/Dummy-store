#!/bin/bash

# Security Setup Script for Linux/Mac
# Run this to generate secure secrets for your .env file

echo "🔒 Security Setup for Timeless Luxury E-Commerce"
echo "================================================="
echo ""

# Check if .env exists
if [ -f ".env" ]; then
    echo "⚠️  .env file already exists!"
    read -p "Do you want to update it? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Aborted."
        exit 1
    fi
else
    cp .env.example .env
    echo "✅ Created .env file from .env.example"
fi

echo ""
echo "Generating secure secrets..."

# Generate NEXTAUTH_SECRET (32 bytes base64)
NEXTAUTH_SECRET=$(openssl rand -base64 32)

# Generate database password (24 characters)
DB_PASSWORD=$(openssl rand -base64 18)

echo ""
echo "✅ Generated secure secrets!"
echo ""
echo "================================================="
echo "IMPORTANT - Copy these values to your .env file:"
echo "================================================="
echo ""
echo "NEXTAUTH_SECRET='$NEXTAUTH_SECRET'"
echo "POSTGRES_PASSWORD='$DB_PASSWORD'"
echo ""
echo "Database URL:"
echo "DATABASE_URL='postgresql://postgres:$DB_PASSWORD@localhost:5432/timeless_luxury?schema=public'"
echo ""

# Update .env file on Linux/Mac
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' "s|NEXTAUTH_SECRET=\".*\"|NEXTAUTH_SECRET=\"$NEXTAUTH_SECRET\"|g" .env
    sed -i '' "s|POSTGRES_PASSWORD=\".*\"|POSTGRES_PASSWORD=\"$DB_PASSWORD\"|g" .env
    sed -i '' "s|DATABASE_URL=\"postgresql://postgres:[^@]*@|DATABASE_URL=\"postgresql://postgres:$DB_PASSWORD@|g" .env
else
    # Linux
    sed -i "s|NEXTAUTH_SECRET=\".*\"|NEXTAUTH_SECRET=\"$NEXTAUTH_SECRET\"|g" .env
    sed -i "s|POSTGRES_PASSWORD=\".*\"|POSTGRES_PASSWORD=\"$DB_PASSWORD\"|g" .env
    sed -i "s|DATABASE_URL=\"postgresql://postgres:[^@]*@|DATABASE_URL=\"postgresql://postgres:$DB_PASSWORD@|g" .env
fi

echo "✅ Updated .env file with secure values!"
echo ""
echo "⚠️  IMPORTANT SECURITY NOTES:"
echo "1. Never commit .env file to version control"
echo "2. Store these secrets securely (password manager)"
echo "3. Use different secrets for production"
echo "4. Rotate secrets regularly (every 90 days)"
echo ""
echo "🚀 Next Steps:"
echo "1. Review .env file and configure optional services"
echo "2. Run: npm install"
echo "3. Run: npx prisma migrate dev"
echo "4. Run: npm run dev"
echo ""
echo "📖 For more information, see SECURITY-IMPLEMENTATION.md"
