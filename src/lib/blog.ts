import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type BlogPostMeta = {
  slug: string;
  title: string;
  description?: string;
  date: string;
  category?: string;
  tags?: string[];
  featured?: boolean;
};

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR);

  return files
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "");
      const fullPath = path.join(BLOG_DIR, file);
      const raw = fs.readFileSync(fullPath, "utf-8");
      const { data } = matter(raw);

      return {
        slug,
        title: data.title,
        description: data.description,
        date: data.date,
        category: data.category,
        tags: data.tags ?? [],
        featured: data.featured ?? false,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): {
  meta: {
    slug: string;
    title: string;
    description?: string;
    date: string;
    category?: string;
    tags?: string[];
    featured?: boolean;
  };
  content: string;
} {
  const mdxPath = path.join(BLOG_DIR, `${slug}.mdx`);
  const mdPath = path.join(BLOG_DIR, `${slug}.md`);

  const filePath = fs.existsSync(mdxPath) ? mdxPath : mdPath;
  if (!fs.existsSync(filePath)) throw new Error(`Post not found: ${slug}`);

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    meta: {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      category: data.category,
      tags: data.tags ?? [],
      featured: data.featured ?? false,
    },
    content,
  };
}
