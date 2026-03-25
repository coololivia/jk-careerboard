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
  showApplyButton?: boolean;
}

function passRateStyle(rate: number): { numColor: string; barColor: string } {
  if (rate >= 80) return { numColor: "text-jk-blue", barColor: "bg-jk-blue" };
  if (rate >= 60) return { numColor: "text-emerald-500", barColor: "bg-emerald-500" };
  return { numColor: "text-jk-text-muted", barColor: "bg-jk-border" };
}

export default function ResumeAiCard({ resume, showApplyButton = true }: Props) {
  const passStyle = passRateStyle(resume.passRate);

  return (
    <div className="card-tap rounded-[16px] bg-white p-4 border border-jk-border">

      {/* 1열 — 타이틀 · 신입/경력 · 최종 작성일 */}
      <div className="flex items-center gap-2">
        <p className="text-[15px] font-bold text-jk-text-strong truncate flex-1 min-w-0">
          {resume.name}
        </p>
        <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold
          ${resume.type === "경력"
            ? "bg-jk-bg-blue text-jk-blue"
            : "bg-jk-bg-section text-jk-text-muted"
          }`}>
          {resume.type}
        </span>
        <p className="shrink-0 text-[11px] text-jk-text-muted">{resume.createdLabel}</p>
      </div>

      {/* 디바이더 */}
      <div className="my-3 h-px bg-jk-border" />

      {/* 2열 — 완성도 | 합격예측 */}
      <div className="flex items-center gap-5">
        <div className="flex items-baseline gap-1">
          <p className="text-[13px] text-jk-text-muted">완성도</p>
          <p className="text-[20px] font-bold leading-none text-jk-text-strong">
            {resume.completeness}%
          </p>
        </div>
        <div className="flex items-baseline gap-1">
          <p className="text-[13px] text-jk-text-muted">합격예측</p>
          <p className="text-[20px] font-bold leading-none text-jk-text-strong">
            {resume.passRate}%
          </p>
        </div>
      </div>

      {/* 3열 — AI 추천 · 편집/지원 버튼 */}
      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="flex-1 text-[13px] font-semibold text-jk-blue leading-snug line-clamp-2">
          {resume.tip}
        </p>
        <div className="flex shrink-0 items-center gap-2">
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
