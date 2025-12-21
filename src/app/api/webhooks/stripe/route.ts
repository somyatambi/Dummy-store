import { NextRequest } from 'next/server';
import { headers } from 'next/headers';
import { stripe, constructWebhookEvent } from '@/lib/stripe';
import prisma from '@/lib/db';
import { sendOrderConfirmationEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = headers().get('stripe-signature') as string;

  try {
    const event = constructWebhookEvent(body, signature);

    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        
        // Update order status
        const order = await prisma.order.findUnique({
          where: { stripePaymentIntent: paymentIntent.id },
          include: { user: true },
        });

        if (order) {
          await prisma.order.update({
            where: { id: order.id },
            data: { status: 'PROCESSING' },
          });

          // Send confirmation email
          await sendOrderConfirmationEmail(
            order.user.email,
            order.orderNumber,
            Number(order.total)
          );
        }
        break;

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object;
        
        // Update order status to cancelled
        await prisma.order.updateMany({
          where: { stripePaymentIntent: failedPayment.id },
          data: { status: 'CANCELLED' },
        });
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(JSON.stringify({ error: 'Webhook handler failed' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
