"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface WishlistItem {
  id: string;
  product: {
    id: string;
    name: string;
    slug: string;
    price: string;
    image: string | null;
  };
}

export default function WishlistPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/wishlist");
      return;
    }
    if (status === "authenticated") {
      fetch("/api/wishlist")
        .then((res) => res.json())
        .then((data) => setItems(data.items || []))
        .finally(() => setLoading(false));
    }
  }, [status, router]);

  if (status === "loading" || loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="animate-spin w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full mx-auto" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold font-display mb-8">Wishlist</h1>

      {items.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Your wishlist is empty</p>
          <Link href="/products" className="mt-4 inline-block">
            <Button>Browse Products</Button>
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/products/${item.product.slug}`}
              className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="aspect-square relative bg-gray-100 dark:bg-gray-800">
                {item.product.image ? (
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-rose-300">
                    {item.product.name[0]}
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold group-hover:text-rose-500">{item.product.name}</h3>
                <p className="text-rose-500 font-bold mt-1">
                  ₹{Number(item.product.price).toLocaleString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
