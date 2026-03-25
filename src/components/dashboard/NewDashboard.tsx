import { UserData } from "@/types/user";
import JobCard from "@/components/JobCard";
import CareerScoreCard from "@/components/CareerScoreCard";
import SkillGapCard from "@/components/SkillGapCard";
import InsightCard from "@/components/InsightCard";
import ResumeAiSection from "@/components/ResumeAiSection";
import ResumeLinkBar from "@/components/ResumeLinkBar";

interface Props {
  data: UserData;
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-3">
      <h2 className="text-[18px] font-bold text-jk-text-strong">{title}</h2>
    </div>
  );
}

export default function NewDashboard({ data }: Props) {
  const { user, careerScore, skillGap, matchedJobs, resumeProgress, insight, resumeAiAnalysis, resumeCount } = data as any;

  return (
    <div className="animate-page flex flex-col gap-7">

      <p className="pt-1 text-sm text-jk-text-muted">첫 취업까지 함께할게요</p>

      {/* Career Score — 격려 프레이밍 */}
      <CareerScoreCard data={careerScore} userType="new" />

      {/* ── 흰색 배경 섹션 ── */}
      <div data-header-sentinel className="-mx-4 bg-white px-4 pt-6 pb-8 flex flex-col gap-7">

      {/* 이력서 완성도 */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-[18px] font-bold text-jk-text-strong">이력서 완성도</h2>
          <span className="text-sm font-bold text-jk-blue">{user.resumeCompleteness}%</span>
        </div>
        <div className="rounded-lg bg-white p-4 border border-jk-card-stroke">
          <div className="mb-1 flex items-center justify-between text-xs text-jk-text-muted">
            <span>작성 완료</span>
            <span className="font-semibold text-jk-blue">{user.resumeCompleteness}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-jk-bg-section">
            <div
              className="h-2 rounded-full bg-jk-blue transition-all"
              style={{ width: `${user.resumeCompleteness}%` }}
            />
          </div>
          <div className="mt-3 flex flex-col gap-2.5">
            {(resumeProgress?.missingItems ?? []).map((item: any) => (
              <div key={item.field} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-jk-border" />
                  <p className="text-sm text-jk-text-secondary">{item.label}</p>
                  {item.required && (
                    <span className="rounded-full bg-rose-50 px-1.5 py-0.5 text-[10px] font-semibold text-rose-500">필수</span>
                  )}
                </div>
                <button className="rounded-full bg-jk-bg-blue px-2.5 py-1 text-xs font-semibold text-jk-blue">추가하기</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 이력서 AI 분석 — 신입은 지원 버튼 없음 */}
      <ResumeAiSection resumes={resumeAiAnalysis ?? []} />

      {/* 내 이력서 링크바 */}
      <ResumeLinkBar count={resumeCount ?? 0} />

      {/* Skill Gap */}
      <SkillGapCard skills={skillGap ?? []} userType="new" bordered />

      {/* Insight */}
      {insight && <InsightCard data={insight} bordered />}

      {/* 맞춤 공고 */}
      <section>
        <SectionHeader title="지금 지원 가능한 공고" />
        {(matchedJobs ?? []).length === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-lg bg-white py-10 border border-jk-card-stroke">
            <span className="text-3xl">📋</span>
            <p className="text-sm font-semibold text-jk-text-strong">이력서를 완성하면 공고가 생겨요</p>
            <p className="text-xs text-jk-text-muted">희망 직무와 스킬을 추가해보세요</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {(matchedJobs ?? []).map((job: any) => (
              <JobCard key={job.id} job={job} ctaLabel="지원하기" bordered />
            ))}
          </div>
        )}
      </section>

      </div>{/* ── 흰색 배경 섹션 끝 ── */}
    </div>
  );
}
