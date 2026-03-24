import { UserData } from "@/types/user";

interface Props {
  data: UserData;
}

export default function ActiveDashboard({ data }: Props) {
  const { user, activityTracking, matchedJobs, careerScore } = data as any;

  const allColumns = activityTracking?.columns ?? {};
  const reviewing = allColumns.reviewing ?? [];
  const interview = allColumns.interview ?? [];
  const passed = allColumns.passed ?? [];
  const failed = allColumns.failed ?? [];
  const totalApplications =
    reviewing.length + interview.length + passed.length + failed.length;

  return (
    <div className="flex flex-col gap-6">
      {/* 헤더 */}
      <div>
        <p className="text-sm text-gray-500">안녕하세요,</p>
        <h1 className="text-xl font-bold">{user.name}님 👋</h1>
        <p className="mt-1 text-sm text-gray-500">
          지금 <span className="font-semibold text-blue-600">{totalApplications}개 공고</span>에 지원 중이에요
        </p>
      </div>

      {/* Activity Tracking 칸반 */}
      <section>
        <h2 className="mb-3 text-base font-semibold">지원 현황</h2>
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: "서류검토", items: reviewing, color: "bg-yellow-50 border-yellow-200" },
            { label: "면접예정", items: interview, color: "bg-blue-50 border-blue-200" },
            { label: "합격", items: passed, color: "bg-green-50 border-green-200" },
            { label: "불합격", items: failed, color: "bg-red-50 border-red-200" },
          ].map(({ label, items, color }) => (
            <div key={label} className={`rounded-xl border p-2 ${color}`}>
              <p className="mb-2 text-center text-xs font-medium text-gray-600">{label}</p>
              <p className="text-center text-lg font-bold">{items.length}</p>
            </div>
          ))}
        </div>

        {/* 면접 임박 알림 */}
        {interview.length > 0 && (
          <div className="mt-3 rounded-xl bg-blue-600 px-4 py-3 text-white">
            <p className="text-xs font-medium opacity-80">면접 일정</p>
            <p className="text-sm font-semibold">
              {interview[0].company} — {interview[0].title}
            </p>
            {interview[0].interviewDate && (
              <p className="mt-0.5 text-xs opacity-80">
                {new Date(interview[0].interviewDate).toLocaleDateString("ko-KR", {
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            )}
          </div>
        )}

        {/* 불합격 후 유사 공고 노출 */}
        {failed.length > 0 && (
          <div className="mt-3 rounded-xl border border-gray-200 bg-white px-4 py-3">
            <p className="text-xs text-gray-500">
              {failed[0].company} 불합격 — 비슷한 공고 바로 지원해볼까요?
            </p>
            <button className="mt-2 w-full rounded-lg bg-gray-900 py-2 text-sm font-semibold text-white">
              유사 공고 보기
            </button>
          </div>
        )}
      </section>

      {/* Match Score 공고 */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold">맞춤 공고</h2>
          <span className="text-xs text-gray-400">AI 추천</span>
        </div>
        <div className="flex flex-col gap-3">
          {(matchedJobs ?? []).map((job: any) => (
            <div key={job.id} className="rounded-xl border border-gray-200 bg-white p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-gray-500">{job.company}</p>
                  <p className="mt-0.5 font-semibold">{job.title}</p>
                  <p className="mt-1 text-xs text-gray-500">{job.matchReason}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-700">
                    {job.matchScore}%
                  </span>
                  {job.isUrgent && (
                    <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-600">
                      {job.tags?.[0]}
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <p className="text-xs text-gray-400">{job.salary}</p>
                <button className="rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white">
                  바로 지원
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Career Score 인라인 */}
      <section className="rounded-xl border border-gray-200 bg-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">커리어 스코어</p>
            <p className="text-2xl font-bold">{careerScore?.score ?? "-"}점</p>
            <p className="text-xs text-gray-500">{careerScore?.marketComparison}</p>
          </div>
          <div className="text-right">
            <span className="text-green-600 text-sm font-semibold">
              ↑ +{careerScore?.trendDelta}점
            </span>
            <p className="text-xs text-gray-400 mt-0.5">이번 달</p>
          </div>
        </div>
      </section>
    </div>
  );
}
