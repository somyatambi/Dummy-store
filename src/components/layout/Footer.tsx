import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-secondary">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-serif mb-4">Timeless Luxury</h3>
            <p className="text-sm text-secondary/70 leading-relaxed">
              Handcrafted showpieces and home decor that transform your living spaces with timeless elegance.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-medium mb-4 text-accent">Shop</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/products" className="text-sm text-secondary/70 hover:text-accent transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products?featured=true" className="text-sm text-secondary/70 hover:text-accent transition-colors">
                  Featured Collection
                </Link>
              </li>
              <li>
                <Link href="/products?sort=newest" className="text-sm text-secondary/70 hover:text-accent transition-colors">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-medium mb-4 text-accent">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm text-secondary/70 hover:text-accent transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-secondary/70 hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-secondary/70 hover:text-accent transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-secondary/70 hover:text-accent transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-medium mb-4 text-accent">Customer Service</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/shipping" className="text-sm text-secondary/70 hover:text-accent transition-colors">
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-sm text-secondary/70 hover:text-accent transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/authentication" className="text-sm text-secondary/70 hover:text-accent transition-colors">
                  Authentication
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-secondary/70 hover:text-accent transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-secondary/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-secondary/70">
              &copy; {currentYear} Timeless Luxury. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary/70 hover:text-accent transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary/70 hover:text-accent transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary/70 hover:text-accent transition-colors"
                aria-label="Pinterest"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0a12 12 0 00-4.037 23.3c-.065-.586-.013-1.29.157-1.93l1.214-5.14s-.309-.62-.309-1.535c0-1.44.835-2.515 1.874-2.515.884 0 1.311.664 1.311 1.458 0 .888-.566 2.217-.858 3.448-.244 1.033.518 1.875 1.537 1.875 1.845 0 3.265-1.947 3.265-4.753 0-2.485-1.786-4.223-4.336-4.223-2.954 0-4.693 2.216-4.693 4.51 0 .893.343 1.85.77 2.37a.31.31 0 01.071.3c-.078.324-.252 1.028-.286 1.172-.045.19-.148.23-.341.139-1.294-.603-2.103-2.495-2.103-4.016 0-3.272 2.378-6.28 6.858-6.28 3.601 0 6.4 2.567 6.4 5.996 0 3.577-2.255 6.454-5.389 6.454-1.053 0-2.043-.547-2.382-1.193 0 0-.521 1.984-.648 2.47-.235.901-.869 2.03-1.294 2.72A12 12 0 1012 0z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
