import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Galactic Monk",
    short_name: "Galactic Monk",
    description:
      "Galactic Monk is the Los Angeles-based creative production studio of Jason Lee — creative production for multidimensional souls.",
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
