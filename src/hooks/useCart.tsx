'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import useSWR from 'swr';

interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    images: string[];
  };
}

interface Cart {
  id: string;
  items: CartItem[];
}

interface CartContextType {
  cart: Cart | null;
  isLoading: boolean;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  updateCartItem: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  refreshCart: () => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const fetcher = (url: string) => fetch(url).then((res) => res.json()).then((json) => json.data?.cart || null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { data: cart, error, mutate } = useSWR<Cart>('/api/cart', fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 2000,
  });
  const [isLoading, setIsLoading] = useState(false);

  const addToCart = async (productId: string, quantity: number) => {
    try {
      const res = await fetch('/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to add to cart');
      }
      
      // Revalidate cart in background
      mutate();
    } catch (error) {
      console.error('Add to cart error:', error);
      throw error;
    }
  };

  const updateCartItem = async (itemId: string, quantity: number) => {
    // Optimistic update - instant UI change
    if (cart) {
      const optimisticCart = {
        ...cart,
        items: quantity === 0 
          ? cart.items.filter(item => item.id !== itemId)
          : cart.items.map(item => 
              item.id === itemId ? { ...item, quantity } : item
            )
      };
      
      // Update UI immediately
      mutate(optimisticCart, false);
    }

    // Then update server in background
    try {
      const res = await fetch(`/api/cart/update/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity }),
      });
      if (!res.ok) {
        // Revert on error
        mutate();
        throw new Error('Failed to update cart');
      }
      // Revalidate to ensure sync
      mutate();
    } catch (error) {
      console.error('Cart update error:', error);
    }
  };

  const removeFromCart = async (itemId: string) => {
    // Optimistic update
    if (cart) {
      const optimisticCart = {
        ...cart,
        items: cart.items.filter(item => item.id !== itemId)
      };
      mutate(optimisticCart, false);
    }

    try {
      const res = await fetch(`/api/cart/remove/${itemId}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        mutate();
        throw new Error('Failed to remove from cart');
      }
      mutate();
    } catch (error) {
      console.error('Cart remove error:', error);
    }
  };

  const clearCart = () => {
    mutate(null, false);
  };

  return (
    <CartContext.Provider
      value={{
        cart: cart || null,
        isLoading,
        addToCart,
        updateCartItem,
        removeFromCart,
        refreshCart: mutate,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
