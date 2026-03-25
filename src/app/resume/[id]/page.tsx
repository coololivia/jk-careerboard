"use client";

import { use, useState, useRef } from "react";
import Link from "next/link";
import resumesData from "../../../../mock-data/resumes.json";

// ─── Types ───────────────────────────────────────────────────────────────────

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

interface FormState {
  resumeName: string;
  resumeType: "신입" | "경력";
  basicInfo: BasicInfo;
  coreValues: string[];
  career: CareerEntry[];
  education: EducationEntry[];
  skills: string[];
  awards: string[];
  portfolio: string[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function emptyProject(): Project {
  return { name: "", period: "", description: "", roles: [""], achievements: [""], competencies: [""] };
}

function emptyCareer(): CareerEntry {
  return { company: "", period: "", position: "", industry: "", companySize: "", projects: [] };
}

function emptyEducation(): EducationEntry {
  return { school: "", major: "", degree: "", period: "" };
}

function buildInitialState(id: string): FormState {
  if (id !== "new") {
    const found = (resumesData as any[]).find((r) => r.id === id);
    if (found) {
      return {
        resumeName: found.name ?? "",
        resumeType: found.type ?? "신입",
        basicInfo: { ...found.basicInfo },
        coreValues: [...(found.coreValues ?? [])],
        career: (found.career ?? []).map((c: any) => ({
          company: c.company ?? "",
          period: c.period ?? "",
          position: c.position ?? "",
          industry: c.industry ?? "",
          companySize: c.companySize ?? "",
          projects: (c.projects ?? []).map((p: any) => ({
            name: p.name ?? "",
            period: p.period ?? "",
            description: p.description ?? "",
            roles: [...(p.roles ?? [""])],
            achievements: [...(p.achievements ?? [""])],
            competencies: [...(p.competencies ?? [""])],
          })),
        })),
        education: (found.education ?? []).map((e: any) => ({ ...e })),
        skills: [...(found.skills ?? [])],
        awards: [...(found.awards ?? [])],
        portfolio: [...(found.portfolio ?? [])],
      };
    }
  }
  return {
    resumeName: "",
    resumeType: "신입",
    basicInfo: { name: "", phone: "", email: "", birthdate: "", address: "", desiredJob: "", introduction: "" },
    coreValues: [],
    career: [],
    education: [],
    skills: [],
    awards: [],
    portfolio: [],
  };
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionHeader({ title, optional }: { title: string; optional?: boolean }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <h2 className="text-[18px] font-bold text-jk-text-strong">{title}</h2>
      {optional && (
        <span className="rounded-full bg-jk-bg-section px-2 py-0.5 text-[11px] font-medium text-jk-text-muted">
          선택
        </span>
      )}
    </div>
  );
}

const inputCls =
  "w-full rounded-[10px] border border-jk-border px-4 py-3 text-[15px] text-jk-text-strong placeholder:text-jk-text-placeholder focus:border-jk-blue focus:outline-none bg-white transition-colors";

function FieldLabel({ label, required, optional }: { label: string; required?: boolean; optional?: boolean }) {
  return (
    <label className="mb-1.5 flex items-center gap-1 text-[13px] font-semibold text-jk-text-secondary">
      {label}
      {required && <span className="text-rose-500">*</span>}
      {optional && (
        <span className="ml-0.5 rounded-full bg-jk-bg-section px-1.5 py-0.5 text-[10px] font-medium text-jk-text-muted">
          선택
        </span>
      )}
    </label>
  );
}

function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-2 flex items-center gap-1.5 rounded-[10px] border border-dashed border-jk-border px-4 py-3 text-[14px] font-medium text-jk-text-muted w-full justify-center hover:border-jk-blue hover:text-jk-blue transition-colors active:scale-[0.98]"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
      {label}
    </button>
  );
}

