'use client';

import { useState, useEffect } from 'react';
import ProductGrid from '@/components/products/ProductGrid';
import { Product } from '@prisma/client';
import { ProductGridSkeleton } from '@/components/ui/Skeletons';

const CATEGORIES = [
  'All Products',
  'Wall Hangings',
  'Lamps',
  'Vases & Planters',
  'Showpieces',
  'Candles & Holders',
  'Mirrors & Frames',
  'Clocks',
  'Storage & Organization',
  'Tabletop Decor',
  'Wind Chimes',
];

interface ProductWithNumbers extends Omit<Product, 'price' | 'compareAtPrice'> {
  price: number;
  compareAtPrice: number | null;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductWithNumbers[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductWithNumbers[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch products
  useEffect(() => {
    let mounted = true;
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error('Failed to fetch');
        const result = await response.json();
        if (mounted) {
          const productsData = result.data?.products || result.products || [];
          setProducts(productsData);
          setFilteredProducts(productsData);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };
    fetchProducts();
    return () => { mounted = false; };
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...products];

    // Category filter
    if (selectedCategory !== 'All Products') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Price range filter
    if (priceRange === 'under-3000') {
      filtered = filtered.filter(p => p.price < 3000);
    } else if (priceRange === '3000-6000') {
      filtered = filtered.filter(p => p.price >= 3000 && p.price <= 6000);
    } else if (priceRange === 'above-6000') {
      filtered = filtered.filter(p => p.price > 6000);
    }

    // Sort
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, priceRange, sortBy]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-secondary py-16">
        <div className="container-custom text-center">
          <p className="text-lg">Loading collection...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary py-16">
      <div className="container-custom">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-5xl font-serif mb-6">Our Collection</h1>
          <p className="text-lg text-primary/70">
            Discover handcrafted home decor, elegant showpieces, and timeless pieces that transform your living spaces.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 overflow-x-auto scrollbar-hide">
          <div className="flex gap-3 pb-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-primary text-secondary'
                    : 'bg-white border border-primary/20 hover:border-primary/40'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-wrap gap-4 mb-12 pb-6 border-b border-primary/10">
          {/* Price Range */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-primary/70">Price:</label>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="px-4 py-2 rounded-lg border border-primary/20 bg-white text-sm focus:outline-none focus:border-accent"
            >
              <option value="all">All Prices</option>
              <option value="under-3000">Under ₹3,000</option>
              <option value="3000-6000">₹3,000 - ₹6,000</option>
              <option value="above-6000">Above ₹6,000</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-primary/70">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-lg border border-primary/20 bg-white text-sm focus:outline-none focus:border-accent"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>

          {/* Results Count */}
          <div className="ml-auto flex items-center">
            <p className="text-sm text-primary/60">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </p>
          </div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <ProductGridSkeleton />
        ) : filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} />
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-primary/60">No products found matching your filters.</p>
            <button
              onClick={() => {
                setSelectedCategory('All Products');
                setPriceRange('all');
              }}
              className="mt-4 text-accent hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
