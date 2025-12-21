'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function EmailVerificationNotice() {
  const { data: session, status } = useSession();
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState('');

  if (status === 'loading') return null;
  if (!session?.user) return null;

  const handleResendVerification = async () => {
    setIsSending(true);
    setMessage('');

    try {
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: session.user.email }),
      });

      const data = await response.json();
      setMessage(data.message || 'Verification email sent!');
    } catch (error) {
      setMessage('Failed to send verification email');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-yellow-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-yellow-800">
            Email Verification Required
          </h3>
          <p className="mt-2 text-sm text-yellow-700">
            Please verify your email address to add items to your cart and complete purchases.
          </p>
          <div className="mt-4 flex gap-4">
            <button
              onClick={handleResendVerification}
              disabled={isSending}
              className="text-sm font-medium text-yellow-800 hover:text-yellow-900 underline disabled:opacity-50"
            >
              {isSending ? 'Sending...' : 'Resend Verification Email'}
            </button>
          </div>
          {message && (
            <p className="mt-2 text-sm text-yellow-700">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
