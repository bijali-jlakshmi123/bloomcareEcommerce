"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ImagePlus, Upload } from "lucide-react";

const CATEGORIES = [
  "SANITARY_PADS",
  "MENSTRUAL_CUPS",
  "TAMPONS",
  "HOT_BAGS",
  "HEATING_PADS",
  "PERIOD_UNDERWEAR",
  "DISPOSAL_BAGS",
  "WASTE_MANAGEMENT_KITS",
];

interface ProductFormProps {
  product?: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    price: string;
    category: string;
    stock: number;
    featured: boolean;
    ecoFriendly: boolean;
    image: string | null;
    images: string[];
  };
}

export function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: product?.name ?? "",
    slug: product?.slug ?? "",
    description: product?.description ?? "",
    price: product?.price ?? "",
    category: product?.category ?? "SANITARY_PADS",
    stock: product?.stock ?? 0,
    featured: product?.featured ?? false,
    ecoFriendly: product?.ecoFriendly ?? false,
    image: product?.image ?? "",
    images: product?.images?.join("\n") ?? "",
  });

  function slugify(s: string) {
    return s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  const mainImageInputRef = useRef<HTMLInputElement>(null);

  function getImageUrls(): string[] {
    const main = form.image?.trim();
    const extra = form.images
      .split("\n")
      .map((u) => u.trim())
      .filter(Boolean);
    return main ? [main, ...extra.filter((u) => u !== main)] : extra;
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>, field: "image" | "images") {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.set("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
    const data = await res.json();
    if (data.url) {
      if (field === "image") {
        setForm((f) => ({ ...f, image: data.url }));
      } else {
        setForm((f) => ({ ...f, images: (f.images ? f.images + "\n" : "") + data.url }));
      }
    }
    e.target.value = "";
  }

  return (
    <form
      className="max-w-2xl space-y-6"
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        const imageUrls = getImageUrls();
        const payload = {
          ...form,
          price: Number(form.price),
          stock: Number(form.stock),
          image: imageUrls[0] || null,
          images: imageUrls,
        };
        const url = product ? `/api/admin/products/${product.id}` : "/api/admin/products";
        const method = product ? "PUT" : "POST";
        const res = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          router.push("/admin/products");
          router.refresh();
        } else {
          const err = await res.json();
          alert(err.error || "Failed to save product");
        }
        setLoading(false);
      }}
    >
      <Input
        label="Name"
        required
        value={form.name}
        onChange={(e) => {
          setForm((f) => ({
            ...f,
            name: e.target.value,
            slug: product ? f.slug : slugify(e.target.value),
          }));
        }}
      />
      <Input
        label="Slug"
        required
        value={form.slug}
        onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
      />

      {/* Main Image */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Main Image
        </label>
        <div className="flex gap-4 items-start">
          <div className="flex-1 space-y-2">
            <Input
              placeholder="Paste URL or upload below"
              value={form.image}
              onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
            />
            <input
              ref={mainImageInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageUpload(e, "image")}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => mainImageInputRef.current?.click()}
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Image
            </Button>
          </div>
          {form.image && (
            <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0 relative">
              {form.image.startsWith("http") ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={form.image}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "";
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImagePlus className="w-8 h-8 text-gray-400" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Additional Images */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Additional Images (URLs or upload)
        </label>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="extra-images-upload"
          onChange={(e) => handleImageUpload(e, "images")}
        />
        <textarea
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 min-h-[100px]"
          placeholder="https://images.unsplash.com/photo-1...&#10;https://images.unsplash.com/photo-2..."
          value={form.images}
          onChange={(e) => setForm((f) => ({ ...f, images: e.target.value }))}
        />
        <div className="flex gap-2 mt-1">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => document.getElementById("extra-images-upload")?.click()}
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Another
          </Button>
          <p className="text-xs text-gray-500 self-center">Or paste URLs, one per line.</p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
          rows={4}
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Price"
          type="number"
          required
          value={form.price}
          onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
        />
        <Input
          label="Stock"
          type="number"
          required
          value={form.stock}
          onChange={(e) => setForm((f) => ({ ...f, stock: Number(e.target.value) }))}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Category</label>
        <select
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
          value={form.category}
          onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c.replace(/_/g, " ")}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
          />
          Featured
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.ecoFriendly}
            onChange={(e) => setForm((f) => ({ ...f, ecoFriendly: e.target.checked }))}
          />
          Eco-Friendly
        </label>
      </div>
      <Button type="submit" isLoading={loading}>
        {product ? "Update" : "Create"} Product
      </Button>
    </form>
  );
}
