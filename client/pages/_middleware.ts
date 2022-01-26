import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const cookie = req.cookies?.yid;
  const { pathname } = req.nextUrl;

  if (cookie && pathname !== '/') {
    console.log(cookie);
    return NextResponse.redirect('/');
  } else if (!cookie && pathname !== '/login') {
    return NextResponse.redirect('/login');
  } else {
    return NextResponse.next();
  }
}
