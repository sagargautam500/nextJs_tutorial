import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    role?: string; // 👈 add your role field
  }

  interface Session {
    user?: {
      id?: string;
      role?: string; // 👈 also add it to session
    } & DefaultSession["user"];
  }
}
