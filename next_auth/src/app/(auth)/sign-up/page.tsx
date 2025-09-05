// src/app/(auth)/sign-up/page.tsx
import { z } from "zod"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { signIn } from "@/auth"
import { GitHubSignInButton } from "@/components/auth/github-button"
import { redirect } from "next/navigation"
import SignUpForm from "@/components/auth/sign-up-form"

const signUpSchema = z.object({
  name: z.string().min(2),
  address: z.string().min(5),
  email: z.string().email(),
  password: z.string().min(8),
})

type ActionState = {
  error?: string
  fieldErrors?: Partial<Record<"name" | "address" | "email" | "password", string>>
}

async function signUpAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  "use server"

  const input = {
    name: formData.get("name"),
    address: formData.get("address"),
    email: formData.get("email"),
    password: formData.get("password"),
  }
  const parsed = signUpSchema.safeParse(input)
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const path = issue.path?.[0] as string | undefined
      if (path && !fieldErrors[path]) fieldErrors[path] = issue.message
    }
    return { error: "Please fix the highlighted fields.", fieldErrors }
  }

  const { name, address, email, password } = parsed.data

  try {
    const exists = await prisma.user.findUnique({ where: { email } })
    if (exists) {
      return { fieldErrors: { email: "Email already in use" } }
    }

    const hashed = await bcrypt.hash(password, 10)
    await prisma.user.create({
      data: { name, address, email, password: hashed },
    })

    await signIn("credentials", formData)
    redirect("/dashboard")
  } catch (e) {
    return { error: "Something went wrong. Please try again." }
  }

  return {}
}

export default function SignUpPage() {
  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded-lg shadow-md flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-center mb-2">Create account</h1>

      <SignUpForm action={signUpAction} />
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-gray-200" />
        <span className="text-xs text-gray-500">or</span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>
      <GitHubSignInButton />
    </div>
  )
}
