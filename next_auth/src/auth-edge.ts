// src/auth-edge.ts
import NextAuth from "next-auth";

// Edge-safe NextAuth instance for middleware. Do not import Node-only modules here.
export const { auth } = NextAuth({
  providers: [],
  session: { strategy: "jwt" },
  callbacks: {
    async session({ session, token }) {
      // Map token.role to session.user.role so auth.user.role is available in middleware
      session.user.role = (token as any)?.role ?? "user";
      return session;
    },
    authorized({ request: { nextUrl }, auth }) {
      const isLoggedIn = !!auth?.user;
      const pathname = nextUrl.pathname.replace(/\/$/, "");
      const role = auth?.user?.role;
      
      console.log("role", role);

      // Allow visiting auth pages when logged out. If already logged in, redirect home.
      if (pathname === "/auth/signin" && isLoggedIn)
        return Response.redirect(new URL("/", nextUrl));
      if (pathname === "/auth/signup" && isLoggedIn)
        return Response.redirect(new URL("/", nextUrl));

      if (
        (pathname.startsWith("/dashboard") || pathname.startsWith("/about")) &&
        !isLoggedIn
      ) {
        return Response.redirect(new URL("/auth/signin", nextUrl));
      }

      if (pathname.startsWith("/admin")) {
        if (!isLoggedIn)
          return Response.redirect(new URL("/auth/signin", nextUrl));
        if (role !== "admin") return Response.redirect(new URL("/", nextUrl));
      }

      if (pathname.startsWith("/user")) {
        if (!isLoggedIn)
          return Response.redirect(new URL("/auth/signin", nextUrl));
        if (role !== "user") return Response.redirect(new URL("/", nextUrl));
      }

      return true;
    },
  },

  pages: {
    signIn: "/auth/signin",
  },
});