// bullet list input (roles / achievements / competencies)
function BulletListInput({
  items,
  placeholder,
  onChange,
}: {
  items: string[];
  placeholder: string;
  onChange: (items: string[]) => void;
}) {
  const update = (i: number, val: string) => {
    const next = [...items];
    next[i] = val;
    onChange(next);
  };
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  const add = () => onChange([...items, ""]);

  return (
    <div className="flex flex-col gap-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-jk-text-muted shrink-0 mt-0.5" />
          <input
            type="text"
            value={item}
            placeholder={placeholder}
            onChange={(e) => update(i, e.target.value)}
            className="flex-1 rounded-[8px] border border-jk-border px-3 py-2 text-[14px] text-jk-text-strong placeholder:text-jk-text-placeholder focus:border-jk-blue focus:outline-none bg-white transition-colors"
          />
          {items.length > 1 && (
            <button type="button" onClick={() => remove(i)} className="text-jk-text-muted hover:text-rose-500 transition-colors active:scale-95">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="flex items-center gap-1 text-[12px] text-jk-blue font-medium hover:underline active:scale-95 w-fit"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
        항목 추가
      </button>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ResumeFormPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const isNew = id === "new";

  const [form, setForm] = useState<FormState>(() => buildInitialState(id));
  const [skillInput, setSkillInput] = useState("");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved">("idle");
  const skillInputRef = useRef<HTMLInputElement>(null);

  // ── Patch helpers ────────────────────────────────────────────────────────

  const patchBasic = (key: keyof BasicInfo, val: string) =>
    setForm((f) => ({ ...f, basicInfo: { ...f.basicInfo, [key]: val } }));

  const patchCareer = (ci: number, key: keyof CareerEntry, val: any) =>
    setForm((f) => {
      const career = f.career.map((c, i) => (i === ci ? { ...c, [key]: val } : c));
      return { ...f, career };
    });

  const patchProject = (ci: number, pi: number, key: keyof Project, val: any) =>
    setForm((f) => {
      const career = f.career.map((c, i) => {
        if (i !== ci) return c;
        const projects = c.projects.map((p, j) => (j === pi ? { ...p, [key]: val } : p));
        return { ...c, projects };
      });
      return { ...f, career };
    });

  const patchEducation = (ei: number, key: keyof EducationEntry, val: string) =>
    setForm((f) => {
      const education = f.education.map((e, i) => (i === ei ? { ...e, [key]: val } : e));
      return { ...f, education };
    });

  // ── Skill tag ────────────────────────────────────────────────────────────

  const addSkill = (raw: string) => {
    const tag = raw.trim().replace(/,$/, "");
    if (tag && !form.skills.includes(tag)) {
      setForm((f) => ({ ...f, skills: [...f.skills, tag] }));
    }
    setSkillInput("");
  };

  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkill(skillInput);
    } else if (e.key === "Backspace" && skillInput === "" && form.skills.length > 0) {
      setForm((f) => ({ ...f, skills: f.skills.slice(0, -1) }));
    }
  };

  const removeSkill = (skill: string) =>
    setForm((f) => ({ ...f, skills: f.skills.filter((s) => s !== skill) }));

  // ── Save ──────────────────────────────────────────────────────────────────

  const handleTempSave = () => {
    setSaveStatus("saved");
    setTimeout(() => setSaveStatus("idle"), 1500);
  };

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-jk-bg">
      {/* Sticky 헤더 */}
      <header className="sticky top-0 z-20 flex h-14 items-center bg-white border-b border-jk-border px-4">
        <Link
          href={isNew ? "/resume" : "/resume"}
          className="flex items-center gap-1 text-jk-text-strong mr-3 active:opacity-60 transition-opacity"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 4.5L7.5 10l5 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
        <h1 className="text-[17px] font-bold text-jk-text-strong">
          {isNew ? "이력서 작성" : "이력서 수정"}
        </h1>
      </header>

      {/* PDF/URL 업로드 탭바 — 신규 작성 시만 표시 */}
      {isNew && (
        <div className="bg-white border-b border-jk-border px-4">
          <div className="flex gap-4">
            <button className="flex items-center gap-1.5 border-b-2 border-jk-blue py-3 text-[14px] font-semibold text-jk-blue">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 12V3.5A1.5 1.5 0 0 1 4.5 2h5L12 4.5V12a1.5 1.5 0 0 1-1.5 1.5h-6A1.5 1.5 0 0 1 3 12z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
                <path d="M9.5 2v3h2.5" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
              </svg>
              PDF 업로드
            </button>
            <button className="flex items-center gap-1.5 border-b-2 border-transparent py-3 text-[14px] font-medium text-jk-text-muted">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6.5 9.5a3.5 3.5 0 0 0 5 0l1.5-1.5a3.536 3.536 0 0 0-5-5L7 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                <path d="M9.5 6.5a3.5 3.5 0 0 0-5 0L3 8a3.536 3.536 0 0 0 5 5L9 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              URL 업로드
            </button>
            <button className="ml-auto flex items-center text-jk-text-muted py-3 active:scale-95 transition-transform">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.3"/>
                <path d="M9 8v5M9 6.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* 본문 폼 */}
      <div className="px-4 pb-32">

        {/* 이력서 이름 + 유형 */}
        <div className="mt-6">
          <SectionHeader title="이력서 정보" />
          <div className="flex flex-col gap-4">
            <div>
              <FieldLabel label="이력서 이름" required />
              <input
                type="text"
                value={form.resumeName}
                onChange={(e) => setForm((f) => ({ ...f, resumeName: e.target.value }))}
                placeholder="예: 경력 개발자_v1"
                className={inputCls}
              />
            </div>
            <div>
              <FieldLabel label="유형" required />
              <div className="flex gap-2">
                {(["신입", "경력"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, resumeType: t }))}
                    className={`flex-1 rounded-[10px] border py-2.5 text-[14px] font-semibold transition-colors active:scale-[0.98] ${
                      form.resumeType === t
                        ? "border-jk-blue bg-jk-bg-blue text-jk-blue"
                        : "border-jk-border bg-white text-jk-text-muted"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 기본 정보 */}
        <div className="mt-6">
          <SectionHeader title="기본 정보" />
          <div className="flex flex-col gap-4">
            <div>
              <FieldLabel label="이름" required />
              <input type="text" value={form.basicInfo.name} onChange={(e) => patchBasic("name", e.target.value)} placeholder="홍길동" className={inputCls} />
            </div>
            <div>
              <FieldLabel label="연락처" required />
              <input type="tel" value={form.basicInfo.phone} onChange={(e) => patchBasic("phone", e.target.value)} placeholder="010-0000-0000" className={inputCls} />
            </div>
            <div>
              <FieldLabel label="이메일" required />
              <input type="email" value={form.basicInfo.email} onChange={(e) => patchBasic("email", e.target.value)} placeholder="example@email.com" className={inputCls} />
            </div>
            <div>
              <FieldLabel label="생년월일" optional />
              <input type="text" value={form.basicInfo.birthdate} onChange={(e) => patchBasic("birthdate", e.target.value)} placeholder="YYYY.MM.DD" className={inputCls} />
            </div>
            <div>
              <FieldLabel label="주소" optional />
              <input type="text" value={form.basicInfo.address} onChange={(e) => patchBasic("address", e.target.value)} placeholder="서울시 강남구" className={inputCls} />
            </div>
            <div>
              <FieldLabel label="희망직무" optional />
              <input type="text" value={form.basicInfo.desiredJob} onChange={(e) => patchBasic("desiredJob", e.target.value)} placeholder="예: 프론트엔드 개발자" className={inputCls} />
            </div>
            <div>
              <FieldLabel label="자기소개" optional />
              <div className="relative">
                <textarea
                  value={form.basicInfo.introduction}
                  onChange={(e) => patchBasic("introduction", e.target.value)}
                  placeholder="간략한 자기소개를 작성해 주세요"
                  rows={4}
                  className={`${inputCls} resize-none pb-8`}
                />
                <div className="absolute bottom-3 left-0 right-0 flex items-center justify-between px-4">
                  <span className="text-[11px] text-jk-text-muted">{form.basicInfo.introduction.length}자</span>
                  <button
                    type="button"
                    className="flex items-center gap-1 rounded-full bg-jk-bg-blue px-2.5 py-1 text-[11px] font-semibold text-jk-blue active:scale-95 transition-transform"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6a4 4 0 1 1 4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                      <path d="M2 8V6h2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    + AI 검토
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Value */}
        <div className="mt-6">
          <SectionHeader title="Core Value" optional />
          <div className="flex flex-col gap-2">
            {form.coreValues.map((cv, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-jk-bg-blue">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 7l3 3 6-5.5" stroke="#1b55f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <input
                  type="text"
                  value={cv}
                  onChange={(e) => {
                    const next = [...form.coreValues];
                    next[i] = e.target.value;
                    setForm((f) => ({ ...f, coreValues: next }));
                  }}
                  placeholder="예: 사용자 중심 사고"
                  className={inputCls}
                />
                <button
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, coreValues: f.coreValues.filter((_, idx) => idx !== i) }))}
                  className="text-jk-text-muted hover:text-rose-500 transition-colors shrink-0 active:scale-95"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
          {form.coreValues.length < 4 && (
            <AddButton
              label="+ Core Value 추가"
              onClick={() => setForm((f) => ({ ...f, coreValues: [...f.coreValues, ""] }))}
            />
          )}
        </div>

        {/* 경력 */}
        <div className="mt-6">
          <SectionHeader title="경력" optional />
          <div className="flex flex-col gap-5">
            {form.career.map((c, ci) => (
              <div key={ci} className="rounded-[12px] border border-jk-border bg-white p-4 flex flex-col gap-4">
                {/* 헤더 */}
                <div className="flex items-center justify-between">
                  <p className="text-[14px] font-bold text-jk-text-strong">
                    {c.company || `경력 ${ci + 1}`}
                  </p>
                  <button
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, career: f.career.filter((_, i) => i !== ci) }))}
                    className="text-[12px] text-jk-text-muted hover:text-rose-500 transition-colors active:scale-95"
                  >
                    삭제
                  </button>
                </div>

                <div>
                  <FieldLabel label="회사명" required />
                  <input type="text" value={c.company} onChange={(e) => patchCareer(ci, "company", e.target.value)} placeholder="(주)회사명" className={inputCls} />
                </div>
                <div>
                  <FieldLabel label="재직기간" required />
                  <input type="text" value={c.period} onChange={(e) => patchCareer(ci, "period", e.target.value)} placeholder="2020.03 ~ 2024.08" className={inputCls} />
                </div>
                <div>
                  <FieldLabel label="직책" required />
                  <input type="text" value={c.position} onChange={(e) => patchCareer(ci, "position", e.target.value)} placeholder="예: 시니어 개발자" className={inputCls} />
                </div>
                <div>
                  <FieldLabel label="업종" optional />
                  <input type="text" value={c.industry} onChange={(e) => patchCareer(ci, "industry", e.target.value)} placeholder="예: IT/인터넷" className={inputCls} />
                </div>
                <div>
                  <FieldLabel label="규모" optional />
                  <input type="text" value={c.companySize} onChange={(e) => patchCareer(ci, "companySize", e.target.value)} placeholder="예: 대기업(1000명 이상)" className={inputCls} />
                </div>

                {/* 프로젝트 */}
                {c.projects.map((p, pi) => (
                  <div key={pi} className="rounded-[10px] bg-jk-bg-section p-3 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <p className="text-[13px] font-bold text-jk-text-strong">
                        프로젝트 {pi + 1}{p.name ? `: ${p.name}` : ""}
                      </p>
                      <button
                        type="button"
                        onClick={() => patchCareer(ci, "projects", c.projects.filter((_, j) => j !== pi))}
                        className="text-[11px] text-jk-text-muted hover:text-rose-500 transition-colors active:scale-95"
                      >
                        삭제
                      </button>
                    </div>
                    <div>
                      <FieldLabel label="프로젝트명" />
                      <input type="text" value={p.name} onChange={(e) => patchProject(ci, pi, "name", e.target.value)} placeholder="프로젝트 이름" className={inputCls} />
                    </div>
                    <div>
                      <FieldLabel label="기간" optional />
                      <input type="text" value={p.period} onChange={(e) => patchProject(ci, pi, "period", e.target.value)} placeholder="2023.06 ~ 2024.02" className={inputCls} />
                    </div>
                    <div>
                      <FieldLabel label="설명" optional />
                      <textarea
                        value={p.description}
                        onChange={(e) => patchProject(ci, pi, "description", e.target.value)}
                        placeholder="프로젝트에 대한 간략한 설명"
                        rows={2}
                        className={`${inputCls} resize-none`}
                      />
                    </div>
                    <div>
                      <FieldLabel label="주요 역할" optional />
                      <BulletListInput
                        items={p.roles.length > 0 ? p.roles : [""]}
                        placeholder="담당 역할을 입력하세요"
                        onChange={(val) => patchProject(ci, pi, "roles", val)}
                      />
                    </div>
                    <div>
                      <FieldLabel label="핵심 성과" optional />
                      <BulletListInput
                        items={p.achievements.length > 0 ? p.achievements : [""]}
                        placeholder="수치와 함께 성과를 작성하면 더 효과적이에요"
                        onChange={(val) => patchProject(ci, pi, "achievements", val)}
                      />
                    </div>
                    <div>
                      <FieldLabel label="핵심 역량" optional />
                      <BulletListInput
                        items={p.competencies.length > 0 ? p.competencies : [""]}
                        placeholder="예: React, TypeScript"
                        onChange={(val) => patchProject(ci, pi, "competencies", val)}
                      />
                    </div>
                  </div>
                ))}

                <AddButton
                  label="+ 프로젝트 추가"
                  onClick={() => patchCareer(ci, "projects", [...c.projects, emptyProject()])}
                />
              </div>
            ))}
          </div>
          <AddButton
            label="+ 경력 추가"
            onClick={() => setForm((f) => ({ ...f, career: [...f.career, emptyCareer()] }))}
          />
        </div>

        {/* 학력 */}
        <div className="mt-6">
          <SectionHeader title="학력" optional />
          <div className="flex flex-col gap-4">
            {form.education.map((e, ei) => (
              <div key={ei} className="rounded-[12px] border border-jk-border bg-white p-4 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <p className="text-[14px] font-bold text-jk-text-strong">
                    {e.school || `학력 ${ei + 1}`}
                  </p>
                  <button
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, education: f.education.filter((_, i) => i !== ei) }))}
                    className="text-[12px] text-jk-text-muted hover:text-rose-500 transition-colors active:scale-95"
                  >
                    삭제
                  </button>
                </div>
                <div>
                  <FieldLabel label="학교명" />
                  <input type="text" value={e.school} onChange={(ev) => patchEducation(ei, "school", ev.target.value)} placeholder="한국대학교" className={inputCls} />
                </div>
                <div>
                  <FieldLabel label="학과·학위" />
                  <div className="flex gap-2">
                    <input type="text" value={e.major} onChange={(ev) => patchEducation(ei, "major", ev.target.value)} placeholder="컴퓨터공학과" className={`${inputCls} flex-1`} />
                    <input type="text" value={e.degree} onChange={(ev) => patchEducation(ei, "degree", ev.target.value)} placeholder="학사" className={`${inputCls} w-[80px]`} />
                  </div>
                </div>
                <div>
                  <FieldLabel label="재학기간" />
                  <input type="text" value={e.period} onChange={(ev) => patchEducation(ei, "period", ev.target.value)} placeholder="2013.03 ~ 2017.02" className={inputCls} />
                </div>
              </div>
            ))}
          </div>
          <AddButton
            label="+ 학력 추가"
            onClick={() => setForm((f) => ({ ...f, education: [...f.education, emptyEducation()] }))}
          />
        </div>

        {/* 보유기술 */}
        <div className="mt-6">
          <SectionHeader title="보유기술" optional />
          <div
            className="min-h-[52px] w-full rounded-[10px] border border-jk-border bg-white px-3 py-2.5 flex flex-wrap gap-1.5 cursor-text"
            onClick={() => skillInputRef.current?.focus()}
          >
            {form.skills.map((skill) => (
              <span
                key={skill}
                className="flex items-center gap-1 bg-jk-bg-section text-jk-text-secondary text-[13px] rounded-full px-3 py-1.5"
              >
                {skill}
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); removeSkill(skill); }}
                  className="text-jk-text-muted hover:text-rose-500 transition-colors active:scale-95"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                  </svg>
                </button>
              </span>
            ))}
            <input
              ref={skillInputRef}
              type="text"
              value={skillInput}
              onChange={(e) => {
                const val = e.target.value;
                if (val.endsWith(",")) { addSkill(val); return; }
                setSkillInput(val);
              }}
              onKeyDown={handleSkillKeyDown}
              onBlur={() => { if (skillInput.trim()) addSkill(skillInput); }}
              placeholder={form.skills.length === 0 ? "예: React, TypeScript (엔터/쉼표로 추가)" : ""}
              className="flex-1 min-w-[120px] text-[14px] text-jk-text-strong placeholder:text-jk-text-placeholder focus:outline-none bg-transparent py-1"
            />
          </div>
        </div>

        {/* 수상/자격증/기타 */}
        <div className="mt-6">
          <SectionHeader title="수상·자격증·기타" optional />
          <div className="flex flex-col gap-2">
            {form.awards.map((award, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="text"
                  value={award}
                  onChange={(e) => {
                    const next = [...form.awards];
                    next[i] = e.target.value;
                    setForm((f) => ({ ...f, awards: next }));
                  }}
                  placeholder="예: 정보처리기사 (2024)"
                  className={inputCls}
                />
                <button
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, awards: f.awards.filter((_, idx) => idx !== i) }))}
                  className="text-jk-text-muted hover:text-rose-500 transition-colors shrink-0 active:scale-95"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
          <AddButton
            label="+ 수상·자격증 추가"
            onClick={() => setForm((f) => ({ ...f, awards: [...f.awards, ""] }))}
          />
        </div>

        {/* 포트폴리오 */}
        <div className="mt-6">
          <SectionHeader title="포트폴리오 · Github · 첨부자료" optional />
          <div className="flex flex-col gap-2">
            {form.portfolio.map((url, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => {
                    const next = [...form.portfolio];
                    next[i] = e.target.value;
                    setForm((f) => ({ ...f, portfolio: next }));
                  }}
                  placeholder="https://github.com/yourname"
                  className={inputCls}
                />
                <button
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, portfolio: f.portfolio.filter((_, idx) => idx !== i) }))}
                  className="text-jk-text-muted hover:text-rose-500 transition-colors shrink-0 active:scale-95"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
          <AddButton
            label="+ URL 추가"
            onClick={() => setForm((f) => ({ ...f, portfolio: [...f.portfolio, ""] }))}
          />

          {/* 넛지 배너 */}
          <div className="mt-3 rounded-[10px] bg-jk-bg-blue p-3 flex items-center gap-2">
            <span className="text-[16px]">📎</span>
            <p className="text-[13px] text-jk-blue font-medium">
              포트폴리오를 추가하면 채용 확률이 15% 상승해요
            </p>
          </div>
        </div>

      </div>

      {/* 하단 고정 버튼바 */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white border-t border-jk-border px-4 py-4 flex gap-3 z-20">
        {/* 미리보기 버튼 — new 이력서는 숨김 */}
        {!isNew && (
          <Link
            href={`/resume/${id}/preview`}
            className="flex items-center gap-1.5 rounded-full border border-jk-border px-4 py-3 text-[14px] font-semibold text-jk-text-muted transition-all active:scale-[0.98] hover:border-jk-blue hover:text-jk-blue shrink-0"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <ellipse cx="8" cy="8" rx="7" ry="5" stroke="currentColor" strokeWidth="1.4"/>
              <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.4"/>
            </svg>
            미리보기
          </Link>
        )}
        <button
          type="button"
          onClick={handleTempSave}
          className="flex-1 rounded-full border border-jk-border py-3 text-[15px] font-semibold text-jk-text-strong transition-all active:scale-[0.98] hover:border-jk-blue hover:text-jk-blue"
        >
          {saveStatus === "saved" ? "저장됨 ✓" : "임시저장"}
        </button>
        <button
          type="button"
          className="flex-1 rounded-full bg-jk-blue py-3 text-[15px] font-semibold text-white transition-all active:scale-[0.98] hover:bg-jk-blue-hover"
        >
          작성완료
        </button>
      </div>
    </div>
  );
}
