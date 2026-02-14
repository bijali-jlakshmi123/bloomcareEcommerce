import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: { orderItems: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ orders });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { shippingAddress, items } = await request.json();
  if (!shippingAddress || !items?.length) {
    return NextResponse.json(
      { error: "Shipping address and items required" },
      { status: 400 }
    );
  }

  const total = items.reduce(
    (sum: number, i: { quantity: number; price: string }) =>
      sum + i.quantity * Number(i.price),
    0
  );

  const products = await prisma.product.findMany({
    where: { id: { in: items.map((i: { productId: string }) => i.productId) } },
    select: { id: true, name: true, image: true },
  });
  const productMap = Object.fromEntries(products.map((p) => [p.id, p]));

  const orderItemsData = items.map(
    (i: { productId: string; quantity: number; price: string; name: string }) => {
      const p = productMap[i.productId];
      return {
        productId: i.productId,
        quantity: i.quantity,
        price: i.price,
        name: i.name,
        image: p?.image ?? null,
      };
    }
  );

  const order = await prisma.order.create({
    data: {
      userId: session.user.id!,
      total,
      shippingAddress,
      orderItems: {
        create: orderItemsData,
      },
    },
    include: { orderItems: true },
  });

  await prisma.cartItem.deleteMany({
    where: { userId: session.user.id },
  });

  return NextResponse.json({ order });
}
