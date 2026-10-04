import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname, search } = req.nextUrl;
  const isAuthPage = pathname === "/admin/login" || pathname.startsWith("/admin/login/");
  const isAdminRoute = pathname.startsWith("/admin");

  // Check both NextAuth session and presence of session cookies
  const hasSessionCookie = Boolean(
    req.cookies.get("__Secure-authjs.session-token")?.value ||
    req.cookies.get("authjs.session-token")?.value ||
    req.cookies.get("__Secure-next-auth.session-token")?.value ||
    req.cookies.get("next-auth.session-token")?.value
  );

  const isLoggedIn = Boolean(req.auth) || hasSessionCookie;

  // Determine real public origin from headers so redirects NEVER leak localhost on deployed environments
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || req.nextUrl.host;
  const proto = req.headers.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
  const publicOrigin = `${proto}://${host}`;

  // Always allow /admin/login to render cleanly so admins can always view and use the login form
  if (isAuthPage) {
    return NextResponse.next();
  }

  // Protect all other /admin routes (/admin/dashboard, /admin/leads, etc.)
  if (isAdminRoute && !isLoggedIn) {
    let callbackUrl = pathname;
    if (search) {
      callbackUrl += search;
    }
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return NextResponse.redirect(
      new URL(`/admin/login?callbackUrl=${encodedCallbackUrl}`, publicOrigin)
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
