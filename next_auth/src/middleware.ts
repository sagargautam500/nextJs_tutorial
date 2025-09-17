// // src/middleware.ts
// Use an Edge-safe auth instance that does not import Node-only modules
export { auth as middleware } from "@/auth-edge";

export const config = {
  matcher: [
    "/dashboard/:path*",   // protect all dashboard routes
    "/about/:path*",       // protect about routes
    "/admin/:path*",       // protect admin routes
    "/user/:path*",        // protect user routes
    "/auth/signin",        // handle redirect if already signed in
    "/auth/signup",       // handle redirect if already signed up
  ],
};
