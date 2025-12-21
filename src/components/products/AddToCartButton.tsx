'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/hooks/useCart';

interface AddToCartButtonProps {
  productId: string;
  disabled?: boolean;
}

export default function AddToCartButton({ productId, disabled = false }: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState('');
  const { addToCart } = useCart();
  const { data: session } = useSession();

  const handleAddToCart = async () => {
    setIsAdding(true);
    setError('');
    try {
      await addToCart(productId, 1);
      alert('Added to cart!');
    } catch (error: any) {
      console.error('Failed to add to cart:', error);
      const errorMessage = error?.message || 'Failed to add to cart. Please try again.';
      
      if (errorMessage.includes('verify your email')) {
        setError('Please verify your email to add items to cart.');
      } else {
        setError(errorMessage);
      }
      
      alert(errorMessage);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleAddToCart}
        disabled={disabled || isAdding}
        className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ShoppingBagIcon className="w-5 h-5" />
        {isAdding ? 'Adding...' : disabled ? 'Out of Stock' : 'Add to Collection'}
      </button>
      {error && (
        <p className="mt-2 text-sm text-red-600 text-center">{error}</p>
      )}
    </div>
  );
}
