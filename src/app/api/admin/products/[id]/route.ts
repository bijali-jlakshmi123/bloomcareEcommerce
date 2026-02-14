import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { ProductCategory } from "@prisma/client";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
  price: z.number().positive(),
  category: z.nativeEnum(ProductCategory),
  stock: z.number().int().min(0),
  featured: z.boolean().optional(),
  ecoFriendly: z.boolean().optional(),
  image: z.string().optional().nullable(),
  images: z.array(z.string()).optional(),
});

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  try {
    const body = await request.json();
    const data = productSchema.parse(body);
    const product = await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description || null,
        price: data.price,
        category: data.category,
        stock: data.stock,
        featured: data.featured ?? false,
        ecoFriendly: data.ecoFriendly ?? false,
        image: data.image || null,
        images: data.images ?? [],
      },
    });
    return NextResponse.json(product);
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: e.issues }, { status: 400 });
    }
    throw e;
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
