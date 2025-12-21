import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { handleError, success, unauthorized, forbidden } from '@/lib/api-utils';
import { z } from 'zod';

const updateProductSchema = z.object({
  name: z.string().min(1).optional(),
  slug: z.string().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional(),
  story: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  category: z.string().optional().nullable(),
  price: z.number().positive().optional(),
  compareAtPrice: z.number().positive().optional().nullable(),
  images: z.array(z.string().url()).min(1).optional(),
  materials: z.array(z.string()).min(1).optional(),
  dimensions: z.string().min(1).optional(),
  weight: z.string().optional().nullable(),
  stockQuantity: z.number().int().min(0).optional(),
  sku: z.string().min(1).optional(),
  featured: z.boolean().optional(),
  active: z.boolean().optional(),
  metaTitle: z.string().optional().nullable(),
  metaDescription: z.string().optional().nullable(),
});

// GET /api/admin/products/[id] - Get product by ID (admin only)
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return unauthorized('Please login');
    }

    if (session.user.role !== 'ADMIN') {
      return forbidden('Admin access required');
    }

    const product = await prisma.product.findUnique({
      where: { id: params.id },
    });

    if (!product) {
      return handleError('Product not found', 404);
    }

    return success({
      ...product,
      price: Number(product.price),
      compareAtPrice: product.compareAtPrice ? Number(product.compareAtPrice) : null,
    });
  } catch (error) {
    return handleError(error);
  }
}

// PUT /api/admin/products/[id] - Update product (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return unauthorized('Please login');
    }

    if (session.user.role !== 'ADMIN') {
      return forbidden('Admin access required');
    }

    const body = await request.json();
    const validatedData = updateProductSchema.parse(body);

    // Check if product exists
    const existing = await prisma.product.findUnique({
      where: { id: params.id },
    });

    if (!existing) {
      return handleError('Product not found', 404);
    }

    // If slug is being updated, check if it's already taken
    if (validatedData.slug && validatedData.slug !== existing.slug) {
      const slugTaken = await prisma.product.findUnique({
        where: { slug: validatedData.slug },
      });

      if (slugTaken) {
        return handleError('Product with this slug already exists', 400);
      }
    }

    const product = await prisma.product.update({
      where: { id: params.id },
      data: validatedData,
    });

    return success({
      ...product,
      price: Number(product.price),
      compareAtPrice: product.compareAtPrice ? Number(product.compareAtPrice) : null,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return handleError(error.errors[0].message, 400);
    }
    return handleError(error);
  }
}

// DELETE /api/admin/products/[id] - Delete product (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return unauthorized('Please login');
    }

    if (session.user.role !== 'ADMIN') {
      return forbidden('Admin access required');
    }

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: params.id },
    });

    if (!product) {
      return handleError('Product not found', 404);
    }

    // Check if product is in any orders
    const ordersWithProduct = await prisma.orderItem.count({
      where: { productId: params.id },
    });

    if (ordersWithProduct > 0) {
      // Instead of deleting, mark as inactive
      await prisma.product.update({
        where: { id: params.id },
        data: { active: false },
      });

      return success({
        message: 'Product has been deactivated (exists in orders)',
      });
    }

    // Safe to delete
    await prisma.product.delete({
      where: { id: params.id },
    });

    return success({ message: 'Product deleted successfully' });
  } catch (error) {
    return handleError(error);
  }
}
