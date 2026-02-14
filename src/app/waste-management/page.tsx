import Link from "next/link";
import { Recycle, Leaf, Package, Trash2 } from "lucide-react";

const sections = [
  {
    icon: Recycle,
    title: "Proper Disposal Guide",
    desc: "Learn how to dispose of sanitary products safely and hygienically. We cover pads, tampons, menstrual cups, and more.",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly Products",
    desc: "Discover our range of sustainable menstrual care options that reduce environmental impact without compromising comfort.",
  },
  {
    icon: Package,
    title: "Waste Management Kits",
    desc: "All-in-one disposal solutions for homes, schools, and public spaces. Discreet and odor-free.",
  },
  {
    icon: Trash2,
    title: "Recycling Awareness",
    desc: "Understand which products can be recycled and how to participate in menstrual product recycling programs.",
  },
];

export default function WasteManagementPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold font-display mb-2">Waste Management</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl">
          Disposal guides, eco-friendly products & recycling awareness for a
          sustainable menstrual care routine.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {sections.map((section) => (
          <div
            key={section.title}
            className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 mb-4">
              <section.icon className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold mb-2">{section.title}</h2>
            <p className="text-gray-600 dark:text-gray-400">{section.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 lg:p-12 text-white">
        <h2 className="text-2xl font-bold font-display mb-4">
          Shop Eco-Friendly Products
        </h2>
        <p className="opacity-90 mb-6 max-w-xl">
          Browse our selection of sustainable menstrual care products including
          menstrual cups, reusable pads, and biodegradable disposal bags.
        </p>
        <Link
          href="/products?category=eco-friendly"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-emerald-600 font-semibold rounded-xl hover:bg-emerald-50 transition-colors"
        >
          View Eco Products <Leaf className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
