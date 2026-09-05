import type { APIRoute } from "astro";

export const prerender = true;

const manifest = {
  name: "Galactic Monk",
  short_name: "Galactic Monk",
  description:
    "Creative production for film, photography, sound, and digital — shaped by Jason Lee, Producer & Alchemist.",
  start_url: "/",
  display: "standalone",
  background_color: "#1a1438",
  theme_color: "#1a1438",
  icons: [
    {
      src: "/icon.png",
      sizes: "512x512",
      type: "image/png",
    },
  ],
} as const;

export const GET = (() =>
  new Response(JSON.stringify(manifest), {
    headers: {
      "Content-Type": "application/manifest+json; charset=utf-8",
    },
  })) satisfies APIRoute;
