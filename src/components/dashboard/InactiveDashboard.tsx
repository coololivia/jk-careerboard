import { UserData } from "@/types/user";
import JobCard from "@/components/JobCard";

interface Props {
  data: UserData;
}

export default function InactiveDashboard({ data }: Props) {
  const { user, reEngagement, matchedJobs } = data as any;

  return (
    <div className="flex flex-col gap-6">
      {/* 헤더 — Re-engagement */}
      <div>
        <p className="text-sm text-gray-500">오랜만이에요,</p>
        <h1 className="text-xl font-bold">{user.name}님 👋</h1>
        <p className="mt-1 text-sm text-gray-500">
          {user.user?.daysSinceLastVisit ?? 45}일 만에 돌아왔네요
        </p>
      </div>

      {/* Re-engagement 하이라이트 */}
      <section className="rounded-xl border border-gray-200 bg-white overflow-hidden">
        <div className="bg-gray-900 px-4 py-3">
          <p className="text-white font-semibold text-sm">{reEngagement?.headline}</p>
        </div>
        <div className="flex flex-col divide-y divide-gray-100">
          {(reEngagement?.highlights ?? []).map((item: any, i: number) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-base">
                {item.type === "new_jobs" ? "💼" : item.type === "salary_trend" ? "📈" : "⏰"}
              </div>
              <p className="text-sm text-gray-700">{item.message}</p>
            </div>
          ))}
        </div>
        <div className="px-4 pb-4">
          <button className="mt-2 w-full rounded-xl bg-blue-600 py-3 text-sm font-bold text-white">
            {reEngagement?.ctaMessage ?? "공고 보러 가기"}
          </button>
        </div>
      </section>

      {/* 스크랩 마감 임박 */}
      {(matchedJobs ?? []).filter((j: any) => j.isScraped && j.isUrgent).length > 0 && (
        <section>
          <h2 className="mb-3 text-base font-semibold text-red-500">⚠ 스크랩 공고 마감 임박</h2>
          {(matchedJobs ?? [])
            .filter((j: any) => j.isScraped && j.isUrgent)
            .map((job: any) => (
              <div key={job.id} className="rounded-xl border border-red-200 bg-red-50 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-gray-500">{job.company}</p>
                    <p className="font-semibold text-sm mt-0.5">{job.title}</p>
                    <p className="text-xs text-red-500 mt-1">마감: {job.deadline}</p>
                  </div>
                  <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-bold text-red-600">
                    {job.tags?.[0]}
                  </span>
                </div>
                <button className="mt-3 w-full rounded-lg bg-red-500 py-2 text-sm font-bold text-white">
                  지금 지원하기
                </button>
              </div>
            ))}
        </section>
      )}

      {/* 추천 공고 */}
      <section>
        <h2 className="mb-3 text-base font-semibold">새로 올라온 맞춤 공고</h2>
        <div className="flex flex-col gap-3">
          {(matchedJobs ?? [])
            .filter((j: any) => !j.isScraped || !j.isUrgent)
            .map((job: any) => (
              <JobCard key={job.id} job={job} ctaLabel="바로 지원" />
            ))}
        </div>
      </section>
    </div>
  );
}
