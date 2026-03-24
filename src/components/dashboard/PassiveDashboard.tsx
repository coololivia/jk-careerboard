import { UserData } from "@/types/user";
import JobCard from "@/components/JobCard";

interface Props {
  data: UserData;
}

export default function PassiveDashboard({ data }: Props) {
  const { user, matchedJobs, careerScore, skillGap } = data as any;

  return (
    <div className="flex flex-col gap-6">
      {/* 헤더 */}
      <div>
        <p className="text-sm text-gray-500">안녕하세요,</p>
        <h1 className="text-xl font-bold">{user.name}님 👋</h1>
        <p className="mt-1 text-sm text-gray-500">
          조건 맞는 공고 나오면 바로 알려드릴게요
        </p>
      </div>

      {/* Push 알림 수신 동의 CTA */}
      {!(data as any).pushNotificationConsent && (
        <section className="rounded-xl bg-blue-600 p-4 text-white">
          <p className="text-sm font-semibold">딱 맞는 공고, 놓치지 마세요</p>
          <p className="mt-1 text-xs opacity-80">
            조건 맞는 공고 올라오면 카카오 알림톡으로 바로 알려드려요
          </p>
          <button className="mt-3 w-full rounded-lg bg-white py-2 text-sm font-bold text-blue-600">
            알림 받기
          </button>
        </section>
      )}

      {/* 맞춤 공고 — 전면 */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold">맞춤 공고</h2>
          <span className="text-xs text-gray-400">{(matchedJobs ?? []).length}개</span>
        </div>
        <div className="flex flex-col gap-3">
          {(matchedJobs ?? []).map((job: any) => (
            <JobCard key={job.id} job={job} ctaLabel="원클릭 지원" />
          ))}
        </div>
      </section>

      {/* Career Score — 연봉 비교 한 줄 */}
      <section className="rounded-xl border border-gray-200 bg-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">지금 내 시장가치</p>
            <p className="text-2xl font-bold mt-0.5">{careerScore?.score ?? "-"}점</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-orange-500">{careerScore?.salaryVsMarket}</p>
            <p className="text-xs text-gray-400 mt-0.5">시장 평균 대비</p>
          </div>
        </div>
      </section>

      {/* Skill Gap — 연봉 임팩트 강조 */}
      <section>
        <h2 className="mb-3 text-base font-semibold">연봉 올리는 스킬</h2>
        <div className="flex flex-col gap-3">
          {(skillGap ?? []).map((skill: any) => (
            <div key={skill.skill} className="rounded-xl border border-gray-200 bg-white p-4">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-sm">{skill.skill}</p>
                {skill.salaryImpact && (
                  <span className="text-sm font-bold text-green-600">{skill.salaryImpact}</span>
                )}
              </div>
              <p className="mt-1 text-xs text-gray-500">
                이 스킬 있으면 연봉 {skill.salaryImpact} 올릴 수 있어요
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
