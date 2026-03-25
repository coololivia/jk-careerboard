import Link from "next/link";

interface ResumeAiData {
  id: string;
  name: string;
  type: "신입" | "경력" | string;
  createdLabel: string;
  completeness: number;
  passRate: number;
  tip: string;
}

interface Props {
  resume: ResumeAiData;
  /** Active/Passive: 편집+지원 | New: 편집만 */
  showApplyButton?: boolean;
}

function ScoreStat({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="flex-1">
      <p className="text-[11px] text-jk-text-muted">{label}</p>
      <p className={`mt-0.5 text-[22px] font-bold ${color}`}>{value}%</p>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-jk-bg-section">
        <div
          className="h-1.5 rounded-full transition-all"
          style={{ width: `${value}%`, backgroundColor: "currentColor" }}
        />
      </div>
    </div>
  );
}

function passRateColor(rate: number) {
  if (rate >= 80) return "text-jk-blue";
  if (rate >= 60) return "text-emerald-500";
  return "text-jk-text-muted";
}

export default function ResumeAiCard({ resume, showApplyButton = true }: Props) {
  return (
    <div className="card-tap rounded-[16px] bg-white p-4 border border-jk-border">
      {/* 헤더: 이력서명 + 타입 배지 + 날짜 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <p className="text-[15px] font-bold text-jk-text-strong truncate">
            {resume.name}
          </p>
          <span className="shrink-0 rounded-full bg-jk-bg-section px-2 py-0.5 text-[11px] font-semibold text-jk-text-muted">
            {resume.type}
          </span>
        </div>
        <p className="shrink-0 ml-2 text-[11px] text-jk-text-muted">{resume.createdLabel}</p>
      </div>

      <div className="my-3 h-px bg-jk-border" />

      {/* 완성도 / 합격예측 — progress bar 포함 */}
      <div className="flex items-start gap-6">
        <ScoreStat
          label="완성도"
          value={resume.completeness}
          color="text-jk-text-strong"
        />
        <ScoreStat
          label="합격예측"
          value={resume.passRate}
          color={passRateColor(resume.passRate)}
        />
      </div>

      {/* AI 팁 + 버튼 */}
      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="text-[13px] font-semibold text-jk-blue leading-snug flex-1">
          {resume.tip}
        </p>
        <div className="flex shrink-0 gap-2">
          <Link
            href={`/resume/${resume.id}`}
            className="rounded-full bg-jk-bg px-4 py-2 text-[13px] font-semibold text-jk-text-strong transition-all active:scale-95"
          >
            이력서 편집
          </Link>
          {showApplyButton && (
            <button className="rounded-full bg-jk-blue px-4 py-2 text-[13px] font-semibold text-white transition-all active:scale-95">
              지원
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
