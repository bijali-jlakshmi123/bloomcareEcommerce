import Link from "next/link";
import {
  Flower2,
  Heart,
  Leaf,
  Shield,
  Target,
  Users,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

const values = [
  {
    icon: Heart,
    title: "Compassion First",
    desc: "We understand the sensitivity around menstrual care and design every experience with empathy and discretion.",
  },
  {
    icon: Shield,
    title: "Quality Assured",
    desc: "All products meet stringent hygiene and safety standards. Your health is non-negotiable.",
  },
  {
    icon: Leaf,
    title: "Sustainable Choices",
    desc: "We champion eco-friendly alternatives—menstrual cups, reusable pads, and biodegradable options.",
  },
  {
    icon: Users,
    title: "Inclusive for All",
    desc: "Menstrual care is essential healthcare. We serve everyone with respect and dignity.",
  },
];

const stats = [
  { value: "10K+", label: "Happy Customers" },
  { value: "50+", label: "Products" },
  { value: "5+", label: "Years of Trust" },
  { value: "100%", label: "Discreet Delivery" },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-100 via-fuchsia-50 to-violet-100 dark:from-rose-950/40 dark:via-fuchsia-950/30 dark:to-violet-950/40 py-20 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-rose-200/30 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-semibold mb-4">
              <Flower2 className="w-6 h-6" />
              Our Story
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold font-display mb-6">
              Empowering Every Cycle with{" "}
              <span className="bg-gradient-to-r from-rose-500 to-fuchsia-500 bg-clip-text text-transparent">
                Dignity & Care
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              BloomCare was founded on a simple belief: menstrual care should be
              accessible, comfortable, and sustainable. We curate premium products
              and deliver them with the discretion and care you deserve.
            </p>
            <Link href="/products">
              <Button size="lg" className="group">
                Shop Now
                <ArrowRight className="w-5 h-5 ml-2 inline group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-rose-500 to-fuchsia-500 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-gray-600 dark:text-gray-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold font-display mb-6">
                Our Mission
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
                To break the stigma around menstruation and make quality menstrual
                care products accessible to everyone. We combine education,
                eco-conscious choices, and discreet delivery to support your
                wellbeing.
              </p>
              <div className="flex items-center gap-3">
                <Target className="w-12 h-12 text-rose-500 shrink-0" />
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Our goal:</strong> Ensure no one has to compromise on
                  comfort, sustainability, or privacy when it comes to menstrual care.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-rose-200 to-fuchsia-200 dark:from-rose-900/30 dark:to-fuchsia-900/30 flex items-center justify-center">
                <Flower2 className="w-32 h-32 text-rose-400/50 dark:text-rose-500/30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-white dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold font-display text-center mb-4">
            Our Values
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto mb-12">
            These principles guide everything we do—from product selection to
            customer support.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-rose-200 dark:hover:border-rose-900 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-rose-500 mb-4">
                  <v.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{v.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-rose-500 to-fuchsia-600 p-8 lg:p-12 text-white text-center">
            <h2 className="text-2xl lg:text-3xl font-bold font-display mb-4">
              Have Questions? We&apos;re Here to Help
            </h2>
            <p className="opacity-90 mb-6 max-w-xl mx-auto">
              Reach out for product advice, orders, or feedback. Our team responds
              within 24 hours.
            </p>
            <Link href="/contact">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-rose-600 hover:bg-rose-50"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
