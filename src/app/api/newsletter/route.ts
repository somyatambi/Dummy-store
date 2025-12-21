import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, firstName, lastName, source = 'homepage' } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Check if already subscribed
    const existing = await prisma.newsletter.findUnique({
      where: { email },
    });

    if (existing) {
      if (existing.subscribed) {
        return NextResponse.json(
          { message: 'You are already subscribed to our newsletter' },
          { status: 200 }
        );
      } else {
        // Resubscribe
        await prisma.newsletter.update({
          where: { email },
          data: { 
            subscribed: true,
            firstName: firstName || existing.firstName,
            lastName: lastName || existing.lastName,
          },
        });
        return NextResponse.json(
          { message: 'Welcome back! You have been resubscribed' },
          { status: 200 }
        );
      }
    }

    // Create new subscription
    await prisma.newsletter.create({
      data: {
        email,
        firstName,
        lastName,
        source,
        subscribed: true,
      },
    });

    return NextResponse.json(
      { message: 'Successfully subscribed to newsletter!' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    );
  }
}

// Unsubscribe endpoint
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    await prisma.newsletter.update({
      where: { email },
      data: { subscribed: false },
    });

    return NextResponse.json(
      { message: 'Successfully unsubscribed' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    return NextResponse.json(
      { error: 'Failed to unsubscribe' },
      { status: 500 }
    );
  }
}
