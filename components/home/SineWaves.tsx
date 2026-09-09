import { cn } from "@/lib/cn";

/** Thin sine-line texture for dark bands. Colour inherits via `currentColor`. */
export default function SineWaves({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 120"
      fill="none"
      aria-hidden
      className={cn("pointer-events-none", className)}
      preserveAspectRatio="none"
    >
      <path
        d="M0 52 C 160 12, 280 92, 440 52 S 760 12, 920 52 S 1240 92, 1440 52"
        stroke="currentColor"
        strokeWidth="1.25"
        opacity="0.45"
      />
      <path
        d="M0 78 C 180 38, 300 118, 480 78 S 820 38, 1000 78 S 1280 118, 1440 78"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.28"
      />
    </svg>
  );
}
