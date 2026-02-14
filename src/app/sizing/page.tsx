import type { Metadata } from "next";
import { Ruler, CheckCircle2, AlertCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Sizing Guide | Girlsm",
  description: "Find your perfect fit for menstrual cups and period underwear.",
};

const cupSizes = [
  {
    size: "Small",
    dimensions: "Volume: 25ml | Diameter: 41mm",
    recommendedFor: [
      "Light to medium flow",
      "Under 30 years old",
      "Have not given birth vaginally",
      "First-time cup users",
    ],
    icon: (
      <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 font-bold text-xl mb-4">
        S
      </div>
    ),
  },
  {
    size: "Large",
    dimensions: "Volume: 30ml | Diameter: 46mm",
    recommendedFor: [
      "Medium to heavy flow",
      "Over 30 years old",
      "Have given birth vaginally",
      "Need higher capacity",
    ],
    icon: (
      <div className="w-16 h-16 rounded-full bg-fuchsia-100 flex items-center justify-center text-fuchsia-500 font-bold text-xl mb-4">
        L
      </div>
    ),
  },
];

const underwearSizes = [
  { size: "XS", waist: "60-65 cm", hips: "85-90 cm" },
  { size: "S", waist: "65-70 cm", hips: "90-95 cm" },
  { size: "M", waist: "70-75 cm", hips: "95-100 cm" },
  { size: "L", waist: "75-80 cm", hips: "100-105 cm" },
  { size: "XL", waist: "80-85 cm", hips: "105-110 cm" },
  { size: "XXL", waist: "85-95 cm", hips: "110-120 cm" },
];

export default function SizingGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-rose-100 via-white to-fuchsia-50 dark:from-rose-950/40 dark:via-gray-900 dark:to-fuchsia-950/40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 text-sm font-medium mb-6">
            <Ruler className="w-4 h-4" /> Find Your Perfect Fit
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-gray-900 dark:text-white mb-6">
            Sizing Guide
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">
            Comfort starts with the right fit. Whether you're switching to a cup
            or trying period underwear, uses our detailed guide to choose with
            confidence.
          </p>
        </div>
      </section>

      {/* Menstrual Cups Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold font-display mb-4 text-gray-900 dark:text-white">
              Menstrual Cups
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
              Our cups are designed to sit comfortably and provide leak-proof
              protection for up to 12 hours. Choosing the right size ensures the
              best seal and comfort.
            </p>
            <div className="flex items-start gap-4 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-900/50 mb-8">
              <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
              <p className="text-sm">
                <strong>First time user?</strong> We generally recommend
                starting with the Small size unless you have a very heavy flow
                or have given birth vaginally.
              </p>
            </div>
          </div>
          <div className="relative h-64 md:h-80 w-full rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=1000&auto=format&fit=crop"
              alt="Menstrual Cups"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {cupSizes.map((size) => (
            <div
              key={size.size}
              className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-xl shadow-rose-50/50 dark:shadow-none"
            >
              <div className="flex flex-col items-center text-center mb-6">
                {size.icon}
                <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                  Size {size.size}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 font-medium">
                  {size.dimensions}
                </p>
              </div>
              <ul className="space-y-3">
                {size.recommendedFor.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Period Underwear Section */}
      <section className="py-16 bg-white dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-display mb-4 text-gray-900 dark:text-white">
              Period Underwear
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our underwear fits true to size. Measure your waist and hips to
              find your perfect match below. If you're between sizes, we
              recommend sizing up for comfort.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="py-4 px-6 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Size
                  </th>
                  <th className="py-4 px-6 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Waist (cm)
                  </th>
                  <th className="py-4 px-6 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Hips (cm)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {underwearSizes.map((row) => (
                  <tr
                    key={row.size}
                    className="hover:bg-rose-50/50 dark:hover:bg-rose-900/10 transition-colors"
                  >
                    <td className="py-4 px-6 font-bold text-gray-900 dark:text-white">
                      {row.size}
                    </td>
                    <td className="py-4 px-6 text-gray-600 dark:text-gray-300">
                      {row.waist}
                    </td>
                    <td className="py-4 px-6 text-gray-600 dark:text-gray-300">
                      {row.hips}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-display mb-6 text-gray-900 dark:text-white">
            Still Unsure?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Our support team is here to help you find the perfect fit. Reach out
            anytime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg">Contact Support</Button>
            </Link>
            <Link href="/products">
              <Button variant="outline" size="lg">
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
