export const metadata = {
  title: 'Returns & Exchanges | Timeless Luxury',
  description: 'Our return and exchange policy for your peace of mind.',
};

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-secondary py-16">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-serif mb-8">Returns & Exchanges</h1>
          
          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-serif mb-4">Our Commitment</h2>
              <p className="text-primary/80 leading-relaxed">
                Your satisfaction is our priority. We understand that purchasing luxury artifacts is a significant 
                investment, and we want you to be completely confident in your purchase. While our items are carefully 
                curated and described, we offer a fair return policy to ensure your peace of mind.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">Return Eligibility</h2>
              <p className="text-primary/80 leading-relaxed mb-4">
                Returns are accepted within 7 days of delivery under the following conditions:
              </p>
              <ul className="list-disc list-inside space-y-2 text-primary/80">
                <li>Item is significantly not as described in the listing</li>
                <li>Item was damaged during shipping (must be reported within 48 hours of delivery)</li>
                <li>Item received is different from what was ordered</li>
                <li>Authenticity concerns (subject to verification)</li>
              </ul>
              <p className="text-primary/80 leading-relaxed mt-4">
                Items must be returned in their original condition, with all documentation and packaging materials.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">Non-Returnable Items</h2>
              <p className="text-primary/80 leading-relaxed mb-4">
                The following items cannot be returned:
              </p>
              <ul className="list-disc list-inside space-y-2 text-primary/80">
                <li>Custom or specially ordered items</li>
                <li>Items that have been altered or modified</li>
                <li>Items damaged due to mishandling after delivery</li>
                <li>Items returned after the 7-day period</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">Return Process</h2>
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-lg border border-primary/10">
                  <h3 className="text-lg font-medium mb-2">Step 1: Contact Us</h3>
                  <p className="text-primary/70 text-sm">
                    Email returns@timelessluxury.com within 7 days of delivery with your order number and reason 
                    for return. Include photos if the item is damaged or not as described.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg border border-primary/10">
                  <h3 className="text-lg font-medium mb-2">Step 2: Receive Authorization</h3>
                  <p className="text-primary/70 text-sm">
                    Our team will review your request and provide a Return Authorization (RA) number and detailed 
                    return instructions. Do not ship items without authorization.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg border border-primary/10">
                  <h3 className="text-lg font-medium mb-2">Step 3: Ship the Item</h3>
                  <p className="text-primary/70 text-sm">
                    Pack the item securely using the original packaging. Ship via a tracked and insured method. 
                    You are responsible for return shipping costs unless the return is due to our error or a 
                    defective item.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg border border-primary/10">
                  <h3 className="text-lg font-medium mb-2">Step 4: Inspection & Refund</h3>
                  <p className="text-primary/70 text-sm">
                    Once we receive and inspect the item, we will process your refund within 5-7 business days. 
                    Refunds are issued to the original payment method.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">Exchanges</h2>
              <p className="text-primary/80 leading-relaxed">
                We do not offer direct exchanges. If you wish to exchange an item, please return it following our 
                return process and place a new order for the desired item. This ensures faster processing and 
                availability confirmation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">Damaged Items</h2>
              <p className="text-primary/80 leading-relaxed">
                If your item arrives damaged, please:
              </p>
              <ul className="list-disc list-inside space-y-2 text-primary/80 mt-4">
                <li>Do not discard any packaging materials</li>
                <li>Take photos of the damage and all packaging</li>
                <li>Contact us within 48 hours at damage@timelessluxury.com</li>
                <li>Keep all documentation for insurance purposes</li>
              </ul>
              <p className="text-primary/80 leading-relaxed mt-4">
                We will work with you to either replace the item or provide a full refund, including original 
                shipping costs.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">Refund Processing</h2>
              <p className="text-primary/80 leading-relaxed">
                Approved refunds are processed within 5-7 business days of receiving and inspecting the returned 
                item. Please allow an additional 5-10 business days for the refund to appear in your account, 
                depending on your payment provider.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">International Returns</h2>
              <p className="text-primary/80 leading-relaxed">
                International returns follow the same policy but may require additional customs documentation. 
                Customers are responsible for any customs fees, duties, or taxes associated with the return shipment.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">Questions?</h2>
              <p className="text-primary/80 leading-relaxed">
                If you have questions about our return policy or need assistance with a return, please contact us:
              </p>
              <div className="mt-4 text-primary/80">
                <p>Email: returns@timelessluxury.com</p>
                <p>Phone: +1 (555) 123-4567</p>
                <p>Hours: Monday - Friday, 9 AM - 6 PM EST</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
