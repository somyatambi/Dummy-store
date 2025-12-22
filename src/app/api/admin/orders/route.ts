import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { handleError, success, unauthorized, forbidden } from '@/lib/api-utils';

// GET /api/admin/orders - List all orders (admin only)
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
    const status = searchParams.get('status');

    const where = status ? { status: status as any } : {};

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          items: {
            include: {
              product: true,
            },
          },
          shippingAddress: true,
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.order.count({ where }),
    ]);

    // Convert Decimal to number
    const ordersWithNumbers = orders.map((order) => ({
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
    }));

    return success({
      orders: ordersWithNumbers,
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
