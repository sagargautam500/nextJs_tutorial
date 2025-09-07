// src/auth.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./lib/zod";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "enter your email" },
        password: { label: "Password", type: "password", placeholder: "enter password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const parsed = signInSchema.safeParse(credentials);
        if (!parsed.success) {
          console.log("Invalid credentials", parsed.error.format());
          return null;
        }

        // Simulate fetching user from DB
        const user = {
          id: "1",
          name: "Sagar Gautam",
          email: "sagar.gautam@example.com",
        };

        return user || null;
      },
    }),
  ],

  callbacks: {
  authorized({ request: { nextUrl }, auth }) {
    const isLoggedIn = !!auth?.user;
    const { pathname } = nextUrl;

    // ✅ If user is logged in and tries to visit sign-in → redirect home
    if (pathname.startsWith("/auth/signin") && isLoggedIn) {
      return Response.redirect(new URL("/", nextUrl));
    }

    // ✅ Protect dashboard and private routes
    if (pathname.startsWith("/dashboard") && !isLoggedIn) {
      return Response.redirect(new URL("/auth/signin", nextUrl));
    }

    // ✅ Allow everything else
    return true;
  },
},


  pages: {
    signIn: "/auth/signin",
  },
  session: { strategy: "jwt" },
});
