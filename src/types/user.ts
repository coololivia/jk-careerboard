export type UserType = "active" | "passive" | "new" | "inactive";

export interface BehaviorSignals {
  visitFrequency: "daily" | "weekly" | "occasional" | "inactive";
  weeklyVisitCount: number;
  daysSinceLastVisit: number;
  applicationCount: number;
  resumeRecentlyEdited: boolean;
  onlyBrowsing: boolean;
  scrapCount: number;
  typicalVisitTime?: string;
}

export interface UserData {
  user: {
    id: string;
    name: string;
    type: UserType;
    jobTitle: string | null;
    yearsOfExperience: number;
    resumeCompleteness: number;
    lastVisitedAt: string;
    [key: string]: unknown;
  };
  behaviorSignals: BehaviorSignals;
  [key: string]: unknown;
}
