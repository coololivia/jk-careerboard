import React from "react";
import { UserData } from "@/types/user";
import JobCard from "@/components/JobCard";
import InsightCard from "@/components/InsightCard";
import SkillGapCard from "@/components/SkillGapCard";
import CareerScoreCard from "@/components/CareerScoreCard";
import ResumeAiSection from "@/components/ResumeAiSection";
import ResumeLinkBar from "@/components/ResumeLinkBar";

interface Props {
  data: UserData;
}

const STATUS_STYLE: Record<string, string> = {
  지원완료: "bg-jk-bg-blue text-jk-blue",
  진행중:   "bg-emerald-50 text-emerald-600",
  불합격:   "bg-rose-50 text-rose-500",
};

function SectionHeader({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="mb-3 flex items-start justify-between">
      <div>
        <h2 className="text-[18px] font-bold text-jk-text-strong">{title}</h2>
        {subtitle && (
          <p className="mt-0.5 text-sm text-jk-text-muted">{subtitle}</p>
        )}
      </div>
      {right}
    </div>
  );
}

export default function ActiveDashboard({ data }: Props) {
  const {
    user,
    statsCards,
    resumeAiAnalysis,
    resumeCount,
    applicationList,
    matchedJobs,
    careerScore,
    careerTimeline,
    skillGap,
    insight,
  } = data as any;

  const totalApplications = (applicationList ?? []).length;

  return (
    <div className="animate-page flex flex-col gap-7">

      {/* 인사말 */}
      <div className="pt-1">
        <p className="text-sm text-jk-text-muted">안녕하세요,</p>
        <h1 className="mt-0.5 text-2xl font-bold tracking-tight text-jk-text-strong">
          {user.name}님 👋
        </h1>
        <p className="mt-1.5 text-sm text-jk-text-muted">
          지금{" "}
          <span className="font-bold text-jk-blue">{totalApplications}개 공고</span>
          에 지원 중이에요
        </p>
      </div>

      {/* Stats Cards — 가로 스와이프 */}
      {statsCards && (
        <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden">
          {/* 이력서 합격률 */}
          <div className="card-tap snap-start shrink-0 w-[160px] flex flex-col justify-between rounded-[18px] bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.07)]">
            <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-jk-bg-blue">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="1.5" y="1.5" width="17" height="17" rx="4" stroke="#1b55f6" strokeWidth="1.6"/>
                <path d="M5.5 10l3 3 5-5.5" stroke="#1b55f6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="mt-4">
              <p className="text-[12px] font-medium leading-snug text-jk-text-muted">내 이력서<br />합격률</p>
              <p className="mt-1.5 text-[28px] font-bold leading-none text-jk-text-strong">
                {statsCards.resumeScore.current}
                <span className="text-base font-medium text-jk-text-muted">/{statsCards.resumeScore.total}</span>
              </p>
            </div>
          </div>

          {/* 서류통과 */}
          <div className="card-tap snap-start shrink-0 w-[160px] flex flex-col justify-between rounded-[18px] bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.07)]">
            <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-jk-bg-section">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="2.5" y="6" width="15" height="11.5" rx="2" stroke="#768091" strokeWidth="1.6"/>
                <path d="M6.5 6V5a3.5 3.5 0 017 0v1" stroke="#768091" strokeWidth="1.6" strokeLinecap="round"/>
                <path d="M6.5 11h7M6.5 14h5" stroke="#768091" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="mt-4">
              <p className="text-[12px] font-medium leading-snug text-jk-text-muted">서류통과<br />{statsCards.passedCompanies.companyCount}개 회사</p>
              <p className="mt-1.5 text-[28px] font-bold leading-none text-jk-text-strong">
                {statsCards.passedCompanies.count}
                <span className="text-base font-medium text-jk-text-muted">건</span>
              </p>
            </div>
          </div>

          {/* 면접 준비 */}
          <div className="card-tap snap-start shrink-0 w-[160px] flex flex-col justify-between rounded-[18px] bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.07)]">
            <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-jk-bg-blue">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M2.5 4.5A2 2 0 014.5 2.5h11A2 2 0 0117.5 4.5v7.5A2 2 0 0115.5 14H11l-3.5 3.5V14H4.5A2 2 0 012.5 12V4.5z" stroke="#1b55f6" strokeWidth="1.6" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="mt-4">
              <p className="text-[12px] font-medium leading-snug text-jk-text-muted">면접 준비<br />도와드려요</p>
              <p className="mt-1.5 text-[28px] font-bold leading-none text-jk-text-strong">
                {statsCards.interviewCount.count}
                <span className="text-base font-medium text-jk-text-muted">개</span>
              </p>
            </div>
          </div>
          {/* trailing spacer */}
          <div className="shrink-0 w-px" />
        </div>
      )}

      {/* ── 흰색 배경 섹션: 이력서 AI 분석부터 하단 끝까지 ── */}
      <div data-header-sentinel className="-mx-4 bg-white px-4 pt-6 pb-8 flex flex-col gap-7">

      {/* 이력서 AI 분석 */}
      <ResumeAiSection resumes={resumeAiAnalysis ?? []} />

      {/* 내 이력서 링크바 */}
      <ResumeLinkBar count={resumeCount ?? 0} />

      {/* 지원 현황 — 리스트 스타일 (Figma 기준) */}
      <section>
        <SectionHeader
          title="지원 현황"
          subtitle={totalApplications > 0 ? `${totalApplications}개의 지원내역이 있어요` : undefined}
        />
        {totalApplications === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-[16px] bg-white py-10 border border-jk-border">
            <span className="text-3xl">📮</span>
            <p className="text-sm font-semibold text-jk-text-strong">아직 지원한 공고가 없어요</p>
            <p className="text-xs text-jk-text-muted">아래 맞춤 공고에서 바로 지원해보세요</p>
          </div>
        ) : (
        <div className="flex flex-col gap-2.5">
          {(applicationList ?? []).map((app: any) => (
            <div
              key={app.id}
              className="card-tap rounded-[12px] bg-white border border-[#E8E9EC] overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 pt-4">
                <div className="flex items-center gap-2">
                  <p className="text-[15px] font-bold text-jk-text-strong">{app.company}</p>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                      STATUS_STYLE[app.status] ?? "bg-jk-bg-section text-jk-text-muted"
                    }`}
                  >
                    {app.status}
                  </span>
                </div>
                <p className="text-[11px] text-jk-text-muted">{app.appliedAt}</p>
              </div>

              <div className="mt-2 px-4 pb-4">
                <p className="text-sm text-jk-blue underline decoration-jk-blue/40 underline-offset-2">
                  {app.resumeName}
                </p>
                <p className="mt-0.5 text-xs text-jk-text-muted">{app.location}</p>
              </div>

              <div className="flex items-center border-t border-[#F1F2F3] px-4">
                {(app.actions as string[]).map((action: string, idx: number) => (
                  <React.Fragment key={action}>
                    {idx > 0 && <div className="w-px h-[18px] shrink-0 bg-[#F1F2F3]" />}
                    <button className="flex-1 py-3 text-[13px] font-medium text-jk-text-secondary transition-all active:opacity-60 text-center">
                      {action}
                    </button>
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
        )}
      </section>

      {/* 맞춤 공고 */}
      <section>
        <SectionHeader
          title="맞춤 공고"
          subtitle="과거 합격 패턴을 반영했어요"
          right={
            <span className="rounded-full bg-violet-50 px-2.5 py-1 text-xs font-semibold text-jk-purple">
              AI 추천
            </span>
          }
        />
        {(matchedJobs ?? []).length === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-[16px] bg-white py-10 border border-jk-border">
            <span className="text-3xl">📭</span>
            <p className="text-sm font-semibold text-jk-text-strong">현재 조건에 맞는 공고가 없어요</p>
            <p className="text-xs text-jk-text-muted">이력서를 업데이트하면 더 많은 공고를 볼 수 있어요</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {(matchedJobs ?? []).map((job: any) => (
              <JobCard key={job.id} job={job} ctaLabel="바로 지원" bordered />
            ))}
          </div>
        )}
      </section>

      {/* 합격자 인사이트 */}
      {insight && <InsightCard data={insight} bordered />}

      {/* Skill Gap */}
      <SkillGapCard skills={skillGap ?? []} userType="active" targetJob={user.jobTitle} bordered />

      {/* Career Score */}
      <CareerScoreCard data={careerScore} timeline={careerTimeline} userType="active" bordered />

      </div>{/* ── 흰색 배경 섹션 끝 ── */}
    </div>
  );
}
