import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      user: { select: { name: true, email: true } },
      orderItems: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold font-display mb-8">Orders</h1>
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-800">
              <th className="text-left p-4 font-semibold">Order</th>
              <th className="text-left p-4 font-semibold">Customer</th>
              <th className="text-left p-4 font-semibold">Status</th>
              <th className="text-left p-4 font-semibold">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-gray-100 dark:border-gray-800">
                <td className="p-4">
                  <p className="font-mono text-sm">#{order.id.slice(-8)}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </td>
                <td className="p-4">
                  <p className="font-medium">{order.user.name}</p>
                  <p className="text-sm text-gray-500">{order.user.email}</p>
                </td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      order.status === "DELIVERED"
                        ? "bg-emerald-100 text-emerald-700"
                        : order.status === "CANCELLED"
                          ? "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-4 font-bold">₹{Number(order.total).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && (
          <div className="p-12 text-center text-gray-500">No orders yet.</div>
        )}
      </div>
    </div>
  );
}
