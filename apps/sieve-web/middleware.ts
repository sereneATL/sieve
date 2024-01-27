import { withAuth } from 'next-auth/middleware';
import { pages } from '@/sieve-web/auth.config';

export default withAuth({
    secret: process.env.AUTH_SECRET,
    pages,
});

export const config = {
    matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - login 
       * - api (API routes)
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico (favicon file)
       */
      '/((?!login|api|_next/static|_next/image|favicon.ico|assets).*)',
    ],
  }