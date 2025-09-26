import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { signinSchema } from "@/lib/zod";
import { prisma } from "./lib/prisma";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Facebook from "next-auth/providers/facebook";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    // Google OAuth
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),

    // GitHub OAuth
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),


    // Facebook OAuth
    Facebook({
      clientId: process.env.AUTH_FACEBOOK_ID!,
      clientSecret: process.env.AUTH_FACEBOOK_SECRET!,
    }),

    // Credentials
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

        const parsed = signinSchema.safeParse(credentials);
        if (!parsed.success) return null;

        // ✅ Admin login check
        if (
          parsed.data.email === process.env.ADMIN_EMAIL &&
          parsed.data.password === process.env.ADMIN_PASSWORD
        ) {
          return {
            id: "admin-id",
            email: parsed.data.email,
            role: "admin",
            name: "Admin",
          };
        }

        // ✅ Normal user
        const user = await prisma.user.findUnique({
          where: { email: parsed.data.email },
        });
        if (!user) return null;

        const isValid = await bcrypt.compare(
          parsed.data.password,
          user.password || ""
        );
        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          role: user.role,
          name: user.name,
        };
      },
    }),
  ],

  session: { strategy: "jwt", maxAge: 60 * 60 * 24 },
  jwt: { maxAge: 60 * 60 * 24 },

  callbacks: {
    // Auto-create user on first OAuth login
    async signIn({ user, account }) {
      if (account?.provider !== "credentials" && user?.email) {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

      

        // ✅ Auto-create user if not found
        if (!existingUser) {
          await prisma.user.create({
            data: {
              name: user.name ?? "No Name",
              email: user.email,
              phone: "",
              password: "",
              role: "user",
            },
          });
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.role = (user as any).role ?? "user";
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = (token.role as string) ?? "user";
      }
      return session;
    },
    //autherize(route protection) handled by edge middleware (auth-edge)
  },
  // signIn page handled by edge middleware (auth-edge)
});
