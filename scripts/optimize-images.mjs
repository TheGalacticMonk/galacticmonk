#!/usr/bin/env node
// Resizes/recompresses source images in public/work and public/about-images
// in place, keeping the same paths (so src/lib/work.ts and any inline image
// arrays need no changes) and the same format (so no <picture>/extension
// rewiring). Runs as an npm "prebuild" step before `next build`.
//
// Idempotency: since output is written back to the same path as the input,
// a naive re-run would recompress an already-compressed JPEG every build,
// degrading quality generation over generation. To avoid that, a manifest
// records the hash of each file *after* this script last touched it; a file
// is only reprocessed when its current hash no longer matches the manifest
// (i.e. it's an original that hasn't been optimized yet, or Jason swapped
// in a new source image).

import { createHash } from "node:crypto";
import { readFile, writeFile, stat } from "node:fs/promises";
import { readdirSync, statSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const TARGET_DIRS = ["public/work", "public/about-images"];
const MANIFEST_PATH = path.join(import.meta.dirname, ".image-optimize-manifest.json");
const EXTENSIONS = new Set([".jpg", ".jpeg", ".png"]);
const MAX_DIMENSION = 2600; // long edge, px — comfortably above any on-page display size, incl. 2x retina lightbox zoom
const JPEG_QUALITY = 85;
const PNG_COMPRESSION_LEVEL = 9; // lossless recompression only, preserves transparency/quality

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walk(full));
    } else if (EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      out.push(full);
    }
  }
  return out;
}

async function hashFile(filePath) {
  const buf = await readFile(filePath);
  return createHash("sha256").update(buf).digest("hex");
}

async function loadManifest() {
  try {
    return JSON.parse(await readFile(MANIFEST_PATH, "utf8"));
  } catch {
    return {};
  }
}

async function optimize(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const before = (await stat(filePath)).size;
  const image = sharp(filePath, { failOn: "none" }).rotate(); // .rotate() bakes in EXIF orientation before we strip metadata
  const meta = await image.metadata();

  let pipeline = image.resize({
    width: MAX_DIMENSION,
    height: MAX_DIMENSION,
    fit: "inside",
    withoutEnlargement: true,
  });

  if (ext === ".png") {
    pipeline = pipeline.png({ compressionLevel: PNG_COMPRESSION_LEVEL, adaptiveFiltering: true });
  } else {
    pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true });
  }

  const outBuffer = await pipeline.toBuffer();

  // Guard against the rare case where recompression doesn't help (already
  // small/optimized) or an edge-case format quirk makes output bigger —
  // never write a result larger than the input.
  if (outBuffer.length >= before) {
    return { filePath, before, after: before, skippedNoGain: true, width: meta.width, height: meta.height };
  }

  await writeFile(filePath, outBuffer);
  return { filePath, before, after: outBuffer.length, width: meta.width, height: meta.height };
}

async function main() {
  const manifest = await loadManifest();
  const files = TARGET_DIRS.flatMap((dir) => {
    const full = path.join(ROOT, dir);
    try {
      statSync(full);
    } catch {
      return [];
    }
    return walk(full);
  });

  let processed = 0;
  let skipped = 0;
  let totalBefore = 0;
  let totalAfter = 0;

  for (const filePath of files) {
    const relPath = path.relative(ROOT, filePath);
    const currentHash = await hashFile(filePath);

    if (manifest[relPath] === currentHash) {
      skipped++;
      continue;
    }

    const result = await optimize(filePath);
    const newHash = await hashFile(filePath);
    manifest[relPath] = newHash;
    totalBefore += result.before;
    totalAfter += result.after;
    processed++;
    const pct = result.before > 0 ? (100 * (1 - result.after / result.before)).toFixed(0) : "0";
    console.log(`  ${relPath}: ${(result.before / 1024).toFixed(0)}KB -> ${(result.after / 1024).toFixed(0)}KB (-${pct}%)`);
  }

  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");

  console.log(
    `\nImage optimization: ${processed} processed, ${skipped} already optimized (skipped).`
  );
  if (processed > 0) {
    console.log(
      `  ${(totalBefore / 1024 / 1024).toFixed(1)}MB -> ${(totalAfter / 1024 / 1024).toFixed(1)}MB`
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
