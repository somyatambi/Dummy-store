'use client';

import { useEffect } from 'react';

interface ProductViewTrackerProps {
  productId: string;
  productSlug: string;
}

export default function ProductViewTracker({ productId, productSlug }: ProductViewTrackerProps) {
  useEffect(() => {
    // Track product view
    const trackView = async () => {
      try {
        await fetch('/api/analytics/product-views', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId, productSlug }),
        });
      } catch (error) {
        console.error('Failed to track product view:', error);
      }
    };

    // Track after 2 seconds to avoid counting quick bounces
    const timer = setTimeout(trackView, 2000);

    return () => clearTimeout(timer);
  }, [productId, productSlug]);

  return null;
}
