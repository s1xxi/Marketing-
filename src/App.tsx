import { useMemo, useState } from "react";
import { CASE_STUDY } from "./data/caseStudy";
import type { AudienceKey, ChannelKey, PeriodKey } from "./data/caseStudy";
import { CohortSection } from "./components/CohortSection";
import { DecisionsSection } from "./components/DecisionsSection";
import { EvidenceSection } from "./components/EvidenceSection";
import { FunnelSection } from "./components/FunnelSection";
import { ScatterSection } from "./components/ScatterSection";

type CohortMetric = "retention" | "revenue";
type CohortSource = "all" | "linkedin" | "google";

const selectClass =
  "rounded-lg border border-ink-600/80 bg-ink-800 px-3 py-2 text-sm text-ink-100 outline-none transition focus:border-accent/50 focus:ring-2 focus:ring-accent/25";

const METHOD_STEPS = [
  {
    n: "01",
    title: "Unify metrics",
    body: "One view across ads, web, and CRM — funnel + cohorts.",
  },
  {
    n: "02",
    title: "Back the method",
    body: "Statistical tests check that lifts are real, not noise.",
  },
  {
    n: "03",
    title: "Decide",
    body: "Channel ROI + clear scale / hold / cut actions.",
  },
] as const;

export default function App() {
  const [channel, setChannel] = useState<ChannelKey>("all");
  const [audience, setAudience] = useState<AudienceKey>("all");
  const [funnelPeriod, setFunnelPeriod] = useState<PeriodKey>("this_month");
  const [comparePeriod, setComparePeriod] = useState<PeriodKey>("last_month");
  const [cohortMetric, setCohortMetric] = useState<CohortMetric>("retention");
  const [cohortSource, setCohortSource] = useState<CohortSource>("all");

  const compareEnabled = funnelPeriod !== comparePeriod;

  const funnelCompare = useMemo(
    () => (compareEnabled ? comparePeriod : funnelPeriod),
    [compareEnabled, comparePeriod, funnelPeriod],
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-12">
      <header className="mb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
          NextBound
        </p>
        <h1 className="mt-1.5 text-3xl font-semibold tracking-tight text-ink-100 md:text-[2.15rem]">
          {CASE_STUDY.company}
        </h1>
        <p className="mt-1.5 max-w-2xl text-sm text-ink-400 md:text-base">
          {CASE_STUDY.tagline}
        </p>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink-300">
          <span className="font-medium text-ink-100">Case study: </span>
          {CASE_STUDY.narrative} This demo shows NextBound’s method end-to-end: unify marketing
          metrics, validate with evidence, then turn that into budget decisions.
        </p>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {METHOD_STEPS.map((s) => (
            <div
              key={s.n}
              className="rounded-xl border border-ink-700/70 bg-ink-900/45 px-4 py-3"
            >
              <p className="font-mono text-[11px] text-accent">{s.n}</p>
              <p className="mt-1 text-sm font-semibold text-ink-100">{s.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-ink-400">{s.body}</p>
            </div>
          ))}
        </div>
      </header>

      <div className="mb-8 grid gap-3 rounded-2xl border border-ink-700/70 bg-ink-900/50 p-4 sm:grid-cols-2 lg:grid-cols-5">
        <label className="flex flex-col gap-1.5 text-[11px] font-medium uppercase tracking-wide text-ink-400">
          Channel
          <select
            className={selectClass}
            value={channel}
            onChange={(e) => setChannel(e.target.value as ChannelKey)}
          >
            <option value="all">All channels</option>
            <option value="linkedin">LinkedIn</option>
            <option value="google">Google</option>
          </select>
        </label>
        <label className="flex flex-col gap-1.5 text-[11px] font-medium uppercase tracking-wide text-ink-400">
          Audience
          <select
            className={selectClass}
            value={audience}
            onChange={(e) => setAudience(e.target.value as AudienceKey)}
          >
            <option value="all">All</option>
            <option value="icp">ICP</option>
            <option value="non_icp">Non-ICP</option>
          </select>
        </label>
        <label className="flex flex-col gap-1.5 text-[11px] font-medium uppercase tracking-wide text-ink-400">
          Funnel period
          <select
            className={selectClass}
            value={funnelPeriod}
            onChange={(e) => setFunnelPeriod(e.target.value as PeriodKey)}
          >
            <option value="this_month">This month</option>
            <option value="last_month">Last month</option>
          </select>
        </label>
        <label className="flex flex-col gap-1.5 text-[11px] font-medium uppercase tracking-wide text-ink-400">
          Compare to
          <select
            className={selectClass}
            value={comparePeriod}
            onChange={(e) => setComparePeriod(e.target.value as PeriodKey)}
          >
            <option value="this_month">This month</option>
            <option value="last_month">Last month</option>
          </select>
        </label>
        <label className="flex flex-col gap-1.5 text-[11px] font-medium uppercase tracking-wide text-ink-400">
          Cohort source
          <select
            className={selectClass}
            value={cohortSource}
            onChange={(e) => setCohortSource(e.target.value as CohortSource)}
          >
            <option value="all">All sources</option>
            <option value="linkedin">LinkedIn-heavy</option>
            <option value="google">Google-heavy</option>
          </select>
        </label>
      </div>

      {!compareEnabled ? (
        <p className="mb-6 text-sm text-ink-500">
          Choose two different periods to show a closed-won revenue delta.
        </p>
      ) : null}

      <div className="flex flex-col gap-8">
        <FunnelSection
          channel={channel}
          audience={audience}
          period={funnelPeriod}
          comparePeriod={funnelCompare}
        />
        <CohortSection
          sourceFilter={cohortSource}
          metric={cohortMetric}
          onMetricChange={setCohortMetric}
        />
        <EvidenceSection />
        <ScatterSection />
        <DecisionsSection />
      </div>

      <footer className="mt-12 border-t border-ink-800 pt-5 text-center text-xs text-ink-500">
        NextBound · Unify metrics → evidence → decisions
      </footer>
    </div>
  );
}
