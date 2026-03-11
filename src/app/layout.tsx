import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Preloader } from "@/components/layout/Preloader";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { FloatingParticles } from "@/components/ui/FloatingParticles";
import { CustomCursor } from "@/components/ui/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Akash Tripathi | Portfolio",
  description: "Full Stack Developer & Competitive Programmer. Building scalable web applications and solving complex problems.",
  keywords: ["Akash Tripathi", "portfolio", "full stack developer", "competitive programmer", "Next.js", "React", "IIIT Gwalior"],
  authors: [{ name: "Akash Tripathi" }],
  openGraph: {
    title: "Akash Tripathi | Portfolio",
    description: "Full Stack Developer & Competitive Programmer. Building scalable web applications.",
    url: "https://akashtripathi.dev",
    siteName: "Akash Tripathi Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Akash Tripathi | Portfolio",
    description: "Full Stack Developer & Competitive Programmer.",
    creator: "@akashtripathiak04",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-dark text-light-text min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <CustomCursor />
          <FloatingParticles />
          <Preloader />
          <Navbar />
          <main className="flex-grow pt-16">
            {children}
          </main>
          <Footer />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
