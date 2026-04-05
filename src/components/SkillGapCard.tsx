"use client";

interface SkillItem {
  skill: string;
  currentLevel?: string;
  requiredLevel?: string;
  additionalJobsIfAcquired?: number;
  salaryImpact?: string;
  learningResource?: string;
}

interface Props {
  skills: SkillItem[];
  userType: "active" | "new" | "passive";
  targetJob?: string;
  bordered?: boolean;
}

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-3">
      <h2 className="text-[18px] font-bold text-jk-text-strong">{title}</h2>
      {subtitle && <p className="mt-0.5 text-xs text-jk-text-muted">{subtitle}</p>}
    </div>
  );
}

function LevelBar({ current, required }: { current: string; required: string }) {
  const levels = ["none", "basic", "intermediate", "advanced"];
  const currentIdx = levels.indexOf(current);
  const requiredIdx = levels.indexOf(required);
  const labelMap: Record<string, string> = { none: "없음", basic: "기초", intermediate: "중급", advanced: "고급" };

  return (
    <div className="mt-2.5">
      <div className="flex gap-1.5">
        {levels.map((lvl, i) => (
          <div key={lvl} className={`h-1.5 flex-1 rounded-full ${
            i <= currentIdx ? "bg-jk-blue" : i <= requiredIdx ? "bg-jk-blue-light" : "bg-jk-bg-section"
          }`} />
        ))}
      </div>
      <div className="mt-1.5 flex justify-between text-[10px] text-jk-text-muted">
        <span>현재: <span className="font-semibold text-jk-text-secondary">{labelMap[current] ?? current}</span></span>
        <span>목표: <span className="font-semibold text-jk-blue">{labelMap[required] ?? required}</span></span>
      </div>
    </div>
  );
}

export default function SkillGapCard({ skills, userType, targetJob, bordered }: Props) {
  if (!skills || skills.length === 0) return null;

  const cardClass = `rounded-lg bg-white p-4 ${bordered ? "border border-jk-card-stroke" : "shadow-card"}`;

  if (userType === "active") {
    return (
      <section>
        <SectionHeader
          title="스킬 갭"
          subtitle={targetJob ? `${targetJob} 지원 기준` : undefined}
        />
        <div className="flex flex-col gap-3">
          {skills.map((s) => (
            <div key={s.skill} className={cardClass}>
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-bold text-jk-text-strong">{s.skill}</p>
                {s.additionalJobsIfAcquired != null && (
                  <span className="shrink-0 rounded-full bg-jk-bg-blue px-2.5 py-1 text-xs font-semibold text-jk-blue">
                    +{s.additionalJobsIfAcquired}개 공고
                  </span>
                )}
              </div>
              {s.currentLevel && s.requiredLevel && (
                <LevelBar current={s.currentLevel} required={s.requiredLevel} />
              )}
              <p className="mt-2.5 text-xs text-jk-text-muted">
                이 스킬 채우면{" "}
                <span className="font-bold text-jk-blue">+{s.additionalJobsIfAcquired}개</span> 공고에 지원 가능해져요
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (userType === "new") {
    return (
      <section>
        <SectionHeader title="지금 배우면 좋은 스킬" />
        <div className="flex flex-col gap-3">
          {skills.map((s) => (
            <div key={s.skill} className={cardClass}>
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-bold text-jk-text-strong">{s.skill}</p>
                {s.additionalJobsIfAcquired != null && (
                  <span className="rounded-full bg-jk-bg-blue px-2.5 py-1 text-xs font-semibold text-jk-blue">
                    +{s.additionalJobsIfAcquired}개 공고
                  </span>
                )}
              </div>
              <p className="mt-1.5 text-xs text-jk-text-muted">
                이 스킬 채우면 공고 <span className="font-bold text-jk-blue">{s.additionalJobsIfAcquired}개</span> 더 생겨요
              </p>
              {s.learningResource && (
                <p className="mt-2 rounded-sm bg-jk-bg px-2.5 py-1.5 text-xs text-jk-text-muted">📚 {s.learningResource}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  }

  // passive
  return (
    <section>
      <SectionHeader title="연봉 올리는 스킬" />
      <div className="flex flex-col gap-3">
        {skills.map((s) => (
          <div key={s.skill} className={cardClass}>
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-bold text-jk-text-strong">{s.skill}</p>
              {s.salaryImpact && (
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-sm font-bold text-emerald-600">{s.salaryImpact}</span>
              )}
            </div>
            {s.salaryImpact && (
              <p className="mt-1.5 text-xs text-jk-text-muted">
                이 스킬 있으면 연봉 <span className="font-bold text-emerald-600">{s.salaryImpact}</span> 올릴 수 있어요
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
