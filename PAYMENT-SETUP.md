# Payment Integration Guide

## Supported Payment Methods

The checkout system uses **Stripe** with automatic payment methods enabled, supporting:

### Currently Active (USD Currency)
- ✅ **Credit/Debit Cards** (Visa, Mastercard, Amex, etc.)
- ✅ **Link** (Stripe's one-click checkout)
- ✅ **US Bank Accounts** (ACH Direct Debit)
- ✅ **Apple Pay / Google Pay** (when available)
- ✅ **Other automatic payment methods** based on customer location

### UPI Support (INR Currency)

To enable **UPI payments** for Indian customers:

1. **Update Checkout API** (`src/app/api/checkout/route.ts`):

```typescript
const paymentIntent = await stripe.paymentIntents.create({
  amount: Math.round(total * 100),
  currency: 'inr', // Change from 'usd' to 'inr'
  payment_method_types: ['card', 'upi'], // Explicitly enable UPI
  metadata: {
    userId,
    cartId: cart.id,
    shippingMethod: validatedData.shippingMethod,
  },
  automatic_payment_methods: {
    enabled: true,
    allow_redirects: 'always', // Required for UPI
  },
});
```

2. **Update Product Prices**:
   - Convert all prices from USD to INR in your database
   - Update `formatCurrency` function to display ₹ instead of $

3. **Stripe Dashboard Setup**:
   - Enable UPI in Stripe Dashboard → Settings → Payment Methods
   - Add Indian business details and bank account
   - Complete KYC verification for Indian payments

## How It Works

### 1. Checkout Flow
```
Cart → Shipping Address → Payment Method Selection → Complete Purchase
```

### 2. Payment Element
The `PaymentElement` component automatically displays available payment methods based on:
- Currency (USD/INR/etc.)
- Customer location
- Enabled payment methods in Stripe Dashboard
- Device capabilities (mobile wallet support)

### 3. Redirect Handling
Some payment methods (like UPI, iDEAL, Bancontact) require redirects:
- Customer is redirected to their payment app/bank
- After completing payment, they're redirected back to `/orders/success`
- Order status is updated via Stripe webhooks (if implemented)

## Configuration

### Environment Variables
```env
# Required
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."

# Optional: For production webhooks
STRIPE_WEBHOOK_SECRET="whsec_..."
```

### Stripe Dashboard Settings

1. **Enable Payment Methods**:
   - Go to Settings → Payment Methods
   - Enable desired methods:
     - Cards (always enabled)
     - Link
     - ACH Direct Debit (US)
     - UPI (India - requires INR)
     - Wallets (Apple Pay, Google Pay)

2. **Automatic Payment Methods**:
   - Automatically offers relevant payment options
   - Based on customer location and currency
   - No additional code changes needed

3. **Test Mode**:
   - Use test card: `4242 4242 4242 4242`
   - UPI test: Use test VPA `success@razorpay` (in test mode)
   - Any future expiry date and any 3-digit CVC

## Multi-Currency Support

To support multiple currencies:

1. **Detect Customer Location**:
```typescript
const detectCurrency = (country: string) => {
  const currencyMap = {
    US: 'usd',
    IN: 'inr',
    GB: 'gbp',
    EU: 'eur',
    // Add more countries
  };
  return currencyMap[country] || 'usd';
};
```

2. **Dynamic Payment Intent**:
```typescript
const currency = detectCurrency(shippingAddress.country);
const paymentIntent = await stripe.paymentIntents.create({
  amount: convertAmount(total, currency),
  currency: currency.toLowerCase(),
  payment_method_types: getPaymentMethodsForCurrency(currency),
  // ...
});
```

3. **Update UI**:
```typescript
const currencySymbols = {
  usd: '$',
  inr: '₹',
  gbp: '£',
  eur: '€',
};
```

## Adding More Payment Methods

### Klarna, Afterpay, etc.
```typescript
automatic_payment_methods: {
  enabled: true,
  allow_redirects: 'always',
}
// Automatically includes these when available for the currency
```

### Crypto Payments
Requires separate Stripe Crypto setup and different integration.

### Bank Transfers
```typescript
payment_method_types: ['customer_balance', 'bank_transfer']
```

## Testing UPI Payments

1. **Test Mode VPA**:
   - Use VPA: `success@razorpay` for successful payment
   - Use VPA: `failure@razorpay` for failed payment

2. **Test Flow**:
   - Enter test VPA in payment form
   - Click pay → Redirects to test bank page
   - Approve payment
   - Redirected back to success page

## Production Checklist

- [ ] Switch to live Stripe keys
- [ ] Enable production payment methods in dashboard
- [ ] Complete business verification
- [ ] Set up webhook endpoints for payment confirmations
- [ ] Add proper error handling for failed payments
- [ ] Implement retry logic for declined cards
- [ ] Add email notifications for successful payments
- [ ] Test with real payment methods in test mode
- [ ] Configure 3D Secure for cards (SCA compliance)
- [ ] Set up Stripe Radar for fraud prevention

## Webhook Implementation (Recommended)

To handle async payment updates:

```typescript
// src/app/api/webhooks/stripe/route.ts
import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
  const sig = req.headers.get('stripe-signature');
  const body = await req.text();
  
  const event = stripe.webhooks.constructEvent(
    body,
    sig!,
    process.env.STRIPE_WEBHOOK_SECRET!
  );
  
  if (event.type === 'payment_intent.succeeded') {
    // Update order status to PROCESSING
    await updateOrderStatus(event.data.object.metadata.orderId, 'PROCESSING');
  }
  
  return new Response('OK', { status: 200 });
}
```

## Support & Documentation

- [Stripe Payment Methods](https://stripe.com/docs/payments/payment-methods/overview)
- [UPI Integration](https://stripe.com/docs/payments/upi)
- [Payment Element](https://stripe.com/docs/payments/payment-element)
- [Testing Payments](https://stripe.com/docs/testing)
