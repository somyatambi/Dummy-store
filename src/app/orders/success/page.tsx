'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const paymentIntent = searchParams?.get('payment_intent');
    
    if (!paymentIntent) {
      router.push('/');
      return;
    }

    // Optionally fetch order details here if needed
    setIsLoading(false);
  }, [searchParams, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <p className="text-lg">Processing...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary py-16">
      <div className="container-custom max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <CheckCircleIcon className="w-24 h-24 text-green-500" />
          </div>

          {/* Success Message */}
          <h1 className="text-4xl font-serif mb-4">Order Confirmed!</h1>
          <p className="text-lg text-gray-600 mb-8">
            Thank you for your purchase. Your order has been successfully placed.
          </p>

          {/* Order Info */}
          <div className="bg-secondary rounded-lg p-6 mb-8">
            <h2 className="text-xl font-serif mb-4">What's Next?</h2>
            <ul className="text-left space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-accent mt-2 mr-3 flex-shrink-0"></span>
                <span>You'll receive an order confirmation email shortly with your order details.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-accent mt-2 mr-3 flex-shrink-0"></span>
                <span>We'll send you a shipping notification when your item is on its way.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-accent mt-2 mr-3 flex-shrink-0"></span>
                <span>Track your order anytime from your account dashboard.</span>
              </li>
            </ul>
          </div>

          {/* Order Number */}
          {searchParams?.get('payment_intent') && (
            <div className="mb-8">
              <p className="text-sm text-gray-500 mb-1">Payment Intent</p>
              <p className="font-mono text-sm bg-gray-100 px-4 py-2 rounded inline-block">
                {searchParams.get('payment_intent')}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/account/orders"
              className="px-8 py-3 bg-accent text-white rounded hover:bg-accent/90 font-medium text-center"
            >
              View Orders
            </Link>
            <Link
              href="/"
              className="px-8 py-3 bg-gray-200 text-primary rounded hover:bg-gray-300 font-medium text-center"
            >
              Continue Shopping
            </Link>
          </div>

          {/* Support */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Need help? Contact us at{' '}
              <a href="mailto:support@timelessluxury.com" className="text-accent hover:underline">
                support@timelessluxury.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
