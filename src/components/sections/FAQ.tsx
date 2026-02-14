"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Minus, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Do you offer eco-friendly period products?",
    answer:
      "Yes! We specialize in sustainable menstrual care, including 100% organic cotton pads, biodegradable liners, and reusable menstrual cups designed to reduce waste without compromising on comfort or protection.",
  },
  {
    question: "How do I choose the right menstrual cup size?",
    answer:
      "Choosing a cup size depends on factors like your age, flow intensity, and whether you've given birth. Generally, Size Small is for those under 30 or who haven't given birth, while Size Large is for those over 30 or who have given birth. Check our detailed sizing guide for more.",
  },
  {
    question: "Is shipping discreet?",
    answer:
      "Absolutely. We understand privacy is important. All our packages are shipped in plain, unmarked boxes or mailers with no branding on the outside, so only you know what's inside.",
  },
  {
    question: "What is your return policy?",
    answer:
      "Due to the hygienic nature of our products, we cannot accept returns on opened packages of pads, liners, or tampons. However, if you have issues with a menstrual cup or period underwear, please contact our support team within 30 days for assistance.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Standard shipping typically takes 3-5 business days. Express options are available at checkout if you need your essentials sooner.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 lg:py-32 bg-rose-50/30 dark:bg-gray-900/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 text-sm font-medium mb-4">
            <HelpCircle className="w-4 h-4" /> Got Questions?
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to know about our products, shipping, and
            sustainable mission.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-white dark:bg-gray-800 rounded-2xl border transition-all duration-300 ${
                openIndex === index
                  ? "border-rose-200 dark:border-rose-900 shadow-lg shadow-rose-100 dark:shadow-rose-900/10"
                  : "border-gray-100 dark:border-gray-700 hover:border-rose-100 dark:hover:border-gray-600"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span
                  className={`font-semibold text-lg transition-colors duration-200 ${
                    openIndex === index
                      ? "text-rose-600 dark:text-rose-400"
                      : "text-gray-900 dark:text-gray-100"
                  }`}
                >
                  {faq.question}
                </span>
                <span
                  className={`ml-6 shrink-0 flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-200 ${
                    openIndex === index
                      ? "bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-500"
                  }`}
                >
                  {openIndex === index ? (
                    <Minus className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </span>
              </button>

              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openIndex === index
                    ? "max-h-96 opacity-100 pb-6"
                    : "max-h-0 opacity-0 pb-0"
                }`}
              >
                <div className="px-6 text-gray-600 dark:text-gray-300 leading-relaxed text-base border-t border-transparent">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Still have questions?{" "}
            <Link
              href="/contact"
              className="text-rose-600 font-semibold hover:underline"
            >
              Contact our support team
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
