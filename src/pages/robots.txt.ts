import type { APIRoute } from "astro";

export const prerender = true;

const ROBOTS_TXT = `User-Agent: *
Allow: /

Sitemap: https://galacticmonk.com/sitemap.xml
`;

export const GET = (() =>
  new Response(ROBOTS_TXT, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  })) satisfies APIRoute;
