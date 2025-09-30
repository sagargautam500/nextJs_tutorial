"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { ProductProps } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import Sidebar from "@/components/Sidebar";

interface Category {
  id: number;
  name: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [loading, setLoading] = useState(true);

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get<ProductProps[]>("/products?limit=20");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await api.get<Category[]>("/categories");
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Filtered products
  const filteredProducts = products.filter((p) => {
    const categoryMatch = selectedCategory ? Number(p.category.id) === selectedCategory : true;
    const priceMatch = p.displayPrice >= priceRange[0] && p.displayPrice <= priceRange[1];
    return categoryMatch && priceMatch;
  });

  return (
    <div className="flex flex-col md:flex-row p-6 gap-6">
      {/* Sidebar Component */}
      <Sidebar
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
      />

      {/* Products Grid */}
      <section className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p>Loading products...</p>
        ) : filteredProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </section>
    </div>
  );
}
