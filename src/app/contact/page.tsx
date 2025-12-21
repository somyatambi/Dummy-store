'use client';

import { useState } from 'react';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-secondary py-16">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-serif mb-6">Get in Touch</h1>
            <p className="text-xl text-primary/70 max-w-2xl mx-auto">
              Have a question about a piece? Interested in a private viewing? We'd love to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-serif mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-secondary border border-primary/20 rounded-lg focus:outline-none focus:border-accent"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-secondary border border-primary/20 rounded-lg focus:outline-none focus:border-accent"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-secondary border border-primary/20 rounded-lg focus:outline-none focus:border-accent"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-secondary border border-primary/20 rounded-lg focus:outline-none focus:border-accent resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full btn-primary disabled:opacity-50"
                >
                  {status === 'loading' ? 'Sending...' : 'Send Message'}
                </button>

                {status === 'success' && (
                  <p className="text-green-600 text-center">Message sent successfully!</p>
                )}
                {status === 'error' && (
                  <p className="text-red-600 text-center">Failed to send message. Please try again.</p>
                )}
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-serif mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <EnvelopeIcon className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <a href="mailto:inquiries@timelessluxury.com" className="text-primary/70 hover:text-accent">
                      inquiries@timelessluxury.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <PhoneIcon className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium mb-1">Phone</h3>
                    <a href="tel:+12125551234" className="text-primary/70 hover:text-accent">
                      +1 (212) 555-1234
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPinIcon className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium mb-1">Location</h3>
                    <p className="text-primary/70">
                      123 Madison Avenue<br />
                      New York, NY 10016<br />
                      United States
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 bg-primary/5 rounded-lg">
                <h3 className="font-serif text-lg mb-3">Private Viewings</h3>
                <p className="text-primary/70 text-sm">
                  We offer private viewings by appointment for serious collectors. Please contact us
                  to schedule a personalized consultation.
                </p>
              </div>

              <div className="mt-6 p-6 bg-accent/10 rounded-lg">
                <h3 className="font-serif text-lg mb-3">Business Hours</h3>
                <div className="text-primary/70 text-sm space-y-1">
                  <p>Monday - Friday: 10:00 AM - 6:00 PM</p>
                  <p>Saturday: 11:00 AM - 4:00 PM</p>
                  <p>Sunday: By Appointment Only</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
