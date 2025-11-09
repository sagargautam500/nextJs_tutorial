'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">MyApp</h1>
        <div className="space-x-4">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/signin" className="hover:underline">
            Sign In
          </Link>
          <Link href="/signup" className="hover:underline">
            Sign Up
          </Link>
          <Link href="/dashboard" className="hover:underline">
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
}
