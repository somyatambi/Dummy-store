export function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-lg overflow-hidden border border-primary/10 animate-pulse"
        >
          {/* Image Skeleton */}
          <div className="relative aspect-square bg-secondary" />
          
          {/* Content Skeleton */}
          <div className="p-6 space-y-3">
            <div className="h-6 bg-secondary rounded w-3/4" />
            <div className="h-4 bg-secondary rounded w-full" />
            <div className="h-4 bg-secondary rounded w-5/6" />
            <div className="h-5 bg-secondary rounded w-1/3 mt-4" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Image Skeleton */}
        <div className="aspect-square bg-secondary rounded-lg" />
        
        {/* Details Skeleton */}
        <div className="space-y-6">
          <div className="h-10 bg-secondary rounded w-3/4" />
          <div className="h-8 bg-secondary rounded w-1/3" />
          <div className="space-y-2">
            <div className="h-4 bg-secondary rounded w-full" />
            <div className="h-4 bg-secondary rounded w-full" />
            <div className="h-4 bg-secondary rounded w-3/4" />
          </div>
          <div className="h-12 bg-secondary rounded w-full" />
        </div>
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="animate-pulse space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-lg border border-primary/10">
            <div className="h-4 bg-secondary rounded w-1/2 mb-4" />
            <div className="h-8 bg-secondary rounded w-3/4" />
          </div>
        ))}
      </div>
    </div>
  );
}
