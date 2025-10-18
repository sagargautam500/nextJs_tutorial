// src/components/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingCart,
  Package,
  HelpCircle,
  Menu,
  X,
  CreditCard,
  Home,
  Phone,
  User,
  ChevronDown,
} from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPaymentDropdownOpen, setIsPaymentDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/cart", label: "Cart", icon: ShoppingCart },
    { href: "/orders", label: "Orders", icon: Package },
    { href: "/help", label: "Help", icon: HelpCircle },
    { href: "/contact", label: "Contact", icon: Phone },
  ];

  const paymentMethods = [
    { name: "Stripe (Card)", href: "https://stripe.com/docs", color: "text-blue-600" },
    { name: "eSewa", href: "https://developer.esewa.com.np", color: "text-green-600" },
    { name: "Khalti", href: "https://docs.khalti.com", color: "text-purple-600" },
    { name: "ConnectIPS", href: "https://www.connectips.com/index.php?view=article&id=33:payment-processor", color: "text-orange-600" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-lg"
          : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              PaymentHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    isActive(link.href)
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{link.label}</span>
                </Link>
              );
            })}

            {/* Payment Methods Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsPaymentDropdownOpen(!isPaymentDropdownOpen)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-all"
              >
                <CreditCard className="w-5 h-5" />
                <span className="font-medium">Payments</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isPaymentDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isPaymentDropdownOpen && (
                <>
                  {/* Backdrop */}
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsPaymentDropdownOpen(false)}
                  />
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-20">
                    {paymentMethods.map((method) => (
                      <Link
                        key={method.href}
                        href={method.href}
                        onClick={() => setIsPaymentDropdownOpen(false)}
                        className={`block px-4 py-3 hover:bg-gray-50 transition ${method.color} font-medium`}
                      >
                        {method.name}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* User Account */}
            <Link
              href="/account"
              className="ml-4 flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md"
            >
              <User className="w-5 h-5" />
              <span className="font-medium">Account</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    isActive(link.href)
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{link.label}</span>
                </Link>
              );
            })}

            {/* Mobile Payment Methods */}
            <div className="pt-2 border-t border-gray-200 mt-2">
              <p className="px-4 py-2 text-sm font-semibold text-gray-500 uppercase">
                Payment Methods
              </p>
              {paymentMethods.map((method) => (
                <Link
                  key={method.href}
                  href={method.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition ${method.color} font-medium`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span>{method.name}</span>
                </Link>
              ))}
            </div>

            {/* Mobile Account */}
            <Link
              href="/account"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium mt-2"
            >
              <User className="w-5 h-5" />
              <span>Account</span>
            </Link>
          </div>
        </div>
      )}

      {/* Progress Bar (optional) */}
      {isScrolled && (
        <div className="h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600" />
      )}
    </nav>
  );
}