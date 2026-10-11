import { STAT_TESTS } from "../data/caseStudy";

export function EvidenceSection() {
  return (
    <section className="rounded-2xl border border-ink-700/70 bg-ink-900/55 p-5 md:p-6">
      <header className="mb-5 border-b border-ink-700/50 pb-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
          3 · Evidence (statistical tests)
        </p>
        <h2 className="mt-1 text-lg font-semibold text-ink-100 md:text-xl">
          Data that backs the method
        </h2>
        <p className="mt-1 max-w-2xl text-sm text-ink-400">
          Channel ROI alone can look persuasive. NextBound also tests whether observed lifts are
          likely real — so recommendations are not just chart intuition.
        </p>
      </header>

      <div className="grid gap-3 md:grid-cols-3">
        {STAT_TESTS.map((t) => (
          <article
            key={t.id}
            className="flex flex-col rounded-xl border border-ink-700/70 bg-ink-950/40 p-4"
          >
            <p className="text-sm font-medium leading-snug text-ink-100">{t.question}</p>
            <p className="mt-2 text-[11px] uppercase tracking-wide text-ink-500">{t.metric}</p>

            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div className="rounded-lg bg-ink-800/70 px-2.5 py-2">
                <p className="text-[11px] text-ink-400">{t.aLabel}</p>
                <p className="font-mono font-semibold text-ink-100">{t.aValue}</p>
              </div>
              <div className="rounded-lg bg-ink-800/70 px-2.5 py-2">
                <p className="text-[11px] text-ink-400">{t.bLabel}</p>
                <p className="font-mono font-semibold text-ink-100">{t.bValue}</p>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
              <span className="font-mono text-accent-glow">{t.delta}</span>
              <span
                className={`rounded-md px-2 py-0.5 font-medium ${
                  t.significant
                    ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30"
                    : "bg-ink-700 text-ink-300"
                }`}
              >
                {t.significant ? "Significant" : "Not significant"} · {t.pValue}
              </span>
            </div>

            <p className="mt-2 text-[11px] text-ink-500">
              {t.test} · {t.nNote}
            </p>
            <p className="mt-3 border-t border-ink-700/50 pt-3 text-xs leading-relaxed text-ink-300">
              {t.implication}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
