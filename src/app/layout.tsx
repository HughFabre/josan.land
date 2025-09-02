import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import NavigationBar from "@/components/common/navigation-bar";
import { AnimatedGridPattern } from "@/components/common/grid";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
});

// WDXL Lubrifont JP N for hero titles (using web font)
const wdxlLubrifont = {
  variable: "--font-wdxl-lubrifont",
};

export const metadata: Metadata = {
  title: {
    default: "Josan Land",
    template: "%s | Josan Land"
  },
  description: "ジョサン教公式ウェブサイト。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/npm/@fontsource/wdxl-lubrifont-jp-n@latest/index.css" rel="stylesheet" />
      </head>
      <body
        className={`${notoSansJP.variable} ${wdxlLubrifont.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen overflow-hidden">
            <AnimatedGridPattern
              numSquares={30}
              maxOpacity={0.1}
              duration={3}
              repeatDelay={1}
              className="fixed inset-0 h-full w-full z-0"
            />
            <div className="relative z-10">
              <NavigationBar />
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
