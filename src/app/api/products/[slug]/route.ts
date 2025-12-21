import { NextRequest } from 'next/server';
import prisma from '@/lib/db';
import { handleError, success } from '@/lib/api-utils';
import { ApiError } from '@/lib/api-utils';

// GET /api/products/[slug] - Get single product
export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const product = await prisma.product.findUnique({
      where: { slug: params.slug },
    });

    if (!product) {
      throw new ApiError(404, 'Product not found');
    }

    if (!product.active) {
      throw new ApiError(404, 'Product not available');
    }

    // Get related products (same materials or similar price range)
    const relatedProducts = await prisma.product.findMany({
      where: {
        id: { not: product.id },
        active: true,
        OR: [
          { materials: { hasSome: product.materials } },
          {
            price: {
              gte: Number(product.price) * 0.7,
              lte: Number(product.price) * 1.3,
            },
          },
        ],
      },
      take: 4,
      orderBy: { createdAt: 'desc' },
    });

    return success({ product, relatedProducts });
  } catch (error) {
    return handleError(error);
  }
}
