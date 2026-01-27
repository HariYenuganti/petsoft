import { NextResponse } from 'next/server';

export default function middleware(request: Request) {
  console.log(request.url);
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
