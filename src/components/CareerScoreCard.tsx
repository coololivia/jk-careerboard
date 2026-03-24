"use client";

import { useState } from "react";

interface ScoreHistory {
  month: string;
  score: number;
}

interface TimelineEvent {
  year: string;
  event: string;
  company: string | null;
  title: string | null;
  score: number;
  highlight: boolean;
}

interface CareerScoreData {
  score: number;
  percentile?: number;
  trend?: "up" | "down" | "stable";
  trendDelta?: number;
  marketComparison?: string;
  salaryVsMarket?: string;
  scoreHistory?: ScoreHistory[];
  framing?: "encouraging";
  message?: string;
  nextActions?: { action: string; scoreImpact: string }[];
  projectedScore?: number;
  projectedPercentile?: number;
  currentEligibleJobs?: number;
}

interface Props {
  data: CareerScoreData;
  timeline?: TimelineEvent[];
  userType: "active" | "passive" | "new";
  bordered?: boolean;
}

function Sparkline({ history }: { history: ScoreHistory[] }) {
  if (!history || history.length < 2) return null;
  const width = 80;
  const height = 32;
  const padding = 3;
  const scores = history.map((h) => h.score);
  const minScore = Math.min(...scores);
  const maxScore = Math.max(...scores);
  const range = maxScore - minScore || 1;
  const points = history.map((h, i) => {
    const x = padding + (i / (history.length - 1)) * (width - padding * 2);
    const y = height - padding - ((h.score - minScore) / range) * (height - padding * 2);
    return `${x},${y}`;
  });
  const [lx, ly] = points[points.length - 1].split(",").map(Number);
  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline points={points.join(" ")} fill="none" stroke="#1b55f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={lx} cy={ly} r="3" fill="#1b55f6" />
    </svg>
  );
}

