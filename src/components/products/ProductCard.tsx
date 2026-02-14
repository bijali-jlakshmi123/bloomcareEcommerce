"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { AddToCartButton } from "./AddToCartButton";
import { WishlistButton } from "./WishlistButton";
import type { SerializableProduct } from "@/types/product";

interface ProductCardProps {
  product: SerializableProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const [imageIndex, setImageIndex] = useState(0);
  const allImages = [
    ...(product.image ? [product.image] : []),
    ...(product.images ?? []),
  ].filter((img, i, arr) => arr.indexOf(img) === i);
  const imageUrl = allImages[imageIndex] || allImages[0] || "/placeholder-product.svg";

  return (
    <div className="group relative bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-2xl hover:shadow-rose-500/10 hover:border-rose-200 dark:hover:border-rose-900/50 transition-all duration-500 hover:-translate-y-1">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="aspect-square relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
          {imageUrl.startsWith("http") || imageUrl.startsWith("/") ? (
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-rose-100 via-fuchsia-50 to-violet-100 dark:from-rose-950/50 dark:via-fuchsia-950/30 dark:to-violet-950/50">
              <span className="text-6xl font-bold text-rose-300/80 dark:text-rose-600/60">
                {product.name[0]}
              </span>
            </div>
          )}
          {allImages.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
              {allImages.slice(0, 4).map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.preventDefault();
                    setImageIndex(i);
                  }}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === imageIndex ? "bg-rose-500" : "bg-white/60 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          )}
          {product.ecoFriendly && (
            <span className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-emerald-500/95 text-white text-xs font-semibold shadow-lg backdrop-blur-sm">
              ♻ Eco
            </span>
          )}
          {product.featured && (
            <span className="absolute top-4 right-4 px-3 py-1.5 rounded-xl bg-rose-500/95 text-white text-xs font-semibold shadow-lg backdrop-blur-sm">
              Popular
            </span>
          )}
          {product.stock < 10 && product.stock > 0 && !product.ecoFriendly && (
            <span className="absolute bottom-12 left-4 right-4 text-center px-2 py-1 rounded-lg bg-amber-500/90 text-white text-xs font-medium">
              Only {product.stock} left
            </span>
          )}
        </div>
        <div className="p-5">
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1.5 font-medium">
            {product.category.replace(/_/g, " ")}
          </p>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors min-h-[3.5rem]">
            {product.name}
          </h3>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-fuchsia-500 bg-clip-text text-transparent">
              ₹{product.price.toLocaleString()}
            </p>
            <span className="text-xs text-gray-400">
              {product.stock > 0 ? "In stock" : "Out of stock"}
            </span>
          </div>
        </div>
      </Link>
      <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <WishlistButton productId={product.id} />
        <AddToCartButton productId={product.id} compact />
      </div>
    </div>
  );
}
