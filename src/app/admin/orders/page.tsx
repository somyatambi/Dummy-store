'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Order {
  id: string;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
  items: Array<{
    quantity: number;
    product: {
      name: string;
    };
  }>;
}

export default function AdminOrdersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session || session.user?.role !== 'ADMIN') {
      router.push('/login');
      return;
    }

    fetchOrders();
  }, [session, status, router, statusFilter]);

  const fetchOrders = async () => {
    try {
      const url = statusFilter
        ? `/api/admin/orders?status=${statusFilter}`
        : '/api/admin/orders';
      const response = await fetch(url);
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

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        alert('Order status updated successfully');
        fetchOrders();
      } else {
        alert('Failed to update order status');
      }
    } catch (error) {
      alert('Failed to update order status');
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      PROCESSING: 'bg-blue-100 text-blue-800',
      SHIPPED: 'bg-purple-100 text-purple-800',
      DELIVERED: 'bg-green-100 text-green-800',
      CANCELLED: 'bg-red-100 text-red-800',
      REFUNDED: 'bg-gray-100 text-gray-800',
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

  if (!session || session.user?.role !== 'ADMIN') {
    return null;
  }

  return (
    <div className="min-h-screen bg-secondary py-16">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <Link href="/admin" className="text-sm text-primary/60 hover:text-accent mb-2 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-4xl font-serif">Manage Orders</h1>
        </div>

        {/* Filters */}
        <div className="mb-6 flex gap-2 flex-wrap">
          <button
            onClick={() => setStatusFilter('')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              statusFilter === ''
                ? 'bg-accent text-white'
                : 'bg-white text-primary hover:bg-gray-50'
            }`}
          >
            All
          </button>
          {['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === status
                  ? 'bg-accent text-white'
                  : 'bg-white text-primary hover:bg-gray-50'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Order ID</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Items</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Total</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-mono">
                      {order.id.slice(0, 8)}...
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {order.items.length} item(s)
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      ₹{order.totalAmount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-accent focus:border-transparent"
                      >
                        <option value="PENDING">Pending</option>
                        <option value="PROCESSING">Processing</option>
                        <option value="SHIPPED">Shipped</option>
                        <option value="DELIVERED">Delivered</option>
                        <option value="CANCELLED">Cancelled</option>
                        <option value="REFUNDED">Refunded</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {orders.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No orders found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
