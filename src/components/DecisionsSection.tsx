import { DECISIONS } from "../data/caseStudy";

const ACTION_STYLE: Record<(typeof DECISIONS)[number]["action"], string> = {
  Scale: "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/35",
  "Hold / optimize": "bg-amber-500/15 text-amber-200 ring-1 ring-amber-500/30",
  "Cut / redesign": "bg-rose-500/15 text-rose-300 ring-1 ring-rose-500/30",
};

export function DecisionsSection() {
  return (
    <section className="rounded-2xl border border-ink-700/70 bg-ink-900/55 p-5 md:p-6">
      <header className="mb-5 border-b border-ink-700/50 pb-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
          5 · Decisions
        </p>
        <h2 className="mt-1 text-lg font-semibold text-ink-100 md:text-xl">
          What leadership should do next
        </h2>
        <p className="mt-1 max-w-2xl text-sm text-ink-400">
          Unified metrics + statistical evidence → budget actions. This is the NextBound output:
          not just reporting, but recommended moves.
        </p>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-ink-700/70 text-[11px] uppercase tracking-wide text-ink-500">
              <th className="pb-2 pr-3 font-medium">Action</th>
              <th className="pb-2 pr-3 font-medium">Program</th>
              <th className="pb-2 pr-3 font-medium">Why</th>
              <th className="pb-2 font-medium">Backed by</th>
            </tr>
          </thead>
          <tbody>
            {DECISIONS.map((d) => (
              <tr key={d.id} className="border-b border-ink-800/80 align-top">
                <td className="py-3 pr-3">
                  <span
                    className={`inline-block rounded-md px-2 py-1 text-xs font-semibold ${ACTION_STYLE[d.action]}`}
                  >
                    {d.action}
                  </span>
                </td>
                <td className="py-3 pr-3 font-medium text-ink-100">{d.program}</td>
                <td className="py-3 pr-3 text-ink-300">{d.rationale}</td>
                <td className="py-3 text-ink-400">{d.evidence}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
