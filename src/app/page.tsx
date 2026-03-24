import { getUserTypeFromQuery, inferUserType } from "@/lib/inferUserType";
import { UserData, UserType } from "@/types/user";
import ActiveDashboard from "@/components/dashboard/ActiveDashboard";
import NewDashboard from "@/components/dashboard/NewDashboard";
import PassiveDashboard from "@/components/dashboard/PassiveDashboard";
import InactiveDashboard from "@/components/dashboard/InactiveDashboard";

import activeUser from "../../mock-data/active-user.json";
import passiveUser from "../../mock-data/passive-user.json";
import newUser from "../../mock-data/new-user.json";
import inactiveUser from "../../mock-data/inactive-user.json";

const mockDataMap: Record<UserType, UserData> = {
  active: activeUser as unknown as UserData,
  passive: passiveUser as unknown as UserData,
  new: newUser as unknown as UserData,
  inactive: inactiveUser as unknown as UserData,
};

interface PageProps {
  searchParams: Promise<{ user?: string }>;
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

  return (
    <>
      {/* 개발용 유저 타입 전환 탭 */}
      <div className="mb-6 flex gap-1 rounded-xl bg-gray-100 p-1">
        {(["active", "new", "passive", "inactive"] as UserType[]).map((type) => (
          <a
            key={type}
            href={`?user=${type}`}
            className={`flex-1 rounded-lg py-1.5 text-center text-xs font-medium transition-colors ${
              userType === type
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {type === "active"
              ? "적극"
              : type === "new"
              ? "신입"
              : type === "passive"
              ? "잠재"
              : "휴면"}
          </a>
        ))}
      </div>

      {userType === "active" && <ActiveDashboard data={data} />}
      {userType === "new" && <NewDashboard data={data} />}
      {userType === "passive" && <PassiveDashboard data={data} />}
      {userType === "inactive" && <InactiveDashboard data={data} />}
    </>
  );
}
