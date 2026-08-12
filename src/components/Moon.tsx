type MoonProps = {
  className?: string;
};

export default function Moon({ className }: MoonProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a.75.75 0 0 0-.9-.98A9.5 9.5 0 1 0 21.48 15.4a.75.75 0 0 0-.98-.9Z" />
    </svg>
  );
}
