import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { handleError, success, unauthorized, forbidden } from '@/lib/api-utils';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return unauthorized('Please login');
    }

    if (session.user.role !== 'ADMIN') {
      return forbidden('Admin access required');
    }

    const [
      totalProducts,
      totalOrders,
      pendingOrders,
      completedOrders,
      lowStockProducts,
    ] = await Promise.all([
      prisma.product.count(),
      prisma.order.count(),
      prisma.order.count({ where: { status: 'PENDING' } }),
      prisma.order.findMany({
        where: { paymentStatus: 'COMPLETED' },
        select: { totalAmount: true },
      }),
      prisma.product.count({ where: { stockQuantity: { lte: 5 } } }),
    ]);

    const totalRevenue = completedOrders.reduce(
      (sum, order) => sum + Number(order.totalAmount),
      0
    );

    return success({
      totalProducts,
      totalOrders,
      pendingOrders,
      totalRevenue,
      lowStockProducts,
    });
  } catch (error) {
    return handleError(error);
  }
}
