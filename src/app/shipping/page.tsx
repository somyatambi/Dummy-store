export const metadata = {
  title: 'Shipping Information | Timeless Luxury',
  description: 'Learn about our shipping methods, costs, and delivery times.',
};

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-secondary py-16">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-serif mb-8">Shipping Information</h1>
          
          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-serif mb-4">Shipping Methods</h2>
              <p className="text-primary/80 leading-relaxed mb-6">
                We offer multiple shipping options to ensure your luxury items arrive safely and at your convenience.
              </p>
              
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg border border-primary/10">
                  <h3 className="text-xl font-medium mb-2">Standard Shipping - ₹299</h3>
                  <p className="text-primary/70 mb-2">Delivery in 5-7 business days</p>
                  <p className="text-sm text-primary/60">
                    Standard insured shipping with signature confirmation. Tracking provided.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg border border-primary/10">
                  <h3 className="text-xl font-medium mb-2">Express Shipping - ₹499</h3>
                  <p className="text-primary/70 mb-2">Delivery in 2-3 business days</p>
                  <p className="text-sm text-primary/60">
                    Expedited insured shipping with priority handling and signature confirmation.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg border border-primary/10">
                  <h3 className="text-xl font-medium mb-2">Overnight Shipping - ₹999</h3>
                  <p className="text-primary/70 mb-2">Next business day delivery</p>
                  <p className="text-sm text-primary/60">
                    Premium overnight service with full insurance and signature required.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">International Shipping</h2>
              <p className="text-primary/80 leading-relaxed">
                We ship worldwide with specialized carriers experienced in handling valuable artifacts. International 
                shipping costs and delivery times vary by destination. Customers are responsible for any customs 
                duties, taxes, or fees imposed by their country. We provide all necessary documentation for customs 
                clearance.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">Packaging</h2>
              <p className="text-primary/80 leading-relaxed">
                Each item is meticulously packaged using museum-quality materials to ensure maximum protection during 
                transit. We use custom-fitted boxes, shock-absorbing materials, and discreet packaging to protect both 
                the item and your privacy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">Insurance</h2>
              <p className="text-primary/80 leading-relaxed">
                All shipments are fully insured for their declared value at no additional cost. In the rare event of 
                damage or loss during transit, we will work directly with the carrier to resolve the claim and ensure 
                you receive a replacement or full refund.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">Tracking</h2>
              <p className="text-primary/80 leading-relaxed">
                Once your order ships, you will receive a tracking number via email. You can monitor your shipment's 
                progress in real-time through your account or the carrier's website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">Delivery Requirements</h2>
              <p className="text-primary/80 leading-relaxed mb-4">
                Due to the value of our items, all deliveries require:
              </p>
              <ul className="list-disc list-inside space-y-2 text-primary/80">
                <li>Signature confirmation from an adult (18+)</li>
                <li>Valid government-issued ID verification</li>
                <li>Delivery to a physical address (no PO boxes)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">Processing Time</h2>
              <p className="text-primary/80 leading-relaxed">
                Orders are typically processed and shipped within 1-2 business days. During peak seasons or for 
                particularly delicate items requiring specialized packaging, processing may take up to 3-5 business 
                days. We will notify you if there are any delays.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">Questions?</h2>
              <p className="text-primary/80 leading-relaxed">
                If you have specific questions about shipping or need a custom shipping solution for your location, 
                please contact our customer service team.
              </p>
              <div className="mt-4 text-primary/80">
                <p>Email: shipping@timelessluxury.com</p>
                <p>Phone: +1 (555) 123-4567</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
