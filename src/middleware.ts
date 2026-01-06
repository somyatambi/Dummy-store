import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import { addSecurityHeaders } from '@/lib/security-headers';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');

    // Block non-admin users from admin routes
    if (isAdminRoute && token?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', req.url));
    }

    // Add security headers to response
    const response = NextResponse.next();
    return addSecurityHeaders(response);
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ['/account/:path*', '/admin/:path*', '/checkout/:path*'],
};
