// src/proxy.ts
import { auth } from "@/auth-edge";

export default auth((req) => {
  // Optional: small custom logic (e.g., logging)
  // console.log("Visiting:", req.nextUrl.pathname);
  return;
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/about/:path*",
    "/admin/:path*",
    "/user/:path*",
    "/auth/signin",
    "/auth/signup",
  ],
};
