"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const imageUrl = images[selectedIndex] || "/placeholder-product.svg";

  if (images.length === 0) {
    return (
      <div className="aspect-square relative rounded-2xl overflow-hidden bg-gradient-to-br from-rose-100 via-fuchsia-50 to-violet-100 dark:from-rose-950/50 dark:via-fuchsia-950/30 dark:to-violet-950/50 flex items-center justify-center">
        <span className="text-9xl font-bold text-rose-300/50 dark:text-rose-600/30">
          ?
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="aspect-square relative rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 ring-2 ring-gray-200 dark:ring-gray-700">
        <Image
          src={imageUrl}
          alt={`${productName} - Image ${selectedIndex + 1}`}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              className={`relative w-20 h-20 shrink-0 rounded-xl overflow-hidden transition-all ${
                i === selectedIndex
                  ? "ring-2 ring-rose-500 ring-offset-2"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`${productName} thumbnail ${i + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
