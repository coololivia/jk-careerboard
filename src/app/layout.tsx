import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JK CareerBoard",
  description: "취업 준비를 위한 커리어보드",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-jk-bg text-jk-text-primary antialiased">
        <main className="mx-auto w-full max-w-[390px] px-4 py-6">
          {children}
        </main>
      </body>
    </html>
  );
}
