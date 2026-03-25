import { getUserTypeFromQuery, inferUserType } from "@/lib/inferUserType";
import { UserData, UserType } from "@/types/user";
import ActiveDashboard from "@/components/dashboard/ActiveDashboard";
import NewDashboard from "@/components/dashboard/NewDashboard";
import PassiveDashboard from "@/components/dashboard/PassiveDashboard";
import InactiveDashboard from "@/components/dashboard/InactiveDashboard";
import OnboardingDashboard from "@/components/dashboard/OnboardingDashboard";

import activeUser from "../../mock-data/active-user.json";
import passiveUser from "../../mock-data/passive-user.json";
import newUser from "../../mock-data/new-user.json";
import inactiveUser from "../../mock-data/inactive-user.json";
import onboardingUser from "../../mock-data/onboarding-user.json";

const mockDataMap: Record<UserType, UserData> = {
  active: activeUser as unknown as UserData,
  passive: passiveUser as unknown as UserData,
  new: newUser as unknown as UserData,
  inactive: inactiveUser as unknown as UserData,
  onboarding: onboardingUser as unknown as UserData,
};

interface PageProps {
  searchParams: Promise<{ user?: string; tier?: string }>;
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;

  // 개발 중 ?user=active|passive|new|inactive 로 전환 가능
  const forcedType = getUserTypeFromQuery(params.user ?? null);

  // forcedType 없으면 행동 신호로 추론 (기본: active-user 데이터 사용)
  const defaultData = activeUser as unknown as UserData;
  const userType: UserType =
    forcedType ?? inferUserType(defaultData.behaviorSignals);

  const data = mockDataMap[userType];

  // 휴면 티어: URL ?tier=short|mid|long → daysSinceLastVisit 오버라이드
  const TIER_DAYS: Record<string, number> = { short: 45, mid: 120, long: 400 };
  const tierOverride = params.tier && TIER_DAYS[params.tier] !== undefined
    ? TIER_DAYS[params.tier]
    : undefined;

  return (
    <>
      {userType === "active" && <ActiveDashboard data={data} />}
      {userType === "new" && <NewDashboard data={data} />}
      {userType === "passive" && <PassiveDashboard data={data} />}
      {userType === "inactive" && (
        <InactiveDashboard data={data} tierDaysOverride={tierOverride} />
      )}
      {userType === "onboarding" && <OnboardingDashboard data={data} />}
    </>
  );
}
