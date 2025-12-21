import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { handleError, success, unauthorized, forbidden } from '@/lib/api-utils';
import { z } from 'zod';

const productSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  story: z.string().optional().default(''),
  description: z.string().optional().nullable(),
  category: z.string().optional().nullable(),
  price: z.number().positive(),
  compareAtPrice: z.number().positive().optional().nullable(),
  images: z.array(z.string()).min(1),
  materials: z.array(z.string()).optional().default([]),
  dimensions: z.string().optional().nullable(),
  weight: z.string().optional().nullable(),
  stockQuantity: z.number().int().min(0).default(0),
  sku: z.string().optional().nullable(),
  featured: z.boolean().optional().default(false),
  active: z.boolean().optional().default(true),
  metaTitle: z.string().optional().nullable(),
  metaDescription: z.string().optional().nullable(),
});

// GET /api/admin/products - List all products (admin only)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return unauthorized('Please login');
    }

    if (session.user.role !== 'ADMIN') {
      return forbidden('Admin access required');
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;
    const search = searchParams.get('search') || '';

    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' as const } },
            { sku: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);

    // Convert Decimal to number
    const productsWithNumbers = products.map((product) => ({
      ...product,
      price: Number(product.price),
      compareAtPrice: product.compareAtPrice ? Number(product.compareAtPrice) : null,
    }));

    return success({
      products: productsWithNumbers,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return handleError(error);
  }
}

// POST /api/admin/products - Create product (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return unauthorized('Please login');
    }

    if (session.user.role !== 'ADMIN') {
      return forbidden('Admin access required');
    }

    const body = await request.json();
    const validatedData = productSchema.parse(body);

    // Check if slug already exists
    const existing = await prisma.product.findUnique({
      where: { slug: validatedData.slug },
    });

    if (existing) {
      return handleError('Product with this slug already exists', 400);
    }

    const product = await prisma.product.create({
      data: validatedData,
    });

    return success(
      {
        product: {
          ...product,
          price: Number(product.price),
          compareAtPrice: product.compareAtPrice ? Number(product.compareAtPrice) : null,
        },
      },
      201
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return handleError(error.errors[0].message, 400);
    }
    return handleError(error);
  }
}
