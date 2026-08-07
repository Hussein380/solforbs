interface StatusBadgeProps {
  status: "live" | "in_development" | "planned";
  size?: "sm" | "md";
}

const config = {
  live: {
    label: "Live",
    dot: "#16A34A",
    bg: "rgba(22,163,74,0.08)",
    text: "#15803D",
    border: "rgba(22,163,74,0.2)",
    glow: "0 0 5px rgba(22,163,74,0.3)",
  },
  in_development: {
    label: "In development",
    dot: "#2878E8",
    bg: "rgba(40,120,232,0.07)",
    text: "#1A3FD4",
    border: "rgba(40,120,232,0.18)",
    glow: "none",
  },
  planned: {
    label: "Planned",
    dot: "#D1D5DB",
    bg: "rgba(0,0,0,0.03)",
    text: "#9CA3AF",
    border: "rgba(0,0,0,0.08)",
    glow: "none",
  },
};

export default function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
  const { label, dot, bg, text, border, glow } = config[status];
  const sm = size === "sm";

  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      gap: sm ? 5 : 6,
      padding: sm ? "3px 9px" : "4px 12px",
      borderRadius: 999,
      background: bg,
      border: `1px solid ${border}`,
      fontSize: sm ? 11 : 12,
      fontWeight: 500,
      color: text,
      lineHeight: 1.5,
    }}>
      <span style={{
        width: sm ? 5 : 6, height: sm ? 5 : 6, borderRadius: "50%",
        background: dot, display: "inline-block", flexShrink: 0,
        boxShadow: glow,
        animation: status === "live" ? "live-pulse 2.2s ease-in-out infinite" : "none",
      }} />
      {label}
    </span>
  );
}
