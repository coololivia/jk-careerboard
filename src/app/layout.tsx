import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import "./globals.css";
import DevTypeSwitcher from "@/components/DevTypeSwitcher";
import StickyHeader from "@/components/StickyHeader";

export const metadata: Metadata = {
  title: "JK CareerBoard",
  description: "취업 준비를 위한 커리어보드",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

function BottomTabBar() {
  const tabs = [
    {
      label: "홈",
      active: false,
      icon: (
        /* Figma: system/system_home — house outline */
        <svg width="24" height="24" viewBox="29 11 20 18" fill="none">
          <path
            d="M36.6667 21.6744V27H33.4C32.6268 27 32 26.4039 32 25.6686V17.9903C32 17.703 32.1462 17.4334 32.3924 17.2669L38.4591 13.1642C38.7829 12.9453 39.2171 12.9453 39.5409 13.1642L45.6076 17.2669C45.8538 17.4334 46 17.703 46 17.9903V25.6686C46 26.4039 45.3732 27 44.6 27H41.3333V21.6744C41.3333 21.1842 40.9155 20.7868 40.4 20.7868H37.6C37.0845 20.7868 36.6667 21.1842 36.6667 21.6744Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      label: "JOB 찾기",
      active: false,
      icon: (
        /* Figma: target-02 — compass/target icon */
        <svg width="24" height="24" viewBox="28 10 22 20" fill="none">
          <path
            d="M46.2014 20.4706C46.2014 24.2081 43.1409 27.25 39.3507 27.25C35.5605 27.25 32.5 24.2081 32.5 20.4706C32.5 16.7331 35.5605 13.6912 39.3507 13.6912C43.1409 13.6912 46.2014 16.7331 46.2014 20.4706Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M43.1511 20.4706C43.1511 22.1289 41.7921 23.4853 40.1007 23.4853C38.4094 23.4853 37.0504 22.1289 37.0504 20.4706C37.0504 18.8123 38.4094 17.4559 40.1007 17.4559C41.7921 17.4559 43.1511 18.8123 43.1511 20.4706Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M40.1007 13.6912V17.4559M40.1007 23.4853V27.25M32.5 20.4706H36.2647M43.9368 20.4706H47.7014"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      label: "내 커리어",
      active: true,
      icon: (
        /* Figma: moon-landing — rocket launch icon */
        <svg width="24" height="24" viewBox="28 9 22 22" fill="none">
          <path
            d="M39.0005 20.019C34.8147 20.019 31.2738 22.7552 30.0997 26.5212C29.7664 27.59 29.5998 28.1245 30.0186 28.6871C30.4375 29.2498 31.1184 29.2498 32.4804 29.2498H45.5205C46.8825 29.2498 47.5635 29.2498 47.9823 28.6871C48.4011 28.1245 48.2345 27.59 47.9013 26.5212C46.7271 22.7552 43.1863 20.019 39.0005 20.019Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1.38"
            strokeLinecap="round"
          />
          <path
            d="M39 20.019L39 11.25"
            stroke="currentColor"
            strokeWidth="1.38"
            strokeLinecap="round"
          />
          <path
            d="M45.4615 14.019L39 16.789V11.25L45.4615 14.019Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1.38"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      label: "콘텐츠",
      active: false,
      icon: (
        /* Figma: presentation-01 — bar chart with frame */
        <svg width="24" height="24" viewBox="28 10 22 20" fill="none">
          <path
            d="M34.7335 19.4667V18.4M39.0001 19.4667V17.3333M43.2668 19.4667V15.2M36.8668 23.7333L35.2668 28M43.0833 27.9407L41.1977 23.7924M32.6001 23.7333C31.4219 23.7333 30.4668 22.7782 30.4668 21.6V14.1333C30.4668 12.9551 31.4219 12 32.6001 12H45.4001C46.5783 12 47.5335 12.9551 47.5335 14.1333V21.6C47.5335 22.7782 46.5783 23.7333 45.4001 23.7333H32.6001Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      label: "MY",
      active: false,
      icon: (
        /* Figma: ion:person — person outline */
        <svg width="24" height="24" viewBox="29 10 20 20" fill="none">
          <path
            d="M38.6074 22.5361C34.6348 22.5361 31.2637 25.2646 31.0127 28.0166C30.971 28.2474 31.0322 28.4439 31.1387 28.5713C31.2852 28.7402 31.5 28.75 31.5264 28.75H45.6885C45.7149 28.75 45.9297 28.7402 46.0762 28.5713C46.1827 28.4439 46.2428 28.2474 46.2012 28.0166C45.9297 25.1768 42.5654 22.5361 38.6074 22.5361Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M38.6074 19.75C40.2408 19.75 41.8648 18.1551 42.0244 15.9922C42.1836 13.8008 40.7559 12.25 38.6074 12.25C36.459 12.25 35.0215 13.8008 35.1895 15.9922C35.3516 18.1641 36.9736 19.75 38.6074 19.75Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      ),
    },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 z-30 w-full max-w-[390px] -translate-x-1/2 bg-white border-t border-jk-border">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={`flex flex-1 flex-col items-center gap-0.5 py-2.5 transition-colors ${
              tab.active ? "text-jk-blue" : "text-jk-text-muted"
            }`}
          >
            {tab.icon}
            <span className={`text-[10px] font-semibold leading-none ${tab.active ? "text-jk-blue" : "text-jk-text-muted"}`}>
              {tab.label}
            </span>
          </button>
        ))}
      </div>
      {/* iOS 홈 인디케이터 여백 */}
      <div className="h-4" />
    </nav>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-jk-bg text-jk-text-primary antialiased">
        <div className="mx-auto w-full max-w-[390px]">
          {/* 개발용 유저 타입 전환 바 */}
          <Suspense>
            <DevTypeSwitcher />
          </Suspense>

          {/* 앱 헤더 — Figma 내 커리어 header 기준 */}
          <StickyHeader />

          <main className="px-4 pb-28 pt-2">
            {children}
          </main>
        </div>

        <BottomTabBar />
      </body>
    </html>
  );
}
