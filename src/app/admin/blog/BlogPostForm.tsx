"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { createPost, updatePost, type BlogPostFormData } from "./actions";
import { Sparkles } from "lucide-react";

interface BlogPostFormProps {
  initialData?: {
    id: string;
    title: string;
    slug: string;
    excerpt?: string | null;
    content: string;
    image?: string | null;
    category: string;
    published: boolean;
  };
}

export function BlogPostForm({ initialData }: BlogPostFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<BlogPostFormData>({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    excerpt: initialData?.excerpt || "",
    content: initialData?.content || "",
    image: initialData?.image || "",
    category: initialData?.category || "",
    published: initialData?.published || false,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Auto-generate slug from title if slug is empty or matches previous title slug
    if (name === "title" && !initialData) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setFormData((prev) => ({ ...prev, slug }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      try {
        let result;
        if (initialData) {
          result = await updatePost(initialData.id, formData);
        } else {
          result = await createPost(formData);
        }

        if (result?.error) {
          setError(result.error);
        } else if (result?.success) {
          router.push("/admin/blog");
          router.refresh();
        }
      } catch {
        setError("An unexpected error occurred");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100">
          {error}
        </div>
      )}

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm space-y-6">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-rose-500" />
          General Information
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <Input
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="e.g., 5 Tips for Better Period Health"
          />
          <Input
            label="Slug"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            required
            placeholder="e.g., 5-tips-better-period-health"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Input
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            placeholder="e.g., Period Health"
          />

          <div className="flex items-center h-full pt-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="published"
                checked={formData.published}
                onChange={handleCheckboxChange}
                className="w-5 h-5 rounded border-gray-300 text-rose-500 focus:ring-rose-500"
              />
              <span className="font-medium">Publish immediately</span>
            </label>
          </div>
        </div>

        <Input
          label="Excerpt"
          name="excerpt"
          value={formData.excerpt || ""}
          onChange={handleChange}
          placeholder="A brief summary for cards and SEO..."
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Details
          </label>
          <div className="space-y-4">
            <Input
              label="Cover Image URL"
              name="image"
              value={formData.image || ""}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/photo-..."
            />
            {formData.image && (
              <div className="relative aspect-video w-full max-w-md rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="object-cover w-full h-full"
                />
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Content
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows={15}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-none transition-all resize-y font-mono text-sm"
            placeholder="# Write your blog post here (Markdown supported)..."
          />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button type="submit" isLoading={isPending} disabled={isPending}>
          {initialData ? "Update Post" : "Create Post"}
        </Button>
      </div>
    </form>
  );
}
