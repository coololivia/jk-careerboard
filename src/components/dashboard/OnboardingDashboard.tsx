import { UserData } from "@/types/user";

interface Props {
  data: UserData;
}

interface OnboardingStep {
  id: string;
  label: string;
  description: string;
  completed: boolean;
  ctaLabel: string;
}

export default function OnboardingDashboard({ data }: Props) {
  const { user, onboarding, previewJobs } = data as any;

  const steps: OnboardingStep[] = onboarding?.steps ?? [];
  const completedCount: number = onboarding?.completedCount ?? 0;
  const totalCount: number = onboarding?.totalCount ?? 3;
  const estimatedMinutes: number = onboarding?.estimatedMinutes ?? 3;
  const progressPct = Math.round((completedCount / totalCount) * 100);

  const currentStepIdx = steps.findIndex((s) => !s.completed);

  return (
    <div className="animate-page flex flex-col gap-7">

      {/* 헤더 */}
      <div className="pt-1">
        <p className="text-sm text-jk-text-muted">환영해요,</p>
        <h1 className="mt-0.5 text-2xl font-bold tracking-tight text-jk-text-strong">
          {user.name}님 👋
        </h1>
        <p className="mt-1.5 text-sm text-jk-text-muted">
          내 커리어 서비스에 처음 오셨군요
        </p>
      </div>

      {/* 온보딩 진행 카드 */}
      <section className="overflow-hidden rounded-xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.07)]">

        {/* 카드 헤더 */}
        <div className="px-4 pt-4 pb-3">
          <div className="flex items-center justify-between">
            <p className="text-[15px] font-bold text-jk-text-strong">커리어 맞춤 설정</p>
            <span className="text-xs text-jk-text-muted">약 {estimatedMinutes}분 소요</span>
          </div>

          {/* 진행 바 */}
          <div className="mt-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] text-jk-text-muted">{completedCount}/{totalCount} 완료</span>
              <span className="text-[11px] font-bold text-jk-blue">{progressPct}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-jk-bg-section">
              <div
                className="h-1.5 rounded-full bg-jk-blue transition-all"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* 스텝 리스트 */}
        <div className="flex flex-col">
          {steps.map((step, i) => {
            const isActive = i === currentStepIdx;
            const isDone = step.completed;
            const isLocked = !isDone && i > currentStepIdx;

            return (
              <div
                key={step.id}
                className={`flex items-center gap-3 px-4 py-3.5 ${isLocked ? "opacity-40" : ""}`}
              >
                {/* 상태 아이콘 */}
                <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  isDone
                    ? "bg-jk-blue text-white"
                    : isActive
                    ? "border-2 border-jk-blue bg-white text-jk-blue"
                    : "border-2 border-jk-border bg-white text-jk-text-muted"
                }`}>
                  {isDone ? "✓" : i + 1}
                </div>

                {/* 텍스트 */}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold ${isDone ? "text-jk-text-muted line-through" : "text-jk-text-strong"}`}>
                    {step.label}
                  </p>
                  {isActive && (
                    <p className="mt-0.5 text-xs text-jk-text-muted leading-snug">{step.description}</p>
                  )}
                </div>

                {/* CTA */}
                {isActive && (
                  <button className="shrink-0 rounded-full bg-jk-blue px-3.5 py-1.5 text-xs font-bold text-white transition-all active:scale-95">
                    {step.ctaLabel}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 흰색 배경 섹션 ── */}
      <div data-header-sentinel className="-mx-4 bg-white px-4 pt-6 pb-8 flex flex-col gap-4">

        {/* 공고 미리보기 */}
        <div>
          <p className="text-[18px] font-bold text-jk-text-strong mb-1">
            이런 공고들이 기다리고 있어요
          </p>
          <p className="text-sm text-jk-text-muted mb-4">
            설정을 완료하면 내 조건에 맞는 공고를 볼 수 있어요
          </p>

          <div className="relative">
            {/* 흐릿한 공고 카드들 */}
            <div className="flex flex-col gap-3 select-none pointer-events-none" style={{ filter: "blur(3px)" }}>
              {(previewJobs ?? []).map((job: any, i: number) => (
                <div key={i} className="rounded-lg bg-white p-4 border border-jk-card-stroke">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-[10px] bg-jk-bg-section" />
                      <div>
                        <p className="text-xs text-jk-text-muted">{job.company}</p>
                        <p className="mt-0.5 text-[15px] font-bold text-jk-text-strong">{job.title}</p>
                      </div>
                    </div>
                    <div className="h-11 w-11 rounded-full bg-jk-bg-section" />
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-sm font-semibold text-jk-text-secondary">{job.salary}</p>
                    <div className="h-8 w-20 rounded-full bg-jk-bg-section" />
                  </div>
                </div>
              ))}
            </div>

            {/* 잠금 오버레이 */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.12)]">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="11" width="18" height="11" rx="2" stroke="#1a1a1e" strokeWidth="1.8"/>
                  <path d="M7 11V7a5 5 0 0110 0v4" stroke="#1a1a1e" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </div>
              <p className="text-sm font-bold text-jk-text-strong text-center">
                설정 완료 후 맞춤 공고를 확인해요
              </p>
              <button className="rounded-full bg-jk-blue px-5 py-2.5 text-sm font-bold text-white shadow-[0_2px_8px_rgba(27,85,246,0.3)] transition-all active:scale-95">
                지금 설정하기
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
