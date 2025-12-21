export const metadata = {
  title: 'Privacy Policy | Timeless Luxury',
  description: 'Our commitment to protecting your privacy and personal information.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-secondary py-16">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-serif mb-8">Privacy Policy</h1>
          <p className="text-sm text-primary/60 mb-12">Last updated: November 11, 2025</p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-serif mb-4">Introduction</h2>
              <p className="text-primary/80 leading-relaxed">
                At Timeless Luxury, we respect your privacy and are committed to protecting your personal information. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you 
                visit our website or make a purchase.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">Information We Collect</h2>
              <p className="text-primary/80 leading-relaxed mb-4">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-primary/80">
                <li>Name, email address, and phone number</li>
                <li>Billing and shipping addresses</li>
                <li>Payment information (processed securely through our payment providers)</li>
                <li>Order history and preferences</li>
                <li>Communications with our customer service team</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">How We Use Your Information</h2>
              <p className="text-primary/80 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-primary/80">
                <li>Process and fulfill your orders</li>
                <li>Communicate with you about your orders and account</li>
                <li>Provide customer support</li>
                <li>Send you marketing communications (with your consent)</li>
                <li>Improve our website and services</li>
                <li>Prevent fraud and enhance security</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">Information Sharing</h2>
              <p className="text-primary/80 leading-relaxed">
                We do not sell or rent your personal information to third parties. We may share your information with:
              </p>
              <ul className="list-disc list-inside space-y-2 text-primary/80 mt-4">
                <li>Service providers who assist in operating our website and conducting our business</li>
                <li>Payment processors to handle transactions securely</li>
                <li>Shipping companies to deliver your orders</li>
                <li>Legal authorities when required by law</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">Data Security</h2>
              <p className="text-primary/80 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal information 
                against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission 
                over the internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">Your Rights</h2>
              <p className="text-primary/80 leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-primary/80">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of marketing communications</li>
                <li>Object to processing of your personal information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">Cookies</h2>
              <p className="text-primary/80 leading-relaxed">
                We use cookies and similar tracking technologies to enhance your browsing experience, analyze site 
                traffic, and understand where our visitors are coming from. You can control cookies through your 
                browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">Changes to This Policy</h2>
              <p className="text-primary/80 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
                the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">Contact Us</h2>
              <p className="text-primary/80 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="mt-4 text-primary/80">
                <p>Email: privacy@timelessluxury.com</p>
                <p>Phone: +1 (555) 123-4567</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
