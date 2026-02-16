"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useSession } from "next-auth/react";

interface CartContextType {
  count: number;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const [count, setCount] = useState(0);

  const refreshCart = useCallback(async () => {
    if (status !== "authenticated") {
      setCount(0);
      return;
    }

    try {
      const res = await fetch("/api/cart");
      if (res.ok) {
        const data = await res.json();
        // Calculate total quantity of items
        const totalQuantity = (data.items || []).reduce(
          (sum: number, item: { quantity: number }) => sum + item.quantity,
          0,
        );
        setCount(totalQuantity);
      }
    } catch (error) {
      console.error("Failed to fetch cart count:", error);
    }
  }, [status]);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  return (
    <CartContext.Provider value={{ count, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
