"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          ModernShop
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
            Home
          </Link>
          <Link href="/products" className="text-gray-700 hover:text-blue-600 font-medium">
            Products
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium">
            Contact
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={toggleMenu}
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-6 py-4 space-y-3">
          <Link
            href="/"
            className="block text-gray-700 hover:text-blue-600 font-medium"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            href="/products"
            className="block text-gray-700 hover:text-blue-600 font-medium"
            onClick={toggleMenu}
          >
            Products
          </Link>
          <Link
            href="/contact"
            className="block text-gray-700 hover:text-blue-600 font-medium"
            onClick={toggleMenu}
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}
