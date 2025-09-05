// src/app/(protected)/dashboard/page.tsx
import auth from "@/auth"
import { SignOutButton } from "@/components/auth/github-button"


export default async function Dashboard() {
  const session = await auth() // server-side session

  return (
    <main style={{ maxWidth: 640, margin: "40px auto" }}>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <SignOutButton />
    </main>
  )
}
