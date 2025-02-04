import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith('/dashboard')) {
    return NextResponse.next();
  }

  const isAuthenticated = request.cookies.get("privy-authenticated")?.value === "true";
  const isLoggingOut = request.headers.get("x-logout") === "true";

  if (!isAuthenticated || isLoggingOut) {
    const homeUrl = new URL('/', request.url);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*']
};