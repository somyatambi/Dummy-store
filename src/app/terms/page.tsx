export const metadata = {
  title: 'Terms of Service | Timeless Luxury',
  description: 'Terms and conditions for using our website and services.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-secondary py-16">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-serif mb-8">Terms of Service</h1>
          <p className="text-sm text-primary/60 mb-12">Last updated: November 11, 2025</p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-serif mb-4">Agreement to Terms</h2>
              <p className="text-primary/80 leading-relaxed">
                By accessing and using the Timeless Luxury website, you agree to be bound by these Terms of Service 
                and all applicable laws and regulations. If you do not agree with any of these terms, you are 
                prohibited from using this site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">Use License</h2>
              <p className="text-primary/80 leading-relaxed mb-4">
                Permission is granted to temporarily access the materials on Timeless Luxury's website for personal, 
                non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and 
                under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-2 text-primary/80">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose</li>
                <li>Attempt to reverse engineer any software on our website</li>
                <li>Remove any copyright or proprietary notations</li>
                <li>Transfer the materials to another person or mirror the materials on any other server</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">Product Information</h2>
              <p className="text-primary/80 leading-relaxed">
                We strive to provide accurate product descriptions, images, and pricing. However, we cannot guarantee 
                that all information is completely accurate, current, or error-free. We reserve the right to correct 
                any errors, inaccuracies, or omissions and to change or update information at any time without prior 
                notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">Pricing and Payments</h2>
              <p className="text-primary/80 leading-relaxed">
                All prices are listed in USD and are subject to change without notice. We accept various payment 
                methods including credit cards, UPI, and net banking. Payment must be received in full before items 
                are shipped. We reserve the right to refuse or cancel any order for any reason.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">Shipping and Delivery</h2>
              <p className="text-primary/80 leading-relaxed">
                Shipping costs and delivery times vary based on your location and chosen shipping method. We use 
                reputable carriers and provide tracking information once your order ships. We are not responsible for 
                delays caused by customs, weather, or carrier issues beyond our control.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">Returns and Refunds</h2>
              <p className="text-primary/80 leading-relaxed">
                Due to the unique and valuable nature of our products, we have a strict authentication and quality 
                control process. All sales are final unless the item received is significantly not as described or 
                damaged during shipping. Returns must be requested within 7 days of delivery and are subject to our 
                approval.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">Authenticity Guarantee</h2>
              <p className="text-primary/80 leading-relaxed">
                We guarantee the authenticity of all items sold on our platform. Each piece comes with appropriate 
                documentation and certification where applicable. If an item is found to be inauthentic, we will 
                provide a full refund including shipping costs.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">Account Responsibilities</h2>
              <p className="text-primary/80 leading-relaxed">
                You are responsible for maintaining the confidentiality of your account credentials and for all 
                activities that occur under your account. You must notify us immediately of any unauthorized use of 
                your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">Intellectual Property</h2>
              <p className="text-primary/80 leading-relaxed">
                All content on this website, including text, graphics, logos, images, and software, is the property 
                of Timeless Luxury or its content suppliers and is protected by international copyright laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">Limitation of Liability</h2>
              <p className="text-primary/80 leading-relaxed">
                Timeless Luxury shall not be liable for any direct, indirect, incidental, consequential, or punitive 
                damages arising from your use of our website or products. Our maximum liability shall not exceed the 
                amount you paid for the product in question.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">Governing Law</h2>
              <p className="text-primary/80 leading-relaxed">
                These terms shall be governed by and construed in accordance with the laws of the jurisdiction in 
                which our company is registered, without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">Changes to Terms</h2>
              <p className="text-primary/80 leading-relaxed">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon 
                posting to the website. Your continued use of the website after changes constitutes acceptance of the 
                modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">Contact Information</h2>
              <p className="text-primary/80 leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="mt-4 text-primary/80">
                <p>Email: legal@timelessluxury.com</p>
                <p>Phone: +1 (555) 123-4567</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
