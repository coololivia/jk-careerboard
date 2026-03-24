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
  historicalBadge?: boolean;
}

interface Props {
  job: Job;
  ctaLabel?: string;
}

function MatchScoreRing({ score }: { score: number }) {
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const filled = (score / 100) * circumference;
  const color =
    score >= 85 ? "#ff8a41" : score >= 70 ? "#8b5cf6" : "#768091";

  return (
    <div className="relative flex h-12 w-12 items-center justify-center">
      <svg width="48" height="48" className="-rotate-90">
        <circle cx="24" cy="24" r={radius} fill="none" stroke="#e6e8ea" strokeWidth="3" />
        <circle
          cx="24" cy="24" r={radius} fill="none"
          stroke={color} strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - filled}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute text-[11px] font-bold" style={{ color }}>
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
        <div className="w-full rounded-t-2xl bg-white px-5 py-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
          <div className="mb-4 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl">✅</div>
          </div>
          <p className="text-center text-base font-bold text-jk-text-strong">지원 완료!</p>
          <p className="mt-1 text-center text-sm text-jk-text-muted">{job.company} · {job.title}</p>
          <p className="mt-2 text-center text-xs text-jk-text-muted">지원 현황에서 확인할 수 있어요</p>
          <button onClick={onClose} className="mt-5 w-full rounded-[12px] bg-jk-orange py-3 text-sm font-bold text-white">
            확인
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/30" onClick={onClose}>
      <div className="w-full rounded-t-2xl bg-white px-5 pb-8 pt-5 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-jk-border" />
        <p className="text-xs font-medium text-jk-text-muted">원클릭 지원</p>
        <p className="mt-1 text-base font-bold text-jk-text-strong">{job.company}</p>
        <p className="text-sm text-jk-text-secondary">{job.title}</p>
        <div className="mt-4 rounded-[12px] border border-jk-border bg-jk-bg px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-jk-text-muted">적용 이력서</p>
              <p className="mt-0.5 text-sm font-semibold text-jk-text-primary">최신 이력서 (2024.03.20 수정)</p>
            </div>
            <span className="rounded-full bg-orange-50 px-2 py-0.5 text-xs font-medium text-jk-orange">
              92% 완성
            </span>
          </div>
        </div>
        <button onClick={() => setApplied(true)} className="mt-4 w-full rounded-[12px] bg-jk-orange py-3.5 text-sm font-bold text-white">
          저장된 이력서로 바로 지원
        </button>
        <button onClick={onClose} className="mt-2 w-full rounded-[12px] py-2.5 text-sm text-jk-text-muted">
          취소
        </button>
      </div>
    </div>
  );
}

export default function JobCard({ job, ctaLabel = "바로 지원" }: Props) {
  const [showSheet, setShowSheet] = useState(false);

  return (
    <>
      <div className="rounded-[12px] border border-jk-border bg-white p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-xs text-jk-text-muted">{job.company}</p>
            <p className="mt-0.5 truncate font-semibold text-jk-text-strong">{job.title}</p>
            <div className="mt-1.5 flex flex-wrap gap-1">
              {job.isScraped && (
                <span className="rounded-full bg-yellow-50 px-2 py-0.5 text-[10px] font-medium text-yellow-600">★ 스크랩</span>
              )}
              {job.isUrgent && job.tags?.[0] && (
                <span className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-medium text-red-500">{job.tags[0]}</span>
              )}
              {job.tags?.slice(job.isUrgent ? 1 : 0).map((tag) => (
                <span key={tag} className="rounded-full bg-jk-bg-section px-2 py-0.5 text-[10px] text-jk-text-muted">{tag}</span>
              ))}
              {job.historicalBadge && (
                <span className="rounded-full bg-purple-50 px-2 py-0.5 text-[10px] font-medium text-jk-purple">합격 패턴 반영</span>
              )}
            </div>
          </div>
          <MatchScoreRing score={job.matchScore} />
        </div>
        <p className="mt-2.5 text-xs leading-relaxed text-jk-text-muted">{job.matchReason}</p>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-xs text-jk-text-muted">{job.salary}</p>
          <button
            onClick={() => setShowSheet(true)}
            className="rounded-[8px] bg-jk-orange px-4 py-1.5 text-xs font-semibold text-white active:opacity-80"
          >
            {ctaLabel}
          </button>
        </div>
      </div>
      {showSheet && <ApplyBottomSheet job={job} onClose={() => setShowSheet(false)} />}
    </>
  );
}
