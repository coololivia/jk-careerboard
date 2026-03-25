import { UserType, BehaviorSignals } from "@/types/user";

export function inferUserType(signals: BehaviorSignals): UserType {
  const {
    daysSinceLastVisit,
    applicationCount,
    resumeRecentlyEdited,
    weeklyVisitCount,
    onlyBrowsing,
    scrapCount,
  } = signals;

  // D: Non-active — 30일+ 미접속
  if (daysSinceLastVisit >= 30) {
    return "inactive";
  }

  // A: 신입 구직자 — 지원 이력 없음 + 이력서 미완성 상태에서 열람만
  if (applicationCount === 0 && onlyBrowsing) {
    return "new";
  }

  // B: 적극 구직자 — 잦은 방문 + 이력서 최근 수정 + 다수 지원 중
  if (weeklyVisitCount >= 4 && resumeRecentlyEdited && applicationCount >= 2) {
    return "active";
  }

  // C: 잠재 구직자 — 주 1~2회 방문 + 스크랩 누적 + 지원 없음
  if (weeklyVisitCount <= 3 && scrapCount >= 3 && applicationCount === 0) {
    return "passive";
  }

  // fallback: 지원 이력 있으면 active로 간주
  if (applicationCount > 0) return "active";

  return "passive";
}

export function getUserTypeFromQuery(
  query: string | null
): UserType | null {
  const valid: UserType[] = ["active", "passive", "new", "inactive", "onboarding"];
  if (query && valid.includes(query as UserType)) {
    return query as UserType;
  }
  return null;
}
