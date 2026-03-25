import Link from "next/link";
import { redirect } from "next/navigation";
import resumesData from "../../../../../mock-data/resumes.json";
import PrintButton from "./PrintButton";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Project {
  name: string;
  period: string;
  description: string;
  roles: string[];
  achievements: string[];
  competencies: string[];
}

interface CareerEntry {
  company: string;
  period: string;
  position: string;
  industry: string;
  companySize: string;
  projects: Project[];
}

interface EducationEntry {
  school: string;
  major: string;
  degree: string;
  period: string;
}

interface BasicInfo {
  name: string;
  phone: string;
  email: string;
  birthdate: string;
  address: string;
  desiredJob: string;
  introduction: string;
}

interface ResumeData {
  id: string;
  name: string;
  type: string;
  basicInfo: BasicInfo;
  coreValues: string[];
  career: CareerEntry[];
  education: EducationEntry[];
  skills: string[];
  awards: string[];
  portfolio: string[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** 경력 기간 합산 — "N년 M개월" 반환 */
function calcTotalCareer(career: CareerEntry[]): string {
  let totalMonths = 0;
  for (const c of career) {
    const parts = c.period.split("~").map((s) => s.trim());
    if (parts.length < 2) continue;
    const parse = (s: string) => {
      const m = s.match(/(\d{4})\.(\d{2})/);
      return m ? parseInt(m[1]) * 12 + parseInt(m[2]) : null;
    };
    const start = parse(parts[0]);
    const end = parts[1].toLowerCase() === "현재" ? null : parse(parts[1]);
    if (start == null) continue;
    const endMonths =
      end ??
      (() => {
        const now = new Date();
        return now.getFullYear() * 12 + now.getMonth() + 1;
      })();
    totalMonths += Math.max(0, endMonths - start);
  }
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  if (years === 0) return `${months}개월`;
  if (months === 0) return `${years}년`;
  return `${years}년 ${months}개월`;
}

/** 핵심 성과 문자열 내 숫자를 bold로 변환 */
function HighlightNumbers({ text }: { text: string }) {
  const parts = text.split(/(\d[\d,.]*)/) ;
  return (
    <>
      {parts.map((part, i) =>
        /^\d[\d,.]*$/.test(part) ? (
          <strong key={i} className="font-bold text-gray-900">
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

// ─── Section Row (레이블 + 콘텐츠) ────────────────────────────────────────────

function SectionRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-gray-100 py-4 flex gap-4">
      <div className="w-[80px] shrink-0 pt-0.5">
        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider leading-tight">
          {label}
        </span>
      </div>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}

// ─── Page 1: Summary ─────────────────────────────────────────────────────────

function SummaryPage({ resume }: { resume: ResumeData }) {
  const { basicInfo, coreValues, career, education, skills, awards } = resume;

  return (
    <div className="a4-page bg-white p-[40px]">
      {/* 타이틀 + 증명사진 */}
      <div className="flex items-start justify-between mb-2">
        <h1 className="text-[22px] font-bold text-gray-900 tracking-tight">
          2025 RESUME
        </h1>
        {/* 증명사진 자리 */}
        <div className="w-[60px] h-[80px] border border-gray-200 rounded-sm flex items-center justify-center shrink-0">
          <span className="text-[9px] text-gray-400 text-center leading-tight">
            증명
            <br />
            사진
          </span>
        </div>
      </div>

      {/* Info */}
      <SectionRow label="Info">
        <p className="text-[22px] font-bold text-gray-900 leading-tight mb-1">
          {basicInfo.name || "—"}
        </p>
        {basicInfo.birthdate && (
          <p className="text-[13px] text-gray-600 mb-0.5">{basicInfo.birthdate}</p>
        )}
        <p className="text-[13px] text-gray-600">
          {[basicInfo.address, basicInfo.phone, basicInfo.email]
            .filter(Boolean)
            .join(" · ")}
        </p>
        {basicInfo.desiredJob && (
          <p className="text-[12px] text-gray-400 mt-1">{basicInfo.desiredJob}</p>
        )}
      </SectionRow>

      {/* Core Value */}
      {coreValues.length > 0 && (
        <SectionRow label="Core Value">
          <ul className="flex flex-col gap-1">
            {coreValues.map((v, i) => (
              <li key={i} className="flex items-start gap-2 text-[13px] text-gray-700">
                <span className="mt-0.5 text-gray-400">✓</span>
                <span>{v}</span>
              </li>
            ))}
          </ul>
        </SectionRow>
      )}

      {/* Career Summary */}
      {career.length > 0 && (
        <SectionRow label="Career">
          <p className="text-[12px] text-gray-400 mb-2">
            총 {calcTotalCareer(career)}
          </p>
          <ul className="flex flex-col gap-1.5">
            {career.map((c, i) => (
              <li key={i} className="flex items-baseline gap-2 text-[13px]">
                <span className="text-gray-400 shrink-0 text-[11px]">{c.period}</span>
                <span className="font-semibold text-gray-800">{c.company}</span>
                {c.position && (
                  <span className="text-gray-500">· {c.position}</span>
                )}
              </li>
            ))}
          </ul>
        </SectionRow>
      )}

      {/* Education */}
      {education.length > 0 && (
        <SectionRow label="Education">
          <ul className="flex flex-col gap-1.5">
            {education.map((e, i) => (
              <li key={i} className="flex items-baseline gap-2 text-[13px]">
                <span className="font-semibold text-gray-800">{e.school}</span>
                {e.major && <span className="text-gray-500">{e.major}</span>}
                {e.degree && (
                  <span className="text-[11px] text-gray-400">{e.degree}</span>
                )}
                {e.period && (
                  <span className="text-[11px] text-gray-400 ml-auto shrink-0">
                    {e.period}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </SectionRow>
      )}

      {/* Etc. */}
      {awards.length > 0 && (
        <SectionRow label="Etc.">
          <ul className="flex flex-col gap-1">
            {awards.map((a, i) => (
              <li key={i} className="text-[13px] text-gray-700">
                {a}
              </li>
            ))}
          </ul>
        </SectionRow>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <SectionRow label="Tech.">
          <div className="flex flex-wrap gap-1.5">
            {skills.map((s) => (
              <span
                key={s}
                className="bg-gray-100 text-gray-700 text-[11px] px-2 py-0.5 rounded"
              >
                {s}
              </span>
            ))}
          </div>
        </SectionRow>
      )}
    </div>
  );
}

// ─── Page 2+: Career Detail ───────────────────────────────────────────────────

function CareerDetailPage({ careerEntry }: { careerEntry: CareerEntry }) {
  return (
    <div className="a4-page bg-white p-[40px]">
      <h2 className="text-[18px] font-bold text-gray-900 mb-1">세부 경력사항</h2>
      <div className="border-t-2 border-gray-900 pt-4 mb-6">
        <div className="flex items-baseline gap-3 flex-wrap">
          <span className="text-[12px] text-gray-400 shrink-0">
            {careerEntry.period}
          </span>
          <span className="text-[16px] font-bold text-gray-900">
            {careerEntry.company}
          </span>
          {careerEntry.industry && (
            <span className="text-[12px] text-gray-500">{careerEntry.industry}</span>
          )}
          {careerEntry.companySize && (
            <span className="text-[12px] text-gray-400">{careerEntry.companySize}</span>
          )}
        </div>
        {careerEntry.position && (
          <p className="text-[13px] text-gray-600 mt-0.5">{careerEntry.position}</p>
        )}
      </div>

      {careerEntry.projects.map((project, pi) => (
        <div key={pi} className="mb-8">
          <div className="border-t border-gray-200 pt-4">
            {/* 프로젝트 헤더 */}
            <div className="flex items-center justify-between gap-4 mb-2">
              <span className="text-[13px] font-semibold bg-gray-50 px-3 py-1.5 rounded text-gray-800">
                ▶ {project.name}
              </span>
              {project.period && (
                <span className="text-[11px] text-gray-400 shrink-0">
                  {project.period}
                </span>
              )}
            </div>

            {/* 설명 */}
            {project.description && (
              <p className="text-[12px] text-gray-600 mb-3 pl-1">
                {project.description}
              </p>
            )}

            {/* 주요 역할 */}
            {project.roles.filter(Boolean).length > 0 && (
              <div className="mb-3">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-3 mb-1.5">
                  주요 역할
                </p>
                <ul className="flex flex-col gap-1">
                  {project.roles.filter(Boolean).map((role, ri) => (
                    <li
                      key={ri}
                      className="flex items-start gap-1.5 text-[12px] text-gray-700"
                    >
                      <span className="shrink-0 mt-1 text-gray-400">·</span>
                      <span>{role}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 핵심 성과 */}
            {project.achievements.filter(Boolean).length > 0 && (
              <div className="mb-3">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-3 mb-1.5">
                  핵심 성과
                </p>
                <ul className="flex flex-col gap-1">
                  {project.achievements.filter(Boolean).map((ach, ai) => (
                    <li
                      key={ai}
                      className="flex items-start gap-1.5 text-[12px] text-gray-700"
                    >
                      <span className="shrink-0 mt-1 text-gray-400">·</span>
                      <span>
                        <HighlightNumbers text={ach} />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 핵심 역량 */}
            {project.competencies.filter(Boolean).length > 0 && (
              <div className="mb-3">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-3 mb-1.5">
                  핵심 역량
                </p>
                <ul className="flex flex-col gap-1">
                  {project.competencies.filter(Boolean).map((comp, ci) => (
                    <li
                      key={ci}
                      className="flex items-start gap-1.5 text-[12px] text-gray-700"
                    >
                      <span className="shrink-0 mt-1 text-gray-400">·</span>
                      <span>{comp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Page Component ───────────────────────────────────────────────────────────

export default async function ResumePreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (id === "new") {
    redirect("/resume");
  }

  const resume = (resumesData as ResumeData[]).find((r) => r.id === id);

  if (!resume) {
    redirect("/resume");
  }

  const hasCareer = resume.career.length > 0;

  return (
    <>
      {/* Print CSS injected inline */}
      <style>{`
        @media print {
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          .page-break { page-break-before: always; }
          @page { margin: 0; size: A4; }
          .a4-page { box-shadow: none !important; margin: 0 !important; }
          .print-wrapper { padding: 0 !important; background: white !important; }
        }
        .a4-page {
          width: 794px;
          min-height: 1123px;
          box-sizing: border-box;
        }
        @media screen {
          .a4-page {
            box-shadow: 0 4px 24px rgba(0,0,0,0.10);
          }
        }
      `}</style>

      <div className="min-h-screen bg-gray-100">
        {/* Sticky 헤더 — 화면 전용 */}
        <header className="no-print sticky top-0 z-20 flex h-14 items-center bg-white border-b border-gray-200 px-4 gap-3">
          <Link
            href="/resume"
            className="flex items-center gap-1 text-gray-700 active:opacity-60 transition-opacity"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M12.5 4.5L7.5 10l5 5.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-[14px] font-medium">뒤로</span>
          </Link>

          <h1 className="flex-1 text-center text-[17px] font-bold text-gray-900">
            미리보기
          </h1>

          <PrintButton />
        </header>

        {/* A4 용지 래퍼 */}
        <div className="print-wrapper py-8 px-4 flex flex-col items-center gap-0 overflow-x-auto">
          {/* 모바일에서 A4 용지가 너무 넓으면 scale 조정 */}
          <div
            className="origin-top"
            style={{
              transform: "scale(var(--a4-scale, 1))",
              transformOrigin: "top center",
            }}
          >
            <style>{`
              @media screen and (max-width: 860px) {
                :root { --a4-scale: 0.75; }
              }
              @media screen and (max-width: 640px) {
                :root { --a4-scale: 0.48; }
              }
            `}</style>

            {/* 페이지 1: Summary */}
            <SummaryPage resume={resume} />

            {/* 페이지 2+: 경력 세부 */}
            {hasCareer &&
              resume.career.map((c, i) => (
                <div key={i} className="page-break mt-0">
                  <CareerDetailPage careerEntry={c} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
