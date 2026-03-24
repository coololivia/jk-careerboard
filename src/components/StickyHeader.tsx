"use client";

import { useEffect, useState } from "react";

export default function StickyHeader() {
  const [isWhiteBg, setIsWhiteBg] = useState(false);

  useEffect(() => {
    const check = () => {
      const sentinel = document.querySelector("[data-header-sentinel]") as HTMLElement | null;
      if (!sentinel) {
        setIsWhiteBg(false);
        return;
      }
      // sentinel의 top이 헤더 높이(56px) 이하로 내려오면 흰 배경으로 전환
      setIsWhiteBg(sentinel.getBoundingClientRect().top <= 56);
    };

    window.addEventListener("scroll", check, { passive: true });
    check();
    return () => window.removeEventListener("scroll", check);
  }, []);

  return (
    <header
      className={`sticky top-0 z-20 transition-colors duration-200 ${
        isWhiteBg ? "bg-white" : "bg-jk-bg"
      }`}
    >
      <div className="flex h-14 items-center justify-between px-4">
        <h1 className="text-[18px] font-bold tracking-tight text-[#0c0c0e]">내 커리어</h1>
        <div className="flex items-center">
          {/* 검색 */}
          <button className="flex h-10 w-10 items-center justify-center text-jk-text-strong">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8"/>
              <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
          {/* 알림 */}
          <button className="flex h-10 w-10 items-center justify-center text-jk-text-strong">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 3a7 7 0 00-7 7v4l-1.5 2.5h17L19 14v-4a7 7 0 00-7-7z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
              <path d="M10 19a2 2 0 004 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
          {/* 메뉴 */}
          <button className="flex h-10 w-10 items-center justify-center text-jk-text-strong">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
