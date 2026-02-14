"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Flower2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

const slides = [
  {
    title: "Menstrual Care Made Simple",
    subtitle:
      "Premium sanitary products, menstrual cups, period underwear & more. Shop with confidence. Delivered discreetly.",
    // Soft Abstract Pink/Purple
    image:
      "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2000",
    ctaPrim: "Shop Now",
    ctaPrimLink: "/products",
    ctaSec: "Learn More",
    ctaSecLink: "/blog",
  },
  {
    title: "Eco-Friendly Comfort",
    subtitle:
      "Sustainable choices for you and the planet. 100% organic cotton pads and reusable cups.",
    // Nature / Green Abstract
    image:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2000",
    ctaPrim: "View Eco Range",
    ctaPrimLink: "/products?category=eco-friendly",
    ctaSec: "About Us",
    ctaSecLink: "/about",
  },
  {
    title: "Period Care, Reimagined",
    subtitle:
      "Experience ultimate freedom with our leak-proof period underwear. Comfort for every day.",
    // Cozy / Comfort
    image:
      "https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?q=80&w=2000",
    ctaPrim: "Shop Underwear",
    ctaPrimLink: "/products?category=period-underwear",
    ctaSec: "Sizing Guide",
    ctaSecLink: "/sizing",
  },
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative h-[650px] w-full overflow-hidden bg-gray-50 dark:bg-gray-900 group">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0"
          }`}
        >
          {/* Background Image with Overlay */}
          {/* Background Image */}
          <img
            src={slide.image}
            alt={slide.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />

          {/* Content */}
          <div className="relative z-20 h-full flex items-center justify-center text-center px-4 sm:px-6 lg:px-8">
            <div
              className={`max-w-4xl mx-auto space-y-6 transition-all duration-700 transform ${
                index === current
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <p className="text-rose-300 font-semibold text-lg flex items-center justify-center gap-2">
                <Flower2 className="w-5 h-5" /> Care for Every Cycle
              </p>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white font-display leading-tight drop-shadow-lg">
                {slide.title}
              </h1>
              <p className="text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
                {slide.subtitle}
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Link href={slide.ctaPrimLink}>
                  <Button
                    size="lg"
                    className="bg-rose-600 hover:bg-rose-700 text-white border-none shadow-lg hover:shadow-rose-500/50 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    {slide.ctaPrim}
                  </Button>
                </Link>
                <Link href={slide.ctaSecLink}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-white border-white bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:text-white transition-all duration-300"
                  >
                    {slide.ctaSec}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
        aria-label="Previous Slide"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
        aria-label="Next Slide"
      >
        <ArrowRight className="w-6 h-6" />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === current
                ? "bg-rose-500 w-8"
                : "bg-white/50 w-2 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
