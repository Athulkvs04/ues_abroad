import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname, search } = req.nextUrl;
  const isAuthPage = pathname === "/admin/login" || pathname.startsWith("/admin/login/");
  const isAdminRoot = pathname === "/admin" || pathname === "/admin/";
  const isAdminRoute = pathname.startsWith("/admin");
  const isAdminApiRoute = pathname.startsWith("/api/admin");

  // Determine real public origin from headers so redirects NEVER leak localhost on deployed environments
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || req.nextUrl.host;
  const proto = req.headers.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
  const publicOrigin = `${proto}://${host}`;

  // Always allow /admin/login to render cleanly so admins can view and use the login form
  if (isAuthPage) {
    return NextResponse.next();
  }

  // Cryptographically verified user session from NextAuth
  const isLoggedIn = Boolean(req.auth?.user);

  // Protect /api/admin API routes from unauthorized access
  if (isAdminApiRoute && !isLoggedIn) {
    return NextResponse.json(
      { success: false, error: "Authentication required" },
      { status: 401 }
    );
  }

  // If unauthenticated: ANY attempt to access /admin or any /admin/* subpath redirects to /admin/login
  if (isAdminRoute && !isLoggedIn) {
    let callbackUrl = pathname === "/admin" ? "/admin/dashboard" : pathname;
    if (search) {
      callbackUrl += search;
    }
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return NextResponse.redirect(
      new URL(`/admin/login?callbackUrl=${encodedCallbackUrl}`, publicOrigin)
    );
  }

  // If authenticated and visiting /admin root, redirect to /admin/dashboard
  if (isAdminRoot && isLoggedIn) {
    return NextResponse.redirect(new URL("/admin/dashboard", publicOrigin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin", "/admin/:path*", "/api/admin/:path*"],
};
