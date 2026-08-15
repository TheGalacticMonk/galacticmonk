import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { getPersonSchema } from "@/lib/schema";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://galacticmonk.com"),
  title: "Galactic Monk — Creative Producer & Alchemist",
  description:
    "Galactic Monk is the Los Angeles-based creative production studio of Jason Lee — film & video, photography, and audio recording, mix & master.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} h-full antialiased`}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=wand_stars,keyboard_double_arrow_left,keyboard_double_arrow_right"
        precedence="default"
      />
      <body className="min-h-full flex flex-col bg-ink text-cream">
        <JsonLd data={getPersonSchema()} />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
