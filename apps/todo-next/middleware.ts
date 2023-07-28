import { NextResponse } from 'next/server';

export default function middleware(request: Request) {
  return NextResponse.redirect(new URL('/todos', request.url));
}

export const config = {
  matcher: ['/' /* '/docs/:path' */],
};
