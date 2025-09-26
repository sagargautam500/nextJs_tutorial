import Link from "next/link";

export default async function HomePage() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-2xl font-bold">Welcome to Our Store</h1>
      <p className="mt-2 text-gray-600">
        Discover our range of products and enjoy seamless shopping experience.
      </p>
      <div className="mt-6">
        <Link
          href="/products"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          View Products
        </Link>
      </div>
    </main>
  );
}
