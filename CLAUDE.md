# JK CareerBoard — PRD & Design Reference

## 프로젝트 개요
잡코리아 "내 커리어" 탭의 모바일 대시보드. 사용자 행동 패턴에 따라 4가지 유형 대시보드를 제공하는 개인화 커리어 관리 화면.

- **Framework**: Next.js 15 App Router + TypeScript
- **Styling**: Tailwind CSS v4 (`@import "tailwindcss"`, `@theme {}`)
- **Design System**: JAMS 2.0 (Figma key: `Dojrcqpr6br5B6BNkj08jR`)
- **Reference Figma**: `rLV3wjzT7xYPTyJIck3tna` / node `1:5713` "JK 내커리어"
- **Viewport**: max-width 390px (모바일 전용)

---

## 디자인 토큰 (globals.css @theme)

| 토큰 | 값 | 용도 |
|------|-----|------|
| `--color-jk-blue` | `#1b55f6` | Primary action, active state |
| `--color-jk-blue-hover` | `#083ccc` | Hover/pressed |
| `--color-jk-blue-light` | `#e1e7fa` | Light blue bg |
| `--color-jk-bg` | `#f3f4f5` | 앱 배경 |
| `--color-jk-bg-blue` | `#f0f2fa` | 파란 계열 섹션 bg |
| `--color-jk-bg-section` | `#f1f2f3` | 섹션 내부 bg |
| `--color-jk-text-strong` | `#1a1a1e` | 제목, 강조 텍스트 |
| `--color-jk-text-secondary` | `#3e434b` | 본문 |
| `--color-jk-text-muted` | `#768091` | 보조 텍스트 |
| `--color-jk-text-tertiary` | `#575f6c` | 태그 텍스트 등 |
| `--color-jk-purple` | `#8b5cf6` | 합격패턴 배지 |
| `--color-jk-border` | `#d5d8dc` | 구분선, 테두리 |
| `--radius-md` | `12px` | 일반 카드 |
| `--radius-lg` | `16px` | 주요 카드 |

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
`?user=active|passive|new|inactive`
`src/app/page.tsx` → `src/components/dashboard/{Type}Dashboard.tsx`

---

## 1. 적극 사용자 (ActiveDashboard)

> Figma node `1:5713` 기준

### 화면 구조 (위→아래)

#### 1-1. 인사말 헤더
```
안녕하세요,
{name}님 👋
지금 {N}개 공고에 지원 중이에요
```

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
1. 인사말: "첫 취업까지 함께할게요"
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
1. 인사말: "조건 맞는 공고 나오면 바로 알려드릴게요"
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
1. 인사말: "오랜만이에요, {tier별 시간 문구}"
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
