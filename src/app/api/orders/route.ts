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
  if (session.user.role === "ADMIN") {
    return NextResponse.json(
      { error: "Admins cannot purchase" },
      { status: 403 },
    );
  }
  const { shippingAddress, items } = await request.json();
  if (!shippingAddress || !items?.length) {
    return NextResponse.json(
      { error: "Shipping address and items required" },
      { status: 400 },
    );
  }

  // Fetch products to get current price and details
  const productIds = items.map((i: { productId: string }) => i.productId);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
  });

  const productMap = new Map(products.map((p) => [p.id, p]));
  let total = 0;
  const orderItemsData = [];

  for (const item of items) {
    const product = productMap.get(item.productId);
    if (!product) continue;

    // Check stock if needed (optional implementation step)

    const price = Number(product.price);
    total += price * item.quantity;

    orderItemsData.push({
      productId: product.id,
      quantity: item.quantity,
      price: product.price, // Use DB price
      name: product.name, // Use DB name
      image: product.image, // Use DB image
    });
  }

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
