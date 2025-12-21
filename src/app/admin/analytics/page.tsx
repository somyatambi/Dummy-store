'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import { EyeIcon, ChartBarIcon, ClockIcon } from '@heroicons/react/24/outline';

interface TopProduct {
  id: string;
  name: string;
  slug: string;
  category: string;
  viewCount: number;
  viewsInRange: number;
  images: string[];
  price: number;
}

interface ProductAnalytics {
  topProducts: TopProduct[];
  totalProductViewsInRange: number;
  totalProductsCount: number;
  days: number;
}

interface PageAnalytics {
  totalViews: number;
  days: number;
  topPages: Array<{
    path: string;
    views: number;
  }>;
}

export default function AnalyticsPage() {
  const [productAnalytics, setProductAnalytics] = useState<ProductAnalytics | null>(null);
  const [pageAnalytics, setPageAnalytics] = useState<PageAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState(30);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoading(true);
      try {
        const [productsRes, pagesRes] = await Promise.all([
          fetch(`/api/analytics/product-views?days=${timeRange}`),
          fetch(`/api/analytics/page-views?days=${timeRange}`),
        ]);

        const productsData = await productsRes.json();
        const pagesData = await pagesRes.json();

        setProductAnalytics(productsData);
        setPageAnalytics(pagesData);
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, [timeRange]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-secondary py-16">
        <div className="container-custom text-center">
          <p className="text-lg">Loading analytics...</p>
        </div>
      </div>
    );
  }

  const topProducts = productAnalytics?.topProducts || [];
  const totalProductViews = productAnalytics?.totalProductViewsInRange || 0;
  const totalProductsCount = productAnalytics?.totalProductsCount || 0;
  const avgViewsPerProduct = totalProductsCount > 0 
    ? Math.round(totalProductViews / totalProductsCount) 
    : 0;

  return (
    <div className="min-h-screen bg-secondary py-16">
      <div className="container-custom">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif mb-2">Analytics Dashboard</h1>
            <p className="text-primary/60">Track your website and product performance</p>
          </div>

          {/* Time Range Selector */}
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(Number(e.target.value))}
            className="px-4 py-2 rounded-lg border border-primary/20 bg-white focus:outline-none focus:border-accent"
          >
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
          </select>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg border border-primary/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-accent/10 rounded-lg">
                <EyeIcon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-sm font-medium text-primary/60">Total Page Views</h3>
            </div>
            <p className="text-3xl font-bold">{pageAnalytics?.totalViews.toLocaleString() || 0}</p>
            <p className="text-xs text-primary/50 mt-1">Last {timeRange} days</p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-primary/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-accent/10 rounded-lg">
                <ChartBarIcon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-sm font-medium text-primary/60">Product Views</h3>
            </div>
            <p className="text-3xl font-bold">{totalProductViews.toLocaleString()}</p>
            <p className="text-xs text-primary/50 mt-1">Last {timeRange} days</p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-primary/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-accent/10 rounded-lg">
                <ClockIcon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-sm font-medium text-primary/60">Avg. Views per Product</h3>
            </div>
            <p className="text-3xl font-bold">
              {avgViewsPerProduct.toLocaleString()}
            </p>
            <p className="text-xs text-primary/50 mt-1">Across {totalProductsCount} products</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Top Viewed Products */}
          <div className="bg-white p-8 rounded-lg border border-primary/10">
            <h2 className="text-2xl font-serif mb-6">Top Viewed Products</h2>
            
            {topProducts.length > 0 ? (
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    className="flex items-center gap-4 p-4 rounded-lg hover:bg-primary/5 transition-colors group"
                  >
                    <div className="flex-shrink-0 text-2xl font-bold text-primary/20 w-8">
                      #{index + 1}
                    </div>
                    
                    <div className="relative w-16 h-16 flex-shrink-0 rounded overflow-hidden">
                      <Image
                        src={product.images[0] || '/placeholder.jpg'}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium group-hover:text-accent transition-colors truncate">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-primary/60">
                        <span>{product.category}</span>
                        <span>•</span>
                        <span>{formatPrice(product.price)}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-accent font-medium">
                      <EyeIcon className="w-5 h-5" />
                      <span>{product.viewsInRange.toLocaleString()}</span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-primary/60 text-center py-8">No product views yet</p>
            )}
          </div>

          {/* Top Pages */}
          <div className="bg-white p-8 rounded-lg border border-primary/10">
            <h2 className="text-2xl font-serif mb-6">Most Visited Pages</h2>
            
            {pageAnalytics && pageAnalytics.topPages.length > 0 ? (
              <div className="space-y-4">
                {pageAnalytics.topPages.map((page, index) => (
                  <div
                    key={page.path}
                    className="flex items-center gap-4 p-4 rounded-lg border border-primary/10"
                  >
                    <div className="flex-shrink-0 text-2xl font-bold text-primary/20 w-8">
                      #{index + 1}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-sm truncate">{page.path}</p>
                    </div>

                    <div className="flex items-center gap-1.5 text-accent font-medium">
                      <EyeIcon className="w-5 h-5" />
                      <span>{page.views.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-primary/60 text-center py-8">No page views tracked yet</p>
            )}
          </div>
        </div>

        {/* Back to Admin */}
        <div className="mt-8 text-center">
          <Link href="/admin" className="text-accent hover:underline">
            ← Back to Admin Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
