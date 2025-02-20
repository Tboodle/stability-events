import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./_components/theme.provider";
import NavBar from "./_components/NavBar";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stability Bingo",
  description: "An app for tracking Stability clan events",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative bg-background w-full`}
      >
        <FlickeringGrid
          className="absolute inset-0 -z-10 h-full w-full [mask-image:radial-gradient(4500px_circle_at_center,white,transparent)]"
          squareSize={4}
          gridGap={12}
          color="#A72A2D"
          maxOpacity={0.4}
          flickerChance={0.2}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar />
          {children}
        </ThemeProvider>
        {/* <NavBar />
        <div id="main" className="p-2 bg-background text-foreground">
          {children}
        </div> */}
      </body>
    </html>
  );
}
