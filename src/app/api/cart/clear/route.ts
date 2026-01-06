import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Clear the cart session cookie
    const response = NextResponse.json({
      success: true,
      message: 'Cart cleared',
    });

    // Delete the cart_session cookie
    response.cookies.delete('cart_session');

    return response;
  } catch (error) {
    console.error('Cart clear error:', error);
    return NextResponse.json(
      { error: 'Failed to clear cart' },
      { status: 500 }
    );
  }
}
