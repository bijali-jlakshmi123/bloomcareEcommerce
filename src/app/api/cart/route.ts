import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ items: [] });
  }
  const items = await prisma.cartItem.findMany({
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
  if (session.user.role === "ADMIN") {
    return NextResponse.json(
      { error: "Admins cannot purchase" },
      { status: 403 },
    );
  }
  const { productId, quantity = 1 } = await request.json();
  if (!productId) {
    return NextResponse.json({ error: "Product ID required" }, { status: 400 });
  }
  const existing = await prisma.cartItem.findUnique({
    where: {
      userId_productId: { userId: session.user.id!, productId },
    },
  });
  if (existing) {
    await prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: existing.quantity + quantity },
    });
  } else {
    await prisma.cartItem.create({
      data: {
        userId: session.user.id,
        productId,
        quantity,
      },
    });
  }
  return NextResponse.json({ success: true });
}

export async function PUT(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (session.user.role === "ADMIN") {
    return NextResponse.json(
      { error: "Admins cannot purchase" },
      { status: 403 },
    );
  }
  const { productId, quantity } = await request.json();
  if (!productId || typeof quantity !== "number") {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  await prisma.cartItem.updateMany({
    where: {
      userId: session.user.id,
      productId,
    },
    data: { quantity },
  });

  return NextResponse.json({ success: true });
}

export async function DELETE(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("productId");
  if (!productId) {
    return NextResponse.json({ error: "Product ID required" }, { status: 400 });
  }
  await prisma.cartItem.deleteMany({
    where: {
      userId: session.user.id,
      productId,
    },
  });
  return NextResponse.json({ success: true });
}
