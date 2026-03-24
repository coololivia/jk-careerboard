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
}

interface Props {
  data: CareerScoreData;
  timeline?: TimelineEvent[];
  userType: "active" | "passive" | "new";
}

function Sparkline({ history }: { history: ScoreHistory[] }) {
  if (!history || history.length < 2) return null;
  const width = 120;
  const height = 36;
  const padding = 4;
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
      <polyline points={points.join(" ")} fill="none" stroke="#ff8a41" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={lx} cy={ly} r="3" fill="#ff8a41" />
    </svg>
  );
}

function CareerTimeline({ timeline }: { timeline: TimelineEvent[] }) {
  return (
    <div className="mt-4 border-t border-jk-border pt-4">
      <p className="mb-3 text-xs font-medium text-jk-text-muted">커리어 성장 타임라인</p>
      <div className="relative flex flex-col gap-0">
        {timeline.map((item, i) => (
          <div key={i} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className={`mt-1 h-3 w-3 rounded-full border-2 ${item.highlight ? "border-jk-orange bg-jk-orange" : "border-jk-border bg-white"}`} />
              {i < timeline.length - 1 && (
                <div className="my-0.5 w-px flex-1 bg-jk-border" style={{ minHeight: 20 }} />
              )}
            </div>
            <div className="pb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-jk-text-muted">{item.year}</span>
                {item.highlight && (
                  <span className="rounded-full bg-orange-50 px-1.5 py-0.5 text-[10px] font-medium text-jk-orange">주요 이력</span>
                )}
              </div>
              <p className="mt-0.5 text-sm font-semibold text-jk-text-strong">{item.event}</p>
              {(item.company || item.title) && (
                <p className="text-xs text-jk-text-muted">{[item.company, item.title].filter(Boolean).join(" · ")}</p>
              )}
              <p className="mt-0.5 text-xs font-medium text-jk-orange">커리어 스코어 {item.score}점</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CareerScoreCard({ data, timeline, userType }: Props) {
  const [showTimeline, setShowTimeline] = useState(false);

  // 신입: 격려 프레이밍
  if (userType === "new") {
    return (
      <section className="rounded-[16px] bg-jk-orange p-4 text-white">
        <p className="text-xs opacity-80">커리어 스코어</p>
        <div className="mt-1 flex items-end gap-2">
          <p className="text-4xl font-bold">{data.score}</p>
          <p className="mb-1 text-sm opacity-80">/ 100</p>
        </div>
        <p className="mt-2 text-sm font-semibold">{data.message}</p>
        <div className="mt-3 flex flex-col gap-2">
          {(data.nextActions ?? []).map((action, i) => (
            <div key={i} className="flex items-center justify-between rounded-[10px] bg-white/15 px-3 py-2">
              <p className="text-xs">{action.action}</p>
              <span className="text-xs font-bold text-white">{action.scoreImpact}</span>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // 잠재 구직자: 연봉 한 줄
  if (userType === "passive") {
    return (
      <section className="rounded-[16px] border border-jk-border bg-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-jk-text-muted">지금 내 시장가치</p>
            <p className="mt-0.5 text-2xl font-bold text-jk-text-strong">{data.score}점</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-jk-orange">{data.salaryVsMarket}</p>
            <p className="mt-0.5 text-xs text-jk-text-muted">시장 평균 대비</p>
          </div>
        </div>
      </section>
    );
  }

  // 적극 구직자: 시장 비교 + 스파크라인 + 타임라인
  const trendColor = data.trend === "up" ? "text-green-600" : data.trend === "down" ? "text-red-500" : "text-jk-text-muted";
  const trendArrow = data.trend === "up" ? "↑" : data.trend === "down" ? "↓" : "→";

  return (
    <section className="rounded-[16px] border border-jk-border bg-white p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-jk-text-muted">커리어 스코어</p>
          <div className="mt-0.5 flex items-end gap-1.5">
            <p className="text-3xl font-bold text-jk-text-strong">{data.score}점</p>
            <span className={`mb-0.5 text-sm font-semibold ${trendColor}`}>
              {trendArrow} +{data.trendDelta}점
            </span>
          </div>
          <p className="mt-1 text-xs font-medium text-jk-orange">{data.marketComparison}</p>
        </div>
        {data.scoreHistory && <Sparkline history={data.scoreHistory} />}
      </div>

      {/* 시장 백분위 바 */}
      <div className="mt-3">
        <div className="mb-1 flex items-center justify-between">
          <p className="text-xs text-jk-text-muted">시장 내 위치</p>
          <p className="text-xs font-medium text-jk-text-secondary">상위 {data.percentile}%</p>
        </div>
        <div className="relative h-2 rounded-full bg-jk-bg-section">
          <div
            className="h-2 rounded-full bg-jk-orange"
            style={{ width: `${100 - (data.percentile ?? 50)}%` }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
            style={{ left: `${100 - (data.percentile ?? 50)}%` }}
          >
            <div className="h-3.5 w-3.5 rounded-full border-2 border-jk-orange bg-white shadow-sm" />
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
            className="mt-3 flex w-full items-center justify-between text-xs text-jk-text-muted"
          >
            <span>잡코리아가 기억하는 내 커리어 성장</span>
            <span>{showTimeline ? "접기 ↑" : "보기 ↓"}</span>
          </button>
          {showTimeline && <CareerTimeline timeline={timeline} />}
        </>
      )}
    </section>
  );
}
