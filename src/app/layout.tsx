import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Playfair_Display, Lato } from 'next/font/google';
import { cn } from '@/lib/utils';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/Toaster';
import { CartProvider } from '@/hooks/useCart';
import { Providers } from '@/components/Providers';
import { ToastProvider } from '@/components/ui/Toast';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Timeless Luxury - Handcrafted Home Decor & Showpieces',
  description:
    'Discover handcrafted home decor, elegant showpieces, and spiritual artifacts. Transform your living spaces with unique pieces that bring positive energy and timeless beauty.',
  keywords: ['home decor', 'showpieces', 'handcrafted', 'Indian decor', 'spiritual artifacts', 'home accessories', 'interior decoration', 'luxury home decor'],
  authors: [{ name: 'Timeless Luxury' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://timelessluxury.com',
    siteName: 'Timeless Luxury',
    title: 'Timeless Luxury - Handcrafted Home Decor & Showpieces',
    description: 'Handcrafted home decor, elegant showpieces, and spiritual artifacts for your home.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Timeless Luxury',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Timeless Luxury - Handcrafted Home Decor',
    description: 'Handcrafted home decor and elegant showpieces for beautiful living spaces.',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn(playfair.variable, lato.variable)}>
      <body className="font-sans bg-secondary text-primary antialiased">
        <Providers>
          <ToastProvider>
            <CartProvider>
              <Header />
              <main className="min-h-screen">{children}</main>
              <Footer />
              <Toaster />
            </CartProvider>
          </ToastProvider>
        </Providers>
      </body>
    </html>
  );
}
