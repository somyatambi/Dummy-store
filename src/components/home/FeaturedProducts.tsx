'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@prisma/client';
import { formatPrice } from '@/lib/utils';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useRef } from 'react';

interface FeaturedProductsProps {
  products: Product[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="section-spacing bg-secondary">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif mb-2">New Arrivals</h2>
            <p className="text-primary/60">Discover our latest handcrafted pieces</p>
          </div>
          
          {/* Navigation Arrows */}
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-3 rounded-full border border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all"
              aria-label="Previous"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 rounded-full border border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all"
              aria-label="Next"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrolling Container */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="flex-none w-[280px] md:w-[320px] group snap-start"
              >
                <div className="bg-white rounded-lg overflow-hidden border border-primary/10 hover:border-primary/20 transition-all hover:shadow-lg">
                  {/* Image */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                    <Image
                      src={product.images[0] || '/placeholder.jpg'}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 280px, 320px"
                      loading="lazy"
                      quality={85}
                    />
                    {product.compareAtPrice && (
                      <div className="absolute top-3 right-3 bg-accent text-primary px-3 py-1 text-xs font-medium rounded">
                        Sale
                      </div>
                    )}
                    {product.category && (
                      <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white px-3 py-1 text-xs font-medium rounded">
                        {product.category}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-2">
                    {product.category && (
                      <p className="text-xs text-primary/50 uppercase tracking-wide">{product.category}</p>
                    )}
                    <h3 className="text-lg font-serif group-hover:text-accent transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-medium text-accent">{formatPrice(product.price)}</span>
                      {product.compareAtPrice && (
                        <span className="text-sm text-primary/40 line-through">
                          {formatPrice(product.compareAtPrice)}
                        </span>
                      )}
                    </div>

                    {product.materials && product.materials.length > 0 && (
                      <p className="text-xs text-primary/50 line-clamp-1">{product.materials.join(' • ')}</p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link href="/products" className="btn btn-primary">
            View Full Collection
          </Link>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
