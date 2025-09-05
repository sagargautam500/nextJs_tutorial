// src/app/layout.tsx
import "./globals.css"
import { auth } from "@/auth";
import { GitHubSignInButton, SignOutButton } from "@/components/auth/github-button"
import Link from "next/link"

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <html lang="en">
      <body>
        <header className="flex items-center gap-6 px-6 py-3 border-b border-gray-200 bg-white shadow-sm">
          <Link href="/" className="text-lg font-semibold hover:text-blue-600 transition">Home</Link>
          <Link href="/dashboard" className="text-lg font-semibold hover:text-blue-600 transition">Dashboard</Link>
          <div className="ml-auto flex items-center gap-4">
            {session && typeof session === "object" && session.user && typeof session.user === "object" && "email" in session.user ? (
              <>
                <span className="mr-3 text-gray-700">Hello, {String((session.user as { email?: string }).email) ?? "User"}</span>
                <SignOutButton /> 
              </>
            ) : (
              <>
                <Link href="/sign-up" className="mr-2 text-blue-600 hover:underline">Sign Up</Link>
                <Link href="/sign-in" className="mr-2 text-blue-600 hover:underline">Sign In</Link>
                <GitHubSignInButton />
              </>
            )}
          </div>
        </header>
        {children}
      </body>
    </html>
  )
}
