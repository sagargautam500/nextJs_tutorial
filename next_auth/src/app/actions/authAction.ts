// src/app/actions/authAction.ts
"use server";
import { signIn, signOut } from "@/auth"
import { db } from "@/lib/prisma"
import { AuthError } from "next-auth"
import bcrypt from "bcrypt"

interface ValuesProps {
  name: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  role: "user" | "admin"
}

export async function handleCredentialsSignUp(values: ValuesProps) {
  try {
    const hashedPassword = await bcrypt.hash(values.password, 10)

    const user = await db.user.create({
      data: {
        name: values.name,
        email: values.email,
        phone: values.phone,
        password: hashedPassword,
        role: values.role,
      },
    })

    return { success: true, user }
  } catch (err: any) {
    if (err.code === "P2002" && err.meta?.target?.includes("email")) {
      return { success: false, message: "Email already exists" }
    }
    return { success: false, message: err.message || "Signup failed" }
  }
}

export async function handleCredentialsSignIn(email: string, password: string) {
  try {
    await signIn("credentials", {
      email: email,
      password: password,
      redirectTo: "/dashboard",
    })

    // On success, a redirect is thrown; function won't reach here
    return { success: true }

  } catch (error) {
    if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
      throw error // Success redirect
    }

    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          throw new Error("Invalid email or password")
        default:
          throw new Error("Authentication failed")
      }
    }

    throw new Error(error instanceof Error ? error.message : "Sign in failed")
  }
}

export async function handleSignOut() {
  await signOut({
    redirectTo: "/auth/signin",
  })
}

export async function handleGithubSignIn() {
  await signIn("github")
}