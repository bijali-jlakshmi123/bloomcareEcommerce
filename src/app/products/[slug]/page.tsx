import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { AddToCartButton } from "@/components/products/AddToCartButton";
import { WishlistButton } from "@/components/products/WishlistButton";
import { ProductImageGallery } from "@/components/products/ProductImageGallery";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
  });

  if (!product) notFound();

  const allImages = [
    ...(product.image ? [product.image] : []),
    ...(product.images ?? []),
  ].filter((img, i, arr) => arr.indexOf(img) === i);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
        <div className="relative">
          <ProductImageGallery images={allImages} productName={product.name} />
          {product.ecoFriendly && (
            <span className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-emerald-500/95 text-white text-sm font-semibold shadow-lg">
              ♻ Eco-Friendly
            </span>
          )}
          {product.featured && (
            <span className="absolute top-4 right-4 px-3 py-1.5 rounded-xl bg-rose-500/95 text-white text-sm font-semibold shadow-lg">
              Popular
            </span>
          )}
        </div>
        <div>
          <p className="text-sm text-gray-500 uppercase tracking-widest mb-3 font-medium">
            {product.category.replace(/_/g, " ")}
          </p>
          <h1 className="text-3xl lg:text-4xl font-bold font-display mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            {product.name}
          </h1>
          <p className="text-3xl font-bold bg-gradient-to-r from-rose-500 to-fuchsia-500 bg-clip-text text-transparent mb-6">
            ₹{Number(product.price).toLocaleString()}
          </p>
          {product.description && (
            <p className="text-gray-600 dark:text-gray-400 mb-6 whitespace-pre-line">
              {product.description}
            </p>
          )}
          <div className="flex flex-wrap gap-4 mb-6">
            <AddToCartButton productId={product.id} />
            <WishlistButton productId={product.id} />
          </div>
          <p className="text-sm text-gray-500">
            {product.stock > 0 ? (
              <span className="text-emerald-600">In stock ({product.stock} available)</span>
            ) : (
              <span className="text-red-500">Out of stock</span>
            )}
          </p>
          <Link
            href="/products"
            className="inline-block mt-8 text-rose-500 font-semibold hover:underline"
          >
            ← Back to products
          </Link>
        </div>
      </div>
    </div>
  );
}
