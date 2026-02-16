import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { BlogPostForm } from "../BlogPostForm";

export const dynamic = "force-dynamic";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { id },
  });

  if (!post) {
    notFound();
  }

  const initialData = {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    image: post.image,
    category: post.category,
    published: post.published,
  };

  return (
    <div>
      <h1 className="text-2xl font-bold font-display mb-8">Edit Blog Post</h1>
      <BlogPostForm initialData={initialData} />
    </div>
  );
}
