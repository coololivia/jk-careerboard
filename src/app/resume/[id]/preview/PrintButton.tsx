"use client";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="rounded-full bg-jk-blue px-5 py-2 text-[14px] font-semibold text-white transition-colors active:scale-95 hover:bg-jk-blue-hover"
    >
      PDF 저장
    </button>
  );
}
