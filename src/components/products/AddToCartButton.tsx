"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/components/providers/CartProvider";

export function AddToCartButton({
  productId,
  compact,
}: {
  productId: string;
  compact?: boolean;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { refreshCart } = useCart();
  const [loading, setLoading] = useState(false);

  async function handleAddToCart() {
    if (status !== "authenticated") {
      router.push("/login?callbackUrl=/cart");
      return;
    }

    if (session?.user?.role === "ADMIN") {
      alert("Admins cannot purchase items.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity: 1 }),
      });
      if (res.ok) {
        await refreshCart();
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  }

  if (compact) {
    return (
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleAddToCart();
        }}
        disabled={loading}
        className="p-2.5 rounded-xl bg-white/95 dark:bg-gray-900/95 shadow-lg hover:bg-rose-50 dark:hover:bg-rose-950/50 text-gray-600 hover:text-rose-500 transition-all"
      >
        <ShoppingCart className="w-5 h-5" />
      </button>
    );
  }

  return (
    <Button
      onClick={handleAddToCart}
      disabled={loading}
      isLoading={loading}
      className="flex items-center gap-2"
    >
      <ShoppingCart className="w-5 h-5" />
      Add to Cart
    </Button>
  );
}
