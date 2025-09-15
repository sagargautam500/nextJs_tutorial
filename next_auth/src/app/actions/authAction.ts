// src/app/actions/authAction.ts
"use server";
import { signIn, signOut } from "@/auth";
import { db } from "@/lib/prisma";
import { AuthError } from "next-auth";
import bcrypt from "bcrypt";

interface ValuesProps {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: "user" | "admin";
  hobbies: string[];
}

export async function handleCredentialsSignUp(values: ValuesProps) {
  try {
    const hashedPassword = await bcrypt.hash(values.password, 10);

    const user = await db.user.create({
      data: {
        name: values.name,
        email: values.email,
        phone: values.phone,
        password: hashedPassword,
        role: values.role,
        hobbies: values.hobbies,
      },
    });

    return { success: true, user };
  } catch (err: any) {
    // Prisma duplicate email error
    if (err.code === "P2002" && err.meta?.target?.includes("email")) {
      return { success: false, message: "Email already exists" };
    }

    // Any other errors
    return { success: false, message: err.message || "Signup failed" };
  }
}



export async function handleCredentialsSignIn(email: string, password: string) {
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard", // Let NextAuth handle the redirect
    });
  } catch (error) {
    // NEXT_REDIRECT is expected for successful redirects
    if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
      throw error; // Re-throw (this is success)
    }

    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          throw new Error("Invalid email or password");
        default:
          throw new Error("Authentication failed");
      }
    }

    throw new Error(error instanceof Error ? error.message : "Sign in failed");
  }
}

export async function handleSignOut() {
  await signOut({
    redirectTo: "/auth/signin",
  });
}

export async function handleGithubSignIn() {
  await signIn("github");
}
