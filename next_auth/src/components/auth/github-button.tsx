// components/auth/github-buttons.tsx
import { signOut } from "@/auth"

export function GitHubSignInButton() {
  return (
    <a
      href="/api/auth/signin/github?callbackUrl=/dashboard"
      className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600 font-semibold"
    >
      Sign in with GitHub
    </a>
  )
}

export function SignOutButton() {
  return (
    <form action={async () => {
      "use server"
      await signOut({ redirectTo: "/" })
    }}>
      <button type="submit">Sign out</button>
    </form>
  )
}
