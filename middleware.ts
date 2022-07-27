import { NextFetchEvent, NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// import { getSession, useSession } from 'next-auth/react';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const session = await getToken({ req, secret: process.env.NEXT_AUTH_SECRET });
  const requestedPage = req.nextUrl.pathname;
  const { origin } = req.nextUrl;

  if (req.nextUrl.pathname.startsWith('/checkout')) {
    console.log('++++++++++++++++++++++', { session });
    if (!session) {
      return NextResponse.redirect(`${origin}/auth/login?p=${requestedPage}`);
    }
  }

  return NextResponse.next();

  //   return NextResponse.next();
  // if (request.nextUrl.pathname.startsWith('/checkout/address')) {
  //   const token = request.cookies.get('token');
  //   if (!token) {
  //     return NextResponse.redirect(
  //       new URL('/auth/login?p=/checkout/address', request.url)
  //     );
  //   }
  // }
  // if (request.nextUrl.pathname.startsWith('/checkout/summary')) {
  //   const token = request.cookies.get('token');
  //   const cart = request.cookies.get('cart');
  //   const address = request.cookies.get('address');
  //   const firstName = request.cookies.get('firstName');
  //   const lastName = request.cookies.get('lastName');
  //   const zip = request.cookies.get('zip');
  //   const city = request.cookies.get('city');
  //   const phone = request.cookies.get('phone');
  //   const country = request.cookies.get('country');
  //   const code = request.cookies.get('code');
  //   if (!token) {
  //     return NextResponse.redirect(
  //       new URL('/auth/login?p=/checkout/summary', request.url)
  //     );
  //   }
  //   if (
  //     !address ||
  //     !firstName ||
  //     !lastName ||
  //     !zip ||
  //     !city ||
  //     !phone ||
  //     !code ||
  //     !country
  //   ) {
  //     return NextResponse.redirect(new URL('/checkout/address', request.url));
  //   }
  //   if (!cart) {
  //     return NextResponse.redirect(new URL('/', request.url));
  //   }
  // }
}

// export const config = {
//   matcher: '/checkout/checkout',
// };
