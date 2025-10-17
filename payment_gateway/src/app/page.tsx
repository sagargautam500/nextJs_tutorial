import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <Link href="/cart" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300">Go to Cart</Link>
      <Link href="/orders" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300">Go to Orders</Link>
    </main>
  )
}
