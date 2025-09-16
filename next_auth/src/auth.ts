import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import { signInSchema } from "@/lib/zod";
import { db } from "@/lib/prisma";
import bcrypt from "bcrypt";


// Main NextAuth config
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    // GitHub OAuth Provider
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),

    // Credentials (email + password)
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "enter password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const parsed = signInSchema.safeParse(credentials);
        if (!parsed.success) return null;

        // const { db } = await import("@/lib/prisma");
        const user = await db.user.findUnique({
          where: { email: parsed.data.email },
        });

        if (!user) return null;

        // const bcrypt = await import("bcrypt");
        const isValid = await bcrypt.compare(
          parsed.data.password,
          user.password
        );
        if (!isValid) return null;

        return user;
      },
    }),
  ],

  session: { strategy: "jwt", maxAge: 60 * 60 * 24 }, // 1 day
  jwt: { maxAge: 60 * 60 * 24 },

  callbacks: {
    // Store user info in JWT token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },

    // Expose token fields to session
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as string;
      return session;
    },
     //autherize(route protection) handled by edge middleware (auth-edge)
    
  },
  // signIn page handled by edge middleware (auth-edge)
});
