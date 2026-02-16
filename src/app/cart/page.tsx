"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/components/providers/CartProvider";

interface CartItem {
  id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: string;
    image: string | null;
    slug: string;
  };
}

export default function CartPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { refreshCart } = useCart();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(`/login?callbackUrl=${encodeURIComponent("/cart")}`);
      return;
    }
    if (status === "authenticated") {
      if (session?.user?.role === "ADMIN") {
        router.push("/admin");
        return;
      }
      fetch("/api/cart")
        .then((res) => res.json())
        .then((data) => setItems(data.items || []))
        .finally(() => setLoading(false));
    }
  }, [status, router, session]);

  async function updateQuantity(productId: string, quantity: number) {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i)),
    );
    await fetch("/api/cart", {
      method: "PUT",
      body: JSON.stringify({ productId, quantity }),
    });
    refreshCart();
  }

  async function removeItem(productId: string) {
    await fetch(`/api/cart?productId=${productId}`, { method: "DELETE" });
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
    refreshCart();
  }

  const total = items.reduce(
    (sum, i) => sum + Number(i.product.price) * i.quantity,
    0,
  );

  if (status === "loading" || loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="animate-spin w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full mx-auto" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold font-display mb-8">Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
          <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Your cart is empty</p>
          <Link href="/products" className="mt-4 inline-block">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-4"
            >
              <div className="w-24 h-24 rounded-xl bg-gray-100 dark:bg-gray-800 shrink-0 relative overflow-hidden">
                {item.product.image ? (
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-rose-300">
                    {item.product.name[0]}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <Link
                  href={`/products/${item.product.slug}`}
                  className="font-semibold hover:text-rose-500"
                >
                  {item.product.name}
                </Link>
                <div className="flex flex-col gap-2">
                  <p className="text-rose-500 font-bold mt-1">
                    ₹{Number(item.product.price).toLocaleString()}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                      className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 flex items-center justify-center font-bold"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                      className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 flex items-center justify-center font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="font-bold text-lg">
                  ₹
                  {(
                    Number(item.product.price) * item.quantity
                  ).toLocaleString()}
                </span>
                <button
                  onClick={() => removeItem(item.product.id)}
                  className="text-red-500 hover:underline text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center pt-6">
            <p className="text-xl font-bold">
              Total: ₹{total.toLocaleString()}
            </p>
            <Link href="/checkout">
              <Button>Proceed to Checkout</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
