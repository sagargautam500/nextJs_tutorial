// src/components/Navbar.tsx
import { handleSignOut } from "@/app/actions/authAction";
import { auth } from "@/auth";
import Link from "next/link";


export default async function Navbar() {
  // Simulate fetching session data
  const session = await auth();


  return (
    <nav className="sticky top-0 z-50 bg-gray-600 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Left side */}
        <div className="flex items-center space-x-8">
          <Link
            href="/"
            className="text-xl font-extrabold text-white hover:text-indigo-400 transition"
          >
            Auth.js
          </Link>
          {session && (
            <>
              <Link
                href="/dashboard"
                className="font-medium text-gray-300 hover:text-white transition"
              >
                Dashboard
              </Link>
              <Link
                href="/about"
                className="font-medium text-gray-300 hover:text-white transition"
              >
                About
              </Link>


              {session.user?.role === "admin" && (
                <Link
                  href="/admin"
                  className="font-medium text-gray-300 hover:text-white transition"
                >
                  Admin
                </Link>
              )}

              {session.user?.role === "user" && (
                <Link
                  href="/user"
                  className="font-medium text-gray-300 hover:text-white transition"
                >
                  User
                </Link>
              )}
            </>
          )}
        </div>

        {/* Right side */}
        <div>
          {!session ? (
            <>
            <Link href="/auth/signin">
              <button className="rounded-full px-5 py-2 font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition">
                Sign In
              </button>
            </Link>
            <Link href="/auth/signup">
              <button className="rounded-full ml-5 px-5 py-2 font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition">
                Sign Up
              </button>
            </Link>
            </>
          ) : (
            <form action={handleSignOut} className="inline-block">
              <button
                type="submit"
                className="rounded-full px-5 py-2 font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition"
              >
                Sign Out
              </button>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
}
