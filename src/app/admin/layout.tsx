import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { Package, ShoppingBag, FileText, Users, LayoutDashboard, Mail } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    redirect("/login?callbackUrl=/admin");
  }

  const links = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/products", label: "Products", icon: Package },
    { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
    { href: "/admin/blog", label: "Blog", icon: FileText },
    { href: "/admin/messages", label: "Messages", icon: Mail },
    { href: "/admin/users", label: "Users", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-6">
        <Link href="/admin" className="text-xl font-bold mb-8 block">
          Admin Panel
        </Link>
        <nav className="space-y-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-rose-50 dark:hover:bg-gray-800 hover:text-rose-500 font-medium"
            >
              <link.icon className="w-5 h-5" />
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/"
          className="mt-8 block text-sm text-gray-500 hover:text-rose-500"
        >
          ← Back to Store
        </Link>
      </aside>
      <main className="ml-64 p-8">{children}</main>
    </div>
  );
}
