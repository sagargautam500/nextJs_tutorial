"use client";

import { useState } from "react";
import { ProductProps, CategoryProps } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import Sidebar from "@/components/Sidebar";

interface Props {
  products: ProductProps[];
  categories: CategoryProps[];
}

export default function ProductsClient({ products, categories }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  const filteredProducts = products.filter((p) => {
    const categoryMatch = selectedCategory !== null 
      ? p.category?.id === selectedCategory 
      : true;
    const priceMatch = p.displayPrice >= priceRange[0] && p.displayPrice <= priceRange[1];
    return categoryMatch && priceMatch;
  });

  return (
    <div className="flex flex-col md:flex-row p-6 gap-6">
      {/* Sidebar */}
      <Sidebar
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
      />

      {/* Products Grid */}
      <section className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)
        )}
      </section>
    </div>
  );
}
