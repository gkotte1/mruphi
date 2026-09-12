import "./pulse-mic.css";

export function MicIcon({ size = 30 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ position: "relative" }}
    >
      <rect x="9" y="2" width="6" height="12" rx="3" fill="#007EFF" />
      <path
        d="M5 11a7 7 0 0014 0"
        stroke="#007EFF"
        strokeWidth="1.7"
        fill="none"
        strokeLinecap="round"
      />
      <line
        x1="12"
        y1="18"
        x2="12"
        y2="21"
        stroke="#007EFF"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <line
        x1="8"
        y1="21"
        x2="16"
        y2="21"
        stroke="#007EFF"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CheckIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16">
      <circle cx="8" cy="8" r="8" fill="#007EFF" />
      <polyline
        points="4.5,8.2 7,10.6 11.5,5.4"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PulseMic({ size = 56, icon = 30 }: { size?: number; icon?: number }) {
  return (
    <div
      className="hl-pulse-mic"
      style={{
        position: "relative",
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <span className="hl-pulse-mic-ring" />
      <span className="hl-pulse-mic-ring hl-pulse-mic-ring2" />
      <MicIcon size={icon} />
    </div>
  );
}
