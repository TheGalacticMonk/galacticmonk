import ConstellationBackground from "./ConstellationBackground";

/* Fixed to the viewport (not the page), so the canvas stays bounded to
   screen size no matter how long the page's content scrolls — keeps it
   cheap on the long-form pages instead of growing with page height. */
export default function PageConstellation() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      <ConstellationBackground className="h-full w-full opacity-50" />
    </div>
  );
}
