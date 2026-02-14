import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";
import { Package, ShoppingBag, FileText, Users, Mail } from "lucide-react";

export default async function AdminDashboard() {
  const [productsCount, ordersCount, blogCount, usersCount, messagesCount] =
    await Promise.all([
      prisma.product.count(),
      prisma.order.count(),
      prisma.blogPost.count(),
      prisma.user.count(),
      prisma.contactMessage.count(),
    ]);

  const stats = [
    { label: "Products", value: productsCount, icon: Package, href: "/admin/products" },
    { label: "Orders", value: ordersCount, icon: ShoppingBag, href: "/admin/orders" },
    { label: "Blog Posts", value: blogCount, icon: FileText, href: "/admin/blog" },
    { label: "Messages", value: messagesCount, icon: Mail, href: "/admin/messages" },
    { label: "Users", value: usersCount, icon: Users, href: "/admin/users" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold font-display mb-8">Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((stat) => (
          <a
            key={stat.label}
            href={stat.href}
            className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-rose-200 dark:hover:border-rose-900 hover:shadow-lg transition-all"
          >
            <stat.icon className="w-10 h-10 text-rose-500 mb-4" />
            <p className="text-3xl font-bold">{stat.value}</p>
            <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
