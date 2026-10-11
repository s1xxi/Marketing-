/** Shared Recharts styles — light text on dark panels (fixes black tooltip / label text). */
export const chartTooltipStyle = {
  contentStyle: {
    background: "#141c2b",
    border: "1px solid #2a3a52",
    borderRadius: 10,
    color: "#eef2f8",
    boxShadow: "0 12px 32px rgba(0,0,0,0.35)",
  },
  labelStyle: { color: "#eef2f8", fontWeight: 600 },
  itemStyle: { color: "#d6deeb" },
  cursor: { stroke: "#5a6f8c", strokeDasharray: "4 4" },
} as const;

export const chartAxisTick = { fill: "#9aacc4", fontSize: 12 };
export const chartGridStroke = "#243044";
