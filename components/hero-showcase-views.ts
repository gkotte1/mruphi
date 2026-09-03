import type { IconName } from "@/components/icons";

/**
 * The four views the hero dashboard cycles through.
 *
 * Every view has the same shape — three tiles, seven bars, three queue rows —
 * so switching between them cannot change the card's height. The Workflows
 * entry is the existing dashboard, unchanged; the other three are the same
 * visual language applied to the other parts of the platform.
 *
 * The house rule for this card still holds: everything shows *state*, nothing
 * quantifies a claim. No figures, no percentages, no invented metrics — the
 * chart has no axis and the progress bars are indeterminate.
 */

export type Tile = {
  title: string;
  detail: string;
  icon: IconName;
  active?: boolean;
};

export type QueueRow = {
  label: string;
  state: string;
  icon: IconName;
  done?: boolean;
};

export type View = {
  /** The rail entry and the breadcrumb in the window header. */
  id: string;
  icon: IconName;
  /** The live pill in the window header. */
  status: string;
  /** The board header. */
  title: string;
  subtitle: string;
  tiles: [Tile, Tile, Tile];
  chart: { title: string; legend: string; days: string[]; heights: number[] };
  queue: { title: string; rows: [QueueRow, QueueRow, QueueRow] };
};

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

export const VIEWS: View[] = [
  {
    id: "Workflows",
    icon: "network",
    status: "Processing",
    title: "Workflow overview",
    subtitle: "Across connected EHRs",
    tiles: [
      { title: "Analyze", detail: "OASIS & coding", icon: "scan", active: true },
      { title: "Automate", detail: "Engagement", icon: "pulse" },
      { title: "Generate", detail: "Documentation", icon: "doc" },
    ],
    chart: {
      title: "Episode activity",
      legend: "Automated",
      days: DAYS,
      heights: [46, 62, 54, 78, 68, 88, 74],
    },
    queue: {
      title: "Live queue",
      rows: [
        { label: "Coding review", state: "Done", icon: "sealcheck", done: true },
        { label: "Patient message", state: "Sent", icon: "community", done: true },
        { label: "Write back to EHR", state: "Syncing", icon: "sync" },
      ],
    },
  },

  {
    id: "Patients",
    icon: "community",
    status: "Engaging",
    title: "Patient overview",
    subtitle: "Across active episodes",
    tiles: [
      { title: "Intake", detail: "New referrals", icon: "community", active: true },
      { title: "Outreach", detail: "Secure messages", icon: "phone" },
      { title: "Follow-up", detail: "Visit reminders", icon: "heart" },
    ],
    chart: {
      title: "Patient activity",
      legend: "Engaged",
      days: DAYS,
      heights: [52, 44, 70, 58, 82, 66, 90],
    },
    queue: {
      title: "Recent activity",
      rows: [
        { label: "Intake completed", state: "Done", icon: "sealcheck", done: true },
        { label: "Visit reminder", state: "Sent", icon: "phone", done: true },
        { label: "Care plan update", state: "Syncing", icon: "sync" },
      ],
    },
  },

  {
    id: "Documentation",
    icon: "doc",
    status: "Drafting",
    title: "Documentation overview",
    subtitle: "Across clinician notes",
    tiles: [
      { title: "Capture", detail: "Ambient & dictation", icon: "mic", active: true },
      { title: "Structure", detail: "OASIS & HOPE", icon: "layers" },
      { title: "Review", detail: "Clinician sign-off", icon: "sealcheck" },
    ],
    chart: {
      title: "Notes completed",
      legend: "Same day",
      days: DAYS,
      heights: [64, 76, 58, 84, 72, 92, 68],
    },
    queue: {
      title: "Pending review",
      rows: [
        { label: "OASIS draft", state: "Ready", icon: "doc", done: true },
        { label: "Visit note", state: "Signed", icon: "sealcheck", done: true },
        { label: "HOPE assessment", state: "Drafting", icon: "sync" },
      ],
    },
  },

  {
    id: "Revenue",
    icon: "chartup",
    status: "Reconciling",
    title: "Revenue overview",
    subtitle: "Across claims & payments",
    tiles: [
      { title: "Scrub", detail: "Claim checks", icon: "scan", active: true },
      { title: "Submit", detail: "Payer queue", icon: "exchange" },
      { title: "Reconcile", detail: "Payments", icon: "card" },
    ],
    chart: {
      title: "Claim throughput",
      legend: "Clean claims",
      days: DAYS,
      heights: [58, 72, 66, 86, 74, 94, 80],
    },
    queue: {
      title: "Claim queue",
      rows: [
        { label: "Coding gaps", state: "Cleared", icon: "sealcheck", done: true },
        { label: "Claim submitted", state: "Accepted", icon: "exchange", done: true },
        { label: "Remittance", state: "Posting", icon: "sync" },
      ],
    },
  },
];

/** How long each view is held before the next one. */
export const VIEW_MS = 2000;
