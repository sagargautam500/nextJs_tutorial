"use client";

import Link from "next/link";
import { XCircle, ArrowLeft, ShoppingBag } from "lucide-react";

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="mb-6">
          <XCircle className="mx-auto h-20 w-20 text-red-500 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Payment Cancelled
          </h1>
          <p className="text-gray-600 mb-6">
            Your payment was cancelled. No charges have been made to your account. You can try again or browse our other products.
          </p>
        </div>

        <div className="space-y-3">
          <Link
            href="/products"
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingBag size={20} />
            Browse Products
            <ArrowLeft size={16} className="rotate-180" />
          </Link>
          
          <Link
            href="/"
            className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Having trouble? Contact our{" "}
            <Link href="/contact" className="text-blue-600 hover:underline">
              support team
            </Link>{" "}
            for assistance.
          </p>
        </div>
      </div>
    </div>
  );
}