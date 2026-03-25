"use client";

import { useState } from "react";

interface Job {
  id: string;
  company: string;
  title: string;
  matchScore: number;
  matchReason: string;
  salary: string;
  deadline?: string;
  isUrgent?: boolean;
  tags?: string[];
  isScraped?: boolean;
}

interface Props {
  job: Job;
  ctaLabel?: string;
  bordered?: boolean;
}

// ── helpers ──────────────────────────────────────────────────────────────────

const AVATAR_PALETTES = [
  { bg: "bg-blue-50", text: "text-blue-600" },
  { bg: "bg-violet-50", text: "text-violet-600" },
  { bg: "bg-emerald-50", text: "text-emerald-600" },
  { bg: "bg-amber-50", text: "text-amber-600" },
  { bg: "bg-rose-50", text: "text-rose-600" },
  { bg: "bg-sky-50", text: "text-sky-600" },
  { bg: "bg-indigo-50", text: "text-indigo-600" },
];

function calcDday(deadline?: string): string | null {
  if (!deadline) return null;
  const diff = Math.ceil((new Date(deadline).getTime() - Date.now()) / 86400000);
  if (diff < 0) return "마감";
  if (diff === 0) return "D-day";
  return `D-${diff}`;
}

// ── sub-components (kept for ApplyBottomSheet) ───────────────────────────────

function CompanyAvatar({ name }: { name: string }) {
  const idx = (name.charCodeAt(0) + name.length) % AVATAR_PALETTES.length;
  const { bg, text } = AVATAR_PALETTES[idx];
  return (
    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] text-sm font-bold ${bg} ${text}`}>
      {name.charAt(0)}
    </div>
  );
}

function ApplyBottomSheet({ job, onClose }: { job: Job; onClose: () => void }) {
  const [applied, setApplied] = useState(false);

  if (applied) {
    return (
      <div className="fixed inset-0 z-50 flex items-end" onClick={onClose}>
        <div className="w-full max-w-[390px] mx-auto rounded-t-2xl bg-white px-5 py-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-3xl">✅</div>
          </div>
          <p className="text-center text-base font-bold text-jk-text-strong">지원 완료!</p>
          <p className="mt-1 text-center text-sm text-jk-text-muted">{job.company} · {job.title}</p>
          <p className="mt-2 text-center text-xs text-jk-text-muted">지원 현황에서 확인할 수 있어요</p>
          <button onClick={onClose} className="mt-5 w-full rounded-full bg-jk-blue py-3.5 text-sm font-bold text-white">
            확인
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/40" onClick={onClose}>
      <div className="w-full max-w-[390px] mx-auto rounded-t-2xl bg-white px-5 pb-10 pt-5 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-jk-border" />
        <div className="flex items-center gap-3 mb-4">
          <CompanyAvatar name={job.company} />
          <div>
            <p className="text-xs text-jk-text-muted">{job.company}</p>
            <p className="font-semibold text-jk-text-strong">{job.title}</p>
          </div>
        </div>
        <div className="rounded-[14px] bg-jk-bg px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-jk-text-muted">적용 이력서</p>
              <p className="mt-0.5 text-sm font-semibold text-jk-text-primary">최신 이력서 (2024.03.20 수정)</p>
            </div>
            <span className="rounded-full bg-jk-bg-blue px-2.5 py-1 text-xs font-semibold text-jk-blue">
              92% 완성
            </span>
          </div>
        </div>
        <button onClick={() => setApplied(true)} className="mt-4 w-full rounded-full bg-jk-blue py-4 text-sm font-bold text-white">
          저장된 이력서로 바로 지원
        </button>
        <button onClick={onClose} className="mt-2 w-full rounded-full py-2.5 text-sm text-jk-text-muted">
          취소
        </button>
      </div>
    </div>
  );
}

// ── BookmarkIcon ─────────────────────────────────────────────────────────────

function BookmarkIcon({ filled }: { filled: boolean }) {
  return filled ? (
    // filled amber star
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
        fill="#F59E0B"
        stroke="#F59E0B"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    // outline star
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
        fill="none"
        stroke="#768091"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── JobCard ──────────────────────────────────────────────────────────────────

export default function JobCard({ job, ctaLabel = "바로 지원", bordered }: Props) {
  const [showSheet, setShowSheet] = useState(false);
  const [scraped, setScraped] = useState(job.isScraped ?? false);

  const dday = calcDday(job.deadline);

  const containerClass = bordered
    ? "card-tap rounded-[12px] border border-[#E8E9EC] bg-white p-4"
    : "card-tap py-4 border-b border-[#F1F2F3]";

  return (
    <>
      <div
        className={containerClass}
        onClick={() => setShowSheet(true)}
      >
        {/* Row 1: Job title + bookmark */}
        <div className="flex items-start justify-between gap-2">
          <p className="text-[16px] font-bold leading-snug text-jk-text-strong flex-1 min-w-0 truncate">
            {job.title}
          </p>
          <button
            className="shrink-0 -mt-0.5 -mr-0.5 p-0.5 active:scale-90 transition-transform duration-100"
            onClick={(e) => {
              e.stopPropagation();
              setScraped((prev) => !prev);
            }}
            aria-label={scraped ? "스크랩 해제" : "스크랩"}
          >
            <BookmarkIcon filled={scraped} />
          </button>
        </div>

        {/* Row 2: Company name + D-day badge */}
        <div className="mt-1 flex items-center gap-2">
          <p className="text-[13px] text-jk-text-muted truncate">{job.company}</p>
          {dday && (
            <span className="shrink-0 text-[12px] font-semibold text-orange-500">
              {dday}
            </span>
          )}
        </div>

        {/* Row 3: Tags */}
        {job.tags && job.tags.length > 0 && (
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {job.tags.map((tag) =>
              tag === "합격패턴" ? (
                <span
                  key={tag}
                  className="rounded-full bg-violet-50 px-2.5 py-1 text-[12px] font-semibold text-violet-600"
                >
                  ✦ 합격패턴
                </span>
              ) : (
                <span
                  key={tag}
                  className="rounded-full bg-[#F1F2F3] px-2.5 py-1 text-[12px] text-[#575f6c]"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        )}
      </div>

      {showSheet && <ApplyBottomSheet job={job} onClose={() => setShowSheet(false)} />}
    </>
  );
}
