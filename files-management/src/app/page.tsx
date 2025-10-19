import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="font-bold text-3xl sm:text-4xl">Files Management</h1>
      <p className="text-center max-w-md text-lg sm:text-xl">
        Welcome to the Files Management app! Use the navigation to upload files
        and stream videos seamlessly.
      </p>
      <Link
        href="/upload"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
      >
        Upload a File
      </Link>
      <footer className="text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Files Management App
      </footer>
    </div>
  );
}
