import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Assetain – Complete Startup Blueprint",
  description:
    "A complete plan for Assetain – universal asset-management SaaS for schools, hospitals, offices, and organisations everywhere.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-gradient-to-br from-gray-50 via-primary-50 to-primary-100 text-gray-900 dark:from-primary-900 dark:via-primary-800 dark:to-primary-700 dark:text-gray-100">
        {children}
      </body>
    </html>
  );
}
