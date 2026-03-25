import ResumeAiCard from "@/components/ResumeAiCard";
import Link from "next/link";

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
}

export default function ResumeAiSection({ resumes }: Props) {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-[18px] font-bold text-jk-text-strong">이력서 AI 분석</h2>
          <p className="mt-0.5 text-sm text-jk-text-muted">AI가 분석한 합격 가능성을 확인하세요</p>
        </div>
        {resumes.length > 0 && (
          <span className="rounded-full bg-jk-bg-blue px-2.5 py-1 text-[12px] font-semibold text-jk-blue">
            {resumes.length}개
          </span>
        )}
      </div>

      {resumes.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-[16px] border border-jk-border bg-white py-10 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-jk-bg-blue text-2xl">
            📄
          </div>
          <div>
            <p className="text-sm font-semibold text-jk-text-strong">이력서를 등록해보세요</p>
            <p className="mt-0.5 text-xs text-jk-text-muted">AI가 합격률과 개선 팁을 분석해드려요</p>
          </div>
          <Link
            href="/resume/new"
            className="mt-1 rounded-full bg-jk-blue px-5 py-2 text-sm font-semibold text-white active:scale-95 transition-all"
          >
            이력서 작성하기
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {resumes.map((resume) => (
            <ResumeAiCard key={resume.id} resume={resume} />
          ))}
        </div>
      )}
    </section>
  );
}
