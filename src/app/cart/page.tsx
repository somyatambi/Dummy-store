'use client';

import { useCart } from '@/hooks/useCart';
import Link from 'next/link';
import Image from 'next/image';
import { TrashIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { formatCurrency } from '@/lib/utils';

export default function CartPage() {
  const { cart, isLoading, updateCartItem, removeFromCart } = useCart();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-secondary py-16">
        <div className="container-custom">
          <div className="text-center">
            <p className="text-lg">Loading cart...</p>
          </div>
        </div>
      </div>
    );
  }

  const items = cart?.items || [];
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 50 : 0;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-secondary py-16">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-serif mb-6">Your Cart is Empty</h1>
            <p className="text-primary/70 mb-8">
              Discover our collection of extraordinary artifacts and timeless pieces.
            </p>
            <Link href="/products" className="btn-primary inline-block">
              Browse Collection
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary py-16">
      <div className="container-custom">
        <h1 className="text-4xl md:text-5xl font-serif mb-12">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-6 p-6 bg-white rounded-lg border border-primary/10"
              >
                {/* Product Image */}
                <div className="relative w-32 h-32 flex-shrink-0">
                  <Image
                    src={item.product.images[0] || '/placeholder.jpg'}
                    alt={item.product.name}
                    fill
                    className="object-cover rounded"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1">
                  <Link
                    href={`/products/${item.product.id}`}
                    className="font-serif text-lg hover:text-accent"
                  >
                    {item.product.name}
                  </Link>
                  <p className="text-accent mt-2">{formatCurrency(item.product.price)}</p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center border border-primary/20 rounded">
                      <button
                        onClick={() => updateCartItem(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-primary/5"
                      >
                        <MinusIcon className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-2 border-x border-primary/20">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartItem(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-primary/5"
                      >
                        <PlusIcon className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-700 flex items-center gap-2"
                    >
                      <TrashIcon className="w-5 h-5" />
                      Remove
                    </button>
                  </div>
                </div>

                {/* Item Total */}
                <div className="text-right">
                  <p className="font-medium">{formatCurrency(item.product.price * item.quantity)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-lg border border-primary/10 sticky top-24">
              <h2 className="text-2xl font-serif mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-primary/70">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-primary/70">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
                </div>
                <div className="border-t border-primary/10 pt-4">
                  <div className="flex justify-between text-lg font-medium">
                    <span>Total</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                </div>
              </div>

              <Link href="/checkout" className="btn-primary w-full block text-center">
                Proceed to Checkout
              </Link>

              <Link
                href="/products"
                className="block text-center mt-4 text-sm text-primary/70 hover:text-accent"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