function CareerTimeline({ timeline }: { timeline: TimelineEvent[] }) {
  return (
    <div className="mt-4 border-t border-jk-border pt-4">
      <p className="mb-3 text-xs font-semibold text-jk-text-muted">커리어 성장 타임라인</p>
      <div className="relative flex flex-col gap-0">
        {timeline.map((item, i) => (
          <div key={i} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className={`mt-1 h-3 w-3 rounded-full border-2 ${item.highlight ? "border-jk-blue bg-jk-blue" : "border-jk-border bg-white"}`} />
              {i < timeline.length - 1 && (
                <div className="my-0.5 w-px flex-1 bg-jk-border" style={{ minHeight: 20 }} />
              )}
            </div>
            <div className="pb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-jk-text-muted">{item.year}</span>
                {item.highlight && (
                  <span className="rounded-full bg-jk-bg-blue px-1.5 py-0.5 text-[10px] font-semibold text-jk-blue">주요 이력</span>
                )}
              </div>
              <p className="mt-0.5 text-sm font-semibold text-jk-text-strong">{item.event}</p>
              {(item.company || item.title) && (
                <p className="text-xs text-jk-text-muted">{[item.company, item.title].filter(Boolean).join(" · ")}</p>
              )}
              <p className="mt-0.5 text-xs font-semibold text-jk-blue">커리어 스코어 {item.score}점</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CareerScoreCard({ data, timeline, userType, bordered }: Props) {
  const [showTimeline, setShowTimeline] = useState(false);
  const cardClass = `rounded-[18px] bg-white p-5 ${bordered ? "border border-jk-border" : "shadow-[0_2px_12px_rgba(0,0,0,0.07)]"}`;

  // 신입: 시장 포지셔닝 프레이밍
  if (userType === "new") {
    const projectedScore = data.projectedScore ?? data.score;
    const progressPct = Math.round((data.score / 100) * 100);
    const projectedPct = Math.round((projectedScore / 100) * 100);

    return (
      <section className={`rounded-[18px] bg-white p-5 ${bordered ? "border border-jk-border" : "shadow-[0_2px_12px_rgba(0,0,0,0.07)]"}`}>
        <p className="text-xs font-medium text-jk-text-muted">커리어 스코어</p>
        <div className="mt-2 flex items-end justify-between">
          <div className="flex items-end gap-2">
            <p className="text-5xl font-bold tracking-tight text-jk-text-strong">{data.score}</p>
            <p className="mb-1.5 text-lg text-jk-text-muted">/ 100</p>
          </div>
          {data.projectedScore && (
            <div className="text-right">
              <p className="text-[11px] text-jk-text-muted">완성 후</p>
              <p className="text-xl font-bold text-jk-blue">{data.projectedScore}점</p>
            </div>
          )}
        </div>

        {/* 현재 → 목표 점수 바 */}
        <div className="mt-3 relative h-2 rounded-full bg-jk-bg-section overflow-hidden">
          {/* 목표 도달선 (연한 파랑) */}
          <div className="absolute h-2 rounded-full bg-jk-blue/20" style={{ width: `${projectedPct}%` }} />
          {/* 현재 점수 (진한 파랑) */}
          <div className="absolute h-2 rounded-full bg-jk-blue" style={{ width: `${progressPct}%` }} />
        </div>
        <div className="mt-1.5 flex justify-between text-[10px] text-jk-text-muted">
          <span>현재 {data.score}점</span>
          {data.projectedScore && <span className="text-jk-blue font-semibold">완성 후 {data.projectedScore}점</span>}
        </div>

        {/* 두 가지 포지셔닝 stat */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="rounded-[12px] bg-jk-bg px-3.5 py-3">
            <p className="text-[11px] text-jk-text-muted">지금 지원 가능</p>
            <p className="mt-0.5 text-lg font-bold text-jk-text-strong">
              {data.currentEligibleJobs ?? 0}
              <span className="text-sm font-medium text-jk-text-muted">개 공고</span>
            </p>
          </div>
          <div className="rounded-[12px] bg-jk-bg px-3.5 py-3">
            <p className="text-[11px] text-jk-text-muted">완성 후 도달</p>
            <p className="mt-0.5 text-lg font-bold text-jk-blue">
              상위 {data.projectedPercentile ?? "-"}
              <span className="text-sm font-medium">%</span>
            </p>
          </div>
        </div>
      </section>
    );
  }

  // 잠재 구직자: 연봉 한 줄
  if (userType === "passive") {
    return (
      <section className={cardClass}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-jk-text-muted">지금 내 시장가치</p>
            <p className="mt-1 text-4xl font-bold tracking-tight text-jk-text-strong">{data.score}<span className="text-xl font-semibold text-jk-text-muted ml-1">점</span></p>
          </div>
          <div className="rounded-[14px] bg-jk-bg p-3 text-right">
            <p className="text-base font-bold text-emerald-500">{data.salaryVsMarket}</p>
            <p className="mt-0.5 text-xs text-jk-text-muted">시장 평균 대비</p>
          </div>
        </div>
      </section>
    );
  }

  // 적극 구직자: 시장 비교 + 스파크라인 + 타임라인
  const trendColor = data.trend === "up" ? "text-emerald-500" : data.trend === "down" ? "text-rose-500" : "text-jk-text-muted";
  const trendArrow = data.trend === "up" ? "↑" : data.trend === "down" ? "↓" : "→";

  return (
    <section className={cardClass}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-jk-text-muted">커리어 스코어</p>
          <div className="mt-1.5 flex items-end gap-2">
            <p className="text-4xl font-bold tracking-tight text-jk-text-strong">{data.score}<span className="text-xl font-semibold text-jk-text-muted ml-0.5">점</span></p>
            <span className={`mb-1 text-sm font-bold ${trendColor}`}>
              {trendArrow} +{data.trendDelta}점
            </span>
          </div>
          <p className="mt-1 text-xs font-semibold text-jk-blue">{data.marketComparison}</p>
        </div>
        {data.scoreHistory && <Sparkline history={data.scoreHistory} />}
      </div>

      {/* 시장 백분위 바 */}
      <div className="mt-4">
        <div className="mb-1.5 flex items-center justify-between">
          <p className="text-xs text-jk-text-muted">시장 내 위치</p>
          <p className="text-xs font-bold text-jk-blue">상위 {data.percentile}%</p>
        </div>
        <div className="relative h-2 rounded-full bg-jk-bg-section">
          <div
            className="h-2 rounded-full bg-jk-blue"
            style={{ width: `${100 - (data.percentile ?? 50)}%` }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
            style={{ left: `${100 - (data.percentile ?? 50)}%` }}
          >
            <div className="h-4 w-4 rounded-full border-2 border-jk-blue bg-white shadow-md" />
          </div>
        </div>
        <div className="mt-1 flex justify-between text-[10px] text-jk-text-muted">
          <span>하위</span><span>상위</span>
        </div>
      </div>

      {/* 타임라인 토글 */}
      {timeline && timeline.length > 0 && (
        <>
          <button
            onClick={() => setShowTimeline(!showTimeline)}
            className="mt-4 flex w-full items-center justify-between rounded-[10px] bg-jk-bg px-3 py-2.5 text-xs"
          >
            <span className="font-medium text-jk-text-secondary">잡코리아가 기억하는 내 커리어 성장</span>
            <span className="text-jk-blue font-semibold">{showTimeline ? "접기 ↑" : "보기 ↓"}</span>
          </button>
          {showTimeline && <CareerTimeline timeline={timeline} />}
        </>
      )}
    </section>
  );
}
