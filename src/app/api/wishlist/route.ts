import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ items: [] });
  }
  const items = await prisma.wishlist.findMany({
    where: { userId: session.user.id },
    include: { product: true },
  });
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { productId } = await request.json();
  if (!productId) {
    return NextResponse.json({ error: "Product ID required" }, { status: 400 });
  }
  const existing = await prisma.wishlist.findUnique({
    where: {
      userId_productId: { userId: session.user.id!, productId },
    },
  });
  if (existing) {
    await prisma.wishlist.delete({ where: { id: existing.id } });
    return NextResponse.json({ added: false });
  }
  await prisma.wishlist.create({
    data: { userId: session.user.id!, productId },
  });
  return NextResponse.json({ added: true });
}
