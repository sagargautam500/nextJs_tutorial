// src/middleware.ts
export { auth as middleware } from "@/auth";

export const config = {
  matcher: [
    "/dashboard/:path*",   // protect all dashboard routes
    "/auth/signin",        // handle redirect if already signed in
  ],
};
