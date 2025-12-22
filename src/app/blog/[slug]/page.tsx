import Link from "next/link";
import { notFound } from "next/navigation";
import Mdx from "@/components/blog/Mdx";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  let post;
  try {
    post = getPostBySlug(params.slug);
  } catch {
    return notFound();
  }

  const { meta, content } = post;

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <Link href="/blog" className="text-sm text-white/70 hover:text-white">
        ← Back to Blog
      </Link>

      <header className="mt-6">
        <div className="text-sm text-white/60">
          {meta.category ?? "General"} · {meta.date}
        </div>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-white">
          {meta.title}
        </h1>

        {meta.description ? (
          <p className="mt-3 text-lg text-white/70">{meta.description}</p>
        ) : null}

        {meta.tags?.length ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {meta.tags.map((t: string) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
              >
                {t}
              </span>
            ))}
          </div>
        ) : null}
      </header>

      <div className="mt-10">
        <Mdx source={content} />
      </div>
    </main>
  );
}
