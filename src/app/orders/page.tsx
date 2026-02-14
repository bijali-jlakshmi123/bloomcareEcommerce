"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Package } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Order {
  id: string;
  status: string;
  total: string;
  createdAt: string;
  orderItems: Array<{
    id: string;
    name: string;
    quantity: number;
    price: string;
  }>;
}

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/orders");
      return;
    }
    if (status === "authenticated") {
      fetch("/api/orders")
        .then((res) => res.json())
        .then((data) => setOrders(data.orders || []))
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
      <h1 className="text-3xl font-bold font-display mb-8">Order History</h1>

      {orders.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No orders yet</p>
          <Link href="/products" className="mt-4 inline-block">
            <Button>Start Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6"
            >
              <div className="flex flex-wrap justify-between gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <p className="font-mono text-sm text-gray-400">#{order.id.slice(-8)}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === "DELIVERED"
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30"
                      : order.status === "CANCELLED"
                        ? "bg-red-100 text-red-700 dark:bg-red-900/30"
                        : "bg-amber-100 text-amber-700 dark:bg-amber-900/30"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <ul className="space-y-1 mb-4">
                {order.orderItems.map((item) => (
                  <li key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>₹{(Number(item.price) * item.quantity).toLocaleString()}</span>
                  </li>
                ))}
              </ul>
              <p className="font-bold text-lg">Total: ₹{Number(order.total).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
