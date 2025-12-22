import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-config';
import { prisma } from '@/lib/db';

const checkoutSchema = {
  shippingAddress: {
    firstName: (v: any) => typeof v === 'string' && v.length > 0,
    lastName: (v: any) => typeof v === 'string' && v.length > 0,
    street: (v: any) => typeof v === 'string' && v.length > 0,
    city: (v: any) => typeof v === 'string' && v.length > 0,
    state: (v: any) => typeof v === 'string' && v.length > 0,
    postalCode: (v: any) => typeof v === 'string' && v.length > 0,
    country: (v: any) => typeof v === 'string' && v.length > 0,
    phone: (v: any) => typeof v === 'string' && v.length > 0,
  },
  shippingMethod: (v: any) => ['STANDARD', 'EXPRESS', 'OVERNIGHT'].includes(v),
};

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    // Get user ID from session or cookie
    let cartUserId: string | undefined;
    let authenticatedUserId: string | undefined;
    
    if (session?.user?.email) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      });
      authenticatedUserId = user?.id;
      cartUserId = user?.id;
    }
    
    // Also check for guest session cookie
    const cookies = request.headers.get('cookie');
    const sessionMatch = cookies?.match(/cart_session=([^;]+)/);
    const guestSessionId = sessionMatch ? sessionMatch[1] : undefined;

    if (!cartUserId && !guestSessionId) {
      return NextResponse.json(
        { error: 'Please login or add items to cart first' },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Try to find cart with authenticated user ID first, then with guest session
    let cart = null;
    
    if (cartUserId) {
      cart = await prisma.cart.findUnique({
        where: { userId: cartUserId },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });
    }
    
    // If no cart found with user ID, try guest session
    if (!cart && guestSessionId) {
      cart = await prisma.cart.findUnique({
        where: { userId: guestSessionId },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });
    }

    if (!cart || cart.items.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      );
    }

    // Validate stock availability
    for (const item of cart.items) {
      if (item.product.stockQuantity < item.quantity) {
        return NextResponse.json(
          { error: `${item.product.name} is out of stock or has insufficient quantity` },
          { status: 400 }
        );
      }
    }

    // Calculate totals
    const subtotal = cart.items.reduce(
      (sum, item) => sum + Number(item.product.price) * item.quantity,
      0
    );

    const shippingMethod = body.shippingMethod || 'STANDARD';
    const shippingCost = 
      shippingMethod === 'OVERNIGHT' ? 999 :
      shippingMethod === 'EXPRESS' ? 499 : 299;

    const tax = subtotal * 0.18; // 18% GST (Indian tax)
    const total = subtotal + shippingCost + tax;

    // Generate unique order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Create or get address if user is authenticated
    let addressId: string | undefined;
    
    if (authenticatedUserId && body.shippingAddress) {
      const address = await prisma.address.create({
        data: {
          userId: authenticatedUserId,
          firstName: body.shippingAddress.firstName,
          lastName: body.shippingAddress.lastName,
          address1: body.shippingAddress.street,
          city: body.shippingAddress.city,
          state: body.shippingAddress.state,
          postalCode: body.shippingAddress.postalCode,
          country: body.shippingAddress.country || 'US',
          phone: body.shippingAddress.phone,
          isDefault: false,
        },
      });
      addressId = address.id;
    }

    // Create order - only if user is authenticated
    let order;
    if (authenticatedUserId) {
      order = await prisma.order.create({
        data: {
          orderNumber,
          userId: authenticatedUserId,
          status: 'PENDING',
          subtotal,
          tax,
          shippingCost,
          total,
          paymentMethod: body.paymentMethod || 'pending',
          shippingAddressId: addressId,
          items: {
            create: cart.items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: Number(item.product.price),
              subtotal: Number(item.product.price) * item.quantity,
            })),
          },
        },
      });

      // Update product stock
      for (const item of cart.items) {
        await prisma.product.update({
          where: { id: item.productId },
          data: {
            stockQuantity: {
              decrement: item.quantity,
            },
          },
        });
      }

      // Clear the cart
      await prisma.cartItem.deleteMany({
        where: { cartId: cart.id },
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        order: {
          id: order?.id,
          orderNumber,
        },
        amount: total,
      },
    });
  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout' },
      { status: 500 }
    );
  }
}
