import ResumeAiCard from "@/components/ResumeAiCard";

interface ResumeAiData {
  id: string;
  name: string;
  type: string;
  createdLabel: string;
  completeness: number;
  passRate: number;
  tip: string;
}

interface Props {
  resumes: ResumeAiData[];
  /** Active/Passive: true (편집+지원) | New: false (편집만) */
  showApplyButton?: boolean;
}

export default function ResumeAiSection({ resumes, showApplyButton = true }: Props) {
  if (!resumes || resumes.length === 0) return null;

  return (
    <section>
      <div className="mb-3">
        <h2 className="text-[18px] font-bold text-jk-text-strong">이력서 AI 분석</h2>
        <p className="mt-0.5 text-sm text-jk-text-muted">AI가 분석한 합격 가능성과 함께 확인하세요</p>
      </div>
      <div className="flex flex-col gap-3">
        {resumes.map((resume) => (
          <ResumeAiCard
            key={resume.id}
            resume={resume}
            showApplyButton={showApplyButton}
          />
        ))}
      </div>
    </section>
  );
}
