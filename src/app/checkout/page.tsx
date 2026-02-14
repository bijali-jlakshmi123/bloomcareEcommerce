"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface CartItem {
  id: string;
  quantity: number;
  product: { id: string; name: string; price: string };
}

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/checkout");
      return;
    }
    if (status === "authenticated") {
      fetch("/api/cart")
        .then((res) => res.json())
        .then((data) => setItems(data.items || []))
        .finally(() => setLoading(false));
    }
  }, [status, router]);

  const total = items.reduce(
    (sum, i) => sum + Number(i.product.price) * i.quantity,
    0
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shippingAddress: form,
          items: items.map((i) => ({
            productId: i.product.id,
            quantity: i.quantity,
            price: i.product.price,
            name: i.product.name,
          })),
        }),
      });
      if (res.ok) {
        router.push("/orders");
        router.refresh();
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="animate-spin w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full mx-auto" />
      </div>
    );
  }

  if (items.length === 0) {
    router.push("/cart");
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold font-display mb-8">Checkout</h1>
      <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-12">
        <div>
          <h2 className="font-semibold text-lg mb-4">Shipping Address</h2>
          <div className="space-y-4">
            <Input
              label="Address"
              required
              value={form.address}
              onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
              placeholder="Street address"
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="City"
                required
                value={form.city}
                onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
              />
              <Input
                label="State"
                required
                value={form.state}
                onChange={(e) => setForm((f) => ({ ...f, state: e.target.value }))}
              />
            </div>
            <Input
              label="ZIP / Pin"
              required
              value={form.zip}
              onChange={(e) => setForm((f) => ({ ...f, zip: e.target.value }))}
            />
            <Input
              label="Phone"
              required
              type="tel"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            />
          </div>
        </div>
        <div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sticky top-24">
            <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
            <ul className="space-y-2 mb-4">
              {items.map((i) => (
                <li key={i.id} className="flex justify-between text-sm">
                  <span>
                    {i.product.name} × {i.quantity}
                  </span>
                  <span>₹{(Number(i.product.price) * i.quantity).toLocaleString()}</span>
                </li>
              ))}
            </ul>
            <p className="text-xl font-bold border-t pt-4">Total: ₹{total.toLocaleString()}</p>
            <Button type="submit" fullWidth className="mt-6" isLoading={submitting}>
              Place Order
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
