import NextAuth from "next-auth";

// Edge-safe NextAuth instance for middleware. Do not import Node-only modules here.
export const { auth } = NextAuth({
  providers: [],
  callbacks: {
    authorized({ request: { nextUrl }, auth }) {
      const isLoggedIn = !!auth?.user;
      const pathname = nextUrl.pathname.replace(/\/$/, "");
      const role = auth?.user?.role as string | undefined;

      if (pathname === "/auth/signin" && isLoggedIn)
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


