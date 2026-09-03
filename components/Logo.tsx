import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * The logo is shipped as a bitmap and never redrawn or recoloured — the mark is
 * a hand-drawn swirl-and-arrow that does not survive reconstruction.
 * Blue file on light grounds, white file on dark.
 *
 * Measured geometry (brand/logos/README.md): the source is 852 x 150 with the
 * square mark occupying exactly 117 x 117 at origin (0, 0).
 */

const SRC = {
  blue: "/brand/logos/murphi-logo-blue.png",
  white: "/brand/logos/murphi-logo-white.png",
} as const;

const NATIVE_W = 852;
const NATIVE_H = 150;
const MARK = 117;

type Variant = keyof typeof SRC;

/** Full lockup: mark + wordmark. Sized by height. */
export function Logo({
  variant = "blue",
  height = 28,
  className,
  priority,
}: {
  variant?: Variant;
  height?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={SRC[variant]}
      alt="Murphi.ai"
      width={NATIVE_W}
      height={NATIVE_H}
      priority={priority}
      className={cn("w-auto", className)}
      style={{ height, width: (NATIVE_W / NATIVE_H) * height }}
    />
  );
}

/**
 * The mark alone — a square window onto the first 117px of the bitmap,
 * scaled so the mark fills it exactly.
 */
export function LogoMark({
  variant = "blue",
  size = 34,
  className,
}: {
  variant?: Variant;
  size?: number;
  className?: string;
}) {
  const scale = size / MARK;

  return (
    <span
      className={cn("relative block shrink-0 overflow-hidden", className)}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <Image
        src={SRC[variant]}
        alt=""
        width={NATIVE_W}
        height={NATIVE_H}
        className="absolute left-0 top-0 max-w-none"
        style={{ width: NATIVE_W * scale, height: NATIVE_H * scale }}
      />
    </span>
  );
}
