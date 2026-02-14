import Link from "next/link";
import { Flower2, Instagram, Facebook, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-fuchsia-500 flex items-center justify-center">
                <Flower2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">BloomCare</span>
            </Link>
            <p className="max-w-md text-gray-400">
              Your trusted destination for menstrual care products. We believe in
              comfort, sustainability, and empowering every person with quality
              hygiene solutions.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="p-2 rounded-lg bg-gray-800 hover:bg-rose-500/20 text-rose-400 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-gray-800 hover:bg-rose-500/20 text-rose-400 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-gray-800 hover:bg-rose-500/20 text-rose-400 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="hover:text-rose-400 transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products?category=sanitary-pads" className="hover:text-rose-400 transition-colors">
                  Sanitary Pads
                </Link>
              </li>
              <li>
                <Link href="/products?category=menstrual-cups" className="hover:text-rose-400 transition-colors">
                  Menstrual Cups
                </Link>
              </li>
              <li>
                <Link href="/products?category=eco-friendly" className="hover:text-rose-400 transition-colors">
                  Eco-Friendly
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="hover:text-rose-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/waste-management" className="hover:text-rose-400 transition-colors">
                  Waste Management
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-rose-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-rose-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} BloomCare. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="hover:text-rose-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-rose-500 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
