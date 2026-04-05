import Link from "next/link";

interface Props {
  count: number;
  /** 중기/장기 휴면 때 "업데이트 필요" 배지 표시 */
  showUpdateBadge?: boolean;
}

export default function ResumeLinkBar({ count, showUpdateBadge = false }: Props) {
  return (
    <div className="flex items-center gap-2">
      <Link
        href="/resume"
        className="card-tap flex-1 rounded-full bg-white px-4 py-3"
        style={{
          background:
            "linear-gradient(white,white) padding-box, linear-gradient(90deg,#DEE0FFCC 0%,#6D79FFCC 17%,#BF47FFCC 53%,#FF9334CC 78%,#FFDFC2CC 100%) border-box",
          border: "1px solid transparent",
          boxShadow: "0 0 10px 0 rgba(255,135,194,0.30)",
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-[15px] font-semibold text-jk-text-strong">
              내 이력서 ({count})
            </p>
            {showUpdateBadge && (
              <span className="rounded-full bg-jk-blue px-2 py-0.5 text-[10px] font-bold text-white">
                업데이트 필요
              </span>
            )}
          </div>
          <div className="flex items-center gap-0.5">
            <p className="text-[11px] text-jk-text-muted">이력서 관리하기</p>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M6.5 4.5L11.5 9l-5 4.5"
                stroke="var(--color-jk-text-strong)"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </Link>
      <Link
        href="/resume/new"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-jk-blue-hover transition-all active:scale-95"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 4v12M4 10h12" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </Link>
    </div>
  );
}
