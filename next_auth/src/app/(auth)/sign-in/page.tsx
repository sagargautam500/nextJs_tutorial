// src/app/(auth)/sign-in/page.tsx
import { redirect } from "next/navigation"
import AuthError from "next-auth"
import signIn from "@/auth"
import { GitHubSignInButton } from "@/components/auth/github-button"

export default function SignInPage() {
  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded-lg shadow-md flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-center mb-2">Sign In</h1>

      <form>
        <a
          href="/api/auth/signin?callbackUrl=/dashboard"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 font-semibold block text-center w-full"
        >
          Sign in with Email/Password
        </a>
        <div className="flex flex-col items-center gap-2 w-full">
          <span className="text-gray-500 text-sm">or</span>
          <GitHubSignInButton />
        </div>
      </form>
    </div>
  );
}
