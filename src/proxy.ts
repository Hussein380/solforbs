import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken, SESSION_COOKIE_NAME } from "@/lib/auth/session";

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only guard /admin routes
  if (pathname.startsWith("/admin")) {
    const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    const isValidSession = sessionCookie ? !!verifyToken(sessionCookie) : false;

    // If on /admin/login and already authenticated, redirect to /admin/projects
    if (pathname === "/admin/login") {
      if (isValidSession) {
        return NextResponse.redirect(new URL("/admin/projects", request.url));
      }
      return NextResponse.next();
    }

    // For any other /admin route, require valid session
    if (!isValidSession) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
