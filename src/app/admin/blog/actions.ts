"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const blogPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  image: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  published: z.boolean().optional(),
});

export type BlogPostFormData = z.infer<typeof blogPostSchema>;

export async function createPost(data: BlogPostFormData) {
  const result = blogPostSchema.safeParse(data);

  if (!result.success) {
    return { error: "Invalid data" };
  }

  try {
    await prisma.blogPost.create({
      data: {
        ...result.data,
        published: result.data.published || false,
      },
    });
  } catch (error) {
    console.error("Failed to create post:", error);
    return { error: "Failed to create post" };
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  return { success: true };
}

export async function updatePost(id: string, data: BlogPostFormData) {
  const result = blogPostSchema.safeParse(data);

  if (!result.success) {
    return { error: "Invalid data" };
  }

  try {
    await prisma.blogPost.update({
      where: { id },
      data: {
        ...result.data,
        published: result.data.published || false,
      },
    });
  } catch (error) {
    console.error("Failed to update post:", error);
    return { error: "Failed to update post" };
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${result.data.slug}`);
  return { success: true };
}

export async function deletePost(id: string) {
  try {
    await prisma.blogPost.delete({
      where: { id },
    });
    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete post:", error);
    return { error: "Failed to delete post" };
  }
}
