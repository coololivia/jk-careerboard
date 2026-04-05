import { UserData } from "@/types/user";
import JobCard from "@/components/JobCard";
import ResumeLinkBar from "@/components/ResumeLinkBar";

interface Props {
  data: UserData;
  tierDaysOverride?: number;
}

function getIconForType(type: string) {
  if (type === "new_jobs") return "💼";
  if (type === "salary_trend") return "📈";
  if (type === "market_change") return "🌐";
  if (type === "resume") return "📝";
  return "⏰";
}

function formatAbsence(days: number): { value: string; unit: string; subtitle: string } {
  if (days < 90) {
    return { value: String(days), unit: "일", subtitle: `${days}일 만에 돌아왔네요` };
  } else if (days < 365) {
    const months = Math.round(days / 30);
    return { value: String(months), unit: "개월", subtitle: `${months}개월 만에 돌아오셨네요` };
  } else {
    const years = Math.floor(days / 365);
    const rem = Math.round((days % 365) / 30);
    const subtitle = rem > 0 ? `${years}년 ${rem}개월 만에 돌아오셨네요` : `${years}년 만에 돌아오셨네요`;
    return { value: String(years), unit: "년", subtitle };
  }
}

function getTier(days: number): "short" | "mid" | "long" {
  if (days < 90) return "short";
  if (days < 365) return "mid";
  return "long";
}

export default function InactiveDashboard({ data, tierDaysOverride }: Props) {
  const { user, behaviorSignals, reEngagementByTier, matchedJobs, resumeCount } = data as any;

  const days: number = tierDaysOverride ?? behaviorSignals?.daysSinceLastVisit ?? 45;
  const tier = getTier(days);
  const { subtitle } = formatAbsence(days);
  const reEngagement = reEngagementByTier?.[tier] ?? reEngagementByTier?.short ?? {};

  const showScrapUrgent = tier !== "long";

  return (
    <div className="animate-page flex flex-col gap-7">

      <p className="-mt-1 text-[16px] text-jk-text-muted">{subtitle}</p>

      {/* Re-engagement 하이라이트 */}
      <section className="overflow-hidden rounded-xl bg-white shadow-card">
        <div className="px-4 pt-4 pb-2">
          <p className="text-[15px] font-bold text-jk-text-strong">{reEngagement?.headline}</p>
        </div>
        <div className="flex flex-col">
          {(reEngagement?.highlights ?? []).map((item: any, i: number) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-jk-bg-blue text-base">
                {getIconForType(item.type)}
              </div>
              <p className="text-sm text-jk-text-secondary leading-snug">{item.message}</p>
            </div>
          ))}
        </div>
        <div className="px-4 py-4">
          <button className="w-full rounded-full bg-jk-blue py-3.5 text-sm font-bold text-white shadow-button-blue">
            {reEngagement?.ctaMessage ?? "공고 보러 가기"}
          </button>
        </div>
      </section>

      {/* ── 흰색 배경 섹션 ── */}
      <div data-header-sentinel className="-mx-4 bg-white px-4 pt-6 pb-8 flex flex-col gap-7">

      {/* 내 이력서 링크바 */}
      <ResumeLinkBar count={resumeCount ?? 0} showUpdateBadge={!!reEngagement?.resumeNudge} />

      {/* 스크랩 마감 임박 — short/mid 티어만 노출 */}
      {showScrapUrgent && (matchedJobs ?? []).filter((j: any) => j.isScraped && j.isUrgent).length > 0 && (
        <section>
          <div className="mb-3">
            <h2 className="text-[18px] font-bold text-jk-text-strong">⚠ 스크랩 공고 마감 임박</h2>
          </div>
          {(matchedJobs ?? [])
            .filter((j: any) => j.isScraped && j.isUrgent)
            .map((job: any) => (
              <div key={job.id} className="rounded-lg border border-rose-100 bg-white p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium text-jk-text-muted">{job.company}</p>
                    <p className="mt-0.5 text-[15px] font-bold text-jk-text-strong">{job.title}</p>
                    <p className="mt-1 text-xs font-semibold text-rose-500">마감: {job.deadline}</p>
                  </div>
                  <span className="rounded-full bg-rose-100 px-2.5 py-1 text-xs font-bold text-rose-600">
                    {job.tags?.[0]}
                  </span>
                </div>
                <button className="mt-3 w-full rounded-full bg-rose-500 py-3 text-sm font-bold text-white">
                  지금 지원하기
                </button>
              </div>
            ))}
        </section>
      )}

      {/* 추천 공고 */}
      <section>
        <div className="mb-3">
          <h2 className="text-[18px] font-bold text-jk-text-strong">
            {tier === "long" ? "요즘 이런 공고들이 있어요" : "새로 올라온 맞춤 공고"}
          </h2>
        </div>
        {(matchedJobs ?? []).filter((j: any) => !j.isScraped || !j.isUrgent).length === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-lg bg-white py-10 border border-jk-card-stroke">
            <span className="text-3xl">📋</span>
            <p className="text-sm font-semibold text-jk-text-strong">이력서를 업데이트하면 공고가 생겨요</p>
            <p className="text-xs text-jk-text-muted">조건에 맞는 공고를 다시 찾아드릴게요</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {(matchedJobs ?? [])
              .filter((j: any) => !j.isScraped || !j.isUrgent)
              .map((job: any) => (
                <JobCard key={job.id} job={job} ctaLabel="바로 지원" bordered />
              ))}
          </div>
        )}
      </section>

      </div>{/* ── 흰색 배경 섹션 끝 ── */}
    </div>
  );
}
