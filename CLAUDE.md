# JK CareerBoard — PRD & Design Reference

## 프로젝트 개요
잡코리아 "내 커리어" 탭의 모바일 대시보드. 사용자 행동 패턴에 따라 5가지 유형 대시보드를 제공하는 개인화 커리어 관리 화면. CV 이력서 관리/작성/PDF 출력 포함.

- **Framework**: Next.js 15 App Router + TypeScript
- **Styling**: Tailwind CSS v4 (`@import "tailwindcss"`, `@theme {}`)
- **Design System**: JAMS 2.1 (Figma key: `mrgHPV0VxWmqxV4C8gABgv`)
- **Reference Figma**: `rLV3wjzT7xYPTyJIck3tna` / node `1:5713` "JK 내커리어"
- **Viewport**: max-width 390px (모바일 전용)

## 라우트 구조

```
src/app/
├── (dashboard)/          # 앱 쉘 포함 (DevTypeSwitcher + StickyHeader + TabBar)
│   ├── layout.tsx
│   └── page.tsx          # 대시보드 (/)
└── resume/               # 독립 레이아웃 (앱 쉘 없음)
    ├── page.tsx           # 이력서 관리 (/resume)
    └── [id]/
        ├── page.tsx       # 이력서 작성/수정 (/resume/new, /resume/:id)
        └── preview/
            └── page.tsx   # PDF 미리보기/출력 (/resume/:id/preview)
```

---

## 디자인 토큰 (globals.css @theme)

### 컬러

| 토큰 | 값 | 용도 |
|------|-----|------|
| `--color-jk-blue` | `#1b55f6` | Primary action, active state |
| `--color-jk-blue-hover` | `#083ccc` | Hover/pressed, FAB (+) 버튼 |
| `--color-jk-blue-light` | `#e1e7fa` | Light blue bg |
| `--color-jk-bg` | `#f3f4f5` | 앱 배경 |
| `--color-jk-bg-blue` | `#f0f2fa` | 파란 계열 섹션 bg, AI 팁 배경 |
| `--color-jk-bg-section` | `#f1f2f3` | 섹션 내부 bg |
| `--color-jk-text-strong` | `#1a1a1e` | 제목, 강조 텍스트 |
| `--color-jk-text-secondary` | `#3e434b` | 본문 |
| `--color-jk-text-muted` | `#768091` | 보조 텍스트 |
| `--color-jk-text-tertiary` | `#575f6c` | 태그 텍스트 등 |
| `--color-jk-text-disabled` | `#afb5be` | 비활성 버튼 텍스트 (수정/보기 등) |
| `--color-jk-purple` | `#8b5cf6` | 합격패턴 배지 |
| `--color-jk-border` | `#d5d8dc` | 일반 구분선, 테두리 |
| `--color-jk-card-stroke` | `#e8e9ec` | 카드 외곽 테두리 |
| `--color-jk-divider` | `#f1f2f3` | 카드 내부 구분선 (가로/세로) |

### 보더 라디우스

| 토큰 | 값 | 용도 |
|------|-----|------|
| `--radius-xs` | `4px` | 소형 배지 |
| `--radius-sm` | `8px` | 액션 버튼 (수정/보기/재지원) |
| `--radius-md` | `12px` | 일반 카드 (ResumeAiCard, 지원현황) |
| `--radius-lg` | `16px` | 주요 카드 (CareerScore, Insight 등) |
| `--radius-xl` | `18px` | Stats 스와이프 카드 |
| `--radius-full` | `32px` | 알약형 버튼, 태그 pill |

### 쉐도우

| 용도 | 값 |
|------|-----|
| Stats 카드 | `0 2px 12px rgba(0,0,0,0.07)` |
| 내 이력서 링크바 (pink glow) | `0 0 10px 0 rgba(255,135,194,0.30)` |
| 내 이력서 링크바 (border gradient) | `linear-gradient(90deg, #DEE0FFCC 0%, #6D79FFCC 17%, #BF47FFCC 53%, #FF9334CC 78%, #FFDFC2CC 100%)` |

