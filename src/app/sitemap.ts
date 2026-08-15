import type { MetadataRoute } from "next";
import { WORK } from "@/lib/work";

export const dynamic = "force-static";

const BASE_URL = "https://galacticmonk.com";

// Build-time timestamp — accurate for the static routes since this file is
// regenerated on every deploy, not a fabricated freshness signal.
const BUILD_DATE = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE_URL}/work/`, lastModified: BUILD_DATE, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/about/`, lastModified: BUILD_DATE, changeFrequency: "yearly", priority: 0.6 },
    { url: `${BASE_URL}/contact/`, lastModified: BUILD_DATE, changeFrequency: "yearly", priority: 0.6 },
  ];

  const workRoutes: MetadataRoute.Sitemap = WORK.filter((item) => !item.hidden).map((item) => ({
    url: `${BASE_URL}/work/${item.id}/`,
    lastModified: new Date(`${item.year}-01-01`),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...workRoutes];
}
