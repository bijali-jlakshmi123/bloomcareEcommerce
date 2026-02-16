import { BlogPostForm } from "../BlogPostForm";

export default function NewBlogPostPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold font-display mb-8">
        Add New Blog Post
      </h1>
      <BlogPostForm />
    </div>
  );
}
