import { UserData } from "@/types/user";
import JobCard from "@/components/JobCard";
import CareerScoreCard from "@/components/CareerScoreCard";
import SkillGapCard from "@/components/SkillGapCard";
import InsightCard from "@/components/InsightCard";

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
      {/* 헤더 */}
      <div className="pt-1">
        <p className="text-sm text-jk-text-muted">안녕하세요,</p>
        <h1 className="mt-0.5 text-2xl font-bold tracking-tight text-jk-text-strong">{user.name}님 👋</h1>
        <p className="mt-1.5 text-sm text-jk-text-muted">첫 취업까지 함께할게요</p>
      </div>

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
        <div className="rounded-[16px] bg-white p-4 border border-jk-border">
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
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-[13px] font-semibold text-jk-blue">{resume.tip}</p>
                  <button className="rounded-full bg-jk-bg px-4 py-2 text-[13px] font-semibold text-jk-text-strong transition-all active:scale-95">
                    이력서 편집
                  </button>
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

      {/* Skill Gap */}
      <SkillGapCard skills={skillGap ?? []} userType="new" bordered />

      {/* Insight */}
      {insight && <InsightCard data={insight} bordered />}

      {/* 맞춤 공고 */}
      <section>
        <SectionHeader title="지금 지원 가능한 공고" />
        {(matchedJobs ?? []).length === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-[16px] bg-white py-10 border border-jk-border">
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
