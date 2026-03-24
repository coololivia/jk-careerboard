import { UserData } from "@/types/user";
import JobCard from "@/components/JobCard";
import CareerScoreCard from "@/components/CareerScoreCard";
import SkillGapCard from "@/components/SkillGapCard";

interface Props {
  data: UserData;
}

export default function NewDashboard({ data }: Props) {
  const { user, careerScore, skillGap, matchedJobs, resumeProgress } = data as any;

  return (
    <div className="flex flex-col gap-6">
      {/* 헤더 */}
      <div>
        <p className="text-sm text-gray-500">안녕하세요,</p>
        <h1 className="text-xl font-bold">{user.name}님 👋</h1>
        <p className="mt-1 text-sm text-gray-500">첫 취업까지 함께할게요</p>
      </div>

      {/* Career Score — 격려 프레이밍 */}
      <CareerScoreCard data={careerScore} userType="new" />

      {/* 이력서 진행도 */}
      <section className="rounded-xl border border-gray-200 bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold">이력서 완성도</h2>
          <span className="text-sm font-bold text-blue-600">
            {user.resumeCompleteness}%
          </span>
        </div>
        <div className="h-2 rounded-full bg-gray-100">
          <div
            className="h-2 rounded-full bg-blue-600 transition-all"
            style={{ width: `${user.resumeCompleteness}%` }}
          />
        </div>
        <div className="mt-3 flex flex-col gap-2">
          {(resumeProgress?.missingItems ?? []).map((item: any) => (
            <div key={item.field} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
                <p className="text-sm text-gray-600">{item.label}</p>
                {item.required && (
                  <span className="text-xs text-red-500">필수</span>
                )}
              </div>
              <button className="text-xs font-medium text-blue-600">
                추가하기
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Skill Gap */}
      <SkillGapCard skills={skillGap ?? []} userType="new" />

      {/* 맞춤 공고 */}
      <section>
        <h2 className="mb-3 text-base font-semibold">지금 지원 가능한 공고</h2>
        <div className="flex flex-col gap-3">
          {(matchedJobs ?? []).map((job: any) => (
            <JobCard key={job.id} job={job} ctaLabel="지원하기" />
          ))}
        </div>
      </section>
    </div>
  );
}
