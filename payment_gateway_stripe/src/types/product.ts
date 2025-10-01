// types/product.ts
export interface CategoryProps {
  id: string; // Changed from number to string to match Prisma ObjectId
  name: string;
  slug: string;
  image: string | null;
  createdAt: string; // Changed from creationAt to createdAt to match Prisma
  updatedAt: string;
}

export interface ProductProps {
  id: string; // Changed from number to string to match Prisma ObjectId
  title: string;
  slug: string;
  price: number;
  displayPrice: number;
  description: string;
  category: CategoryProps | null; // Made optional to handle products without categories
  images: string[];
  createdAt: string; // Changed from creationAt to createdAt to match Prisma
  updatedAt: string;
  priceId: string; // Stripe Price ID 
  stripeProductId?: string | null;
}




