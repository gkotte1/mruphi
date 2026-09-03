import type { SVGProps } from "react";

/**
 * Line icons in the Murphi house style, traced from
 * murphi-project-assets/icons/ — 24 viewBox, 1.7 stroke, currentColor,
 * round caps and joins. Never filled, never duotone.
 */

const BASE: SVGProps<SVGSVGElement> = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

const PATHS = {
  /** download/dl-0 — microphone, restyled to the segment house spec */
  mic: (
    <>
      <path d="M12 3.2a2.7 2.7 0 0 0-2.7 2.7v6.3a2.7 2.7 0 0 0 5.4 0V5.9A2.7 2.7 0 0 0 12 3.2Z" />
      <path d="M18.2 10.6v1.8a6.2 6.2 0 0 1-12.4 0v-1.8" />
      <path d="M12 18.6v2.2M9 20.8h6" />
    </>
  ),
  chartup: (
    <>
      <path d="M3.8 19.4h16.4" />
      <path d="m6 15.6 3.8-4.2 3.2 2.6 5.2-6" />
      <path d="M15.6 7.6h3v3" />
    </>
  ),
  community: (
    <>
      <circle cx="9.2" cy="8.6" r="2.9" />
      <path d="M3.7 19c0-3.1 2.5-5.1 5.5-5.1s5.5 2 5.5 5.1" />
      <path d="M16.2 6.5a2.9 2.9 0 0 1 0 4.3" />
      <path d="M17 13.9c2.3.5 3.7 2.4 3.7 4.9" />
    </>
  ),
  card: (
    <>
      <rect x="2.6" y="5" width="18.8" height="14" rx="2.4" />
      <path d="M2.6 9.6h18.8M6.4 14.6h3.6" />
    </>
  ),
  route: (
    <>
      <circle cx="6.2" cy="6.2" r="2.4" />
      <circle cx="17.8" cy="17.8" r="2.4" />
      <path d="M6.2 8.6v4.6a4.6 4.6 0 0 0 4.6 4.6h4.6" />
    </>
  ),
  exchange: <path d="M4 8.6h13.4l-3-3M20 15.4H6.6l3 3" />,
  home: (
    <>
      <path d="M3.6 10.6 12 4l8.4 6.6" />
      <path d="M6 9.9v9.5h12V9.9" />
      <path d="M10 19.4v-4.2h4v4.2" />
    </>
  ),
  code: <path d="M8.6 8.2 4.4 12l4.2 3.8M15.4 8.2 19.6 12l-4.2 3.8M13.4 5.4l-2.8 13.2" />,
  server: (
    <>
      <rect x="3.6" y="4.2" width="16.8" height="6.2" rx="1.8" />
      <rect x="3.6" y="13.4" width="16.8" height="6.2" rx="1.8" />
      <circle cx="7" cy="7.3" r=".9" />
      <circle cx="7" cy="16.5" r=".9" />
    </>
  ),
  sealcheck: (
    <>
      <circle cx="12" cy="12" r="8.2" />
      <path d="m8.4 12.2 2.5 2.5 4.7-5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.6 5 6.4v5.2c0 4 3 7.6 7 8.8 4-1.2 7-4.8 7-8.8V6.4z" />
      <path d="m9.2 12.2 2 2 3.6-3.8" />
    </>
  ),
  pulse: <path d="M3.4 12h3.9l2-4.6 3.1 9.2 2.1-4.6h5.9" />,
  doc: (
    <>
      <path d="M13.6 2.6H6.8a2 2 0 0 0-2 2v14.8a2 2 0 0 0 2 2h10.4a2 2 0 0 0 2-2V8z" />
      <path d="M13.6 2.6V8h5.6" />
      <path d="M8.6 12.8h6.8M8.6 16.4h4.6" />
    </>
  ),
  /** An arrow into a tray — the same shape Lucide's Download draws, in the
      house spec: 24 viewBox, 1.7 stroke, round caps. */
  download: (
    <>
      <path d="M12 3.4v11.2" />
      <path d="M7.6 10.2 12 14.6l4.4-4.4" />
      <path d="M4.6 17.2v1.8a2 2 0 0 0 2 2h10.8a2 2 0 0 0 2-2v-1.8" />
    </>
  ),
  heart: <path d="M12 20.2 4.9 13.1a4.6 4.6 0 0 1 7.1-5.8 4.6 4.6 0 0 1 7.1 5.8z" />,
  check: <path d="m4.6 12.4 4.8 4.8L19.4 6.8" />,
  arrow: <path d="M4.4 12h13.2M13 7.4 17.6 12 13 16.6" />,
  brain: (
    <>
      <path d="M12 5.2v13.6" />
      <path d="M9.6 5.2a2.6 2.6 0 0 0-2.5 2.1 2.5 2.5 0 0 0-1.6 4.2 2.6 2.6 0 0 0 1.4 4.2 2.6 2.6 0 0 0 5 .9" />
      <path d="M14.4 5.2a2.6 2.6 0 0 1 2.5 2.1 2.5 2.5 0 0 1 1.6 4.2 2.6 2.6 0 0 1-1.4 4.2 2.6 2.6 0 0 1-5 .9" />
    </>
  ),
  network: (
    <>
      <circle cx="12" cy="5" r="2.3" />
      <circle cx="5.4" cy="18" r="2.3" />
      <circle cx="18.6" cy="18" r="2.3" />
      <path d="M10.6 6.9 6.6 15.9M13.4 6.9l4 9M7.7 18h8.6" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3.4 8.4 4.3-8.4 4.3-8.4-4.3z" />
      <path d="m3.6 12.2 8.4 4.3 8.4-4.3" />
      <path d="m3.6 16.4 8.4 4.2 8.4-4.2" />
    </>
  ),
  scan: (
    <>
      <path d="M3.6 8.4V6a2.4 2.4 0 0 1 2.4-2.4h2.4M15.6 3.6H18A2.4 2.4 0 0 1 20.4 6v2.4M20.4 15.6V18a2.4 2.4 0 0 1-2.4 2.4h-2.4M8.4 20.4H6A2.4 2.4 0 0 1 3.6 18v-2.4" />
      <path d="M3.6 12h16.8" />
    </>
  ),
  sync: (
    <>
      <path d="M20.2 12a8.2 8.2 0 0 1-13.9 5.9M3.8 12a8.2 8.2 0 0 1 13.9-5.9" />
      <path d="M17.7 2.6v3.6h-3.6M6.3 21.4v-3.6h3.6" />
    </>
  ),
  /** segment/phone — handset, traced 1:1 from the kit file */
  phone: (
    <>
      <rect x="6.6" y="2.6" width="10.8" height="18.8" rx="2.4" />
      <path d="M10.6 18.4h2.8" />
    </>
  ),
  /* social/*.svg — traced 1:1 from the kit. The brand marks are filled, so
     each path overrides the shared outline preset. */
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5.2" strokeWidth={1.75} />
      <circle cx="12" cy="12" r="4" strokeWidth={1.75} />
      <circle cx="17.1" cy="6.9" r="1.15" fill="currentColor" stroke="none" />
    </>
  ),
  linkedin: (
    <path
      fill="currentColor"
      stroke="none"
      d="M4.98 3.5a2.5 2.5 0 1 1-.02 5 2.5 2.5 0 0 1 .02-5zM3.2 9.05h3.57V21H3.2zM9.3 9.05h3.42v1.63h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47V21h-3.57v-5.39c0-1.29-.02-2.94-1.79-2.94-1.79 0-2.07 1.4-2.07 2.85V21H9.3z"
    />
  ),
  /** The X mark, drawn as a filled glyph like the other brand marks. */
  x: (
    <path
      fill="currentColor"
      stroke="none"
      d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.96 6.82H1.68l7.73-8.84L1.25 2.25h6.83l4.71 6.23zm-1.16 17.52h1.83L7.08 4.13H5.12z"
    />
  ),
  facebook: (
    <path
      fill="currentColor"
      stroke="none"
      d="M13.4 21v-8.2h2.76l.41-3.2H13.4V7.55c0-.93.26-1.56 1.59-1.56h1.7V3.13A22.7 22.7 0 0 0 14.2 3c-2.45 0-4.13 1.5-4.13 4.24V9.6H7.3v3.2h2.77V21z"
    />
  ),
  chevron: <path d="m5.5 8.8 4.5 4.4 4.5-4.4" strokeWidth={2} />,
  close: <path d="M6 6l12 12M18 6 6 18" strokeWidth={2} />,
  menu: <path d="M3.6 7h16.8M3.6 12h16.8M3.6 17h11" strokeWidth={2} />,
} as const;

export type IconName = keyof typeof PATHS;

type IconProps = SVGProps<SVGSVGElement> & { name: IconName };

export function Icon({ name, ...props }: IconProps) {
  return (
    <svg {...BASE} {...props}>
      {PATHS[name]}
    </svg>
  );
}
