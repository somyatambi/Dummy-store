'use client';

import { useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ShoppingBagIcon, 
  UserCircleIcon, 
  CreditCardIcon,
  MapPinIcon,
  ArrowRightOnRectangleIcon 
} from '@heroicons/react/24/outline';

export default function AccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/login');
    }
  }, [session, status, router]);

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const menuItems = [
    {
      title: 'My Orders',
      description: 'Track, return, or buy things again',
      icon: ShoppingBagIcon,
      href: '/account/orders',
    },
    {
      title: 'Profile Settings',
      description: 'Edit your name, email and password',
      icon: UserCircleIcon,
      href: '/account/profile',
    },
    {
      title: 'Payment Methods',
      description: 'Manage payment methods and billing',
      icon: CreditCardIcon,
      href: '/account/payment-methods',
    },
    {
      title: 'Addresses',
      description: 'Edit addresses for orders and gifts',
      icon: MapPinIcon,
      href: '/account/addresses',
    },
  ];

  return (
    <div className="min-h-screen bg-secondary py-16">
      <div className="container-custom max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-serif mb-2">My Account</h1>
          <p className="text-gray-600">Welcome back, {session.user?.name || session.user?.email}</p>
        </div>

        {/* Account Overview */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-secondary rounded-lg group-hover:bg-accent/10 transition-colors">
                  <item.icon className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-serif mb-1 group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Account Info Card */}
        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-serif mb-6">Account Information</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{session.user?.name || 'Not set'}</p>
              </div>
              <Link href="/account/profile" className="text-accent text-sm hover:underline">
                Edit
              </Link>
            </div>

            <div className="flex justify-between items-center py-3 border-b">
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{session.user?.email}</p>
              </div>
              <Link href="/account/profile" className="text-accent text-sm hover:underline">
                Edit
              </Link>
            </div>

            <div className="flex justify-between items-center py-3 border-b">
              <div>
                <p className="text-sm text-gray-500">Password</p>
                <p className="font-medium">••••••••</p>
              </div>
              <Link href="/account/profile" className="text-accent text-sm hover:underline">
                Change
              </Link>
            </div>
          </div>

          {/* Sign Out Button */}
          <div className="mt-8 pt-6 border-t">
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded hover:bg-red-600 transition-colors font-medium"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
