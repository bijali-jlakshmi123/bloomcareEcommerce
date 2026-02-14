import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug, published: true },
  });

  if (!post) notFound();

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/blog"
        className="text-rose-500 font-medium hover:underline mb-8 inline-block"
      >
        ← Back to Blog
      </Link>
      <header className="mb-8">
        <span className="text-sm text-rose-500 font-medium">{post.category}</span>
        <h1 className="text-3xl lg:text-4xl font-bold font-display mt-2">
          {post.title}
        </h1>
        <p className="text-gray-500 mt-4">
          {new Date(post.createdAt).toLocaleDateString()}
        </p>
      </header>
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <div className="whitespace-pre-line">{post.content}</div>
      </div>
    </article>
  );
}
