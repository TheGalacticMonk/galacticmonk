import type { CSSProperties } from "react";

type SparkleProps = {
  className?: string;
  style?: CSSProperties;
};

export default function Sparkle({ className, style }: SparkleProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="currentColor"
      className={`[filter:drop-shadow(0_0_0.3px_currentColor)_drop-shadow(0_0_1.5px_currentColor)_drop-shadow(0_0_3.3px_currentColor)] ${className ?? ""}`}
      style={style}
      aria-hidden="true"
    >
      <path d="M20 2c1.1 6.7 2.9 11.4 5.4 13.9 2.5 2.5 7.2 4.3 13.9 5.4-6.7 1.1-11.4 2.9-13.9 5.4-2.5 2.5-4.3 7.2-5.4 13.9-1.1-6.7-2.9-11.4-5.4-13.9C12.1 24.2 7.4 22.4.7 21.3c6.7-1.1 11.4-2.9 13.9-5.4C17.1 13.4 18.9 8.7 20 2Z" />
    </svg>
  );
}
