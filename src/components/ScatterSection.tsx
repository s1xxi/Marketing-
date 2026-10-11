import { CASE_STUDY, CHANNEL_COLORS, CHANNEL_ROI, INSIGHTS } from "../data/caseStudy";
import { chartAxisTick, chartGridStroke, chartTooltipStyle } from "../lib/chartTheme";
import { formatUsd, formatUsdCompact } from "../lib/format";
import {
  CartesianGrid,
  Cell,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";

const scatterData = CHANNEL_ROI.map((p) => ({
  ...p,
  fill: CHANNEL_COLORS[p.channel],
}));

export function ScatterSection() {
  const maxAxis = Math.max(
    ...CHANNEL_ROI.map((p) => p.cac),
    ...CHANNEL_ROI.map((p) => p.ltv),
  );
  const axisMax = Math.ceil(maxAxis / 50_000) * 50_000;

  return (
    <section className="rounded-2xl border border-ink-700/70 bg-ink-900/55 p-5 md:p-6">
      <header className="mb-4 border-b border-ink-700/50 pb-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
          3 · Channel ROI (CAC vs LTV)
        </p>
        <h2 className="mt-1 text-lg font-semibold text-ink-100 md:text-xl">
          Where to scale vs cut
        </h2>
        <p className="mt-1 max-w-2xl text-sm text-ink-400">
          Each bubble is a program at {CASE_STUDY.company}. Axes are in USD: CAC (cost to acquire
          one customer) vs LTV (lifetime value). Bubble size = number of customers. Diagonal =
          break-even (LTV = CAC).
        </p>
      </header>

      <div className="h-[340px] w-full md:h-[380px]">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 8, right: 24, bottom: 28, left: 16 }}>
            <CartesianGrid stroke={chartGridStroke} strokeDasharray="3 3" />
            <XAxis
              type="number"
              dataKey="cac"
              name="CAC"
              unit=" USD"
              domain={[0, axisMax]}
              tickFormatter={(v) => formatUsdCompact(v)}
              stroke="#5a6f8c"
              tick={chartAxisTick}
              label={{
                value: "CAC (USD per customer)",
                position: "insideBottom",
                offset: -16,
                fill: "#b4c0d4",
                fontSize: 12,
              }}
            />
            <YAxis
              type="number"
              dataKey="ltv"
              name="LTV"
              unit=" USD"
              domain={[0, axisMax]}
              tickFormatter={(v) => formatUsdCompact(v)}
              stroke="#5a6f8c"
              tick={chartAxisTick}
              width={64}
              label={{
                value: "LTV (USD)",
                angle: -90,
                position: "insideLeft",
                offset: 4,
                fill: "#b4c0d4",
                fontSize: 12,
              }}
            />
            <ZAxis type="number" dataKey="customers" range={[80, 800]} name="Customers" />
            <Tooltip
              {...chartTooltipStyle}
              formatter={(value: number, name: string) => {
                if (name === "CAC" || name === "cac") {
                  return [formatUsd(value), "CAC (USD)"];
                }
                if (name === "LTV" || name === "ltv") {
                  return [formatUsd(value), "LTV (USD)"];
                }
                if (name === "customers" || name === "Customers") {
                  return [value, "Customers"];
                }
                return [value, name];
              }}
              labelFormatter={(_, payload) => payload?.[0]?.payload?.label ?? ""}
            />
            <ReferenceLine
              segment={[
                { x: 0, y: 0 },
                { x: axisMax, y: axisMax },
              ]}
              stroke="#fb7185"
              strokeDasharray="6 4"
              ifOverflow="extendDomain"
            />
            <Legend wrapperStyle={{ color: "#b4c0d4" }} />
            <Scatter name="Programs" data={scatterData} fill="#5eead4">
              {scatterData.map((entry) => (
                <Cell key={`cell-${entry.id}`} fill={entry.fill} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-2 text-center text-xs text-ink-400">
        Axis values are USD (e.g. $8.6k = $8,600). Above the red line: LTV &gt; CAC.
      </p>

      <aside className="mt-4 rounded-xl border border-ink-700/60 bg-ink-950/50 px-4 py-3 text-sm leading-relaxed text-ink-300">
        <span className="font-medium text-ink-100">Insight: </span>
        {INSIGHTS.scatter}
      </aside>
    </section>
  );
}
