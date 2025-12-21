'use client';

import { useSession } from 'next-auth/react';
import { EyeIcon } from '@heroicons/react/24/outline';

interface ProductDetailViewProps {
  viewCount: number;
}

export default function ProductDetailView({ viewCount }: ProductDetailViewProps) {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === 'ADMIN';

  if (!isAdmin || viewCount === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-1.5 text-primary/60 text-sm bg-primary/5 px-3 py-1.5 rounded-full">
      <EyeIcon className="w-4 h-4" />
      <span>{viewCount.toLocaleString()} views</span>
    </div>
  );
}
