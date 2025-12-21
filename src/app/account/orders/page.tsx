'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Order {
  id: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  items: Array<{
    quantity: number;
    product: {
      name: string;
      images: string[];
    };
  }>;
}

export default function AccountOrdersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/login');
      return;
    }

    fetchOrders();
  }, [session, status, router]);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      if (response.ok) {
        const data = await response.json();
        setOrders(data.data.orders);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      PROCESSING: 'bg-blue-100 text-blue-800',
      SHIPPED: 'bg-purple-100 text-purple-800',
      DELIVERED: 'bg-green-100 text-green-800',
      CANCELLED: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-secondary py-16">
      <div className="container-custom max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/account" className="text-sm text-primary/60 hover:text-accent mb-2 inline-block">
            ← Back to Account
          </Link>
          <h1 className="text-4xl font-serif mb-2">My Orders</h1>
          <p className="text-gray-600">View and track your order history</p>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-lg text-gray-600 mb-6">You haven't placed any orders yet.</p>
            <Link
              href="/"
              className="inline-block px-8 py-3 bg-accent text-white rounded hover:bg-accent/90 font-medium"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow p-6">
                {/* Order Header */}
                <div className="flex flex-wrap justify-between items-start mb-4 pb-4 border-b">
                  <div>
                    <p className="text-sm text-gray-500">Order ID</p>
                    <p className="font-mono text-sm">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Order Date</p>
                    <p className="text-sm">{new Date(order.createdAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Status</p>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="text-lg font-semibold">₹{order.totalAmount.toLocaleString()}</p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0">
                        {item.product.images[0] && (
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-full h-full object-cover rounded"
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{item.product.name}</p>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Actions */}
                <div className="mt-4 pt-4 border-t flex gap-3">
                  <Link
                    href={`/orders/${order.id}`}
                    className="px-4 py-2 bg-accent text-white rounded hover:bg-accent/90 text-sm font-medium"
                  >
                    View Details
                  </Link>
                  {order.status === 'DELIVERED' && (
                    <button className="px-4 py-2 bg-gray-200 text-primary rounded hover:bg-gray-300 text-sm font-medium">
                      Reorder
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
