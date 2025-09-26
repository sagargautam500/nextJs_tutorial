export interface CategoryProps {
  id: number;
  name: string;
  slug: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}

export interface ProductProps {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: CategoryProps;
  images: string[];
  creationAt: string;
  updatedAt: string;
}
