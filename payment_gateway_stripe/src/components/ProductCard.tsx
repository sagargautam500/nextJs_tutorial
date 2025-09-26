"use client";

import Image from "next/image";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { ProductProps } from "@/types/product";
import axios from "axios";

interface ProductCardProps {
  product: ProductProps;
}

const FALLBACK_IMAGE = "https://placehold.co/600x400"; // safe placeholder

export default function ProductCard({ product }: ProductCardProps) {
  const [currentImage, setCurrentImage] = useState(0);

  const handleCheckout = async () => {
  try {
    const response = await axios.post("/api/checkout", {
      items: [
        {
          name: product.title,
          quantity: 1,
          price: product.price,
        },
      ],
    });
   console.log("Checkout response:", response);
    // Stripe returns a checkout URL, redirect user to it
    const data = response.data as { url?: string };
    if (data.url) {
      window.location.href = data.url;
    }
  } catch (error) {
    console.error("Error during checkout:", error);
  }
};


  const handleAddToCart = () => {
    console.log("Added to cart:", product);
  };

  const handlePrevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImage((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  // Use a safe image URL
  const getSafeImage = (url: string) => {
    try {
      const validUrl = new URL(url);
      if (validUrl.protocol === "https:") return url;
      return FALLBACK_IMAGE;
    } catch {
      return FALLBACK_IMAGE;
    }
  };

  return (
    <div className="group relative w-full max-w-sm rounded-2xl border bg-white p-4 shadow-md transition hover:shadow-xl">
      {/* Product Image */}
      <div className="relative h-56 w-full overflow-hidden rounded-xl">
        <Image
          src={getSafeImage(product.images[currentImage])}
          alt={product.title}
          fill
          unoptimized // <- allows SVGs
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Left Arrow */}
        <button
          onClick={handlePrevImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-2 py-1 text-white hover:bg-black/70"
        >
          {"<"}
        </button>

        {/* Right Arrow */}
        <button
          onClick={handleNextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-2 py-1 text-white hover:bg-black/70"
        >
          {">"}
        </button>

        {/* Image indicators */}
        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-2">
          {product.images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImage(idx)}
              className={`h-2 w-2 rounded-full ${
                idx === currentImage ? "bg-blue-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="mt-4 space-y-2">
        <h3 className="truncate text-lg font-semibold text-gray-900">
          {product.title}
        </h3>
        <p className="text-sm text-gray-500">{product.category.name}</p>
        <p className="text-xl font-bold text-blue-600">${product.price}</p>
        <p className="line-clamp-2 text-sm text-gray-600">
          {product.description}
        </p>
      </div>

      {/* Action Button */}
      <button
        onClick={handleAddToCart}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
      >
        <ShoppingCart size={18} />
        Add to Cart
      </button>
      <button
        onClick={handleCheckout}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
      >
        <ShoppingCart size={18} />
        Checkout
      </button>
    </div>
  );
}
