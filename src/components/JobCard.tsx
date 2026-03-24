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

const AVATAR_PALETTES = [
  { bg: "bg-blue-50", text: "text-blue-600" },
  { bg: "bg-violet-50", text: "text-violet-600" },
  { bg: "bg-emerald-50", text: "text-emerald-600" },
  { bg: "bg-amber-50", text: "text-amber-600" },
  { bg: "bg-rose-50", text: "text-rose-600" },
  { bg: "bg-sky-50", text: "text-sky-600" },
  { bg: "bg-indigo-50", text: "text-indigo-600" },
];

function CompanyAvatar({ name }: { name: string }) {
  const idx = (name.charCodeAt(0) + name.length) % AVATAR_PALETTES.length;
  const { bg, text } = AVATAR_PALETTES[idx];
  return (
    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] text-sm font-bold ${bg} ${text}`}>
      {name.charAt(0)}
    </div>
  );
}

function MatchScoreRing({ score }: { score: number }) {
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const filled = (score / 100) * circumference;
  const color = score >= 85 ? "#1b55f6" : score >= 70 ? "#8b5cf6" : "#768091";

  return (
    <div className="relative flex h-11 w-11 shrink-0 items-center justify-center">
      <svg width="44" height="44" className="-rotate-90">
        <circle cx="22" cy="22" r={radius} fill="none" stroke="#f0f2fa" strokeWidth="3" />
        <circle
          cx="22" cy="22" r={radius} fill="none"
          stroke={color} strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - filled}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute text-[10px] font-bold" style={{ color }}>
        {score}%
      </span>
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

export default function JobCard({ job, ctaLabel = "바로 지원", bordered }: Props) {
  const [showSheet, setShowSheet] = useState(false);

  return (
    <>
      <div className={`card-tap rounded-[16px] bg-white p-4 ${bordered ? "border border-jk-border" : "shadow-[0_2px_12px_rgba(0,0,0,0.07)]"}`}>
        {/* 상단: 아바타 + 회사/직무 + 매치링 */}
        <div className="flex items-start gap-3">
          <CompanyAvatar name={job.company} />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-jk-text-muted">{job.company}</p>
            <p className="mt-0.5 text-[15px] font-bold leading-snug text-jk-text-strong truncate">{job.title}</p>
          </div>
          <MatchScoreRing score={job.matchScore} />
        </div>

        {/* 태그 */}
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {job.isScraped && (
            <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-600">★ 스크랩</span>
          )}
          {job.isUrgent && job.tags?.[0] && (
            <span className="rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-semibold text-red-500">{job.tags[0]}</span>
          )}
          {job.tags?.slice(job.isUrgent ? 1 : 0).map((tag) =>
            tag === "합격패턴" ? (
              <span key={tag} className="rounded-full bg-violet-50 px-2.5 py-1 text-[11px] font-semibold text-jk-purple">✦ 합격패턴</span>
            ) : (
              <span key={tag} className="rounded-full bg-jk-bg-section px-2.5 py-1 text-[11px] text-jk-text-tertiary">{tag}</span>
            )
          )}
        </div>

        {/* 매치 이유 */}
        <p className="mt-2.5 text-xs leading-relaxed text-jk-text-muted">{job.matchReason}</p>

        {/* 하단: 연봉 + CTA */}
        <div className="mt-3 flex items-center justify-between">
          <p className="text-sm font-semibold text-jk-text-secondary">{job.salary}</p>
          <button
            onClick={() => setShowSheet(true)}
            className="rounded-full bg-jk-blue px-4 py-2 text-xs font-bold text-white transition-all duration-150 active:scale-95 active:opacity-80"
          >
            {ctaLabel}
          </button>
        </div>
      </div>
      {showSheet && <ApplyBottomSheet job={job} onClose={() => setShowSheet(false)} />}
    </>
  );
}
