'use client';

import Link from 'next/link';
import Image from 'next/image';
import { formatCurrency } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import { EyeIcon } from '@heroicons/react/24/outline';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  images: string[];
  description: string | null;
  viewCount?: number;
}

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === 'ADMIN';
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/products/${product.slug}`}
          className="group block bg-white rounded-lg overflow-hidden border border-primary/10 hover:border-accent transition-all duration-300 hover:shadow-xl"
        >
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden bg-secondary">
            <Image
              src={product.images[0] || '/placeholder.jpg'}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              quality={85}
            />
            {isAdmin && product.viewCount && product.viewCount > 0 && (
              <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded text-xs">
                <EyeIcon className="w-3.5 h-3.5" />
                <span>{product.viewCount}</span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-6">
            <h3 className="font-serif text-xl mb-2 group-hover:text-accent transition-colors">
              {product.name}
            </h3>
            <p className="text-primary/60 text-sm mb-4 line-clamp-2">{product.description || 'Luxury handcrafted piece'}</p>
            <p className="text-accent font-medium text-lg">{formatCurrency(product.price)}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
