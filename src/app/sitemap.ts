import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://marketedgemonitoring.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const postEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.date),
  }));

  return [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
    },
    ...postEntries,
  ];
}
