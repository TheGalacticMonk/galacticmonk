import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Galactic Monk",
    short_name: "Galactic Monk",
    description:
      "Creative production for film, photography, sound, and digital — shaped by Jason Lee, Creative Producer & Alchemist.",
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
  };
}
