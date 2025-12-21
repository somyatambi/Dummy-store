'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ShoppingBagIcon, UserIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/hooks/useCart';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cart } = useCart();

  const itemCount = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <header className="sticky top-0 z-50 bg-secondary/95 backdrop-blur-sm border-b border-primary/10">
      <nav className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="text-2xl font-serif tracking-tight group-hover:text-accent transition-colors">
              Timeless Luxury
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/products" className="text-sm hover:text-accent transition-colors">
              Collection
            </Link>
            <Link href="/about" className="text-sm hover:text-accent transition-colors">
              Our Story
            </Link>
            <Link href="/contact" className="text-sm hover:text-accent transition-colors">
              Contact
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-6">
            <Link href="/account" className="hover:text-accent transition-colors" aria-label="Account">
              <UserIcon className="w-6 h-6" />
            </Link>
            
            <Link href="/cart" className="relative hover:text-accent transition-colors" aria-label="Shopping Cart">
              <ShoppingBagIcon className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-primary text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-primary/10">
            <div className="flex flex-col space-y-4">
              <Link
                href="/products"
                className="text-sm hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Collection
              </Link>
              <Link
                href="/about"
                className="text-sm hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Our Story
              </Link>
              <Link
                href="/contact"
                className="text-sm hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
