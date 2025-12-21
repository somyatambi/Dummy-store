import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { handleError, success, unauthorized, forbidden } from '@/lib/api-utils';
import { z } from 'zod';

const updateOrderSchema = z.object({
  status: z.enum(['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED']).optional(),
  paymentStatus: z.enum(['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED']).optional(),
  trackingNumber: z.string().optional().nullable(),
});

// PUT /api/admin/orders/[id] - Update order (admin only)
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
    const validatedData = updateOrderSchema.parse(body);

    // Check if order exists
    const existing = await prisma.order.findUnique({
      where: { id: params.id },
    });

    if (!existing) {
      return handleError('Order not found', 404);
    }

    const order = await prisma.order.update({
      where: { id: params.id },
      data: validatedData,
      include: {
        items: {
          include: {
            product: true,
          },
        },
        shippingAddress: true,
      },
    });

    // Convert Decimal to number
    const orderWithNumbers = {
      ...order,
      totalAmount: Number(order.totalAmount),
      shippingCost: Number(order.shippingCost),
      items: order.items.map((item) => ({
        ...item,
        price: Number(item.price),
        product: {
          ...item.product,
          price: Number(item.product.price),
          compareAtPrice: item.product.compareAtPrice
            ? Number(item.product.compareAtPrice)
            : null,
        },
      })),
    };

    return success(orderWithNumbers);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return handleError(error.errors[0].message, 400);
    }
    return handleError(error);
  }
}
