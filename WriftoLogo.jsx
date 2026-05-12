import { useId } from "react";

/**
 * WRIFTO monogram: letter W on a banking-style tile (optional pulse dot).
 * theme="onDark" — navy tile, light W (for sidebar / hero).
 * theme="onLight" — soft sky tile, navy W (for white header).
 */
export function WriftoMark({ className = "", size = 40, theme = "onDark" }) {
  const isLight = theme === "onLight";
  const gid = useId().replace(/:/g, "");
  const gradId = `wft-${gid}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      className={className}
      aria-hidden
      focusable="false"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          {isLight ? (
            <>
              <stop stopColor="#e0f2fe" />
              <stop offset="1" stopColor="#bae6fd" />
            </>
          ) : (
            <>
              <stop stopColor="#0f2744" />
              <stop offset="1" stopColor="#1e4a7a" />
            </>
          )}
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="38" height="38" rx="11" fill={`url(#${gradId})`} stroke={isLight ? "#7dd3fc" : "#38bdf8"} strokeWidth="1.25" />
      <text
        x="20"
        y="20.5"
        dominantBaseline="central"
        textAnchor="middle"
        fontFamily="Outfit, system-ui, sans-serif"
        fontSize="23"
        fontWeight="800"
        letterSpacing="-0.05em"
        fill={isLight ? "#0a1628" : "#f8fafc"}
      >
        W
      </text>
      <circle cx="31" cy="10" r="3.25" fill="#38bdf8" />
    </svg>
  );
}

/** Logo is the W mark only (wordmark optional). */
export default function WriftoLogo({
  theme = "onDark",
  showWordmark = false,
  markSize = 40,
  className = "",
  wordmarkClassName = "",
}) {
  const wm = theme === "onLight" ? "text-bank-navy" : "text-white";

  return (
    <div className={`flex items-center gap-2.5 min-w-0 ${className}`}>
      <WriftoMark size={markSize} theme={theme} className="shrink-0 shadow-sm" />
      {showWordmark && (
        <span className={`font-display font-bold tracking-tight leading-none ${wm} ${wordmarkClassName}`}>
          WRIFT<span className={theme === "onLight" ? "text-sky-600" : "text-sky-300"}>O</span>
        </span>
      )}
    </div>
  );
}
