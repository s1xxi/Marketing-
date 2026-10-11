import {
  ACV_USD,
  CASE_STUDY,
  getClosedWonRevenueUsd,
  getFunnelCounts,
  INSIGHTS,
  STAGE_LABELS,
  type AudienceKey,
  type ChannelKey,
  type FunnelStageKey,
  type PeriodKey,
} from "../data/caseStudy";
import { formatCompact, formatPct, formatUsd } from "../lib/format";

const STAGES: FunnelStageKey[] = [
  "impressions",
  "clicks",
  "leads",
  "mql",
  "sql",
  "opportunities",
  "closed_won",
];

type Props = {
  channel: ChannelKey;
  audience: AudienceKey;
  period: PeriodKey;
  comparePeriod: PeriodKey;
};

function maxFunnelWidth(counts: Record<FunnelStageKey, number>): number {
  return Math.max(...STAGES.map((s) => counts[s]));
}

export function FunnelSection({ channel, audience, period, comparePeriod }: Props) {
  const current = getFunnelCounts(channel, audience, period);
  const compare = getFunnelCounts(channel, audience, comparePeriod);
  const maxW = maxFunnelWidth(current);
  const revenue = getClosedWonRevenueUsd(current);
  const compareRevenue = getClosedWonRevenueUsd(compare);

  return (
    <section className="rounded-2xl border border-ink-700/70 bg-ink-900/55 p-5 md:p-6">
      <header className="mb-5 flex flex-col gap-3 border-b border-ink-700/50 pb-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
            1 · Unify · Funnel + revenue
          </p>
          <h2 className="mt-1 text-lg font-semibold text-ink-100 md:text-xl">
            Pipeline backbone
          </h2>
          <p className="mt-1 max-w-xl text-sm text-ink-400">
            Unified cycle for {CASE_STUDY.company} (ads → CRM). Conversion and drop-off between
            stages; closed-won revenue at {formatUsd(ACV_USD)} ACV.
          </p>
        </div>
        <div className="rounded-xl border border-ink-700/80 bg-ink-800/60 px-4 py-3 text-left md:text-right">
          <p className="text-xs text-ink-400">Closed won revenue</p>
          <p className="font-mono text-xl font-semibold tracking-tight text-accent-glow">
            {formatUsd(revenue)}
          </p>
          {comparePeriod !== period ? (
            <p className="mt-1 text-xs text-ink-400">
              vs {comparePeriod === "last_month" ? "last month" : "this month"}:{" "}
              <span
                className={
                  revenue >= compareRevenue ? "font-medium text-emerald-400" : "font-medium text-rose-300"
                }
              >
                {formatPct(revenue / compareRevenue - 1, 1)}
              </span>
            </p>
          ) : null}
        </div>
      </header>

      <div className="space-y-3.5">
        {STAGES.map((stage, idx) => {
          const value = current[stage];
          const widthPct = Math.max(10, (value / maxW) * 100);
          const prev = idx > 0 ? current[STAGES[idx - 1]] : null;
          const convFromPrev = prev && prev > 0 ? value / prev : null;
          const dropFromPrev = convFromPrev !== null ? 1 - convFromPrev : null;

          return (
            <div key={stage}>
              {idx > 0 && convFromPrev !== null && dropFromPrev !== null ? (
                <div className="mb-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 pl-1 text-xs text-ink-400">
                  <span>
                    Conv from {STAGE_LABELS[STAGES[idx - 1]]}:{" "}
                    <span className="font-mono font-medium text-ink-100">
                      {formatPct(convFromPrev, 2)}
                    </span>
                  </span>
                  <span>
                    Drop-off:{" "}
                    <span className="font-mono font-medium text-rose-300">
                      {formatPct(dropFromPrev, 2)}
                    </span>
                  </span>
                </div>
              ) : null}
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-28 shrink-0 text-sm font-medium text-ink-200 md:w-36">
                  {STAGE_LABELS[stage]}
                </div>
                <div className="relative min-w-0 flex-1">
                  <div className="h-9 overflow-hidden rounded-lg bg-ink-800/90 ring-1 ring-ink-700/70">
                    <div
                      className="flex h-full items-center justify-end bg-gradient-to-r from-slate-600/90 to-teal-700/85 px-3 transition-[width] duration-500"
                      style={{ width: `${widthPct}%` }}
                    >
                      <span className="font-mono text-xs font-semibold tabular-nums text-ink-100">
                        {formatCompact(value)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <aside className="mt-5 rounded-xl border border-ink-700/60 bg-ink-950/50 px-4 py-3 text-sm leading-relaxed text-ink-300">
        <span className="font-medium text-ink-100">Insight: </span>
        {INSIGHTS.funnel}
      </aside>
    </section>
  );
}
