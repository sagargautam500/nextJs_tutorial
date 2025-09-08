// src/auth.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import { signInSchema } from "./lib/zod";

// Main NextAuth config
export  const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    // GitHub OAuth Provider
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),

    // Credentials (email + password)
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "enter your email" },
        password: { label: "Password", type: "password", placeholder: "enter password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // ✅ Validate input with Zod
        const parsed = signInSchema.safeParse(credentials);
        if (!parsed.success) {
          console.log("❌ Invalid credentials", parsed.error.format());
          return null;
        }
        // ✅ Simulate fetching user from DB
        // const user = {
        //   id: "1",
        //   name: "Sagar Gautam",
        //   email: "sagar.gautam@example.com",
        // };
        const user={
          id:"89",
          name:parsed.data.email,     //Valid credentials"
          email:parsed.data.email,
          password:parsed.data.password
        }

        return user; // returned to jwt callback
      },
    }),
  ],

  // 🔑 Session & JWT config
  session: {
    strategy: "jwt",          // use JWT-based sessions
    maxAge: 60 * 60 * 24 * 1, // 1 days
  },

  jwt: {
    maxAge: 60 * 60 * 24 * 1, // 1 days (keep same as session)
  },

  // ⚡ Callbacks
  callbacks: {
    // Store data in JWT token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },

    // Expose token fields to session
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.name = token.name as string;
      session.user.email = token.email as string;
      // console.log("Session callback:", session);
      return session;
    },

    // Route protection
    authorized({ request: { nextUrl }, auth }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = nextUrl;

      // 🚫 If logged in → block sign-in page
      if (pathname.startsWith("/auth/signin") && isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl));
      }

      // 🔒 Protect dashboard
      if (pathname.startsWith("/dashboard") && !isLoggedIn) {
        return Response.redirect(new URL("/auth/signin", nextUrl));
      }

      return true; // allow everything else
    },
  },

  // Custom sign-in page
  pages: {
    signIn: "/auth/signin",
  },
});

// How the flow works
// -Sign-in (GitHub or Credentials) → returns user
// -jwt callback → stores id, name, email into token
// -session callback → exposes token values to session.user
// -auth() → gives you final session.user + expires