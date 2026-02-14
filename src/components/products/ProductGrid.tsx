import { ProductCard } from "./ProductCard";
import { prisma } from "@/lib/db";
import type { ProductCategory, Prisma } from "@prisma/client";

const CATEGORY_MAP: Record<string, ProductCategory> = {
  "sanitary-pads": "SANITARY_PADS",
  "menstrual-cups": "MENSTRUAL_CUPS",
  "tampons": "TAMPONS",
  "hot-bags": "HOT_BAGS",
  "heating-pads": "HEATING_PADS",
  "period-underwear": "PERIOD_UNDERWEAR",
  "disposal-bags": "DISPOSAL_BAGS",
  "waste-management-kits": "WASTE_MANAGEMENT_KITS",
  "eco-friendly": "SANITARY_PADS", // Filter by ecoFriendly flag
};

export async function ProductGrid({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const params = await searchParams;
  const categoryParam = params.category;
  const search = params.search;

  const where: Prisma.ProductWhereInput = {};

  if (categoryParam === "eco-friendly") {
    where.ecoFriendly = true;
  } else if (categoryParam && CATEGORY_MAP[categoryParam]) {
    where.category = CATEGORY_MAP[categoryParam];
  }

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  const products = await prisma.product.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  // Serialize for Client Components (Decimal not supported in client serialization)
  const serializableProducts = products.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    description: p.description,
    price: Number(p.price),
    image: p.image,
    images: p.images ?? [],
    category: p.category,
    stock: p.stock,
    featured: p.featured,
    ecoFriendly: p.ecoFriendly,
  }));

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg">No products found.</p>
        <p className="text-gray-400 mt-2">Try a different category or search.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {serializableProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
