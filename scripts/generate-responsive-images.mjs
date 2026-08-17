#!/usr/bin/env node

import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { readdirSync, statSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const PUBLIC = path.join(ROOT, "public");
const OUTPUT = path.join(PUBLIC, "optimized");
const MANIFEST_PATH = path.join(import.meta.dirname, ".responsive-image-manifest.json");
const EXTENSIONS = new Set([".jpg", ".jpeg", ".png"]);
const TARGETS = [
  "public/about-images",
  "public/work",
  "public/monk-beach.jpg",
  "public/jason-lee.jpg",
];
const WIDTHS = [320, 480, 960];
const SETTINGS_VERSION = "avif-q68-v1";

function walk(target) {
  const absolute = path.join(ROOT, target);
  const stat = statSync(absolute);
  if (stat.isFile()) return [absolute];
  return readdirSync(absolute, { withFileTypes: true }).flatMap((entry) => {
    const child = path.join(absolute, entry.name);
    if (entry.isDirectory()) return walk(path.relative(ROOT, child));
    return EXTENSIONS.has(path.extname(entry.name).toLowerCase()) ? [child] : [];
  });
}

function outputPath(source, width) {
  const relative = path.relative(PUBLIC, source);
  const parsed = path.parse(relative);
  return path.join(OUTPUT, parsed.dir, `${parsed.name}-${width}.avif`);
}

async function sourceKey(source) {
  const bytes = await readFile(source);
  return createHash("sha256")
    .update(SETTINGS_VERSION)
    .update(bytes)
    .digest("hex");
}

async function loadManifest() {
  try {
    return JSON.parse(await readFile(MANIFEST_PATH, "utf8"));
  } catch {
    return {};
  }
}

async function main() {
  const manifest = await loadManifest();
  const sources = TARGETS.flatMap(walk);
  let generated = 0;
  let skipped = 0;

  for (const source of sources) {
    const key = await sourceKey(source);
    const relative = path.relative(ROOT, source);
    const outputs = WIDTHS.map((width) => outputPath(source, width));
    const outputsExist = outputs.every((file) => {
      try {
        return statSync(file).isFile();
      } catch {
        return false;
      }
    });

    if (manifest[relative] === key && outputsExist) {
      skipped++;
      continue;
    }

    await Promise.all(
      WIDTHS.map(async (width) => {
        const destination = outputPath(source, width);
        await mkdir(path.dirname(destination), { recursive: true });
        await sharp(source, { failOn: "none" })
          .rotate()
          .resize({ width, withoutEnlargement: true })
          .avif({ quality: 68, effort: 5 })
          .toFile(destination);
      }),
    );
    manifest[relative] = key;
    generated++;
  }

  await writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`Responsive images: ${generated} generated, ${skipped} unchanged.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
