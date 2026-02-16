import Link from "next/link";

export const dynamic = "force-dynamic";
import { prisma } from "@/lib/db";
import { BookOpen } from "lucide-react";

import { BlogSearch } from "@/components/blog/BlogSearch";

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const { search } = await searchParams;
  const where: any = { published: true };

  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { excerpt: { contains: search, mode: "insensitive" } },
      { content: { contains: search, mode: "insensitive" } },
    ];
  }

  const posts = await prisma.blogPost.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold font-display mb-2">
          Educational Blog
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Period health, pain relief tips, cycle tracking & hygiene awareness
        </p>
      </div>

      <div className="max-w-md mx-auto mb-10">
        <BlogSearch />
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">
            No articles yet. Check back soon!
          </p>
        </div>
      ) : (
        <div className="grid gap-8">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="block p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-rose-200 dark:hover:border-rose-900 hover:shadow-lg transition-all"
            >
              <span className="text-sm text-rose-500 font-medium">
                {post.category}
              </span>
              <h2 className="text-xl font-bold mt-2 hover:text-rose-500">
                {post.title}
              </h2>
              {post.excerpt && (
                <p className="text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                  {post.excerpt}
                </p>
              )}
              <p className="text-sm text-gray-500 mt-4">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
