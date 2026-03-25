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
}

function passRateStyle(rate: number): { numColor: string; barColor: string } {
  if (rate >= 80) return { numColor: "text-jk-blue", barColor: "bg-jk-blue" };
  if (rate >= 60) return { numColor: "text-emerald-500", barColor: "bg-emerald-500" };
  return { numColor: "text-jk-text-muted", barColor: "bg-jk-border" };
}

export default function ResumeAiCard({ resume }: Props) {
  const passStyle = passRateStyle(resume.passRate);

  return (
    <div className="card-tap rounded-[12px] bg-white p-4 border border-[#E8E9EC]">

      {/* 1열 — 타이틀 · 신입/경력 · 최종 작성일 */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <p className="text-[15px] font-bold text-jk-text-strong truncate">
            {resume.name}
          </p>
          <span className="shrink-0 rounded-full bg-jk-bg-section px-2 py-0.5 text-[11px] font-semibold text-jk-text-muted">
            {resume.type}
          </span>
        </div>
        <p className="shrink-0 text-[11px] text-jk-text-muted">{resume.createdLabel}</p>
      </div>

      {/* 디바이더 */}
      <div className="my-3 h-px bg-[#F1F2F3]" />

      {/* 2열 — 완성도 | 합격예측 */}
      <div className="grid grid-cols-2">
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

      {/* 3열 — AI 추천 · 편집 버튼 */}
      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="flex-1 text-[13px] font-semibold text-jk-blue leading-snug line-clamp-2">
          {resume.tip}
        </p>
        <Link
          href={`/resume/${resume.id}`}
          className="shrink-0 flex items-center justify-center h-10 rounded-[8px] bg-jk-bg px-4 text-[13px] font-semibold text-jk-text-strong transition-all active:scale-95"
        >
          이력서 편집
        </Link>
      </div>

    </div>
  );
}
