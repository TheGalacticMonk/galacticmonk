import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const dynamic = "force-static";
export const alt = "Galactic Monk — Creative Producer & Alchemist";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const frontData = await readFile(join(process.cwd(), "public/front-og.png"), "base64");
  const frontSrc = `data:image/png;base64,${frontData}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1a1438",
          backgroundImage:
            "radial-gradient(ellipse 90% 70% at 50% 55%, #2c2255 0%, #1a1438 75%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={frontSrc} height={630} width={1068} />
      </div>
    ),
    { ...size }
  );
}
