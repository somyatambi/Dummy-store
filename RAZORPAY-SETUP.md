# Razorpay Payment Integration Guide

## Setup Razorpay Account

1. **Sign up**: https://dashboard.razorpay.com/signup
2. **Complete KYC**: 
   - Business Details
   - PAN Card
   - Bank Account
   - Aadhaar (for proprietorship)
3. **Get API Keys**: https://dashboard.razorpay.com/app/keys
   - Test Key ID: `rzp_test_xxxxx`
   - Test Key Secret: `xxxxx`

## Supported Payment Methods

### Razorpay supports:
- ✅ **UPI** (Google Pay, PhonePe, Paytm, BHIM, etc.)
- ✅ **Net Banking** (All major banks)
- ✅ **Debit/Credit Cards**
- ✅ **Wallets** (Paytm, Mobikwik, etc.)
- ✅ **EMI Options**
- ✅ **Pay Later** (LazyPay, Simpl)

## Environment Variables

Add to your `.env.local`:

```bash
# Razorpay
RAZORPAY_KEY_ID="rzp_test_xxxxx"
RAZORPAY_KEY_SECRET="xxxxx"
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_xxxxx"
```

## Transaction Fees

- **Domestic Payments**: 2% per transaction
- **International Cards**: 3% + ₹2 per transaction
- **No setup fees**
- **No maintenance fees**

## Test Mode

### Test UPI VPAs:
- **Success**: `success@razorpay`
- **Failure**: `failure@razorpay`

### Test Cards:
- **Card Number**: 4111 1111 1111 1111
- **CVV**: Any 3 digits
- **Expiry**: Any future date

### Test Net Banking:
- Select any bank and use provided test credentials

## Go Live Checklist

1. Complete KYC verification
2. Get Live API Keys
3. Replace Test Keys with Live Keys
4. Set up Webhooks for payment confirmations
5. Enable required payment methods in dashboard
6. Test with real account before production

## Webhook Setup

1. Go to: https://dashboard.razorpay.com/app/webhooks
2. Add webhook URL: `https://yourdomain.com/api/webhooks/razorpay`
3. Select events:
   - payment.authorized
   - payment.captured
   - payment.failed
   - order.paid

## Support

- Docs: https://razorpay.com/docs/
- Support: https://dashboard.razorpay.com/app/dashboard#support
- Email: support@razorpay.com
- Phone: +91 76206 87799
