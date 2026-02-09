import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Sedgwick_Ave_Display } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import { CartProvider } from "@/components/cart/cart-context"
import { getCollections } from "@/lib/hygraph"
import { Header } from "../components/layout/header"
import dynamic from "next/dynamic"
import { V0Provider } from "../lib/context"
import { cn } from "../lib/utils"
import { TooltipProvider } from "@/components/ui/tooltip"
import Script from "next/script"

const V0Setup = dynamic(() => import("@/components/v0-setup"))

const isV0 = process.env["VERCEL_URL"]?.includes("vusercontent.net") ?? false

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const sedgwickAveDisplay = Sedgwick_Ave_Display({
  variable: "--font-sedgwick-ave",
  weight: "400",
  subsets: ["latin"],
})

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://v0-hygraphioarts2v0.vercel.app"

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "v0-hygraphioarts2v0.vercel.app - Premium Art & Design Store",
    template: "%s | v0-hygraphioarts2v0.vercel.app",
  },
  description:
    "Discover unique art pieces, premium design products, and creative collections at v0-hygraphioarts2v0.vercel.app. Your destination for curated artistic excellence.",
  keywords: ["art", "design", "premium products", "creative", "ioarts", "online store"],
  authors: [{ name: "v0-hygraphioarts2v0.vercel.app" }],
  creator: "v0-hygraphioarts2v0.vercel.app",
  publisher: "v0-hygraphioarts2v0.vercel.app",
  generator: "v0.app",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "none",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    title: "v0-hygraphioarts2v0.vercel.app - Premium Art & Design Store",
    description: "Discover unique art pieces, premium design products, and creative collections at v0-hygraphioarts2v0.vercel.app.",
    siteName: "v0-hygraphioarts2v0.vercel.app",
    images: [
      {
        url: `${baseUrl}/logo-icon.svg`,
        width: 219,
        height: 226,
        alt: "v0-hygraphioarts2v0.vercel.app Logo",
        type: "image/svg+xml",
      },
      {
        url: `${baseUrl}/opengraph-image.jpg`,
        width: 1200,
        height: 630,
        alt: "v0-hygraphioarts2v0.vercel.app - Premium Art & Design Store",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "v0-hygraphioarts2v0.vercel.app - Premium Art & Design Store",
    description: "Discover unique art pieces, premium design products, and creative collections at v0-hygraphioarts2v0.vercel.app.",
    creator: "@ioarts",
    images: [`${baseUrl}/twitter-image.jpg`],
  },
  alternates: {
    canonical: baseUrl,
  },
  verification: {
    google: "UDDRY9P42GqBtI73NpSvB4xWe7lUmGgAiTrsbEK7n-M",
  },
  icons: {
    icon: [
      { url: `${baseUrl}/favicon.ico`, sizes: "any" },
      { url: `${baseUrl}/logo-icon.svg`, type: "image/svg+xml" },
    ],
    apple: [
      { url: `${baseUrl}/apple-icon.png`, sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "mask-icon", url: `${baseUrl}/logo-icon.svg`, color: "#000000" },
    ],
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const collections = await getCollections()

  return (
    <html lang="en">
      <head>
        <Script
          id="schema-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "v0-hygraphioarts2v0.vercel.app",
              url: baseUrl,
              logo: `${baseUrl}/logo-icon.svg`,
              description: "Premium art and design store",
              sameAs: [
                "https://www.deviantart.com/ioarts",
                "https://www.etsy.com/shop/ioarts",
              ],
            }),
          }}
        />
        <Script
          id="schema-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "v0-hygraphioarts2v0.vercel.app",
              url: baseUrl,
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${baseUrl}/shop?q={search_term_string}`,
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body
        className={cn(geistSans.variable, geistMono.variable, sedgwickAveDisplay.variable, "antialiased min-h-screen", { "is-v0": isV0 })}
        suppressHydrationWarning
      >
        <V0Provider isV0={isV0}>
          <CartProvider>
            <TooltipProvider>
              <NuqsAdapter>
                <Header collections={collections} />
                {children}
                <Toaster closeButton position="bottom-right" />
              </NuqsAdapter>
            </TooltipProvider>
          </CartProvider>
          {isV0 && <V0Setup />}
        </V0Provider>
      </body>
    </html>
  )
}
