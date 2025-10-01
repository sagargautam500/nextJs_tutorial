
import { prisma } from "@/lib/prisma";
import { ProductProps, CategoryProps } from "@/types/product";
import ProductsClient from "@/components/ProductClient";

export default async function ProductsPage() {
  // Fetch products with categories from Prisma
  const productsData = await prisma.product.findMany({
    include: { category: true },
  });

  const categoriesData = await prisma.category.findMany();

  // Transform Prisma data to match your TypeScript types
  const products: ProductProps[] = productsData.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    price: p.price,
    displayPrice: p.displayPrice || p.price, // Use displayPrice if available, fallback to price
    description: p.description,
    category: p.category ? {
      id: p.category.id,
      name: p.category.name,
      slug: p.category.slug,
      image: p.category.image,
      createdAt: p.category.createdAt.toISOString(),
      updatedAt: p.category.updatedAt.toISOString(),
    } : null, // Handle products without categories
    images: p.images,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
    priceId: p.priceId || "",
    stripeProductId: p.stripeProductId,
  }));

  const categories: CategoryProps[] = categoriesData.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    image: c.image,
    createdAt: c.createdAt.toISOString(),
    updatedAt: c.updatedAt.toISOString(),
  }));

  return <ProductsClient products={products} categories={categories} />;
}
