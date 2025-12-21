import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { handleError, success, unauthorized } from '@/lib/api-utils';
import { z } from 'zod';

// GET /api/orders - Get user's orders
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return unauthorized('Please login to view orders');
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where: { userId: session.user.id },
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
      prisma.order.count({
        where: { userId: session.user.id },
      }),
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

const createOrderSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string().uuid(),
      quantity: z.number().int().positive(),
    })
  ),
  shippingAddress: z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    street: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    postalCode: z.string().min(1),
    country: z.string().min(1),
    phone: z.string().min(1),
  }),
  shippingMethod: z.enum(['STANDARD', 'EXPRESS', 'OVERNIGHT']),
});

// POST /api/orders - Create order (after successful payment)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return unauthorized('Please login to create order');
    }

    const body = await request.json();
    const validatedData = createOrderSchema.parse(body);

    // Validate products and calculate total
    const products = await prisma.product.findMany({
      where: {
        id: { in: validatedData.items.map((item) => item.productId) },
        active: true,
      },
    });

    if (products.length !== validatedData.items.length) {
      return handleError('Some products are no longer available', 400);
    }

    // Check stock
    for (const item of validatedData.items) {
      const product = products.find((p) => p.id === item.productId);
      if (!product || product.stockQuantity < item.quantity) {
        return handleError(
          `${product?.name || 'Product'} is out of stock or has insufficient quantity`,
          400
        );
      }
    }

    // Calculate totals
    const subtotal = validatedData.items.reduce((sum, item) => {
      const product = products.find((p) => p.id === item.productId)!;
      return sum + Number(product.price) * item.quantity;
    }, 0);

    const shippingCost =
      validatedData.shippingMethod === 'OVERNIGHT'
        ? 150
        : validatedData.shippingMethod === 'EXPRESS'
        ? 75
        : 50;

    const total = subtotal + shippingCost;

    // Create order
    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        totalAmount: total,
        status: 'PENDING',
        paymentStatus: 'COMPLETED',
        shippingMethod: validatedData.shippingMethod,
        shippingCost,
        items: {
          create: validatedData.items.map((item) => {
            const product = products.find((p) => p.id === item.productId)!;
            return {
              productId: item.productId,
              quantity: item.quantity,
              price: Number(product.price),
            };
          }),
        },
        shippingAddress: {
          create: validatedData.shippingAddress,
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        shippingAddress: true,
      },
    });

    // Update product stock
    for (const item of validatedData.items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          stockQuantity: {
            decrement: item.quantity,
          },
        },
      });
    }

    // Clear user's cart
    const cart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
    });

    if (cart) {
      await prisma.cartItem.deleteMany({
        where: { cartId: cart.id },
      });
    }

    return success({ order }, 201);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return handleError(error.errors[0].message, 400);
    }
    return handleError(error);
  }
}
