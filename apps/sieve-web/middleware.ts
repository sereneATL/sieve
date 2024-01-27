import { withAuth } from 'next-auth/middleware';
import { pages } from '@/sieve-web/auth.config';
import { NextResponse } from 'next/server';

export default withAuth(
  // function middleware(req) {
  //   console.log('here')
  //   console.log(req.nextUrl.pathname)
  //   if (req.nextauth.token && req.nextUrl.pathname.startsWith('/login')){
  //     console.log('here')
  //     return NextResponse.redirect('/dashboard')
  //   }
  // },
  {
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