// src/components/ProductCard.tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import axios from "axios";
import { ProductProps } from "@/types/product";

interface ProductCardProps {
  product: ProductProps; // must include product.priceId
}

const FALLBACK_IMAGE = "https://placehold.co/600x400";

export default function ProductCard({ product }: ProductCardProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const getSafeImage = (url: string) => {
    try {
      const validUrl = new URL(url);
      return validUrl.protocol === "https:" ? url : FALLBACK_IMAGE;
    } catch {
      return FALLBACK_IMAGE;
    }
  };


const handleCheckout = async () => {
  if (!product.priceId) {
    alert("This product is not available for purchase. Please contact support.");
    return;
  }

  try {
    setLoading(true);
    const resp = await axios.post<{ url?: string; error?: string; sessionId?: string }>(
      "/api/checkout",
      { priceId: product.priceId, quantity }
    );

    if (resp.data?.url) {
      if (resp.data.sessionId) {
        sessionStorage.setItem("checkout_session", resp.data.sessionId);
      }
      window.location.href = resp.data.url;
    } else if (resp.data?.error) {
      alert(`Checkout failed: ${resp.data.error}`);
    } else {
      alert("Unable to process checkout. Please try again.");
    }
  } catch (error: unknown) {
    console.error("Checkout error:", error);

    if (axios.isAxiosError(error)) {
      const errorMessage = (error.response?.data as { error?: string })?.error || error.message;
      alert(`Checkout failed: ${errorMessage}`);
    } else {
      const errMsg = error instanceof Error ? error.message : "An unexpected error occurred";
      alert(`Error during checkout: ${errMsg}`);
    }
  } finally {
    setLoading(false);
  }
};

  const handleAddToCart = () => {
    alert(`Added ${quantity} × ${product.title} to cart`);
  };

  return (
    <div className="group relative w-full max-w-sm rounded-2xl border bg-white p-4 shadow-md transition hover:shadow-xl">
      <div className="relative h-56 w-full overflow-hidden rounded-xl">
        <Image
          src={getSafeImage(product.images[currentImage])}
          alt={product.title}
          fill
          unoptimized
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <button
          onClick={() =>
            setCurrentImage(
              (p) => (p === 0 ? product.images.length - 1 : p - 1)
            )
          }
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-2 py-1 text-white hover:bg-black/70"
        >
          {"<"}
        </button>
        <button
          onClick={() =>
            setCurrentImage(
              (p) => (p === product.images.length - 1 ? 0 : p + 1)
            )
          }
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-2 py-1 text-white hover:bg-black/70"
        >
          {">"}
        </button>
      </div>

      <div className="mt-4 space-y-2">
        <h3 className="truncate text-lg font-semibold text-gray-900">
          {product.title}
        </h3>
        <p className="text-sm text-gray-500">{product.category?.name || "Uncategorized"}</p>
        <div className="flex items-center gap-2">
          <p className="text-xl font-bold text-blue-600">
            ${product.displayPrice}
          </p>
          {product.displayPrice !== product.price && (
            <p className="text-sm text-gray-500 line-through">
              ${product.price}
            </p>
          )}
        </div>
        <p className="line-clamp-2 text-sm text-gray-600">
          {product.description}
        </p>
      </div>

      {/* Quantity selector */}
      <div className="mt-4 flex items-center justify-center gap-3">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="rounded-full bg-gray-200 px-3 py-1 text-lg font-bold hover:bg-gray-300"
        >
          -
        </button>
        <span className="min-w-[40px] text-center text-lg font-semibold">
          {quantity}
        </span>
        <button
          onClick={() => setQuantity((q) => q + 1)}
          className="rounded-full bg-gray-200 px-3 py-1 text-lg font-bold hover:bg-gray-300"
        >
          +
        </button>
      </div>

      <button
        onClick={handleAddToCart}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
      >
        <ShoppingCart size={18} /> Add to Cart
      </button>

      <button
        disabled={loading}
        onClick={handleCheckout}
        className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-2 font-medium text-white transition hover:bg-green-700 disabled:opacity-60"
      >
        <ShoppingCart size={18} /> {loading ? "Processing..." : "Checkout"}
      </button>
    </div>
  );
}
