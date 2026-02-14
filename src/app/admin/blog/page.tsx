import Link from "next/link";

export const dynamic = "force-dynamic";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold font-display">Blog Posts</h1>
        <Link href="/admin/blog/new">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Post
          </Button>
        </Link>
      </div>
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-800">
              <th className="text-left p-4 font-semibold">Title</th>
              <th className="text-left p-4 font-semibold">Category</th>
              <th className="text-left p-4 font-semibold">Status</th>
              <th className="text-left p-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-gray-100 dark:border-gray-800">
                <td className="p-4 font-medium">{post.title}</td>
                <td className="p-4">{post.category}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      post.published ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {post.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="p-4">
                  <Link
                    href={`/admin/blog/${post.id}`}
                    className="text-rose-500 font-medium hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {posts.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            No blog posts yet. Create your first post.
          </div>
        )}
      </div>
    </div>
  );
}
