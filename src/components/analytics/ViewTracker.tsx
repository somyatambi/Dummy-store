'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Track page view
    const trackPageView = async () => {
      try {
        await fetch('/api/analytics/page-views', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ path: pathname }),
        });
      } catch (error) {
        console.error('Failed to track page view:', error);
      }
    };

    trackPageView();
  }, [pathname]);

  return null;
}
