# JK CareerBoard — Design Tokens (JAMS 2.1)

Figma key: `mrgHPV0VxWmqxV4C8gABgv`

---

## 컬러

### 브랜드 블루

| 토큰 | 값 | 용도 |
|------|-----|------|
| `--color-jk-blue` | `#1b55f6` | Primary action, active state, 링크 |
| `--color-jk-blue-hover` | `#083ccc` | Hover/pressed, FAB(+) 버튼 색상 |
| `--color-jk-blue-dark` | `#0028ad` | Deep pressed |
| `--color-jk-blue-light` | `#e1e7fa` | Light blue bg (배지, 태그) |

### 배경

| 토큰 | 값 | 용도 |
|------|-----|------|
| `--color-jk-bg` | `#f3f4f5` | 앱 전체 배경 |
| `--color-jk-bg-blue` | `#f0f2fa` | 파란 계열 섹션 bg, AI 팁 배경 |
| `--color-jk-bg-section` | `#f1f2f3` | 섹션 내부 bg, progress bar 트랙 |

### 텍스트

| 토큰 | 값 | 용도 |
|------|-----|------|
| `--color-jk-text-strong` | `#1a1a1e` | 제목, 강조 텍스트 |
| `--color-jk-text-secondary` | `#3e434b` | 본문 |
| `--color-jk-text-tertiary` | `#575f6c` | 태그 텍스트 |
| `--color-jk-text-muted` | `#768091` | 보조 텍스트, 라벨 |
| `--color-jk-text-disabled` | `#afb5be` | 비활성 버튼 텍스트 (수정/보기 등) |
| `--color-jk-text-placeholder` | `#949ba8` | Input placeholder |

### 보더 / 구분선

| 토큰 | 값 | 용도 |
|------|-----|------|
| `--color-jk-border` | `#d5d8dc` | 일반 테두리, 구분선 |
| `--color-jk-card-stroke` | `#e8e9ec` | 카드 외곽 테두리 |
| `--color-jk-divider` | `#f1f2f3` | 카드 내부 가로/세로 구분선 |

### 기타

| 토큰 | 값 | 용도 |
|------|-----|------|
| `--color-jk-purple` | `#8b5cf6` | 합격패턴 배지 |

---

## 보더 라디우스

| 토큰 | 값 | 용도 |
|------|-----|------|
| `--radius-xs` | `4px` | 소형 배지 |
| `--radius-sm` | `8px` | 액션 버튼 (수정/보기/재지원) |
| `--radius-md` | `12px` | 일반 카드 (ResumeAiCard, 지원현황 카드) |
| `--radius-lg` | `16px` | 주요 카드 (InsightCard, SkillGapCard 등) |
| `--radius-xl` | `18px` | Stats 스와이프 카드 |
| `--radius-full` | `32px` | 알약형 버튼, 태그 pill |

---

## 쉐도우

| 용도 | 값 |
|------|-----|
| Stats 스와이프 카드 | `0 2px 12px rgba(0,0,0,0.07)` |
| 내 이력서 링크바 — pink glow | `0 0 10px 0 rgba(255,135,194,0.30)` |

---

## 특수 패턴

### 내 이력서 링크바 그라데이션 border

```css
background:
  linear-gradient(white, white) padding-box,
  linear-gradient(90deg,
    #DEE0FFCC 0%,
    #6D79FFCC 17%,
    #BF47FFCC 53%,
    #FF9334CC 78%,
    #FFDFC2CC 100%
  ) border-box;
border: 1px solid transparent;
```

### 타이포그래피

| 용도 | 크기 | weight |
|------|------|--------|
| 섹션 헤더 | `18px` | `bold` |
| 카드 타이틀 | `15px` | `bold` |
| 공고 타이틀 | `16px` | `bold` |
| 본문 | `14px` | `medium` |
| 보조 텍스트 | `13px` | `regular` |
| 라벨 / 날짜 | `11px` | `regular` |
| 배지 | `11px` | `semibold` |
| 태그 | `12px` | `regular` |

---

## 컴포넌트별 스펙

### 카드 공통
- `bordered` prop: `border border-[#E8E9EC]` (shadow 대신)
- 내부 구분선: `bg-[#F1F2F3]`
- 카드 내 구분선 좌우 여백: `mx-4` (16px)

### 액션 버튼 (지원현황 수정/보기/재지원)
- height: `40px` (`h-10`)
- radius: `8px` (`rounded-[8px]`)
- text color: `#AFB5BE`
- container padding: `px-3 py-1.5`

### Stats 스와이프 카드
- width: `160px` (고정)
- radius: `18px`
- shadow: `0 2px 12px rgba(0,0,0,0.07)`
- padding: `16px`
