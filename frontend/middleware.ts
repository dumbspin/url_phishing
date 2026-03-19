import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host');

  // If on specific Vercel production hostname and at the root, redirect to /scanner
  // This satisfies the requirement: "i dont want anything else on vercel except the scanner"
  // Simplified redirect for Vercel root access
  if (hostname && hostname.includes('vercel.app') && url.pathname === '/') {
    url.pathname = '/scanner';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Ensure middleware runs on the root route
export const config = {
  matcher: '/',
};
