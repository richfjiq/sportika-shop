import { NextFetchEvent, NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import Cookies from 'js-cookie';

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

  if (req.nextUrl.pathname.startsWith('/api/user/address/')) {
    if (!session) {
      return NextResponse.redirect(`${origin}/auth/login`);
    }
  }

  if (req.nextUrl.pathname.startsWith('/profile')) {
    if (!session) {
      return NextResponse.redirect(`${origin}/auth/login?p=${requestedPage}`);
    }
  }

  if (req.nextUrl.pathname.startsWith('/checkout')) {
    if (!session) {
      return NextResponse.redirect(`${origin}/auth/login?p=${requestedPage}`);
    }
  }

  if (req.nextUrl.pathname.startsWith('/checkout/summary')) {
    const cart = req.cookies.get('cart');
    if (!cart) {
      return NextResponse.redirect(`${origin}/`);
    }
  }

  if (req.nextUrl.pathname.startsWith('/checkout/address')) {
    return NextResponse.redirect(`${origin}/`);
  }

  return NextResponse.next();
}
