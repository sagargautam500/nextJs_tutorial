// src/middleware.ts
export { auth as middleware } from "@/auth";

export const config = {
  matcher: [
    "/dashboard/:path*",   // protect all dashboard routes
    "/about/:path*",       // protect about routes
    "/admin/:path*",       // protect admin routes
    "/user/:path*",        // protect user routes
    "/auth/signin",        // handle redirect if already signed in
  ],
};
