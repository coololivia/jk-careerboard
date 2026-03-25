"use client";

interface InsightItem {
  label: string;
  stat: string;
  fulfilled: boolean;
}

interface SalaryRow {
  label: string;
  value: string;
  highlight: boolean;
}

interface InsightData {
  type: "hiring_pattern" | "market_salary" | "beginner_spec";
  title: string;
  subtitle: string;
  // hiring_pattern / beginner_spec
  items?: InsightItem[];
  myMatch?: number;
  totalItems?: number;
  nudge?: string;
  // market_salary
  rows?: SalaryRow[];
  salaryUpside?: string;
}

interface Props {
  data: InsightData;
  bordered?: boolean;
}

export default function InsightCard({ data, bordered }: Props) {
  if (!data) return null;

  const cardClass = `rounded-xl bg-white p-5 ${bordered ? "border border-jk-card-stroke" : "shadow-[0_2px_12px_rgba(0,0,0,0.07)]"}`;

  /* ── 연봉 시장 현황 (passive) ── */
  if (data.type === "market_salary") {
    return (
      <section className={cardClass}>
        <div className="mb-4 flex items-center gap-2">
          <span className="text-lg">📊</span>
          <div>
            <h2 className="text-[18px] font-bold text-jk-text-strong">{data.title}</h2>
            <p className="text-xs text-jk-text-muted">{data.subtitle}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {(data.rows ?? []).map((row, i) => (
            <div
              key={i}
              className={`flex items-center justify-between rounded-md px-4 py-3 ${
                row.highlight
                  ? "bg-jk-blue"
                  : "bg-jk-bg"
              }`}
            >
              <p className={`text-sm font-medium ${row.highlight ? "text-white/80" : "text-jk-text-muted"}`}>
                {row.label}
              </p>
              <p className={`text-sm font-bold ${row.highlight ? "text-white" : "text-jk-text-strong"}`}>
                {row.value}
              </p>
            </div>
          ))}
        </div>

        {data.nudge && (
          <div className="mt-3 flex items-center gap-2 rounded-[10px] bg-emerald-50 px-3 py-2.5">
            <span className="text-sm">💰</span>
            <p className="text-xs font-semibold text-emerald-700">{data.nudge}</p>
          </div>
        )}
      </section>
    );
  }

  /* ── 합격자 패턴 / 신입 스펙 (active, new) ── */
  const fulfilled = (data.items ?? []).filter((i) => i.fulfilled).length;
  const total = data.items?.length ?? 0;

  return (
    <section className={cardClass}>
      <div className="mb-4 flex items-center gap-2">
        <span className="text-lg">{data.type === "beginner_spec" ? "🎯" : "💡"}</span>
        <div>
          <h2 className="text-[18px] font-bold text-jk-text-strong">{data.title}</h2>
          <p className="text-xs text-jk-text-muted">{data.subtitle}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {(data.items ?? []).map((item, i) => (
          <div key={i} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                item.fulfilled
                  ? "bg-jk-blue text-white"
                  : "bg-jk-bg-section text-jk-text-muted"
              }`}>
                {item.fulfilled ? "✓" : "○"}
              </div>
              <p className={`text-sm truncate ${item.fulfilled ? "text-jk-text-strong" : "text-jk-text-muted"}`}>
                {item.label}
              </p>
            </div>
            <span className={`shrink-0 text-xs font-semibold ${item.fulfilled ? "text-jk-blue" : "text-jk-text-muted"}`}>
              {item.stat}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between rounded-md bg-jk-bg px-4 py-3">
        <p className="text-xs text-jk-text-muted">
          내가 충족한 항목{" "}
          <span className="font-bold text-jk-text-strong">{fulfilled}/{total}</span>
        </p>
        {data.nudge && (
          <p className="text-xs font-semibold text-jk-blue">{data.nudge} →</p>
        )}
      </div>
    </section>
  );
}
