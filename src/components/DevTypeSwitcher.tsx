"use client";

import { useSearchParams } from "next/navigation";

const TYPES = [
  { value: "active",   label: "적극" },
  { value: "new",      label: "신입" },
  { value: "passive",  label: "잠재" },
  { value: "inactive", label: "휴면" },
] as const;

const INACTIVE_TIERS = [
  { value: "short", label: "단기 (<90일)" },
  { value: "mid",   label: "중기 (~1년)" },
  { value: "long",  label: "장기 (1년+)" },
] as const;

export default function DevTypeSwitcher() {
  const searchParams = useSearchParams();
  const current = searchParams.get("user") ?? "active";
  const currentTier = searchParams.get("tier") ?? "short";

  return (
    <div className="bg-[#1a1a1e]">
      <div className="flex items-center gap-2 px-3 py-1.5">
        <span className="text-[10px] font-bold tracking-widest text-white/30 uppercase">DEV</span>
        <div className="flex flex-1 gap-1">
          {TYPES.map((t) => (
            <a
              key={t.value}
              href={t.value === "inactive" ? `?user=inactive&tier=${currentTier}` : `?user=${t.value}`}
              className={`flex-1 rounded py-1 text-center text-[11px] font-semibold transition-colors ${
                current === t.value
                  ? "bg-jk-blue text-white"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              {t.label}
            </a>
          ))}
        </div>
      </div>

      {current === "inactive" && (
        <div className="flex gap-1 border-t border-white/10 px-3 pb-1.5 pt-1">
          {INACTIVE_TIERS.map((t) => (
            <a
              key={t.value}
              href={`?user=inactive&tier=${t.value}`}
              className={`flex-1 rounded py-0.5 text-center text-[10px] font-semibold transition-colors ${
                currentTier === t.value
                  ? "bg-white/15 text-white"
                  : "text-white/30 hover:text-white/50"
              }`}
            >
              {t.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