---

## 앱 쉘 (layout.tsx)

### DEV 타입 스위처 (최상단)
- 다크 바 (`bg-[#1a1a1e]`) — UI 화면 아님, 개발 전환 전용
- 적극 / 신입 / 잠재 / 휴면 탭
- 휴면 선택 시 하단에 **단기(<90일) / 중기(~1년) / 장기(1년+)** sub-tab 표시
- URL: `?user=active|passive|new|inactive`, 휴면 tier: `&tier=short|mid|long`

### 헤더 (sticky top) — `StickyHeader.tsx`
- 높이: 56px
- 스크롤 전: `bg-jk-bg` (회색), 스크롤 후: `bg-white` — `data-header-sentinel` 기준
- 좌: "내 커리어" (18px, font-bold, #0c0c0e)
- 우: 검색(🔍) / 알림(🔔) / 햄버거(≡) 아이콘 버튼 (22px)

### 흰색 BG 섹션 패턴 (공통)
모든 대시보드에서 상단 일부는 `bg-jk-bg`, 중간 이후부터 edge-to-edge 흰색 전환:
```tsx
<div data-header-sentinel className="-mx-4 bg-white px-4 pt-6 pb-8 flex flex-col gap-7">
```
- 이 구간의 카드는 shadow 대신 `border border-jk-border` 사용
- `data-header-sentinel`이 헤더(56px)에 닿으면 헤더 bg가 white로 전환

### 하단 탭바 (fixed bottom)
Figma node `1:6271` 기준. 5탭 순서 고정:

| 탭 | 아이콘 | active |
|----|--------|--------|
| 홈 | house outline | - |
| JOB 찾기 | target compass | - |
| 내 커리어 | rocket | ✅ |
| 취업 인사이트 | bar chart | - |
| MY | person | - |

Active 색: `#1b55f6`, Inactive 색: `#768091` / 탭 높이: 60px + iOS home indicator 16px

---

## 유저 타입별 대시보드

### 공통 URL 파라미터
`?user=active|passive|new|inactive|onboarding`
`src/app/(dashboard)/page.tsx` → `src/components/dashboard/{Type}Dashboard.tsx`

---

## 1. 적극 사용자 (ActiveDashboard)

> Figma node `1:5713` 기준

### 화면 구조 (위→아래)

#### 1-1. 서브타이틀
```
지금 {N}개 공고에 지원 중이에요
```
(인사말 없음 — 서비스 탭 진입점이므로 랜딩처럼 인사할 필요 없음)

#### 1-2. Stats Cards — 가로 스와이프
- 컨테이너: `-mx-4 px-4 overflow-x-auto snap-x snap-mandatory`
- 카드: `w-[160px] shrink-0 snap-start rounded-[18px] bg-white p-4 shadow`
- 아이콘(40px) 상단, 라벨+숫자 하단 배치

| 카드 | 아이콘 bg | 라벨 | 숫자 |
|------|----------|------|------|
| 이력서 합격률 | `bg-jk-bg-blue` | "내 이력서 합격률" | `{current}/{total}` |
| 서류통과 | `bg-jk-bg-section` | "서류통과 {N}개 회사" | `{count}건` |
| 면접 준비 | `bg-jk-bg-blue` | "면접 준비 도와드려요" | `{count}개` |

#### 1-3. 이력서 AI 분석 — 흰색 BG 섹션 시작
각 카드: `rounded-[16px] bg-white p-4 border border-jk-border card-tap`
- 이력서명 + `[신입/경력]` badge + 작성일
- `완성도 %` · `합격예측 %`
- 개선 팁 + `이력서 편집` / `지원` 버튼

#### 1-4. 내 이력서 링크바
- 그라데이션 테두리 pill + 우측 파란 `+` FAB
- gradient: `linear-gradient(90deg, #DEE0FFCC 0%, #6D79FFCC 17%, #BF47FFCC 53%, #FF9334CC 78%, #FFDFC2CC 100%)`
- CSS `padding-box / border-box` 기법

#### 1-5. 지원 현황 (리스트)
상태 배지: `지원완료`→blue / `진행중`→emerald / `불합격`→rose
버튼: `수정` / `보기` / `재지원`(blue) — 상태에 따라 다름
Empty state: "아직 지원한 공고가 없어요"

#### 1-6. 맞춤 공고
`<JobCard bordered />` + AI 추천 배지 / Empty state 있음

#### 1-7. 합격자 인사이트 → `<InsightCard bordered />`
#### 1-8. Skill Gap → `<SkillGapCard bordered />`
#### 1-9. Career Score → `<CareerScoreCard bordered />`

---

## 2. 신입 사용자 (NewDashboard)

### 화면 구조
1. 서브타이틀: "첫 취업까지 함께할게요"
2. **CareerScoreCard** (`userType="new"`) — 시장 포지셔닝 프레이밍
   - 현재 점수 → 완성 후 점수 progress bar
   - "지금 N개 공고 지원 가능" / "완성 후 상위 X%" 2-stat grid
3. *(흰색 BG 섹션 시작)*
4. **이력서 완성도** — 진행 바 + 미완성 항목 `추가하기` 버튼
5. **이력서 AI 분석** — 편집 버튼만 (지원 버튼 없음)
6. **내 이력서 링크바**
7. **SkillGapCard** (`userType="new"`) — 학습 리소스 포함
8. **InsightCard** (`beginner_spec`)
9. **맞춤 공고** — Empty state: "이력서를 완성하면 공고가 생겨요"

---

## 3. 잠재 사용자 (PassiveDashboard)

### 화면 구조
1. 서브타이틀: "조건 맞는 공고 나오면 바로 알려드릴게요"
2. **Push 알림 CTA** (`!pushNotificationConsent`일 때) — 흰색 카드, 카카오 알림톡
3. *(흰색 BG 섹션 시작)*
4. **이력서 AI 분석** — 편집 + 지원 버튼 (팁 줄바꿈, 버튼 우측 정렬)
5. **내 이력서 링크바**
6. **맞춤 공고** — Empty state: "조건에 맞는 공고를 찾고 있어요"
7. **CareerScoreCard** (`userType="passive"`) — 연봉 한 줄
8. **InsightCard** (`market_salary`)
9. **SkillGapCard** (`userType="passive"`) — 연봉 임팩트

---

## 4. 휴면 사용자 (InactiveDashboard)

### 3-Tier 시스템
`daysSinceLastVisit` 기준으로 자동 분기. DEV에서 `?tier=` 파라미터로 강제 전환 가능.

| Tier | 조건 | 시간 표시 | 특징 |
|------|------|-----------|------|
| `short` | < 90일 | "{N}일 만에 돌아왔네요" | 스크랩 마감 임박 표시 |
| `mid` | 90~364일 | "{N}개월 만에 돌아오셨네요" | 이력서 링크바에 "업데이트 필요" 뱃지 |
| `long` | 365일+ | "{N}년 만에 돌아오셨네요" | 스크랩 마감 임박 숨김, 공고 타이틀 변경 |

mock 데이터: `reEngagementByTier.short|mid|long` 각각 headline/highlights/ctaMessage

### 화면 구조
1. 서브타이틀: tier별 시간 문구 (예: "45일 만에 돌아왔네요")
2. **Re-engagement 카드** — 흰색 카드, tier별 하이라이트 3개 + 파란 CTA 버튼
3. *(흰색 BG 섹션 시작)*
4. **내 이력서 링크바** — mid/long 시 "업데이트 필요" 뱃지
5. **스크랩 마감 임박** (short/mid만) — 흰색 카드, rose border
6. **맞춤 공고** — short/mid: "새로 올라온 맞춤 공고" / long: "요즘 이런 공고들이 있어요"

---

## 공통 컴포넌트

### JobCard
- 기본: `rounded-[16px] bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.07)]`
- `bordered` prop: shadow → `border border-jk-border`
- CompanyAvatar: 회사명 이니셜, 7색 팔레트 (해시 기반)
- Match score 도넛 링 (점수별 색상: ≥85 blue / ≥70 purple / else muted)
- `합격패턴` 태그: 항상 violet (`bg-violet-50 text-jk-purple`) 특별 처리
- CTA 버튼 → 지원 바텀시트 (이력서 선택 + 완료 상태)
- `card-tap` 클래스

### CareerScoreCard
- `userType="new"`: 흰색 카드, 현재→완성 progress bar, 2-stat grid
  - 데이터: `score`, `projectedScore`, `projectedPercentile`, `currentEligibleJobs`
- `userType="passive"`: 점수 + 연봉 대비 한 줄
- `userType="active"`: 점수 + 시장 백분위 바 + 스파크라인 + 타임라인 토글
- `bordered` prop: shadow → `border border-jk-border`

### SkillGapCard
- `bordered` prop 전 변형에 정상 적용
- 섹션 헤더: `text-[18px] font-bold`
- `userType="active"`: 스킬 레벨바 + 추가 공고 수
- `userType="new"`: 레벨바 + 학습 리소스
- `userType="passive"`: 연봉 임팩트

### InsightCard
- `bordered` prop: shadow → `border border-jk-border`
- 섹션 헤더: `text-[18px] font-bold`
- `hiring_pattern`: 체크리스트 + 통계 %
- `market_salary`: 3행 비교표 (현재/시장평균/이직예상), highlight row `bg-jk-blue`
- `beginner_spec`: 신입 스펙 체크리스트

---

## 5. 온보딩 (OnboardingDashboard)

### 화면 구조
1. 서브타이틀: "내 커리어 서비스에 처음 오셨군요"
2. **온보딩 진행 카드** — progress bar + 3단계
   - 이력서 등록 / 희망조건 설정 / 알림 동의
   - 현재 활성 스텝만 설명 + CTA 표시, 이후 스텝 `opacity-40`
3. **공고 프리뷰** — `blur(3px)` + lock overlay + "지금 설정하기" CTA
   - 온보딩 완료 전 미리보기 형태로만 노출

---

---

## UX 문구 레퍼런스 (Copy Reference)

> 개발 시 이 섹션의 문구를 그대로 사용하세요. `{변수}` 형식은 런타임에 치환.

---

### 공통

| 위치 | 문구 |
|------|------|
| 헤더 타이틀 | `내 커리어` |
| 이력서 관리 헤더 | `이력서 관리` |

---

### 1. 적극 사용자 (Active)

**서브타이틀**
```
지금 {N}개 공고에 지원 중이에요
```

**Stats 카드**

| 카드 | 라벨 | 단위 |
|------|------|------|
| 이력서 합격률 | `내 이력서 합격률` | `{current}/{total}` |
| 서류통과 | `서류통과 {N}개 회사` | `{count}건` |
| 면접 준비 | `면접 준비 도와드려요` | `{count}개` |
| 커리어 스코어 | `커리어 스코어` | `{score}/100` + `상위 {N}%` |

**섹션 헤더**

| 섹션 | 헤더 | 서브텍스트 |
|------|------|------------|
| 이력서 AI 분석 | `이력서 AI 분석` | — |
| 지원 현황 | `지원 현황` | `{N}개의 지원내역이 있어요` |
| 맞춤 공고 | `맞춤 공고` | `과거 합격 패턴을 반영했어요` |

**배지**
- 맞춤 공고 헤더 우측: `AI 추천`

**지원 현황 상태 배지**

| 상태 | 텍스트 | 배경 |
|------|--------|------|
| 지원완료 | `지원완료` | `bg-jk-bg-blue text-jk-blue` |
| 진행중 | `진행중` | `bg-emerald-50 text-emerald-600` |
| 불합격 | `불합격` | `bg-rose-50 text-rose-500` |

**지원 현황 버튼 조합 (상태별)**

| 상태 | 버튼 |
|------|------|
| 지원완료 | `수정` / `보기` |
| 진행중 | `수정` / `보기` / `재지원` |
| 불합격 | `보기` / `재지원` |

**Empty states**

| 섹션 | 이모지 | 주 문구 | 보조 문구 |
|------|--------|---------|-----------|
| 지원 현황 | 📮 | `아직 지원한 공고가 없어요` | `아래 맞춤 공고에서 바로 지원해보세요` |
| 맞춤 공고 | 📭 | `현재 조건에 맞는 공고가 없어요` | `이력서를 업데이트하면 더 많은 공고를 볼 수 있어요` |

---

### 2. 신입 사용자 (New)

**서브타이틀**
```
첫 취업까지 함께할게요
```

**CareerScoreCard 문구**
```
이력서 완성하면 {projectedScore}점까지 올라가요
지금 {currentEligibleJobs}개 공고 지원 가능
완성 후 상위 {projectedPercentile}%
```

**섹션 헤더**

| 섹션 | 헤더 | 우측 |
|------|------|------|
| 이력서 완성도 | `이력서 완성도` | `{N}%` (jk-blue) |
| 이력서 AI 분석 | `이력서 AI 분석` | 이력서 `{N}개` (jk-text-muted) |
| 맞춤 공고 | `지금 지원 가능한 공고` | — |

**이력서 완성도 항목 버튼**
- `추가하기`

**Empty states**

| 섹션 | 이모지 | 주 문구 | 보조 문구 |
|------|--------|---------|-----------|
| 이력서 AI 분석 | 📄 | `이력서가 아직 없어요` | `이력서를 작성하면 AI 분석을 받을 수 있어요` |
| 이력서 AI 분석 CTA | — | `이력서 작성하기` | — |
| 맞춤 공고 | 📋 | `이력서를 완성하면 공고가 생겨요` | `희망 직무와 스킬을 추가해보세요` |

---

### 3. 잠재 사용자 (Passive)

**서브타이틀**
```
조건 맞는 공고 나오면 바로 알려드릴게요
```

**Push 알림 CTA 카드** (pushNotificationConsent = false일 때만 노출)
```
[타이틀] 딱 맞는 공고, 놓치지 마세요
[본문]   조건 맞는 공고 올라오면 카카오 알림톡으로 바로 알려드려요
[버튼]   알림 받기
```

**섹션 헤더**

| 섹션 | 헤더 | 우측 |
|------|------|------|
| 이력서 AI 분석 | `이력서 AI 분석` | 이력서 `{N}개` (jk-text-muted) |
| 맞춤 공고 | `맞춤 공고` | `{N}개` (jk-text-muted) |

**Empty states**

| 섹션 | 이모지 | 주 문구 | 보조 문구 |
|------|--------|---------|-----------|
| 맞춤 공고 | 🔍 | `조건에 맞는 공고를 찾고 있어요` | `알림 설정하면 올라오는 즉시 알려드려요` |

---

### 4. 휴면 사용자 (Inactive)

**서브타이틀 (tier별)**

| Tier | 서브타이틀 |
|------|------------|
| short (< 90일) | `{N}일 만에 돌아왔네요` |
| mid (90~364일) | `{N}개월 만에 돌아오셨네요` |
| long (365일+) | `{N}년 만에 돌아오셨네요` / `{N}년 {M}개월 만에 돌아오셨네요` |

**Re-engagement 카드 (tier별)**

**short tier**
```
[헤드라인] {name}님이 없는 사이 바뀐 것들
[하이라이트]
  - 💼 {직군} 신규 공고 {N}개 올라왔어요
  - 📈 {직군} 평균 연봉이 지난달보다 {N}% 올랐어요
  - ⏰ 스크랩한 공고 {N}개가 마감 임박이에요
[CTA 버튼] 지금 공고 보러 가기
```

**mid tier**
```
[헤드라인] 시장이 꽤 바뀌었어요
[하이라이트]
  - 📈 {직군} 평균 연봉이 이 기간 동안 {N}% 올랐어요
  - 💼 AI 관련 {직군} 공고가 2배 이상 늘었어요
  - 📝 이력서를 마지막으로 수정한 지 오래됐어요. 업데이트 해볼까요?
[CTA 버튼] 이력서 업데이트하고 공고 보기
```

**long tier**
```
[헤드라인] 오랜만이에요. 많이 바뀌었을 거예요
[하이라이트]
  - 🌐 AI·클라우드 중심으로 {직군} 시장 구조가 크게 바뀌었어요
  - 📈 {직군} 평균 연봉이 그동안 {N}% 올랐어요
  - 📝 이력서가 많이 오래됐어요. 새로 작성하면 맞춤 공고를 받을 수 있어요
[CTA 버튼] 이력서부터 다시 시작하기
```

**섹션 헤더**

| 섹션 | short/mid | long |
|------|-----------|------|
| 스크랩 마감 임박 | `⚠ 스크랩 공고 마감 임박` | (미노출) |
| 맞춤 공고 | `새로 올라온 맞춤 공고` | `요즘 이런 공고들이 있어요` |

**스크랩 마감 임박 카드**
- 마감일: `마감: {deadline}`
- 버튼: `지금 지원하기`

**내 이력서 링크바 배지**
- mid/long 시: `업데이트 필요` 배지 표시

---

### 5. 온보딩 (Onboarding)

**서브타이틀**
```
내 커리어 서비스에 처음 오셨군요
```

**온보딩 진행 카드**
```
[헤더 타이틀] 커리어 맞춤 설정
[우측]        약 {N}분 소요
[진행 표시]   {완료}/{전체} 완료  ·  {N}%
```

**온보딩 스텝 (3단계)**

| 스텝 | 라벨 | 설명 | CTA |
|------|------|------|-----|
| 1 | `이력서 등록` | `보유한 이력서를 올리거나 새로 작성해요` | `시작하기` |
| 2 | `희망 직무 · 조건 설정` | `직무, 연봉, 근무지를 설정하면 맞춤 공고를 받아요` | `설정하기` |
| 3 | `맞춤 알림 받기` | `조건에 맞는 공고가 올라오면 바로 알려드려요` | `알림 켜기` |

**공고 프리뷰 잠금 오버레이**
```
[주 문구] 설정 완료 후 맞춤 공고를 확인해요
[버튼]    지금 설정하기
```

---

### 공통 컴포넌트 문구

#### ResumeAiCard

| 위치 | 문구 |
|------|------|
| 완성도 라벨 | `완성도` |
| 합격예측 라벨 | `합격예측` |
| 편집 버튼 | `이력서 편집` |
| 경력 배지 | `경력` |
| 신입 배지 | `신입` |

**Empty state (이력서 없을 때)**
```
이모지: 📄
주 문구: 이력서가 아직 없어요
보조 문구: 이력서를 작성하면 AI 분석을 받을 수 있어요
버튼: 이력서 작성하기
```

#### ResumeLinkBar
```
[좌측 텍스트] 내 이력서 {N}개
[버튼]        +  (새 이력서 작성, 링크: /resume/new)
```

업데이트 배지 (mid/long inactive 시):
```
업데이트 필요
```

#### JobCard

**CTA 버튼 (대시보드별)**

| 대시보드 | CTA 라벨 |
|---------|----------|
| Active | `바로 지원` |
| Passive | `원클릭 지원` |
| New | `지원하기` |
| Inactive | `바로 지원` |

**태그 특별 처리**
- `합격패턴` → 항상 violet 스타일 (`bg-violet-50 text-jk-purple`)

**지원 바텀시트**
```
[타이틀] 이력서 선택
[버튼]   지원하기
[완료]   지원 완료!
```

#### CareerScoreCard (userType별 주요 문구)

**new**
```
이력서 완성하면 {projectedScore}점까지 올라가요
지금 {N}개 공고 지원 가능
완성 후 상위 {N}%
```

**passive**
```
커리어 스코어  {score}/100
{salaryVsMarket}  (예: "시장 평균보다 연봉 12% 낮음")
```

**active (stats 카드)**
```
커리어 스코어  {score}/100  상위 {N}%
```

#### SkillGapCard (섹션 헤더)

| userType | 헤더 |
|----------|------|
| active | `스킬 갭 분석` |
| new | `지금 배우면 좋은 스킬` |
| passive | `스킬 연봉 임팩트` |

**스킬 레벨 표기 (추가 공고)**
```
+{N}개 공고
```

#### InsightCard (type별 타이틀/서브타이틀)

| type | 타이틀 | 서브타이틀 패턴 |
|------|--------|----------------|
| `hiring_pattern` | `합격자 인사이트` | `{직무} 합격자 상위 30% 공통점` |
| `market_salary` | `이직 시장 현황` | `{직무} · 경력 {N}년 기준` |
| `beginner_spec` | `신입 합격자 공통 스펙` | `{직무} 신입 합격자 분석` |

**nudge 문구 예시**
```
hiring_pattern: "SQL 스킬 추가 시 지원 가능 공고 +14개"
market_salary:  "지금 이직하면 평균 연봉 21% 올릴 수 있어요"
beginner_spec:  "포트폴리오 추가 시 합격 확률 크게 올라가요"
```

---

## CV 화면

### 이력서 관리 (`/resume`)
- 독립 레이아웃 (앱 쉘 없음), sticky 헤더 `< 이력서 관리`
- ResumeCard: 대표이력서 badge / 신입·경력 badge / AI tip / 완성도·합격예측 progress bar / 최근 지원 / 액션 버튼
- 우하단 FAB (`+`) → `/resume/new`
- 다운로드 버튼 → `/resume/[id]/preview`

### 이력서 작성/수정 (`/resume/[id]`)
- `id === "new"` → 빈 폼 / 그 외 → mock 데이터 pre-fill
- PDF/URL 업로드 탭바 (new일 때만)
- 섹션: 이력서 정보 → 기본 정보(필수`*`) → Core Value → 경력(프로젝트 계층) → 학력 → 보유기술(태그 pill) → 수상·자격증 → 포트폴리오
- 하단 고정: `임시저장` / `작성완료` / `미리보기`(수정 시)

### PDF 미리보기 (`/resume/[id]/preview`)
- 인쇄 최적화 HTML + `window.print()` (브라우저 PDF 저장)
- 1페이지: 요약 (Info / Core Value / Career / Education / Tech.)
- 2페이지+: 세부 경력사항 (프로젝트별 역할·성과·역량)
- `@media print` CSS: `@page { size: A4; margin: 0 }`
- **TODO**: `@react-pdf/renderer` 교체 예정 (이슈 #20)

---

## 마이크로 인터랙션

- `animate-page`: 페이지 진입 `fadeInUp(0.25s ease-out)`
- `card-tap`: CSS `:active { transform: scale(0.985) }` 터치 피드백
- JobCard CTA: `active:scale-95`
- Stats 카드 스와이프: `snap-x snap-mandatory`
- StickyHeader bg: scroll 시 `bg-jk-bg` → `bg-white` (`transition-colors duration-200`)
- CareerScore 타임라인 토글: `useState` expand/collapse

---

## 개발 환경

```bash
npm run dev    # localhost:3000
```

Preview: Claude Preview MCP `e75f278e-69ab-4963-8e16-1354490a3089`
