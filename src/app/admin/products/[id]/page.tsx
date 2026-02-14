import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
import { prisma } from "@/lib/db";
import { ProductForm } from "@/components/admin/ProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold font-display mb-8">Edit Product</h1>
      <ProductForm
        product={{
          ...product,
          price: product.price.toString(),
        }}
      />
    </div>
  );
}
