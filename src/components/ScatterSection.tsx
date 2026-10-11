import { CASE_STUDY, CHANNEL_COLORS, CHANNEL_ROI, INSIGHTS } from "../data/caseStudy";
import { chartAxisTick, chartGridStroke, chartTooltipStyle } from "../lib/chartTheme";
import { formatUsd, formatUsdCompact } from "../lib/format";
import {
  CartesianGrid,
  Cell,
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
          4 · Decide · Channel ROI (CAC vs LTV)
        </p>
        <h2 className="mt-1 text-lg font-semibold text-ink-100 md:text-xl">
          Where to scale vs cut
        </h2>
        <p className="mt-1 max-w-2xl text-sm text-ink-400">
          Decision map for {CASE_STUDY.company}. Axes in USD: CAC vs LTV. Bubble size = customers.
          Diagonal = break-even (LTV = CAC). Pair with the statistical evidence above.
        </p>
      </header>

      <div className="h-[300px] w-full md:h-[340px]">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 12, right: 20, bottom: 8, left: 8 }}>
            <CartesianGrid stroke={chartGridStroke} strokeDasharray="3 3" />
            <XAxis
              type="number"
              dataKey="cac"
              name="CAC"
              domain={[0, axisMax]}
              tickFormatter={(v) => formatUsdCompact(v)}
              stroke="#5a6f8c"
              tick={chartAxisTick}
            />
            <YAxis
              type="number"
              dataKey="ltv"
              name="LTV"
              domain={[0, axisMax]}
              tickFormatter={(v) => formatUsdCompact(v)}
              stroke="#5a6f8c"
              tick={chartAxisTick}
              width={56}
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
            <Scatter name="Programs" data={scatterData} fill="#5eead4" legendType="none">
              {scatterData.map((entry) => (
                <Cell key={`cell-${entry.id}`} fill={entry.fill} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-1 flex items-center justify-between gap-3 text-xs text-ink-400">
        <span className="w-14 shrink-0 text-left">LTV (USD)</span>
        <span className="flex-1 text-center">CAC (USD per customer) · e.g. $8.6k = $8,600</span>
        <span className="w-14 shrink-0" />
      </div>
      <p className="mt-2 text-center text-xs text-ink-500">
        Above the red line: LTV &gt; CAC. Prefer upper-left for efficient scale.
      </p>

      <aside className="mt-4 rounded-xl border border-ink-700/60 bg-ink-950/50 px-4 py-3 text-sm leading-relaxed text-ink-300">
        <span className="font-medium text-ink-100">Insight: </span>
        {INSIGHTS.scatter}
      </aside>
    </section>
  );
}
