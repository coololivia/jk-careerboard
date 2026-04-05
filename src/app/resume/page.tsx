import Link from "next/link";
import resumesData from "../../../mock-data/resumes.json";

type TipColor = "amber" | "blue" | "emerald";

interface Resume {
  id: string;
  name: string;
  type: "신입" | "경력";
  isRepresentative: boolean;
  status: "작성완료" | "작성중";
  statusDate: string;
  completeness: number;
  passRate: number;
  tip: { icon: string; text: string; color: TipColor };
  recentApplications?: string[];
}

const tipColorMap: Record<TipColor, string> = {
  amber: "text-amber-500",
  blue: "text-jk-blue",
  emerald: "text-emerald-500",
};

function ResumeCard({ resume }: { resume: Resume }) {
  return (
    <div className="card-tap rounded-lg bg-white border border-jk-card-stroke p-4">
      {/* 상단 row: badges + AI tip */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          {resume.isRepresentative && (
            <span className="bg-jk-blue text-white text-[11px] font-semibold rounded-full px-2.5 py-0.5">
              대표이력서
            </span>
          )}
          <span className="bg-jk-bg-section text-jk-text-tertiary text-[11px] font-semibold rounded-full px-2.5 py-0.5">
            {resume.type}
          </span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <span className="text-[12px]">{resume.tip.icon}</span>
          <span className={`text-[11px] font-medium leading-snug max-w-[130px] text-right ${tipColorMap[resume.tip.color]}`}>
            {resume.tip.text}
          </span>
        </div>
      </div>

      {/* 파일명 */}
      <p className="text-[16px] font-bold text-jk-text-strong mt-2">{resume.name}</p>

      {/* 상태 + 날짜 */}
      <p className="text-[12px] text-jk-text-muted mt-0.5">
        {resume.status} · {resume.statusDate}
      </p>

      {/* 완성도 / 합격예측 */}
      <div className="flex items-center gap-4 mt-3">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] text-jk-text-muted">완성도</span>
            <span className="text-[12px] font-bold text-jk-text-strong">{resume.completeness}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-jk-bg-section overflow-hidden">
            <div
              className="h-full rounded-full bg-jk-blue transition-all"
              style={{ width: `${resume.completeness}%` }}
            />
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] text-jk-text-muted">합격예측</span>
            <span className="text-[12px] font-bold text-jk-blue">{resume.passRate}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-jk-bg-section overflow-hidden">
            <div
              className="h-full rounded-full bg-jk-blue transition-all"
              style={{ width: `${resume.passRate}%` }}
            />
          </div>
        </div>
      </div>

      {/* 최근 지원 — 대표이력서만 */}
      {resume.isRepresentative && resume.recentApplications && resume.recentApplications.length > 0 && (
        <div className="mt-3">
          <p className="text-[11px] font-semibold text-jk-text-muted mb-1.5">최근 지원</p>
          <ul className="flex flex-col gap-1">
            {resume.recentApplications.map((app, i) => (
              <li key={i} className="flex items-center gap-1.5 text-[12px] text-jk-text-secondary">
                <span className="h-1 w-1 rounded-full bg-jk-text-muted shrink-0" />
                {app}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 구분선 + 액션 row */}
      <div className="border-t border-jk-border mt-3 pt-3">
        <div className="flex items-center gap-1">
          <button className="flex items-center gap-1 rounded-sm px-2.5 py-1.5 text-[12px] font-medium text-jk-text-muted hover:bg-jk-bg-section transition-colors active:scale-95">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 11.5h2.5l7-7-2.5-2.5-7 7V11.5zM11.5 3L11 3.5l-1-1 .5-.5a.7.7 0 0 1 1 0l.5.5a.7.7 0 0 1 0 1z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            삭제
          </button>
          <Link
            href={`/resume/${resume.id}/preview`}
            className="flex items-center gap-1 rounded-sm px-2.5 py-1.5 text-[12px] font-medium text-jk-text-muted hover:bg-jk-bg-section transition-colors active:scale-95"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 2v7M4 6l3 3 3-3M2 10v1.5c0 .3.2.5.5.5h9c.3 0 .5-.2.5-.5V10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            다운로드
          </Link>
          <button className="flex items-center gap-1 rounded-sm px-2.5 py-1.5 text-[12px] font-medium text-jk-text-muted hover:bg-jk-bg-section transition-colors active:scale-95">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 2h4a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zM9 2l1.5 1.5M5 2L3.5 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 6h6M4 8.5h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            복사
          </button>
          <div className="ml-auto">
            <Link
              href={`/resume/${resume.id}`}
              className="flex items-center gap-1 rounded-sm bg-jk-blue px-3 py-1.5 text-[12px] font-semibold text-white transition-colors active:scale-95 hover:bg-jk-blue-hover"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1.5 10.5h2l5.5-5.5-2-2-5.5 5.5v2zM8.5 2l1 1-1-1z" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              수정
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResumePage() {
  const resumes = resumesData as Resume[];

  return (
    <div className="min-h-screen bg-jk-bg">
      {/* Sticky 헤더 */}
      <header className="sticky top-0 z-20 flex h-14 items-center bg-white border-b border-jk-border px-4">
        <Link
          href="/"
          className="flex items-center gap-1 text-jk-text-strong mr-3 active:opacity-60 transition-opacity"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 4.5L7.5 10l5 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
        <h1 className="text-[17px] font-bold text-jk-text-strong">이력서 관리</h1>
        <div className="ml-auto text-[13px] font-medium text-jk-text-muted">
          {resumes.length}개
        </div>
      </header>

      {/* 본문 */}
      <div className="px-4 py-5 flex flex-col gap-4 pb-28">
        {resumes.map((resume) => (
          <ResumeCard key={resume.id} resume={resume} />
        ))}

        {resumes.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-20">
            <span className="text-4xl">📄</span>
            <p className="text-[15px] font-semibold text-jk-text-strong">이력서가 없어요</p>
            <p className="text-[13px] text-jk-text-muted">아래 + 버튼으로 이력서를 작성해보세요</p>
          </div>
        )}
      </div>

      {/* FAB — 이력서 새로 작성 */}
      <Link
        href="/resume/new"
        className="fixed bottom-20 right-4 flex h-14 w-14 items-center justify-center rounded-full bg-jk-blue shadow-button-blue transition-all active:scale-95 hover:bg-jk-blue-hover z-20"
        style={{ right: "max(1rem, calc((100vw - 390px) / 2 + 1rem))" }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
        </svg>
      </Link>
    </div>
  );
}
