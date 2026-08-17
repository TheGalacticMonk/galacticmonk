import type { APIRoute } from "astro";

import { WORK } from "../lib/work";

export const prerender = true;

const BASE_URL = "https://galacticmonk.com";

// Generated once per build, matching the previous static Next.js route.
const BUILD_DATE = new Date();

type ChangeFrequency = "weekly" | "monthly" | "yearly";

type SitemapEntry = {
  url: string;
  lastModified: Date;
  changeFrequency: ChangeFrequency;
  priority: number;
};

const staticRoutes: SitemapEntry[] = [
  {
    url: `${BASE_URL}/`,
    lastModified: BUILD_DATE,
    changeFrequency: "monthly",
    priority: 1,
  },
  {
    url: `${BASE_URL}/work/`,
    lastModified: BUILD_DATE,
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    url: `${BASE_URL}/about/`,
    lastModified: BUILD_DATE,
    changeFrequency: "yearly",
    priority: 0.6,
  },
  {
    url: `${BASE_URL}/contact/`,
    lastModified: BUILD_DATE,
    changeFrequency: "yearly",
    priority: 0.6,
  },
];

const workRoutes: SitemapEntry[] = WORK.filter((item) => !item.hidden).map(
  (item) => ({
    url: `${BASE_URL}/work/${item.id}/`,
    lastModified: new Date(`${item.year}-01-01`),
    changeFrequency: "monthly",
    priority: 0.7,
  }),
);

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function serializeEntry(entry: SitemapEntry): string {
  return `<url>
<loc>${escapeXml(entry.url)}</loc>
<lastmod>${entry.lastModified.toISOString()}</lastmod>
<changefreq>${entry.changeFrequency}</changefreq>
<priority>${entry.priority}</priority>
</url>`;
}

export const GET = (() => {
  const entries = [...staticRoutes, ...workRoutes];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(serializeEntry).join("\n")}
</urlset>
`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}) satisfies APIRoute;
