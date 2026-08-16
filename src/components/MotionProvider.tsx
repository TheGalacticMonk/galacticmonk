"use client";

import { MotionConfig } from "framer-motion";

// Wraps page content so every framer-motion animation (Hero, WhyNotMeReasons)
// respects prefers-reduced-motion, matching the CSS animations and
// ConstellationBackground's canvas loop, which already do.
export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
