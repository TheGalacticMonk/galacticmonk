export function hasOptimizedImage(src: string) {
  return /\.(?:jpe?g|png)(?:\?|$)/i.test(src);
}

export function optimizedImageSrc(src: string, width: 320 | 480 | 960) {
  const clean = src.split("?")[0];
  const extensionIndex = clean.lastIndexOf(".");
  const stem = extensionIndex >= 0 ? clean.slice(0, extensionIndex) : clean;
  return `/optimized${stem}-${width}.avif`;
}

export function optimizedImageSrcSet(src: string) {
  return [320, 480, 960]
    .map((width) => `${optimizedImageSrc(src, width as 320 | 480 | 960)} ${width}w`)
    .join(", ");
}
