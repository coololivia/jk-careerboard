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
  historicalBadge?: boolean; // 과거 합격 패턴 반영 (적극 구직자 전용)
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
    score >= 85 ? "#2563eb" : score >= 70 ? "#7c3aed" : "#6b7280";

  return (
    <div className="relative flex h-12 w-12 items-center justify-center">
      <svg width="48" height="48" className="-rotate-90">
        <circle
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="3"
        />
        <circle
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - filled}
          strokeLinecap="round"
        />
      </svg>
      <span
        className="absolute text-[11px] font-bold"
        style={{ color }}
      >
        {score}%
      </span>
    </div>
  );
}

function ApplyBottomSheet({
  job,
  onClose,
}: {
  job: Job;
  onClose: () => void;
}) {
  const [applied, setApplied] = useState(false);

  if (applied) {
    return (
      <div className="fixed inset-0 z-50 flex items-end" onClick={onClose}>
        <div
          className="w-full rounded-t-2xl bg-white px-5 py-6 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-4 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl">
              ✅
            </div>
          </div>
          <p className="text-center text-base font-bold">지원 완료!</p>
          <p className="mt-1 text-center text-sm text-gray-500">
            {job.company} · {job.title}
          </p>
          <p className="mt-2 text-center text-xs text-gray-400">
            지원 현황에서 확인할 수 있어요
          </p>
          <button
            onClick={onClose}
            className="mt-5 w-full rounded-xl bg-blue-600 py-3 text-sm font-bold text-white"
          >
            확인
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/30" onClick={onClose}>
      <div
        className="w-full rounded-t-2xl bg-white px-5 pb-8 pt-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 핸들 */}
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-gray-200" />

        <p className="text-xs font-medium text-gray-400">원클릭 지원</p>
        <p className="mt-1 text-base font-bold">{job.company}</p>
        <p className="text-sm text-gray-600">{job.title}</p>

        {/* 저장된 이력서 */}
        <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">적용 이력서</p>
              <p className="mt-0.5 text-sm font-semibold">최신 이력서 (2024.03.20 수정)</p>
            </div>
            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
              92% 완성
            </span>
          </div>
        </div>

        <button
          onClick={() => setApplied(true)}
          className="mt-4 w-full rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white"
        >
          저장된 이력서로 바로 지원
        </button>
        <button
          onClick={onClose}
          className="mt-2 w-full rounded-xl py-2.5 text-sm text-gray-500"
        >
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
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        {/* 상단: 회사/직무 + 스코어 링 */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-xs text-gray-400">{job.company}</p>
            <p className="mt-0.5 truncate font-semibold">{job.title}</p>

            {/* 태그 */}
            <div className="mt-1.5 flex flex-wrap gap-1">
              {job.isScraped && (
                <span className="rounded-full bg-yellow-50 px-2 py-0.5 text-[10px] font-medium text-yellow-600">
                  ★ 스크랩
                </span>
              )}
              {job.isUrgent && job.tags?.[0] && (
                <span className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-medium text-red-500">
                  {job.tags[0]}
                </span>
              )}
              {job.tags?.slice(job.isUrgent ? 1 : 0).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-gray-500"
                >
                  {tag}
                </span>
              ))}
              {job.historicalBadge && (
                <span className="rounded-full bg-purple-50 px-2 py-0.5 text-[10px] font-medium text-purple-600">
                  합격 패턴 반영
                </span>
              )}
            </div>
          </div>

          <MatchScoreRing score={job.matchScore} />
        </div>

        {/* 추천 이유 */}
        <p className="mt-2.5 text-xs text-gray-500 leading-relaxed">
          {job.matchReason}
        </p>

        {/* 하단: 연봉 + CTA */}
        <div className="mt-3 flex items-center justify-between">
          <p className="text-xs text-gray-400">{job.salary}</p>
          <button
            onClick={() => setShowSheet(true)}
            className="rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white active:bg-blue-700"
          >
            {ctaLabel}
          </button>
        </div>
      </div>

      {showSheet && (
        <ApplyBottomSheet job={job} onClose={() => setShowSheet(false)} />
      )}
    </>
  );
}
