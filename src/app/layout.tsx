import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  DM_Sans,
  Bricolage_Grotesque,
} from "next/font/google";
// import "./globals.css";

import "@progress/kendo-theme-default/dist/all.css";
import "../styles/styles.scss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--bricolage-grotesque",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Weather App",
  description: "Challenge by Frontend Mentor",
  icons: {
    icon: [
      {
        url: "/weather-app-main/icons/favicon.svg",
        href: "/weather-app-main//icons/favicon.svg",
      },
    ],
  },
  other: {
    "apple-mobile-web-app-title": "V.Weather",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dmSans.variable} ${bricolageGrotesque.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
