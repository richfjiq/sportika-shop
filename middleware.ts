import { NextFetchEvent, NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  if (request.nextUrl.pathname.startsWith('/checkout/address')) {
    const token = request.cookies.get('token');

    // const userAuth = await fetch(
    //   `${request.nextUrl.origin}/api/user/validate-token`,
    //   {
    //     method: 'GET',
    //     headers: {
    //       Cookie: token || '',
    //     },
    //   }
    // );

    if (!token) {
      return NextResponse.redirect(
        new URL('/auth/login?p=/checkout/address', request.url)
      );
    }
  }

  if (request.nextUrl.pathname.startsWith('/checkout/summary')) {
    const token = request.cookies.get('token');

    if (!token) {
      return NextResponse.redirect(
        new URL('/auth/login?p=/checkout/summary', request.url)
      );
    }
  }
}

export const config = {
  matcher: ['/checkout/:path*'],
};
