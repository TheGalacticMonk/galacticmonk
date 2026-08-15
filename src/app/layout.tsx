import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Cormorant } from "next/font/google";
import Script from "next/script";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/MotionProvider";
import JsonLd from "@/components/JsonLd";
import { getPersonSchema, getOrganizationSchema, getWebSiteSchema } from "@/lib/schema";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const SITE_NAME = "Galactic Monk";
const SITE_DESCRIPTION =
  "Galactic Monk is the Los Angeles-based creative production studio of Jason Lee — creative production for multidimensional souls.";

export const metadata: Metadata = {
  metadataBase: new URL("https://galacticmonk.com"),
  title: {
    default: `${SITE_NAME} — Creative Producer & Alchemist`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Galactic Monk",
    "Jason Lee",
    "creative producer",
    "Los Angeles videographer",
    "Los Angeles photographer",
    "film production",
    "music mixing and mastering",
    "web design and development",
  ],
  authors: [{ name: "Jason Lee", url: "https://galacticmonk.com" }],
  creator: "Jason Lee",
  publisher: "Jason Lee",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Creative Producer & Alchemist`,
    description: SITE_DESCRIPTION,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    site: "@GalacticMonk_",
    creator: "@GalacticMonk_",
  },
};

export const viewport: Viewport = {
  themeColor: "#1a1438",
};

const GA_MEASUREMENT_ID = "G-WB2F7L6B3Y";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} h-full antialiased`}
    >
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=wand_stars,keyboard_double_arrow_left,keyboard_double_arrow_right"
        precedence="default"
      />
      <body className="min-h-full flex flex-col bg-ink text-cream">
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <JsonLd data={getPersonSchema()} />
        <JsonLd data={getOrganizationSchema()} />
        <JsonLd data={getWebSiteSchema()} />
        <Nav />
        <main className="flex-1">
          <MotionProvider>{children}</MotionProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}
