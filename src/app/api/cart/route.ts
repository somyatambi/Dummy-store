import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/db';
import { handleError, success } from '@/lib/api-utils';
import { addToCartSchema } from '@/lib/validation';
import { apiRateLimit } from '@/lib/rate-limit';

// GET /api/cart - Get current user's cart
export async function GET(request: NextRequest) {
  // Rate limiting
  const rateLimitResult = await apiRateLimit(request);
  if (rateLimitResult) return rateLimitResult;
  try {
    // Try to get authenticated user
    const session = await getServerSession();
    let userId = session?.user?.id;

    // If not authenticated, use session cart
    if (!userId) {
      const sessionId = request.cookies.get('cart_session')?.value;
      if (!sessionId) {
        return success({ cart: null, items: [] });
      }
      userId = sessionId;
    }

    const cart = await prisma.cart.findFirst({
      where: { userId },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                slug: true,
                price: true,
                images: true,
                stockQuantity: true,
              },
            },
          },
        },
      },
    });

    if (!cart) {
      return success({ cart: null, items: [] });
    }

    return success({ cart, items: cart.items });
  } catch (error) {
    return handleError(error);
  }
}

// POST /api/cart/add - Add item to cart
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return handleError({ statusCode: 401, message: 'Unauthorized' });
    }

    const body = await request.json();
    const { productId, quantity } = addToCartSchema.parse(body);

    // Check if product exists and has sufficient stock
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return handleError({ statusCode: 404, message: 'Product not found' });
    }

    if (product.stockQuantity < quantity) {
      return handleError({ statusCode: 400, message: 'Insufficient stock' });
    }

    // Get or create cart
    let cart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId: session.user.id },
      });
    }

    // Check if item already exists in cart
    const existingItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
    });

    if (existingItem) {
      // Update quantity
      const newQuantity = existingItem.quantity + quantity;
      if (product.stockQuantity < newQuantity) {
        return handleError({ statusCode: 400, message: 'Insufficient stock' });
      }

      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: newQuantity },
      });
    } else {
      // Create new cart item
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
        },
      });
    }

    return success({ message: 'Item added to cart' });
  } catch (error) {
    return handleError(error);
  }
}
