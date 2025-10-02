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
import ErrorBoundary from "./global-error";

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

const [APP_DEFAULT_TITLE, APP_NAME, APP_DESCRIPTION, APP_TITLE_TEMPLATE] = [
  "Weather App",
  "V.Weather",
  "Weather App - Challenge by Frontend Mentor",
  "Weather App",
];

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
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
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
        <ErrorBoundary children={children} />
      </body>
    </html>
  );
}
