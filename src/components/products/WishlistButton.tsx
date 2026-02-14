"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function WishlistButton({
  productId,
  compact,
}: {
  productId: string;
  compact?: boolean;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleWishlist() {
    if (status !== "authenticated") {
      router.push("/login?callbackUrl=/wishlist");
      return;
    }
    setLoading(true);
    try {
      await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      router.refresh();
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
          handleWishlist();
        }}
        disabled={loading}
        className="p-2.5 rounded-xl bg-white/95 dark:bg-gray-900/95 shadow-lg hover:bg-rose-50 dark:hover:bg-rose-950/50 text-gray-600 hover:text-rose-500 transition-all"
      >
        <Heart className="w-5 h-5" />
      </button>
    );
  }

  return (
    <Button
      variant="outline"
      onClick={handleWishlist}
      disabled={loading}
      className="flex items-center gap-2"
    >
      <Heart className="w-5 h-5" />
      Add to Wishlist
    </Button>
  );
}
