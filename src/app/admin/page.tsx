'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Stats {
  totalProducts: number;
  totalOrders: number;
  pendingOrders: number;
  totalRevenue: number;
  lowStockProducts: number;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session || session.user?.role !== 'ADMIN') {
      router.push('/login');
      return;
    }

    fetchStats();
  }, [session, status, router]);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (!session || session.user?.role !== 'ADMIN') {
    return null;
  }

  return (
    <div className="min-h-screen bg-secondary py-16">
      <div className="container-custom">
        <h1 className="text-4xl md:text-5xl font-serif mb-12">Admin Dashboard</h1>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg border border-primary/10">
            <h3 className="text-sm text-primary/60 mb-2">Total Products</h3>
            <p className="text-3xl font-serif">{stats?.totalProducts || 0}</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-primary/10">
            <h3 className="text-sm text-primary/60 mb-2">Total Orders</h3>
            <p className="text-3xl font-serif">{stats?.totalOrders || 0}</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-primary/10">
            <h3 className="text-sm text-primary/60 mb-2">Pending Orders</h3>
            <p className="text-3xl font-serif text-amber-600">{stats?.pendingOrders || 0}</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-primary/10">
            <h3 className="text-sm text-primary/60 mb-2">Total Revenue</h3>
            <p className="text-3xl font-serif text-accent">
              ₹{stats?.totalRevenue?.toLocaleString() || '0'}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Link
            href="/admin/products"
            className="bg-white p-8 rounded-lg border border-primary/10 hover:border-accent transition-all group"
          >
            <h2 className="text-2xl font-serif mb-4 group-hover:text-accent">Manage Products</h2>
            <p className="text-primary/70">
              View, add, edit, or delete products in your catalog
            </p>
            {stats && stats.lowStockProducts > 0 && (
              <p className="mt-4 text-sm text-amber-600">
                ⚠️ {stats.lowStockProducts} product(s) low in stock
              </p>
            )}
          </Link>

          <Link
            href="/admin/orders"
            className="bg-white p-8 rounded-lg border border-primary/10 hover:border-accent transition-all group"
          >
            <h2 className="text-2xl font-serif mb-4 group-hover:text-accent">Manage Orders</h2>
            <p className="text-primary/70">
              View and update order status, process shipments
            </p>
            {stats && stats.pendingOrders > 0 && (
              <p className="mt-4 text-sm text-accent">
                📦 {stats.pendingOrders} order(s) pending
              </p>
            )}
          </Link>

          <Link
            href="/admin/analytics"
            className="bg-white p-8 rounded-lg border border-primary/10 hover:border-accent transition-all group"
          >
            <h2 className="text-2xl font-serif mb-4 group-hover:text-accent">Analytics</h2>
            <p className="text-primary/70">
              View website traffic, product views, and performance metrics
            </p>
            <p className="mt-4 text-sm text-accent">
              📊 Track visitor behavior
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
