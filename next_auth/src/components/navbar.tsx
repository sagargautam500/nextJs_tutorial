// src/components/Navbar.tsx
import Link from "next/link";
import { Button } from "./ui/button";
import { auth } from "@/auth";
import { handleSignOut } from "@/app/actions/authAction";

export default async function Navbar() {
  //if client side session
  // const session = useSession();
  const session = await auth(); // server-side session

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
            <Link
              href="/dashboard"
              className="font-medium text-gray-300 hover:text-white transition"
            >
              Dashboard
            </Link>
          )}
        </div>

        {/* Right side */}
        <div>
          {!session ? (
            <Link href="/auth/signin">
              <Button className="rounded-full px-5 py-2 font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition">
                Sign In
              </Button>
            </Link>
          ) : (
            <form action={handleSignOut} className="inline-block">
              <Button
                type="submit"
                className="rounded-full px-5 py-2 font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition"
              >
                Sign Out
              </Button>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
}
