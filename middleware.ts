import { NextFetchEvent, NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET || '';

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const session: any = await getToken({
    req,
    secret,
  });
  const requestedPage = req.nextUrl.pathname;
  const { origin } = req.nextUrl;

  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (!session) {
      return NextResponse.redirect(`${origin}/auth/login?p=${requestedPage}`);
    }

    if (session.user.role === 'client') {
      return NextResponse.redirect(`${origin}/`);
    }
  }

  if (req.nextUrl.pathname.startsWith('/checkout')) {
    if (!session) {
      return NextResponse.redirect(`${origin}/auth/login?p=${requestedPage}`);
    }
  }

  if (req.nextUrl.pathname.startsWith('/checkout/address')) {
    const cart = req.cookies.get('cart');
    if (!cart) {
      return NextResponse.redirect(`${origin}/`);
    }
  }

  if (req.nextUrl.pathname.startsWith('/checkout/summary')) {
    const firstName = req.cookies.get('firstName');
    const lastName = req.cookies.get('lastName');
    const address = req.cookies.get('address');
    const zip = req.cookies.get('zip');
    const city = req.cookies.get('city');
    const phone = req.cookies.get('phone');
    const cart = req.cookies.get('cart');

    if (
      (!firstName || !lastName || !address || !zip || !city || !phone) &&
      cart
    ) {
      return NextResponse.redirect(`${origin}/checkout/address`);
    }

    if (
      (!firstName || !lastName || !address || !zip || !city || !phone) &&
      !cart
    ) {
      return NextResponse.redirect(`${origin}/`);
    }

    if (!cart) {
      return NextResponse.redirect(`${origin}/`);
    }
  }

  return NextResponse.next();
}
