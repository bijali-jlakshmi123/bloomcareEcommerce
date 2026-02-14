import Link from "next/link";
import {
  Flower2,
  Package,
  BookOpen,
  Recycle,
  ArrowRight,
  Shield,
  Truck,
  Leaf,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HeroSlider } from "@/components/sections/HeroSlider";
import { FAQ } from "@/components/sections/FAQ";

const categories = [
  {
    name: "Sanitary Pads",
    href: "/products?category=sanitary-pads",
    icon: Package,
    gradient: "from-rose-400 to-rose-600",
  },
  {
    name: "Menstrual Cups",
    href: "/products?category=menstrual-cups",
    icon: Package,
    gradient: "from-fuchsia-400 to-fuchsia-600",
  },
  {
    name: "Period Underwear",
    href: "/products?category=period-underwear",
    icon: Package,
    gradient: "from-violet-400 to-violet-600",
  },
  {
    name: "Eco-Friendly",
    href: "/products?category=eco-friendly",
    icon: Leaf,
    gradient: "from-emerald-400 to-emerald-600",
  },
];

const features = [
  {
    icon: Shield,
    title: "Quality Assured",
    desc: "All products meet highest hygiene standards",
  },
  {
    icon: Truck,
    title: "Discreet Delivery",
    desc: "Packaged with care for your privacy",
  },
  {
    icon: Leaf,
    title: "Eco-Conscious",
    desc: "Sustainable options for the planet",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      {/* Hero Section */}
      <HeroSlider />

      {/* Categories */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold font-display text-center mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Find exactly what you need — from everyday essentials to
            eco-friendly alternatives
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 lg:p-8 hover:border-rose-300 dark:hover:border-rose-700 hover:shadow-xl hover:shadow-rose-500/10 transition-all duration-300"
              >
                <div
                  className={`absolute inset-0 bg-linear-to-br ${cat.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}
                />
                <cat.icon
                  className={`w-12 h-12 mb-4 bg-linear-to-br ${cat.gradient} p-2.5 rounded-xl text-white`}
                />
                <h3 className="font-semibold text-lg group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                  {cat.name}
                </h3>
                <ArrowRight className="w-5 h-5 mt-2 text-gray-400 group-hover:text-rose-500 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 lg:py-24 bg-white dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f) => (
              <div
                key={f.title}
                className="text-center p-8 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-rose-500">
                  <f.icon className="w-7 h-7" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog & Waste CTA */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <Link
              href="/blog"
              className="group relative overflow-hidden rounded-3xl bg-linear-to-br from-rose-500 to-fuchsia-600 p-8 lg:p-12 text-white"
            >
              <BookOpen className="w-14 h-14 mb-4 opacity-90" />
              <h3 className="text-2xl font-bold font-display mb-2">
                Educational Blog
              </h3>
              <p className="opacity-90 mb-4">
                Period health, pain relief tips, cycle tracking & hygiene
                awareness.
              </p>
              <span className="inline-flex items-center font-semibold group-hover:gap-3 gap-2 transition-all">
                Read Articles <ArrowRight className="w-5 h-5" />
              </span>
            </Link>
            <Link
              href="/waste-management"
              className="group relative overflow-hidden rounded-3xl bg-linear-to-br from-emerald-500 to-teal-600 p-8 lg:p-12 text-white"
            >
              <Recycle className="w-14 h-14 mb-4 opacity-90" />
              <h3 className="text-2xl font-bold font-display mb-2">
                Waste Management
              </h3>
              <p className="opacity-90 mb-4">
                Disposal guides, eco-friendly products & recycling awareness.
              </p>
              <span className="inline-flex items-center font-semibold group-hover:gap-3 gap-2 transition-all">
                Learn More <ArrowRight className="w-5 h-5" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />
    </div>
  );
}
