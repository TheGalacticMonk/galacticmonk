"use client";

/* This scene touches window/document/canvas directly and isn't SSR-safe, and
   this site is statically exported (output: "export"), so it must never
   render on the server. `ssr: false` is only permitted inside a Client
   Component, hence this thin wrapper: page.tsx (a Server Component) imports
   this normally, and this file is the one that calls next/dynamic with
   ssr: false. */

import dynamic from "next/dynamic";

const CelestialTransmutation = dynamic(
  () => import("./CelestialTransmutation"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[min(78vh,760px)] min-h-[460px] items-center justify-center bg-transparent text-sm tracking-wide text-cream-dim max-[760px]:h-[min(82vh,640px)] max-[760px]:min-h-[420px]">
        Loading scene…
      </div>
    ),
  }
);

export default function CelestialTransmutationLoader() {
  return <CelestialTransmutation />;
}
