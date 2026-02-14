import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { LayoutSwitcher } from "@/components/layout/LayoutSwitcher";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "BloomCare | Menstrual Care & Hygiene Products",
  description:
    "Your trusted destination for sanitary pads, menstrual cups, period underwear & eco-friendly menstrual care products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body
        className={`${dmSans.variable} ${playfair.variable} font-sans antialiased bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100`}
        suppressHydrationWarning
      >
        <SessionProvider>
          <LayoutSwitcher>{children}</LayoutSwitcher>
        </SessionProvider>
      </body>
    </html>
  );
}
