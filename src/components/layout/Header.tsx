"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
  ShoppingCart,
  Heart,
  User,
  LogOut,
  Menu,
  X,
  Package,
  Flower2,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function Header() {
  const { data: session, status } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);

  const navLinks = [
    { href: "/products", label: "Shop" },
    { href: "/blog", label: "Blog" },
    { href: "/waste-management", label: "Waste Management" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-fuchsia-500 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Flower2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-rose-600 to-fuchsia-600 bg-clip-text text-transparent">
              BloomCare
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 dark:text-gray-400 hover:text-rose-500 font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/cart"
              className="p-2.5 rounded-xl text-gray-600 hover:bg-rose-50 dark:hover:bg-gray-800 hover:text-rose-500 transition-all relative"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                0
              </span>
            </Link>
            <Link
              href="/wishlist"
              className="p-2.5 rounded-xl text-gray-600 hover:bg-rose-50 dark:hover:bg-gray-800 hover:text-rose-500 transition-all hidden sm:flex"
            >
              <Heart className="w-5 h-5" />
            </Link>

            {status === "loading" ? (
              <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
            ) : session ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenu(!userMenu)}
                  className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-400 to-fuchsia-400 flex items-center justify-center text-white font-semibold">
                    {session.user?.name?.[0] || session.user?.email?.[0] || "U"}
                  </div>
                </button>
                {userMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setUserMenu(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 py-2 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 z-50">
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800">
                        <p className="font-semibold text-gray-900 dark:text-white truncate">
                          {session.user?.name}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {session.user?.email}
                        </p>
                      </div>
                      <Link
                        href="/orders"
                        className="flex items-center gap-2 px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-gray-800"
                        onClick={() => setUserMenu(false)}
                      >
                        <Package className="w-4 h-4" />
                        Order History
                      </Link>
                      {session.user?.role === "ADMIN" && (
                        <Link
                          href="/admin"
                          className="flex items-center gap-2 px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-gray-800"
                          onClick={() => setUserMenu(false)}
                        >
                          <User className="w-4 h-4" />
                          Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={() => signOut()}
                        className="flex items-center gap-2 w-full px-4 py-2.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">Register</Button>
                </Link>
              </div>
            )}

            <button
              className="md:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 rounded-xl hover:bg-rose-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
