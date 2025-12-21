'use client';

import { useState } from 'react';
import { BellIcon } from '@heroicons/react/24/outline';

export default function NewsletterSubscribe() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          firstName,
          source: 'homepage',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setMessage(data.message || 'Successfully subscribed!');
        setEmail('');
        setFirstName('');
      } else {
        setIsSuccess(false);
        setMessage(data.error || 'Failed to subscribe');
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-accent/10 py-16">
      <div className="container-custom max-w-2xl text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/20 rounded-full mb-6">
          <BellIcon className="w-8 h-8 text-accent" />
        </div>
        
        <h2 className="text-3xl md:text-4xl font-serif mb-4">
          Stay Updated on New Arrivals & Exclusive Offers
        </h2>
        <p className="text-primary/70 mb-8 text-lg">
          Be the first to know about new collections, special promotions, and limited edition pieces.
        </p>

        <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="First Name (Optional)"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-primary/20 focus:border-accent focus:outline-none"
            />
            <input
              type="email"
              placeholder="Your Email*"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-primary/20 focus:border-accent focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-accent text-white px-8 py-3 rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {isLoading ? 'Subscribing...' : 'Subscribe to Newsletter'}
          </button>

          {message && (
            <p className={`mt-4 text-sm ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}
        </form>

        <p className="text-xs text-primary/50 mt-4">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
}
