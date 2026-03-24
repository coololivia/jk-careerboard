import { UserData } from "@/types/user";
import JobCard from "@/components/JobCard";
import CareerScoreCard from "@/components/CareerScoreCard";
import SkillGapCard from "@/components/SkillGapCard";
import InsightCard from "@/components/InsightCard";

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
      {/* 헤더 */}
      <div className="pt-1">
        <p className="text-sm text-jk-text-muted">안녕하세요,</p>
        <h1 className="mt-0.5 text-2xl font-bold tracking-tight text-jk-text-strong">{user.name}님 👋</h1>
        <p className="mt-1.5 text-sm text-jk-text-muted">조건 맞는 공고 나오면 바로 알려드릴게요</p>
      </div>

      {/* Push 알림 CTA */}
      {!(data as any).pushNotificationConsent && (
        <div className="overflow-hidden rounded-[18px] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.07)]">
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
      {(resumeAiAnalysis ?? []).length > 0 && (
        <section>
          <SectionHeader title="이력서 AI 분석" />
          <div className="flex flex-col gap-3">
            {(resumeAiAnalysis as any[]).map((resume: any) => (
              <div key={resume.id} className="card-tap rounded-[16px] bg-white p-4 border border-jk-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <p className="text-[15px] font-bold text-jk-text-strong">{resume.name}</p>
                    <span className="rounded-full bg-jk-bg-section px-2 py-0.5 text-[11px] font-semibold text-jk-text-muted">{resume.type}</span>
                  </div>
                  <p className="text-[11px] text-jk-text-muted">{resume.createdLabel}</p>
                </div>
                <div className="my-3 h-px bg-jk-border" />
                <div className="flex items-center gap-8">
                  <div>
                    <p className="text-[11px] text-jk-text-muted">완성도</p>
                    <p className="mt-0.5 text-[22px] font-bold text-jk-text-strong">{resume.completeness}%</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-jk-text-muted">합격예측</p>
                    <p className="mt-0.5 text-[22px] font-bold text-jk-text-strong">{resume.passRate}%</p>
                  </div>
                </div>
                <div className="mt-0 flex flex-col gap-3">
                  <p className="text-[13px] font-semibold text-jk-blue">{resume.tip}</p>
                  <div className="flex justify-end gap-2">
                    <button className="rounded-full bg-jk-bg px-4 py-2 text-[13px] font-semibold text-jk-text-strong transition-all active:scale-95">
                      이력서 편집
                    </button>
                    <button className="rounded-full bg-jk-blue px-4 py-2 text-[13px] font-semibold text-white transition-all active:scale-95">
                      지원
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 내 이력서 링크바 */}
      <div className="flex items-center gap-3">
        <div
          className="flex-1 rounded-full bg-white px-4 py-3 shadow-[0_1px_4px_rgba(0,0,0,0.06)]"
          style={{
            background: "linear-gradient(white,white) padding-box, linear-gradient(90deg,#DEE0FFCC 0%,#6D79FFCC 17%,#BF47FFCC 53%,#FF9334CC 78%,#FFDFC2CC 100%) border-box",
            border: "1px solid transparent",
          }}
        >
          <div className="flex items-center justify-between">
            <p className="text-[15px] font-semibold text-jk-text-strong">내 이력서 ({resumeCount ?? 0})</p>
            <div className="flex items-center gap-0.5">
              <p className="text-[11px] text-jk-text-muted">이력서 관리하기</p>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M6.5 4.5L11.5 9l-5 4.5" stroke="#1a1a1e" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
        <button className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-jk-blue shadow-[0_4px_12px_rgba(27,85,246,0.35)] transition-all active:scale-95">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 4v12M4 10h12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* 맞춤 공고 전면 */}
      <section>
        <SectionHeader
          title="맞춤 공고"
          right={<span className="text-xs font-semibold text-jk-text-muted">{(matchedJobs ?? []).length}개</span>}
        />
        {(matchedJobs ?? []).length === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-[16px] bg-white py-10 border border-jk-border">
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
