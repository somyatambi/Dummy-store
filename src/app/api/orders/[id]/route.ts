import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { handleError, success, unauthorized, forbidden } from '@/lib/api-utils';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return unauthorized('Please login to view order');
    }

    const order = await prisma.order.findUnique({
      where: { id: params.id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        shippingAddress: true,
      },
    });

    if (!order) {
      return handleError('Order not found', 404);
    }

    // Check if user owns this order
    if (order.userId !== session.user.id && session.user.role !== 'ADMIN') {
      return forbidden('You do not have permission to view this order');
    }

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
    return handleError(error);
  }
}
