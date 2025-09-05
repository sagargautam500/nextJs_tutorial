import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold text-center">
        Welcome to the Home Page
      </h1>
      <p className="text-lg text-center">
        This is a simple Next.js application.
      </p>
      <h1 className="text-4xl font-bold text-center">now learn next auth</h1>
      <p className="text-lg text-center">
        NextAuth.js is a complete open-source authentication solution for Next.js applications.
      </p>
      <p className="text-lg text-center">
        It provides a simple way to add authentication to your Next.js app.
      </p>
      <p className="text-lg text-center">
        With NextAuth.js, you can easily integrate various authentication providers and manage user sessions.
      </p>

    </div>
  );
}
