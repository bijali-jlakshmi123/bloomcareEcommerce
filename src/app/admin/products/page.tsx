import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";
import { DeleteProductButton } from "./DeleteProductButton";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold font-display">Products</h1>
        <Link href="/admin/products/new">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Product
          </Button>
        </Link>
      </div>
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-800">
              <th className="text-left p-4 font-semibold w-20">Image</th>
              <th className="text-left p-4 font-semibold">Product</th>
              <th className="text-left p-4 font-semibold">Category</th>
              <th className="text-left p-4 font-semibold">Price</th>
              <th className="text-left p-4 font-semibold">Stock</th>
              <th className="text-left p-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => {
              const imgUrl = p.image || p.images?.[0];
              return (
                <tr
                  key={p.id}
                  className="border-b border-gray-100 dark:border-gray-800"
                >
                  <td className="p-4">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0">
                      {imgUrl ? (
                        <Image
                          src={imgUrl}
                          alt={p.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                          —
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="font-medium">{p.name}</p>
                    <p className="text-sm text-gray-500">{p.slug}</p>
                  </td>
                  <td className="p-4">{p.category.replace(/_/g, " ")}</td>
                  <td className="p-4">₹{Number(p.price).toLocaleString()}</td>
                  <td className="p-4">{p.stock}</td>
                  <td className="p-4 flex items-center gap-3">
                    <Link
                      href={`/admin/products/${p.id}`}
                      className="text-rose-500 font-medium hover:underline"
                    >
                      Edit
                    </Link>
                    <DeleteProductButton id={p.id} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {products.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            No products yet. Add your first product.
          </div>
        )}
      </div>
    </div>
  );
}
