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
  targetJob?: string; // active용: 목표 직무명
}

// 레벨 바 (active 전용)
function LevelBar({ current, required }: { current: string; required: string }) {
  const levels = ["none", "basic", "intermediate", "advanced"];
  const currentIdx = levels.indexOf(current);
  const requiredIdx = levels.indexOf(required);
  const labelMap: Record<string, string> = {
    none: "없음",
    basic: "기초",
    intermediate: "중급",
    advanced: "고급",
  };

  return (
    <div className="mt-2">
      <div className="flex gap-1">
        {levels.map((lvl, i) => (
          <div
            key={lvl}
            className={`h-1.5 flex-1 rounded-full ${
              i <= currentIdx
                ? "bg-blue-500"
                : i <= requiredIdx
                ? "bg-blue-200"
                : "bg-gray-100"
            }`}
          />
        ))}
      </div>
      <div className="mt-1 flex justify-between text-[10px] text-gray-400">
        <span>현재: {labelMap[current] ?? current}</span>
        <span>목표: {labelMap[required] ?? required}</span>
      </div>
    </div>
  );
}

export default function SkillGapCard({ skills, userType, targetJob }: Props) {
  if (!skills || skills.length === 0) return null;

  // 적극 구직자: 목표 직무 대비 부족 스킬 + 공고 수 증가
  if (userType === "active") {
    return (
      <section>
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold">스킬 갭</h2>
            {targetJob && (
              <p className="mt-0.5 text-xs text-gray-400">
                {targetJob} 지원 기준
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {skills.map((s) => (
            <div
              key={s.skill}
              className="rounded-xl border border-gray-200 bg-white p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-semibold">{s.skill}</p>
                {s.additionalJobsIfAcquired != null && (
                  <span className="shrink-0 rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-600">
                    +{s.additionalJobsIfAcquired}개 공고
                  </span>
                )}
              </div>
              {s.currentLevel && s.requiredLevel && (
                <LevelBar
                  current={s.currentLevel}
                  required={s.requiredLevel}
                />
              )}
              <p className="mt-2 text-xs text-gray-500">
                이 스킬 채우면 지원 가능 공고{" "}
                <span className="font-medium text-blue-600">
                  +{s.additionalJobsIfAcquired}개
                </span>{" "}
                늘어요
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // 신입: 배우면 공고 늘어나는 온보딩 느낌
  if (userType === "new") {
    return (
      <section>
        <h2 className="mb-3 text-base font-semibold">지금 배우면 좋은 스킬</h2>
        <div className="flex flex-col gap-3">
          {skills.map((s) => (
            <div
              key={s.skill}
              className="rounded-xl border border-gray-200 bg-white p-4"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">{s.skill}</p>
                {s.additionalJobsIfAcquired != null && (
                  <span className="text-xs font-medium text-blue-600">
                    +{s.additionalJobsIfAcquired}개 공고
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs text-gray-500">
                이 스킬 채우면 지원 가능 공고{" "}
                {s.additionalJobsIfAcquired}개 더 생겨요
              </p>
              {s.learningResource && (
                <p className="mt-2 text-xs text-gray-400">
                  참고: {s.learningResource}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  }

  // 잠재 구직자: 연봉 임팩트 강조
  return (
    <section>
      <h2 className="mb-3 text-base font-semibold">연봉 올리는 스킬</h2>
      <div className="flex flex-col gap-3">
        {skills.map((s) => (
          <div
            key={s.skill}
            className="rounded-xl border border-gray-200 bg-white p-4"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">{s.skill}</p>
              {s.salaryImpact && (
                <span className="text-sm font-bold text-green-600">
                  {s.salaryImpact}
                </span>
              )}
            </div>
            {s.salaryImpact && (
              <p className="mt-1 text-xs text-gray-500">
                이 스킬 있으면 연봉 {s.salaryImpact} 올릴 수 있어요
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
