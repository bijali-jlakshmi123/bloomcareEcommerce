"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const categories = [
  { slug: "sanitary-pads", label: "Sanitary Pads" },
  { slug: "menstrual-cups", label: "Menstrual Cups" },
  { slug: "tampons", label: "Tampons" },
  { slug: "hot-bags", label: "Hot Bags" },
  { slug: "heating-pads", label: "Heating Pads" },
  { slug: "period-underwear", label: "Period Underwear" },
  { slug: "disposal-bags", label: "Disposal Bags" },
  { slug: "waste-management-kits", label: "Waste Management Kits" },
  { slug: "eco-friendly", label: "Eco-Friendly" },
];

export function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "";
  const [search, setSearch] = useState(searchParams.get("search") || "");

  function setCategory(slug: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (slug === currentCategory) {
      params.delete("category");
    } else {
      params.set("category", slug);
    }
    router.push(`/products?${params.toString()}`);
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (search.trim()) {
      params.set("search", search.trim());
    } else {
      params.delete("search");
    }
    router.push(`/products?${params.toString()}`);
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch}>
        <input
          type="search"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:border-rose-500 outline-none"
        />
      </form>
      <div>
        <h3 className="font-semibold mb-3">Categories</h3>
        <ul className="space-y-1">
          {categories.map((cat) => (
            <li key={cat.slug}>
              <button
                onClick={() => setCategory(cat.slug)}
                className={`w-full text-left px-4 py-2 rounded-xl transition-colors ${
                  currentCategory === cat.slug
                    ? "bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 font-medium"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
                }`}
              >
                {cat.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
