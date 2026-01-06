import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/db';
import { apiRateLimit } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  // Rate limiting
  const rateLimitResult = await apiRateLimit(request);
  if (rateLimitResult) return rateLimitResult;

  try {
    const body = await request.json();
    const { productId, quantity = 1 } = body;

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    // Check if user is authenticated
    const session = await getServerSession();
    
    // Parallel queries for better performance
    const [product, user] = await Promise.all([
      prisma.product.findUnique({
        where: { id: productId },
        select: { id: true, stockQuantity: true, active: true, name: true, price: true, images: true },
      }),
      session?.user?.email ? prisma.user.findUnique({
        where: { email: session.user.email },
        select: { emailVerified: true },
      }) : Promise.resolve(null)
    ]);

    // If user is logged in, check email verification
    if (user && !user.emailVerified) {
      return NextResponse.json(
        { 
          error: 'Please verify your email before adding items to cart',
          code: 'EMAIL_NOT_VERIFIED'
        },
        { status: 403 }
      );
    }

    // Verify product exists and is in stock
    if (!product || !product.active) {
      return NextResponse.json(
        { error: 'Product not found or inactive' },
        { status: 404 }
      );
    }

    if (product.stockQuantity < quantity) {
      return NextResponse.json(
        { error: 'Insufficient stock' },
        { status: 400 }
      );
    }

    // For now, we'll use a session-based cart
    // In production, you'd use user authentication
    const sessionId = request.cookies.get('cart_session')?.value || 
                      `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Find or create cart
    let cart = await prisma.cart.findFirst({
      where: { userId: sessionId },
      include: {
        items: {
          where: { productId },
          take: 1,
        },
      },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId: sessionId },
        include: { items: true },
      });
    }

    // Upsert cart item (update if exists, create if not)
    const existingItem = cart.items[0];
    
    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: { increment: quantity } },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
        },
      });
    }

    // Return simplified response - let client refetch cart
    const response = NextResponse.json({
      success: true,
      message: 'Item added to cart',
    });

    // Set session cookie
    response.cookies.set('cart_session', sessionId, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Cart add error:', error);
    return NextResponse.json(
      { error: 'Failed to add item to cart' },
      { status: 500 }
    );
  }
}
