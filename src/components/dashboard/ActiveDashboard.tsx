import { UserData } from "@/types/user";
import JobCard from "@/components/JobCard";
import CareerScoreCard from "@/components/CareerScoreCard";
import SkillGapCard from "@/components/SkillGapCard";

interface Props {
  data: UserData;
}

export default function ActiveDashboard({ data }: Props) {
  const { user, activityTracking, matchedJobs, careerScore, careerTimeline, skillGap } = data as any;

  const allColumns = activityTracking?.columns ?? {};
  const reviewing = allColumns.reviewing ?? [];
  const interview = allColumns.interview ?? [];
  const passed = allColumns.passed ?? [];
  const failed = allColumns.failed ?? [];
  const totalApplications = reviewing.length + interview.length + passed.length + failed.length;

  return (
    <div className="flex flex-col gap-6">
      {/* 헤더 */}
      <div>
        <p className="text-sm text-jk-text-muted">안녕하세요,</p>
        <h1 className="text-xl font-bold text-jk-text-strong">{user.name}님 👋</h1>
        <p className="mt-1 text-sm text-jk-text-muted">
          지금{" "}
          <span className="font-semibold text-jk-orange">{totalApplications}개 공고</span>에 지원 중이에요
        </p>
      </div>

      {/* Activity Tracking 칸반 */}
      <section>
        <h2 className="mb-3 text-base font-semibold text-jk-text-strong">지원 현황</h2>
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: "서류검토", items: reviewing, bg: "bg-yellow-50", border: "border-yellow-200", text: "text-yellow-700" },
            { label: "면접예정", items: interview, bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700" },
            { label: "합격",   items: passed,   bg: "bg-green-50", border: "border-green-200", text: "text-green-700" },
            { label: "불합격", items: failed,   bg: "bg-red-50",   border: "border-red-200",   text: "text-red-600" },
          ].map(({ label, items, bg, border, text }) => (
            <div key={label} className={`rounded-[12px] border p-2 ${bg} ${border}`}>
              <p className={`mb-1.5 text-center text-[10px] font-medium ${text}`}>{label}</p>
              <p className="text-center text-lg font-bold text-jk-text-strong">{items.length}</p>
            </div>
          ))}
        </div>

        {/* 면접 임박 알림 */}
        {interview.length > 0 && (
          <div className="mt-3 rounded-[12px] bg-jk-orange px-4 py-3 text-white">
            <p className="text-xs font-medium opacity-80">📅 면접 일정</p>
            <p className="mt-0.5 text-sm font-semibold">{interview[0].company} — {interview[0].title}</p>
            {interview[0].interviewDate && (
              <p className="mt-0.5 text-xs opacity-80">
                {new Date(interview[0].interviewDate).toLocaleDateString("ko-KR", {
                  month: "long", day: "numeric", hour: "2-digit", minute: "2-digit",
                })}
              </p>
            )}
          </div>
        )}

        {/* 불합격 후 유사 공고 */}
        {failed.length > 0 && (
          <div className="mt-3 rounded-[12px] border border-orange-200 bg-orange-50 px-4 py-3">
            <p className="text-xs font-medium text-orange-700">
              {failed[0].company} 불합격 — 비슷한 공고 바로 지원해볼까요?
            </p>
            <button className="mt-2 w-full rounded-[8px] bg-jk-text-strong py-2 text-sm font-semibold text-white">
              유사 공고 보기
            </button>
          </div>
        )}
      </section>

      {/* Match Score 공고 */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-jk-text-strong">맞춤 공고</h2>
            <p className="mt-0.5 text-xs text-jk-text-muted">과거 합격 패턴을 반영했어요</p>
          </div>
          <span className="rounded-full bg-purple-50 px-2.5 py-1 text-xs font-medium text-jk-purple">
            AI 추천
          </span>
        </div>
        <div className="flex flex-col gap-3">
          {(matchedJobs ?? []).map((job: any, i: number) => (
            <JobCard key={job.id} job={{ ...job, historicalBadge: i < 2 }} ctaLabel="바로 지원" />
          ))}
        </div>
      </section>

      {/* Skill Gap */}
      <SkillGapCard skills={skillGap ?? []} userType="active" targetJob={user.jobTitle} />

      {/* Career Score */}
      <CareerScoreCard data={careerScore} timeline={careerTimeline} userType="active" />
    </div>
  );
}
