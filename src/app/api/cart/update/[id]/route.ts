import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { quantity } = body;
    const itemId = params.id;

    if (!quantity || quantity < 0) {
      return NextResponse.json(
        { error: 'Invalid quantity' },
        { status: 400 }
      );
    }

    // If quantity is 0, delete the item
    if (quantity === 0) {
      await prisma.cartItem.delete({
        where: { id: itemId },
      });
    } else {
      // Update quantity
      await prisma.cartItem.update({
        where: { id: itemId },
        data: { quantity },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Cart update error:', error);
    return NextResponse.json(
      { error: 'Failed to update cart item' },
      { status: 500 }
    );
  }
}
