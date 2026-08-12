import type { MetadataRoute } from "next";
import { WORK } from "@/lib/work";

export const dynamic = "force-static";

const BASE_URL = "https://galacticmonk.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE_URL}/work/`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/about/`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${BASE_URL}/contact/`, changeFrequency: "yearly", priority: 0.6 },
  ];

  const workRoutes: MetadataRoute.Sitemap = WORK.filter((item) => !item.hidden).map((item) => ({
    url: `${BASE_URL}/work/${item.id}/`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...workRoutes];
}
