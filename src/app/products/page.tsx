import { Suspense } from "react";

export const dynamic = "force-dynamic";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductFilters } from "@/components/products/ProductFilters";

export default function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl lg:text-4xl font-bold font-display mb-2 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
          Shop All Products
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Sanitary pads, menstrual cups, period underwear & more
        </p>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-64 shrink-0">
          <Suspense fallback={<div className="h-48 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />}>
            <ProductFilters />
          </Suspense>
        </aside>
        <div className="flex-1 min-w-0">
          <Suspense fallback={<ProductGridSkeleton />}>
            <ProductGrid searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="rounded-2xl overflow-hidden">
          <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 animate-pulse" />
          <div className="p-5 space-y-2">
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3 animate-pulse" />
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse" />
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}
