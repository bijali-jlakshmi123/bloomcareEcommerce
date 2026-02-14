// Serializable product type for passing to Client Components (no Prisma Decimal)
export interface SerializableProduct {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  image: string | null;
  images: string[];
  category: string;
  stock: number;
  featured: boolean;
  ecoFriendly: boolean;
}
