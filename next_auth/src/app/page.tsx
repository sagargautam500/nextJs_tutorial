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
    </div>
  );
}
