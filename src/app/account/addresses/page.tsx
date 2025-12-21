'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AddressesPage() {
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
          <h1 className="text-4xl font-serif mb-2">Addresses</h1>
          <p className="text-gray-600">Manage your shipping addresses</p>
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
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No saved addresses</h3>
            <p className="text-gray-600 mb-6">
              Your shipping addresses will appear here after your first order.
            </p>
            <Link
              href="/products"
              className="inline-block px-6 py-3 bg-accent text-white rounded hover:bg-accent/90 font-medium"
            >
              Start Shopping
            </Link>
          </div>

          <div className="mt-8 pt-8 border-t">
            <h3 className="font-serif text-lg mb-4">Address Information</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-accent mt-2 mr-3 flex-shrink-0"></span>
                <span>Addresses are collected during checkout</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-accent mt-2 mr-3 flex-shrink-0"></span>
                <span>You can save multiple shipping addresses</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-accent mt-2 mr-3 flex-shrink-0"></span>
                <span>All addresses are securely stored and encrypted</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-accent mt-2 mr-3 flex-shrink-0"></span>
                <span>We ship to most countries worldwide</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
