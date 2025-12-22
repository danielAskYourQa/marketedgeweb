import { NextResponse } from "next/server";

type OutrankArticle = {
  slug: string;
  title: string;
  meta_description?: string;
  description?: string;
  created_at?: string;
  tags?: string[] | unknown;
  content_markdown?: string;
  content?: string;
  image_url?: string;
};

function getBearerToken(authHeader: string | null) {
  if (!authHeader) return null;
  const [type, token] = authHeader.split(" ");
  if (type?.toLowerCase() !== "bearer" || !token) return null;
  return token;
}

export async function POST(req: Request) {
  const token = getBearerToken(req.headers.get("authorization"));
  if (!token || token !== process.env.OUTRANK_WEBHOOK_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await req.json();

  // Only act on publish events
  if (payload?.event_type !== "publish_articles") {
    return NextResponse.json({ ok: true, ignored: true });
  }

  const articles: OutrankArticle[] = payload?.data?.articles ?? [];
  if (!Array.isArray(articles) || articles.length === 0) {
    return NextResponse.json({ ok: true, empty: true });
  }

  // Validate env early (clear error if missing)
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const ghToken = process.env.GITHUB_TOKEN;
  const branch = process.env.GITHUB_BRANCH || "main";

  if (!owner || !repo || !ghToken) {
    return NextResponse.json(
      {
        error:
          "Missing GitHub env vars (GITHUB_OWNER, GITHUB_REPO, GITHUB_TOKEN)",
      },
      { status: 500 }
    );
  }

  const results: Array<{ slug: string; ok: boolean; error?: string }> = [];

  for (const a of articles) {
    const slug = String(a?.slug ?? "").trim();

    try {
      if (!slug) throw new Error("Missing article slug");

      const title = String(a.title || slug);
      const description = (
        a.meta_description ||
        a.description ||
        ""
      ).toString();
      const date = (a.created_at || new Date().toISOString()).toString();
      const tags = Array.isArray(a.tags) ? (a.tags as string[]) : [];

      const mdx = toMdx({
        title,
        description,
        date,
        tags,
        category: tags?.[0] ?? "Guides",
        body: (a.content_markdown || a.content || "").toString(),
        cover: a.image_url ? String(a.image_url) : "",
      });

      const pathInRepo = `content/blog/${slug}.mdx`;
      const commitMessage = `blog: publish ${slug} (Outrank)`;

      await upsertFileToGitHub({
        owner,
        repo,
        path: pathInRepo,
        content: mdx,
        message: commitMessage,
        branch,
        token: ghToken,
      });

      results.push({ slug, ok: true });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      results.push({ slug: slug || "unknown", ok: false, error: message });
    }
  }

  return NextResponse.json({ ok: true, results });
}

function toMdx(opts: {
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  cover?: string;
  body: string;
}) {
  const fm = [
    "---",
    `title: ${JSON.stringify(opts.title)}`,
    `description: ${JSON.stringify(opts.description)}`,
    `date: ${JSON.stringify(opts.date)}`,
    `category: ${JSON.stringify(opts.category)}`,
    `tags: ${JSON.stringify(opts.tags ?? [])}`,
    ...(opts.cover ? [`cover: ${JSON.stringify(opts.cover)}`] : []),
    "---",
    "",
  ].join("\n");

  const body = opts.body?.trim() ? opts.body.trim() : "## Coming soon\n";
  return fm + body + "\n";
}

async function upsertFileToGitHub(opts: {
  owner: string;
  repo: string;
  path: string;
  content: string;
  message: string;
  branch: string;
  token: string;
}) {
  const apiBase = `https://api.github.com/repos/${opts.owner}/${opts.repo}/contents/${opts.path}`;

  // Get current sha if file exists (needed to update)
  const getRes = await fetch(
    `${apiBase}?ref=${encodeURIComponent(opts.branch)}`,
    {
      headers: {
        Authorization: `Bearer ${opts.token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  let sha: string | undefined;
  if (getRes.ok) {
    const j = await getRes.json();
    sha = j?.sha;
  }

  const putRes = await fetch(apiBase, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${opts.token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: JSON.stringify({
      message: opts.message,
      content: Buffer.from(opts.content, "utf8").toString("base64"),
      branch: opts.branch,
      ...(sha ? { sha } : {}),
    }),
  });

  if (!putRes.ok) {
    const err = await putRes.text();
    throw new Error(`GitHub upsert failed: ${putRes.status} ${err}`);
  }

  return putRes.json();
}
