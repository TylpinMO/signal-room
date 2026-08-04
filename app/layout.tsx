import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = host.startsWith("localhost") || host.startsWith("127.0.0.1") ? "http" : "https";
  const metadataBase = new URL(`${protocol}://${host}`);
  const image = new URL("/og.png", metadataBase).toString();

  return {
    metadataBase,
    title: "Signal Room — Product Analytics Dashboard",
    description: "Interactive product analytics dashboard for revenue, acquisition, activation, and retention.",
    openGraph: {
      title: "Signal Room — Product Analytics Dashboard",
      description: "Product analytics, without the noise.",
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: "Signal Room analytics dashboard" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Signal Room — Product Analytics Dashboard",
      description: "Product analytics, without the noise.",
      images: [image],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body></html>;
}
