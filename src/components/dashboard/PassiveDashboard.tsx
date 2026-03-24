import { UserData } from "@/types/user";
import JobCard from "@/components/JobCard";
import CareerScoreCard from "@/components/CareerScoreCard";
import SkillGapCard from "@/components/SkillGapCard";

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
      <CareerScoreCard data={careerScore} userType="passive" />

      {/* Skill Gap — 연봉 임팩트 강조 */}
      <SkillGapCard skills={skillGap ?? []} userType="passive" />
    </div>
  );
}
