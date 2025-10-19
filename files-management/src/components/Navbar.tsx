"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Upload", path: "/upload" },
    { name: "Gallery", path: "/gallery" },
  ];

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold">
       <Link href="/">My File App</Link> 
        </div>

      <div className="flex gap-4">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`px-3 py-2 rounded ${
              pathname === item.path ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
