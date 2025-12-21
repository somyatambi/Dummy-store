import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { formatPrice } from '@/lib/utils';
import AddToCartButton from '@/components/products/AddToCartButton';
import ProductImages from '@/components/products/ProductImages';
import ProductViewTracker from '@/components/analytics/ProductViewTracker';
import ProductDetailView from '@/components/products/ProductDetailView';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
  });

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.name} | Timeless Luxury`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await prisma.product.findUnique({
    where: {
      slug: params.slug,
      active: true,
    },
  });

  if (!product) {
    notFound();
  }

  // Get related products from same category
  const relatedProducts = await prisma.product.findMany({
    where: {
      active: true,
      id: { not: product.id }, // Exclude current product
      ...(product.category && { category: product.category }), // Same category if exists
    },
    take: 4,
    orderBy: {
      createdAt: 'desc',
    },
  });

  // If not enough products in same category, get random featured products
  const additionalProducts = relatedProducts.length < 4 
    ? await prisma.product.findMany({
        where: {
          active: true,
          id: { 
            not: product.id,
            notIn: relatedProducts.map(p => p.id)
          },
          featured: true,
        },
        take: 4 - relatedProducts.length,
        orderBy: {
          createdAt: 'desc',
        },
      })
    : [];

  const recommendedProducts = [...relatedProducts, ...additionalProducts];

  const price = Number(product.price);
  const compareAtPrice = product.compareAtPrice ? Number(product.compareAtPrice) : null;

  return (
    <div className="min-h-screen bg-secondary py-16">
      {/* Track product view */}
      <ProductViewTracker productId={product.id} productSlug={product.slug} />
      
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm mb-8">
          <Link href="/" className="text-primary/60 hover:text-accent">
            Home
          </Link>
          <span className="text-primary/40">/</span>
          <Link href="/products" className="text-primary/60 hover:text-accent">
            Collection
          </Link>
          <span className="text-primary/40">/</span>
          <span className="text-primary">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <ProductImages images={product.images} productName={product.name} />

          {/* Product Info */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-4xl md:text-5xl font-serif">{product.name}</h1>
              <ProductDetailView viewCount={product.viewCount} />
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-3xl font-medium text-accent">{formatPrice(price)}</span>
              {compareAtPrice && compareAtPrice > price && (
                <span className="text-xl text-primary/40 line-through">
                  {formatPrice(compareAtPrice)}
                </span>
              )}
            </div>

            {/* Description */}
            <div className="prose prose-lg mb-8">
              <p className="text-primary/80">{product.description}</p>
            </div>

            {/* Story */}
            {product.story && (
              <div className="mb-8 p-6 bg-primary/5 rounded-lg">
                <h3 className="text-xl font-serif mb-3">The Story</h3>
                <p className="text-primary/70">{product.story}</p>
              </div>
            )}

            {/* Details */}
            <div className="space-y-6 mb-8">
              {/* Materials */}
              {product.materials && product.materials.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-primary/60 mb-2">Materials</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.materials.map((material, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-white border border-primary/20 rounded-full text-sm"
                      >
                        {material}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Dimensions */}
              {product.dimensions && (
                <div>
                  <h3 className="text-sm font-medium text-primary/60 mb-2">Dimensions</h3>
                  <p className="text-primary">{product.dimensions}</p>
                </div>
              )}

              {/* Weight */}
              {product.weight && (
                <div>
                  <h3 className="text-sm font-medium text-primary/60 mb-2">Weight</h3>
                  <p className="text-primary">{product.weight}</p>
                </div>
              )}

              {/* SKU */}
              {product.sku && (
                <div>
                  <h3 className="text-sm font-medium text-primary/60 mb-2">SKU</h3>
                  <p className="text-primary/70 font-mono text-sm">{product.sku}</p>
                </div>
              )}

              {/* Stock Status */}
              <div>
                <h3 className="text-sm font-medium text-primary/60 mb-2">Availability</h3>
                {product.stockQuantity > 0 ? (
                  <p className="text-green-600 font-medium">In Stock</p>
                ) : (
                  <p className="text-red-600 font-medium">Out of Stock</p>
                )}
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <AddToCartButton
                productId={product.id}
                disabled={product.stockQuantity <= 0}
              />

              <Link
                href="/products"
                className="block text-center py-3 border border-primary/20 rounded-lg hover:bg-primary/5 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>

            {/* Additional Info */}
            <div className="mt-8 p-6 bg-accent/10 rounded-lg">
              <h3 className="font-serif text-lg mb-3">Collector Information</h3>
              <ul className="space-y-2 text-sm text-primary/70">
                <li>✓ Certificate of Authenticity included</li>
                <li>✓ Professionally packaged and insured shipping</li>
                <li>✓ 14-day return policy for examination</li>
                <li>✓ Complimentary consultation with our specialists</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {recommendedProducts.length > 0 && (
          <div className="mt-24">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-serif mb-2">You May Also Like</h2>
                {product.category && (
                  <p className="text-primary/60">More from {product.category}</p>
                )}
              </div>
              {product.category && (
                <Link 
                  href={`/products`}
                  className="text-accent hover:underline text-sm"
                >
                  View all in {product.category} →
                </Link>
              )}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendedProducts.map((relatedProduct) => {
                const relatedPrice = Number(relatedProduct.price);
                const relatedComparePrice = relatedProduct.compareAtPrice 
                  ? Number(relatedProduct.compareAtPrice) 
                  : null;

                return (
                  <Link
                    key={relatedProduct.id}
                    href={`/products/${relatedProduct.slug}`}
                    className="group"
                  >
                    <div className="bg-white rounded-lg overflow-hidden border border-primary/10 hover:border-primary/20 transition-all hover:shadow-lg">
                      {/* Image */}
                      <div className="relative aspect-[4/5] overflow-hidden bg-cream">
                        <Image
                          src={relatedProduct.images[0] || '/placeholder.jpg'}
                          alt={relatedProduct.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 50vw, 25vw"
                        />
                        {relatedComparePrice && relatedComparePrice > relatedPrice && (
                          <div className="absolute top-3 right-3 bg-accent text-primary px-3 py-1 text-xs font-medium rounded">
                            Sale
                          </div>
                        )}
                        {relatedProduct.category && (
                          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white px-3 py-1 text-xs font-medium rounded">
                            {relatedProduct.category}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-4 space-y-2">
                        <h3 className="text-base font-serif group-hover:text-accent transition-colors line-clamp-2">
                          {relatedProduct.name}
                        </h3>
                        
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-medium text-accent">
                            {formatPrice(relatedPrice)}
                          </span>
                          {relatedComparePrice && relatedComparePrice > relatedPrice && (
                            <span className="text-sm text-primary/40 line-through">
                              {formatPrice(relatedComparePrice)}
                            </span>
                          )}
                        </div>

                        {relatedProduct.materials && relatedProduct.materials.length > 0 && (
                          <p className="text-xs text-primary/50 line-clamp-1">
                            {relatedProduct.materials.join(' • ')}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
