import { CASE_STUDY, CHANNEL_COLORS, CHANNEL_ROI, INSIGHTS } from "../data/caseStudy";
import { chartAxisTick, chartGridStroke, chartTooltipStyle } from "../lib/chartTheme";
import { formatUsd } from "../lib/format";
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
          Each bubble is a program at {CASE_STUDY.company}. X = CAC, Y = LTV, size = customers.
          The diagonal is LTV = CAC (break-even).
        </p>
      </header>

      <div className="h-[340px] w-full md:h-[380px]">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 8, right: 20, bottom: 12, left: 4 }}>
            <CartesianGrid stroke={chartGridStroke} strokeDasharray="3 3" />
            <XAxis
              type="number"
              dataKey="cac"
              name="CAC"
              domain={[0, axisMax]}
              tickFormatter={(v) => `${Math.round(v / 1000)}k`}
              stroke="#5a6f8c"
              tick={chartAxisTick}
              label={{
                value: "CAC ($)",
                position: "insideBottom",
                offset: -2,
                fill: "#b4c0d4",
                fontSize: 12,
              }}
            />
            <YAxis
              type="number"
              dataKey="ltv"
              name="LTV"
              domain={[0, axisMax]}
              tickFormatter={(v) => `${Math.round(v / 1000)}k`}
              stroke="#5a6f8c"
              tick={chartAxisTick}
              label={{
                value: "LTV ($)",
                angle: -90,
                position: "insideLeft",
                fill: "#b4c0d4",
                fontSize: 12,
              }}
            />
            <ZAxis type="number" dataKey="customers" range={[80, 800]} />
            <Tooltip
              {...chartTooltipStyle}
              formatter={(value: number, name: string) => {
                if (name === "cac" || name === "ltv") {
                  return [formatUsd(value), name.toUpperCase()];
                }
                if (name === "customers") return [value, "Customers"];
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
        Above the red line: LTV &gt; CAC. Prefer upper-left for efficient scale.
      </p>

      <aside className="mt-4 rounded-xl border border-ink-700/60 bg-ink-950/50 px-4 py-3 text-sm leading-relaxed text-ink-300">
        <span className="font-medium text-ink-100">Insight: </span>
        {INSIGHTS.scatter}
      </aside>
    </section>
  );
}
