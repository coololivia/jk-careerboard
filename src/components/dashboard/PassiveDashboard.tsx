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

function SectionHeader({ title, right }: { title: string; right?: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="text-[18px] font-bold text-jk-text-strong">{title}</h2>
      {right}
    </div>
  );
}

export default function PassiveDashboard({ data }: Props) {
  const { user, matchedJobs, careerScore, skillGap, insight, resumeAiAnalysis, resumeCount } = data as any;

  return (
    <div className="animate-page flex flex-col gap-7">

      <p className="-mt-1 text-[16px] text-jk-text-muted">조건 맞는 공고 나오면 바로 알려드릴게요</p>

      {/* Push 알림 CTA */}
      {!(data as any).pushNotificationConsent && (
        <div className="overflow-hidden rounded-xl bg-white shadow-card">
          <div className="flex items-start gap-3 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-jk-bg-blue text-xl">
              🔔
            </div>
            <div>
              <p className="text-sm font-bold text-jk-text-strong">딱 맞는 공고, 놓치지 마세요</p>
              <p className="mt-0.5 text-xs text-jk-text-muted leading-relaxed">조건 맞는 공고 올라오면 카카오 알림톡으로 바로 알려드려요</p>
            </div>
          </div>
          <div className="px-4 pb-4">
            <button className="w-full rounded-full bg-jk-blue py-3 text-sm font-bold text-white">
              알림 받기
            </button>
          </div>
        </div>
      )}

      {/* ── 흰색 배경 섹션 ── */}
      <div data-header-sentinel className="-mx-4 bg-white px-4 pt-6 pb-8 flex flex-col gap-7">

      {/* 이력서 AI 분석 */}
      <ResumeAiSection resumes={resumeAiAnalysis ?? []} />

      {/* 내 이력서 링크바 */}
      <ResumeLinkBar count={resumeCount ?? 0} />

      {/* 맞춤 공고 전면 */}
      <section>
        <SectionHeader
          title="맞춤 공고"
          right={<span className="text-xs font-semibold text-jk-text-muted">{(matchedJobs ?? []).length}개</span>}
        />
        {(matchedJobs ?? []).length === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-lg bg-white py-10 border border-jk-card-stroke">
            <span className="text-3xl">🔍</span>
            <p className="text-sm font-semibold text-jk-text-strong">조건에 맞는 공고를 찾고 있어요</p>
            <p className="text-xs text-jk-text-muted">알림 설정하면 올라오는 즉시 알려드려요</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {(matchedJobs ?? []).map((job: any) => (
              <JobCard key={job.id} job={job} ctaLabel="원클릭 지원" bordered />
            ))}
          </div>
        )}
      </section>

      {/* Career Score — 연봉 한 줄 */}
      <CareerScoreCard data={careerScore} userType="passive" bordered />

      {/* Insight — 이직 시장 현황 */}
      {insight && <InsightCard data={insight} bordered />}

      {/* Skill Gap — 연봉 임팩트 */}
      <SkillGapCard skills={skillGap ?? []} userType="passive" bordered />

      </div>{/* ── 흰색 배경 섹션 끝 ── */}
    </div>
  );
}
