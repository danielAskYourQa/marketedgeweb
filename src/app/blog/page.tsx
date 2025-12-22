import { getAllPosts } from "@/lib/blog";
import Link from "next/link";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-4xl font-bold">Market Edge Blog</h1>
      <p className="mt-2 text-gray-500">
        Insights on price monitoring, competitors and marketplaces.
      </p>

      <div className="mt-10 space-y-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block rounded-xl border p-6 hover:bg-gray-50 transition"
          >
            <div className="text-sm text-gray-400">
              {post.category} · {post.date}
            </div>

            <h2 className="mt-2 text-xl font-semibold">
              {post.title}
            </h2>

            {post.description && (
              <p className="mt-2 text-gray-600">
                {post.description}
              </p>
            )}
          </Link>
        ))}

        {posts.length === 0 && (
          <p className="text-gray-500">No blog posts yet.</p>
        )}
      </div>
    </main>
  );
}
