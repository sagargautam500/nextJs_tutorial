export interface CategoryProps {
  id: number;
  name: string;
  slug: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}

// types/product.ts
export interface ProductProps {
  id: string;
  title: string;
  description: string;
  category: { id: string; name: string };
  images: string[];
  priceId: string;        // stripe Price ID (server-side verified)
  displayPrice: number;   // human-readable price like 19.99
}

