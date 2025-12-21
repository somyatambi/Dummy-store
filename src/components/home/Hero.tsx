'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-primary">
      {/* Background Image/Video */}
      <div className="absolute inset-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1920&q=80)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/50 to-primary/70" />
        </div>
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center">
        <div className="container-custom text-center">
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif text-secondary leading-tight">
              Timeless
              <br />
              <span className="text-accent">Luxury</span>
            </h1>
            <p className="text-xl md:text-2xl text-secondary/90 max-w-2xl mx-auto leading-relaxed">
              Handcrafted showpieces and home decor that transform your living spaces. Each piece brings timeless elegance and positive energy to your home.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Link href="/products" className="btn btn-primary">
                Explore Collection
              </Link>
              <Link href="/about" className="btn btn-outline text-secondary border-secondary hover:bg-secondary hover:text-primary">
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-secondary/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-secondary/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}
