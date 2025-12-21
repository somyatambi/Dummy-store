'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PaymentMethodsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/login');
    }
  }, [session, status, router]);

  if (status === 'loading') {
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
      <div className="container-custom max-w-4xl">
        <div className="mb-8">
          <Link href="/account" className="text-sm text-primary/60 hover:text-accent mb-2 inline-block">
            ← Back to Account
          </Link>
          <h1 className="text-4xl font-serif mb-2">Payment Methods</h1>
          <p className="text-gray-600">Manage your saved payment methods</p>
        </div>

        <div className="bg-white rounded-lg shadow p-8">
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No payment methods saved</h3>
            <p className="text-gray-600 mb-6">
              Payment methods are securely managed through Stripe during checkout.
            </p>
            <Link
              href="/products"
              className="inline-block px-6 py-3 bg-accent text-white rounded hover:bg-accent/90 font-medium"
            >
              Browse Products
            </Link>
          </div>

          <div className="mt-8 pt-8 border-t">
            <h3 className="font-serif text-lg mb-4">Accepted Payment Methods</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="border rounded p-4 text-center">
                <p className="text-sm font-medium">Credit/Debit Cards</p>
                <p className="text-xs text-gray-500 mt-1">Visa, Mastercard, Amex</p>
              </div>
              <div className="border rounded p-4 text-center">
                <p className="text-sm font-medium">Link</p>
                <p className="text-xs text-gray-500 mt-1">One-click checkout</p>
              </div>
              <div className="border rounded p-4 text-center">
                <p className="text-sm font-medium">Apple Pay</p>
                <p className="text-xs text-gray-500 mt-1">On supported devices</p>
              </div>
              <div className="border rounded p-4 text-center">
                <p className="text-sm font-medium">Google Pay</p>
                <p className="text-xs text-gray-500 mt-1">On supported devices</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
