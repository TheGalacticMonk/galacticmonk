# Galactic Monk

Static Astro site for [galacticmonk.com](https://galacticmonk.com), with React
islands for the existing interactive experiences and Three.js artwork.

## Runtime

This project is pinned to Node.js 26.6.0 and npm 11.17.0. Version managers that
support `.nvmrc` or `.node-version` will select the correct Node release.

## Development

```bash
npm install
npm run dev
```

## Verification and production build

```bash
npm run lint
npm run check
npm run build
npm run preview
```

The static production site is emitted to `out/` with trailing-slash routes.
The `prebuild` image pipeline is hash-idempotent: it preserves original files
for lightboxes and generates responsive AVIF derivatives under
`public/optimized/` for on-page delivery.

## Architecture

- `src/layouts/SiteLayout.astro` owns the shared document, metadata, navigation,
  analytics, structured data, and footer.
- `src/pages/` defines the static routes and metadata endpoints.
- `src/components/astro/` contains reusable page sections.
- Existing stateful React components remain focused Astro islands to preserve
  animation, media, form, gallery, lightbox, and WebGL behavior.
- Files in `public/` retain their production root-relative URLs.
