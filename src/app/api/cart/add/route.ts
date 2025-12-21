import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
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
    
    // If user is logged in, check email verification
    if (session?.user?.email) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { emailVerified: true, email: true },
      });

      if (user && !user.emailVerified) {
        return NextResponse.json(
          { 
            error: 'Please verify your email before adding items to cart',
            code: 'EMAIL_NOT_VERIFIED'
          },
          { status: 403 }
        );
      }
    }

    // Verify product exists and is in stock
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { id: true, stockQuantity: true, active: true },
    });

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
      where: { userId: sessionId }, // Using sessionId as userId for guest carts
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId: sessionId,
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });
    }

    // Check if item already exists in cart
    const existingItem = cart.items.find((item) => item.productId === productId);

    if (existingItem) {
      // Update quantity
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity + quantity,
        },
      });
    } else {
      // Add new item
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
        },
      });
    }

    // Fetch updated cart
    const updatedCart = await prisma.cart.findUnique({
      where: { id: cart.id },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                images: true,
              },
            },
          },
        },
      },
    });

    const response = NextResponse.json({
      success: true,
      cart: updatedCart,
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
