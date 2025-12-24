'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useCart } from '@/hooks/useCart';
import Image from 'next/image';
import { useToast } from '@/components/ui/Toast';

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const { cart, isLoading } = useCart();
  const router = useRouter();
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States',
    phone: '',
    shippingMethod: 'STANDARD' as 'STANDARD' | 'EXPRESS' | 'OVERNIGHT',
  });
  const [step, setStep] = useState<'address' | 'payment'>('address');
  const [isCreatingPayment, setIsCreatingPayment] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);

  // Check authentication
  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/login?callbackUrl=/checkout');
    }
  }, [session, status, router]);

  const items = cart?.items || [];
  const subtotal = items.reduce((sum, item) => sum + Number(item.product.price) * item.quantity, 0);
  const shippingCost =
    formData.shippingMethod === 'OVERNIGHT' ? 999 :
    formData.shippingMethod === 'EXPRESS' ? 499 : 299;
  const total = subtotal + shippingCost;

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePlaceOrder = async () => {
    if (!selectedPaymentMethod) {
      showToast('Please select a payment method', 'error');
      return;
    }

    setIsCreatingPayment(true);

    try {
      const requestBody = {
        shippingAddress: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          street: formData.street,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: formData.country,
          phone: formData.phone,
        },
        shippingMethod: formData.shippingMethod,
        paymentMethod: selectedPaymentMethod,
      };

      console.log('Creating order:', requestBody);

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log('Order response:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create order');
      }

      // Redirect to success page
      router.push(`/orders/success?orderId=${data.data.order.id}`);
    } catch (error: any) {
      console.error('Order creation error:', error);
      showToast(error.message || 'Failed to create order', 'error');
    } finally {
      setIsCreatingPayment(false);
    }
  };

  if (isLoading || status === 'loading') {
    return (
      <div className="min-h-screen bg-secondary py-16">
        <div className="container-custom">
          <div className="text-center">
            <p className="text-lg">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  if (items.length === 0) {
    router.push('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-secondary py-16">
      <div className="container-custom">
        <h1 className="text-4xl md:text-5xl font-serif mb-12">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 'address' ? (
              <form onSubmit={handleAddressSubmit} className="bg-white p-8 rounded-lg">
                <h2 className="text-2xl font-serif mb-6">Shipping Information</h2>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">First Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Street Address *</label>
                    <input
                      type="text"
                      required
                      value={formData.street}
                      onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">City *</label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">State *</label>
                      <input
                        type="text"
                        required
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Postal Code *</label>
                      <input
                        type="text"
                        required
                        value={formData.postalCode}
                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Phone *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-4">Shipping Method *</label>
                    <div className="space-y-3">
                      {[
                        { value: 'STANDARD', label: 'Standard Shipping', price: 299, days: '5-7 business days' },
                        { value: 'EXPRESS', label: 'Express Shipping', price: 499, days: '2-3 business days' },
                        { value: 'OVERNIGHT', label: 'Overnight Shipping', price: 999, days: 'Next business day' },
                      ].map((method) => (
                        <label
                          key={method.value}
                          className="flex items-center justify-between p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-accent transition-colors"
                        >
                          <div className="flex items-center">
                            <input
                              type="radio"
                              name="shippingMethod"
                              value={method.value}
                              checked={formData.shippingMethod === method.value}
                              onChange={(e) =>
                                setFormData({ ...formData, shippingMethod: e.target.value as any })
                              }
                              className="mr-3"
                            />
                            <div>
                              <div className="font-medium">{method.label}</div>
                              <div className="text-sm text-gray-600">{method.days}</div>
                            </div>
                          </div>
                          <div className="font-medium">₹{method.price}</div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isCreatingPayment}
                  className="w-full mt-8 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue to Payment
                </button>
              </form>
            ) : (
              <div className="bg-white p-8 rounded-lg">
                <h2 className="text-2xl font-serif mb-6">Select Payment Method</h2>
                
                <div className="space-y-4 mb-8">
                  {[
                    { id: 'card', label: 'Credit/Debit Card', icon: '💳' },
                    { id: 'upi', label: 'UPI', icon: '📱' },
                    { id: 'netbanking', label: 'Net Banking', icon: '🏦' },
                    { id: 'cod', label: 'Cash on Delivery', icon: '💵' },
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedPaymentMethod === method.id
                          ? 'border-accent bg-accent/5'
                          : 'border-gray-300 hover:border-accent/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={selectedPaymentMethod === method.id}
                        onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                        className="mr-4"
                      />
                      <span className="text-2xl mr-3">{method.icon}</span>
                      <span className="font-medium text-lg">{method.label}</span>
                    </label>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep('address')}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg hover:border-accent transition-colors"
                  >
                    Back to Address
                  </button>
                  <button
                    type="button"
                    onClick={handlePlaceOrder}
                    disabled={!selectedPaymentMethod || isCreatingPayment}
                    className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isCreatingPayment ? 'Processing...' : 'Place Order'}
                  </button>
                </div>

                <p className="text-sm text-gray-600 mt-6 text-center">
                  Payment processing is currently disabled. Orders will be marked as pending.
                </p>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white p-8 rounded-lg sticky top-24">
              <h2 className="text-2xl font-serif mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <Image
                        src={item.product.images[0] || '/placeholder.jpg'}
                        alt={item.product.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.product.name}</h3>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      <p className="text-accent font-medium">
                        ₹{(item.product.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>₹{shippingCost}</span>
                </div>
                <div className="flex justify-between text-lg font-medium pt-2 border-t">
                  <span>Total</span>
                  <span className="text-accent">₹{total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
